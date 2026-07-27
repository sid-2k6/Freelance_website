import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import SectionHeading from '../components/ui/SectionHeading';
import CTASection from '../components/sections/CTASection';
import { technologies, techCategories } from '../data/technologies';
import { staggerContainer, fadeInUp } from '../utils/motion';
import { cx } from '../utils/helpers';

export default function Technologies() {
  const [category, setCategory] = useState('All');

  const filtered = useMemo(
    () => (category === 'All' ? technologies : technologies.filter((t) => t.category === category)),
    [category]
  );

  return (
    <div>
      <section className="relative section-pad pb-10">
        <AnimatedBackground />
        <div className="container-wide">
          <SectionHeading
            eyebrow="Tech Stack"
            title="A modern, battle-tested toolbox"
            subtitle="We work fluently across the technologies that power today's most ambitious products."
          />

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {techCategories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cx(
                  'rounded-full border px-4 py-2 text-sm font-medium transition',
                  category === c
                    ? 'border-brand-500 bg-brand-500 text-white shadow-glow'
                    : 'border-slate-200 bg-white/70 text-slate-600 hover:border-brand-300 hover:text-brand-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300'
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <motion.div
            key={category}
            variants={staggerContainer(0.04)}
            initial="hidden"
            animate="show"
            className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          >
            {filtered.map((t) => {
              const Icon = t.icon;
              return (
                <motion.div
                  key={t.name}
                  variants={fadeInUp}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="card-surface group flex flex-col items-center gap-3 p-6 text-center hover:shadow-glow"
                >
                  <div
                    className="grid h-16 w-16 place-items-center rounded-2xl transition group-hover:scale-110"
                    style={{ backgroundColor: `${t.color}15` }}
                  >
                    <Icon className="h-8 w-8 transition" style={{ color: t.color }} />
                  </div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{t.name}</p>
                  <span className="text-xs text-slate-400">{t.category}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <CTASection title="Have a stack in mind?" subtitle="We'll match the right technologies to your goals, budget and timeline." />
    </div>
  );
}
