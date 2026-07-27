import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiArrowUpRight, FiDownload } from 'react-icons/fi';
import Logo from '../ui/Logo';
import { site, socialLinks } from '../../data/site';
import { downloadFile } from '../../utils/helpers';

const columns = [
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About Us' },
      { to: '/projects', label: 'Portfolio' },
      { to: '/careers', label: 'Careers' },
      { to: '/blog', label: 'Blog' },
      { to: '/testimonials', label: 'Testimonials' },
    ],
  },
  {
    title: 'Services',
    links: [
      { to: '/services', label: 'All Services' },
      { to: '/services/ai-machine-learning', label: 'AI & ML' },
      { to: '/services/web-development', label: 'Web Development' },
      { to: '/services/data-science', label: 'Data Science' },
      { to: '/pricing', label: 'Pricing' },
    ],
  },
  {
    title: 'Support',
    links: [
      { to: '/contact', label: 'Contact' },
      { to: '/track', label: 'Track Project' },
      { to: '/request', label: 'Request Service' },
      { to: '/faq', label: 'FAQ' },
      { to: '/technologies', label: 'Tech Stack' },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const downloadProfile = () => {
    const content = `TechNova Solutions — Company Profile\n${'='.repeat(40)}\n\n${site.tagline}\n\nEmail: ${site.email}\nPhone: ${site.phone}\nAddress: ${site.address}\nHours: ${site.hours}\n\nServices: AI & ML, Web & Mobile Development, Data Science, Automation, Cloud & DevOps, UI/UX Design, Academic Projects and Consulting.\n\nThis profile was generated from the TechNova Solutions website.`;
    downloadFile('TechNova-Company-Profile.txt', content);
  };

  return (
    <footer className="relative mt-10 border-t border-slate-200/70 bg-white/60 backdrop-blur dark:border-white/10 dark:bg-[#070b17]/80">
      <div className="container-wide py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <Logo className="h-10 w-10" />
              <span className="font-display text-xl font-bold text-slate-900 dark:text-white">
                Tech<span className="text-gradient">Nova</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {site.tagline}. We partner with startups, enterprises and researchers to ship
              intelligent, beautiful software.
            </p>
            <div className="mt-5 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-brand-500">
                <FiMail className="h-4 w-4 text-brand-500" /> {site.email}
              </a>
              <a href={`tel:${site.phone}`} className="flex items-center gap-2 hover:text-brand-500">
                <FiPhone className="h-4 w-4 text-brand-500" /> {site.phone}
              </a>
              <p className="flex items-start gap-2">
                <FiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" /> {site.address}
              </p>
            </div>
            <button
              onClick={downloadProfile}
              className="btn-ghost mt-5 py-2.5 text-xs"
            >
              <FiDownload className="h-4 w-4" /> Download Company Profile
            </button>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="group inline-flex items-center gap-1 text-sm text-slate-600 transition hover:text-brand-500 dark:text-slate-400"
                    >
                      {l.label}
                      <FiArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200/70 pt-6 dark:border-white/10 sm:flex-row">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {socialLinks.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white/70 text-slate-500 transition hover:-translate-y-0.5 hover:text-brand-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <Link to="/admin/login" className="hover:text-brand-500">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
