import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiShield } from 'react-icons/fi';
import AnimatedBackground from '../../components/ui/AnimatedBackground';
import Logo from '../../components/ui/Logo';
import { Spinner } from '../../components/ui/Loader';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { isValidEmail } from '../../utils/helpers';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, isConfigured } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const submit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email) || !password) {
      error('Please enter a valid email and password.');
      return;
    }
    setLoading(true);
    const { error: err } = await signIn(email.trim().toLowerCase(), password);
    setLoading(false);
    if (err) {
      error(err.message || 'Login failed. Check your credentials.');
      return;
    }
    success('Welcome back!');
    navigate(from, { replace: true });
  };

  const enterDemo = () => {
    success('Entering demo console…');
    navigate('/admin', { replace: true });
  };

  return (
    <div className="relative grid min-h-screen place-items-center px-4">
      <AnimatedBackground />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <Logo className="h-11 w-11" />
            <span className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              Tech<span className="text-gradient">Nova</span>
            </span>
          </Link>
        </div>

        <div className="glass-strong rounded-3xl p-8 shadow-soft">
          <div className="mb-6 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow">
              <FiShield className="h-6 w-6" />
            </div>
            <h1 className="mt-4 font-display text-2xl font-bold text-slate-900 dark:text-white">
              Admin Portal
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Sign in to manage projects, customers and more.
            </p>
          </div>

          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="label-field" htmlFor="admin-email">Admin email</label>
              <div className="relative">
                <FiMail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="admin@technova.solutions"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="label-field" htmlFor="admin-pass">Password</label>
              <div className="relative">
                <FiLock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="admin-pass"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field px-10"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? <Spinner /> : <FiArrowRight className="h-4 w-4" />}
              Sign in
            </button>
          </form>

          {!isConfigured && (
            <div className="mt-6 border-t border-slate-200/70 pt-6 dark:border-white/10">
              <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                Supabase isn't configured yet. Explore the dashboard with demo data:
              </p>
              <button onClick={enterDemo} className="btn-ghost mt-3 w-full">
                Enter Demo Console
              </button>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          <Link to="/" className="hover:text-brand-500">← Back to website</Link>
        </p>
      </motion.div>
    </div>
  );
}
