const cover = (slug) => `https://picsum.photos/seed/blog-${slug}/800/500`;

export const blogPosts = [
  {
    slug: 'rag-in-production',
    title: 'Shipping RAG to Production Without the Hallucinations',
    category: 'AI',
    date: '2026-06-18',
    readTime: '7 min',
    excerpt:
      'A practical playbook for grounding LLMs in your own data with retrieval, evaluation and guardrails that survive real users.',
    author: 'Dr. Aarav Mehta',
  },
  {
    slug: 'react-performance-2026',
    title: 'React Performance in 2026: What Actually Matters',
    category: 'Web',
    date: '2026-05-30',
    readTime: '6 min',
    excerpt:
      'From code-splitting to concurrent rendering — the optimizations that move real metrics for modern React apps.',
    author: 'Elena Voss',
  },
  {
    slug: 'data-pipelines-that-scale',
    title: 'Designing Data Pipelines That Scale With You',
    category: 'Data',
    date: '2026-05-11',
    readTime: '8 min',
    excerpt:
      'Architecture patterns for reliable, observable data pipelines that grow from megabytes to terabytes.',
    author: 'Kwame Osei',
  },
  {
    slug: 'design-systems-startups',
    title: 'Design Systems for Startups: Ship Fast, Stay Consistent',
    category: 'Design',
    date: '2026-04-22',
    readTime: '5 min',
    excerpt:
      'How a lightweight design system keeps a growing product coherent without slowing your team down.',
    author: 'Mia Fujimoto',
  },
];

blogPosts.forEach((p) => {
  p.cover = cover(p.slug);
});

export const caseStudies = [
  {
    title: 'How MediVision cut triage time by 3x',
    metric: '96% recall',
    industry: 'Healthcare',
  },
  {
    title: 'ShopWave lifted conversion by 32%',
    metric: '+32% CVR',
    industry: 'E-commerce',
  },
  {
    title: 'Sentinel more than doubled fraud caught',
    metric: '2.1x fraud caught',
    industry: 'Banking',
  },
];
