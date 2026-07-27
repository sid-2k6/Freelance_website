import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowLeft,
  FiArrowRight,
  FiClock,
  FiDollarSign,
  FiCheckCircle,
  FiHeart,
} from 'react-icons/fi';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import Button from '../components/ui/Button';
import ServiceCard from '../components/cards/ServiceCard';
import CTASection from '../components/sections/CTASection';
import { getServiceBySlug, services } from '../data/services';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency, cx } from '../utils/helpers';
import { fadeInUp, staggerContainer, viewportOnce } from '../utils/motion';

const deliverables = [
  'Complete, documented source code',
  'Deployment to your chosen environment',
  'Knowledge-transfer session',
  'Post-delivery support window',
];

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);
  const { has, toggle } = useWishlist();

  if (!service) return <Navigate to="/services" replace />;

  const Icon = service.icon;
  const related = services
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, 3);
  const favorited = has(service.slug);

  return (
    <div>
      <section className="relative section-pad pb-10">
        <AnimatedBackground variant="minimal" />
        <div className="container-wide">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-brand-600 dark:text-slate-400"
          >
            <FiArrowLeft className="h-4 w-4" /> Back to all services
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center">
            <motion.div variants={fadeInUp} initial="hidden" animate="show">
              <div className="flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow">
                  {Icon && <Icon className="h-7 w-7" />}
                </div>
                <span className="badge border-brand-200 bg-brand-50 text-brand-600 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
                  {service.category}
                </span>
              </div>
              <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {service.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                {service.description}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="card-surface p-4">
                  <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                    <FiClock className="h-4 w-4" /> Delivery
                  </p>
                  <p className="mt-1 font-display text-lg font-bold text-slate-900 dark:text-white">
                    {service.delivery}
                  </p>
                </div>
                <div className="card-surface p-4">
                  <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                    <FiDollarSign className="h-4 w-4" /> Starting at
                  </p>
                  <p className="mt-1 font-display text-lg font-bold text-slate-900 dark:text-white">
                    {formatCurrency(service.startingPrice)}
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button to={`/request?service=${service.slug}`} icon={FiArrowRight} iconRight>
                  Request this Service
                </Button>
                <button
                  onClick={() => toggle(service.slug)}
                  className={cx(
                    'btn-ghost',
                    favorited && 'border-rose-300 text-rose-600 dark:border-rose-500/40 dark:text-rose-400'
                  )}
                >
                  <FiHeart className={cx('h-4 w-4', favorited && 'fill-current')} />
                  {favorited ? 'Saved' : 'Save'}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="overflow-hidden rounded-3xl border border-slate-200/70 shadow-soft dark:border-white/10">
                <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
              </div>
              <div className="glass-strong absolute -bottom-5 -left-5 hidden rounded-2xl px-5 py-4 shadow-soft sm:block">
                <p className="text-xs text-slate-500 dark:text-slate-400">Technologies</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {service.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-600 dark:bg-brand-500/10 dark:text-brand-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="section-pad pt-6">
        <div className="container-wide">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card-surface p-8">
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                What you get
              </h2>
              <ul className="mt-6 space-y-3">
                {deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <FiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                    <span className="text-slate-600 dark:text-slate-300">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-surface p-8">
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                Technologies & tools
              </h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {service.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                We tailor the exact stack to your requirements, existing systems and long-term
                maintainability. Not sure what you need? Our consultation service can help you decide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section-pad pt-0">
          <div className="container-wide">
            <h2 className="mb-8 font-display text-2xl font-bold text-slate-900 dark:text-white">
              Related services
            </h2>
            <motion.div
              variants={staggerContainer()}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {related.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <CTASection />
    </div>
  );
}
