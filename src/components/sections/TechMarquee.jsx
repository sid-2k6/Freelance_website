import { technologies } from '../../data/technologies';

/** Infinite scrolling marquee of technology logos. */
export default function TechMarquee() {
  const row = [...technologies, ...technologies];
  return (
    <div className="mask-fade-x relative overflow-hidden py-4">
      <div className="flex w-max animate-marquee gap-4">
        {row.map((t, i) => {
          const Icon = t.icon;
          return (
            <div
              key={`${t.name}-${i}`}
              className="flex items-center gap-2.5 rounded-2xl border border-slate-200/70 bg-white/70 px-5 py-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
            >
              <Icon className="h-6 w-6" style={{ color: t.color }} />
              <span className="whitespace-nowrap text-sm font-semibold text-slate-700 dark:text-slate-200">
                {t.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
