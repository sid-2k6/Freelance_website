import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import SectionHeading from '../components/ui/SectionHeading';
import TestimonialsCarousel from '../components/sections/TestimonialsCarousel';
import CTASection from '../components/sections/CTASection';
import { testimonials } from '../data/testimonials';
import { staggerContainer, fadeInUp, viewportOnce } from '../utils/motion';

export default function Testimonials() {
  return (
    <div>
      <section className="relative section-pad pb-10">
        <AnimatedBackground variant="minimal" />
        <div className="container-wide">
          <SectionHeading
            eyebrow="Testimonials"
            title="Loved by founders, teams & researchers"
            subtitle="Our reputation is built on trust, communication and results that speak for themselves."
          />
          <div className="mt-12">
            <TestimonialsCarousel />
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-wide">
          <motion.div
            variants={staggerContainer(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {testimonials.map((t) => (
              <motion.figure key={t.name} variants={fadeInUp} className="card-surface flex flex-col p-6 hover:-translate-y-1 hover:shadow-glow">
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FiStar key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4 dark:border-white/10">
                  <img src={t.avatar} alt={t.name} loading="lazy" className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
