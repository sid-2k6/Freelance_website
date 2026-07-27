import { motion } from 'framer-motion';
import { fadeInUp, viewportOnce } from '../../utils/motion';
import { cx } from '../../utils/helpers';

/**
 * Consistent section heading with an eyebrow label, title and subtitle.
 */
export default function SectionHeading({ eyebrow, title, subtitle, center = true, className }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cx(center && 'mx-auto text-center', 'max-w-2xl', className)}
    >
      {eyebrow && (
        <span className="badge border-brand-200 bg-brand-50 text-brand-600 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
