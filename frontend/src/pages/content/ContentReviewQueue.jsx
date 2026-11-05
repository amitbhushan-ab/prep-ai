import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Check, 
  X, 
  Sparkles,
  Layers,
  Clock
} from 'lucide-react';
import toast from 'react-hot-toast';
import FloatingFrap from '../../components/FloatingFrap';
import SpotlightCard from '../../components/SpotlightCard';

const ContentReviewQueue = () => {
  const [queue, setQueue] = useState([
    {
      id: 'rev_1',
      title: 'Electromagnetic Induction: Lenz Law Directionality in Non-uniform Fields',
      exam: 'JEE Advanced 2026',
      author: 'Physics Content Team A',
      type: 'MSQ (Multiple Correct)',
      submittedAt: '2 hours ago',
      aiQualityCheck: '98% High Accuracy (No Ambiguity Detected)',
      status: 'pending'
    },
    {
      id: 'rev_2',
      title: 'UPSC Mains GS-II: Role of Governor in Article 356 Discretionary Powers',
      exam: 'UPSC Civil Services',
      author: 'Polity SME Faculty',
      type: 'Descriptive Model Answer',
      submittedAt: '5 hours ago',
      aiQualityCheck: '94% Rubric Grounded in Supreme Court Judgments (SR Bommai case)',
      status: 'pending'
    },
    {
      id: 'rev_3',
      title: 'Database Indexing: B-Tree vs LSM-Tree Write Amplification',
      exam: 'Full-Stack SWE Benchmark',
      author: 'Tech Curriculum Lead',
      type: 'MCQ Single Choice',
      submittedAt: '1 day ago',
      aiQualityCheck: '99% Clean Code & Technical Soundness',
      status: 'pending'
    }
  ]);

  const handleApprove = (id) => {
    setQueue(queue.map(q => q.id === id ? { ...q, status: 'approved' } : q));
    toast.success("Question approved and published to candidate live pool!");
  };

  const handleReject = (id) => {
    setQueue(queue.map(q => q.id === id ? { ...q, status: 'rejected' } : q));
    toast.error("Feedback sent to author for revision.");
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-white p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        
        {/* Header */}
        <div className="border-b border-[#242728] pb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider text-white/50 bg-[#101111] border border-[#242728] uppercase">
            <ShieldCheck className="h-3.5 w-3.5 text-white/80" />
            <span>Editorial Quality Assurance</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            SME Question Review & Verification Queue
          </h1>
          <p className="text-xs sm:text-sm text-white/45">
            Verify syllabus accuracy, check AI quality scores, and publish questions into graded tests.
          </p>
        </div>

        {/* Queue Items */}
        <div className="space-y-4">
          {queue.map((item) => (
            <SpotlightCard
              key={item.id}
              className={`p-6 transition ${
                item.status === 'approved' 
                  ? 'border-emerald-500/40' 
                  : item.status === 'rejected' 
                    ? 'border-rose-500/40' 
                    : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#242728] pb-3">
                <div className="flex items-center gap-2">
                  <span className="mc-keycap text-[10px] font-mono uppercase">
                    {item.exam}
                  </span>
                  <span className="text-xs text-white/45">{item.type}</span>
                </div>
                <span className="text-xs text-white/35 font-mono">Submitted: {item.submittedAt} by {item.author}</span>
              </div>

              <h3 className="mt-3 text-base font-semibold text-white">{item.title}</h3>

              {/* AI Verification Badge */}
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#101111] p-3 border border-[#242728] text-xs text-white/70">
                <Sparkles className="h-4 w-4 text-white/80 shrink-0" />
                <span><strong className="text-white">AI Rubric Audit:</strong> {item.aiQualityCheck}</span>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex items-center justify-between pt-2">
                <div>
                  {item.status === 'approved' && (
                    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Approved & Published ✓
                    </span>
                  )}
                  {item.status === 'rejected' && (
                    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      Revision Requested ↺
                    </span>
                  )}
                  {item.status === 'pending' && (
                    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      Pending SME Sign-off
                    </span>
                  )}
                </div>

                {item.status === 'pending' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleReject(item.id)}
                      className="mc-btn mc-btn-outline text-xs inline-flex items-center gap-1 hover:text-rose-400"
                    >
                      <X className="h-3.5 w-3.5" /> Request Changes
                    </button>
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="mc-btn mc-btn-primary text-xs inline-flex items-center gap-1"
                    >
                      <Check className="h-3.5 w-3.5" /> Approve & Publish
                    </button>
                  </div>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
      <FloatingFrap />
    </div>
  );
};

export default ContentReviewQueue;
