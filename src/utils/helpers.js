/**
 * Utility helpers shared across the application.
 */

/** Merge conditional class names (tiny clsx replacement). */
export function cx(...args) {
  return args
    .flat(Infinity)
    .filter(Boolean)
    .filter((v) => typeof v === 'string')
    .join(' ')
    .trim();
}

/** Generate a human-friendly project id like TNS-8F3K2Q. */
export function generateProjectId(prefix = 'TNS') {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i += 1) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${prefix}-${code}`;
}

/** Format a number as compact currency (USD by default). */
export function formatCurrency(value, currency = 'USD') {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return '—';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(Number(value));
}

/** Format a date string into a readable label. */
export function formatDate(value, opts = {}) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...opts,
  });
}

/** Relative time such as "3 days ago". */
export function timeAgo(value) {
  if (!value) return '';
  const date = new Date(value);
  const diff = Date.now() - date.getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.round(months / 12)}y ago`;
}

/** Simple email validation. */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
}

/** Basic phone validation (7-15 digits, optional +). */
export function isValidPhone(phone) {
  return /^\+?[0-9\s\-()]{7,20}$/.test(String(phone));
}

/**
 * Sanitize free-text input to reduce the risk of stored XSS. This strips
 * angle brackets and trims whitespace. Supabase RLS + parameterized queries
 * are the primary protection; this is defense-in-depth.
 */
export function sanitizeText(value) {
  if (typeof value !== 'string') return value;
  return value.replace(/[<>]/g, '').trim();
}

/** Truncate a string to a maximum length with an ellipsis. */
export function truncate(str, max = 120) {
  if (!str) return '';
  return str.length > max ? `${str.slice(0, max).trim()}…` : str;
}

/** Debounce a function. */
export function debounce(fn, wait = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

/** Convert an array of objects into a CSV string. */
export function toCSV(rows, columns) {
  if (!rows || rows.length === 0) return '';
  const cols = columns || Object.keys(rows[0]);
  const escape = (v) => {
    const s = v === null || v === undefined ? '' : String(v);
    return `"${s.replace(/"/g, '""')}"`;
  };
  const header = cols.map(escape).join(',');
  const body = rows.map((row) => cols.map((c) => escape(row[c])).join(',')).join('\n');
  return `${header}\n${body}`;
}

/** Trigger a browser download for a text blob. */
export function downloadFile(filename, content, mime = 'text/plain') {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/** Map project status to a tailwind color set. */
export function statusStyle(status) {
  const map = {
    Pending: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30',
    Live: 'bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-500/15 dark:text-sky-300 dark:border-sky-500/30',
    'On Hold': 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-500/15 dark:text-orange-300 dark:border-orange-500/30',
    Completed: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30',
    Cancelled: 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/30',
    Archived: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-500/15 dark:text-slate-300 dark:border-slate-500/30',
  };
  return map[status] || map.Pending;
}

/** Priority color mapping. */
export function priorityStyle(priority) {
  const map = {
    Low: 'bg-slate-100 text-slate-600 dark:bg-slate-700/40 dark:text-slate-300',
    Medium: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
    High: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
    Urgent: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
  };
  return map[priority] || map.Medium;
}
