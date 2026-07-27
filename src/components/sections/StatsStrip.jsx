import { motion } from 'framer-motion';
import Counter from '../ui/Counter';
import { stats } from '../../data/site';
import { staggerContainer, fadeInUp, viewportOnce } from '../../utils/motion';

/** Animated statistics strip with counters. */
export default function StatsStrip() {
  return (
    <section className="relative">
      <div className="container-wide">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-4 rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5 sm:p-8 lg:grid-cols-4"
        >
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.label} variants={fadeInUp} className="flex flex-col items-center text-center">
                <div className="mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="font-display text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{s.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
