/**
 * Pricing tiers rendered on the Pricing page and previewed elsewhere.
 */
export const pricingPlans = [
  {
    name: 'Starter',
    tagline: 'For students & quick builds',
    price: 1499,
    period: 'per project',
    highlight: false,
    features: [
      'Mini & college projects',
      '1 revision round',
      'Source code + docs',
      'Email support',
      'Delivery in 3–10 days',
    ],
    cta: 'Start small',
  },
  {
    name: 'Professional',
    tagline: 'For startups & growing teams',
    price: 5999,
    period: 'per project',
    highlight: true,
    features: [
      'Full-stack & AI/ML builds',
      '3 revision rounds',
      'CI/CD & cloud deployment',
      'Priority chat support',
      'Dedicated project manager',
      '30-day post-launch support',
    ],
    cta: 'Most popular',
  },
  {
    name: 'Enterprise',
    tagline: 'For scale & compliance',
    price: 14999,
    period: 'per project',
    highlight: false,
    features: [
      'Complex multi-service systems',
      'Unlimited revisions',
      'Dedicated senior team',
      'SLA & security review',
      '24/7 priority support',
      '90-day support & handover',
    ],
    cta: 'Go enterprise',
  },
  {
    name: 'Custom Quote',
    tagline: 'Have something unique?',
    price: null,
    period: 'tailored to you',
    highlight: false,
    features: [
      'Scoped to your exact needs',
      'Flexible engagement models',
      'Retainer or milestone billing',
      'NDA available on request',
      'Talk to a solutions architect',
    ],
    cta: 'Request a quote',
  },
];

export const budgetRanges = [
  'Under ₹2,000',
  '₹2,000 – ₹5,000',
  '₹5,000 – ₹10,000',
  '₹10,000 – ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000+',
];
