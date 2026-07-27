import { motion } from 'framer-motion';
import { FiAward, FiTarget, FiEye, FiHeart } from 'react-icons/fi';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import SectionHeading from '../components/ui/SectionHeading';
import StatsStrip from '../components/sections/StatsStrip';
import CTASection from '../components/sections/CTASection';
import { teamMembers, milestones, achievements, partners } from '../data/site';
import { staggerContainer, fadeInUp, viewportOnce } from '../utils/motion';

const values = [
  { icon: FiTarget, title: 'Outcome-driven', text: 'We obsess over the results that matter to your business.' },
  { icon: FiEye, title: 'Radical transparency', text: 'Clear scope, honest timelines and weekly progress demos.' },
  { icon: FiHeart, title: 'Craft & care', text: 'We treat every project as if it were our own product.' },
  { icon: FiAward, title: 'Excellence', text: 'Senior engineers and designers, no compromises on quality.' },
];

export default function About() {
  return (
    <div>
      <section className="relative section-pad pb-10">
        <AnimatedBackground />
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div variants={fadeInUp} initial="hidden" animate="show">
              <span className="badge border-brand-200 bg-brand-50 text-brand-600 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
                About TechNova
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                We build the intelligent software of tomorrow
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                Founded in 2017, TechNova Solutions is a global software agency specializing in AI,
                machine learning, full-stack development and data. We have partnered with startups,
                enterprises and researchers to ship over 1,200 projects that create real value.
              </p>
              <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
                Our mission is simple: turn ambitious ideas into elegant, reliable products — with a
                process that keeps you informed, in control and delighted at every step.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                'https://picsum.photos/seed/about-1/500/600',
                'https://picsum.photos/seed/about-2/500/400',
                'https://picsum.photos/seed/about-3/500/400',
                'https://picsum.photos/seed/about-4/500/600',
              ].map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt="TechNova team"
                  loading="lazy"
                  className={`w-full rounded-2xl object-cover shadow-soft ${i % 3 === 0 ? 'row-span-2 h-full' : 'h-40'}`}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <StatsStrip />

      {/* Values */}
      <section className="section-pad">
        <div className="container-wide">
          <SectionHeading eyebrow="Our values" title="What guides everything we do" />
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <motion.div key={v.title} variants={fadeInUp} className="card-surface p-6 hover:-translate-y-1 hover:shadow-glow">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-slate-900 dark:text-white">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{v.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad bg-slate-100/60 dark:bg-white/[0.02]">
        <div className="container-wide">
          <SectionHeading eyebrow="Our journey" title="Milestones along the way" />
          <div className="relative mx-auto mt-14 max-w-3xl">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-brand-500 to-accent-500 sm:left-1/2" />
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                variants={fadeInUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                className={`relative mb-10 pl-12 sm:w-1/2 sm:pl-0 ${i % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:ml-auto sm:pl-12'}`}
              >
                <span className={`absolute top-1.5 grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-xs font-bold text-white shadow-glow left-0.5 sm:left-auto ${i % 2 === 0 ? 'sm:-right-4' : 'sm:-left-4'}`}>
                  {m.year.slice(2)}
                </span>
                <div className="card-surface p-5">
                  <p className="font-display text-sm font-bold text-brand-500">{m.year}</p>
                  <h4 className="mt-1 font-display text-lg font-semibold text-slate-900 dark:text-white">{m.title}</h4>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{m.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad">
        <div className="container-wide">
          <SectionHeading eyebrow="The people" title="Meet the team" subtitle="A senior, multidisciplinary team that has shipped at scale." />
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {teamMembers.map((member) => (
              <motion.div key={member.name} variants={fadeInUp} className="card-surface group overflow-hidden text-center">
                <div className="relative h-56 overflow-hidden">
                  <img src={member.avatar} alt={member.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                </div>
                <div className="p-5">
                  <h4 className="font-display text-lg font-semibold text-slate-900 dark:text-white">{member.name}</h4>
                  <p className="text-sm font-medium text-brand-500">{member.role}</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Achievements + partners */}
      <section className="section-pad bg-slate-100/60 dark:bg-white/[0.02]">
        <div className="container-wide">
          <SectionHeading eyebrow="Recognition" title="Awards, certificates & partners" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((a) => (
              <div key={a.title} className="card-surface flex items-start gap-4 p-6">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300">
                  <FiAward className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{a.title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{a.org}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mask-fade-x mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
            {partners.map((p) => (
              <span key={p} className="font-display text-lg font-bold text-slate-400 dark:text-slate-500">{p}</span>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
