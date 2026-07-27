import { cx } from '../../utils/helpers';

/**
 * Decorative animated background: a subtle grid plus floating gradient blobs.
 * Purely presentational and pointer-events-none so it never blocks the UI.
 */
export default function AnimatedBackground({ className, variant = 'default' }) {
  return (
    <div className={cx('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}>
      {/* Grid */}
      <div className="absolute inset-0 bg-grid-light bg-grid opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] dark:bg-grid-dark" />

      {/* Blobs */}
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-400/30 blur-3xl animate-blob dark:bg-brand-600/20" />
      <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-accent-400/30 blur-3xl animate-blob animate-delay-2000 dark:bg-accent-500/20" />
      {variant === 'default' && (
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl animate-blob animate-delay-4000 dark:bg-fuchsia-600/10" />
      )}
    </div>
  );
}
