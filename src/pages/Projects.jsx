import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import SectionHeading from '../components/ui/SectionHeading';
import ProjectCard from '../components/cards/ProjectCard';
import CTASection from '../components/sections/CTASection';
import { projects, projectFilters } from '../data/projects';
import { caseStudies } from '../data/blog';
import { staggerContainer } from '../utils/motion';
import { cx } from '../utils/helpers';

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.tags.includes(filter))),
    [filter]
  );

  return (
    <div>
      <section className="relative section-pad pb-10">
        <AnimatedBackground variant="minimal" />
        <div className="container-wide">
          <SectionHeading
            eyebrow="Portfolio"
            title="Projects that ship real impact"
            subtitle="Explore our recent work across AI, ML, web, automation, research and data. Every build is measured by outcomes."
          />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {projectFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cx(
                  'rounded-full border px-4 py-2 text-sm font-medium transition',
                  filter === f
                    ? 'border-brand-500 bg-brand-500 text-white shadow-glow'
                    : 'border-slate-200 bg-white/70 text-slate-600 hover:border-brand-300 hover:text-brand-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300'
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-wide">
          <motion.div
            key={filter}
            variants={staggerContainer(0.06)}
            initial="hidden"
            animate="show"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case studies / success stories */}
      <section className="section-pad bg-slate-100/60 dark:bg-white/[0.02]">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Success stories"
            title="Case studies"
            subtitle="Deep dives into how we turned ambitious goals into measurable wins."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {caseStudies.map((c) => (
              <div key={c.title} className="card-surface flex flex-col p-7 hover:-translate-y-1 hover:shadow-glow">
                <span className="badge w-max border-accent-200 bg-accent-50 text-accent-700 dark:border-accent-500/30 dark:bg-accent-500/10 dark:text-accent-300">
                  {c.industry}
                </span>
                <h3 className="mt-4 flex-1 font-display text-lg font-semibold text-slate-900 dark:text-white">
                  {c.title}
                </h3>
                <p className="mt-4 font-display text-3xl font-extrabold text-gradient">{c.metric}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
