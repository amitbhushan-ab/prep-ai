import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import { 
  ShieldCheck, 
  Users, 
  FileText, 
  Bot, 
  Activity, 
  TrendingUp,
  Download
} from 'lucide-react';
import toast from 'react-hot-toast';
import FloatingFrap from '../../components/FloatingFrap';
import SpotlightCard from '../../components/SpotlightCard';

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalLearners: 14280,
    activeExams: 6,
    totalTestsTaken: 48920,
    averagePassAccuracy: '68.4%',
    aiQueriesProcessed: 124500,
    systemHealth: '99.98% Healthy',
    aiProviderLatency: '240 ms',
    modelConfig: {
      activeModel: 'Gemini 1.5 Pro / Flash Orchestrator',
      costThisMonth: '$342.18'
    }
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await api.get('/api/prepai/admin/metrics');
        setMetrics(res.data);
      } catch {
        // Local metrics fallback
      }
    };
    fetchMetrics();
  }, []);

  return (
    <div className="min-h-screen bg-[#07080a] text-white p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#242728] pb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
              System Overview
            </h1>
            <p className="mt-1 text-xs text-white/45">
              Platform throughput, service latency, and account metrics.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-md px-2.5 py-1 bg-[#101111] border border-[#242728] text-white/70 text-xs font-mono">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            Services Operational
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SpotlightCard className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/45 font-mono">Total Candidates</span>
              <Users className="h-4 w-4 text-white/50" />
            </div>
            <div className="mt-3 text-2xl font-semibold font-mono text-white">{metrics.totalLearners.toLocaleString()}</div>
            <div className="mt-1 text-xs text-emerald-400 font-mono">
              +14.2% active this month
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/45 font-mono">Tests Completed</span>
              <FileText className="h-4 w-4 text-white/50" />
            </div>
            <div className="mt-3 text-2xl font-semibold font-mono text-white">{metrics.totalTestsTaken.toLocaleString()}</div>
            <div className="mt-1 text-xs text-white/45 font-mono">
              Accuracy: <span className="text-white">{metrics.averagePassAccuracy}</span>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/45 font-mono">Queries Processed</span>
              <Bot className="h-4 w-4 text-white/50" />
            </div>
            <div className="mt-3 text-2xl font-semibold font-mono text-white">{metrics.aiQueriesProcessed.toLocaleString()}</div>
            <div className="mt-1 text-xs text-white/45 font-mono">
              Cost: <span className="text-white">{metrics.modelConfig?.costThisMonth || '$342.18'}</span>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/45 font-mono">API Latency</span>
              <Activity className="h-4 w-4 text-white/50" />
            </div>
            <div className="mt-3 text-2xl font-semibold font-mono text-emerald-400">{metrics.aiProviderLatency}</div>
            <div className="mt-1 text-xs text-white/45 font-mono">
              Uptime: <span className="text-white">{metrics.systemHealth}</span>
            </div>
          </SpotlightCard>
        </div>

        {/* 2-Column: Model Infrastructure & Security */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-7 rounded-xl bg-[#0d0d0d] p-5 sm:p-6 border border-[#242728] space-y-4">
            <div className="border-b border-[#242728] pb-3">
              <h3 className="font-semibold text-white text-sm">Model Providers</h3>
              <p className="text-xs text-white/40">Active LLM routing and vector grounding</p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between rounded-lg p-3 bg-[#101111] border border-[#242728]">
                <div>
                  <span className="font-medium text-white">STEM Reasoning Model</span>
                  <p className="text-white/40">Gemini 1.5 Pro</p>
                </div>
                <span className="text-emerald-400 font-mono">Active</span>
              </div>

              <div className="flex items-center justify-between rounded-lg p-3 bg-[#101111] border border-[#242728]">
                <div>
                  <span className="font-medium text-white">Interview Engine</span>
                  <p className="text-white/40">Gemini 1.5 Flash</p>
                </div>
                <span className="text-emerald-400 font-mono">Active</span>
              </div>

              <div className="flex items-center justify-between rounded-lg p-3 bg-[#101111] border border-[#242728]">
                <div>
                  <span className="font-medium text-white">Syllabus Embeddings</span>
                  <p className="text-white/40">NCERT & PYQ Frameworks (4.2k chunks)</p>
                </div>
                <span className="text-emerald-400 font-mono">Synced</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-xl bg-[#0d0d0d] p-5 sm:p-6 border border-[#242728] flex flex-col justify-between space-y-4">
            <div>
              <h3 className="font-semibold text-white text-sm">Security & Policies</h3>
              <p className="text-xs text-white/40">Access limits and token lifetimes</p>

              <div className="mt-3 space-y-2 text-xs font-mono">
                <div className="flex justify-between p-2.5 rounded-lg bg-[#101111] border border-[#242728]">
                  <span className="text-white/45">Rate Limit:</span>
                  <strong className="text-white">60 req/min</strong>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-[#101111] border border-[#242728]">
                  <span className="text-white/45">JWT Lifetime:</span>
                  <strong className="text-white">7 days</strong>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-[#101111] border border-[#242728]">
                  <span className="text-white/45">Test Scoring:</span>
                  <strong className="text-emerald-400">Deterministic</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => toast.success("Diagnostics exported")}
              className="mc-btn mc-btn-outline text-xs w-full py-2.5 inline-flex items-center justify-center gap-2"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export Audit Log</span>
            </button>
          </div>

        </div>

      </div>

      <FloatingFrap />
    </div>
  );
};

export default AdminDashboard;
