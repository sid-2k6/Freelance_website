import { useState } from 'react';
import { FiSave, FiSun, FiMoon, FiGlobe, FiMail, FiImage } from 'react-icons/fi';
import Logo from '../../components/ui/Logo';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { site, socialLinks } from '../../data/site';
import { cx } from '../../utils/helpers';

const STORAGE_KEY = 'technova-admin-settings';

function loadSettings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
  } catch {
    return null;
  }
}

export default function AdminSettings() {
  const { theme, setTheme } = useTheme();
  const { success } = useToast();
  const stored = loadSettings();

  const [form, setForm] = useState(
    stored || {
      agencyName: site.name,
      tagline: site.tagline,
      email: site.email,
      phone: site.phone,
      address: site.address,
      github: socialLinks[0].url,
      linkedin: socialLinks[1].url,
      twitter: socialLinks[2].url,
    }
  );

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = (e) => {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    success('Settings saved.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Manage agency information, branding and theme.</p>
      </div>

      <form onSubmit={save} className="grid gap-6 lg:grid-cols-3">
        {/* Agency info */}
        <div className="card-surface p-6 lg:col-span-2">
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-slate-900 dark:text-white">
            <FiGlobe className="h-5 w-5 text-brand-500" /> Agency Information
          </h3>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="label-field">Agency name</label>
              <input className="input-field" value={form.agencyName} onChange={update('agencyName')} />
            </div>
            <div className="sm:col-span-2">
              <label className="label-field">Tagline</label>
              <input className="input-field" value={form.tagline} onChange={update('tagline')} />
            </div>
            <div>
              <label className="label-field">Contact email</label>
              <input type="email" className="input-field" value={form.email} onChange={update('email')} />
            </div>
            <div>
              <label className="label-field">Phone</label>
              <input className="input-field" value={form.phone} onChange={update('phone')} />
            </div>
            <div className="sm:col-span-2">
              <label className="label-field">Address</label>
              <input className="input-field" value={form.address} onChange={update('address')} />
            </div>
          </div>

          <h3 className="mt-8 flex items-center gap-2 font-display text-lg font-semibold text-slate-900 dark:text-white">
            <FiMail className="h-5 w-5 text-brand-500" /> Social Links
          </h3>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            <div>
              <label className="label-field">GitHub</label>
              <input className="input-field" value={form.github} onChange={update('github')} />
            </div>
            <div>
              <label className="label-field">LinkedIn</label>
              <input className="input-field" value={form.linkedin} onChange={update('linkedin')} />
            </div>
            <div>
              <label className="label-field">Twitter</label>
              <input className="input-field" value={form.twitter} onChange={update('twitter')} />
            </div>
          </div>

          <button type="submit" className="btn-primary mt-8">
            <FiSave className="h-4 w-4" /> Save changes
          </button>
        </div>

        {/* Branding + theme */}
        <div className="space-y-6">
          <div className="card-surface p-6">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-slate-900 dark:text-white">
              <FiImage className="h-5 w-5 text-brand-500" /> Logo
            </h3>
            <div className="mt-5 flex items-center gap-4">
              <Logo className="h-16 w-16" />
              <div>
                <p className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  Tech<span className="text-gradient">Nova</span>
                </p>
                <p className="text-xs text-slate-400">Vector logo · scales crisply</p>
              </div>
            </div>
          </div>

          <div className="card-surface p-6">
            <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Theme</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Choose the console appearance.</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { key: 'light', label: 'Light', icon: FiSun },
                { key: 'dark', label: 'Dark', icon: FiMoon },
              ].map((opt) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setTheme(opt.key)}
                    className={cx(
                      'flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition',
                      theme === opt.key
                        ? 'border-brand-500 bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300'
                        : 'border-slate-200 text-slate-500 dark:border-white/10 dark:text-slate-300'
                    )}
                  >
                    <Icon className="h-4 w-4" /> {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
