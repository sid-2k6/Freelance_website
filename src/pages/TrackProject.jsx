import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiSearch,
  FiUser,
  FiCalendar,
  FiActivity,
  FiFileText,
  FiClock,
  FiCheckCircle,
} from 'react-icons/fi';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import { Spinner } from '../components/ui/Loader';
import { trackProject } from '../services/api';
import { isValidEmail, formatDate, timeAgo, statusStyle, cx } from '../utils/helpers';
import { useToast } from '../context/ToastContext';

export default function TrackProject() {
  const [email, setEmail] = useState('');
  const [projectId, setProjectId] = useState('');
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { error } = useToast();

  const submit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email) || !projectId.trim()) {
      error('Please enter a valid email and Project ID.');
      return;
    }
    setLoading(true);
    setNotFound(false);
    setProject(null);
    const { data, error: err } = await trackProject(email, projectId);
    setLoading(false);
    if (err || !data) {
      setNotFound(true);
      return;
    }
    setProject(data);
  };

  return (
    <section className="relative section-pad">
      <AnimatedBackground variant="minimal" />
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <span className="badge border-brand-200 bg-brand-50 text-brand-600 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
            Track Project
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Check your project status
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Enter the email and Project ID you received when you submitted your request.
          </p>
        </div>

        <form onSubmit={submit} className="card-surface mx-auto mt-10 max-w-2xl p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label-field">Email</label>
              <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
            </div>
            <div>
              <label className="label-field">Project ID</label>
              <input className="input-field uppercase" value={projectId} onChange={(e) => setProjectId(e.target.value)} placeholder="TNS-XXXXXX" />
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary mt-6 w-full">
            {loading ? <Spinner /> : <FiSearch className="h-4 w-4" />}
            Track project
          </button>
          <p className="mt-3 text-center text-xs text-slate-400">
            Tip: try <span className="font-semibold">ananya@medivision.io</span> / <span className="font-semibold">TNS-9F3K2Q</span> in demo mode.
          </p>
        </form>

        {notFound && (
          <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-center text-sm text-rose-600 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
            No matching project found. Double-check your email and Project ID.
          </div>
        )}

        {project && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-10 max-w-3xl space-y-6"
          >
            {/* Header card */}
            <div className="card-surface p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Project</p>
                  <h2 className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">
                    {project.project_title}
                  </h2>
                  <p className="mt-1 font-mono text-sm text-brand-500">{project.project_id}</p>
                </div>
                <span className={cx('badge', statusStyle(project.status))}>{project.status}</span>
              </div>

              {/* Progress */}
              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-600 dark:text-slate-300">Progress</span>
                  <span className="font-bold text-slate-900 dark:text-white">{project.progress ?? 0}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress ?? 0}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>

              {/* Meta grid */}
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <Meta icon={FiUser} label="Assigned team" value={project.assigned_developer || 'Being assigned'} />
                <Meta icon={FiCalendar} label="Expected delivery" value={formatDate(project.deadline)} />
                <Meta icon={FiFileText} label="Invoice status" value={project.invoice_status || 'Unpaid'} />
                <Meta icon={FiActivity} label="Service" value={project.service_type} />
                <Meta icon={FiCheckCircle} label="Category" value={project.category} />
                <Meta icon={FiClock} label="Submitted" value={formatDate(project.created_at)} />
              </div>
            </div>

            {/* Updates */}
            <div className="card-surface p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Recent updates</h3>
              {project.updates && project.updates.length > 0 ? (
                <ol className="mt-5 space-y-5 border-l-2 border-slate-200 pl-6 dark:border-white/10">
                  {project.updates.map((u, i) => (
                    <li key={i} className="relative">
                      <span className="absolute -left-[31px] top-1 grid h-4 w-4 place-items-center rounded-full bg-brand-500 ring-4 ring-white dark:ring-[#070b17]" />
                      <p className="text-sm text-slate-700 dark:text-slate-200">{u.note}</p>
                      <p className="mt-0.5 text-xs text-slate-400">{timeAgo(u.created_at)} · {formatDate(u.created_at)}</p>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  No updates yet — our team will post progress here as work advances.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function Meta({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 dark:border-white/5 dark:bg-white/5">
      <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
        <Icon className="h-3.5 w-3.5" /> {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-white">{value}</p>
    </div>
  );
}
