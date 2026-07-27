import { cx } from '../../utils/helpers';

/** Full-screen branded loader shown as a Suspense fallback. */
export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-full border-4 border-brand-500/20" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-brand-500" />
        </div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading…</p>
      </div>
    </div>
  );
}

/** Inline spinner. */
export function Spinner({ className }) {
  return (
    <span
      className={cx(
        'inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent',
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
}

/** Reusable skeleton block for loading states. */
export function Skeleton({ className }) {
  return (
    <div
      className={cx(
        'relative overflow-hidden rounded-xl bg-slate-200/70 dark:bg-slate-700/40',
        className
      )}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/10" />
    </div>
  );
}

export default PageLoader;
