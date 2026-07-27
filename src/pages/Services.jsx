import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiHeart, FiX } from 'react-icons/fi';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import SectionHeading from '../components/ui/SectionHeading';
import ServiceCard from '../components/cards/ServiceCard';
import CTASection from '../components/sections/CTASection';
import { services, serviceCategories, getServiceBySlug } from '../data/services';
import { useWishlist } from '../context/WishlistContext';
import { staggerContainer, fadeInUp, viewportOnce } from '../utils/motion';
import { cx } from '../utils/helpers';

export default function Services() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const { items: wishlist, clear } = useWishlist();

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchCat = category === 'All' || s.category === category;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.short.toLowerCase().includes(q) ||
        s.technologies.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [category, query]);

  const wishlistServices = wishlist.map(getServiceBySlug).filter(Boolean);

  return (
    <div>
      <section className="relative section-pad pb-10">
        <AnimatedBackground variant="minimal" />
        <div className="container-wide">
          <SectionHeading
            eyebrow="Our Services"
            title="Everything you need to build & scale"
            subtitle="40+ specialized services across AI, development, data, cloud, design and academia — each with transparent pricing and delivery estimates."
          />

          {/* Search + filters */}
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="relative">
              <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services or technologies…"
                className="input-field py-3.5 pl-12"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <FiX className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {serviceCategories.map((c) => (
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
        </div>
      </section>

      {/* Wishlist */}
      {wishlistServices.length > 0 && (
        <section id="wishlist" className="pb-6">
          <div className="container-wide">
            <div className="rounded-3xl border border-rose-200/70 bg-rose-50/60 p-6 dark:border-rose-500/20 dark:bg-rose-500/5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="inline-flex items-center gap-2 font-display text-lg font-semibold text-slate-900 dark:text-white">
                  <FiHeart className="h-5 w-5 fill-current text-rose-500" /> Your Wishlist
                  <span className="text-sm font-normal text-slate-500">({wishlistServices.length})</span>
                </h3>
                <button onClick={clear} className="text-sm font-medium text-rose-600 hover:underline">
                  Clear all
                </button>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {wishlistServices.map((s) => (
                  <ServiceCard key={s.slug} service={s} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="section-pad pt-6">
        <div className="container-wide">
          <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
            Showing <span className="font-semibold text-slate-800 dark:text-white">{filtered.length}</span>{' '}
            service{filtered.length !== 1 && 's'}
          </p>
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 p-16 text-center dark:border-white/10">
              <p className="text-slate-500 dark:text-slate-400">No services match your search. Try a different keyword.</p>
            </div>
          ) : (
            <motion.div
              key={category + query}
              variants={staggerContainer(0.05)}
              initial="hidden"
              animate="show"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
