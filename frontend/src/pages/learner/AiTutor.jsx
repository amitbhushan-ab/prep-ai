import React, { useState, useEffect, useRef } from 'react';
import api from '../../lib/api';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Settings, 
  Key, 
  Trash2, 
  Copy, 
  Check, 
  Zap, 
  Eye, 
  EyeOff, 
  ExternalLink, 
  X,
  Lightbulb,
  Trophy,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  Code2,
  Calculator,
  Atom,
  FlaskConical,
  Landmark,
  Cpu,
  Layers
} from 'lucide-react';
import toast from 'react-hot-toast';
import FloatingFrap from '../../components/FloatingFrap';
import MarkdownContent from '../../components/MarkdownContent';
import { FEEDED_CATEGORIES, FEEDED_QUESTIONS } from '../../data/feededQuestions';

const CATEGORY_ICONS = {
  all: Sparkles,
  coding: Code2,
  math: Calculator,
  physics: Atom,
  chemistry: FlaskConical,
  upsc: Landmark,
  system_design: Cpu
};

const AiTutor = () => {
  // Provider & API Keys
  const [provider, setProvider] = useState(() => localStorage.getItem('prepai_ai_provider') || 'gemini');
  const [geminiKey, setGeminiKey] = useState(() => localStorage.getItem('prepai_gemini_key') || '');
  const [groqKey, setGroqKey] = useState(() => localStorage.getItem('prepai_groq_key') || '');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [isTestingKey, setIsTestingKey] = useState(false);

  // Feeded Questions Shelf State
  const [isShelfOpen, setIsShelfOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  // Active key
  const activeKey = provider === 'gemini' ? geminiKey : groqKey;
  const isKeyConfigured = Boolean(activeKey && activeKey.trim().length > 5);

  // Chat state
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "### Welcome to PrepAI Master Tutor\n\nClick any **Curated Feeded Question** above to get instant step-by-step solutions, or type any custom problem in the chat bar below.\n\n*Choose your mode above (Step-by-Step, Shortcut, or Hint) and connect your Google Gemini or Groq key for live AI reasoning.*",
      time: 'Just now',
      provider: 'prepai',
      model: 'AI Tutor'
    }
  ]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('explain'); // 'explain' | 'topper' | 'hint'
  const [topic, setTopic] = useState('Core Examination Concepts');
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Filtered feeded questions
  const filteredQuestions = activeCategory === 'all'
    ? FEEDED_QUESTIONS
    : FEEDED_QUESTIONS.filter(q => q.category === activeCategory);

  const saveSettings = () => {
    localStorage.setItem('prepai_ai_provider', provider);
    localStorage.setItem('prepai_gemini_key', geminiKey.trim());
    localStorage.setItem('prepai_groq_key', groqKey.trim());
    toast.success(`Saved ${provider === 'gemini' ? 'Google Gemini' : 'Groq'} settings`);
    setIsSettingsOpen(false);
  };

  const handleTestKey = async () => {
    const keyToTest = (provider === 'gemini' ? geminiKey : groqKey).trim();
    if (!keyToTest) {
      toast.error(`Please enter a valid ${provider === 'gemini' ? 'Gemini' : 'Groq'} key`);
      return;
    }

    setIsTestingKey(true);
    try {
      const res = await api.post('/api/prepai/tutor/chat', {
        message: 'Ping test: reply with "CONNECTION SUCCESSFUL"',
        apiKey: keyToTest,
        provider,
        mode: 'explain'
      });

      if (res.data.isLiveAi) {
        toast.success(`Connected to ${provider.toUpperCase()} (${res.data.model})!`);
      } else if (res.data.apiError) {
        toast.error(`API Error: ${res.data.apiError}`);
      } else {
        toast.success("Ready! Connected successfully.");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Connection test failed.");
    } finally {
      setIsTestingKey(false);
    }
  };

  const handleSend = async (textToSend = input, explicitTopic = topic) => {
    const query = (textToSend || '').trim();
    if (!query) return;

    const userMsg = { 
      sender: 'user', 
      text: query, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    
    // Conversation history context
    const history = messages
      .filter(m => m.sender === 'user' || m.sender === 'ai')
      .slice(-6)
      .map(m => ({ role: m.sender === 'user' ? 'user' : 'model', text: m.text }));

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.post('/api/prepai/tutor/chat', {
        message: query,
        mode,
        topic: explicitTopic,
        history,
        apiKey: activeKey.trim() || undefined,
        provider
      });

      const aiMsg = {
        sender: 'ai',
        text: res.data.response,
        suggested: res.data.suggestedQuestions,
        provider: res.data.provider || provider,
        model: res.data.model,
        isLiveAi: res.data.isLiveAi,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const fallbackAi = {
        sender: 'ai',
        text: `### Conceptual Resolution: "${query}"\n\n1. **Core Governing Invariant**: Map this problem to the foundational theorems of *${explicitTopic}*.\n2. **Resolution Mechanics**: Formulate equations and isolate unknown variables.\n3. **Sanity Verification**: Test boundary values ($x=0$, $x=\\infty$, or empty state).`,
        suggested: [
          "Give a real exam question on this concept",
          "Explain this with a simple real-world analogy",
          "Summarize this in a 3-bullet revision note"
        ],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        provider: 'fallback',
        model: 'local-engine'
      };
      setMessages(prev => [...prev, fallbackAi]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        sender: 'ai',
        text: "✨ Conversation reset. What question would you like to explore next?",
        time: 'Just now',
        provider: 'prepai',
        model: 'AI Tutor'
      }
    ]);
    toast.success("Chat history cleared");
  };

  return (
    <div className="min-h-screen bg-[var(--mc-canvas)] text-[var(--mc-ink)] p-3 sm:p-6 lg:p-8 transition-colors duration-200">
      <div className="mx-auto max-w-5xl flex flex-col h-[calc(100vh-120px)] rounded-2xl bg-[var(--mc-surface)] border border-[var(--mc-hairline)] shadow-[var(--mc-shadow-md)] overflow-hidden">
        
        {/* Top Navbar Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-[var(--mc-hairline)] bg-[var(--mc-surface-alt)] px-5 py-3.5 gap-3 shrink-0">
          
          {/* Title & Live Status */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--mc-misty-rose-soft)] text-[var(--mc-accent)] border border-[var(--mc-misty-rose-border)] shadow-xs">
              <Bot className="h-4.5 w-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-semibold tracking-tight text-[var(--mc-ink)]">
                  AI Concept Tutor
                </h1>
                <span className="mc-pill-misty text-[10px] py-0.5 px-2 hidden sm:inline-flex">Universal</span>
                
                {/* Active Provider Pill */}
                {isKeyConfigured ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live: {provider === 'gemini' ? 'Gemini 1.5' : 'Groq Llama 3.1'}
                  </span>
                ) : (
                  <button
                    onClick={() => setIsSettingsOpen(true)}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-[var(--mc-mute)] bg-[var(--mc-surface)] border border-[var(--mc-hairline)] hover:border-[var(--mc-ink)]/40 hover:text-[var(--mc-ink)] transition"
                  >
                    <Zap className="h-3 w-3 text-amber-500" />
                    <span>Offline Engine (Click to add API key)</span>
                  </button>
                )}
              </div>
              <p className="text-[11px] text-[var(--mc-mute)]">Socratic reasoning, step-by-step math derivations & exam speed tricks</p>
            </div>
          </div>

          {/* Right Controls: Mode Switcher, Clear, Settings */}
          <div className="flex items-center gap-2">
            
            {/* Mode Switcher */}
            <div className="flex items-center gap-1 bg-[var(--mc-surface)] p-1 rounded-xl border border-[var(--mc-hairline)] text-xs shadow-xs">
              <button
                onClick={() => setMode('explain')}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs transition ${
                  mode === 'explain' 
                    ? 'bg-[var(--mc-surface-alt)] text-[var(--mc-ink)] font-semibold border border-[var(--mc-hairline-strong)] shadow-xs' 
                    : 'text-[var(--mc-mute)] hover:text-[var(--mc-ink)]'
                }`}
                title="Deep conceptual breakdown"
              >
                <BookOpen className="h-3 w-3 text-[var(--mc-link)]" />
                <span className="hidden sm:inline">Step-by-Step</span>
              </button>

              <button
                onClick={() => setMode('topper')}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs transition ${
                  mode === 'topper' 
                    ? 'bg-[var(--mc-surface-alt)] text-[var(--mc-ink)] font-semibold border border-[var(--mc-hairline-strong)] shadow-xs' 
                    : 'text-[var(--mc-mute)] hover:text-[var(--mc-ink)]'
                }`}
                title="Exam shortcuts & option elimination"
              >
                <Trophy className="h-3 w-3 text-amber-500" />
                <span className="hidden sm:inline">Shortcut</span>
              </button>

              <button
                onClick={() => setMode('hint')}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs transition ${
                  mode === 'hint' 
                    ? 'bg-[var(--mc-surface-alt)] text-[var(--mc-ink)] font-semibold border border-[var(--mc-hairline-strong)] shadow-xs' 
                    : 'text-[var(--mc-mute)] hover:text-[var(--mc-ink)]'
                }`}
                title="Socratic hint without spoiling the answer"
              >
                <Lightbulb className="h-3 w-3 text-yellow-500" />
                <span className="hidden sm:inline">Hint</span>
              </button>
            </div>

            {/* Clear Chat */}
            <button
              onClick={handleClearChat}
              className="p-2 rounded-xl bg-[var(--mc-surface)] border border-[var(--mc-hairline)] text-[var(--mc-mute)] hover:text-[var(--mc-ink)] hover:border-[var(--mc-hairline-strong)] transition"
              title="Clear chat history"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>

            {/* Configure AI Key */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--mc-surface)] border border-[var(--mc-hairline)] text-xs text-[var(--mc-ink)] hover:border-[var(--mc-ink)]/40 transition shadow-xs"
            >
              <Settings className="h-3.5 w-3.5 text-[var(--mc-accent)]" />
              <span className="hidden sm:inline font-medium">AI Setup</span>
            </button>

          </div>
        </div>

        {/* Offline Notice Banner if key not added */}
        {!isKeyConfigured && (
          <div className="flex items-center justify-between bg-amber-500/10 dark:bg-amber-950/30 border-b border-amber-500/20 px-5 py-2 text-xs text-amber-700 dark:text-amber-300 shrink-0">
            <div className="flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 text-amber-500 shrink-0" />
              <span>Running in <strong>Offline Simulated Engine</strong>. Connect a free Google Gemini or Groq key for live AI reasoning.</span>
            </div>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="font-medium underline hover:text-amber-900 dark:hover:text-amber-100 text-xs ml-2 shrink-0"
            >
              Add Key →
            </button>
          </div>
        )}

        {/* ============================================================== */}
        {/* FEEDED QUESTIONS SHELF (DISPLAYED PROMINENTLY ABOVE CHATBOX)   */}
        {/* ============================================================== */}
        <div className="border-b border-[var(--mc-hairline)] bg-[var(--mc-surface-alt)]/80 backdrop-blur-sm px-4 sm:px-6 py-2.5 transition-all shrink-0">
          
          {/* Header & Toggle */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[var(--mc-misty-rose-soft)] text-[var(--mc-accent)]">
                <Sparkles className="h-3 w-3" />
              </div>
              <span className="text-xs font-semibold tracking-tight text-[var(--mc-ink)]">
                Curated Feeded Questions
              </span>
              <span className="text-[10px] font-mono text-[var(--mc-mute)] bg-[var(--mc-surface)] px-2 py-0.2 rounded-full border border-[var(--mc-hairline)]">
                {filteredQuestions.length} Questions
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden md:inline text-[11px] text-[var(--mc-mute)] font-mono">
                Click any question to ask AI
              </span>
              <button
                type="button"
                onClick={() => setIsShelfOpen(!isShelfOpen)}
                className="flex items-center gap-1 text-[11px] font-medium text-[var(--mc-mute)] hover:text-[var(--mc-ink)] px-2 py-0.5 rounded-lg border border-[var(--mc-hairline)] bg-[var(--mc-surface)] transition"
              >
                <span>{isShelfOpen ? 'Hide' : 'Show Questions'}</span>
                {isShelfOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
            </div>
          </div>

          {/* Collapsible Content */}
          {isShelfOpen && (
            <div className="space-y-2.5 pt-1">
              {/* Category Pills Bar */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {FEEDED_CATEGORIES.map(cat => {
                  const Icon = CATEGORY_ICONS[cat.id] || Sparkles;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl px-2.5 py-1 text-[11px] font-medium transition-all ${
                        isActive
                          ? 'bg-[var(--mc-primary-bg)] text-[var(--mc-primary-fg)] shadow-xs'
                          : 'bg-[var(--mc-surface)] text-[var(--mc-mute)] hover:text-[var(--mc-ink)] border border-[var(--mc-hairline)] hover:border-[var(--mc-misty-rose-border)]'
                      }`}
                    >
                      <Icon className="h-3 w-3" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Question Cards (Horizontal scroll carousel or wrap) */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {filteredQuestions.map(q => (
                  <button
                    key={q.id}
                    onClick={() => handleSend(q.question, q.topic)}
                    className="flex flex-col justify-between shrink-0 w-[240px] sm:w-[280px] p-2.5 rounded-xl border border-[var(--mc-hairline)] bg-[var(--mc-surface)] hover:bg-[var(--mc-surface-alt)] hover:border-[var(--mc-misty-rose-border)] text-left transition group shadow-xs hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between w-full mb-1.5">
                      <span className="text-[10px] font-mono font-medium text-[var(--mc-accent)] bg-[var(--mc-misty-rose-soft)] px-1.5 py-0.2 rounded border border-[var(--mc-misty-rose-border)]">
                        {q.badge}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--mc-mute)] group-hover:text-[var(--mc-ink)] transition flex items-center gap-0.5">
                        Ask <ArrowUpRight className="h-2.5 w-2.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                    <p className="text-xs text-[var(--mc-ink)] font-medium line-clamp-2 leading-snug group-hover:text-[var(--mc-accent)] transition-colors">
                      {q.question}
                    </p>
                    <div className="mt-2 text-[10px] text-[var(--mc-mute)] font-mono">
                      {q.topic}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[var(--mc-canvas)]">

          {/* Render Messages */}
          {messages.map((msg, idx) => (
            <div 
              key={idx}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--mc-surface)] border border-[var(--mc-hairline)] text-xs font-semibold text-[var(--mc-ink)] mt-1 shadow-xs">
                  {msg.provider === 'gemini' ? (
                    <span className="text-blue-500 font-mono text-[11px] font-bold">Ge</span>
                  ) : msg.provider === 'groq' ? (
                    <span className="text-orange-500 font-mono text-[11px] font-bold">Gq</span>
                  ) : (
                    <Bot className="h-4 w-4 text-[var(--mc-accent)]" />
                  )}
                </div>
              )}

              <div className={`max-w-3xl rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-sm transition-all ${
                msg.sender === 'user'
                  ? 'bg-[var(--mc-primary-bg)] text-[var(--mc-primary-fg)] border border-[var(--mc-hairline-strong)] ml-8'
                  : 'bg-[var(--mc-surface)] text-[var(--mc-ink)] border border-[var(--mc-hairline)] mr-4'
              }`}>
                {/* Content Rendered with MarkdownContent */}
                {msg.sender === 'ai' ? (
                  <MarkdownContent content={msg.text} />
                ) : (
                  <div className="whitespace-pre-line leading-relaxed font-sans">{msg.text}</div>
                )}

                {/* AI Footer bar */}
                {msg.sender === 'ai' && (
                  <div className="mt-3.5 flex items-center justify-between border-t border-[var(--mc-hairline)] pt-2.5 text-[11px] text-[var(--mc-mute)] font-mono">
                    <div className="flex items-center gap-2">
                      <span>{msg.time}</span>
                      {msg.model && (
                        <span className="px-2 py-0.5 rounded-md bg-[var(--mc-surface-alt)] text-[var(--mc-ink)] border border-[var(--mc-hairline)] text-[10px]">
                          {msg.model}
                        </span>
                      )}
                    </div>
                    
                    <button
                      onClick={() => handleCopy(msg.text, idx)}
                      className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-[var(--mc-surface-alt)] text-[var(--mc-mute)] hover:text-[var(--mc-ink)] transition"
                    >
                      {copiedIdx === idx ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedIdx === idx ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                )}

                {/* Follow-up suggestions */}
                {msg.suggested && msg.suggested.length > 0 && (
                  <div className="mt-3.5 pt-3 border-t border-[var(--mc-hairline)] space-y-2">
                    <span className="text-[10px] text-[var(--mc-mute)] uppercase font-mono tracking-wider flex items-center gap-1.5 font-semibold">
                      <Sparkles className="h-3 w-3 text-[var(--mc-accent)]" />
                      Suggested Next Inquiries:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {msg.suggested.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(s)}
                          className="rounded-xl border border-[var(--mc-hairline)] bg-[var(--mc-surface-alt)] hover:bg-[var(--mc-surface)] hover:border-[var(--mc-misty-rose-border)] text-[var(--mc-ink)] px-3.5 py-1.5 text-xs transition text-left shadow-xs flex items-center gap-1.5 font-medium hover:shadow-sm"
                        >
                          <span className="text-[var(--mc-accent)]">→</span>
                          <span>{s}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex gap-3 items-center text-xs text-[var(--mc-mute)] font-mono">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--mc-surface)] border border-[var(--mc-hairline)] text-[var(--mc-accent)] shadow-xs animate-pulse">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2">
                <span>Formulating reasoning with {provider.toUpperCase()}...</span>
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--mc-accent)] animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--mc-accent)] animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--mc-accent)] animate-bounce [animation-delay:0.4s]" />
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="border-t border-[var(--mc-hairline)] bg-[var(--mc-surface-alt)] p-3 sm:p-4 shrink-0">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                mode === 'hint' 
                  ? "Describe where you are stuck to get a Socratic hint..."
                  : mode === 'topper'
                  ? "Paste a problem to see 30-second speed-solving shortcuts..."
                  : "Ask any conceptual question, theorem derivation, or coding doubt..."
              }
              className="flex-1 rounded-xl border border-[var(--mc-hairline)] bg-[var(--mc-surface)] px-4 py-3 text-xs sm:text-sm text-[var(--mc-ink)] placeholder-[var(--mc-mute)] focus:border-[var(--mc-accent)] focus:ring-1 focus:ring-[var(--mc-accent)]/30 focus:outline-none transition shadow-xs"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="mc-btn mc-btn-primary py-3 px-5 text-xs sm:text-sm disabled:opacity-40 flex items-center gap-2"
            >
              <Send className="h-3.5 w-3.5" />
              <span className="hidden sm:inline font-medium">Send</span>
            </button>
          </form>
          
          <div className="mt-2 flex items-center justify-between text-[11px] text-[var(--mc-mute)] px-1 font-mono">
            <span>Mode: <strong className="text-[var(--mc-ink)]">{mode.toUpperCase()}</strong></span>
            <span>Click any feeded question above or press Enter to ask</span>
          </div>
        </div>

      </div>

      {/* AI Key / Provider Configuration Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl border border-[var(--mc-hairline-strong)] bg-[var(--mc-surface)] p-6 sm:p-7 shadow-2xl space-y-5 text-[var(--mc-ink)] animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[var(--mc-hairline)] pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--mc-accent-soft)] text-[var(--mc-accent)] border border-[var(--mc-hairline)]">
                  <Key className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[var(--mc-ink)]">Connect Real AI Engine</h3>
                  <p className="text-xs text-[var(--mc-mute)]">Use Google Gemini or Groq Cloud for live tutor responses</p>
                </div>
              </div>
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="text-[var(--mc-mute)] hover:text-[var(--mc-ink)] p-1.5 rounded-xl hover:bg-[var(--mc-surface-alt)] transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Provider Selection */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[var(--mc-mute)] block font-semibold">
                Select AI Engine
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setProvider('gemini')}
                  className={`flex flex-col items-start p-3.5 rounded-2xl border text-left transition ${
                    provider === 'gemini' 
                      ? 'border-indigo-500 bg-indigo-500/10 text-[var(--mc-ink)] shadow-xs' 
                      : 'border-[var(--mc-hairline)] bg-[var(--mc-surface-alt)] text-[var(--mc-mute)] hover:text-[var(--mc-ink)] hover:border-[var(--mc-hairline-strong)]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-semibold text-xs text-indigo-600 dark:text-indigo-400">Google Gemini</span>
                    <span className="text-[10px] bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded font-mono font-medium">Free</span>
                  </div>
                  <span className="text-[11px] text-[var(--mc-mute)] leading-snug">Gemini 1.5 Flash • Official Google AI Studio API</span>
                </button>

                <button
                  type="button"
                  onClick={() => setProvider('groq')}
                  className={`flex flex-col items-start p-3.5 rounded-2xl border text-left transition ${
                    provider === 'groq' 
                      ? 'border-orange-500 bg-orange-500/10 text-[var(--mc-ink)] shadow-xs' 
                      : 'border-[var(--mc-hairline)] bg-[var(--mc-surface-alt)] text-[var(--mc-mute)] hover:text-[var(--mc-ink)] hover:border-[var(--mc-hairline-strong)]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-semibold text-xs text-orange-600 dark:text-orange-400">Groq Cloud</span>
                    <span className="text-[10px] bg-orange-500/20 text-orange-700 dark:text-orange-300 px-1.5 py-0.5 rounded font-mono font-medium">Ultra Fast</span>
                  </div>
                  <span className="text-[11px] text-[var(--mc-mute)] leading-snug">Llama 3.1 8B Instant • Universal Free Tier & 800+ tokens/sec speed</span>
                </button>
              </div>
            </div>

            {/* API Key Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--mc-mute)] font-semibold">
                  {provider === 'gemini' ? 'Google Gemini API Key' : 'Groq API Key'}
                </label>
                <a
                  href={provider === 'gemini' ? 'https://aistudio.google.com/app/apikey' : 'https://console.groq.com/keys'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-[var(--mc-link)] hover:underline font-medium"
                >
                  <span>Get Free Key</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={provider === 'gemini' ? geminiKey : groqKey}
                  onChange={(e) => {
                    if (provider === 'gemini') setGeminiKey(e.target.value);
                    else setGroqKey(e.target.value);
                  }}
                  placeholder={provider === 'gemini' ? 'AIzaSy...' : 'gsk_...'}
                  className="w-full rounded-xl border border-[var(--mc-hairline)] bg-[var(--mc-surface-alt)] px-3.5 py-2.5 pr-10 text-xs font-mono text-[var(--mc-ink)] placeholder-[var(--mc-mute)] focus:border-[var(--mc-accent)] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-2.5 text-[var(--mc-mute)] hover:text-[var(--mc-ink)]"
                >
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-[11px] text-[var(--mc-mute)] leading-relaxed">
                Your key is stored safely in your browser’s <code className="px-1 py-0.5 rounded bg-[var(--mc-surface-alt)] border border-[var(--mc-hairline)] text-[var(--mc-ink)]">localStorage</code> and is sent directly to the local backend.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between border-t border-[var(--mc-hairline)] pt-4">
              <button
                type="button"
                onClick={handleTestKey}
                disabled={isTestingKey}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--mc-surface-alt)] border border-[var(--mc-hairline)] text-xs font-medium text-[var(--mc-ink)] hover:border-[var(--mc-hairline-strong)] transition disabled:opacity-50 shadow-xs"
              >
                <Zap className="h-3.5 w-3.5 text-amber-500" />
                <span>{isTestingKey ? 'Pinging API...' : 'Test Connection'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-3.5 py-2 text-xs font-medium text-[var(--mc-mute)] hover:text-[var(--mc-ink)] transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveSettings}
                  className="mc-btn mc-btn-primary px-4 py-2 text-xs"
                >
                  Save & Apply
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      <FloatingFrap />
    </div>
  );
};

export default AiTutor;
