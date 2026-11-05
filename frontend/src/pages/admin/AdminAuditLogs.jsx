import React, { useState } from 'react';
import { 
  Settings, 
  ShieldAlert, 
  Clock, 
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import FloatingFrap from '../../components/FloatingFrap';

const AdminAuditLogs = () => {
  const [logs] = useState([
    { id: 'log_1', action: 'EXAM_SYLLABUS_UPDATE', actor: 'ramesh.sme@prepai.edu', details: 'Added 4 new PYQ questions to JEE Advanced Electrodynamics', timestamp: '12 mins ago', severity: 'info' },
    { id: 'log_2', action: 'ROLE_ELEVATION', actor: 'admin@prepai.io', details: 'Promoted user Karan to Content Reviewer', timestamp: '2 hours ago', severity: 'warning' },
    { id: 'log_3', action: 'CBT_TEST_PUBLISHED', actor: 'editorial@prepai.io', details: 'All-India CBT Mock Test 1 released to 14,000+ candidates', timestamp: '5 hours ago', severity: 'info' },
    { id: 'log_4', action: 'AI_MODEL_RE-ROUTE', actor: 'system_auto_balancer', details: 'Switched interview traffic from Gemini 1.5 Pro to Flash (traffic spike 850 req/s)', timestamp: '1 day ago', severity: 'info' },
    { id: 'log_5', action: 'SUSPICIOUS_LOGIN_BLOCKED', actor: 'security_firewall', details: 'Rate limit violation (140 req/sec) from IP 192.168.1.44 throttled', timestamp: '2 days ago', severity: 'danger' }
  ]);

  return (
    <div className="min-h-screen bg-[#07080a] text-white p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        
        {/* Header */}
        <div className="border-b border-[#242728] pb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider text-white/50 bg-[#101111] border border-[#242728] uppercase">
            <Settings className="h-3.5 w-3.5 text-white/80" />
            <span>Immutable System Ledger</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Security Audit Logs & Compliance Trail
          </h1>
          <p className="text-xs sm:text-sm text-white/45">
            Trace administrative changes, content publications, role elevations, and AI safety events.
          </p>
        </div>

        {/* Logs Table */}
        <div className="rounded-xl bg-[#0d0d0d] border border-[#242728] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#101111] border-b border-[#242728] text-white/45 font-medium uppercase text-[10px] tracking-wider font-mono">
                <tr>
                  <th className="p-4">Action Event</th>
                  <th className="p-4">Actor</th>
                  <th className="p-4">Operation Details</th>
                  <th className="p-4">Severity</th>
                  <th className="p-4 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#242728] text-white/80 font-mono text-xs">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#121212] transition">
                    <td className="p-4 font-semibold text-white">
                      {log.action}
                    </td>
                    <td className="p-4 text-white/70">
                      {log.actor}
                    </td>
                    <td className="p-4 max-w-md text-white/50 font-sans">
                      {log.details}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] uppercase font-mono ${
                        log.severity === 'danger'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : log.severity === 'warning'
                            ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {log.severity}
                      </span>
                    </td>
                    <td className="p-4 text-right text-white/40">
                      {log.timestamp}
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

export default AdminAuditLogs;
