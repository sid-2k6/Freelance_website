import { motion } from 'framer-motion';
import { FiClock, FiArrowUpRight } from 'react-icons/fi';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import SectionHeading from '../components/ui/SectionHeading';
import Newsletter from '../components/sections/Newsletter';
import { blogPosts } from '../data/blog';
import { formatDate } from '../utils/helpers';
import { staggerContainer, fadeInUp } from '../utils/motion';

export default function Blog() {
  const [featured, ...rest] = blogPosts;

  return (
    <div>
      <section className="relative section-pad pb-10">
        <AnimatedBackground variant="minimal" />
        <div className="container-wide">
          <SectionHeading
            eyebrow="Insights"
            title="The TechNova blog"
            subtitle="Engineering deep-dives, product tips and lessons from the field."
          />

          {/* Featured */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-surface group mt-12 grid overflow-hidden md:grid-cols-2"
          >
            <div className="relative h-64 overflow-hidden md:h-auto">
              <img src={featured.cover} alt={featured.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center p-8">
              <div className="flex items-center gap-3 text-xs">
                <span className="badge border-brand-200 bg-brand-50 text-brand-600 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
                  {featured.category}
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <FiClock className="h-3.5 w-3.5" /> {featured.readTime}
                </span>
              </div>
              <h2 className="mt-4 font-display text-2xl font-bold text-slate-900 dark:text-white">
                {featured.title}
              </h2>
              <p className="mt-3 text-slate-600 dark:text-slate-400">{featured.excerpt}</p>
              <div className="mt-5 flex items-center justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  By {featured.author} · {formatDate(featured.date)}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-300">
                  Read <FiArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </motion.article>

          {/* Grid */}
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {rest.map((post) => (
              <motion.article key={post.slug} variants={fadeInUp} className="card-surface group flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-glow">
                <div className="relative h-44 overflow-hidden">
                  <img src={post.cover} alt={post.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="badge border-brand-200 bg-brand-50 text-brand-600 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <FiClock className="h-3.5 w-3.5" /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold text-slate-900 dark:text-white">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-400">{post.excerpt}</p>
                  <p className="mt-4 text-xs text-slate-400">
                    {post.author} · {formatDate(post.date)}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-pad pt-4">
        <div className="container-wide">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}
