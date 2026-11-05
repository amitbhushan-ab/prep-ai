import React, { useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import { ThemeContext } from '../../context/theme-context';
import { 
  FileEdit, 
  ArrowRight, 
  Sun,
  Moon
} from 'lucide-react';
import PrepAILogo from '../../components/PrepAILogo';

const ContentLogin = () => {
  const [formData, setFormData] = useState({ email: 'sme@prepai.edu', password: 'password123' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useContext(AuthContext);
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
      await login(formData.email, formData.password, 'content');
      const from = location.state?.from?.pathname || '/content/questions';
      navigate(from);
    } catch (err) {
      setError(err.message || 'Access Denied: Subject Matter Expert credentials required.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemoAccount = () => {
    setFormData({ email: 'sme@prepai.edu', password: 'password123' });
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-white px-4 py-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <PrepAILogo size="md" />

          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-md border border-[#242728] bg-[#101111] hover:bg-[#151617] text-white/70 hover:text-white transition"
            title={isDark ? "Day Mode" : "Dark Mode"}
          >
            {isDark ? <Sun className="h-3.5 w-3.5 text-amber-300" /> : <Moon className="h-3.5 w-3.5 text-indigo-400" />}
          </button>
        </div>

        {/* Auth Card */}
        <div className="rounded-xl border border-[#242728] bg-[#0d0d0d] p-6 sm:p-8 space-y-5 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-white/50 mb-1">
              <FileEdit className="h-3.5 w-3.5" />
              <span>Editorial Studio</span>
            </div>
            <h2 className="text-xl font-semibold text-white tracking-tight">
              Content Studio Login
            </h2>
            <p className="mt-1 text-xs text-white/40">
              Restricted to Subject Matter Experts, item authors, and syllabus reviewers.
            </p>
          </div>

          {error && (
            <div className="rounded-md bg-rose-500/10 p-3 text-xs text-rose-400 border border-rose-500/20 font-mono">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="text-xs text-white/60 block mb-1">Author email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="sme@prepai.edu"
                className="w-full rounded-md border border-[#242728] bg-[#101111] p-2.5 text-xs text-white placeholder-white/30 focus:border-white/50 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-xs text-white/60 block mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-md border border-[#242728] bg-[#101111] p-2.5 text-xs text-white placeholder-white/30 focus:border-white/50 focus:outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mc-btn mc-btn-primary w-full py-2.5 text-xs font-medium flex items-center justify-center gap-2 mt-2"
            >
              <span>{isSubmitting ? 'Verifying...' : 'Sign In to Studio'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>

          {/* Demo account quick fill */}
          <div className="pt-2 text-center border-t border-[#242728]">
            <button
              type="button"
              onClick={fillDemoAccount}
              className="text-xs text-white/40 hover:text-white transition font-mono"
            >
              Fill demo credentials (sme@prepai.edu)
            </button>
          </div>
        </div>

        {/* Portal links */}
        <div className="flex items-center justify-center gap-4 text-xs text-white/40">
          <span>Other portals:</span>
          <Link to="/login" className="hover:text-white transition">Learner Portal</Link>
          <span>•</span>
          <Link to="/admin/login" className="hover:text-white transition">Admin Console</Link>
        </div>

      </div>
    </div>
  );
};

export default ContentLogin;
