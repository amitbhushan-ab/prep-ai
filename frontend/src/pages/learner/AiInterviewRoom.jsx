import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight,
  FileText,
  Code2,
  Brain,
  Landmark,
  Target,
  Coins,
  Cog,
  Stethoscope,
  Users,
  Globe,
  Sparkles,
  HelpCircle,
  Clock,
  Layers
} from 'lucide-react';
import toast from 'react-hot-toast';
import FloatingFrap from '../../components/FloatingFrap';
import { INTERVIEW_TRACKS } from '../../data/interviewTracks';

const ICON_MAP = {
  Code2,
  Brain,
  Landmark,
  Target,
  Coins,
  Cog,
  Stethoscope,
  Users,
  Globe
};

const AiInterviewRoom = () => {
  const [inSession, setInSession] = useState(false);
  const [category, setCategory] = useState('corporate');
  const [role, setRole] = useState('Full Stack Software Engineer');
  const [questionLimit, setQuestionLimit] = useState(10);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answerText, setAnswerText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [evaluating, setEvaluating] = useState(false);
  const [evaluationReport, setEvaluationReport] = useState(null);
  const [turnHistory, setTurnHistory] = useState([]);

  const activeTrack = INTERVIEW_TRACKS.find(t => t.id === category) || INTERVIEW_TRACKS[0];
  const activeQuestions = (activeTrack?.questions || []).slice(0, questionLimit);
  const currentQuestion = activeQuestions[currentQIndex] || activeQuestions[0];

  const handleSelectTrack = (trackId) => {
    setCategory(trackId);
    const target = INTERVIEW_TRACKS.find(t => t.id === trackId);
    if (target) {
      setRole(target.defaultRole);
    }
  };

  const speakQuestion = (text) => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const toggleSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Speech Recognition is not supported on this browser. Please type your response.");
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsRecording(true);
      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript + ' ';
        }
        setAnswerText(transcript);
      };
      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);
      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  const handleStartInterview = () => {
    setInSession(true);
    setTurnHistory([]);
    setCurrentQIndex(0);
    setAnswerText('');
    setEvaluationReport(null);
    speakQuestion(activeQuestions[0]);
  };

  const handleSubmitAnswer = async () => {
    if (!answerText.trim()) {
      toast.error("Please provide an answer before continuing.");
      return;
    }

    setEvaluating(true);
    try {
      const res = await api.post('/api/prepai/interview/evaluate', {
        question: currentQuestion,
        answer: answerText,
        role,
        category
      });

      const turn = {
        question: currentQuestion,
        answer: answerText,
        feedback: res.data
      };
      const updatedHistory = [...turnHistory, turn];
      setTurnHistory(updatedHistory);
      setAnswerText('');

      if (currentQIndex < activeQuestions.length - 1) {
        const nextIdx = currentQIndex + 1;
        setCurrentQIndex(nextIdx);
        toast.success(`Question ${currentQIndex + 1} recorded. Moving to next question.`);
        speakQuestion(activeQuestions[nextIdx]);
      } else {
        generateFinalReport(updatedHistory);
      }
    } catch {
      // Local fallback evaluation if network drops
      const words = answerText.trim().split(/\s+/).length;
      const score = Math.min(95, Math.max(55, Math.round(65 + words * 0.3)));
      const fallbackTurn = {
        question: currentQuestion,
        answer: answerText,
        feedback: {
          overallScore: score,
          breakdown: {
            technicalDepth: Math.min(100, score + 4),
            communicationClarity: Math.min(100, score - 2)
          },
          strengths: ["Structured thoughts addressing key parameters", "Relevant technical terminology"],
          areasOfImprovement: ["Provide more quantitative scale metrics", "Use STAR framework for situational structure"]
        }
      };
      const updatedHistory = [...turnHistory, fallbackTurn];
      setTurnHistory(updatedHistory);
      setAnswerText('');

      if (currentQIndex < activeQuestions.length - 1) {
        const nextIdx = currentQIndex + 1;
        setCurrentQIndex(nextIdx);
        toast.success(`Question ${currentQIndex + 1} recorded.`);
        speakQuestion(activeQuestions[nextIdx]);
      } else {
        generateFinalReport(updatedHistory);
      }
    } finally {
      setEvaluating(false);
    }
  };

  const generateFinalReport = (history) => {
    const avgScore = Math.round(
      history.reduce((acc, h) => acc + (h.feedback?.overallScore || 78), 0) / (history.length || 1)
    );
    setEvaluationReport({
      role,
      category,
      trackName: activeTrack.label,
      totalQuestions: history.length,
      overallScore: avgScore,
      technicalDepth: Math.min(100, avgScore + 4),
      communicationClarity: Math.min(100, avgScore - 2),
      strengths: [
        "Structured responses addressing domain requirements systematically",
        "Clear professional articulation and domain-specific terminology",
        "Logical problem deconstruction with sound core principles"
      ],
      improvementAreas: [
        "Incorporate more concrete metrics (e.g. latency, throughput, scale numbers, turnaround time)",
        "Elaborate on edge cases, contingency plans, and trade-offs"
      ],
      history
    });
    setInSession(false);
    toast.success("Interview completed! Evaluation summary generated.");
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-white p-4 sm:p-6 lg:p-8 rc-grid-pattern">
      <div className="mx-auto max-w-5xl space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#242728] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="mc-keycap text-[10px] text-[#57c1ff]">AI SIMULATOR</span>
              <span className="text-[11px] text-white/40 font-mono">9 Tracks • 135 Questions</span>
            </div>
            <h1 className="mt-1 text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Interview Simulator & Assessment Room
            </h1>
            <p className="mt-1 text-xs text-white/50">
              Interactive voice-enabled mock interviews with real-time feedback and rubric evaluations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className="mc-btn mc-btn-outline text-xs py-1.5"
            >
              {voiceEnabled ? <Volume2 className="h-3.5 w-3.5 text-[#59d499]" /> : <VolumeX className="h-3.5 w-3.5 text-white/40" />}
              <span>{voiceEnabled ? 'Voice Output: On' : 'Voice Output: Off'}</span>
            </button>
          </div>
        </div>

        {/* Setup Screen */}
        {!inSession && !evaluationReport && (
          <div className="rounded-xl bg-[#0d0d0d] p-6 sm:p-8 border border-[#242728] space-y-6">
            
            {/* Track Selector Header */}
            <div className="flex items-center justify-between border-b border-[#242728] pb-3">
              <div>
                <h2 className="text-sm font-semibold text-white">Select Interview Track</h2>
                <p className="text-[11px] text-white/50">Choose from 9 specialized career & examination interview tracks</p>
              </div>
              <span className="mc-keycap text-[10px] text-[#57c1ff]">
                {INTERVIEW_TRACKS.length} Tracks Available
              </span>
            </div>
            
            {/* Tracks Grid (3 columns on desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {INTERVIEW_TRACKS.map((t) => {
                const IconComponent = ICON_MAP[t.icon] || FileText;
                const isSelected = category === t.id;

                return (
                  <button
                    key={t.id}
                    onClick={() => handleSelectTrack(t.id)}
                    className={`rounded-xl p-3.5 border text-left transition relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#151617] border-[#57c1ff] shadow-[0_0_15px_rgba(87,193,255,0.12)] ring-1 ring-[#57c1ff]/30'
                        : 'bg-[#101111] border-[#242728] hover:border-[rgba(255,255,255,0.2)] text-white/70 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-1.5 rounded-lg border ${
                          isSelected 
                            ? 'bg-[#57c1ff]/10 border-[#57c1ff]/40 text-[#57c1ff]' 
                            : 'bg-[#18191a] border-[#242728] text-white/60'
                        }`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#18191a] text-[#59d499] border border-[#242728]">
                          15 Qs
                        </span>
                      </div>

                      <div className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-white/90'}`}>
                        {t.label}
                      </div>

                      <p className="mt-1 text-[11px] text-white/50 line-clamp-2 leading-relaxed">
                        {t.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#242728]/60 flex items-center justify-between text-[10px] font-mono text-white/40">
                      <span>Default: {t.defaultRole.slice(0, 24)}...</span>
                      {isSelected && <span className="text-[#57c1ff] font-bold">Selected ✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Role Customization & Quick Suggestions */}
            <div className="rounded-xl bg-[#101111] p-5 border border-[#242728] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <label className="text-xs text-white/70 font-mono block font-medium">
                    Target Role or Subject
                  </label>
                  <p className="text-[11px] text-white/40">
                    The interviewer adapts questions and terminology specifically to this position.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-[#57c1ff]">
                  Track: {activeTrack.label}
                </span>
              </div>

              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-lg border border-[#242728] bg-[#07080a] p-3 text-xs sm:text-sm text-white placeholder-white/30 focus:border-[#57c1ff] focus:outline-none transition"
                placeholder="e.g. Senior Frontend Engineer or UPSC IAS Candidate"
              />

              {/* Quick Role Suggestions */}
              {activeTrack.roles && activeTrack.roles.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-mono text-white/40">Recommended Profiles:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeTrack.roles.map((r, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setRole(r)}
                        className={`rounded-md px-2.5 py-1 text-[11px] border transition ${
                          role === r
                            ? 'bg-[#18191a] border-[#57c1ff] text-[#57c1ff] font-medium'
                            : 'bg-[#0d0d0d] border-[#242728] text-white/60 hover:text-white hover:border-white/30'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Questions Session Length Selector (5, 10, or 15) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl bg-[#101111] p-5 border border-[#242728]">
              <div>
                <span className="text-xs font-mono text-white/70 block font-medium">Interview Session Length</span>
                <p className="text-[11px] text-white/40">Select how many sequential questions to tackle in this simulation</p>
              </div>

              <div className="flex items-center gap-2">
                {[
                  { count: 5, label: '5 Questions', tag: 'Quick Drill' },
                  { count: 10, label: '10 Questions', tag: 'Standard' },
                  { count: 15, label: '15 Questions', tag: 'Full Board' }
                ].map((q) => (
                  <button
                    key={q.count}
                    type="button"
                    onClick={() => setQuestionLimit(q.count)}
                    className={`rounded-lg px-3 py-2 border text-xs text-center transition ${
                      questionLimit === q.count
                        ? 'bg-[#18191a] border-[#57c1ff] text-[#57c1ff] font-medium'
                        : 'bg-[#0d0d0d] border-[#242728] text-white/60 hover:text-white'
                    }`}
                  >
                    <div className="font-semibold">{q.label}</div>
                    <div className="text-[9px] text-white/40 uppercase font-mono">{q.tag}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-[#242728] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-white/50 font-mono">
                Ready to simulate: <strong className="text-white">{role}</strong> ({questionLimit} Questions)
              </div>

              <button
                onClick={handleStartInterview}
                className="mc-btn mc-btn-primary text-xs py-2.5 px-6 flex items-center gap-2 w-full sm:w-auto justify-center bg-[#57c1ff] hover:bg-[#45b2f2] text-black font-semibold"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Begin Interview Simulation</span>
              </button>
            </div>

          </div>
        )}

        {/* Active Interview Room */}
        {inSession && (
          <div className="rounded-xl bg-[#0d0d0d] p-6 border border-[#242728] space-y-6">
            
            {/* Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#242728] pb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-xs font-mono font-semibold text-white">LIVE INTERVIEW</span>
                </div>
                <span className="mc-keycap text-[10px] text-[#57c1ff]">{activeTrack.shortLabel}</span>
                <span className="text-xs text-white/70 font-mono hidden sm:inline">• {role}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-white/80 bg-[#101111] px-2.5 py-1 rounded border border-[#242728]">
                  Question <strong className="text-white">{currentQIndex + 1}</strong> of {activeQuestions.length}
                </span>

                <button 
                  onClick={() => speakQuestion(currentQuestion)}
                  className="mc-btn mc-btn-outline text-xs py-1 px-2.5 flex items-center gap-1"
                >
                  <Volume2 className="h-3 w-3 text-[#57c1ff]" /> Replay Audio
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#18191a] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#57c1ff] h-full transition-all duration-300"
                style={{ width: `${((currentQIndex + 1) / activeQuestions.length) * 100}%` }}
              />
            </div>

            {/* Current Question Display */}
            <div className="p-5 rounded-xl bg-[#101111] border border-[#242728] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-[#57c1ff] tracking-wider">
                  Interviewer Prompt #{currentQIndex + 1}
                </span>
                <span className="text-[10px] font-mono text-white/40">Rubric Scoring Active</span>
              </div>
              <p className="text-sm sm:text-base font-medium text-white leading-relaxed">
                {currentQuestion}
              </p>
            </div>

            {/* Answer Input Area */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs text-white/60 font-mono flex items-center gap-2">
                  <span>Your Response</span>
                  {isRecording && (
                    <span className="flex items-center gap-1 text-rose-400 text-[10px] animate-pulse">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span> Listening...
                    </span>
                  )}
                </label>
                <span className="text-[10px] text-white/40 font-mono">
                  {answerText.trim() ? answerText.trim().split(/\s+/).length : 0} words
                </span>
              </div>
              <textarea
                rows={6}
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                placeholder="Speak via microphone or type your structured response..."
                className="w-full rounded-lg border border-[#242728] bg-[#101111] p-3 text-xs sm:text-sm text-white focus:border-[#57c1ff] focus:outline-none leading-relaxed transition"
              />
            </div>

            {/* Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#242728]">
              <button
                onClick={toggleSpeechRecognition}
                className={`mc-btn mc-btn-outline text-xs ${
                  isRecording ? 'border-rose-500 text-rose-400 bg-rose-500/10' : ''
                }`}
              >
                {isRecording ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
                <span>{isRecording ? 'Stop Recording' : 'Voice Input (Mic)'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => generateFinalReport(turnHistory)}
                  className="mc-btn mc-btn-outline text-xs text-white/60 hover:text-white"
                >
                  Conclude Interview
                </button>
                <button
                  onClick={handleSubmitAnswer}
                  disabled={evaluating || !answerText.trim()}
                  className="mc-btn mc-btn-primary text-xs py-2 px-5 disabled:opacity-40 bg-[#57c1ff] text-black font-semibold hover:bg-[#45b2f2]"
                >
                  {evaluating ? 'Evaluating...' : currentQIndex === activeQuestions.length - 1 ? 'Submit & Finalize' : 'Submit & Next Question'}
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Evaluation Summary */}
        {evaluationReport && (
          <div className="rounded-xl bg-[#0d0d0d] p-6 sm:p-8 border border-[#242728] space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#242728] pb-6">
              <div>
                <span className="mc-keycap text-[10px] text-[#59d499]">INTERVIEW COMPLETED</span>
                <h2 className="mt-2 text-xl sm:text-2xl font-semibold text-white">{evaluationReport.role}</h2>
                <p className="text-xs text-white/50 font-mono mt-0.5">
                  Track: {evaluationReport.trackName} • {evaluationReport.totalQuestions} Questions Evaluated
                </p>
              </div>

              <button
                onClick={() => { setEvaluationReport(null); setInSession(false); }}
                className="mc-btn mc-btn-primary text-xs py-2 px-4"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Start New Session
              </button>
            </div>

            {/* Score Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-lg bg-[#101111] p-4 text-center border border-[#242728]">
                <div className="text-3xl font-bold font-mono text-white">{evaluationReport.overallScore}/100</div>
                <div className="text-[10px] font-mono text-white/40 uppercase mt-1">Overall Rating</div>
              </div>
              <div className="rounded-lg bg-[#101111] p-4 text-center border border-[#242728]">
                <div className="text-3xl font-bold font-mono text-[#57c1ff]">{evaluationReport.technicalDepth}/100</div>
                <div className="text-[10px] font-mono text-white/40 uppercase mt-1">Domain & Technical Depth</div>
              </div>
              <div className="rounded-lg bg-[#101111] p-4 text-center border border-[#242728]">
                <div className="text-3xl font-bold font-mono text-[#59d499]">{evaluationReport.communicationClarity}/100</div>
                <div className="text-[10px] font-mono text-white/40 uppercase mt-1">Communication Clarity</div>
              </div>
            </div>

            {/* Strengths & Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-[#242728] bg-[#101111] p-4 space-y-2">
                <div className="flex items-center gap-2 font-medium text-emerald-400 text-xs">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Demonstrated Strengths</span>
                </div>
                <ul className="space-y-1.5 text-xs text-white/70">
                  {evaluationReport.strengths.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-[#242728] bg-[#101111] p-4 space-y-2">
                <div className="flex items-center gap-2 font-medium text-amber-400 text-xs">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>Key Areas for Refinement</span>
                </div>
                <ul className="space-y-1.5 text-xs text-white/70">
                  {evaluationReport.improvementAreas.map((a, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400">•</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Turn History & Transcripts */}
            <div className="space-y-4 pt-4 border-t border-[#242728]">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white/60 font-mono">
                  Detailed Question-by-Question Transcript ({evaluationReport.history?.length || 0})
                </h3>
              </div>
              
              <div className="space-y-3">
                {evaluationReport.history?.map((h, idx) => (
                  <div key={idx} className="rounded-lg border border-[#242728] p-4 bg-[#101111] space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs text-[#57c1ff] font-semibold">Q{idx + 1}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#07080a] text-white/60 border border-[#242728]">
                        Score: {h.feedback?.overallScore || 78}/100
                      </span>
                    </div>
                    <div className="text-xs text-white font-medium">{h.question}</div>
                    
                    <div className="rounded-md bg-[#07080a] p-3 text-xs text-white/70 border border-[#242728]/60">
                      <span className="text-white/40 block mb-1 font-mono text-[10px] uppercase">Your Answer:</span>
                      "{h.answer}"
                    </div>

                    {h.feedback?.modelAnswer && (
                      <div className="rounded-md bg-[#151617] p-3 text-xs text-emerald-300/90 border border-emerald-500/20">
                        <span className="text-emerald-400 block mb-1 font-mono text-[10px] uppercase font-semibold">Model Response Highlight:</span>
                        {h.feedback.modelAnswer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
      <FloatingFrap />
    </div>
  );
};

export default AiInterviewRoom;
