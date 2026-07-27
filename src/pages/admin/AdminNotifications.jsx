import { useEffect, useState } from 'react';
import { FiShoppingBag, FiCheckCircle, FiClock, FiMail, FiBell, FiCheck } from 'react-icons/fi';
import { Skeleton } from '../../components/ui/Loader';
import { getNotifications } from '../../services/api';
import { timeAgo, cx } from '../../utils/helpers';
import { useToast } from '../../context/ToastContext';

const ICONS = {
  order: FiShoppingBag,
  completed: FiCheckCircle,
  deadline: FiClock,
  message: FiMail,
};

const ACCENT = {
  order: 'bg-brand-100 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300',
  completed: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300',
  deadline: 'bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300',
  message: 'bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-500/15 dark:text-fuchsia-300',
};

export default function AdminNotifications() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { success } = useToast();

  useEffect(() => {
    getNotifications().then(({ data }) => {
      setItems(data || []);
      setLoading(false);
    });
  }, []);

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    success('All notifications marked as read.');
  };

  const markRead = (id) => setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const unread = items.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Notifications</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {unread} unread notification{unread !== 1 && 's'}.
          </p>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} className="btn-ghost">
            <FiCheck className="h-4 w-4" /> Mark all read
          </button>
        )}
      </div>

      <div className="space-y-3">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 w-full" />)
        ) : items.length === 0 ? (
          <div className="card-surface flex flex-col items-center p-16 text-center">
            <FiBell className="h-10 w-10 text-slate-300" />
            <p className="mt-3 text-slate-400">You're all caught up.</p>
          </div>
        ) : (
          items.map((n) => {
            const Icon = ICONS[n.type] || FiBell;
            return (
              <button
                key={n.id}
                onClick={() => markRead(n.id)}
                className={cx(
                  'card-surface flex w-full items-start gap-4 p-5 text-left transition',
                  !n.read && 'ring-1 ring-brand-300/60 dark:ring-brand-500/30'
                )}
              >
                <div className={cx('grid h-11 w-11 shrink-0 place-items-center rounded-xl', ACCENT[n.type] || ACCENT.order)}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-800 dark:text-white">{n.title}</p>
                    {!n.read && <span className="h-2 w-2 rounded-full bg-brand-500" />}
                  </div>
                  <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{n.body}</p>
                </div>
                <span className="shrink-0 text-xs text-slate-400">{timeAgo(n.created_at)}</span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
