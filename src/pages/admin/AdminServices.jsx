import { useMemo, useState } from 'react';
import { FiSearch, FiClock, FiDollarSign } from 'react-icons/fi';
import { services, serviceCategories } from '../../data/services';
import { formatCurrency, cx } from '../../utils/helpers';

/**
 * Admin services catalog view. Services are defined in code (the source of
 * truth for the marketing site); here admins get a searchable, filterable
 * overview of everything on offer with pricing and delivery at a glance.
 */
export default function AdminServices() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((s) => {
      const matchCat = category === 'All' || s.category === category;
      const matchQuery = !q || s.title.toLowerCase().includes(q) || s.short.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [query, category]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Services</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {services.length} services offered across {serviceCategories.length - 1} categories.
        </p>
      </div>

      <div className="card-surface flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search services…" className="input-field pl-10" />
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-field py-2.5 sm:w-56">
          {serviceCategories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.slug} className="card-surface p-5">
              <div className="flex items-start justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow">
                  {Icon && <Icon className="h-5 w-5" />}
                </div>
                <span className="badge border-slate-200 bg-slate-50 text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                  {s.category}
                </span>
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-slate-900 dark:text-white">{s.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{s.short}</p>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs dark:border-white/10">
                <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400">
                  <FiClock className="h-3.5 w-3.5" /> {s.delivery}
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-slate-800 dark:text-white">
                  <FiDollarSign className="h-3.5 w-3.5" /> {formatCurrency(s.startingPrice)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <div className="card-surface p-16 text-center text-slate-400">No services match your search.</div>
      )}
    </div>
  );
}
