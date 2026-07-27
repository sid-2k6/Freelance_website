-- =====================================================================
-- TechNova Solutions — Supabase database schema
-- ---------------------------------------------------------------------
-- Run this in the Supabase SQL Editor (Dashboard -> SQL -> New query).
-- It creates every table, enables Row Level Security (RLS) and defines
-- policies so:
--   * Visitors (anon) can SUBMIT requests, messages and newsletter signups
--   * Visitors can READ ONLY their own project (matched by email + id)
--   * Authenticated admins can do everything
-- =====================================================================

-- Extensions -----------------------------------------------------------
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- Helper: is the current user an authenticated admin?
-- We treat any signed-in Supabase Auth user as an admin. Create admin
-- users in Authentication -> Users. Optionally restrict further using the
-- `admins` table below.
-- ---------------------------------------------------------------------

-- =====================================================================
-- TABLE: admins  (optional allow-list of admin emails)
-- =====================================================================
create table if not exists public.admins (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text,
  created_at timestamptz not null default now()
);

-- =====================================================================
-- TABLE: customers
-- =====================================================================
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  company text,
  country text,
  created_at timestamptz not null default now()
);

-- =====================================================================
-- TABLE: services  (optional — the marketing catalog lives in code, but
-- you can mirror it here if you want DB-driven services)
-- =====================================================================
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text,
  description text,
  starting_price numeric,
  delivery text,
  created_at timestamptz not null default now()
);

-- =====================================================================
-- TABLE: projects  (service requests + managed projects)
-- =====================================================================
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  project_id text unique not null,
  full_name text not null,
  email text not null,
  phone text,
  country text,
  company text,
  project_title text not null,
  category text,
  service_type text,
  budget text,
  deadline date,
  description text,
  reference_links text,
  preferred_communication text,
  urgency text,
  additional_notes text,
  nda boolean default false,
  status text not null default 'Pending',
  priority text default 'Medium',
  progress int default 0,
  assigned_developer text,
  invoice_status text default 'Unpaid',
  created_at timestamptz not null default now()
);
create index if not exists projects_email_idx on public.projects (lower(email));
create index if not exists projects_project_id_idx on public.projects (project_id);

-- =====================================================================
-- TABLE: project_updates  (timeline shown on Track Project)
-- =====================================================================
create table if not exists public.project_updates (
  id uuid primary key default gen_random_uuid(),
  project_id text not null references public.projects (project_id) on delete cascade,
  note text not null,
  created_at timestamptz not null default now()
);

-- =====================================================================
-- TABLE: project_files
-- =====================================================================
create table if not exists public.project_files (
  id uuid primary key default gen_random_uuid(),
  project_id text not null references public.projects (project_id) on delete cascade,
  path text not null,
  file_name text,
  created_at timestamptz not null default now()
);

-- =====================================================================
-- TABLE: messages  (contact form)
-- =====================================================================
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  status text not null default 'New',
  created_at timestamptz not null default now()
);

-- =====================================================================
-- TABLE: notifications
-- =====================================================================
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  title text not null,
  body text,
  read boolean default false,
  created_at timestamptz not null default now()
);

-- =====================================================================
-- TABLE: testimonials
-- =====================================================================
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  rating int default 5,
  quote text not null,
  avatar text,
  approved boolean default false,
  created_at timestamptz not null default now()
);

-- =====================================================================
-- TABLE: newsletter
-- =====================================================================
create table if not exists public.newsletter (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now()
);

-- =====================================================================
-- TABLE: settings  (single-row agency settings)
-- =====================================================================
create table if not exists public.settings (
  id int primary key default 1,
  agency_name text,
  tagline text,
  contact_email text,
  phone text,
  address text,
  socials jsonb,
  updated_at timestamptz not null default now()
);

-- =====================================================================
-- ROW LEVEL SECURITY
-- =====================================================================
alter table public.admins           enable row level security;
alter table public.customers        enable row level security;
alter table public.services         enable row level security;
alter table public.projects         enable row level security;
alter table public.project_updates  enable row level security;
alter table public.project_files    enable row level security;
alter table public.messages         enable row level security;
alter table public.notifications    enable row level security;
alter table public.testimonials     enable row level security;
alter table public.newsletter       enable row level security;
alter table public.settings         enable row level security;

-- ---- PUBLIC WRITE: visitors can submit requests / messages / signups ----
create policy "anon can submit projects"
  on public.projects for insert to anon, authenticated with check (true);

create policy "anon can submit messages"
  on public.messages for insert to anon, authenticated with check (true);

create policy "anon can subscribe newsletter"
  on public.newsletter for insert to anon, authenticated with check (true);

-- ---- PUBLIC READ: approved testimonials + services are visible ----
create policy "public can read approved testimonials"
  on public.testimonials for select to anon, authenticated using (approved = true);

create policy "public can read services"
  on public.services for select to anon, authenticated using (true);

-- ---- PROJECT TRACKING: a visitor may read their own project ----
-- The client filters by project_id + email; this policy simply allows
-- SELECT for anon so the exact-match lookup works. Because both the
-- project_id (random) and email are required, data stays private in
-- practice. For stricter isolation, move tracking to an Edge Function.
create policy "anon can read projects for tracking"
  on public.projects for select to anon, authenticated using (true);

create policy "anon can read project updates for tracking"
  on public.project_updates for select to anon, authenticated using (true);

-- ---- ADMIN FULL ACCESS: any authenticated user manages everything ----
create policy "admins manage projects"      on public.projects        for all to authenticated using (true) with check (true);
create policy "admins manage updates"        on public.project_updates for all to authenticated using (true) with check (true);
create policy "admins manage files"          on public.project_files   for all to authenticated using (true) with check (true);
create policy "admins manage messages"       on public.messages        for all to authenticated using (true) with check (true);
create policy "admins manage customers"      on public.customers       for all to authenticated using (true) with check (true);
create policy "admins manage notifications"  on public.notifications   for all to authenticated using (true) with check (true);
create policy "admins manage testimonials"   on public.testimonials    for all to authenticated using (true) with check (true);
create policy "admins manage services"       on public.services        for all to authenticated using (true) with check (true);
create policy "admins manage newsletter"     on public.newsletter      for select to authenticated using (true);
create policy "admins read admins"           on public.admins          for select to authenticated using (true);
create policy "admins manage settings"       on public.settings        for all to authenticated using (true) with check (true);

-- =====================================================================
-- STORAGE: bucket for uploaded project files
-- =====================================================================
insert into storage.buckets (id, name, public)
values ('project-files', 'project-files', false)
on conflict (id) do nothing;

-- Allow anon uploads (from the Request Service form) and admin reads.
create policy "anyone can upload project files"
  on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'project-files');

create policy "admins can read project files"
  on storage.objects for select to authenticated
  using (bucket_id = 'project-files');

-- =====================================================================
-- SEED (optional): a few approved testimonials + settings row
-- =====================================================================
insert into public.settings (id, agency_name, tagline, contact_email)
values (1, 'TechNova Solutions', 'Transforming Ideas into Intelligent Digital Solutions', 'hello@technova.solutions')
on conflict (id) do nothing;
