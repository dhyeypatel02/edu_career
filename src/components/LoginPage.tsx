import React, { useState } from 'react';
import {
  ArrowLeft,
  Lock,
  Mail,
  User,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { loginUser, registerUser } from '../utils/userStorage';
import { UserProfile } from '../types/career';

interface LoginPageProps {
  onSuccess: (user: UserProfile) => void;
  onBackToHome: () => void;
  initialMode?: 'login' | 'signup';
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onSuccess,
  onBackToHome,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        const res = await registerUser(name, email, password);
        setLoading(false);
        if (res.success && res.user) {
          onSuccess(res.user);
        } else {
          setErrorMessage(res.message || 'Registration failed. Please check your details.');
        }
      } else {
        const res = await loginUser(email, password);
        setLoading(false);
        if (res.success && res.user) {
          onSuccess(res.user);
        } else {
          setErrorMessage(res.message || 'Invalid email or password.');
        }
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMessage(err.message || 'An error occurred during authentication.');
    }
  };

  const handleQuickDemoLogin = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const demoEmail = 'student.demo@educareer.in';
      const existing = await loginUser(demoEmail, 'demo123');
      if (existing.success && existing.user) {
        setLoading(false);
        onSuccess(existing.user);
      } else {
        const created = await registerUser('Arjun Sharma', demoEmail, 'demo123');
        setLoading(false);
        if (created.success && created.user) {
          onSuccess(created.user);
        } else {
          setErrorMessage(created.message || 'Demo login failed.');
        }
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMessage(err.message || 'Demo login failed.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0d13] text-neutral-100 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 relative selection:bg-emerald-500/30 selection:text-white">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Back to Home Button */}
      <div className="max-w-4xl mx-auto w-full mb-6">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home Overview</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 rounded-3xl border border-neutral-800 bg-[#12151d] shadow-2xl overflow-hidden relative z-10">
        {/* Left Column: Why Login is Compulsory & Benefits (5 Cols) */}
        <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-neutral-800 bg-[#0f1118] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono text-sm font-bold">
                E
              </span>
              <span className="text-base font-bold text-white tracking-tight">
                Edu Career<span className="text-emerald-400">.</span>
              </span>
            </div>

            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3 mb-6">
              <span className="text-[11px] font-mono text-emerald-300 font-semibold uppercase flex items-center gap-1.5">
                <Lock className="h-3 w-3" />
                Mandatory Student Access
              </span>
              <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                Authentication is required to track your personalized path and lock custom roadmaps.
              </p>
            </div>

            <h3 className="text-lg font-bold text-white mb-2">
              Why an Account is Needed:
            </h3>

            <ul className="space-y-3 mt-4 text-xs text-neutral-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>Persistent Pathway:</strong> Lock your verified decision chain from Class 10 to Degree.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>9-Stage Placement Meter:</strong> Track your career readiness score from 0% to 100%.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>Saved Bookmarks:</strong> Access your favorite entrance exams, degrees, and salaries anytime.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>AI Counsellor Advice:</strong> Receive advice personalized to your academic stage.</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-neutral-800 text-[11px] text-neutral-400 font-mono">
            Data is stored securely in your browser's private local environment.
          </div>
        </div>

        {/* Right Column: Form (7 Cols) */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          {/* Mode Tabs */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-neutral-900 border border-neutral-800 mb-6 w-fit">
            <button
              onClick={() => {
                setMode('login');
                setErrorMessage('');
              }}
              className={`rounded-lg px-4 py-1.5 text-xs font-bold transition ${
                mode === 'login'
                  ? 'bg-white text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode('signup');
                setErrorMessage('');
              }}
              className={`rounded-lg px-4 py-1.5 text-xs font-bold transition ${
                mode === 'signup'
                  ? 'bg-white text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              {mode === 'login' ? 'Welcome Back to Edu Career' : 'Create Your Student Profile'}
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              {mode === 'login'
                ? 'Sign in to access the decision navigator and your saved career roadmap.'
                : 'Register your account to begin exploring streams, degrees, and placement roadmaps.'}
            </p>
          </div>

          {/* Quick Demo 1-Click Login Button */}
          <div className="mt-5">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-2.5 text-xs font-bold text-emerald-300 hover:bg-emerald-900/40 hover:border-emerald-400 transition active:scale-95"
            >
              <Zap className="h-4 w-4 text-emerald-400" />
              <span>⚡ 1-Click Instant Demo Login (Skip Typing)</span>
            </button>
            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-800" />
              </div>
              <span className="relative bg-[#12151d] px-2 text-[10px] uppercase font-mono text-neutral-400">
                Or continue with credentials
              </span>
            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-950/30 p-3 text-xs text-red-300 animate-in fade-in">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dhyey Patel"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900/80 pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-neutral-600 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                <input
                  type="email"
                  required
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900/80 pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-neutral-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900/80 pl-9 pr-10 py-2 text-xs text-white placeholder-neutral-500 focus:border-neutral-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-neutral-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-emerald-400 py-2.5 text-xs font-bold text-neutral-950 hover:bg-emerald-300 transition shadow-sm active:scale-95 disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : mode === 'signup' ? 'Create Account & Enter' : 'Sign In & Enter'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>

          {/* Switch Prompt */}
          <div className="mt-5 text-center text-xs text-neutral-400">
            {mode === 'signup' ? (
              <span>
                Already have an account?{' '}
                <button
                  onClick={() => {
                    setMode('login');
                    setErrorMessage('');
                  }}
                  className="text-emerald-400 font-semibold hover:underline"
                >
                  Sign in here
                </button>
              </span>
            ) : (
              <span>
                Don't have an account yet?{' '}
                <button
                  onClick={() => {
                    setMode('signup');
                    setErrorMessage('');
                  }}
                  className="text-emerald-400 font-semibold hover:underline"
                >
                  Create one now
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
