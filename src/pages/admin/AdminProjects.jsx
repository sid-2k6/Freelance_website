import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiFilter,
} from 'react-icons/fi';
import Modal from '../../components/ui/Modal';
import { Spinner, Skeleton } from '../../components/ui/Loader';
import {
  getProjects,
  updateProject,
  deleteProject,
  createProject,
} from '../../services/api';
import { services } from '../../data/services';
import { budgetRanges } from '../../data/pricing';
import { projectFilters } from '../../data/projects';
import {
  statusStyle,
  priorityStyle,
  formatDate,
  formatCurrency,
  cx,
} from '../../utils/helpers';
import { useToast } from '../../context/ToastContext';

const STATUSES = ['Pending', 'Live', 'On Hold', 'Completed', 'Cancelled', 'Archived'];
const PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'];

const emptyForm = {
  full_name: '',
  email: '',
  project_title: '',
  service_type: services[0]?.title || '',
  category: 'AI',
  budget: budgetRanges[2],
  status: 'Pending',
  priority: 'Medium',
  progress: 0,
  assigned_developer: '',
  deadline: '',
  invoice_status: 'Unpaid',
};

export default function AdminProjects() {
  const [params] = useSearchParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(params.get('q') || '');
  const [statusFilter, setStatusFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [viewProject, setViewProject] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const { success, error } = useToast();

  const load = () => {
    setLoading(true);
    getProjects().then(({ data }) => {
      setProjects(data || []);
      setLoading(false);
    });
  };

  useEffect(load, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchStatus = statusFilter === 'All' || p.status === statusFilter;
      const matchQuery =
        !q ||
        [p.project_title, p.full_name, p.email, p.project_id, p.service_type]
          .filter(Boolean)
          .some((v) => v.toLowerCase().includes(q));
      return matchStatus && matchQuery;
    });
  }, [projects, query, statusFilter]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      full_name: p.full_name || '',
      email: p.email || '',
      project_title: p.project_title || '',
      service_type: p.service_type || services[0]?.title,
      category: p.category || 'AI',
      budget: p.budget || budgetRanges[2],
      status: p.status || 'Pending',
      priority: p.priority || 'Medium',
      progress: p.progress ?? 0,
      assigned_developer: p.assigned_developer || '',
      deadline: p.deadline ? p.deadline.slice(0, 10) : '',
      invoice_status: p.invoice_status || 'Unpaid',
    });
    setModalOpen(true);
  };

  const update = (k) => (e) => {
    const value = k === 'progress' ? Number(e.target.value) : e.target.value;
    setForm((f) => ({ ...f, [k]: value }));
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    if (editing) {
      const { error: err } = await updateProject(editing.id, form);
      if (err) {
        error('Failed to update project.');
        setSaving(false);
        return;
      }
      setProjects((prev) => prev.map((p) => (p.id === editing.id ? { ...p, ...form } : p)));
      success('Project updated.');
    } else {
      const { data, error: err } = await createProject(form);
      if (err) {
        error('Failed to create project.');
        setSaving(false);
        return;
      }
      setProjects((prev) => [data, ...prev]);
      success('Project created.');
    }
    setSaving(false);
    setModalOpen(false);
  };

  const changeStatus = async (p, status) => {
    setProjects((prev) => prev.map((x) => (x.id === p.id ? { ...x, status } : x)));
    await updateProject(p.id, { status });
    success(`Status set to ${status}.`);
  };

  const remove = async (p) => {
    if (!window.confirm(`Delete project "${p.project_title}"? This cannot be undone.`)) return;
    setProjects((prev) => prev.filter((x) => x.id !== p.id));
    await deleteProject(p.id);
    success('Project deleted.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Projects</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage, assign and track all client projects.
          </p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <FiPlus className="h-4 w-4" /> New Project
        </button>
      </div>

      {/* Toolbar */}
      <div className="card-surface flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, client, email or ID…"
            className="input-field pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <FiFilter className="h-4 w-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field py-2.5"
          >
            <option value="All">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400 dark:bg-white/5">
              <tr>
                <th className="px-5 py-3">Project</th>
                <th className="px-5 py-3">Client</th>
                <th className="px-5 py-3">Service</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Priority</th>
                <th className="px-5 py-3">Progress</th>
                <th className="px-5 py-3">Deadline</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={8} className="px-5 py-3">
                      <Skeleton className="h-10 w-full" />
                    </td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-16 text-center text-slate-400">
                    No projects found.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="transition hover:bg-slate-50/60 dark:hover:bg-white/5">
                    <td className="px-5 py-3">
                      <p className="font-medium text-slate-800 dark:text-slate-100">{p.project_title}</p>
                      <p className="font-mono text-xs text-brand-500">{p.project_id}</p>
                    </td>
                    <td className="px-5 py-3">
                      <p className="text-slate-700 dark:text-slate-200">{p.full_name}</p>
                      <p className="text-xs text-slate-400">{p.company || p.country}</p>
                    </td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{p.service_type}</td>
                    <td className="px-5 py-3">
                      <select
                        value={p.status}
                        onChange={(e) => changeStatus(p, e.target.value)}
                        className={cx('rounded-lg border px-2 py-1 text-xs font-semibold outline-none', statusStyle(p.status))}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s} className="bg-white text-slate-800 dark:bg-slate-800 dark:text-white">
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-3">
                      <span className={cx('badge', priorityStyle(p.priority))}>{p.priority || 'Medium'}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                          <div className="h-full rounded-full bg-brand-500" style={{ width: `${p.progress ?? 0}%` }} />
                        </div>
                        <span className="text-xs text-slate-500">{p.progress ?? 0}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{formatDate(p.deadline)}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => setViewProject(p)} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-brand-500 dark:hover:bg-white/5" aria-label="View">
                          <FiEye className="h-4 w-4" />
                        </button>
                        <button onClick={() => openEdit(p)} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-brand-500 dark:hover:bg-white/5" aria-label="Edit">
                          <FiEdit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => remove(p)} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-500/10" aria-label="Delete">
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Project' : 'New Project'} size="lg">
        <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label-field">Client name</label>
            <input required className="input-field" value={form.full_name} onChange={update('full_name')} />
          </div>
          <div>
            <label className="label-field">Client email</label>
            <input required type="email" className="input-field" value={form.email} onChange={update('email')} />
          </div>
          <div className="sm:col-span-2">
            <label className="label-field">Project title</label>
            <input required className="input-field" value={form.project_title} onChange={update('project_title')} />
          </div>
          <div>
            <label className="label-field">Service</label>
            <select className="input-field" value={form.service_type} onChange={update('service_type')}>
              {services.map((s) => (
                <option key={s.slug} value={s.title}>{s.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-field">Category</label>
            <select className="input-field" value={form.category} onChange={update('category')}>
              {projectFilters.filter((c) => c !== 'All').map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-field">Budget</label>
            <select className="input-field" value={form.budget} onChange={update('budget')}>
              {budgetRanges.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-field">Assigned developer</label>
            <input className="input-field" value={form.assigned_developer} onChange={update('assigned_developer')} placeholder="e.g. Elena Voss" />
          </div>
          <div>
            <label className="label-field">Status</label>
            <select className="input-field" value={form.status} onChange={update('status')}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-field">Priority</label>
            <select className="input-field" value={form.priority} onChange={update('priority')}>
              {PRIORITIES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-field">Deadline</label>
            <input type="date" className="input-field" value={form.deadline} onChange={update('deadline')} />
          </div>
          <div>
            <label className="label-field">Invoice status</label>
            <select className="input-field" value={form.invoice_status} onChange={update('invoice_status')}>
              {['Unpaid', 'Partially Paid', 'Paid', 'Refunded'].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="label-field">Progress: {form.progress}%</label>
            <input type="range" min="0" max="100" value={form.progress} onChange={update('progress')} className="w-full accent-brand-500" />
          </div>
          <div className="sm:col-span-2 mt-2 flex justify-end gap-3">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-ghost">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary">
              {saving && <Spinner />} {editing ? 'Save changes' : 'Create project'}
            </button>
          </div>
        </form>
      </Modal>

      {/* View modal */}
      <Modal open={Boolean(viewProject)} onClose={() => setViewProject(null)} title="Project Details">
        {viewProject && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  {viewProject.project_title}
                </h4>
                <p className="font-mono text-sm text-brand-500">{viewProject.project_id}</p>
              </div>
              <span className={cx('badge', statusStyle(viewProject.status))}>{viewProject.status}</span>
            </div>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <Detail label="Client" value={viewProject.full_name} />
              <Detail label="Email" value={viewProject.email} />
              <Detail label="Company" value={viewProject.company || '—'} />
              <Detail label="Country" value={viewProject.country || '—'} />
              <Detail label="Service" value={viewProject.service_type} />
              <Detail label="Category" value={viewProject.category} />
              <Detail label="Budget" value={viewProject.budget} />
              <Detail label="Priority" value={viewProject.priority} />
              <Detail label="Assigned" value={viewProject.assigned_developer || 'Unassigned'} />
              <Detail label="Progress" value={`${viewProject.progress ?? 0}%`} />
              <Detail label="Deadline" value={formatDate(viewProject.deadline)} />
              <Detail label="Invoice" value={viewProject.invoice_status} />
            </dl>
            {viewProject.description && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Description</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{viewProject.description}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</dt>
      <dd className="mt-0.5 font-medium text-slate-800 dark:text-slate-100">{value}</dd>
    </div>
  );
}
