import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft } from 'react-icons/fi';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import Logo from '../components/ui/Logo';

export default function NotFound() {
  return (
    <section className="relative grid min-h-screen place-items-center px-4">
      <AnimatedBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Link to="/" className="inline-flex items-center gap-2">
          <Logo className="h-10 w-10" />
          <span className="font-display text-xl font-bold text-slate-900 dark:text-white">
            Tech<span className="text-gradient">Nova</span>
          </span>
        </Link>
        <h1 className="mt-8 font-display text-8xl font-extrabold text-gradient">404</h1>
        <p className="mt-4 font-display text-2xl font-bold text-slate-900 dark:text-white">
          Page not found
        </p>
        <p className="mx-auto mt-2 max-w-md text-slate-600 dark:text-slate-400">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/" className="btn-primary">
            <FiHome className="h-4 w-4" /> Back home
          </Link>
          <button onClick={() => window.history.back()} className="btn-ghost">
            <FiArrowLeft className="h-4 w-4" /> Go back
          </button>
        </div>
      </motion.div>
    </section>
  );
}
