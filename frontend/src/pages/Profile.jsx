import React, { useContext, useEffect, useMemo, useState } from 'react';
import api from '../lib/api';
import Card from '../components/Card';
import { AuthContext } from '../context/auth-context';
import { UserRound, Mail, ShieldCheck, CalendarDays, Trophy, Target, Clock3, BookOpenText } from 'lucide-react';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [dashRes, historyRes] = await Promise.all([
          api.get('/api/results/dashboard'),
          api.get('/api/results/history'),
        ]);
        setStats(dashRes.data);
        setHistory(historyRes.data || []);
      } catch {
        setStats(null);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const joinedOn = useMemo(() => {
    if (!user?.createdAt) return 'N/A';
    return new Date(user.createdAt).toLocaleDateString();
  }, [user]);

  const lastActive = useMemo(() => {
    if (!history.length) return 'No attempts yet';
    return new Date(history[0].createdAt).toLocaleString();
  }, [history]);

  const topCategory = useMemo(() => {
    if (!stats?.chart?.labels?.length || !stats?.chart?.data?.length) return 'N/A';
    let maxIdx = 0;
    stats.chart.data.forEach((score, idx) => {
      if (score > stats.chart.data[maxIdx]) maxIdx = idx;
    });
    return `${stats.chart.labels[maxIdx]} (${stats.chart.data[maxIdx]}%)`;
  }, [stats]);

  const skillTags = Array.isArray(user?.skills) ? user.skills : [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 rounded-2xl border border-slate-200 bg-gradient-to-r from-white to-blue-50 p-6">
        <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
        <p className="mt-1 text-sm text-slate-600">Your account details, activity, and performance summary.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card className="border border-slate-200">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-500">Account Details</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-slate-500">
                <UserRound className="h-3.5 w-3.5" />
                Name
              </div>
              <div className="text-slate-900">{user?.name || '—'}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-slate-500">
                <Mail className="h-3.5 w-3.5" />
                Email
              </div>
              <div className="text-slate-900">{user?.email || '—'}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-slate-500">
                <CalendarDays className="h-3.5 w-3.5" />
                Joined On
              </div>
              <div className="text-slate-900">{joinedOn}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-slate-500">
                <Clock3 className="h-3.5 w-3.5" />
                Last Active
              </div>
              <div className="text-slate-900">{lastActive}</div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-xs text-emerald-700">
            <div className="flex items-center gap-2 font-semibold">
              <ShieldCheck className="h-4 w-4" />
              Account is active and secured.
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <BookOpenText className="h-3.5 w-3.5" />
              Skills
            </div>
            <div className="flex flex-wrap gap-2">
              {skillTags.length ? (
                skillTags.map((skill) => (
                  <span key={skill} className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-sm text-slate-500">No skills added yet.</span>
              )}
            </div>
          </div>
        </Card>

        <Card className="border border-slate-200">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-500">Performance Snapshot</h2>

          {loading ? (
            <div className="space-y-3">
              <div className="h-16 animate-pulse rounded-xl bg-slate-100" />
              <div className="h-16 animate-pulse rounded-xl bg-slate-100" />
              <div className="h-16 animate-pulse rounded-xl bg-slate-100" />
            </div>
          ) : (
            <div className="space-y-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <Trophy className="h-3.5 w-3.5" />
                  Total Interviews
                </div>
                <div className="text-xl font-bold text-slate-900">{stats?.totalInterviews ?? 0}</div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <Target className="h-3.5 w-3.5" />
                  Average Accuracy
                </div>
                <div className="text-xl font-bold text-slate-900">{stats?.averageScore ?? 0}%</div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <BookOpenText className="h-3.5 w-3.5" />
                  Strongest Category
                </div>
                <div className="text-slate-900">{topCategory}</div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Profile;

