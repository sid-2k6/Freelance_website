# TechNova Solutions

> **Transforming Ideas into Intelligent Digital Solutions**

A complete, production-ready **freelancing agency website** with a premium visitor portal and a full-featured admin console. Built to deploy **entirely on the Netlify free tier** with **no paid backend** — powered only by **React + Supabase + Netlify**.

---

## Tech Stack

| Layer | Technology |
|------|------------|
| Framework | React 18 + Vite 5 |
| Routing | React Router 6 (lazy-loaded, code-split) |
| Styling | Tailwind CSS 3 (dark/light themes) |
| Animation | Framer Motion 11 |
| Icons | React Icons |
| Charts | Recharts |
| Auth | Supabase Auth |
| Database | Supabase PostgreSQL (with Row Level Security) |
| File upload | Supabase Storage |
| Hosting | Netlify (free) |

> There is **no Express/Node/Django/Flask server**. All dynamic behavior runs client-side against Supabase.

---

## Features

### Visitor Portal (no login)
- **Home** — animated hero, particles, gradient blobs, animated counters, featured services, latest projects, tech marquee, testimonials carousel, FAQ preview, newsletter.
- **Services** — 40+ services with search, category filters, wishlist/favorites, pricing & delivery.
- **Service Detail** — deliverables, tech, related services.
- **Projects** — filterable portfolio + case studies.
- **Pricing** — Starter / Professional / Enterprise / Custom + comparison table.
- **Technologies** — animated, filterable tech grid.
- **About** — story, values, timeline, team, achievements, partners.
- **Testimonials**, **Blog**, **Careers**, **FAQ**, **Contact** (map placeholder, WhatsApp, socials).
- **Request Service** — multi-step form → generates a **Project ID**, stores in Supabase, optional file upload, NDA & terms.
- **Track Project** — look up live status, progress %, assigned team, delivery date, updates & invoice status by email + Project ID.

### Admin Portal (Supabase Auth protected)
- **Login** with protected routes.
- **Dashboard** — KPI cards, revenue banner, bar & pie charts, latest activity, recent customers.
- **Projects** — full CRUD, assign, change status, priority, progress, delete.
- **Customers**, **Messages** (reply/mark/archive), **Invoices** (+ CSV export).
- **Services** catalog, **Analytics** (multiple charts), **Reports** (CSV + printable PDF).
- **Notifications**, **Settings** (agency info, socials, theme).

### UX polish
Glassmorphism, neumorphic shadows, gradient backgrounds, animated blobs, smooth scrolling, hover micro-interactions, loading skeletons, sticky glass navbar, mega footer, floating WhatsApp + live-chat placeholder + scroll-to-top, dark/light theme switch, fully responsive, SEO tags, accessible components, lazy loading & code splitting.

> **Demo mode:** The site runs fully without Supabase configured — forms save to `localStorage` and the admin console shows realistic demo data. Add your Supabase keys to switch to the real database automatically.

---

## Quick Start (local)

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file and add your Supabase keys (optional for demo)
cp .env.example .env

# 3. Start the dev server
npm run dev

# 4. Build for production
npm run build && npm run preview
```

---

## Supabase Setup Guide

1. Create a free project at [supabase.com](https://supabase.com).
2. In **Project Settings → API**, copy the **Project URL** and the **anon public** key.
3. Add them to `.env`:
   ```bash
   VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
4. Open **SQL Editor → New query**, paste the contents of [`supabase/schema.sql`](./supabase/schema.sql) and **Run**. This creates all tables, enables Row Level Security and creates the `project-files` storage bucket.
5. Create an admin user in **Authentication → Users → Add user** (email + password). Use those credentials on `/admin/login`.

### Security notes
- Only the **anon public** key is used in the browser — it is safe to expose because **Row Level Security** policies protect the data.
- **Never** put the `service_role` key in the frontend or commit it.
- All form inputs are validated and sanitized client-side (defense-in-depth on top of RLS).

---

## Netlify Deployment (free)

### Option A — Git (recommended)
1. Push this repo to GitHub/GitLab.
2. In Netlify: **Add new site → Import an existing project** and pick the repo.
3. Build settings are auto-detected from [`netlify.toml`](./netlify.toml):
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables in **Site settings → Environment variables**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy. The included `_redirects` + `netlify.toml` handle SPA routing so deep links and refreshes work.

### Option B — CLI
```bash
npm i -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

---

## Project Structure

```
src/
├── components/
│   ├── auth/          # ProtectedRoute
│   ├── cards/         # ServiceCard, ProjectCard, PricingCard
│   ├── layout/        # Navbar, Footer, AdminSidebar
│   ├── sections/      # StatsStrip, TechMarquee, FAQAccordion, Newsletter, CTA, Testimonials
│   └── ui/            # Button, Modal, Loader, ThemeToggle, Counter, Particles, Logo, ...
├── context/           # Theme, Auth, Toast, Wishlist providers
├── data/              # services, projects, pricing, technologies, testimonials, faq, site, blog, careers, demoData
├── layouts/           # VisitorLayout, AdminLayout
├── pages/             # 15 visitor pages + admin/ (11 admin pages)
├── services/          # supabaseClient, api (data access with demo fallback)
├── utils/             # helpers, motion variants
├── App.jsx            # Router
└── main.jsx           # Entry + providers
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

---

## License

Provided as a starter for TechNova Solutions. Customize freely for your agency.
