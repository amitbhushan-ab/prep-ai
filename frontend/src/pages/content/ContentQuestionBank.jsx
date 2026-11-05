import React, { useState } from 'react';
import api from '../../lib/api';
import { 
  Layers, 
  Plus, 
  Search, 
  FileEdit,
  Sparkles,
  CheckCircle2,
  Clock
} from 'lucide-react';
import toast from 'react-hot-toast';
import FloatingFrap from '../../components/FloatingFrap';
import SpotlightCard from '../../components/SpotlightCard';

const ContentQuestionBank = () => {
  const [questions, setQuestions] = useState([
    {
      id: 'qb_1',
      exam: 'JEE Advanced 2026',
      subject: 'Physics',
      type: 'MCQ',
      difficulty: 'Hard',
      text: 'A charged particle having charge q and mass m enters a uniform magnetic field B perpendicular to its velocity v. What is the radius of the circular path?',
      marks: 4,
      negativeMarks: -1,
      status: 'approved'
    },
    {
      id: 'qb_2',
      exam: 'JEE Advanced 2026',
      subject: 'Mathematics',
      type: 'NAT',
      difficulty: 'Medium',
      text: 'Numerical Answer: If f(x) = 3x^2 - 12x + 7, find the minimum value of f(x) for all real x.',
      marks: 4,
      negativeMarks: 0,
      status: 'approved'
    },
    {
      id: 'qb_3',
      exam: 'UPSC CSE',
      subject: 'Polity',
      type: 'MCQ',
      difficulty: 'Medium',
      text: 'With reference to the Constitution of India, which right was described by Dr. B.R. Ambedkar as the Heart and Soul of the Constitution?',
      marks: 2,
      negativeMarks: -0.66,
      status: 'in_review'
    },
    {
      id: 'qb_4',
      exam: 'Full-Stack SWE',
      subject: 'Computer Science',
      type: 'Coding',
      difficulty: 'Hard',
      text: 'Implement a function serialize(root) and deserialize(data) for a Binary Tree with O(N) runtime complexity.',
      marks: 10,
      negativeMarks: 0,
      status: 'approved'
    }
  ]);

  const [search, setSearch] = useState('');
  const [selectedExam, setSelectedExam] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQ, setNewQ] = useState({
    exam: 'JEE Advanced 2026',
    subject: 'Physics',
    type: 'MCQ',
    difficulty: 'Medium',
    text: '',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswer: 'A',
    marks: 4,
    negativeMarks: -1,
    explanation: ''
  });

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!newQ.text) {
      toast.error('Question text is required');
      return;
    }

    try {
      await api.post('/api/prepai/content/questions', newQ);
    } catch {
      // Offline / demo fallback
    }

    setQuestions([
      {
        ...newQ,
        id: `qb_${Date.now()}`,
        status: 'in_review'
      },
      ...questions
    ]);

    setShowAddModal(false);
    toast.success('Question authored and submitted for editorial review');
    setNewQ({
      exam: 'JEE Advanced 2026',
      subject: 'Physics',
      type: 'MCQ',
      difficulty: 'Medium',
      text: '',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 'A',
      marks: 4,
      negativeMarks: -1,
      explanation: ''
    });
  };

  const filtered = questions.filter((q) => {
    const matchesSearch =
      q.text.toLowerCase().includes(search.toLowerCase()) ||
      q.subject.toLowerCase().includes(search.toLowerCase());
    const matchesExam = selectedExam === 'all' || q.exam === selectedExam;
    return matchesSearch && matchesExam;
  });

  return (
    <div className="min-h-screen bg-[#07080a] text-white p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#242728] pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider text-white/50 bg-[#101111] border border-[#242728] uppercase">
              <Layers className="h-3.5 w-3.5 text-white/80" />
              <span>CONTENT STUDIO</span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Universal Question Bank
            </h1>
            <p className="text-xs sm:text-sm text-white/45">
              Author, tag, and verify examination items (MCQ, MSQ, NAT, Descriptive).
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="mc-btn mc-btn-primary text-xs sm:text-sm inline-flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create New Question</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl bg-[#0d0d0d] p-3 border border-[#242728]">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-white/35" />
            <input
              type="text"
              placeholder="Search by topic or text..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-[#242728] pl-10 pr-4 py-2 text-xs sm:text-sm focus:border-white/50 focus:outline-none bg-[#101111] text-white placeholder-white/35"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="w-full sm:w-auto rounded-lg border border-[#242728] px-4 py-2 text-xs font-medium text-white/80 focus:outline-none bg-[#101111]"
            >
              <option value="all">All Examinations</option>
              <option value="JEE Advanced 2026">JEE Advanced 2026</option>
              <option value="UPSC CSE">UPSC CSE</option>
              <option value="Full-Stack SWE">Full-Stack SWE</option>
            </select>
          </div>
        </div>

        {/* Questions Table */}
        <div className="rounded-xl bg-[#0d0d0d] border border-[#242728] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#101111] border-b border-[#242728] text-white/45 font-medium uppercase text-[10px] tracking-wider font-mono">
                <tr>
                  <th className="p-4">Question Statement</th>
                  <th className="p-4">Exam & Subject</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Marking</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#242728] text-white/80">
                {filtered.map((q) => (
                  <tr key={q.id} className="hover:bg-[#121212] transition">
                    <td className="p-4 max-w-md font-medium text-white/90">
                      <div className="line-clamp-2">{q.text}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-white">{q.exam}</div>
                      <div className="text-xs text-white/40">{q.subject}</div>
                    </td>
                    <td className="p-4">
                      <span className="mc-keycap text-[10px] font-mono">
                        {q.type}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-xs">
                      <span className="text-emerald-400 font-medium">+{q.marks}</span> / <span className="text-rose-400 font-medium">{q.negativeMarks}</span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                        q.status === 'approved' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                      }`}>
                        {q.status === 'approved' ? (
                          <>
                            <CheckCircle2 className="h-3 w-3" />
                            Approved
                          </>
                        ) : (
                          <>
                            <Clock className="h-3 w-3" />
                            In Review
                          </>
                        )}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => toast.success("Question loaded")}
                        className="rounded-lg p-2 text-white/40 hover:bg-[#151617] hover:text-white"
                      >
                        <FileEdit className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Add Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl bg-[#0d0d0d] border border-[#242728] p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#242728] pb-3">
              <div className="flex items-center gap-2">
                <span className="traffic-dot traffic-dot-red" />
                <span className="traffic-dot traffic-dot-yellow" />
                <span className="traffic-dot traffic-dot-green" />
                <h3 className="ml-2 text-base font-semibold text-white">Create Syllabus Question</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-white/40 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddQuestion} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono uppercase text-white/50 block mb-1">Target Exam</label>
                  <select
                    value={newQ.exam}
                    onChange={(e) => setNewQ({ ...newQ, exam: e.target.value })}
                    className="w-full rounded-lg border border-[#242728] p-2.5 px-3 text-xs bg-[#101111] text-white"
                  >
                    <option value="JEE Advanced 2026">JEE Advanced 2026</option>
                    <option value="UPSC CSE">UPSC Civil Services</option>
                    <option value="CAT 2026">CAT 2026</option>
                    <option value="Full-Stack SWE">Full-Stack SWE</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-white/50 block mb-1">Subject</label>
                  <input
                    type="text"
                    value={newQ.subject}
                    onChange={(e) => setNewQ({ ...newQ, subject: e.target.value })}
                    className="w-full rounded-lg border border-[#242728] p-2.5 px-3 text-xs bg-[#101111] text-white"
                    placeholder="e.g. Physics, Calculus"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-white/50 block mb-1">Question Statement</label>
                <textarea
                  rows={4}
                  value={newQ.text}
                  onChange={(e) => setNewQ({ ...newQ, text: e.target.value })}
                  placeholder="Enter full question statement..."
                  className="w-full rounded-lg border border-[#242728] bg-[#101111] p-3 text-xs focus:border-white/50 focus:outline-none text-white placeholder-white/35"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono uppercase text-white/50 block mb-1">Correct Answer / Key</label>
                  <input
                    type="text"
                    value={newQ.correctAnswer}
                    onChange={(e) => setNewQ({ ...newQ, correctAnswer: e.target.value })}
                    className="w-full rounded-lg border border-[#242728] p-2.5 px-3 text-xs font-mono bg-[#101111] text-white"
                    placeholder="e.g. A"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-white/50 block mb-1">Marks (+)</label>
                  <input
                    type="number"
                    value={newQ.marks}
                    onChange={(e) => setNewQ({ ...newQ, marks: Number(e.target.value) })}
                    className="w-full rounded-lg border border-[#242728] p-2.5 px-3 text-xs font-mono bg-[#101111] text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#242728]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="mc-btn mc-btn-outline text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="mc-btn mc-btn-primary text-xs"
                >
                  Save to Bank
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <FloatingFrap />
    </div>
  );
};

export default ContentQuestionBank;
