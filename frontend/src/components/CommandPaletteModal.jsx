import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  BarChart3,
  Bot,
  Sparkles,
  Code2,
  FileText,
  Calendar,
  Compass,
  Layers,
  ShieldCheck,
  ArrowRight,
  Sun,
  Moon,
  X,
  Target,
  BookOpen,
  Settings,
  Lock,
  Trophy
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/auth-context';
import { ThemeContext } from '../context/theme-context';

const CommandPaletteModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { currentPortal, setCurrentPortal, isPortalAuthenticated, user } = useContext(AuthContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);

  const commands = [
    // Preferences (Always accessible)
    {
      id: 'theme_toggle',
      title: isDark ? 'Switch to day mode' : 'Switch to dark mode',
      category: 'Preferences',
      icon: isDark ? Sun : Moon,
      action: () => toggleTheme(),
      keycap: 'T',
      portals: ['learner', 'content', 'admin'],
      keywords: ['theme', 'dark mode', 'day mode', 'light mode', 'color scheme']
    },

    // Learner Portal Commands (Exclusively visible in Learner portal)
    {
      id: 'dashboard',
      title: 'Open Learner Dashboard & Daily Targets',
      category: 'Learner',
      icon: Target,
      path: '/dashboard',
      keycap: 'H',
      portals: ['learner'],
      keywords: ['dashboard', 'home', 'targets', 'daily goals', 'study streak', 'progress']
    },
    { 
      id: 'planner', 
      title: 'AI Study Planner & Memory Deck Flashcards', 
      category: 'Learner', 
      icon: Calendar, 
      path: '/planner', 
      keycap: 'P',
      portals: ['learner'],
      keywords: [
        'ai study planner',
        'study planner',
        'ai planner',
        'planner',
        'memory deck',
        'flashcards',
        'spaced repetition',
        'schedule',
        'tasks',
        'timeline',
        'sudy',
        'planeer',
        'planer',
        'study plan',
        'ai study'
      ]
    },
    { 
      id: 'cbt', 
      title: 'Start CBT mock test engine', 
      category: 'Learner', 
      icon: BarChart3, 
      path: '/mock-tests', 
      keycap: 'M',
      portals: ['learner'],
      keywords: ['mock test', 'cbt', 'exam test', 'test series', 'jee mock', 'neet mock', 'upsc mock', 'gate mock', 'cat mock']
    },
    { 
      id: 'tutor', 
      title: 'Open AI concept doubt tutor', 
      category: 'Learner', 
      icon: Bot, 
      path: '/ai-tutor', 
      keycap: 'D',
      portals: ['learner'],
      keywords: ['ai tutor', 'doubt tutor', 'ask ai', 'doubt solving', 'chatbot', 'ai chat', 'explain concept']
    },
    { 
      id: 'interview', 
      title: 'Launch dynamic AI interview room', 
      category: 'Learner', 
      icon: Sparkles, 
      path: '/ai-interview', 
      keycap: 'I',
      portals: ['learner'],
      keywords: ['ai interview', 'mock interview', 'interview simulator', 'voice interview', 'behavioral interview', 'tech interview', 'tracks']
    },
    { 
      id: 'coding', 
      title: 'Open coding interview workspace', 
      category: 'Learner', 
      icon: Code2, 
      path: '/coding-lab', 
      keycap: 'C',
      portals: ['learner'],
      keywords: ['coding lab', 'code editor', 'dsa', 'leetcode', 'compiler', 'javascript', 'python', 'c++']
    },
    { 
      id: 'resume', 
      title: 'Resume & DAF heuristic scanner', 
      category: 'Learner', 
      icon: FileText, 
      path: '/resume-analyzer', 
      keycap: 'R',
      portals: ['learner'],
      keywords: ['resume analyzer', 'daf scanner', 'cv review', 'ats score', 'resume score', 'cv']
    },
    { 
      id: 'exams', 
      title: 'Browse examination catalogue', 
      category: 'Learner', 
      icon: Compass, 
      path: '/exams', 
      keycap: 'E',
      portals: ['learner'],
      keywords: ['exams', 'examination hub', 'syllabus', 'jee', 'neet', 'upsc', 'gate', 'cat', 'ssc', 'ielts']
    },
    { 
      id: 'bookmarks', 
      title: 'Review saved bookmarks & notes', 
      category: 'Learner', 
      icon: BookOpen, 
      path: '/bookmarks', 
      keycap: 'B',
      portals: ['learner'],
      keywords: ['bookmarks', 'saved notes', 'starred questions', 'revision list']
    },
    { 
      id: 'history', 
      title: 'Past test attempts & telemetry history', 
      category: 'Learner', 
      icon: BarChart3, 
      path: '/history', 
      keycap: 'Y',
      portals: ['learner'],
      keywords: ['history', 'past tests', 'results', 'attempts', 'scores', 'accuracy']
    },
    { 
      id: 'leaderboard', 
      title: 'Community, Peer Network & Elite Leaderboard', 
      category: 'Learner', 
      icon: Trophy, 
      path: '/leaderboard', 
      keycap: 'L',
      portals: ['learner'],
      keywords: ['community', 'peer network', 'leaderboard', 'rankings', 'toppers', 'study partner', 'video call', 'schedule meeting', 'friends', 'chat with peers', 'top rankers', 'air']
    },
    { 
      id: 'profile', 
      title: 'Learner profile & exam preferences', 
      category: 'Learner', 
      icon: Settings, 
      path: '/profile', 
      keycap: 'O',
      portals: ['learner'],
      keywords: ['profile', 'settings', 'account', 'target exam', 'exam date']
    },

    // Content Studio Commands (Visible ONLY in Content portal)
    {
      id: 'qb',
      title: 'Open question bank studio',
      category: 'Content Studio',
      icon: Layers,
      path: isPortalAuthenticated('content') ? '/content/questions' : '/content/login',
      keycap: 'Q',
      portal: 'content',
      portals: ['content'],
      keywords: ['question bank', 'content studio', 'add question', 'questions']
    },
    {
      id: 'review',
      title: 'Editorial SME review queue',
      category: 'Content Studio',
      icon: ShieldCheck,
      path: isPortalAuthenticated('content') ? '/content/review' : '/content/login',
      keycap: 'V',
      portal: 'content',
      portals: ['content'],
      keywords: ['review queue', 'editorial review', 'approve questions', 'sme']
    },
    {
      id: 'content_exams',
      title: 'Catalogue exam metadata editor',
      category: 'Content Studio',
      icon: BookOpen,
      path: isPortalAuthenticated('content') ? '/content/exams' : '/content/login',
      keycap: 'X',
      portal: 'content',
      portals: ['content'],
      keywords: ['exam editor', 'syllabus manager', 'catalogue']
    },
    {
      id: 'test_builder',
      title: 'Build custom CBT test paper',
      category: 'Content Studio',
      icon: Layers,
      path: isPortalAuthenticated('content') ? '/content/builder' : '/content/login',
      keycap: 'K',
      portal: 'content',
      portals: ['content'],
      keywords: ['test builder', 'create test', 'paper builder']
    },

    // Admin Console Commands (Visible ONLY in Admin portal)
    {
      id: 'admin_dash',
      title: 'Admin platform health & telemetry',
      category: 'Admin Console',
      icon: ShieldCheck,
      path: isPortalAuthenticated('admin') ? '/admin' : '/admin/login',
      keycap: 'A',
      portal: 'admin',
      portals: ['admin'],
      keywords: ['admin health', 'telemetry', 'analytics', 'platform overview']
    },
    {
      id: 'admin_users',
      title: 'Admin user IAM & role access',
      category: 'Admin Console',
      icon: ShieldCheck,
      path: isPortalAuthenticated('admin') ? '/admin/users' : '/admin/login',
      keycap: 'U',
      portal: 'admin',
      portals: ['admin'],
      keywords: ['users', 'roles', 'iam', 'permissions', 'admin users']
    },
    {
      id: 'admin_audit',
      title: 'Admin audit logs & security records',
      category: 'Admin Console',
      icon: ShieldCheck,
      path: isPortalAuthenticated('admin') ? '/admin/audit' : '/admin/login',
      keycap: 'G',
      portal: 'admin',
      portals: ['admin'],
      keywords: ['audit logs', 'security records', 'login attempts', 'logs']
    },
    {
      id: 'admin_ai',
      title: 'Admin AI model routing & provider keys',
      category: 'Admin Console',
      icon: Sparkles,
      path: isPortalAuthenticated('admin') ? '/admin/ai-config' : '/admin/login',
      keycap: 'Z',
      portal: 'admin',
      portals: ['admin'],
      keywords: ['ai config', 'model routing', 'groq', 'gemini', 'api keys', 'llm settings']
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  if (!isOpen) return null;

  // Strict role / portal boundary filter
  const portalScopedCommands = commands.filter((cmd) => {
    if (cmd.portals && Array.isArray(cmd.portals)) {
      return cmd.portals.includes(currentPortal);
    }
    if (cmd.category === 'Preferences') return true;
    if (cmd.category === 'Learner' && currentPortal === 'learner') return true;
    if (cmd.category === 'Content Studio' && currentPortal === 'content') return true;
    if (cmd.category === 'Admin Console' && currentPortal === 'admin') return true;
    return false;
  });

  // Intelligent search with typo tolerance & multi-word matching
  const cleanQuery = query.toLowerCase().trim();
  // Normalize common phonetic typos (e.g. "sudy" -> "study", "planeer" -> "planner")
  const normalizedQuery = cleanQuery
    .replace(/\bsudy\b/g, 'study')
    .replace(/\bplaneer\b/g, 'planner')
    .replace(/\bplaner\b/g, 'planner')
    .replace(/\bportel\b/g, 'portal');

  const filtered = portalScopedCommands.filter((c) => {
    if (!cleanQuery) return true;

    const lowerTitle = c.title.toLowerCase();
    const lowerCategory = c.category.toLowerCase();
    const lowerKeywords = c.keywords ? c.keywords.join(' ').toLowerCase() : '';

    // Direct match with raw query or normalized query
    if (lowerTitle.includes(cleanQuery) || lowerTitle.includes(normalizedQuery)) return true;
    if (lowerCategory.includes(cleanQuery) || lowerCategory.includes(normalizedQuery)) return true;
    if (lowerKeywords.includes(cleanQuery) || lowerKeywords.includes(normalizedQuery)) return true;

    // Word-by-word token matching (handles multi-word search like "ai study planner")
    const words = normalizedQuery.split(/\s+/).filter(Boolean);
    const allWordsMatch = words.every(word => 
      lowerTitle.includes(word) || 
      lowerCategory.includes(word) || 
      lowerKeywords.includes(word)
    );

    return allWordsMatch;
  });

  const handleSelect = (cmd) => {
    if (cmd.action) {
      cmd.action();
      onClose();
      return;
    }

    if (cmd.portal && cmd.portal !== currentPortal) {
      if (!isPortalAuthenticated(cmd.portal)) {
        toast.error(`Access Denied: Requires credentials for ${cmd.category}.`, { icon: '🔒' });
        onClose();
        navigate(cmd.path);
        return;
      }
      setCurrentPortal(cmd.portal);
    }

    onClose();
    navigate(cmd.path);
  };

  const placeholderText = 
    currentPortal === 'learner'
      ? "Search AI Study Planner, CBT mock test, tutor, interview…"
      : currentPortal === 'content'
      ? "Search question bank, editorial review, catalogue…"
      : "Search admin telemetry, users, audit, models…";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-24 sm:pt-32">
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[rgba(20,20,19,0.38)] backdrop-blur-[6px]"
      />

      <div className="relative w-full max-w-[620px] overflow-hidden rounded-[32px] border border-[var(--mc-hairline)] bg-[var(--mc-surface)] shadow-[var(--mc-shadow-lg)]">

        {/* Search header */}
        <div className="flex items-center gap-3 px-5 py-4">
          <Search className="h-4 w-4 shrink-0 text-[var(--mc-mute)]" strokeWidth={1.9} />
          <input
            type="text"
            autoFocus
            placeholder={placeholderText}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-[14px] font-normal text-[var(--mc-ink)] outline-none placeholder:text-[var(--mc-mute)]"
          />
          <span className="mc-keycap text-[10px]">ESC</span>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--mc-mute)] transition-colors hover:bg-[var(--mc-surface-alt)] hover:text-[var(--mc-ink)]"
          >
            <X className="h-4 w-4" strokeWidth={1.9} />
          </button>
        </div>

        <div className="mx-5 h-px bg-[var(--mc-hairline)]" />

        {/* Command list */}
        <div className="max-h-[54vh] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="px-4 py-12 text-center text-[13px] text-[var(--mc-mute)]">
              No matching commands found for "{query}".
            </div>
          ) : (
            filtered.map((cmd) => (
              <button
                key={cmd.id}
                type="button"
                onClick={() => handleSelect(cmd)}
                className="group flex w-full items-center justify-between gap-3 rounded-[18px] px-3 py-2.5 text-left transition-colors hover:bg-[var(--mc-surface-alt)]"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--mc-hairline)] bg-[var(--mc-surface-alt)] text-[var(--mc-charcoal)] transition-colors group-hover:border-[var(--mc-hairline-strong)] group-hover:text-[var(--mc-ink)]">
                    <cmd.icon className="h-4 w-4" strokeWidth={1.7} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[13.5px] font-medium text-[var(--mc-ink)]">
                      {cmd.title}
                    </span>
                    <span className="block text-[10.5px] uppercase tracking-[0.12em] text-[var(--mc-mute)]">
                      {cmd.category}
                    </span>
                  </span>
                </span>

                <span className="flex shrink-0 items-center gap-2">
                  <span className="mc-keycap text-[10px]">{cmd.keycap}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[var(--mc-taupe)] transition-colors group-hover:text-[var(--mc-ink)]" />
                </span>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-[var(--mc-hairline)] bg-[var(--mc-surface-alt)] px-5 py-2.5 text-[10.5px] text-[var(--mc-mute)]">
          <div className="flex items-center gap-3">
            <span><strong className="font-semibold text-[var(--mc-charcoal)]">↑↓</strong> Navigate</span>
            <span><strong className="font-semibold text-[var(--mc-charcoal)]">↵</strong> Select</span>
            <span><strong className="font-semibold text-[var(--mc-charcoal)]">ESC</strong> Close</span>
          </div>
          <span className="hidden items-center gap-1.5 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--mc-accent)]" />
            <span className="capitalize">{currentPortal}</span> portal session (isolated)
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommandPaletteModal;
