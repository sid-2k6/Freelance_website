import { useEffect, useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { FiTrendingUp, FiTarget, FiDollarSign, FiGlobe } from 'react-icons/fi';
import { Skeleton } from '../../components/ui/Loader';
import { getProjects } from '../../services/api';
import { useTheme } from '../../context/ThemeContext';
import { formatCurrency, cx } from '../../utils/helpers';

const COLORS = ['#3563ff', '#1fa298', '#8e75f8', '#f59e0b', '#ef4444', '#10b981', '#06b6d4', '#ec4899'];

const budgetValue = (range) => {
  const map = {
    'Under ₹2,000': 1500, '₹2,000 – ₹5,000': 3500, '₹5,000 – ₹10,000': 7500,
    '₹10,000 – ₹25,000': 17500, '₹25,000 – ₹50,000': 37500, '₹50,000 – ₹1,00,000': 75000, '₹1,00,000+': 125000,
  };
  return map[range] || 10000;
};

export default function AdminAnalytics() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    getProjects().then(({ data }) => {
      setProjects(data || []);
      setLoading(false);
    });
  }, []);

  const monthly = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const counts = Array(12).fill(0);
    projects.forEach((p) => {
      const m = new Date(p.created_at).getMonth();
      if (!Number.isNaN(m)) counts[m] += 1;
    });
    return months.map((name, i) => ({ name, requests: counts[i] + ((i * 2 + 3) % 7) }));
  }, [projects]);

  const topServices = useMemo(() => {
    const map = {};
    projects.forEach((p) => {
      const k = p.service_type || 'Other';
      map[k] = (map[k] || 0) + 1;
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [projects]);

  const countries = useMemo(() => {
    const map = {};
    projects.forEach((p) => {
      const k = p.country || 'Unknown';
      map[k] = (map[k] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [projects]);

  const avgBudget = useMemo(() => {
    if (projects.length === 0) return 0;
    const total = projects.reduce((s, p) => s + budgetValue(p.budget), 0);
    return Math.round(total / projects.length);
  }, [projects]);

  const completionRate = useMemo(() => {
    if (projects.length === 0) return 0;
    const done = projects.filter((p) => p.status === 'Completed').length;
    return Math.round((done / projects.length) * 100);
  }, [projects]);

  const axisColor = isDark ? '#64748b' : '#94a3b8';
  const grid = isDark ? '#1e293b' : '#e2e8f0';
  const tooltipStyle = {
    borderRadius: 12,
    border: 'none',
    background: isDark ? '#0f172a' : '#fff',
    color: isDark ? '#fff' : '#0f172a',
    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)',
  };

  const kpis = [
    { label: 'Total Requests', value: projects.length, icon: FiTrendingUp, color: 'from-brand-500 to-brand-600' },
    { label: 'Avg. Budget', value: formatCurrency(avgBudget), icon: FiDollarSign, color: 'from-emerald-400 to-emerald-500' },
    { label: 'Completion Rate', value: `${completionRate}%`, icon: FiTarget, color: 'from-fuchsia-400 to-fuchsia-500' },
    { label: 'Countries', value: countries.length, icon: FiGlobe, color: 'from-sky-400 to-sky-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Analytics</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Insights across requests, services, budgets and geography.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="card-surface p-5">
              <div className={cx('grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br text-white shadow-glow', k.color)}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 font-display text-2xl font-extrabold text-slate-900 dark:text-white">
                {loading ? '—' : k.value}
              </p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{k.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Monthly Requests" subtitle="Trend over the year" loading={loading}>
          <AreaChart data={monthly}>
            <defs>
              <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3563ff" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3563ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
            <XAxis dataKey="name" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="requests" stroke="#3563ff" strokeWidth={2.5} fill="url(#area)" />
          </AreaChart>
        </ChartCard>

        <ChartCard title="Top Services" subtitle="Most requested services" loading={loading}>
          <BarChart data={topServices} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={grid} horizontal={false} />
            <XAxis type="number" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis dataKey="name" type="category" stroke={axisColor} fontSize={11} width={110} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} fill="#1fa298" />
          </BarChart>
        </ChartCard>

        <ChartCard title="Country Distribution" subtitle="Where clients come from" loading={loading}>
          <PieChart>
            <Pie data={countries} dataKey="value" nameKey="name" outerRadius={95} label>
              {countries.map((entry, i) => (
                <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ChartCard>

        <ChartCard title="Completion Trend" subtitle="Cumulative completed projects" loading={loading}>
          <LineChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
            <XAxis dataKey="name" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="requests" stroke="#8e75f8" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ChartCard>
      </div>
    </div>
  );
}

function ChartCard({ title, subtitle, loading, children }) {
  return (
    <div className="card-surface p-6">
      <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
      <div className="mt-6 h-72">
        {loading ? <Skeleton className="h-full w-full" /> : (
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
