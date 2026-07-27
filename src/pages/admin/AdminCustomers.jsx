import { useEffect, useMemo, useState } from 'react';
import { FiSearch, FiMail, FiMapPin, FiBriefcase, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import Modal from '../../components/ui/Modal';
import { Skeleton } from '../../components/ui/Loader';
import { getProjects } from '../../services/api';
import { formatDate, statusStyle, cx } from '../../utils/helpers';

export default function AdminCustomers() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getProjects().then(({ data }) => {
      setProjects(data || []);
      setLoading(false);
    });
  }, []);

  // Aggregate projects into unique customers keyed by email.
  const customers = useMemo(() => {
    const map = new Map();
    projects.forEach((p) => {
      const key = (p.email || 'unknown').toLowerCase();
      if (!map.has(key)) {
        map.set(key, {
          name: p.full_name,
          email: p.email,
          company: p.company,
          country: p.country,
          projects: [],
          paid: 0,
        });
      }
      const c = map.get(key);
      c.projects.push(p);
      if (p.invoice_status === 'Paid') c.paid += 1;
    });
    return Array.from(map.values()).map((c) => ({
      ...c,
      projectCount: c.projects.length,
      paymentStatus:
        c.paid === c.projects.length ? 'Paid' : c.paid > 0 ? 'Partial' : 'Pending',
    }));
  }, [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = customers.filter(
      (c) =>
        !q ||
        [c.name, c.email, c.company, c.country]
          .filter(Boolean)
          .some((v) => v.toLowerCase().includes(q))
    );
    const sorted = [...list].sort((a, b) => {
      let av;
      let bv;
      if (sortKey === 'name') { av = a.name || ''; bv = b.name || ''; }
      else if (sortKey === 'projects') { av = a.projectCount; bv = b.projectCount; }
      else { av = a.country || ''; bv = b.country || ''; }
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [customers, query, sortKey, sortDir]);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const SortIcon = ({ col }) =>
    sortKey === col ? (
      sortDir === 'asc' ? <FiChevronUp className="inline h-3.5 w-3.5" /> : <FiChevronDown className="inline h-3.5 w-3.5" />
    ) : null;

  const payStyle = {
    Paid: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
    Partial: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
    Pending: 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Customers</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {customers.length} unique customers across all projects.
        </p>
      </div>

      <div className="card-surface p-4">
        <div className="relative">
          <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search customers…"
            className="input-field pl-10"
          />
        </div>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400 dark:bg-white/5">
              <tr>
                <th className="cursor-pointer px-5 py-3" onClick={() => toggleSort('name')}>
                  Customer <SortIcon col="name" />
                </th>
                <th className="px-5 py-3">Contact</th>
                <th className="cursor-pointer px-5 py-3" onClick={() => toggleSort('country')}>
                  Country <SortIcon col="country" />
                </th>
                <th className="cursor-pointer px-5 py-3" onClick={() => toggleSort('projects')}>
                  Projects <SortIcon col="projects" />
                </th>
                <th className="px-5 py-3">Payment</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}><td colSpan={6} className="px-5 py-3"><Skeleton className="h-10 w-full" /></td></tr>
                ))
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-16 text-center text-slate-400">No customers found.</td></tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.email} className="transition hover:bg-slate-50/60 dark:hover:bg-white/5">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-xs font-bold text-white">
                          {(c.name || 'U')[0]}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 dark:text-slate-100">{c.name}</p>
                          <p className="text-xs text-slate-400">{c.company || '—'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{c.email}</td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{c.country || '—'}</td>
                    <td className="px-5 py-3 font-semibold text-slate-800 dark:text-white">{c.projectCount}</td>
                    <td className="px-5 py-3">
                      <span className={cx('badge', payStyle[c.paymentStatus])}>{c.paymentStatus}</span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button onClick={() => setSelected(c)} className="text-sm font-medium text-brand-600 hover:underline dark:text-brand-300">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title="Customer Details">
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-xl font-bold text-white">
                {(selected.name || 'U')[0]}
              </div>
              <div>
                <h4 className="font-display text-xl font-bold text-slate-900 dark:text-white">{selected.name}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">{selected.company || 'Individual'}</p>
              </div>
            </div>
            <div className="grid gap-3 text-sm">
              <p className="flex items-center gap-2 text-slate-600 dark:text-slate-300"><FiMail className="h-4 w-4 text-brand-500" /> {selected.email}</p>
              <p className="flex items-center gap-2 text-slate-600 dark:text-slate-300"><FiMapPin className="h-4 w-4 text-brand-500" /> {selected.country || '—'}</p>
              <p className="flex items-center gap-2 text-slate-600 dark:text-slate-300"><FiBriefcase className="h-4 w-4 text-brand-500" /> {selected.projectCount} project(s) ordered</p>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">Projects ordered</p>
              <ul className="space-y-2">
                {selected.projects.map((p) => (
                  <li key={p.id} className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-2.5 dark:border-white/10">
                    <div>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{p.project_title}</p>
                      <p className="text-xs text-slate-400">{formatDate(p.created_at)}</p>
                    </div>
                    <span className={cx('badge', statusStyle(p.status))}>{p.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
