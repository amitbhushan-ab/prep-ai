import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import { 
  Users, 
  Search, 
  ShieldCheck, 
  CheckCircle2,
  Lock
} from 'lucide-react';
import toast from 'react-hot-toast';
import FloatingFrap from '../../components/FloatingFrap';

const AdminUsers = () => {
  const [users, setUsers] = useState([
    { id: 'usr_1', name: 'Ankit Pal', email: 'ankit@prepai.edu', role: 'learner', targetExam: 'JEE Advanced 2026', streak: 7, status: 'active' },
    { id: 'usr_2', name: 'Dr. Ramesh Sharma', email: 'ramesh.sme@prepai.edu', role: 'content_author', targetExam: 'UPSC CSE', streak: 14, status: 'active' },
    { id: 'usr_3', name: 'Super Admin Team', email: 'admin@prepai.io', role: 'admin', targetExam: 'All Platform', streak: 30, status: 'active' },
    { id: 'usr_4', name: 'Priya Verma', email: 'priya.v@gmail.com', role: 'learner', targetExam: 'CAT 2026', streak: 4, status: 'active' },
    { id: 'usr_5', name: 'Dev Lead Karan', email: 'karan.tech@prepai.io', role: 'content_author', targetExam: 'Full-Stack SWE', streak: 12, status: 'active' }
  ]);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/api/auth/users');
        if (res.data && res.data.length > 0) {
          setUsers(res.data);
        }
      } catch {
        // Local fallback
      }
    };
    fetchUsers();
  }, []);

  const handleChangeRole = (userId, newRole) => {
    setUsers(users.map(u => (u.id === userId || u._id === userId) ? { ...u, role: newRole } : u));
    toast.success(`User role updated to ${newRole}`);
  };

  const filteredUsers = users.filter(u => {
    const matchSearch = (u.name || '').toLowerCase().includes(search.toLowerCase()) || 
                        (u.email || '').toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === 'all' || u.role === filterRole;
    return matchSearch && matchRole;
  });

  return (
    <div className="min-h-screen bg-[#07080a] text-white p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#242728] pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider text-white/50 bg-[#101111] border border-[#242728] uppercase">
              <Users className="h-3.5 w-3.5 text-white/80" />
              <span>Identity & Access Management (IAM)</span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              User Directory & Role-Based Access Control
            </h1>
            <p className="text-xs sm:text-sm text-white/45">
              Manage accounts, assign portal privileges (Learner, Content Author, Admin).
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl bg-[#0d0d0d] p-3 border border-[#242728]">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-white/35" />
            <input
              type="text"
              placeholder="Search by name or email address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-[#242728] bg-[#101111] pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-white/35 focus:border-white/50 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full sm:w-auto rounded-lg border border-[#242728] bg-[#101111] px-4 py-2 text-xs font-medium text-white/80 focus:outline-none"
            >
              <option value="all">All Roles (All Portals)</option>
              <option value="learner">Learners</option>
              <option value="content_author">Content Authors / Reviewers</option>
              <option value="admin">Platform Admins</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-xl bg-[#0d0d0d] border border-[#242728] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#101111] border-b border-[#242728] text-white/45 font-medium uppercase text-[10px] tracking-wider font-mono">
                <tr>
                  <th className="p-4">User</th>
                  <th className="p-4">Target Track</th>
                  <th className="p-4">Active Portal Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Role Assignment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#242728] text-white/80">
                {filteredUsers.map((u) => (
                  <tr key={u.id || u._id} className="hover:bg-[#121212] transition">
                    <td className="p-4">
                      <div className="font-semibold text-white">{u.name || 'User'}</div>
                      <div className="text-xs text-white/40 font-mono">{u.email}</div>
                    </td>
                    <td className="p-4">
                      <span className="mc-keycap text-[10px] font-mono">
                        {u.targetExam || 'General'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-mono uppercase bg-[#101111] border border-[#242728] text-white/80">
                        {u.role === 'admin' ? '🛡️ Admin' : u.role === 'content_author' ? '🛠️ Content' : '🎓 Learner'}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-xs">
                      <span className={`inline-flex items-center gap-1.5 ${
                        u.status === 'suspended' ? 'text-rose-400' : 'text-emerald-400'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${u.status === 'suspended' ? 'bg-rose-400' : 'bg-emerald-400'}`}></span>
                        {u.status === 'suspended' ? 'Suspended' : 'Active'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <select
                        value={u.role || 'learner'}
                        onChange={(e) => handleChangeRole(u.id || u._id, e.target.value)}
                        className="rounded-lg border border-[#242728] bg-[#101111] px-3 py-1.5 text-xs text-white focus:outline-none"
                      >
                        <option value="learner">Assign Learner</option>
                        <option value="content_author">Assign Content Author</option>
                        <option value="admin">Assign Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      <FloatingFrap />
    </div>
  );
};

export default AdminUsers;
