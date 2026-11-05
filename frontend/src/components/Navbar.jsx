import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  Settings,
  FileEdit,
  ShieldCheck,
  Bot,
  Code2,
  FileText,
  Calendar,
  LogOut,
  ChevronDown,
  Compass,
  Target,
  BarChart3,
  Layers,
  BookOpen,
  Search,
  Sun,
  Moon,
  Trophy
} from 'lucide-react';
import { AuthContext } from '../context/auth-context';
import { ThemeContext } from '../context/theme-context';
import CommandPaletteModal from './CommandPaletteModal';
import PrepAILogo from './PrepAILogo';

const Navbar = () => {
  const {
    currentPortal,
    setCurrentPortal,
    isPortalAuthenticated,
    getPortalUser,
    logout
  } = useContext(AuthContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Automatically sync portal based on current route
  useEffect(() => {
    if (location.pathname.startsWith('/admin')) {
      if (currentPortal !== 'admin') setCurrentPortal('admin');
    } else if (location.pathname.startsWith('/content')) {
      if (currentPortal !== 'content') setCurrentPortal('content');
    } else if (
      location.pathname === '/' ||
      location.pathname.startsWith('/dashboard') ||
      location.pathname.startsWith('/exams') ||
      location.pathname.startsWith('/mock-tests') ||
      location.pathname.startsWith('/ai-') ||
      location.pathname.startsWith('/coding-lab') ||
      location.pathname.startsWith('/resume-analyzer') ||
      location.pathname.startsWith('/planner') ||
      location.pathname.startsWith('/leaderboard') ||
      location.pathname.startsWith('/video-practice')
    ) {
      if (currentPortal !== 'learner') setCurrentPortal('learner');
    }
  }, [location.pathname, currentPortal, setCurrentPortal]);

  // Global ⌘ K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePortalSwitch = (portalKey, targetPath) => {
    setCurrentPortal(portalKey);
    setPortalDropdownOpen(false);
    navigate(targetPath);
  };

  const handleLogoutCurrentPortal = () => {
    logout(currentPortal);
    if (currentPortal === 'admin') navigate('/admin/login');
    else if (currentPortal === 'content') navigate('/content/login');
    else navigate('/login');
  };

  const learnerNav = [
    { label: 'Dashboard', icon: Target, path: '/dashboard' },
    { label: 'Exams', icon: Compass, path: '/exams' },
    { label: 'Mock Test', icon: BarChart3, path: '/mock-tests' },
    { label: 'AI Tutor', icon: Bot, path: '/ai-tutor' },
    { label: 'Interview', icon: FileText, path: '/ai-interview' },
    { label: 'Coding Lab', icon: Code2, path: '/coding-lab' },
    { label: 'Resume', icon: FileText, path: '/resume-analyzer' },
    { label: 'AI Planner', icon: Calendar, path: '/planner' },
    { label: 'Community', icon: Trophy, path: '/leaderboard' }
  ];

  const contentNav = [
    { label: 'Question Bank', icon: Layers, path: '/content/questions' },
    { label: 'Catalogue', icon: BookOpen, path: '/content/exams' },
    { label: 'Test Builder', icon: FileEdit, path: '/content/test-builder' },
    { label: 'Review Queue', icon: ShieldCheck, path: '/content/review' }
  ];

  const adminNav = [
    { label: 'Overview', icon: BarChart3, path: '/admin' },
    { label: 'Users', icon: GraduationCap, path: '/admin/users' },
    { label: 'AI Settings', icon: Bot, path: '/admin/ai-config' },
    { label: 'Audit Logs', icon: Settings, path: '/admin/audit' }
  ];

  let currentNavItems = learnerNav;
  if (currentPortal === 'content') currentNavItems = contentNav;
  if (currentPortal === 'admin') currentNavItems = adminNav;

  const portalConfig = {
    learner: {
      name: 'Learner',
      icon: GraduationCap,
      defaultPath: '/dashboard',
      loginPath: '/login'
    },
    content: {
      name: 'Content Studio',
      icon: FileEdit,
      defaultPath: '/content/questions',
      loginPath: '/content/login'
    },
    admin: {
      name: 'Admin',
      icon: ShieldCheck,
      defaultPath: '/admin',
      loginPath: '/admin/login'
    }
  };

  const activePortalUser = getPortalUser(currentPortal);
  const isCurrentPortalAuthed = isPortalAuthenticated(currentPortal);

  const linkClass = ({ isActive }) =>
    `flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[11.5px] xl:px-2.5 xl:text-[12px] 2xl:px-3 2xl:text-[12.5px] font-medium tracking-[-0.01em] transition-colors duration-200 whitespace-nowrap ${
      isActive
        ? 'bg-[var(--mc-canvas)] text-[var(--mc-ink)]'
        : 'text-[var(--mc-mute)] hover:text-[var(--mc-ink)]'
    }`;

  const portals = [
    { key: 'learner', label: 'Learner', icon: GraduationCap, path: '/dashboard', loginPath: '/login' },
    { key: 'content', label: 'Content Studio', icon: FileEdit, path: '/content/questions', loginPath: '/content/login' },
    { key: 'admin', label: 'Admin Console', icon: ShieldCheck, path: '/admin', loginPath: '/admin/login' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="mx-auto w-full max-w-[1400px]">

          {/* Floating nav pill */}
          <div className="mc-nav-pill flex h-[60px] items-center justify-between gap-1.5 px-2.5 sm:px-3.5 lg:px-4">

            {/* Brand + portal switcher */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => navigate(portalConfig[currentPortal].defaultPath)}
                className="flex items-center rounded-full pr-1 transition-opacity hover:opacity-85"
              >
                <PrepAILogo size="md" animated={true} />
              </button>

              <div className="relative hidden sm:block">
                <button
                  type="button"
                  onClick={() => setPortalDropdownOpen(!portalDropdownOpen)}
                  className="flex items-center gap-1.5 rounded-full border border-[var(--mc-hairline)] bg-[var(--mc-surface-alt)] hover:border-[var(--mc-misty-rose-border)] px-3 py-1.5 text-[11.5px] font-medium text-[var(--mc-charcoal)] transition-colors shadow-xs"
                >
                  <span>{portalConfig[currentPortal].name}</span>
                  <span className={`h-1.5 w-1.5 rounded-full ${isCurrentPortalAuthed ? 'bg-[var(--mc-success)]' : 'bg-[var(--mc-taupe)]'}`} />
                  <ChevronDown className="h-3 w-3 text-[var(--mc-mute)]" />
                </button>

                {portalDropdownOpen && (
                  <>
                    <button
                      type="button"
                      aria-label="Close portal menu"
                      onClick={() => setPortalDropdownOpen(false)}
                      className="fixed inset-0 z-40 cursor-default bg-transparent"
                    />
                    <div className="absolute left-0 top-[calc(100%+10px)] z-50 w-[272px] rounded-[26px] border border-[var(--mc-hairline)] bg-[var(--mc-surface)] p-2 shadow-[var(--mc-shadow-lg)]">
                      <div className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--mc-mute)]">
                        Portals
                      </div>

                      {portals.map((portal) => {
                        const authed = isPortalAuthenticated(portal.key);
                        const isActive = currentPortal === portal.key;
                        return (
                          <button
                            key={portal.key}
                            type="button"
                            onClick={() =>
                              handlePortalSwitch(
                                portal.key,
                                authed ? portal.path : portal.loginPath
                              )
                            }
                            className={`flex w-full items-center justify-between gap-3 rounded-[18px] px-3 py-2.5 text-left transition-colors ${
                              isActive
                                ? 'bg-[var(--mc-surface-alt)]'
                                : 'hover:bg-[var(--mc-surface-alt)]'
                            }`}
                          >
                            <span className="flex items-center gap-2.5">
                              <portal.icon className="h-4 w-4 text-[var(--mc-mute)]" strokeWidth={1.7} />
                              <span className={`text-[13px] ${isActive ? 'font-medium text-[var(--mc-ink)]' : 'text-[var(--mc-charcoal)]'}`}>
                                {portal.label}
                              </span>
                            </span>
                            <span className={`text-[10px] font-semibold uppercase tracking-[0.1em] ${authed ? 'text-[var(--mc-success)]' : 'text-[var(--mc-mute)]'}`}>
                              {authed ? 'Active' : 'Locked'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden items-center gap-0.5 xl:flex shrink-0">
              {currentNavItems.map((item) => (
                <NavLink key={item.label} to={item.path} className={linkClass}>
                  <item.icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} />
                  <span className="shrink-0">{item.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Search, theme, session */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setPaletteOpen(true)}
                className="hidden items-center gap-1.5 rounded-full border border-[var(--mc-hairline)] bg-[var(--mc-surface-alt)] px-2.5 py-1.5 2xl:px-3 text-[12px] text-[var(--mc-mute)] transition-colors hover:border-[var(--mc-hairline-strong)] hover:text-[var(--mc-charcoal)] md:flex shrink-0"
              >
                <Search className="h-3.5 w-3.5 shrink-0" strokeWidth={1.9} />
                <span className="shrink-0">Search</span>
                <span className="mc-keycap ml-0.5 text-[10px] shrink-0">⌘K</span>
              </button>

              <button
                type="button"
                onClick={() => setPaletteOpen(true)}
                aria-label="Search"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--mc-hairline)] text-[var(--mc-mute)] transition-colors hover:text-[var(--mc-ink)] md:hidden"
              >
                <Search className="h-4 w-4" strokeWidth={1.9} />
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--mc-hairline)] text-[var(--mc-mute)] transition-colors hover:border-[var(--mc-hairline-strong)] hover:text-[var(--mc-ink)]"
                title={isDark ? 'Day mode' : 'Dark mode'}
              >
                {isDark ? (
                  <Sun className="h-4 w-4 text-[var(--mc-warn)]" strokeWidth={1.8} />
                ) : (
                  <Moon className="h-4 w-4" strokeWidth={1.8} />
                )}
              </button>

              {isCurrentPortalAuthed ? (
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="hidden text-right 2xl:block shrink-0">
                    <div className="text-[12px] font-medium leading-tight text-[var(--mc-ink)]">
                      {activePortalUser?.name || 'User'}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.08em] text-[var(--mc-mute)]">
                      {portalConfig[currentPortal].name}
                    </div>
                  </div>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--mc-ink)] text-[11px] font-semibold text-[var(--mc-primary-fg)] ring-2 ring-[var(--mc-misty-rose-border)] shadow-xs">
                    {(activePortalUser?.name || 'U')[0].toUpperCase()}
                  </span>

                  <button
                    type="button"
                    onClick={handleLogoutCurrentPortal}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--mc-mute)] transition-colors hover:bg-[var(--mc-surface-sunken)] hover:text-[var(--mc-danger)]"
                    title={`Sign out of ${portalConfig[currentPortal].name}`}
                  >
                    <LogOut className="h-4 w-4" strokeWidth={1.8} />
                  </button>
                </div>
              ) : (
                <NavLink to={portalConfig[currentPortal].loginPath} className="mc-btn mc-btn-primary h-8 px-4 text-[12.5px]">
                  Sign in
                </NavLink>
              )}
            </div>
          </div>

          {/* Mobile / tablet navigation strip */}
          <div className="mt-2 xl:hidden">
            <div className="mc-nav-pill no-scrollbar flex items-center gap-1 overflow-x-auto px-2 py-1.5">
              {currentNavItems.map((item) => (
                <NavLink key={item.label} to={item.path} className={linkClass}>
                  <item.icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>

        </div>
      </header>

      <CommandPaletteModal isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
};

export default Navbar;
