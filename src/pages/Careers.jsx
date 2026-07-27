import { motion } from 'framer-motion';
import { FiMapPin, FiBriefcase, FiArrowRight, FiCheck } from 'react-icons/fi';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import CTASection from '../components/sections/CTASection';
import { jobOpenings, perks } from '../data/careers';
import { staggerContainer, fadeInUp, viewportOnce } from '../utils/motion';

export default function Careers() {
  return (
    <div>
      <section className="relative section-pad pb-10">
        <AnimatedBackground />
        <div className="container-wide">
          <SectionHeading
            eyebrow="Careers"
            title="Build the future with us"
            subtitle="We're a remote-first team of engineers, designers and scientists who care deeply about craft and impact."
          />
        </div>
      </section>

      {/* Perks */}
      <section className="pb-10">
        <div className="container-wide">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((p) => (
              <div key={p} className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/70 px-5 py-4 dark:border-white/10 dark:bg-white/5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                  <FiCheck className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Openings */}
      <section className="section-pad pt-6">
        <div className="container-wide">
          <h2 className="mb-8 font-display text-2xl font-bold text-slate-900 dark:text-white">
            Open positions
          </h2>
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="space-y-4"
          >
            {jobOpenings.map((job) => (
              <motion.div
                key={job.title}
                variants={fadeInUp}
                className="card-surface flex flex-col gap-4 p-6 transition hover:shadow-glow sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                      {job.title}
                    </h3>
                    <span className="badge border-brand-200 bg-brand-50 text-brand-600 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
                      {job.department}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{job.description}</p>
                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1.5"><FiBriefcase className="h-4 w-4 text-brand-500" /> {job.type}</span>
                    <span className="inline-flex items-center gap-1.5"><FiMapPin className="h-4 w-4 text-brand-500" /> {job.location}</span>
                  </div>
                </div>
                <Button to="/contact" variant="ghost" icon={FiArrowRight} iconRight className="shrink-0">
                  Apply now
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection title="Don't see your role?" subtitle="We're always looking for exceptional people. Send us your details and let's talk." />
    </div>
  );
}
