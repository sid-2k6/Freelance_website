import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUser,
  FiFileText,
  FiSettings,
  FiCheckCircle,
  FiUploadCloud,
  FiCopy,
  FiArrowRight,
  FiArrowLeft,
} from 'react-icons/fi';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import { Spinner } from '../components/ui/Loader';
import Button from '../components/ui/Button';
import { services } from '../data/services';
import { budgetRanges } from '../data/pricing';
import { projectFilters } from '../data/projects';
import { createServiceRequest, uploadRequestFile } from '../services/api';
import { isSupabaseConfigured } from '../services/supabaseClient';
import { isValidEmail, isValidPhone, sanitizeText, cx } from '../utils/helpers';
import { useToast } from '../context/ToastContext';

const steps = [
  { id: 1, label: 'Your details', icon: FiUser },
  { id: 2, label: 'Project brief', icon: FiFileText },
  { id: 3, label: 'Preferences', icon: FiSettings },
];

const communicationOptions = ['Email', 'WhatsApp', 'Phone call', 'Video call', 'Slack'];
const urgencyOptions = ['Flexible', 'Standard', 'Priority', 'Urgent'];
const serviceTypes = services.map((s) => s.title);

const initialForm = {
  full_name: '',
  email: '',
  phone: '',
  country: '',
  company: '',
  project_title: '',
  category: '',
  service_type: '',
  budget: '',
  deadline: '',
  description: '',
  reference_links: '',
  preferred_communication: 'Email',
  urgency: 'Standard',
  additional_notes: '',
  nda: false,
  terms: false,
};

export default function RequestService() {
  const [params] = useSearchParams();
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { success, error } = useToast();

  // Pre-select the service if arriving from a service card.
  useEffect(() => {
    const slug = params.get('service');
    if (slug) {
      const svc = services.find((s) => s.slug === slug);
      if (svc) setForm((f) => ({ ...f, service_type: svc.title, category: svc.category }));
    }
  }, [params]);

  const update = (k) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: value }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const validateStep = (s) => {
    const errs = {};
    if (s === 1) {
      if (!form.full_name.trim()) errs.full_name = 'Required';
      if (!isValidEmail(form.email)) errs.email = 'Valid email required';
      if (form.phone && !isValidPhone(form.phone)) errs.phone = 'Invalid phone';
      if (!form.country.trim()) errs.country = 'Required';
    }
    if (s === 2) {
      if (!form.project_title.trim()) errs.project_title = 'Required';
      if (!form.service_type) errs.service_type = 'Please select a service';
      if (form.description.trim().length < 20) errs.description = 'Please describe your project (min 20 chars)';
    }
    if (s === 3) {
      if (!form.terms) errs.terms = 'You must accept the terms to continue';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(3, s + 1));
  };
  const back = () => setStep((s) => Math.max(1, s - 1));

  const submit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    setLoading(true);

    const payload = {
      full_name: sanitizeText(form.full_name),
      email: form.email.trim().toLowerCase(),
      phone: sanitizeText(form.phone),
      country: sanitizeText(form.country),
      company: sanitizeText(form.company),
      project_title: sanitizeText(form.project_title),
      category: form.category || 'AI',
      service_type: form.service_type,
      budget: form.budget,
      deadline: form.deadline || null,
      description: sanitizeText(form.description),
      reference_links: sanitizeText(form.reference_links),
      preferred_communication: form.preferred_communication,
      urgency: form.urgency,
      additional_notes: sanitizeText(form.additional_notes),
      nda: form.nda,
    };

    const { data, error: err, projectId } = await createServiceRequest(payload);
    if (err) {
      setLoading(false);
      error('Something went wrong submitting your request. Please try again.');
      return;
    }

    if (file) {
      await uploadRequestFile(file, projectId);
    }

    setLoading(false);
    setResult({ projectId, email: payload.email, createdAt: data?.created_at || new Date().toISOString() });
    success('Request submitted successfully!');
  };

  const progress = useMemo(() => (step / steps.length) * 100, [step]);

  if (result) {
    return (
      <section className="relative section-pad">
        <AnimatedBackground />
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-xl text-center"
          >
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
              <FiCheckCircle className="h-10 w-10" />
            </div>
            <h1 className="mt-6 font-display text-3xl font-bold text-slate-900 dark:text-white">
              Request received! 🎉
            </h1>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Thank you, {form.full_name.split(' ')[0]}. Your project has been logged and our team will
              reach out within one business day.
            </p>

            <div className="card-surface mt-8 p-6 text-left">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Your Project ID</p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <span className="font-display text-2xl font-extrabold text-gradient">{result.projectId}</span>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(result.projectId);
                    success('Project ID copied!');
                  }}
                  className="btn-ghost py-2 text-xs"
                >
                  <FiCopy className="h-4 w-4" /> Copy
                </button>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-sm dark:border-white/10">
                <div>
                  <p className="text-slate-400">Status</p>
                  <p className="font-semibold text-amber-600 dark:text-amber-400">Pending</p>
                </div>
                <div>
                  <p className="text-slate-400">Submitted</p>
                  <p className="font-semibold text-slate-800 dark:text-white">
                    {new Date(result.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                Save this ID — you'll need it (with your email) to track progress.
              </p>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button to={`/track`} icon={FiArrowRight} iconRight>
                Track your project
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setResult(null);
                  setForm(initialForm);
                  setFile(null);
                  setStep(1);
                }}
              >
                Submit another request
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative section-pad">
      <AnimatedBackground variant="minimal" />
      <div className="container-wide">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge border-brand-200 bg-brand-50 text-brand-600 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
            Request a Service
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Tell us about your project
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            A few quick details and you'll get a Project ID instantly. It only takes a couple of minutes.
          </p>
        </div>

        {!isSupabaseConfigured && (
          <div className="mx-auto mt-8 max-w-3xl rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
            Demo mode: Supabase isn't configured yet, so this request will be saved locally in your
            browser (still trackable). Add your Supabase keys to persist to the database.
          </div>
        )}

        {/* Stepper */}
        <div className="mx-auto mt-10 max-w-3xl">
          <div className="flex items-center justify-between">
            {steps.map((s) => {
              const Icon = s.icon;
              const done = step > s.id;
              const active = step === s.id;
              return (
                <div key={s.id} className="flex flex-1 flex-col items-center">
                  <div
                    className={cx(
                      'grid h-11 w-11 place-items-center rounded-full border-2 transition',
                      done
                        ? 'border-emerald-500 bg-emerald-500 text-white'
                        : active
                        ? 'border-brand-500 bg-brand-500 text-white shadow-glow'
                        : 'border-slate-300 bg-white text-slate-400 dark:border-white/10 dark:bg-white/5'
                    )}
                  >
                    {done ? <FiCheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <p className={cx('mt-2 text-xs font-medium', active ? 'text-brand-600 dark:text-brand-300' : 'text-slate-400')}>
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={submit} noValidate className="card-surface mx-auto mt-8 max-w-3xl p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name *" error={errors.full_name}>
                    <input className="input-field" value={form.full_name} onChange={update('full_name')} placeholder="Jane Doe" />
                  </Field>
                  <Field label="Email *" error={errors.email}>
                    <input type="email" className="input-field" value={form.email} onChange={update('email')} placeholder="jane@company.com" />
                  </Field>
                  <Field label="Phone" error={errors.phone}>
                    <input className="input-field" value={form.phone} onChange={update('phone')} placeholder="+1 555 123 4567" />
                  </Field>
                  <Field label="Country *" error={errors.country}>
                    <input className="input-field" value={form.country} onChange={update('country')} placeholder="United States" />
                  </Field>
                  <Field label="Company / Organization" className="sm:col-span-2">
                    <input className="input-field" value={form.company} onChange={update('company')} placeholder="Optional" />
                  </Field>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Project title *" error={errors.project_title} className="sm:col-span-2">
                    <input className="input-field" value={form.project_title} onChange={update('project_title')} placeholder="e.g. AI-powered document search" />
                  </Field>
                  <Field label="Project category">
                    <select className="input-field" value={form.category} onChange={update('category')}>
                      <option value="">Select category</option>
                      {projectFilters.filter((c) => c !== 'All').map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Service type *" error={errors.service_type}>
                    <select className="input-field" value={form.service_type} onChange={update('service_type')}>
                      <option value="">Select a service</option>
                      {serviceTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Budget">
                    <select className="input-field" value={form.budget} onChange={update('budget')}>
                      <option value="">Select budget range</option>
                      {budgetRanges.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Deadline">
                    <input type="date" className="input-field" value={form.deadline} onChange={update('deadline')} />
                  </Field>
                  <Field label="Description *" error={errors.description} className="sm:col-span-2">
                    <textarea rows={5} className="input-field resize-none" value={form.description} onChange={update('description')} placeholder="Describe goals, scope, features and any constraints…" />
                  </Field>
                  <Field label="Reference links" className="sm:col-span-2">
                    <input className="input-field" value={form.reference_links} onChange={update('reference_links')} placeholder="Figma, GitHub, competitor sites… (comma separated)" />
                  </Field>
                  <Field label="Upload a file" className="sm:col-span-2">
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 px-4 py-4 text-sm text-slate-500 transition hover:border-brand-400 dark:border-white/15 dark:text-slate-400">
                      <FiUploadCloud className="h-5 w-5 text-brand-500" />
                      <span>{file ? file.name : 'Attach a brief, spec or reference (PDF, DOCX, ZIP, images)'}</span>
                      <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                    </label>
                  </Field>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Preferred communication">
                    <select className="input-field" value={form.preferred_communication} onChange={update('preferred_communication')}>
                      {communicationOptions.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Urgency">
                    <select className="input-field" value={form.urgency} onChange={update('urgency')}>
                      {urgencyOptions.map((u) => (
                        <option key={u} value={u}>{u}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Additional notes" className="sm:col-span-2">
                    <textarea rows={4} className="input-field resize-none" value={form.additional_notes} onChange={update('additional_notes')} placeholder="Anything else we should know?" />
                  </Field>
                </div>

                <div className="mt-5 space-y-3">
                  <Checkbox checked={form.nda} onChange={update('nda')}>
                    I would like to sign an NDA before sharing sensitive details.
                  </Checkbox>
                  <Checkbox checked={form.terms} onChange={update('terms')}>
                    I agree to the <Link to="/faq" className="text-brand-600 underline">terms of service</Link> and privacy policy. *
                  </Checkbox>
                  {errors.terms && <p className="text-xs text-rose-500">{errors.terms}</p>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="mt-8 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button type="button" onClick={back} className="btn-ghost">
                <FiArrowLeft className="h-4 w-4" /> Back
              </button>
            ) : (
              <span />
            )}
            {step < 3 ? (
              <button type="button" onClick={next} className="btn-primary">
                Continue <FiArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? <Spinner /> : <FiCheckCircle className="h-4 w-4" />}
                Submit request
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, error, children, className }) {
  return (
    <div className={className}>
      <label className="label-field">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}

function Checkbox({ checked, onChange, children }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500 dark:border-white/20 dark:bg-white/5"
      />
      <span>{children}</span>
    </label>
  );
}
