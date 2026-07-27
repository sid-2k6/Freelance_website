import { useState } from 'react';
import { FiSend, FiMail } from 'react-icons/fi';
import { subscribeNewsletter } from '../../services/api';
import { isValidEmail } from '../../utils/helpers';
import { useToast } from '../../context/ToastContext';
import { Spinner } from '../ui/Loader';

/** Newsletter subscription band. */
export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();

  const submit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      error('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    const { error: err } = await subscribeNewsletter(email.trim().toLowerCase());
    setLoading(false);
    if (err && err.code !== '23505') {
      error('Something went wrong. Please try again.');
      return;
    }
    success('You are subscribed! Welcome aboard 🎉');
    setEmail('');
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-accent-600 p-8 shadow-glow sm:p-12">
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
      <div className="relative mx-auto max-w-2xl text-center text-white">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/15 backdrop-blur">
          <FiMail className="h-6 w-6" />
        </div>
        <h3 className="font-display text-2xl font-bold sm:text-3xl">
          Stay ahead of the curve
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/80">
          Get engineering insights, case studies and product tips delivered to your inbox. No spam, ever.
        </p>
        <form onSubmit={submit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full rounded-xl border border-white/20 bg-white/15 px-4 py-3 text-sm text-white placeholder:text-white/60 outline-none backdrop-blur focus:ring-4 focus:ring-white/20"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-700 transition hover:bg-white/90 disabled:opacity-70"
          >
            {loading ? <Spinner /> : <FiSend className="h-4 w-4" />}
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
