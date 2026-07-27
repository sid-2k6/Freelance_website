/**
 * Portfolio projects showcased on the public Projects page. `tags` power the
 * category filter chips.
 */
const img = (slug, i = 1) => `https://picsum.photos/seed/${slug}-${i}/800/560`;

export const projectFilters = [
  'All',
  'AI',
  'ML',
  'Web',
  'Automation',
  'Research',
  'Dashboard',
  'NLP',
  'CV',
];

export const projects = [
  {
    slug: 'medivision-diagnostics',
    title: 'MediVision — AI Diagnostic Imaging',
    tags: ['AI', 'CV', 'ML'],
    industry: 'Healthcare',
    duration: '10 weeks',
    description:
      'A deep-learning platform that assists radiologists by detecting anomalies in X-ray and MRI scans with explainable heatmaps and 96% recall.',
    technologies: ['PyTorch', 'U-Net', 'FastAPI', 'React'],
    result: '96% recall • 3x faster triage',
  },
  {
    slug: 'insightflow-analytics',
    title: 'InsightFlow — Executive Analytics Suite',
    tags: ['Dashboard', 'Web'],
    industry: 'FinTech',
    duration: '6 weeks',
    description:
      'Real-time analytics dashboard consolidating 12 data sources into a single executive view with forecasting and anomaly alerts.',
    technologies: ['React', 'Recharts', 'Supabase', 'dbt'],
    result: '40% faster reporting',
  },
  {
    slug: 'lexiq-legal-rag',
    title: 'LexIQ — Legal Research Assistant',
    tags: ['AI', 'NLP'],
    industry: 'Legal',
    duration: '8 weeks',
    description:
      'A RAG-powered assistant that answers legal questions grounded in a firm’s private case library with verifiable citations.',
    technologies: ['LangChain', 'pgvector', 'OpenAI', 'Next.js'],
    result: '70% less research time',
  },
  {
    slug: 'agristream-automation',
    title: 'AgriStream — Farm Automation Pipeline',
    tags: ['Automation', 'ML'],
    industry: 'AgriTech',
    duration: '7 weeks',
    description:
      'IoT + ML pipeline predicting irrigation needs and automating pump scheduling across 300 hectares.',
    technologies: ['Python', 'MQTT', 'Scikit-Learn', 'AWS'],
    result: '28% water savings',
  },
  {
    slug: 'retailsense-vision',
    title: 'RetailSense — Shelf Vision Analytics',
    tags: ['CV', 'AI'],
    industry: 'Retail',
    duration: '9 weeks',
    description:
      'Computer-vision system that monitors shelf stock and planogram compliance from existing store cameras.',
    technologies: ['YOLO', 'OpenCV', 'FastAPI', 'React'],
    result: '18% fewer stockouts',
  },
  {
    slug: 'voxassist-voicebot',
    title: 'VoxAssist — Multilingual Voice Bot',
    tags: ['AI', 'NLP'],
    industry: 'Customer Support',
    duration: '8 weeks',
    description:
      'A voice assistant handling support calls in 6 languages with live transcription and human handoff.',
    technologies: ['Whisper', 'LLM', 'Twilio', 'TTS'],
    result: '55% call deflection',
  },
  {
    slug: 'quantfolio-web',
    title: 'QuantFolio — Investment Portal',
    tags: ['Web', 'Dashboard'],
    industry: 'Investment',
    duration: '11 weeks',
    description:
      'A secure investor portal with portfolio analytics, document vault and real-time market data.',
    technologies: ['React', 'Supabase', 'Tailwind', 'Recharts'],
    result: '4.9★ investor rating',
  },
  {
    slug: 'papernet-research',
    title: 'PaperNet — Research Reproduction',
    tags: ['Research', 'ML'],
    industry: 'Academia',
    duration: '6 weeks',
    description:
      'Faithful reproduction of a graph neural network paper with reproducible experiments and an open benchmark.',
    technologies: ['PyTorch Geometric', 'Weights & Biases'],
    result: 'Matched paper SOTA',
  },
  {
    slug: 'shopwave-commerce',
    title: 'ShopWave — Headless Commerce',
    tags: ['Web'],
    industry: 'E-commerce',
    duration: '9 weeks',
    description:
      'A blazing-fast headless storefront with personalized recommendations and one-click checkout.',
    technologies: ['React', 'Vite', 'Supabase', 'Stripe'],
    result: '+32% conversion',
  },
  {
    slug: 'sentinel-fraud',
    title: 'Sentinel — Fraud Detection Engine',
    tags: ['ML', 'AI'],
    industry: 'Banking',
    duration: '10 weeks',
    description:
      'Real-time transaction scoring with gradient-boosted models and streaming feature computation.',
    technologies: ['XGBoost', 'Kafka', 'FastAPI'],
    result: '2.1x fraud caught',
  },
  {
    slug: 'docuscan-ocr',
    title: 'DocuScan — Invoice OCR Automation',
    tags: ['Automation', 'CV'],
    industry: 'Accounting',
    duration: '5 weeks',
    description:
      'Automated invoice ingestion extracting line items and totals into the accounting system.',
    technologies: ['PaddleOCR', 'Python', 'Supabase'],
    result: '90% manual entry removed',
  },
  {
    slug: 'pulseboard-monitor',
    title: 'PulseBoard — Ops Monitoring Dashboard',
    tags: ['Dashboard', 'Web'],
    industry: 'SaaS',
    duration: '4 weeks',
    description:
      'A live operations dashboard with SLA tracking, alerting and beautiful dark-mode visualizations.',
    technologies: ['React', 'Recharts', 'WebSockets'],
    result: '99.95% uptime visibility',
  },
];

// Attach cover + gallery images.
projects.forEach((p) => {
  p.image = img(p.slug, 0);
  p.gallery = [img(p.slug, 1), img(p.slug, 2), img(p.slug, 3)];
});

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
