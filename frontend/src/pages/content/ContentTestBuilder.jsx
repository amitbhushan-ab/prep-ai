import React, { useState } from 'react';
import { 
  FileEdit, 
  Sparkles,
  Clock, 
  CheckCircle2,
  Layers
} from 'lucide-react';
import toast from 'react-hot-toast';
import FloatingFrap from '../../components/FloatingFrap';
import SpotlightCard from '../../components/SpotlightCard';

const ContentTestBuilder = () => {
  const [testTitle, setTestTitle] = useState('All-India CBT Mock Test 2 – Full Length');
  const [targetExam, setTargetExam] = useState('JEE Advanced 2026');
  const duration = 180;
  const sections = [
    { name: 'Physics', qCount: 15, marks: 60 },
    { name: 'Chemistry', qCount: 15, marks: 60 },
    { name: 'Mathematics', qCount: 15, marks: 60 }
  ];

  const handlePublishTest = () => {
    toast.success(`Mock test "${testTitle}" assembled & published to candidate portal!`);
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-white p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#242728] pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider text-white/50 bg-[#101111] border border-[#242728] uppercase">
              <FileEdit className="h-3.5 w-3.5 text-white/80" />
              <span>Assessment Studio</span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              CBT Mock Test Builder & Section Assembler
            </h1>
            <p className="text-xs sm:text-sm text-white/45">
              Assemble questions, set section timers, and assign marking schemes for computer-based tests.
            </p>
          </div>

          <button
            onClick={handlePublishTest}
            className="mc-btn mc-btn-primary text-xs sm:text-sm inline-flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            <span>Publish Test to Live Catalogue</span>
          </button>
        </div>

        {/* Builder Form Card */}
        <div className="rounded-xl bg-[#0d0d0d] p-6 sm:p-8 border border-[#242728] space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono uppercase text-white/50 block mb-1">Test Title</label>
              <input
                type="text"
                value={testTitle}
                onChange={(e) => setTestTitle(e.target.value)}
                className="w-full rounded-lg border border-[#242728] bg-[#101111] p-2.5 text-xs sm:text-sm text-white focus:border-white/50 focus:outline-none font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-white/50 block mb-1">Target Examination</label>
              <select
                value={targetExam}
                onChange={(e) => setTargetExam(e.target.value)}
                className="w-full rounded-lg border border-[#242728] bg-[#101111] p-2.5 text-xs sm:text-sm text-white focus:border-white/50 focus:outline-none"
              >
                <option value="JEE Advanced 2026">JEE Advanced 2026</option>
                <option value="UPSC CSE">UPSC Civil Services Prelims</option>
                <option value="CAT 2026">CAT 2026 (IIMs)</option>
                <option value="Full-Stack SWE">Full-Stack SWE Benchmark</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="rounded-lg bg-[#101111] p-4 border border-[#242728]">
              <span className="text-white/45 uppercase text-[10px] tracking-wider block">Total Duration</span>
              <div className="mt-1 flex items-center gap-1.5 text-base font-semibold text-white">
                <Clock className="h-4 w-4 text-white/70" /> {duration} Minutes
              </div>
            </div>

            <div className="rounded-lg bg-[#101111] p-4 border border-[#242728]">
              <span className="text-white/45 uppercase text-[10px] tracking-wider block">Total Questions</span>
              <div className="mt-1 text-base font-semibold text-white">
                {sections.reduce((acc, s) => acc + s.qCount, 0)} Questions
              </div>
            </div>

            <div className="rounded-lg bg-[#101111] p-4 border border-[#242728]">
              <span className="text-white/45 uppercase text-[10px] tracking-wider block">Total Marks</span>
              <div className="mt-1 text-base font-semibold text-white">
                {sections.reduce((acc, s) => acc + s.marks, 0)} Marks
              </div>
            </div>
          </div>

          {/* Sectional Breakdown */}
          <div className="space-y-3 pt-3 border-t border-[#242728]">
            <h3 className="text-sm font-semibold text-white">Sectional Structure & Question Distribution</h3>
            <div className="space-y-2">
              {sections.map((sec, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg p-3.5 bg-[#101111] border border-[#242728] text-xs">
                  <div className="flex items-center gap-2 font-medium text-white">
                    <span className="h-2 w-2 rounded-full bg-white/70"></span>
                    <span>{sec.name}</span>
                  </div>
                  <div className="flex items-center gap-6 text-white/70 font-mono text-xs">
                    <span><strong className="text-white">{sec.qCount}</strong> Questions</span>
                    <span><strong className="text-white">{sec.marks}</strong> Marks</span>
                    <span className="mc-keycap text-[10px] text-emerald-400">Auto-balanced</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
      <FloatingFrap />
    </div>
  );
};

export default ContentTestBuilder;
