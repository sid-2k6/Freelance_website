-- =====================================================================
-- Optional seed data for TechNova Solutions
-- Run AFTER schema.sql if you want sample content in a fresh database.
-- =====================================================================

-- Approved testimonials (shown publicly)
insert into public.testimonials (name, role, rating, quote, avatar, approved) values
  ('Ananya Rao', 'CTO, MediVision', 5, 'TechNova delivered a production ML pipeline our radiologists trust. Flawless communication and results beat our targets.', 'https://i.pravatar.cc/160?img=47', true),
  ('Marcus Feld', 'Founder, InsightFlow', 5, 'They turned a messy spreadsheet workflow into a gorgeous real-time dashboard in six weeks.', 'https://i.pravatar.cc/160?img=12', true),
  ('Priya Nair', 'Product Lead, ShopWave', 5, 'Conversion jumped 32% after the rebuild. The team cares about every detail.', 'https://i.pravatar.cc/160?img=32', true);

-- Sample notifications
insert into public.notifications (type, title, body, read) values
  ('order', 'New service request', 'A new Full Stack build request was submitted.', false),
  ('completed', 'Project completed', 'GNN Paper Reproduction marked complete.', true),
  ('deadline', 'Upcoming deadline', 'AI Diagnostic Imaging due in 7 weeks.', false),
  ('message', 'New message', 'A new inquiry arrived from the contact form.', false);

-- Sample projects
insert into public.projects
  (project_id, full_name, email, project_title, service_type, category, budget, status, priority, progress, assigned_developer, country, company, deadline, invoice_status)
values
  ('TNS-9F3K2Q', 'Ananya Rao', 'ananya@medivision.io', 'AI Diagnostic Imaging Platform', 'Computer Vision', 'AI', '₹50,000 – ₹1,00,000', 'Live', 'High', 65, 'Elena Voss', 'India', 'MediVision', '2026-09-15', 'Partially Paid'),
  ('TNS-7B2M8X', 'Marcus Feld', 'marcus@insightflow.co', 'Executive Analytics Dashboard', 'Power BI Dashboards', 'Dashboard', '₹25,000 – ₹50,000', 'Completed', 'Medium', 100, 'Kwame Osei', 'Germany', 'InsightFlow', '2026-06-20', 'Paid')
on conflict (project_id) do nothing;

-- Sample project updates for the tracking timeline
insert into public.project_updates (project_id, note, created_at) values
  ('TNS-9F3K2Q', 'Kickoff call completed and dataset received.', '2026-07-03T10:00:00Z'),
  ('TNS-9F3K2Q', 'Baseline segmentation model trained (91% Dice).', '2026-07-12T15:30:00Z'),
  ('TNS-9F3K2Q', 'Explainability heatmaps integrated into review UI.', '2026-07-22T09:45:00Z');
