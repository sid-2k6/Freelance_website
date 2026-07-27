import { motion } from 'framer-motion';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import SectionHeading from '../components/ui/SectionHeading';
import PricingCard from '../components/cards/PricingCard';
import FAQAccordion from '../components/sections/FAQAccordion';
import CTASection from '../components/sections/CTASection';
import { pricingPlans } from '../data/pricing';
import { faqs } from '../data/faq';
import { staggerContainer } from '../utils/motion';

const comparison = [
  ['Revisions', '1 round', '3 rounds', 'Unlimited', 'Custom'],
  ['Dedicated PM', '—', 'Yes', 'Yes', 'Yes'],
  ['Cloud deployment', '—', 'Yes', 'Yes', 'Yes'],
  ['Support window', 'Email', '30 days', '90 days', 'SLA'],
  ['Security review', '—', '—', 'Yes', 'Yes'],
];

export default function Pricing() {
  return (
    <div>
      <section className="relative section-pad pb-10">
        <AnimatedBackground variant="minimal" />
        <div className="container-wide">
          <SectionHeading
            eyebrow="Pricing"
            title="Simple, transparent pricing"
            subtitle="Choose a plan that fits your stage. Every engagement is scoped clearly with no hidden fees."
          />
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            animate="show"
            className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="section-pad pt-6">
        <div className="container-wide">
          <div className="overflow-hidden rounded-3xl border border-slate-200/70 dark:border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-slate-50 dark:bg-white/5">
                  <tr>
                    <th className="px-6 py-4 font-display font-semibold text-slate-900 dark:text-white">
                      Feature
                    </th>
                    {pricingPlans.map((p) => (
                      <th
                        key={p.name}
                        className="px-6 py-4 text-center font-display font-semibold text-slate-900 dark:text-white"
                      >
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {comparison.map((row) => (
                    <tr key={row[0]} className="bg-white/60 dark:bg-transparent">
                      <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-200">{row[0]}</td>
                      {row.slice(1).map((cell, i) => (
                        <td key={i} className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad pt-6">
        <div className="container-wide">
          <SectionHeading eyebrow="Pricing FAQ" title="Common pricing questions" />
          <div className="mt-12">
            <FAQAccordion items={faqs.slice(1, 5)} />
          </div>
        </div>
      </section>

      <CTASection title="Not sure which plan fits?" subtitle="Tell us about your project and we'll recommend the best path forward." />
    </div>
  );
}
