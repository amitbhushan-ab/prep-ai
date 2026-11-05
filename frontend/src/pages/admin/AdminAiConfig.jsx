import React, { useState } from 'react';
import { 
  Bot, 
  Cpu, 
  Sliders, 
  Sparkles, 
  Save, 
  Activity, 
  Zap,
  CheckCircle2
} from 'lucide-react';
import toast from 'react-hot-toast';
import FloatingFrap from '../../components/FloatingFrap';

const AdminAiConfig = () => {
  const [config, setConfig] = useState({
    activeProvider: 'Gemini (Google AI Studio)',
    tutorModel: 'gemini-1.5-pro-latest',
    interviewModel: 'gemini-1.5-flash',
    temperature: 0.2,
    maxTokens: 2048,
    enableRAG: true,
    enableGrounding: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("AI Model configuration & prompt hyperparameters saved!");
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-white p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#242728] pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider text-white/50 bg-[#101111] border border-[#242728] uppercase">
              <Bot className="h-3.5 w-3.5 text-white/80" />
              <span>Model Hyperparameters</span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              AI Engine & Provider Orchestration
            </h1>
            <p className="text-xs sm:text-sm text-white/45">
              Configure LLM routing, latency thresholds, temperature and RAG vector parameters.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="mc-btn mc-btn-primary text-xs sm:text-sm inline-flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Configuration</span>
          </button>
        </div>

        {/* Configuration Card */}
        <div className="rounded-xl bg-[#0d0d0d] p-6 sm:p-8 border border-[#242728] space-y-6">
          <form onSubmit={handleSave} className="space-y-6 text-xs sm:text-sm">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase text-white/50 block mb-1">Primary AI Provider</label>
                <select
                  value={config.activeProvider}
                  onChange={(e) => setConfig({ ...config, activeProvider: e.target.value })}
                  className="w-full rounded-lg border border-[#242728] bg-[#101111] p-2.5 text-xs text-white focus:outline-none"
                >
                  <option value="Gemini (Google AI Studio)">Google Gemini API (Official)</option>
                  <option value="OpenAI GPT-4o">OpenAI GPT-4o / Turbo</option>
                  <option value="Hybrid Router">Hybrid Router (Fast Fallback)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-white/50 block mb-1">Tutor & Doubt Resolution Model</label>
                <select
                  value={config.tutorModel}
                  onChange={(e) => setConfig({ ...config, tutorModel: e.target.value })}
                  className="w-full rounded-lg border border-[#242728] bg-[#101111] p-2.5 text-xs text-white focus:outline-none"
                >
                  <option value="gemini-1.5-pro-latest">Gemini 1.5 Pro (Deep Reasoning & STEM)</option>
                  <option value="gpt-4o">GPT-4o (Omni)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase text-white/50 block mb-1">Real-time Interview Model</label>
                <select
                  value={config.interviewModel}
                  onChange={(e) => setConfig({ ...config, interviewModel: e.target.value })}
                  className="w-full rounded-lg border border-[#242728] bg-[#101111] p-2.5 text-xs text-white focus:outline-none"
                >
                  <option value="gemini-1.5-flash">Gemini 1.5 Flash (Sub-300ms Dynamic Follow-ups)</option>
                  <option value="gpt-4o-mini">GPT-4o Mini</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-white/50 block mb-1">
                  Temperature: <span className="font-mono text-emerald-400 font-medium">{config.temperature}</span> (Strict Syllabus Grounding)
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={config.temperature}
                  onChange={(e) => setConfig({ ...config, temperature: Number(e.target.value) })}
                  className="w-full mt-2 accent-white"
                />
              </div>
            </div>

            {/* Toggle Switches */}
            <div className="pt-4 border-t border-[#242728] space-y-3">
              <h3 className="font-mono uppercase text-xs text-white/50 tracking-wider">Guardrails & Vector RAG</h3>
              
              <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#101111] border border-[#242728]">
                <div>
                  <div className="font-semibold text-white text-xs">Retrieval-Augmented Generation (RAG) Grounding</div>
                  <p className="text-[11px] text-white/45">Forces tutor answers to cite official NCERT and verified question bank sources.</p>
                </div>
                <input
                  type="checkbox"
                  checked={config.enableRAG}
                  onChange={(e) => setConfig({ ...config, enableRAG: e.target.checked })}
                  className="h-4 w-4 rounded accent-white"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#101111] border border-[#242728]">
                <div>
                  <div className="font-semibold text-white text-xs">Deterministic Objective Test Scoring Enforcement</div>
                  <p className="text-[11px] text-white/45">Never allow LLM hallucinations to determine MCQ/NAT scores; enforce server mathematical truth keys.</p>
                </div>
                <input
                  type="checkbox"
                  checked={config.enableGrounding}
                  onChange={(e) => setConfig({ ...config, enableGrounding: e.target.checked })}
                  className="h-4 w-4 rounded accent-white"
                />
              </div>
            </div>

          </form>
        </div>

      </div>
      <FloatingFrap />
    </div>
  );
};

export default AdminAiConfig;
