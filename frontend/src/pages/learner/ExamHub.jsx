import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import { 
  Compass, 
  Search, 
  BookOpen, 
  Clock, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FloatingFrap from '../../components/FloatingFrap';

const ExamHub = () => {
  const [exams, setExams] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeExam, setActiveExam] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await api.get('/api/prepai/exams');
        setExams(res.data);
        if (res.data.length > 0) setActiveExam(res.data[0]);
      } catch (err) {
        console.warn("Error fetching exams:", err.message);
      }
    };
    fetchExams();
  }, []);

  const filteredExams = exams.filter(e => {
    const matchCat = selectedCategory === 'all' || e.category === selectedCategory;
    const matchSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        e.conductingBody?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#07080a] text-[#cdcdcd] py-8 px-4 sm:px-6 lg:px-8 rc-grid-pattern">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 mc-keycap text-[10px] text-[#57c1ff]">
              <Compass className="h-3 w-3" />
              <span>OFFICIAL SYLLABUS DIRECTORY</span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-[#f4f4f6]">
              Examination Catalogue & Syllabus Trees
            </h1>
            <p className="text-xs text-[#9c9c9d]">
              Verified patterns, section-by-section breakdown, and official marking schemes.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-2.5 h-3.5 w-3.5 text-[#6a6b6c]" />
            <input
              type="text"
              placeholder="Search JEE, UPSC, CAT, IELTS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-[#242728] bg-[#0d0d0d] pl-9 pr-3 py-2 text-xs text-[#f4f4f6] placeholder-[#6a6b6c] focus:border-[#57c1ff] focus:outline-none"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'All Exams' },
            { id: 'entrance', label: 'Engineering & Medical' },
            { id: 'civil_services', label: 'Civil Services (UPSC)' },
            { id: 'government', label: 'Govt & Banking' },
            { id: 'corporate', label: 'Tech & SWE' },
            { id: 'study_abroad', label: 'Study Abroad (IELTS/GRE)' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-md px-3 py-1.5 text-xs transition ${
                selectedCategory === cat.id
                  ? 'bg-[#18191a] text-[#f4f4f6] border border-[#242728]'
                  : 'text-[#9c9c9d] hover:bg-[#101111] hover:text-[#cdcdcd]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Exam Cards */}
          <div className="lg:col-span-5 space-y-2.5">
            {filteredExams.map((exam) => {
              const isSelected = activeExam?.id === exam.id;
              return (
                <div
                  key={exam.id}
                  onClick={() => setActiveExam(exam)}
                  className={`cursor-pointer rounded-lg p-4 border transition ${
                    isSelected
                      ? 'bg-[#101111] border-[#57c1ff] shadow-sm'
                      : 'bg-[#0d0d0d] border-[#242728] hover:border-[rgba(255,255,255,0.18)]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="mc-keycap text-[10px]">
                      {exam.badge || exam.category}
                    </span>
                    <span className="flex items-center text-[10px] text-[#6a6b6c] font-mono">
                      <Clock className="h-3 w-3 mr-1" /> {exam.duration} Mins
                    </span>
                  </div>

                  <h3 className="mt-2 text-sm font-semibold text-[#f4f4f6]">{exam.name}</h3>
                  <p className="mt-0.5 text-xs text-[#9c9c9d]">{exam.conductingBody}</p>

                  <div className="mt-4 flex items-center justify-between border-t border-[#18191a] pt-3 text-xs">
                    <span className="text-[#9c9c9d] font-mono text-[11px]">
                      Marking: <strong className="text-[#59d499]">+{exam.markingScheme?.correctMarks}</strong> / <strong className="text-[#ff6161]">{exam.markingScheme?.negativeMarks}</strong>
                    </span>
                    <span className="text-[#57c1ff] text-xs flex items-center">
                      View Syllabus <ChevronRight className="h-3 w-3 ml-0.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Full Detail & Syllabus Tree */}
          <div className="lg:col-span-7">
            {activeExam ? (
              <div className="rounded-xl bg-[#0d0d0d] p-6 border border-[#242728] space-y-5">
                
                {/* Title */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#242728] pb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-[#f4f4f6]">{activeExam.name}</h2>
                    <p className="text-xs text-[#6a6b6c] font-mono mt-0.5">{activeExam.conductingBody}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/mock-tests?examId=${activeExam.id}`)}
                      className="mc-btn mc-btn-primary text-xs py-1.5 px-3"
                    >
                      Start CBT Mock
                    </button>
                    {activeExam.officialWebsite && (
                      <a
                        href={activeExam.officialWebsite}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-md border border-[#242728] p-1.5 text-[#9c9c9d] hover:text-[#f4f4f6]"
                        title="Official Portal"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="rounded-md bg-[#101111] p-3 border border-[#242728]">
                    <div className="text-[#6a6b6c] text-[10px] font-mono uppercase">Duration</div>
                    <div className="text-sm font-semibold font-mono text-[#f4f4f6] mt-0.5">{activeExam.duration} Minutes</div>
                  </div>
                  <div className="rounded-md bg-[#101111] p-3 border border-[#242728]">
                    <div className="text-[#6a6b6c] text-[10px] font-mono uppercase">Marking Scheme</div>
                    <div className="text-sm font-semibold font-mono text-[#f4f4f6] mt-0.5">
                      +{activeExam.markingScheme?.correctMarks} / {activeExam.markingScheme?.negativeMarks}
                    </div>
                  </div>
                  <div className="rounded-md bg-[#101111] p-3 border border-[#242728]">
                    <div className="text-[#6a6b6c] text-[10px] font-mono uppercase">Stages</div>
                    <div className="text-sm font-semibold font-mono text-[#f4f4f6] mt-0.5">
                      {activeExam.stages?.length || 1} Stages
                    </div>
                  </div>
                </div>

                {/* Syllabus Tree Breakdown */}
                <div>
                  <h4 className="text-xs font-mono uppercase text-[#6a6b6c] mb-2.5">Syllabus Breakdown</h4>
                  <div className="space-y-2.5">
                    {activeExam.syllabus?.map((sub, idx) => (
                      <div key={idx} className="rounded-lg border border-[#242728] bg-[#101111] p-4">
                        <div className="flex items-center gap-2 font-medium text-xs text-[#f4f4f6]">
                          <BookOpen className="h-3.5 w-3.5 text-[#57c1ff]" />
                          <span>{sub.subject}</span>
                        </div>
                        <div className="mt-2.5 flex flex-wrap gap-1.5 pl-5">
                          {sub.topics?.map((topic, tidx) => (
                            <span 
                              key={tidx}
                              className="rounded bg-[#18191a] px-2 py-0.5 text-[11px] text-[#cdcdcd] border border-[#242728]"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Practice CTA */}
                <div className="rounded-lg bg-[#101111] p-4 text-xs text-[#cdcdcd] border border-[#242728] flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-[#f4f4f6]">Need conceptual guidance?</h4>
                    <p className="text-[11px] text-[#9c9c9d]">Ask the PrepAI Tutor to explain syllabus principles step-by-step.</p>
                  </div>
                  <button
                    onClick={() => navigate('/ai-tutor')}
                    className="mc-btn mc-btn-outline text-xs py-1.5 px-3"
                  >
                    Open Tutor
                  </button>
                </div>

              </div>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-[#242728] text-xs text-[#6a6b6c]">
                Select an examination to inspect pattern
              </div>
            )}
          </div>

        </div>

      </div>

      <FloatingFrap />
    </div>
  );
};

export default ExamHub;
