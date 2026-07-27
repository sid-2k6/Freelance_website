import { useEffect, useState } from 'react';
import { FiDownload, FiFileText, FiFile, FiPrinter } from 'react-icons/fi';
import { Skeleton } from '../../components/ui/Loader';
import { getProjects, getMessages } from '../../services/api';
import { toCSV, downloadFile, formatDate } from '../../utils/helpers';
import { useToast } from '../../context/ToastContext';

export default function AdminReports() {
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { success } = useToast();

  useEffect(() => {
    Promise.all([getProjects(), getMessages()]).then(([p, m]) => {
      setProjects(p.data || []);
      setMessages(m.data || []);
      setLoading(false);
    });
  }, []);

  const exportProjectsCSV = () => {
    const rows = projects.map((p) => ({
      project_id: p.project_id,
      title: p.project_title,
      client: p.full_name,
      email: p.email,
      service: p.service_type,
      category: p.category,
      status: p.status,
      priority: p.priority,
      progress: p.progress,
      budget: p.budget,
      deadline: formatDate(p.deadline),
      created: formatDate(p.created_at),
    }));
    downloadFile('technova-projects.csv', toCSV(rows), 'text/csv');
    success('Projects report exported.');
  };

  const exportMessagesCSV = () => {
    const rows = messages.map((m) => ({
      name: m.name,
      email: m.email,
      subject: m.subject,
      status: m.status,
      created: formatDate(m.created_at),
    }));
    downloadFile('technova-messages.csv', toCSV(rows), 'text/csv');
    success('Messages report exported.');
  };

  // PDF export via the browser's print-to-PDF (no paid libraries needed).
  const exportPDF = () => {
    const win = window.open('', '_blank');
    if (!win) return;
    const rows = projects
      .map(
        (p) =>
          `<tr><td>${p.project_id}</td><td>${p.project_title}</td><td>${p.full_name}</td><td>${p.status}</td><td>${p.progress ?? 0}%</td><td>${formatDate(p.deadline)}</td></tr>`
      )
      .join('');
    win.document.write(`
      <html><head><title>TechNova Projects Report</title>
      <style>
        body{font-family:Inter,Arial,sans-serif;padding:40px;color:#0f172a}
        h1{color:#3563ff}
        table{width:100%;border-collapse:collapse;margin-top:20px;font-size:13px}
        th,td{border:1px solid #e2e8f0;padding:8px 10px;text-align:left}
        th{background:#f1f5f9}
      </style></head><body>
      <h1>TechNova Solutions — Projects Report</h1>
      <p>Generated ${new Date().toLocaleString()} · ${projects.length} projects</p>
      <table><thead><tr><th>ID</th><th>Title</th><th>Client</th><th>Status</th><th>Progress</th><th>Deadline</th></tr></thead>
      <tbody>${rows}</tbody></table>
      </body></html>`);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 400);
    success('Opening printable PDF…');
  };

  const reports = [
    {
      title: 'Projects Report (CSV)',
      desc: `Export all ${projects.length} projects with full details.`,
      icon: FiFileText,
      action: exportProjectsCSV,
      label: 'Export CSV',
    },
    {
      title: 'Messages Report (CSV)',
      desc: `Export all ${messages.length} inbound messages.`,
      icon: FiFile,
      action: exportMessagesCSV,
      label: 'Export CSV',
    },
    {
      title: 'Projects Report (PDF)',
      desc: 'Generate a printable, PDF-ready projects summary.',
      icon: FiPrinter,
      action: exportPDF,
      label: 'Export PDF',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Reports</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Export your data as CSV or a printable PDF — no third-party services required.
        </p>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-44 w-full" />)}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          {reports.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.title} className="card-surface flex flex-col p-6">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-slate-900 dark:text-white">{r.title}</h3>
                <p className="mt-1 flex-1 text-sm text-slate-500 dark:text-slate-400">{r.desc}</p>
                <button onClick={r.action} className="btn-primary mt-5 w-full">
                  <FiDownload className="h-4 w-4" /> {r.label}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
