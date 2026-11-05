import React, { useState } from 'react';
import { 
  Calendar, 
  Sparkles, 
  Layers, 
  Clock, 
  Check,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  RotateCcw,
  Lightbulb,
  BookOpen
} from 'lucide-react';
import toast from 'react-hot-toast';
import FloatingFrap from '../../components/FloatingFrap';
import { DEFAULT_FLASHCARDS, FLASHCARD_CATEGORIES } from '../../data/flashcardsData';

const StudyPlanner = () => {
  const [tasks, setTasks] = useState([
    { id: 1, day: 'Monday', title: 'Complete Differential Calculus Module 3 & Limits', status: 'done', hours: 2, key: '1' },
    { id: 2, day: 'Monday', title: 'Revise Periodic Table & Coordination Chemistry Isomerism', status: 'done', hours: 1.5, key: '2' },
    { id: 3, day: 'Tuesday (Today)', title: 'Solve 20 PYQs on Rotational Mechanics & Torque', status: 'pending', hours: 2, key: '3' },
    { id: 4, day: 'Tuesday (Today)', title: 'Attempt 45-min All-India CBT Mock Test 1', status: 'pending', hours: 1, key: '4' },
    { id: 5, day: 'Wednesday', title: 'AI Mock Interview – Core Technical & System Architecture', status: 'pending', hours: 1, key: '5' },
    { id: 6, day: 'Wednesday', title: 'Memory Deck Revision: High-Yield Physics & CS Cards', status: 'pending', hours: 0.5, key: '6' },
    { id: 7, day: 'Thursday', title: 'Review Weak Topic Telemetry & Error Log Analysis', status: 'pending', hours: 1.5, key: '7' }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [deck, setDeck] = useState(DEFAULT_FLASHCARDS);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);

  // Filter flashcards by subject category
  const filteredCards = selectedCategory === 'all'
    ? deck
    : deck.filter(c => c.category === selectedCategory);

  const activeCard = filteredCards[currentCardIdx] || filteredCards[0] || DEFAULT_FLASHCARDS[0];

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setCurrentCardIdx(0);
    setFlipped(false);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'done' ? 'pending' : 'done' } : t));
  };

  const handleNextCard = () => {
    setFlipped(false);
    if (filteredCards.length > 0) {
      setCurrentCardIdx((prev) => (prev + 1) % filteredCards.length);
    }
  };

  const handlePrevCard = () => {
    setFlipped(false);
    if (filteredCards.length > 0) {
      setCurrentCardIdx((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    }
  };

  const handleShuffleDeck = () => {
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentCardIdx(0);
    setFlipped(false);
    toast.success("Deck shuffled for randomized recall!", { icon: '🔀' });
  };

  const handleRateRecall = (ease) => {
    setReviewedCount(prev => prev + 1);
    if (ease === 'hard') {
      toast("Scheduled for immediate review tomorrow", { icon: '🔴' });
    } else if (ease === 'medium') {
      toast.success("Scheduled for review in 3 days");
    } else {
      toast.success("Mastered! Scheduled in 7 days", { icon: '🟢' });
    }
    handleNextCard();
  };

  const handleReplanAi = () => {
    toast.success("Schedule re-optimized based on latest test weak spots!");
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-[#cdcdcd] py-8 px-4 sm:px-6 lg:px-8 rc-grid-pattern">
      <div className="mx-auto max-w-6xl space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 mc-keycap text-[10px] text-[#59d499]">
              <Calendar className="h-3 w-3" />
              <span>SPACED REPETITION ENGINE</span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-[#f4f4f6]">
              AI Study Planner & Memory Deck
            </h1>
            <p className="text-xs text-[#9c9c9d]">
              Syllabus milestone scheduling and spaced repetition memory cards ({DEFAULT_FLASHCARDS.length} Flashcards).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReplanAi}
              className="mc-btn mc-btn-primary text-xs"
            >
              <Sparkles className="h-3.5 w-3.5 text-black" />
              <span>Re-plan with AI</span>
            </button>
          </div>
        </div>

        {/* 2-Column Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Study Tasks & Timeline */}
          <div className="lg:col-span-6 rounded-xl bg-[#0d0d0d] p-6 border border-[#242728] space-y-4">
            <div className="flex items-center justify-between border-b border-[#242728] pb-4">
              <div>
                <h3 className="text-sm font-semibold text-[#f4f4f6]">Milestone Timeline</h3>
                <p className="text-xs text-[#6a6b6c]">Auto-allocated based on exam syllabus countdown</p>
              </div>
              <span className="mc-keycap text-[10px] text-[#59d499]">
                {tasks.filter(t => t.status === 'done').length}/{tasks.length} Completed
              </span>
            </div>

            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex cursor-pointer items-center justify-between rounded-lg p-3 border transition ${
                    task.status === 'done'
                      ? 'bg-[#101111]/40 border-[#242728] text-[#6a6b6c]'
                      : 'bg-[#101111] border-[#242728] hover:border-[rgba(255,255,255,0.18)] text-[#cdcdcd]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-4 w-4 items-center justify-center rounded border transition ${
                      task.status === 'done' ? 'border-[#59d499] bg-[#59d499]' : 'border-[#454748] bg-transparent'
                    }`}>
                      {task.status === 'done' && <Check className="h-3 w-3 text-black stroke-[3]" />}
                    </div>
                    <div>
                      <div className={`text-xs font-medium leading-relaxed ${task.status === 'done' ? 'line-through text-[#6a6b6c]' : 'text-[#f4f4f6]'}`}>
                        {task.title}
                      </div>
                      <div className="text-[10px] text-[#6a6b6c] flex items-center gap-2 mt-0.5">
                        <span>{task.day}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" /> {task.hours} hrs</span>
                      </div>
                    </div>
                  </div>
                  <span className="mc-keycap text-[10px]">{task.key}</span>
                </div>
              ))}
            </div>

            <div className="rounded-lg bg-[#101111] p-3 border border-[#242728] text-xs text-[#9c9c9d] flex items-center justify-between">
              <span>Today's Total Focus Time Target:</span>
              <span className="font-mono font-semibold text-[#57c1ff]">3.0 Hours</span>
            </div>
          </div>

          {/* Right: Spaced Repetition Memory Deck */}
          <div className="lg:col-span-6 rounded-xl bg-[#0d0d0d] p-6 border border-[#242728] flex flex-col justify-between space-y-4">
            <div>
              {/* Deck Header */}
              <div className="flex flex-wrap items-center justify-between border-b border-[#242728] pb-3 gap-2">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-[#57c1ff]" />
                  <h3 className="font-semibold text-xs text-[#f4f4f6] uppercase tracking-wider">Memory Deck</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#18191a] text-[#59d499] border border-[#242728]">
                    {DEFAULT_FLASHCARDS.length} Cards
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShuffleDeck}
                    title="Shuffle Flashcards"
                    className="rounded-md border border-[#242728] p-1.5 text-[#9c9c9d] hover:text-white hover:border-white/30 transition text-xs flex items-center gap-1"
                  >
                    <Shuffle className="h-3 w-3" />
                    <span className="text-[10px] hidden sm:inline">Shuffle</span>
                  </button>

                  <span className="text-xs font-mono text-[#6a6b6c]">
                    Card {currentCardIdx + 1} of {filteredCards.length}
                  </span>
                </div>
              </div>

              {/* Subject Filter Pills */}
              <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {FLASHCARD_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`rounded-md px-2.5 py-1 text-[11px] whitespace-nowrap transition border ${
                      selectedCategory === cat.id
                        ? 'bg-[#18191a] border-[#57c1ff] text-[#57c1ff] font-medium'
                        : 'bg-[#101111] border-[#242728] text-white/50 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Active Flashcard container */}
              <div 
                onClick={() => setFlipped(!flipped)}
                className={`cursor-pointer my-4 flex min-h-[220px] flex-col justify-between rounded-xl bg-[#101111] p-5 sm:p-6 text-center text-white border transition duration-200 select-none ${
                  flipped 
                    ? 'border-[#57c1ff]/50 shadow-[0_0_20px_rgba(87,193,255,0.08)] bg-[#121315]' 
                    : 'border-[#242728] hover:border-[rgba(255,255,255,0.2)]'
                }`}
              >
                {/* Card Top Label */}
                <div className="flex items-center justify-between text-[10px] font-mono w-full">
                  <span className="text-[#6a6b6c] uppercase">
                    {activeCard?.subject || 'General Concept'}
                  </span>
                  <span className={`mc-keycap text-[10px] ${flipped ? 'text-[#59d499]' : 'text-[#ffc533]'}`}>
                    {flipped ? 'SOLUTION (CLICK TO FLIP)' : 'CONCEPT (CLICK TO REVEAL)'}
                  </span>
                </div>

                {/* Card Content (Front vs Back) */}
                <div className="my-auto py-3">
                  <div className={`text-xs sm:text-sm font-medium leading-relaxed transition ${
                    flipped ? 'text-[#f4f4f6]' : 'text-white font-semibold'
                  }`}>
                    {flipped ? activeCard?.back : activeCard?.front}
                  </div>

                  {flipped && activeCard?.tip && (
                    <div className="mt-4 rounded-md bg-[#07080a] p-2.5 text-[11px] text-[#57c1ff] border border-[#242728] flex items-center justify-center gap-1.5">
                      <Lightbulb className="h-3.5 w-3.5 shrink-0 text-[#ffc533]" />
                      <span>{activeCard.tip}</span>
                    </div>
                  )}
                </div>

                {/* Card Bottom Hint */}
                <div className="text-[10px] text-[#6a6b6c] font-mono">
                  {flipped ? 'Click anywhere on card to view prompt' : 'Tap or click to reveal verified solution'}
                </div>
              </div>

              {/* Card Navigation Arrows */}
              <div className="flex items-center justify-between text-xs text-[#9c9c9d] px-1">
                <button
                  onClick={handlePrevCard}
                  className="flex items-center gap-1 hover:text-white transition py-1"
                >
                  <ChevronLeft className="h-3.5 w-3.5" /> Previous
                </button>

                <span className="text-[10px] font-mono text-[#6a6b6c]">
                  Session Reviewed: <strong className="text-[#59d499]">{reviewedCount}</strong>
                </span>

                <button
                  onClick={handleNextCard}
                  className="flex items-center gap-1 hover:text-white transition py-1"
                >
                  Next <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>

            {/* Ease of Recall Spaced Repetition Buttons */}
            <div className="space-y-2 pt-3 border-t border-[#242728]">
              <div className="flex items-center justify-between text-[11px] text-[#6a6b6c] font-mono">
                <span>Rate recall ease:</span>
                <span className="text-[10px] text-white/40">Adjusts spaced interval</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleRateRecall('hard')}
                  className="mc-btn mc-btn-outline text-xs text-[#ff6161] hover:text-[#ff6161] hover:border-[#ff6161] py-2"
                >
                  Hard (+1d)
                </button>
                <button
                  onClick={() => handleRateRecall('medium')}
                  className="mc-btn mc-btn-outline text-xs text-[#ffc533] hover:text-[#ffc533] hover:border-[#ffc533] py-2"
                >
                  Medium (+3d)
                </button>
                <button
                  onClick={() => handleRateRecall('easy')}
                  className="mc-btn mc-btn-outline text-xs text-[#59d499] hover:text-[#59d499] hover:border-[#59d499] py-2"
                >
                  Easy (+7d)
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      <FloatingFrap />
    </div>
  );
};

export default StudyPlanner;
