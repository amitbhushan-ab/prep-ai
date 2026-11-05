import React, { useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import { ThemeContext } from '../context/theme-context';
import { GraduationCap, ArrowRight, Sun, Moon } from 'lucide-react';
import AuroraBackground from '../components/aceternity/AuroraBackground';
import TextGenerate from '../components/aceternity/TextGenerate';
import MovingBorder from '../components/aceternity/MovingBorder';
import Reveal from '../components/aceternity/Reveal';
import PrepAILogo from '../components/PrepAILogo';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: 'ankit@prepai.edu', password: 'password123' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, register } = useContext(AuthContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (isRegister) {
        await register(formData.name, formData.email, formData.password, 'learner');
      } else {
        await login(formData.email, formData.password, 'learner');
      }
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from);
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemoAccount = () => {
    setFormData({ name: 'Ankit Pal', email: 'ankit@prepai.edu', password: 'password123' });
  };

  return (
    <AuroraBackground className="min-h-[calc(100vh-96px)] px-4 py-8 sm:px-6 sm:py-14">
      <div className="mx-auto grid w-full max-w-[1080px] items-center gap-12 lg:grid-cols-[1.05fr_440px] lg:gap-16">

        {/* Editorial column */}
        <div className="hidden lg:block">
          <span className="mc-eyebrow">Learner portal</span>

          <h1 className="mc-display mt-6 max-w-[13ch]">
            <TextGenerate text="Rehearse like it already counts." />
          </h1>

          <p className="mc-body-lg mt-7 max-w-[46ch] text-[var(--mc-mute)]">
            One calm workspace for mock tests, concept repair and interview
            rehearsal — built around the exam you actually sit.
          </p>

          <div className="mt-9 flex flex-wrap gap-2.5">
            <span className="mc-pill">
              <GraduationCap className="h-3.5 w-3.5 text-[var(--mc-accent)]" strokeWidth={1.8} />
              JEE · NEET · UPSC · CAT
            </span>
            <span className="mc-pill">Adaptive practice</span>
            <span className="mc-pill">Interview room</span>
          </div>

          <div className="mt-12 flex items-center gap-10 border-t border-[var(--mc-hairline)] pt-8">
            {[
              { value: '12.4k', label: 'Curated questions' },
              { value: '82%', label: 'Median readiness' },
              { value: '24', label: 'Mock formats' }
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-[26px] font-medium tracking-[-0.03em] text-[var(--mc-ink)]">
                  {stat.value}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[var(--mc-mute)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auth card */}
        <Reveal className="w-full">
          <div className="mc-card rounded-[36px] p-6 shadow-[var(--mc-shadow-lg)] sm:p-9">

            <div className="flex items-center justify-between">
              <PrepAILogo size="lg" animated={true} />

              <button
                type="button"
                onClick={toggleTheme}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--mc-hairline)] text-[var(--mc-mute)] transition-colors hover:text-[var(--mc-ink)]"
                title={isDark ? 'Day mode' : 'Dark mode'}
              >
                {isDark ? (
                  <Sun className="h-4 w-4 text-[var(--mc-warn)]" strokeWidth={1.8} />
                ) : (
                  <Moon className="h-4 w-4" strokeWidth={1.8} />
                )}
              </button>
            </div>

            <div className="mt-7">
              <span className="mc-eyebrow">Candidate access</span>
              <h2 className="mt-3 text-[27px] font-medium leading-[1.12] tracking-[-0.025em] text-[var(--mc-ink)]">
                {isRegister ? 'Create your account' : 'Welcome back'}
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--mc-mute)]">
                {isRegister
                  ? 'Set up a candidate profile to track readiness across every exam track.'
                  : 'Sign in to pick up your syllabus tracks, mocks and practice history.'}
              </p>
            </div>

            {error && (
              <div className="mt-5 rounded-[16px] border border-[rgba(192,42,58,0.25)] bg-[rgba(192,42,58,0.06)] px-4 py-3 text-[12.5px] leading-relaxed text-[var(--mc-danger)]">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {isRegister && (
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-[11.5px] font-semibold uppercase tracking-[0.1em] text-[var(--mc-mute)]">
                    Full name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Candidate name"
                    className="mc-field"
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="mb-1.5 block text-[11.5px] font-semibold uppercase tracking-[0.1em] text-[var(--mc-mute)]">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@prepai.edu"
                  className="mc-field"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-1.5 block text-[11.5px] font-semibold uppercase tracking-[0.1em] text-[var(--mc-mute)]">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="mc-field"
                />
              </div>

              <MovingBorder type="submit" disabled={isSubmitting} className="mt-2 w-full">
                <span>{isSubmitting ? 'Signing in…' : isRegister ? 'Create account' : 'Sign in'}</span>
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </MovingBorder>
            </form>

            <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--mc-hairline)] pt-4">
              <button
                type="button"
                onClick={fillDemoAccount}
                className="text-[12px] font-medium text-[var(--mc-mute)] transition-colors hover:text-[var(--mc-ink)]"
              >
                Use demo credentials
              </button>

              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-[12px] font-medium text-[var(--mc-link)] transition-opacity hover:opacity-80"
              >
                {isRegister ? 'Sign in instead' : 'Create account'}
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12px] text-[var(--mc-mute)]">
            <span>Other portals</span>
            <span className="text-[var(--mc-taupe)]">•</span>
            <Link to="/content/login" className="transition-colors hover:text-[var(--mc-ink)]">
              Content Studio
            </Link>
            <span className="text-[var(--mc-taupe)]">•</span>
            <Link to="/admin/login" className="transition-colors hover:text-[var(--mc-ink)]">
              Admin Console
            </Link>
          </div>
        </Reveal>
      </div>
    </AuroraBackground>
  );
};

export default Login;
