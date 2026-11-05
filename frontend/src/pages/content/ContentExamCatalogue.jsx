import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import { 
  BookOpen, 
  Plus, 
  Clock, 
  CheckCircle2,
  Layers,
  Sparkles
} from 'lucide-react';
import toast from 'react-hot-toast';
import FloatingFrap from '../../components/FloatingFrap';
import SpotlightCard from '../../components/SpotlightCard';

const ContentExamCatalogue = () => {
  const [exams, setExams] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'entrance',
    conductingBody: '',
    officialWebsite: '',
    duration: 120,
    correctMarks: 4,
    negativeMarks: -1
  });

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await api.get('/api/prepai/exams');
        setExams(res.data);
      } catch (err) {
        console.warn("Error fetching exams:", err.message);
      }
    };
    fetchExams();
  }, []);

  const handleCreateExam = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter examination title");
      return;
    }

    try {
      const res = await api.post('/api/prepai/exams', {
        name: formData.name,
        category: formData.category,
        conductingBody: formData.conductingBody || 'National Testing Authority',
        officialWebsite: formData.officialWebsite || 'https://prepai.io',
        duration: Number(formData.duration),
        markingScheme: { correctMarks: Number(formData.correctMarks), negativeMarks: Number(formData.negativeMarks), partialMarking: true },
        stages: ['Preliminary CBT', 'Advanced CBT'],
        syllabus: [
          { subject: 'Module 1', topics: ['Core Foundations', 'Advanced Theorems'] }
        ]
      });
      setExams([...exams, res.data]);
      toast.success("New examination track published to PrepAI catalogue!");
    } catch {
      const fallbackExam = {
        id: 'exam_' + Date.now(),
        name: formData.name,
        category: formData.category,
        conductingBody: formData.conductingBody || 'National Testing Authority',
        duration: Number(formData.duration),
        markingScheme: { correctMarks: Number(formData.correctMarks), negativeMarks: Number(formData.negativeMarks) }
      };
      setExams([...exams, fallbackExam]);
      toast.success("Examination added locally!");
    }
    setShowAddModal(false);
    setFormData({
      name: '',
      category: 'entrance',
      conductingBody: '',
      officialWebsite: '',
      duration: 120,
      correctMarks: 4,
      negativeMarks: -1
    });
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-white p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#242728] pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider text-white/50 bg-[#101111] border border-[#242728] uppercase">
              <BookOpen className="h-3.5 w-3.5 text-white/80" />
              <span>Exam & Syllabus Architecture</span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Examination Catalogue & Syllabus Tree Manager
            </h1>
            <p className="text-xs sm:text-sm text-white/45">
              Define official examination profiles, sectional durations, and marking schemes.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="mc-btn mc-btn-primary text-xs sm:text-sm inline-flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Exam Profile</span>
          </button>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {exams.map((exam) => (
            <SpotlightCard
              key={exam.id || exam._id}
              className="p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="mc-keycap text-[10px] font-mono uppercase">
                    {exam.category}
                  </span>
                  <span className="flex items-center text-xs text-white/45">
                    <Clock className="h-3.5 w-3.5 mr-1" /> {exam.duration} mins
                  </span>
                </div>

                <h3 className="mt-3 text-base font-semibold text-white">{exam.name}</h3>
                <p className="mt-1 text-xs text-white/45">{exam.conductingBody}</p>

                <div className="mt-4 rounded-lg bg-[#101111] p-3 border border-[#242728] text-xs text-white/70 space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span className="text-white/45">Correct Answer:</span>
                    <strong className="text-emerald-400">+{exam.markingScheme?.correctMarks || 4}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/45">Negative Mark:</span>
                    <strong className="text-rose-400">{exam.markingScheme?.negativeMarks || -1}</strong>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#242728] flex items-center justify-between text-xs">
                <span className="text-white/35 font-mono">Status: Active</span>
                <span className="inline-flex items-center gap-1 text-emerald-400 font-medium text-[11px]">
                  <CheckCircle2 className="h-3 w-3" />
                  Verified Rubric
                </span>
              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>

      {/* Add Exam Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-[#0d0d0d] border border-[#242728] p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#242728] pb-3">
              <div className="flex items-center gap-2">
                <span className="traffic-dot traffic-dot-red" />
                <span className="traffic-dot traffic-dot-yellow" />
                <span className="traffic-dot traffic-dot-green" />
                <h3 className="ml-2 text-base font-semibold text-white">Add New Examination Track</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-white/40 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateExam} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="text-xs font-mono uppercase text-white/50 block mb-1">Examination Title</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. GATE Computer Science 2026, CLAT UG"
                  className="w-full rounded-lg border border-[#242728] bg-[#101111] p-2.5 text-xs text-white placeholder-white/35 focus:border-white/50 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono uppercase text-white/50 block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-lg border border-[#242728] bg-[#101111] p-2.5 text-xs text-white"
                  >
                    <option value="entrance">Entrance Examination</option>
                    <option value="civil_services">Civil Services</option>
                    <option value="government">Government Jobs</option>
                    <option value="corporate">Corporate & Tech</option>
                    <option value="study_abroad">Study Abroad</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-white/50 block mb-1">Duration (Minutes)</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full rounded-lg border border-[#242728] bg-[#101111] p-2.5 text-xs font-mono text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono uppercase text-white/50 block mb-1">Correct Mark (+)</label>
                  <input
                    type="number"
                    value={formData.correctMarks}
                    onChange={(e) => setFormData({ ...formData, correctMarks: e.target.value })}
                    className="w-full rounded-lg border border-[#242728] bg-[#101111] p-2.5 text-xs font-mono text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-white/50 block mb-1">Negative Mark (-)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.negativeMarks}
                    onChange={(e) => setFormData({ ...formData, negativeMarks: e.target.value })}
                    className="w-full rounded-lg border border-[#242728] bg-[#101111] p-2.5 text-xs font-mono text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-white/50 block mb-1">Conducting Authority</label>
                <input
                  type="text"
                  value={formData.conductingBody}
                  onChange={(e) => setFormData({ ...formData, conductingBody: e.target.value })}
                  placeholder="e.g. IIT Roorkee, NTA, UPSC"
                  className="w-full rounded-lg border border-[#242728] bg-[#101111] p-2.5 text-xs text-white placeholder-white/35 focus:border-white/50 focus:outline-none"
                />
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
                  Save Exam Profile
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

export default ContentExamCatalogue;
