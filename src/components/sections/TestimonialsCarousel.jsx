import { useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import { testimonials } from '../../data/testimonials';
import { cx } from '../../utils/helpers';

/** Auto-rotating testimonials carousel with manual controls. */
export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback(
    (next) => {
      setDir(next > index || (index === testimonials.length - 1 && next === 0) ? 1 : -1);
      setIndex((next + testimonials.length) % testimonials.length);
    },
    [index]
  );

  useEffect(() => {
    const t = setInterval(() => go((index + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, [index, go]);

  const active = testimonials[index];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="relative min-h-[280px] overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 p-8 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5 sm:p-10">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -60 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex gap-1 text-amber-400">
              {Array.from({ length: active.rating }).map((_, i) => (
                <FiStar key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <blockquote className="mt-5 font-display text-xl leading-relaxed text-slate-800 dark:text-slate-100 sm:text-2xl">
              “{active.quote}”
            </blockquote>
            <div className="mt-6 flex items-center gap-4">
              <img
                src={active.avatar}
                alt={active.name}
                loading="lazy"
                className="h-12 w-12 rounded-full object-cover ring-2 ring-brand-400/40"
              />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{active.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{active.role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => go(index - 1)}
          className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:text-brand-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
          aria-label="Previous testimonial"
        >
          <FiChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={cx(
                'h-2 rounded-full transition-all',
                i === index ? 'w-6 bg-brand-500' : 'w-2 bg-slate-300 dark:bg-slate-600'
              )}
            />
          ))}
        </div>
        <button
          onClick={() => go(index + 1)}
          className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:text-brand-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
          aria-label="Next testimonial"
        >
          <FiChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
