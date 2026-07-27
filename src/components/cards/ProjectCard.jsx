import { motion } from 'framer-motion';
import { FiClock, FiBriefcase, FiTrendingUp } from 'react-icons/fi';
import { fadeInUp } from '../../utils/motion';

/** Portfolio project card with hover reveal. */
export default function ProjectCard({ project }) {
  return (
    <motion.article
      variants={fadeInUp}
      whileHover={{ y: -6 }}
      className="card-surface group flex h-full flex-col overflow-hidden hover:shadow-glow"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur"
              >
                {t}
              </span>
            ))}
          </div>
          <h3 className="font-display text-lg font-semibold text-white">{project.title}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-600 dark:bg-brand-500/10 dark:text-brand-300"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <FiBriefcase className="h-4 w-4 text-brand-500" /> {project.industry}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FiClock className="h-4 w-4 text-brand-500" /> {project.duration}
          </span>
          <span className="col-span-2 inline-flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
            <FiTrendingUp className="h-4 w-4" /> {project.result}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
