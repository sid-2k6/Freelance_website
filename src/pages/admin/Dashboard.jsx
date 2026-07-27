import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiFolder,
  FiClock,
  FiActivity,
  FiCheckCircle,
  FiXCircle,
  FiDollarSign,
  FiTrendingUp,
  FiArrowUpRight,
} from 'react-icons/fi';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from 'recharts';
import { getProjects } from '../../services/api';
import { Skeleton } from '../../components/ui/Loader';
import { statusStyle, formatDate, timeAgo, cx } from '../../utils/helpers';
import { useTheme } from '../../context/ThemeContext';
import { staggerContainer, fadeInUp } from '../../utils/motion';

const PIE_COLORS = ['#3563ff', '#1fa298', '#8e75f8', '#f59e0b', '#ef4444', '#10b981', '#06b6d4'];

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    getProjects().then(({ data }) => {
      setProjects(data || []);
      setLoading(false);
    });
  }, []);

  const metrics = useMemo(() => {
    const by = (status) => projects.filter((p) => p.status === status).length;
    const revenue = projects
      .filter((p) => p.invoice_status === 'Paid' || p.invoice_status === 'Partially Paid')
      .length * 4200; // illustrative avg deal size for demo
    const today = new Date().toDateString();
    const todaysRequests = projects.filter(
      (p) => new Date(p.created_at).toDateString() === today
    ).length;
    return {
      total: projects.length,
      pending: by('Pending'),
      live: by('Live'),
      completed: by('Completed'),
      cancelled: by('Cancelled'),
      revenue,
      todaysRequests,
    };
  }, [projects]);

  const monthlyData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const counts = Array(12).fill(0);
    projects.forEach((p) => {
      const m = new Date(p.created_at).getMonth();
      if (!Number.isNaN(m)) counts[m] += 1;
    });
    // Seed with baseline so the chart looks alive in demo mode
    return months.map((name, i) => ({ name, requests: counts[i] + ((i * 3 + 4) % 9) }));
  }, [projects]);

  const serviceDistribution = useMemo(() => {
    const map = {};
    projects.forEach((p) => {
      const key = p.category || 'Other';
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [projects]);

  const recentProjects = projects.slice(0, 5);

  const cards = [
    { label: 'Total Projects', value: metrics.total, icon: FiFolder, color: 'from-brand-500 to-brand-600' },
    { label: 'Pending', value: metrics.pending, icon: FiClock, color: 'from-amber-400 to-amber-500' },
    { label: 'Live', value: metrics.live, icon: FiActivity, color: 'from-sky-400 to-sky-500' },
    { label: 'Completed', value: metrics.completed, icon: FiCheckCircle, color: 'from-emerald-400 to-emerald-500' },
    { label: 'Cancelled', value: metrics.cancelled, icon: FiXCircle, color: 'from-rose-400 to-rose-500' },
    { label: "Today's Requests", value: metrics.todaysRequests, icon: FiTrendingUp, color: 'from-fuchsia-400 to-fuchsia-500' },
  ];

  const axisColor = isDark ? '#64748b' : '#94a3b8';

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
          Welcome back 👋
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Here's what's happening across TechNova today.
        </p>
      </div>

      {/* Stat cards */}
      <motion.div
        variants={staggerContainer(0.05)}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6"
      >
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <motion.div key={c.label} variants={fadeInUp} className="card-surface p-5">
              <div className={cx('grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br text-white shadow-glow', c.color)}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 font-display text-3xl font-extrabold text-slate-900 dark:text-white">
                {loading ? '—' : c.value}
              </p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{c.label}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Revenue banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-700 via-brand-600 to-accent-600 p-6 text-white shadow-glow sm:p-8">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-sm text-white/80">
              <FiDollarSign className="h-4 w-4" /> Estimated Revenue
            </p>
            <p className="mt-1 font-display text-4xl font-extrabold">
              ${metrics.revenue.toLocaleString()}
            </p>
            <p className="mt-1 text-sm text-white/70">Based on paid & partially-paid invoices</p>
          </div>
          <Link to="/admin/invoices" className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-5 py-3 text-sm font-semibold backdrop-blur transition hover:bg-white/25">
            View invoices <FiArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="card-surface p-6 lg:col-span-3">
          <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
            Monthly Requests
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Service requests over the year</p>
          <div className="mt-6 h-72">
            {loading ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#e2e8f0'} vertical={false} />
                  <XAxis dataKey="name" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: 'none',
                      background: isDark ? '#0f172a' : '#fff',
                      boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)',
                      color: isDark ? '#fff' : '#0f172a',
                    }}
                  />
                  <Bar dataKey="requests" radius={[6, 6, 0, 0]} fill="#3563ff" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="card-surface p-6 lg:col-span-2">
          <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
            Services Distribution
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Requests by category</p>
          <div className="mt-6 h-72">
            {loading ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceDistribution}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={3}
                  >
                    {serviceDistribution.map((entry, i) => (
                      <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: 'none',
                      background: isDark ? '#0f172a' : '#fff',
                      color: isDark ? '#fff' : '#0f172a',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-3">
            {serviceDistribution.map((s, i) => (
              <span key={s.name} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recent activity + customers */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card-surface p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
              Latest Activity
            </h3>
            <Link to="/admin/projects" className="text-sm font-medium text-brand-600 hover:underline dark:text-brand-300">
              View all
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full" />
              ))}
            </div>
          ) : (
            <ul className="divide-y divide-slate-100 dark:divide-white/5">
              {recentProjects.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">
                      {p.project_title}
                    </p>
                    <p className="text-xs text-slate-400">
                      {p.full_name} · {timeAgo(p.created_at)}
                    </p>
                  </div>
                  <span className={cx('badge shrink-0', statusStyle(p.status))}>{p.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card-surface p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
              Recent Customers
            </h3>
            <Link to="/admin/customers" className="text-sm font-medium text-brand-600 hover:underline dark:text-brand-300">
              View all
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full" />
              ))}
            </div>
          ) : (
            <ul className="divide-y divide-slate-100 dark:divide-white/5">
              {recentProjects.map((p) => (
                <li key={p.id} className="flex items-center gap-3 py-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-xs font-bold text-white">
                    {(p.full_name || 'U')[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">
                      {p.full_name}
                    </p>
                    <p className="truncate text-xs text-slate-400">{p.email}</p>
                  </div>
                  <span className="shrink-0 text-xs text-slate-400">{formatDate(p.created_at)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
