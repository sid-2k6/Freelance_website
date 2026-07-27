import { useEffect, useMemo, useState } from 'react';
import { FiMail, FiSearch, FiCheck, FiArchive, FiCornerUpLeft } from 'react-icons/fi';
import Modal from '../../components/ui/Modal';
import { Skeleton } from '../../components/ui/Loader';
import { getMessages, updateMessage } from '../../services/api';
import { formatDate, timeAgo, cx } from '../../utils/helpers';
import { useToast } from '../../context/ToastContext';

const TABS = ['All', 'New', 'Contacted', 'Archived'];

const statusChip = {
  New: 'bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300',
  Contacted: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  Archived: 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300',
};

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('All');
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(null);
  const { success } = useToast();

  useEffect(() => {
    getMessages().then(({ data }) => {
      setMessages(data || []);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return messages.filter((m) => {
      const matchTab = tab === 'All' || m.status === tab;
      const matchQuery =
        !q || [m.name, m.email, m.subject, m.message].filter(Boolean).some((v) => v.toLowerCase().includes(q));
      return matchTab && matchQuery;
    });
  }, [messages, tab, query]);

  const setStatus = async (m, status) => {
    setMessages((prev) => prev.map((x) => (x.id === m.id ? { ...x, status } : x)));
    setActive((cur) => (cur && cur.id === m.id ? { ...cur, status } : cur));
    await updateMessage(m.id, { status });
    success(`Marked as ${status.toLowerCase()}.`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Messages</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Inbound inquiries and contact form submissions.
        </p>
      </div>

      <div className="card-surface flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => {
            const count = t === 'All' ? messages.length : messages.filter((m) => m.status === t).length;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cx(
                  'rounded-full border px-3.5 py-1.5 text-sm font-medium transition',
                  tab === t
                    ? 'border-brand-500 bg-brand-500 text-white'
                    : 'border-slate-200 text-slate-600 hover:border-brand-300 dark:border-white/10 dark:text-slate-300'
                )}
              >
                {t} <span className="opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
        <div className="relative sm:w-64">
          <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search messages…" className="input-field pl-10" />
        </div>
      </div>

      <div className="space-y-3">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 w-full" />)
        ) : filtered.length === 0 ? (
          <div className="card-surface p-16 text-center text-slate-400">No messages found.</div>
        ) : (
          filtered.map((m) => (
            <div key={m.id} className="card-surface flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <button onClick={() => setActive(m)} className="min-w-0 flex-1 text-left">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-slate-800 dark:text-white">{m.subject}</p>
                  <span className={cx('badge', statusChip[m.status])}>{m.status}</span>
                </div>
                <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
                  {m.name} · {m.email}
                </p>
                <p className="mt-1 line-clamp-1 text-sm text-slate-600 dark:text-slate-300">{m.message}</p>
              </button>
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-xs text-slate-400">{timeAgo(m.created_at)}</span>
                {m.status !== 'Contacted' && (
                  <button onClick={() => setStatus(m, 'Contacted')} className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-emerald-50 hover:text-emerald-500 dark:hover:bg-emerald-500/10" title="Mark contacted">
                    <FiCheck className="h-4 w-4" />
                  </button>
                )}
                {m.status !== 'Archived' && (
                  <button onClick={() => setStatus(m, 'Archived')} className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/5" title="Archive">
                    <FiArchive className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <Modal open={Boolean(active)} onClose={() => setActive(null)} title="Message">
        {active && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-bold text-white">
                  {(active.name || 'U')[0]}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{active.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{active.email}</p>
                </div>
              </div>
              <span className={cx('badge', statusChip[active.status])}>{active.status}</span>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Subject</p>
              <p className="font-medium text-slate-800 dark:text-white">{active.subject}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Message</p>
              <p className="mt-1 whitespace-pre-line text-sm text-slate-600 dark:text-slate-300">{active.message}</p>
            </div>
            <p className="text-xs text-slate-400">Received {formatDate(active.created_at, { hour: '2-digit', minute: '2-digit' })}</p>
            <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-4 dark:border-white/10">
              <a href={`mailto:${active.email}?subject=Re: ${encodeURIComponent(active.subject)}`} className="btn-primary">
                <FiCornerUpLeft className="h-4 w-4" /> Reply by email
              </a>
              <button onClick={() => setStatus(active, 'Contacted')} className="btn-ghost">
                <FiCheck className="h-4 w-4" /> Mark contacted
              </button>
              <button onClick={() => setStatus(active, 'Archived')} className="btn-ghost">
                <FiArchive className="h-4 w-4" /> Archive
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
