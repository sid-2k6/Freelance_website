import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { fadeInUp } from '../../utils/motion';
import { formatCurrency, cx } from '../../utils/helpers';
import Button from '../ui/Button';

/** A single pricing tier card. */
export default function PricingCard({ plan }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -8 }}
      className={cx(
        'relative flex h-full flex-col rounded-3xl border p-7 transition-all',
        plan.highlight
          ? 'border-brand-400/60 bg-gradient-to-b from-brand-600 to-brand-700 text-white shadow-glow'
          : 'card-surface'
      )}
    >
      {plan.highlight && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-400 px-4 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-soft">
          Most Popular
        </span>
      )}

      <h3
        className={cx(
          'font-display text-xl font-bold',
          plan.highlight ? 'text-white' : 'text-slate-900 dark:text-white'
        )}
      >
        {plan.name}
      </h3>
      <p className={cx('mt-1 text-sm', plan.highlight ? 'text-white/80' : 'text-slate-500 dark:text-slate-400')}>
        {plan.tagline}
      </p>

      <div className="mt-6 flex items-end gap-1">
        <span
          className={cx(
            'font-display text-4xl font-extrabold',
            plan.highlight ? 'text-white' : 'text-slate-900 dark:text-white'
          )}
        >
          {plan.price === null ? "Let's talk" : formatCurrency(plan.price)}
        </span>
        <span className={cx('pb-1 text-sm', plan.highlight ? 'text-white/70' : 'text-slate-400')}>
          {plan.price === null ? '' : `/ ${plan.period}`}
        </span>
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm">
            <span
              className={cx(
                'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full',
                plan.highlight ? 'bg-white/20 text-white' : 'bg-brand-100 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300'
              )}
            >
              <FiCheck className="h-3 w-3" />
            </span>
            <span className={plan.highlight ? 'text-white/90' : 'text-slate-600 dark:text-slate-300'}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      <Button
        to={plan.price === null ? '/contact' : '/request'}
        variant={plan.highlight ? 'accent' : 'ghost'}
        className="mt-7 w-full"
      >
        {plan.price === null ? 'Request a Quote' : 'Get Started'}
      </Button>
    </motion.div>
  );
}
