import { NavLink } from 'react-router-dom';
import {
  FiGrid,
  FiFolder,
  FiUsers,
  FiMessageSquare,
  FiFileText,
  FiLayers,
  FiBarChart2,
  FiFileText as FiReport,
  FiBell,
  FiSettings,
  FiLogOut,
  FiX,
} from 'react-icons/fi';
import Logo from '../ui/Logo';
import { cx } from '../../utils/helpers';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: FiGrid, end: true },
  { to: '/admin/projects', label: 'Projects', icon: FiFolder },
  { to: '/admin/customers', label: 'Customers', icon: FiUsers },
  { to: '/admin/messages', label: 'Messages', icon: FiMessageSquare },
  { to: '/admin/invoices', label: 'Invoices', icon: FiFileText },
  { to: '/admin/services', label: 'Services', icon: FiLayers },
  { to: '/admin/analytics', label: 'Analytics', icon: FiBarChart2 },
  { to: '/admin/reports', label: 'Reports', icon: FiReport },
  { to: '/admin/notifications', label: 'Notifications', icon: FiBell },
  { to: '/admin/settings', label: 'Settings', icon: FiSettings },
];

export default function AdminSidebar({ open, onClose, onLogout }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cx(
          'fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200/70 bg-white/90 backdrop-blur-xl transition-transform duration-300 dark:border-white/10 dark:bg-[#0a0f1e]/95 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <NavLink to="/admin" className="flex items-center gap-2.5">
            <Logo className="h-9 w-9" />
            <div className="leading-tight">
              <p className="font-display text-base font-bold text-slate-900 dark:text-white">
                Tech<span className="text-gradient">Nova</span>
              </p>
              <p className="text-[11px] font-medium text-slate-400">Admin Console</p>
            </div>
          </NavLink>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 lg:hidden"
            aria-label="Close sidebar"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cx(
                    'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition',
                    isActive
                      ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-glow'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5'
                  )
                }
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-slate-200/70 p-3 dark:border-white/10">
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
          >
            <FiLogOut className="h-5 w-5" /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
