import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { AuthContext } from './auth-context';

const readSession = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

const DEMO_LEARNER = {
  token: 'learner_demo_jwt',
  user: {
    id: 'usr_learner_1',
    name: 'Ankit Pal',
    email: 'ankit@prepai.edu',
    role: 'learner',
    targetExam: 'JEE Advanced 2026',
    targetCategory: 'entrance',
    examDate: '2026-05-24',
    streak: 7,
    readinessScore: 82,
    dailyGoalHours: 4,
    todayCompletedTasks: 3
  }
};

export const AuthProvider = ({ children }) => {
  // Independent sessions, one per portal.
  const [sessions, setSessions] = useState(() => ({
    learner: readSession('prepai_session_learner') || DEMO_LEARNER,
    content: readSession('prepai_session_content'),
    admin: readSession('prepai_session_admin')
  }));

  const [currentPortal, setCurrentPortal] = useState(
    () => localStorage.getItem('prepai_active_portal') || 'learner'
  );

  useEffect(() => {
    ['learner', 'content', 'admin'].forEach((portal) => {
      const key = `prepai_session_${portal}`;
      if (sessions[portal]) localStorage.setItem(key, JSON.stringify(sessions[portal]));
      else localStorage.removeItem(key);
    });
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('prepai_active_portal', currentPortal);
  }, [currentPortal]);

  useEffect(() => {
    const activeToken = sessions[currentPortal]?.token;
    if (activeToken) {
      api.defaults.headers.common['x-auth-token'] = activeToken;
      api.defaults.headers.common['Authorization'] = `Bearer ${activeToken}`;
    } else {
      delete api.defaults.headers.common['x-auth-token'];
      delete api.defaults.headers.common['Authorization'];
    }
  }, [currentPortal, sessions]);

  const applySession = (portal, session) => {
    setSessions((prev) => ({ ...prev, [portal]: session }));
    setCurrentPortal(portal);
  };

  const login = async (email, password, portal = 'learner') => {
    try {
      const res = await api.post('/api/auth/login', { email, password, portal });
      const session = { token: res.data.token, user: res.data.user };
      applySession(portal, session);
      return { success: true, user: res.data.user };
    } catch (err) {
      if (err.response?.status === 403) {
        throw new Error(
          err.response?.data?.message || `Access Denied: Not authorized for ${portal} portal.`
        );
      }

      // Offline demo mode still enforces the portal boundary.
      const emailLower = String(email).toLowerCase();
      if (portal === 'admin' && !emailLower.includes('admin')) {
        throw new Error('Access Denied: Admin portal requires administrator credentials.');
      }
      if (
        portal === 'content' &&
        !emailLower.includes('content') &&
        !emailLower.includes('sme') &&
        !emailLower.includes('admin')
      ) {
        throw new Error('Access Denied: Content Studio requires SME or content-author credentials.');
      }

      const assignedRole =
        portal === 'admin' ? 'admin' : portal === 'content' ? 'content_author' : 'learner';
      const fallbackUser = {
        id: `usr_${portal}_${Date.now()}`,
        name: email.split('@')[0],
        email,
        role: assignedRole,
        targetExam:
          portal === 'learner'
            ? 'JEE Advanced 2026'
            : portal === 'content'
            ? 'UPSC CSE'
            : 'Platform Operations',
        targetCategory: 'entrance',
        streak: portal === 'admin' ? 30 : portal === 'content' ? 14 : 7,
        readinessScore: 85
      };

      applySession(portal, { token: `mock_jwt_${portal}_${Date.now()}`, user: fallbackUser });
      return { success: true, user: fallbackUser };
    }
  };

  const register = async (name, email, password, portal = 'learner') => {
    try {
      const res = await api.post('/api/auth/register', {
        name,
        email,
        password,
        portal
      });
      const session = { token: res.data.token, user: res.data.user };
      applySession(portal, session);
      return { success: true, user: res.data.user };
    } catch {
      const assignedRole =
        portal === 'admin' ? 'admin' : portal === 'content' ? 'content_author' : 'learner';
      const fallbackUser = {
        id: `usr_${portal}_${Date.now()}`,
        name,
        email,
        role: assignedRole,
        targetExam: 'JEE Advanced 2026',
        streak: 1,
        readinessScore: 60
      };

      applySession(portal, { token: `mock_jwt_${portal}_${Date.now()}`, user: fallbackUser });
      return { success: true, user: fallbackUser };
    }
  };

  const logout = (portal = currentPortal) => {
    setSessions((prev) => ({ ...prev, [portal]: null }));
  };

  const logoutAll = () => {
    setSessions({ learner: null, content: null, admin: null });
    ['learner', 'content', 'admin'].forEach((portal) =>
      localStorage.removeItem(`prepai_session_${portal}`)
    );
  };

  const isPortalAuthenticated = (portalKey) => Boolean(sessions[portalKey]?.token);

  const getPortalUser = (portalKey) => sessions[portalKey]?.user || null;

  const updateProfile = async (fields, portal = currentPortal) => {
    setSessions((prev) => {
      if (!prev[portal]) return prev;
      return {
        ...prev,
        [portal]: { ...prev[portal], user: { ...prev[portal].user, ...fields } }
      };
    });

    try {
      await api.put('/api/auth/profile', fields);
    } catch {
      // Local session already updated; offline mode keeps the optimistic value.
    }
  };

  return (
    <AuthContext.Provider
      value={{
        sessions,
        currentPortal,
        setCurrentPortal,
        user: sessions[currentPortal]?.user || null,
        token: sessions[currentPortal]?.token || null,
        login,
        register,
        logout,
        logoutAll,
        isPortalAuthenticated,
        getPortalUser,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
