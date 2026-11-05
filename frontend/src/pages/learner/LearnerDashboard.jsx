import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Target,
  Bot,
  PlayCircle,
  ArrowRight,
  BookOpen,
  Award,
  Check,
  Code2,
  FileText,
  Calendar,
  BarChart3,
  Layers
} from 'lucide-react';
import { AuthContext } from '../../context/auth-context';
import FloatingFrap from '../../components/FloatingFrap';
import OrbitalPortrait from '../../components/aceternity/OrbitalPortrait';
import AnimatedCounter from '../../components/aceternity/AnimatedCounter';
import InfiniteMovingCards from '../../components/aceternity/InfiniteMovingCards';
import TextGenerate from '../../components/aceternity/TextGenerate';
import Reveal from '../../components/aceternity/Reveal';
import { BentoGrid, BentoCard } from '../../components/aceternity/BentoGrid';

const Metric = ({ label, children }) => (
  <div>
    <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--mc-mute)]">
      {label}
    </div>
    <div className="mt-1.5 text-[22px] font-medium leading-none tracking-[-0.03em] text-[var(--mc-ink)]">
      {children}
    </div>
  </div>
);

const LearnerDashboard = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState(user?.targetCategory || 'entrance');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Solve 10 Electrostatics Numericals (PYQ 2024)', duration: '45m', completed: true, tag: 'Physics' },
    { id: 2, title: 'Coordination Chemistry Isomerism Notes', duration: '30m', completed: true, tag: 'Chemistry' },
    { id: 3, title: 'All-India CBT Mock Test 1', duration: '90m', completed: false, tag: 'Exam' },
    { id: 4, title: 'System Design & Problem Deconstruction', duration: '20m', completed: false, tag: 'Interview' }
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const categories = [
    { id: 'entrance', name: 'Engineering & Medical', icon: Target },
    { id: 'civil_services', name: 'Civil Services', icon: Award },
    { id: 'government', name: 'Govt & Banking', icon: BookOpen },
    { id: 'corporate', name: 'Technical Careers', icon: Code2 },
    { id: 'study_abroad', name: 'Study Abroad', icon: FileText }
  ];

  const examsByCategory = {
    entrance: [
      { name: 'JEE Advanced 2026', nextExam: 'May 24, 2026', questions: 1240, ready: 82 },
      { name: 'NEET UG 2026', nextExam: 'May 03, 2026', questions: 980, ready: 75 },
      { name: 'CAT 2026', nextExam: 'Nov 29, 2026', questions: 850, ready: 68 }
    ],
    civil_services: [
      { name: 'UPSC CSE (Prelims & Mains)', nextExam: 'May 26, 2026', questions: 3200, ready: 64 },
      { name: 'State PCS Examination', nextExam: 'Jul 14, 2026', questions: 1100, ready: 70 }
    ],
    government: [
      { name: 'SSC CGL Tier-I & II', nextExam: 'Aug 10, 2026', questions: 1850, ready: 79 },
      { name: 'IBPS PO / SBI PO', nextExam: 'Oct 18, 2026', questions: 1400, ready: 71 }
    ],
    corporate: [
      { name: 'Full Stack Software Engineer', nextExam: 'Rolling', questions: 640, ready: 88 },
      { name: 'AI / Machine Learning Engineer', nextExam: 'Rolling', questions: 420, ready: 74 }
    ],
    study_abroad: [
      { name: 'IELTS Academic (Band 8.0 Target)', nextExam: 'On Demand', questions: 520, ready: 84 },
      { name: 'GRE General Test', nextExam: 'On Demand', questions: 680, ready: 78 }
    ]
  };

  const modules = [
    {
      eyebrow: 'CBT engine',
      title: 'Mock tests',
      badge: 'Timed',
      description: 'Section navigation, palette status and automated marking.',
      icon: PlayCircle,
      path: '/mock-tests'
    },
    {
      eyebrow: 'Doubt repair',
      title: 'Concept tutor',
      badge: 'AI',
      description: 'Step-by-step walkthroughs and mathematical derivations.',
      icon: Bot,
      path: '/ai-tutor'
    },
    {
      eyebrow: 'Voice room',
      title: 'Interview practice',
      badge: 'Live',
      description: 'Simulated voice questions with structured rubrics.',
      icon: FileText,
      path: '/ai-interview'
    },
    {
      eyebrow: 'Sandbox',
      title: 'Coding lab',
      badge: 'Code',
      description: 'Algorithm practice with runtime test-case execution.',
      icon: Code2,
      path: '/coding-lab'
    }
  ];

  const handleSelectExam = (examName) => {
    updateProfile({ targetExam: examName, targetCategory: activeCategory });
  };

  const examName = user?.targetExam || 'JEE Advanced 2026';
  const daysToExam = (() => {
    const raw = user?.examDate || '2026-05-24';
    const diff = Math.ceil((new Date(raw) - new Date()) / 86400000);
    return Number.isFinite(diff) && diff > 0 ? diff : 82;
  })();

  const upNext = [
    { title: 'Rotational dynamics', meta: '12 questions', icon: Target },
    { title: 'Full mock · Paper 2', meta: '90 min', icon: BarChart3 },
    { title: 'Formula recall', meta: '8 flashcards', icon: Layers },
    { title: 'Interview drill', meta: 'Voice', icon: FileText },
    { title: 'Planner reset', meta: '10 min', icon: Calendar }
  ];

  const accuracy = [
    { label: 'Calculus & limits', value: 92, tone: 'success' },
    { label: 'Electromagnetism', value: 84, tone: 'ink' },
    { label: 'Coordination chemistry', value: 58, tone: 'warn' },
    { label: 'Rotational dynamics', value: 46, tone: 'danger' }
  ];

  const toneClass = {
    success: 'bg-[var(--mc-success)]',
    ink: 'bg-[var(--mc-ink)]',
    warn: 'bg-[var(--mc-warn)]',
    danger: 'bg-[var(--mc-danger)]'
  };

  return (
    <div className="min-h-screen bg-[var(--mc-canvas)] px-4 pb-24 pt-6 text-[var(--mc-ink)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1200px] space-y-8">

        {/* Hero */}
        <Reveal>
          <section className="relative overflow-hidden rounded-[40px] border border-[var(--mc-hairline)] bg-[var(--mc-surface)] px-6 py-9 shadow-[var(--mc-shadow-sm)] sm:px-10 sm:py-12">
            <div aria-hidden="true" className="mc-dots pointer-events-none absolute inset-0 opacity-70" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-28 -top-36 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(243,115,56,0.18),transparent_65%)]"
            />
            <span aria-hidden="true" className="mc-watermark absolute -bottom-6 right-6 hidden sm:block">
              Prep
            </span>

            <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-[580px]">
                <span className="mc-eyebrow">Candidate dashboard</span>
                <h1 className="mc-display mt-5">
                  <TextGenerate text={user?.name || 'Candidate'} />
                </h1>
                <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-[var(--mc-mute)]">
                  {examName} · {daysToExam} days of runway. Small deliberate reps
                  beat long unfocused sessions.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigate('/mock-tests')}
                    className="mc-btn mc-btn-primary"
                  >
                    Start a mock
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/planner')}
                    className="mc-btn mc-btn-outline"
                  >
                    Open planner
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 sm:gap-10">
                <Metric label="Streak">
                  <AnimatedCounter value={user?.streak || 7} suffix="d" />
                </Metric>
                <Metric label="Readiness">
                  <AnimatedCounter value={user?.readinessScore || 82} suffix="%" />
                </Metric>
                <Metric label="Mocks">
                  <AnimatedCounter value={14} />
                </Metric>
              </div>
            </div>
          </section>
        </Reveal>

        {/* Practice modules */}
        <Reveal delay={60}>
          <section>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="mc-eyebrow">Practice modules</span>
                <h2 className="mc-h2 mt-3">Choose your orbit</h2>
              </div>
              <button
                type="button"
                onClick={() => navigate('/exams')}
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--mc-mute)] transition-colors hover:text-[var(--mc-ink)]"
              >
                View catalogue
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            </div>

            <div className="mt-9 grid grid-cols-1 gap-x-6 gap-y-11 sm:grid-cols-2 lg:grid-cols-4">
              {modules.map((module) => (
                <OrbitalPortrait
                  key={module.title}
                  icon={module.icon}
                  eyebrow={module.eyebrow}
                  title={module.title}
                  badge={module.badge}
                  description={module.description}
                  onClick={() => navigate(module.path)}
                />
              ))}
            </div>
          </section>
        </Reveal>

        {/* Marquee */}
        <Reveal delay={80}>
          <section className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="mc-eyebrow">Next up</span>
                <h2 className="mc-h2 mt-3">Today's queue</h2>
              </div>
              <span className="hidden text-[12px] text-[var(--mc-mute)] sm:block">
                Hover to pause
              </span>
            </div>
            <InfiniteMovingCards items={upNext} />
          </section>
        </Reveal>

        {/* Syllabus track */}
        <Reveal delay={60}>
          <section className="mc-card p-6 sm:p-8">
            <div className="flex flex-col gap-3 border-b border-[var(--mc-hairline)] pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-[19px] font-medium tracking-[-0.02em] text-[var(--mc-ink)]">
                  Syllabus track
                </h2>
                <p className="mt-1 text-[13px] text-[var(--mc-mute)]">
                  Switch target examination to change the practice set.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/exams')}
                className="inline-flex items-center gap-1.5 self-start text-[13px] font-medium text-[var(--mc-mute)] transition-colors hover:text-[var(--mc-ink)] sm:self-auto"
              >
                Full catalogue
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            </div>

            <div className="no-scrollbar mt-5 flex items-center gap-2 overflow-x-auto pb-1">
              {categories.map((category) => {
                const active = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[12.5px] font-medium transition-all duration-200 ${
                      active
                        ? 'border-[var(--mc-ink)] bg-[var(--mc-ink)] text-[var(--mc-primary-fg)]'
                        : 'border-[var(--mc-hairline)] bg-[var(--mc-surface)] text-[var(--mc-mute)] hover:border-[var(--mc-hairline-strong)] hover:text-[var(--mc-ink)]'
                    }`}
                  >
                    <category.icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                    {category.name}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
              {(examsByCategory[activeCategory] || []).map((exam) => {
                const selected = user?.targetExam === exam.name;
                return (
                  <div
                    key={exam.name}
                    className="group flex flex-col justify-between rounded-[24px] border border-[var(--mc-hairline)] bg-[var(--mc-surface-alt)] p-5 transition-colors hover:border-[var(--mc-hairline-strong)]"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 text-[11px] uppercase tracking-[0.1em] text-[var(--mc-mute)]">
                        <span>{exam.nextExam}</span>
                        <span className="rounded-full border border-[var(--mc-hairline)] bg-[var(--mc-surface)] px-2 py-0.5 text-[10.5px] font-semibold tracking-normal text-[var(--mc-charcoal)]">
                          {exam.ready}%
                        </span>
                      </div>
                      <h3 className="mt-3 text-[15px] font-medium leading-snug tracking-[-0.01em] text-[var(--mc-ink)]">
                        {exam.name}
                      </h3>
                      <p className="mt-1 text-[12px] text-[var(--mc-mute)]">
                        {exam.questions} curated items
                      </p>
                    </div>

                    <div className="mt-5 flex items-center gap-2 border-t border-[var(--mc-hairline)] pt-4">
                      <button
                        type="button"
                        onClick={() => handleSelectExam(exam.name)}
                        className={`flex-1 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors ${
                          selected
                            ? 'border-[rgba(21,127,82,0.3)] bg-[rgba(21,127,82,0.08)] text-[var(--mc-success)]'
                            : 'border-[var(--mc-hairline-strong)] text-[var(--mc-ink)] hover:border-[var(--mc-ink)]'
                        }`}
                      >
                        {selected ? 'Selected' : 'Select'}
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate(`/mock-tests?examName=${encodeURIComponent(exam.name)}`)}
                        className="rounded-full bg-[var(--mc-ink)] px-4 py-1.5 text-[12px] font-medium text-[var(--mc-primary-fg)] transition-transform hover:-translate-y-px active:scale-95"
                      >
                        Test
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </Reveal>

        {/* Bento: schedule + accuracy */}
        <Reveal delay={60}>
          <BentoGrid>
            <BentoCard className="lg:col-span-7">
              <div className="flex items-start justify-between gap-4 border-b border-[var(--mc-hairline)] pb-4">
                <div>
                  <h3 className="text-[17px] font-medium tracking-[-0.02em] text-[var(--mc-ink)]">
                    Study schedule
                  </h3>
                  <p className="mt-1 text-[12.5px] text-[var(--mc-mute)]">Daily milestone checklist</p>
                </div>
                <span className="mc-keycap text-[10px]">
                  {tasks.filter(t => t.completed).length}/{tasks.length} done
                </span>
              </div>

              <div className="mt-4 space-y-2">
                {tasks.map((task) => (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => toggleTask(task.id)}
                    className="flex w-full items-center justify-between gap-3 rounded-[18px] border border-[var(--mc-hairline)] px-4 py-3 text-left transition-colors hover:border-[var(--mc-hairline-strong)]"
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                          task.completed
                            ? 'border-[var(--mc-ink)] bg-[var(--mc-ink)] text-[var(--mc-primary-fg)]'
                            : 'border-[var(--mc-hairline-strong)]'
                        }`}
                      >
                        {task.completed && <Check className="h-3 w-3" strokeWidth={3} />}
                      </span>
                      <span>
                        <span
                          className={`block text-[13px] font-medium ${
                            task.completed
                              ? 'text-[var(--mc-mute)] line-through'
                              : 'text-[var(--mc-ink)]'
                          }`}
                        >
                          {task.title}
                        </span>
                        <span className="mt-0.5 flex items-center gap-2 text-[11px] text-[var(--mc-mute)]">
                          <span>{task.tag}</span>
                          <span className="text-[var(--mc-taupe)]">•</span>
                          <span>{task.duration}</span>
                        </span>
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </BentoCard>

            <BentoCard className="lg:col-span-5">
              <div>
                <h3 className="text-[17px] font-medium tracking-[-0.02em] text-[var(--mc-ink)]">
                  Topic accuracy
                </h3>
                <p className="mt-1 text-[12.5px] text-[var(--mc-mute)]">Recent performance by topic</p>

                <div className="mt-5 space-y-4">
                  {accuracy.map((topic) => (
                    <div key={topic.label}>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-[12.5px] text-[var(--mc-charcoal)]">{topic.label}</span>
                        <span className="text-[12px] font-medium tabular-nums text-[var(--mc-ink)]">
                          {topic.value}%
                        </span>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--mc-surface-sunken)]">
                        <div
                          className={`h-full rounded-full ${toneClass[topic.tone]}`}
                          style={{ width: `${topic.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-[18px] border border-[var(--mc-hairline)] bg-[var(--mc-surface-alt)] px-4 py-3 text-[12.5px] leading-relaxed text-[var(--mc-mute)]">
                Review focus: rotational dynamics problem sets and formula derivations.
              </div>
            </BentoCard>
          </BentoGrid>
        </Reveal>

      </div>

      <FloatingFrap />
    </div>
  );
};

export default LearnerDashboard;
