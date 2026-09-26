import React, { useState } from 'react';
import { X, Lock, Mail, User, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { registerUser, loginUser } from '../utils/userStorage';
import { UserProfile, SavedUserPathway } from '../types/career';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  pendingPathway?: SavedUserPathway | null;
  onAuthSuccess: (user: UserProfile) => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  pendingPathway,
  onAuthSuccess,
  initialMode = 'signup',
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (mode === 'signup') {
      const res = registerUser(name, email, password, pendingPathway);
      if (!res.success || !res.user) {
        setErrorMessage(res.message || 'Registration failed.');
        return;
      }
      onAuthSuccess(res.user);
      onClose();
    } else {
      const res = loginUser(email, password);
      if (!res.success || !res.user) {
        setErrorMessage(res.message || 'Login failed.');
        return;
      }
      onAuthSuccess(res.user);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md rounded-2xl border border-neutral-800 bg-[#12151b] p-6 sm:p-8 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-bold text-white tracking-tight">Edu Career<span className="text-emerald-400">.</span></span>
            <span className="text-xs font-mono px-2 py-0.5 rounded border border-neutral-800 bg-neutral-900 text-neutral-400">
              Student Profile
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            {mode === 'signup'
              ? 'Save your chosen career roadmap locally so you can access and adapt it anytime.'
              : 'Log in to view and manage your saved career roadmap.'}
          </p>
        </div>

        {/* Pending Pathway Preview Banner */}
        {pendingPathway && (
          <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <CheckCircle className="h-4 w-4" />
              <span>Pathway Ready to Lock</span>
            </div>
            <p className="text-xs text-neutral-200 font-medium line-clamp-2">
              {pendingPathway.careerTitle}
            </p>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              {pendingPathway.streamTitle} → {pendingPathway.degreeTitle}
            </p>
          </div>
        )}

        {/* Toggle Mode Tabs */}
        <div className="flex border-b border-neutral-800 mb-6">
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMessage('');
            }}
            className={`flex-1 pb-2.5 text-xs font-semibold text-center border-b-2 transition-colors ${
              mode === 'signup'
                ? 'border-emerald-400 text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMessage('');
            }}
            className={`flex-1 pb-2.5 text-xs font-semibold text-center border-b-2 transition-colors ${
              mode === 'login'
                ? 'border-emerald-400 text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-950/30 p-2.5 text-xs text-red-300">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dhyey Patel"
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-900/90 pl-9 pr-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-neutral-600 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com"
                className="w-full rounded-lg border border-neutral-800 bg-neutral-900/90 pl-9 pr-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-neutral-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-neutral-800 bg-neutral-900/90 pl-9 pr-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-neutral-600 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-bold text-neutral-900 hover:bg-neutral-200 transition active:scale-[0.99]"
          >
            <span>{mode === 'signup' ? 'Create Account & Save' : 'Sign In'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <p className="mt-5 text-center text-[11px] text-neutral-500">
          All data is securely stored locally in your browser. No server signups required.
        </p>
      </div>
    </div>
  );
};
