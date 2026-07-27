import { motion } from 'framer-motion';
import { FiArrowRight, FiPhone } from 'react-icons/fi';
import Button from '../ui/Button';
import { fadeInUp, viewportOnce } from '../../utils/motion';

/** Reusable call-to-action band used near the bottom of many pages. */
export default function CTASection({
  title = 'Ready to build something intelligent?',
  subtitle = 'Tell us about your project and get a response within one business day.',
}) {
  return (
    <section className="section-pad">
      <div className="container-wide">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 p-10 text-center shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5 sm:p-16"
        >
          <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-brand-400/20 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-accent-400/20 blur-3xl" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-600 dark:text-slate-400">{subtitle}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button to="/request" icon={FiArrowRight} iconRight>
                Request a Service
              </Button>
              <Button to="/contact" variant="ghost" icon={FiPhone}>
                Talk to Us
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
