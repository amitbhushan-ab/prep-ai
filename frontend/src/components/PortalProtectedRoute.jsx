import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';

export const LearnerRoute = ({ children }) => {
  const { isPortalAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  if (!isPortalAuthenticated('learner')) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Ensure active portal view is learner
  return children;
};

export const ContentRoute = ({ children }) => {
  const { isPortalAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  if (!isPortalAuthenticated('content')) {
    return <Navigate to="/content/login" state={{ from: location }} replace />;
  }

  return children;
};

export const AdminRoute = ({ children }) => {
  const { isPortalAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  if (!isPortalAuthenticated('admin')) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};
