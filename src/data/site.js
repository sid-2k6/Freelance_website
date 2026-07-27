import {
  FiUsers,
  FiCheckCircle,
  FiSmile,
  FiClock,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiYoutube,
} from 'react-icons/fi';

/** Global site configuration and content used across many components. */
export const site = {
  name: 'TechNova Solutions',
  tagline: 'Transforming Ideas into Intelligent Digital Solutions',
  email: import.meta.env.VITE_CONTACT_EMAIL || 'hello@technova.solutions',
  phone: '+1 (555) 123-4567',
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '15551234567',
  address: '2100 Innovation Drive, Suite 400, San Francisco, CA',
  hours: 'Mon – Sat · 9:00 AM – 7:00 PM (PST)',
};

export const socialLinks = [
  { name: 'GitHub', icon: FiGithub, url: 'https://github.com' },
  { name: 'LinkedIn', icon: FiLinkedin, url: 'https://linkedin.com' },
  { name: 'Twitter', icon: FiTwitter, url: 'https://twitter.com' },
  { name: 'Instagram', icon: FiInstagram, url: 'https://instagram.com' },
  { name: 'YouTube', icon: FiYoutube, url: 'https://youtube.com' },
];

export const stats = [
  { label: 'Clients Served', value: 480, suffix: '+', icon: FiUsers },
  { label: 'Projects Completed', value: 1250, suffix: '+', icon: FiCheckCircle },
  { label: 'Customer Satisfaction', value: 99, suffix: '%', icon: FiSmile },
  { label: 'Years of Experience', value: 8, suffix: '+', icon: FiClock },
];

export const achievements = [
  { title: 'Top Rated Agency 2025', org: 'Clutch' },
  { title: 'AI Innovation Award', org: 'TechCrunch Disrupt' },
  { title: 'ISO 27001 Certified', org: 'Security & Compliance' },
  { title: '500+ Five-Star Reviews', org: 'Google & Trustpilot' },
];

export const partners = [
  'NimbusAI',
  'DataForge',
  'CloudPeak',
  'VividLabs',
  'QuantEdge',
  'NovaBank',
  'PixelWorks',
  'HelioSoft',
];

export const teamMembers = [
  {
    name: 'Dr. Aarav Mehta',
    role: 'Founder & AI Lead',
    avatar: 'https://i.pravatar.cc/300?img=68',
    bio: 'PhD in Machine Learning. 12+ years shipping AI products.',
  },
  {
    name: 'Elena Voss',
    role: 'Head of Engineering',
    avatar: 'https://i.pravatar.cc/300?img=41',
    bio: 'Full-stack architect obsessed with clean, scalable systems.',
  },
  {
    name: 'Kwame Osei',
    role: 'Lead Data Scientist',
    avatar: 'https://i.pravatar.cc/300?img=59',
    bio: 'Turns messy data into models that move the needle.',
  },
  {
    name: 'Mia Fujimoto',
    role: 'Design Director',
    avatar: 'https://i.pravatar.cc/300?img=26',
    bio: 'Crafts interfaces that feel effortless and premium.',
  },
];

export const milestones = [
  { year: '2017', title: 'Founded', text: 'TechNova began as a two-person AI consultancy.' },
  { year: '2019', title: 'First 100 clients', text: 'Expanded into full-stack and data services.' },
  { year: '2021', title: 'Global team', text: 'Grew to a distributed team across 4 continents.' },
  { year: '2023', title: 'AI division', text: 'Launched a dedicated Generative AI & LLM practice.' },
  { year: '2025', title: '1200+ projects', text: 'Recognized as a top-rated software agency.' },
];

export const processSteps = [
  {
    step: '01',
    title: 'Discover',
    text: 'We listen, scope your goals and define clear success metrics.',
  },
  {
    step: '02',
    title: 'Design',
    text: 'We architect the solution and craft high-fidelity designs.',
  },
  {
    step: '03',
    title: 'Build',
    text: 'We develop in agile sprints with weekly demos and updates.',
  },
  {
    step: '04',
    title: 'Deploy',
    text: 'We launch, monitor and support your product post-release.',
  },
];
