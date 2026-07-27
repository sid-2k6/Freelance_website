import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiPlayCircle,
  FiCheckCircle,
  FiZap,
  FiShield,
  FiTrendingUp,
  FiStar,
} from 'react-icons/fi';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import Particles from '../components/ui/Particles';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';
import StatsStrip from '../components/sections/StatsStrip';
import TechMarquee from '../components/sections/TechMarquee';
import TestimonialsCarousel from '../components/sections/TestimonialsCarousel';
import FAQAccordion from '../components/sections/FAQAccordion';
import Newsletter from '../components/sections/Newsletter';
import CTASection from '../components/sections/CTASection';
import ServiceCard from '../components/cards/ServiceCard';
import ProjectCard from '../components/cards/ProjectCard';
import { featuredServices } from '../data/services';
import { projects } from '../data/projects';
import { faqs } from '../data/faq';
import { processSteps, partners } from '../data/site';
import { staggerContainer, fadeInUp, fadeIn, viewportOnce } from '../utils/motion';

const heroHighlights = [
  { icon: FiZap, text: 'AI-first engineering' },
  { icon: FiShield, text: 'NDA & secure delivery' },
  { icon: FiTrendingUp, text: 'Measurable outcomes' },
];

const whyUs = [
  {
    icon: FiZap,
    title: 'Ship faster',
    text: 'Agile sprints with weekly demos mean you see progress every single week.',
  },
  {
    icon: FiShield,
    title: 'Enterprise-grade',
    text: 'Security, testing and best practices baked in from day one.',
  },
  {
    icon: FiTrendingUp,
    title: 'Results that matter',
    text: 'We optimize for the metrics that move your business, not vanity numbers.',
  },
  {
    icon: FiCheckCircle,
    title: 'Full ownership',
    text: 'You own all the code, IP and infrastructure. No lock-in, ever.',
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* ============================= HERO ============================= */}
      <section className="relative">
        <AnimatedBackground />
        <Particles />
        <div className="container-wide relative pb-16 pt-14 sm:pt-20">
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div variants={fadeInUp} className="flex justify-center">
              <span className="badge border-brand-200 bg-white/70 text-brand-600 shadow-sm backdrop-blur dark:border-brand-500/30 dark:bg-white/5 dark:text-brand-300">
                <FiStar className="h-3.5 w-3.5 fill-current" /> Top-rated software agency · 2025
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white sm:text-6xl"
            >
              Transforming Ideas into{' '}
              <span className="text-gradient">Intelligent Digital Solutions</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400"
            >
              TechNova Solutions is your end-to-end partner for AI, machine learning, web, mobile,
              data and cloud. We design, build and ship premium software that scales.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Button to="/request" icon={FiArrowRight} iconRight className="px-7 py-3.5 text-base">
                Start Your Project
              </Button>
              <Button to="/projects" variant="ghost" icon={FiPlayCircle} className="px-7 py-3.5 text-base">
                View Our Work
              </Button>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-500 dark:text-slate-400"
            >
              {heroHighlights.map((h) => {
                const Icon = h.icon;
                return (
                  <span key={h.text} className="inline-flex items-center gap-2">
                    <Icon className="h-4 w-4 text-accent-500" /> {h.text}
                  </span>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Floating preview cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative mx-auto mt-16 max-w-5xl"
          >
            <div className="glass-strong rounded-3xl p-3 shadow-soft">
              <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-brand-950 p-6 sm:p-10">
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: 'Model Accuracy', value: '98.6%', trend: '+4.2%' },
                    { label: 'Deployment Time', value: '2.3s', trend: '-38%' },
                    { label: 'Client NPS', value: '92', trend: '+11' },
                  ].map((c, i) => (
                    <motion.div
                      key={c.label}
                      className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 5, delay: i * 0.6, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <p className="text-sm text-slate-400">{c.label}</p>
                      <p className="mt-2 font-display text-3xl font-bold text-white">{c.value}</p>
                      <p className="mt-1 text-xs font-semibold text-emerald-400">{c.trend} this quarter</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================= STATS ============================= */}
      <div className="pb-6">
        <StatsStrip />
      </div>

      {/* ============================= PARTNERS ============================= */}
      <section className="py-12">
        <div className="container-wide">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
            Trusted by teams at
          </p>
          <div className="mask-fade-x mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
            {partners.map((p) => (
              <span key={p} className="font-display text-lg font-bold text-slate-400 dark:text-slate-500">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= FEATURED SERVICES ============================= */}
      <section className="section-pad">
        <div className="container-wide">
          <SectionHeading
            eyebrow="What we do"
            title="Featured Services"
            subtitle="From intelligent AI systems to pixel-perfect web apps — explore a few of our most requested capabilities."
          />
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {featuredServices.slice(0, 6).map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </motion.div>
          <div className="mt-10 text-center">
            <Button to="/services" variant="ghost" icon={FiArrowRight} iconRight>
              Explore all 40+ services
            </Button>
          </div>
        </div>
      </section>

      {/* ============================= WHY US ============================= */}
      <section className="section-pad bg-slate-100/60 dark:bg-white/[0.02]">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Why TechNova"
            title="An agency engineered for outcomes"
            subtitle="We combine deep technical expertise with a design-obsessed process to deliver software you will be proud of."
          />
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {whyUs.map((w) => {
              const Icon = w.icon;
              return (
                <motion.div
                  key={w.title}
                  variants={fadeInUp}
                  className="card-surface p-6 hover:-translate-y-1 hover:shadow-glow"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-slate-900 dark:text-white">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {w.text}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================= LATEST PROJECTS ============================= */}
      <section className="section-pad">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Portfolio"
            title="Latest Projects"
            subtitle="A glimpse of what we have shipped recently across industries."
          />
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {projects.slice(0, 3).map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </motion.div>
          <div className="mt-10 text-center">
            <Button to="/projects" variant="ghost" icon={FiArrowRight} iconRight>
              See full portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* ============================= PROCESS ============================= */}
      <section className="section-pad bg-slate-100/60 dark:bg-white/[0.02]">
        <div className="container-wide">
          <SectionHeading
            eyebrow="How we work"
            title="A simple, transparent process"
            subtitle="Four clear stages that keep you informed and in control from idea to launch."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                variants={fadeInUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="card-surface h-full p-6">
                  <span className="font-display text-4xl font-extrabold text-brand-200 dark:text-brand-500/30">
                    {step.step}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {step.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= TECH ============================= */}
      <section className="py-16">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Our stack"
            title="Technologies we master"
            subtitle="We choose the right tool for the job from a broad, modern toolbox."
          />
        </div>
        <div className="mt-10">
          <TechMarquee />
        </div>
      </section>

      {/* ============================= TESTIMONIALS ============================= */}
      <section className="section-pad bg-slate-100/60 dark:bg-white/[0.02]">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Client love"
            title="What our clients say"
            subtitle="We measure success by the trust and results we earn."
          />
          <div className="mt-12">
            <TestimonialsCarousel />
          </div>
        </div>
      </section>

      {/* ============================= FAQ PREVIEW ============================= */}
      <section className="section-pad">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Questions"
            title="Frequently asked questions"
            subtitle="Everything you need to know before starting your project."
          />
          <div className="mt-12">
            <FAQAccordion items={faqs.slice(0, 5)} />
          </div>
          <div className="mt-8 text-center">
            <Link to="/faq" className="text-sm font-semibold text-brand-600 hover:underline dark:text-brand-300">
              View all FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* ============================= NEWSLETTER + CTA ============================= */}
      <section className="pb-6">
        <div className="container-wide">
          <Newsletter />
        </div>
      </section>
      <CTASection />
    </div>
  );
}
