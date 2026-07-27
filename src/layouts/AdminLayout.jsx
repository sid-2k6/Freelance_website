import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FiMenu, FiSearch, FiBell } from 'react-icons/fi';
import AdminSidebar from '../components/layout/AdminSidebar';
import ThemeToggle from '../components/ui/ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

/** Layout for the protected admin console. */
export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { user, signOut } = useAuth();
  const { success } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut();
    success('You have been logged out.');
    navigate('/admin/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/admin/projects?q=${encodeURIComponent(query.trim())}`);
  };

  const pageTitle = () => {
    const seg = location.pathname.split('/')[2];
    if (!seg) return 'Dashboard';
    return seg.charAt(0).toUpperCase() + seg.slice(1);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#060a14]">
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-[#0a0f1e]/80">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 dark:border-white/10 dark:text-slate-300 lg:hidden"
              aria-label="Open sidebar"
            >
              <FiMenu className="h-5 w-5" />
            </button>

            <div className="hidden md:block">
              <h1 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                {pageTitle()}
              </h1>
            </div>

            <form onSubmit={handleSearch} className="relative ml-auto hidden max-w-xs flex-1 sm:block">
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Global search…"
                className="input-field py-2 pl-9 text-sm"
              />
            </form>

            <div className="ml-auto flex items-center gap-2 sm:ml-0">
              <button
                onClick={() => navigate('/admin/notifications')}
                className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:text-brand-500 dark:border-white/10 dark:text-slate-300"
                aria-label="Notifications"
              >
                <FiBell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
              </button>
              <ThemeToggle />
              <div className="ml-1 hidden items-center gap-2.5 rounded-xl border border-slate-200 bg-white/70 px-3 py-1.5 dark:border-white/10 dark:bg-white/5 sm:flex">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-xs font-bold text-white">
                  {(user?.email || 'A')[0].toUpperCase()}
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-semibold text-slate-800 dark:text-white">Admin</p>
                  <p className="max-w-[140px] truncate text-[11px] text-slate-400">
                    {user?.email || 'demo@technova.solutions'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
