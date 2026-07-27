import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiMessageCircle,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import SectionHeading from '../components/ui/SectionHeading';
import { Spinner } from '../components/ui/Loader';
import { site, socialLinks } from '../data/site';
import { createMessage } from '../services/api';
import { isValidEmail, sanitizeText } from '../utils/helpers';
import { useToast } from '../context/ToastContext';
import { fadeInUp } from '../utils/motion';

const initial = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Please enter your name.';
    if (!isValidEmail(form.email)) errs.email = 'Enter a valid email address.';
    if (!form.subject.trim()) errs.subject = 'Please add a subject.';
    if (form.message.trim().length < 10) errs.message = 'Message should be at least 10 characters.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const { error: err } = await createMessage({
      name: sanitizeText(form.name),
      email: form.email.trim().toLowerCase(),
      subject: sanitizeText(form.subject),
      message: sanitizeText(form.message),
    });
    setLoading(false);
    if (err) {
      error('Could not send your message. Please try again.');
      return;
    }
    success('Message sent! We will get back to you shortly.');
    setForm(initial);
  };

  const details = [
    { icon: FiMail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
    { icon: FiPhone, label: 'Phone', value: site.phone, href: `tel:${site.phone}` },
    { icon: FiMapPin, label: 'Office', value: site.address },
    { icon: FiClock, label: 'Business hours', value: site.hours },
  ];

  return (
    <div>
      <section className="relative section-pad pb-10">
        <AnimatedBackground variant="minimal" />
        <div className="container-wide">
          <SectionHeading
            eyebrow="Contact"
            title="Let's start a conversation"
            subtitle="Whether you have a fully-specced brief or just an idea, we'd love to hear from you."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            {/* Info column */}
            <motion.div variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
              <div className="card-surface p-6">
                <div className="space-y-5">
                  {details.map((d) => {
                    const Icon = d.icon;
                    const content = (
                      <>
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{d.label}</p>
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{d.value}</p>
                        </div>
                      </>
                    );
                    return d.href ? (
                      <a key={d.label} href={d.href} className="flex items-center gap-4 transition hover:opacity-80">
                        {content}
                      </a>
                    ) : (
                      <div key={d.label} className="flex items-center gap-4">
                        {content}
                      </div>
                    );
                  })}
                </div>

                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  <FaWhatsapp className="h-5 w-5" /> Chat on WhatsApp
                </a>

                <div className="mt-5 flex items-center gap-2">
                  {socialLinks.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.name}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.name}
                        className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white/70 text-slate-500 transition hover:-translate-y-0.5 hover:text-brand-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="card-surface overflow-hidden">
                <div className="relative h-56 bg-gradient-to-br from-brand-500/20 to-accent-500/20">
                  <div className="bg-grid-light bg-grid absolute inset-0 opacity-60 dark:bg-grid-dark" />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="flex flex-col items-center text-center">
                      <FiMapPin className="h-10 w-10 text-brand-500" />
                      <p className="mt-2 font-semibold text-slate-700 dark:text-slate-200">TechNova HQ</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{site.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form column */}
            <motion.form
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              onSubmit={submit}
              noValidate
              className="card-surface p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="label-field" htmlFor="c-name">Full name</label>
                  <input id="c-name" className="input-field" value={form.name} onChange={update('name')} placeholder="Jane Doe" />
                  {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
                </div>
                <div>
                  <label className="label-field" htmlFor="c-email">Email</label>
                  <input id="c-email" type="email" className="input-field" value={form.email} onChange={update('email')} placeholder="jane@company.com" />
                  {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email}</p>}
                </div>
              </div>
              <div className="mt-5">
                <label className="label-field" htmlFor="c-subject">Subject</label>
                <input id="c-subject" className="input-field" value={form.subject} onChange={update('subject')} placeholder="How can we help?" />
                {errors.subject && <p className="mt-1 text-xs text-rose-500">{errors.subject}</p>}
              </div>
              <div className="mt-5">
                <label className="label-field" htmlFor="c-message">Message</label>
                <textarea id="c-message" rows={6} className="input-field resize-none" value={form.message} onChange={update('message')} placeholder="Tell us about your project or question…" />
                {errors.message && <p className="mt-1 text-xs text-rose-500">{errors.message}</p>}
              </div>
              <button type="submit" disabled={loading} className="btn-primary mt-6 w-full">
                {loading ? <Spinner /> : <FiSend className="h-4 w-4" />}
                Send message
              </button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-400">
                <FiMessageCircle className="h-3.5 w-3.5" /> We typically reply within one business day.
              </p>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
}
