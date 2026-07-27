import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMenu, FiX, FiHeart, FiArrowRight } from 'react-icons/fi';
import ThemeToggle from '../ui/ThemeToggle';
import Logo from '../ui/Logo';
import { useWishlist } from '../../context/WishlistContext';
import { cx } from '../../utils/helpers';

const primaryLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/technologies', label: 'Technologies' },
  { to: '/about', label: 'About' },
];

const moreLinks = [
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/blog', label: 'Blog' },
  { to: '/careers', label: 'Careers' },
  { to: '/faq', label: 'FAQ' },
  { to: '/track', label: 'Track Project' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { count } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [location.pathname]);

  const linkClass = ({ isActive }) =>
    cx(
      'relative rounded-lg px-3 py-2 text-sm font-medium transition-colors',
      isActive
        ? 'text-brand-600 dark:text-brand-300'
        : 'text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-white'
    );

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'py-2' : 'py-4'
      )}
    >
      <div className="container-wide">
        <nav
          className={cx(
            'flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300',
            scrolled
              ? 'glass-strong shadow-soft'
              : 'border border-transparent bg-transparent'
          )}
        >
          <Link to="/" className="flex items-center gap-2.5" aria-label="TechNova home">
            <Logo className="h-9 w-9" />
            <span className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Tech<span className="text-gradient">Nova</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {primaryLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === '/'}>
                {l.label}
              </NavLink>
            ))}
            <div
              className="relative"
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              <button className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-brand-600 dark:text-slate-300 dark:hover:text-white">
                More
              </button>
              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="glass-strong absolute right-0 top-full w-52 rounded-2xl p-2 shadow-soft"
                  >
                    {moreLinks.map((l) => (
                      <NavLink
                        key={l.to}
                        to={l.to}
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-brand-50 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
                      >
                        {l.label}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/services#wishlist"
              className="relative hidden h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white/70 text-slate-600 transition hover:text-rose-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 sm:grid"
              aria-label="Wishlist"
            >
              <FiHeart className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </Link>
            <ThemeToggle />
            <Link to="/request" className="btn-primary hidden py-2.5 sm:inline-flex">
              Get Started <FiArrowRight className="h-4 w-4" />
            </Link>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white/70 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="glass-strong mt-2 overflow-hidden rounded-2xl shadow-soft lg:hidden"
            >
              <div className="grid grid-cols-2 gap-1 p-3">
                {[...primaryLinks, ...moreLinks].map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.to === '/'}
                    className={({ isActive }) =>
                      cx(
                        'rounded-lg px-3 py-2.5 text-sm font-medium transition',
                        isActive
                          ? 'bg-brand-50 text-brand-600 dark:bg-white/10 dark:text-white'
                          : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5'
                      )
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
              </div>
              <div className="p-3 pt-0">
                <Link to="/request" className="btn-primary w-full">
                  Get Started <FiArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
