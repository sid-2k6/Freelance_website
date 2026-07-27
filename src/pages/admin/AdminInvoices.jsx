import { useEffect, useMemo, useState } from 'react';
import { FiDollarSign, FiDownload, FiSearch } from 'react-icons/fi';
import { Skeleton } from '../../components/ui/Loader';
import { getProjects, updateProject } from '../../services/api';
import { formatCurrency, formatDate, toCSV, downloadFile, cx } from '../../utils/helpers';
import { useToast } from '../../context/ToastContext';

const INVOICE_STATUSES = ['Unpaid', 'Partially Paid', 'Paid', 'Refunded'];

// Rough numeric value derived from the budget range for illustrative totals.
const budgetValue = (range) => {
  const map = {
    'Under $250': 200,
    '$250 – $500': 400,
    '$500 – $1,000': 800,
    '$1,000 – $2,500': 1800,
    '$2,500 – $5,000': 3800,
    '$5,000 – $10,000': 7500,
    '$10,000+': 12000,
  };
  return map[range] || 1500;
};

const chip = {
  Paid: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  'Partially Paid': 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  Unpaid: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
  Refunded: 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300',
};

export default function AdminInvoices() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const { success } = useToast();

  useEffect(() => {
    getProjects().then(({ data }) => {
      setProjects(data || []);
      setLoading(false);
    });
  }, []);

  const invoices = useMemo(
    () =>
      projects.map((p, i) => ({
        ...p,
        invoiceNo: `INV-${String(1000 + i)}`,
        amount: budgetValue(p.budget),
      })),
    [projects]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return invoices.filter(
      (inv) => !q || [inv.invoiceNo, inv.full_name, inv.project_title].filter(Boolean).some((v) => v.toLowerCase().includes(q))
    );
  }, [invoices, query]);

  const totals = useMemo(() => {
    const paid = invoices.filter((i) => i.invoice_status === 'Paid').reduce((s, i) => s + i.amount, 0);
    const outstanding = invoices
      .filter((i) => i.invoice_status === 'Unpaid' || i.invoice_status === 'Partially Paid')
      .reduce((s, i) => s + i.amount, 0);
    return { paid, outstanding, total: paid + outstanding };
  }, [invoices]);

  const changeStatus = async (inv, status) => {
    setProjects((prev) => prev.map((p) => (p.id === inv.id ? { ...p, invoice_status: status } : p)));
    await updateProject(inv.id, { invoice_status: status });
    success(`Invoice ${inv.invoiceNo} → ${status}`);
  };

  const exportCSV = () => {
    const rows = filtered.map((i) => ({
      invoice: i.invoiceNo,
      client: i.full_name,
      project: i.project_title,
      amount: i.amount,
      status: i.invoice_status,
      date: formatDate(i.created_at),
    }));
    downloadFile('technova-invoices.csv', toCSV(rows), 'text/csv');
    success('Invoices exported to CSV.');
  };

  const cards = [
    { label: 'Total Billed', value: totals.total, color: 'from-brand-500 to-brand-600' },
    { label: 'Collected', value: totals.paid, color: 'from-emerald-400 to-emerald-500' },
    { label: 'Outstanding', value: totals.outstanding, color: 'from-amber-400 to-amber-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Invoices</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Track billing and payment status.</p>
        </div>
        <button onClick={exportCSV} className="btn-ghost">
          <FiDownload className="h-4 w-4" /> Export CSV
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="card-surface p-5">
            <div className={cx('grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br text-white shadow-glow', c.color)}>
              <FiDollarSign className="h-5 w-5" />
            </div>
            <p className="mt-4 font-display text-2xl font-extrabold text-slate-900 dark:text-white">
              {loading ? '—' : formatCurrency(c.value)}
            </p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="card-surface p-4">
        <div className="relative">
          <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search invoices…" className="input-field pl-10" />
        </div>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400 dark:bg-white/5">
              <tr>
                <th className="px-5 py-3">Invoice</th>
                <th className="px-5 py-3">Client</th>
                <th className="px-5 py-3">Project</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}><td colSpan={6} className="px-5 py-3"><Skeleton className="h-10 w-full" /></td></tr>
                ))
              ) : (
                filtered.map((inv) => (
                  <tr key={inv.id} className="transition hover:bg-slate-50/60 dark:hover:bg-white/5">
                    <td className="px-5 py-3 font-mono text-brand-500">{inv.invoiceNo}</td>
                    <td className="px-5 py-3 text-slate-700 dark:text-slate-200">{inv.full_name}</td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{inv.project_title}</td>
                    <td className="px-5 py-3 font-semibold text-slate-900 dark:text-white">{formatCurrency(inv.amount)}</td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{formatDate(inv.created_at)}</td>
                    <td className="px-5 py-3">
                      <select
                        value={inv.invoice_status}
                        onChange={(e) => changeStatus(inv, e.target.value)}
                        className={cx('rounded-lg border-0 px-2 py-1 text-xs font-semibold outline-none', chip[inv.invoice_status])}
                      >
                        {INVOICE_STATUSES.map((s) => (
                          <option key={s} value={s} className="bg-white text-slate-800 dark:bg-slate-800 dark:text-white">{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
