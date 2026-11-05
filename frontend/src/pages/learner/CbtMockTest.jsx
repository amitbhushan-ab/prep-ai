import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../lib/api';
import { 
  Clock, 
  Calculator, 
  Bookmark, 
  AlertTriangle, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles,
  Check,
  Layers
} from 'lucide-react';
import toast from 'react-hot-toast';
import FloatingFrap from '../../components/FloatingFrap';

const CbtMockTest = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [test, setTest] = useState(null);
  const [availableTests, setAvailableTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [visited, setVisited] = useState(new Set([0]));
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcInput, setCalcInput] = useState('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const autoSubmitRef = useRef(null);

  // Helper to pick best matching test based on URL params or fallback
  const pickTargetTest = (testsList, testIdParam, examIdParam, examNameParam) => {
    if (!testsList || testsList.length === 0) return null;
    if (testIdParam) {
      const match = testsList.find(t => t.id === testIdParam);
      if (match) return match;
    }
    if (examIdParam) {
      const match = testsList.find(t => 
        t.examId === examIdParam || 
        t.id?.toLowerCase().includes(examIdParam.toLowerCase())
      );
      if (match) return match;
    }
    if (examNameParam) {
      const lower = examNameParam.toLowerCase();
      const match = testsList.find(t => 
        t.title?.toLowerCase().includes(lower) || 
        t.stream?.toLowerCase().includes(lower) ||
        (lower.includes('neet') && t.id.includes('neet')) ||
        (lower.includes('upsc') && t.id.includes('upsc')) ||
        (lower.includes('gate') && t.id.includes('gate')) ||
        (lower.includes('cat') && t.id.includes('cat')) ||
        (lower.includes('swe') && t.id.includes('swe')) ||
        (lower.includes('ssc') && t.id.includes('ssc')) ||
        (lower.includes('ielts') && t.id.includes('ielts')) ||
        (lower.includes('jee') && t.id.includes('jee'))
      );
      if (match) return match;
    }
    return testsList[0];
  };

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await api.get('/api/prepai/tests');
        if (res.data && res.data.length > 0) {
          setAvailableTests(res.data);
          const target = pickTargetTest(
            res.data, 
            searchParams.get('testId'), 
            searchParams.get('examId'),
            searchParams.get('examName')
          );
          if (target) {
            setTest(target);
            setTimeLeft((target.durationMinutes || 45) * 60);
          }
        }
      } catch (err) {
        console.warn("Using local fallback test:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTest();
  }, []);

  const handleSwitchStreamOrTest = (selectedTestId) => {
    const target = availableTests.find(t => t.id === selectedTestId);
    if (!target) return;
    setTest(target);
    setTestResult(null);
    setCurrentIndex(0);
    setResponses({});
    setMarkedForReview(new Set());
    setVisited(new Set([0]));
    setTimeLeft((target.durationMinutes || 45) * 60);
    setSearchParams({ testId: target.id, ...(target.examId ? { examId: target.examId } : {}) });
    toast.success(`Switched to ${target.title} (${target.questions?.length || 10} Questions)`, { icon: '🎯' });
  };

  useEffect(() => {
    if (!test || testResult || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          autoSubmitRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [test, testResult, timeLeft]);

  // Keep the auto-submit handler current without re-creating the timer.
  useEffect(() => {
    autoSubmitRef.current = handleAutoSubmit;
  });

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = test?.questions?.[currentIndex];

  const handleSelectOption = (optId) => {
    if (!currentQ) return;
    if (currentQ.type === 'MSQ') {
      const currentArr = Array.isArray(responses[currentQ.id]) ? [...responses[currentQ.id]] : [];
      const exists = currentArr.includes(optId);
      const nextArr = exists ? currentArr.filter(x => x !== optId) : [...currentArr, optId];
      setResponses({ ...responses, [currentQ.id]: nextArr });
    } else {
      setResponses({ ...responses, [currentQ.id]: optId });
    }
  };

  const handleNatChange = (val) => {
    if (!currentQ) return;
    setResponses({ ...responses, [currentQ.id]: val });
  };

  const handleClearResponse = () => {
    if (!currentQ) return;
    const next = { ...responses };
    delete next[currentQ.id];
    setResponses(next);
    toast.success("Response cleared", { duration: 1500 });
  };

  const handleToggleMarkReview = () => {
    if (!currentQ) return;
    const next = new Set(markedForReview);
    if (next.has(currentIndex)) {
      next.delete(currentIndex);
    } else {
      next.add(currentIndex);
    }
    setMarkedForReview(next);
  };

  const handleNext = () => {
    if (!test) return;
    if (currentIndex < test.questions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setVisited(new Set([...visited, nextIdx]));
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      setVisited(new Set([...visited, prevIdx]));
    }
  };

  const jumpToQuestion = (idx) => {
    setCurrentIndex(idx);
    setVisited(new Set([...visited, idx]));
  };

  const getQuestionStatus = (idx) => {
    const q = test.questions[idx];
    const hasAnswer = responses[q.id] !== undefined && responses[q.id] !== '' && (!Array.isArray(responses[q.id]) || responses[q.id].length > 0);
    const isMarked = markedForReview.has(idx);
    const isVisited = visited.has(idx);

    if (hasAnswer && isMarked) return 'answered_marked';
    if (isMarked) return 'marked';
    if (hasAnswer) return 'answered';
    if (isVisited) return 'not_answered';
    return 'not_visited';
  };

  const handleAutoSubmit = () => {
    toast("Time expired! Submitting test...", { icon: '⏰' });
    handleSubmit();
  };

  const handleSubmit = async () => {
    setShowSubmitModal(false);
    try {
      const res = await api.post('/api/prepai/tests/submit', {
        testId: test.id,
        responses,
        timeSpentSeconds: ((test.durationMinutes || 45) * 60) - timeLeft
      });
      setTestResult(res.data);
      toast.success("Test submitted successfully!");
    } catch {
      let correct = 0;
      let incorrect = 0;
      let unattempted = 0;
      const evalQs = test.questions.map(q => {
        const uAns = responses[q.id];
        if (!uAns) {
          unattempted++;
          return { ...q, status: 'unattempted', marksEarned: 0 };
        }
        const isCorr = String(uAns) === String(q.correctAnswer);
        if (isCorr) {
          correct++;
          return { ...q, status: 'correct', marksEarned: q.marks || 4 };
        } else {
          incorrect++;
          return { ...q, status: 'incorrect', marksEarned: -1 };
        }
      });
      setTestResult({
        testTitle: test.title,
        totalQuestions: test.questions.length,
        correctCount: correct,
        incorrectCount: incorrect,
        unattemptedCount: unattempted,
        totalScore: Math.max(0, (correct * 4) - incorrect),
        maxMarks: test.totalMarks || 40,
        accuracy: Math.round((correct / Math.max(1, correct + incorrect)) * 100),
        percentile: 89.2,
        evaluatedQuestions: evalQs
      });
      toast.success("Test evaluated!");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#07080a] text-[#cdcdcd] font-mono text-xs">
        <div className="text-center space-y-3">
          <div className="h-8 w-8 border-2 border-[#ff6161] border-t-transparent rounded-full animate-spin mx-auto" />
          <p>Mounting CBT environment...</p>
        </div>
      </div>
    );
  }

  // --- RESULT VIEW ---
  if (testResult) {
    return (
      <div className="min-h-screen bg-[#07080a] text-[#cdcdcd] py-8 px-4 sm:px-6 lg:px-8 rc-grid-pattern">
        <div className="mx-auto max-w-5xl space-y-6">
          
          {/* Header Card */}
          <div className="rounded-xl bg-[#0d0d0d] p-6 sm:p-8 border border-[#242728]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#242728] pb-6">
              <div>
                <span className="mc-keycap text-[10px] text-[#59d499]">
                  TEST CONCLUDED
                </span>
                <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-[#f4f4f6]">{testResult.testTitle}</h1>
                <p className="text-xs text-[#9c9c9d]">Deterministic scoring applied against official answer key</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {availableTests.length > 1 && (
                  <select
                    value={test?.id || ''}
                    onChange={(e) => handleSwitchStreamOrTest(e.target.value)}
                    className="rounded-md border border-[#242728] bg-[#101111] px-3 py-1.5 text-xs text-[#f4f4f6] font-medium focus:border-[#57c1ff] focus:outline-none cursor-pointer"
                  >
                    {availableTests.map(t => (
                      <option key={t.id} value={t.id}>
                        Switch to: {t.title} ({t.questions?.length || 10} Qs)
                      </option>
                    ))}
                  </select>
                )}
                <button
                  onClick={() => {
                    setTestResult(null);
                    setResponses({});
                    setMarkedForReview(new Set());
                    setTimeLeft((test?.durationMinutes || 45) * 60);
                    setCurrentIndex(0);
                  }}
                  className="mc-btn mc-btn-primary text-xs"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Retake Exam
                </button>
              </div>
            </div>

            {/* Score Cards Grid */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-lg bg-[#101111] p-4 border border-[#242728] text-center">
                <div className="text-3xl font-bold font-mono text-[#f4f4f6]">
                  {testResult.totalScore} <span className="text-xs font-normal text-[#6a6b6c]">/ {testResult.maxMarks}</span>
                </div>
                <div className="text-[10px] font-mono uppercase text-[#6a6b6c] mt-1">Total Marks</div>
              </div>

              <div className="rounded-lg bg-[#101111] p-4 border border-[#242728] text-center">
                <div className="text-3xl font-bold font-mono text-[#59d499]">{testResult.correctCount}</div>
                <div className="text-[10px] font-mono uppercase text-[#6a6b6c] mt-1">Correct</div>
              </div>

              <div className="rounded-lg bg-[#101111] p-4 border border-[#242728] text-center">
                <div className="text-3xl font-bold font-mono text-[#ff6161]">{testResult.incorrectCount}</div>
                <div className="text-[10px] font-mono uppercase text-[#6a6b6c] mt-1">Incorrect</div>
              </div>

              <div className="rounded-lg bg-[#101111] p-4 border border-[#242728] text-center">
                <div className="text-3xl font-bold font-mono text-[#57c1ff]">{testResult.accuracy}%</div>
                <div className="text-[10px] font-mono uppercase text-[#6a6b6c] mt-1">Accuracy</div>
              </div>
            </div>
          </div>

          {/* Solutions & Explanation Accordion */}
          <div className="rounded-xl bg-[#0d0d0d] p-6 border border-[#242728] space-y-4">
            <div>
              <h2 className="text-base font-semibold text-[#f4f4f6]">Question Solutions & Telemetry</h2>
              <p className="text-xs text-[#6a6b6c]">Syllabus answer key analysis</p>
            </div>

            <div className="space-y-3">
              {testResult.evaluatedQuestions.map((q, idx) => (
                <div 
                  key={idx}
                  className={`rounded-lg border p-4 transition ${
                    q.status === 'correct' 
                      ? 'border-[#59d499]/30 bg-[#101111]' 
                      : q.status === 'incorrect' 
                        ? 'border-[#ff6161]/30 bg-[#101111]' 
                        : 'border-[#242728] bg-[#101111]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-[#9c9c9d]">Q{idx + 1} • {q.section || 'General'}</span>
                    <span className={`mc-keycap text-[10px] ${
                      q.status === 'correct' ? 'text-[#59d499]' : q.status === 'incorrect' ? 'text-[#ff6161]' : 'text-[#9c9c9d]'
                    }`}>
                      {q.status} ({q.marksEarned > 0 ? `+${q.marksEarned}` : q.marksEarned})
                    </span>
                  </div>

                  <p className="mt-2 text-xs sm:text-sm font-medium text-[#f4f4f6] leading-relaxed">{q.text}</p>

                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="rounded-md bg-[#07080a] p-2.5 border border-[#242728]">
                      <span className="text-[#6a6b6c]">Your Input: </span>
                      <strong className={q.status === 'correct' ? 'text-[#59d499]' : 'text-[#ff6161]'}>
                        {Array.isArray(q.userAnswer) ? q.userAnswer.join(', ') : (q.userAnswer || 'Unattempted')}
                      </strong>
                    </div>
                    <div className="rounded-md bg-[#07080a] p-2.5 border border-[#242728]">
                      <span className="text-[#6a6b6c]">Official Key: </span>
                      <strong className="text-[#59d499]">
                        {Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer}
                      </strong>
                    </div>
                  </div>

                  {q.explanation && (
                    <div className="mt-3 rounded-md bg-[#07080a] p-3 text-xs text-[#cdcdcd] border border-[#242728]">
                      <div className="font-semibold text-[#57c1ff] mb-1">
                        Explanation:
                      </div>
                      {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // --- CBT ACTIVE TEST INTERFACE ---
  return (
    <div className="flex flex-col min-h-[calc(100vh-60px)] bg-[#07080a] text-[#cdcdcd]">
      
      {/* Top CBT Navigation Bar with Traffic Lights */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#242728] bg-[#0d0d0d] px-4 py-2.5 gap-2">
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1.5 mr-1">
            <span className="traffic-dot-red" />
            <span className="traffic-dot-yellow" />
            <span className="traffic-dot-green" />
          </div>
          <span className="mc-keycap text-[10px]">CBT Session</span>
          
          {/* Stream / Exam Selector Dropdown */}
          {availableTests.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-[#6a6b6c] font-mono hidden md:inline uppercase">Stream:</span>
              <select
                id="cbt-stream-select"
                value={test?.id || ''}
                onChange={(e) => handleSwitchStreamOrTest(e.target.value)}
                className="rounded-md border border-[#242728] bg-[#101111] px-2.5 py-1 text-xs text-[#f4f4f6] font-medium focus:border-[#57c1ff] focus:outline-none cursor-pointer hover:border-[rgba(255,255,255,0.25)] transition max-w-[280px] sm:max-w-[360px] truncate"
              >
                {availableTests.map((t) => (
                  <option key={t.id} value={t.id} className="bg-[#101111] text-[#f4f4f6]">
                    {t.title} ({t.questions?.length || 10} Qs)
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Live Timer Pill & Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-md bg-[#101111] px-3 py-1 border border-[#242728] text-[#ffc533] font-mono text-xs font-semibold">
            <Clock className="h-3.5 w-3.5" />
            <span>Time Left: {formatTime(timeLeft)}</span>
          </div>

          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className="mc-btn mc-btn-outline text-xs py-1 px-2.5"
          >
            <Calculator className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Calc</span>
          </button>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="mc-btn mc-btn-primary text-xs py-1 px-3 bg-[#ff6161] hover:bg-[#ff5757] text-white"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Main CBT Workspace: Split 2 columns (Question area + Palette) */}
      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        
        {/* Left: Question Card & Controls */}
        <div className="flex-1 flex flex-col justify-between p-4 sm:p-6 overflow-y-auto">
          
          <div>
            {/* Section Bar */}
            <div className="flex items-center justify-between border-b border-[#242728] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider text-[#6a6b6c]">
                  Section:
                </span>
                <span className="mc-keycap text-[11px] text-[#57c1ff]">
                  {currentQ?.section || 'General'}
                </span>
                <span className="mc-keycap text-[11px] text-[#9c9c9d]">
                  Type: {currentQ?.type || 'MCQ'}
                </span>
              </div>

              <div className="text-xs text-[#9c9c9d] font-mono">
                Scheme: <span className="text-[#59d499]">+{currentQ?.marks || 4}</span> / <span className="text-[#ff6161]">{currentQ?.negativeMarks !== undefined ? currentQ.negativeMarks : -1}</span>
              </div>
            </div>

            {/* Question Statement Card */}
            <div className="rounded-xl bg-[#0d0d0d] p-6 border border-[#242728]">
              <div className="flex items-start gap-3">
                <span className="mc-keycap text-xs font-mono font-bold">
                  {currentIndex + 1}
                </span>
                <div className="text-xs sm:text-sm font-medium text-[#f4f4f6] leading-relaxed whitespace-pre-line">
                  {currentQ?.text}
                </div>
              </div>

              {/* Options Section */}
              <div className="mt-6 space-y-2 pl-0 sm:pl-8">
                {currentQ?.type === 'NAT' ? (
                  <div className="max-w-xs space-y-2">
                    <label className="text-xs text-[#9c9c9d]">Numerical Input:</label>
                    <input
                      type="text"
                      value={responses[currentQ.id] || ''}
                      onChange={(e) => handleNatChange(e.target.value)}
                      placeholder="e.g. -5, 2.5, 42"
                      className="w-full rounded-md border border-[#242728] bg-[#101111] p-2 px-3 text-xs font-mono text-[#f4f4f6] focus:border-[#57c1ff] focus:outline-none"
                    />
                  </div>
                ) : (
                  currentQ?.options?.map((opt) => {
                    const isSelected = currentQ.type === 'MSQ' 
                      ? (Array.isArray(responses[currentQ.id]) && responses[currentQ.id].includes(opt.id))
                      : (responses[currentQ.id] === opt.id);

                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectOption(opt.id)}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg p-3 border text-xs sm:text-sm transition ${
                          isSelected
                            ? 'bg-[#18191a] border-[#57c1ff] text-[#f4f4f6]'
                            : 'bg-[#101111] border-[#242728] text-[#cdcdcd] hover:border-[rgba(255,255,255,0.18)]'
                        }`}
                      >
                        <span className={`mc-keycap ${isSelected ? 'border-[#57c1ff] text-[#57c1ff]' : ''}`}>
                          {opt.id}
                        </span>
                        <div>{opt.text}</div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#242728] pt-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleMarkReview}
                className={`mc-btn mc-btn-outline text-xs py-1.5 ${
                  markedForReview.has(currentIndex) ? 'border-[#ffc533] text-[#ffc533]' : ''
                }`}
              >
                <Bookmark className="h-3.5 w-3.5" />
                <span>{markedForReview.has(currentIndex) ? 'Marked for Review ✓' : 'Mark for Review'}</span>
              </button>

              <button
                onClick={handleClearResponse}
                className="mc-btn mc-btn-outline text-xs py-1.5"
              >
                Clear Response
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="mc-btn mc-btn-outline text-xs py-1.5 disabled:opacity-30"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Prev
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === test?.questions?.length - 1}
                className="mc-btn mc-btn-primary text-xs py-1.5 disabled:opacity-30"
              >
                Save & Next <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Right: Question Palette & Legend */}
        <div className="w-full lg:w-72 border-t lg:border-t-0 lg:border-l border-[#242728] bg-[#0d0d0d] p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-[#f4f4f6] text-xs mb-3 uppercase tracking-wider">Palette</h3>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-[#9c9c9d] mb-4 pb-3 border-b border-[#242728]">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#59d499]"></span>
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#ff6161]"></span>
                <span>Unanswered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#ffc533]"></span>
                <span>Marked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#242728]"></span>
                <span>Unvisited</span>
              </div>
            </div>

            {/* Question Circles Grid */}
            <div className="grid grid-cols-5 gap-1.5">
              {test?.questions?.map((q, idx) => {
                const status = getQuestionStatus(idx);
                let cls = 'bg-[#101111] border-[#242728] text-[#cdcdcd]';
                if (status === 'answered') cls = 'bg-[#18191a] border-[#59d499] text-[#59d499]';
                if (status === 'not_answered') cls = 'bg-[#18191a] border-[#ff6161] text-[#ff6161]';
                if (status === 'marked') cls = 'bg-[#18191a] border-[#ffc533] text-[#ffc533]';
                if (status === 'answered_marked') cls = 'bg-[#18191a] border-[#57c1ff] text-[#57c1ff]';

                return (
                  <button
                    key={idx}
                    onClick={() => jumpToQuestion(idx)}
                    className={`flex h-8 w-8 items-center justify-center rounded border font-mono text-xs transition ${cls} ${
                      currentIndex === idx ? 'ring-1 ring-white' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-[#101111] p-3 border border-[#242728] text-xs font-mono text-[#9c9c9d] space-y-1">
            <div className="flex justify-between">
              <span>Total:</span>
              <strong className="text-[#f4f4f6]">{test?.questions?.length}</strong>
            </div>
            <div className="flex justify-between">
              <span>Attempted:</span>
              <strong className="text-[#59d499]">{Object.keys(responses).length}</strong>
            </div>
            <div className="flex justify-between">
              <span>Marked:</span>
              <strong className="text-[#ffc533]">{markedForReview.size}</strong>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Virtual Calculator */}
      {showCalculator && (
        <div className="fixed bottom-16 right-6 w-60 rounded-xl bg-[#0d0d0d] p-3 text-white shadow-2xl z-50 border border-[#242728]">
          <div className="flex justify-between items-center pb-2 border-b border-[#242728] mb-2">
            <span className="text-xs font-mono text-[#9c9c9d]">Calculator</span>
            <button onClick={() => setShowCalculator(false)} className="text-[#6a6b6c] hover:text-white">✕</button>
          </div>
          <input
            type="text"
            readOnly
            value={calcInput || '0'}
            className="w-full rounded bg-[#101111] p-2 text-right font-mono text-sm text-[#59d499] mb-2 border border-[#242728]"
          />
          <div className="grid grid-cols-4 gap-1 text-xs font-mono">
            {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', 'C', '0', '=', '+'].map((btn) => (
              <button
                key={btn}
                onClick={() => {
                  if (btn === 'C') setCalcInput('');
                  else if (btn === '=') {
                    try { 
                      const sanitized = calcInput.replace(/[^0-9+\-*/.]/g, '');
                      const val = Function('"use strict"; return (' + sanitized + ')')();
                      setCalcInput(String(val));
                    } catch {
                      setCalcInput('Error');
                    }
                  } else setCalcInput(prev => prev + btn);
                }}
                className="rounded bg-[#101111] p-2 hover:bg-[#18191a] border border-[#242728] transition"
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Submission Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-[#0d0d0d] p-6 border border-[#242728] shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-[#ffc533]">
              <AlertTriangle className="h-5 w-5" />
              <h3 className="text-base font-semibold text-[#f4f4f6]">Confirm Test Submission</h3>
            </div>
            <p className="text-xs text-[#9c9c9d] leading-relaxed">
              You have completed <strong>{Object.keys(responses).length}</strong> of <strong>{test?.questions?.length}</strong> questions. 
              Are you sure you want to conclude the CBT session?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="mc-btn mc-btn-outline text-xs"
              >
                Resume Test
              </button>
              <button
                onClick={handleSubmit}
                className="mc-btn mc-btn-primary text-xs"
              >
                Submit Examination
              </button>
            </div>
          </div>
        </div>
      )}

      <FloatingFrap />
    </div>
  );
};

export default CbtMockTest;
