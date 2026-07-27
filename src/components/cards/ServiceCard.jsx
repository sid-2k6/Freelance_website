import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiClock, FiHeart } from 'react-icons/fi';
import { fadeInUp } from '../../utils/motion';
import { formatCurrency, cx } from '../../utils/helpers';
import { useWishlist } from '../../context/WishlistContext';

/** Premium service card used on the Services page and home page. */
export default function ServiceCard({ service }) {
  const { has, toggle } = useWishlist();
  const Icon = service.icon;
  const favorited = has(service.slug);

  return (
    <motion.article
      variants={fadeInUp}
      whileHover={{ y: -6 }}
      className="card-surface group flex h-full flex-col overflow-hidden hover:shadow-glow hover:border-brand-300/60 dark:hover:border-brand-500/40"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
        <div className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-xl bg-white/90 text-brand-600 shadow-soft backdrop-blur dark:bg-slate-900/80 dark:text-brand-300">
          {Icon && <Icon className="h-5 w-5" />}
        </div>
        <button
          onClick={() => toggle(service.slug)}
          aria-label={favorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className={cx(
            'absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full backdrop-blur transition',
            favorited
              ? 'bg-rose-500 text-white'
              : 'bg-white/85 text-slate-500 hover:text-rose-500 dark:bg-slate-900/70 dark:text-slate-300'
          )}
        >
          <FiHeart className={cx('h-4 w-4', favorited && 'fill-current')} />
        </button>
        <span className="badge absolute bottom-3 left-4 border-white/20 bg-white/90 text-brand-700 dark:bg-slate-900/80 dark:text-brand-200">
          {service.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
          {service.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {service.short}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {service.technologies.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm dark:border-white/10">
          <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <FiClock className="h-4 w-4" /> {service.delivery}
          </span>
          <span className="font-semibold text-slate-900 dark:text-white">
            from {formatCurrency(service.startingPrice)}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <Link
            to={`/services/${service.slug}`}
            className="btn-ghost flex-1 py-2.5 text-xs"
          >
            Learn More
          </Link>
          <Link
            to={`/request?service=${service.slug}`}
            className="btn-primary flex-1 py-2.5 text-xs"
          >
            Request <FiArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
