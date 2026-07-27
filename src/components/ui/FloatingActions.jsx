import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { FiArrowUp, FiMessageCircle, FiX, FiSend } from 'react-icons/fi';
import { site } from '../../data/site';
import { useToast } from '../../context/ToastContext';

/**
 * Floating action cluster: WhatsApp button, a live-chat placeholder panel and
 * a scroll-to-top button that appears after scrolling.
 */
export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const { success } = useToast();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const sendChat = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    success('Thanks! Our team will reply shortly.');
    setMsg('');
    setChatOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass-strong w-72 overflow-hidden rounded-2xl shadow-soft sm:w-80"
          >
            <div className="flex items-center justify-between bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-3 text-white">
              <div>
                <p className="text-sm font-semibold">TechNova Live Chat</p>
                <p className="text-xs text-white/80">We typically reply in minutes</p>
              </div>
              <button onClick={() => setChatOpen(false)} aria-label="Close chat">
                <FiX className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-2 px-4 py-4">
              <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-slate-100 px-3 py-2 text-sm text-slate-700 dark:bg-white/10 dark:text-slate-200">
                👋 Hi there! How can we help you build something great today?
              </div>
              <form onSubmit={sendChat} className="flex items-center gap-2 pt-1">
                <input
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Type a message…"
                  className="input-field py-2 text-sm"
                />
                <button
                  type="submit"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-500 text-white transition hover:bg-brand-600"
                  aria-label="Send message"
                >
                  <FiSend className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-end gap-3">
        <AnimatePresence>
          {showTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-soft transition hover:text-brand-500 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300"
              aria-label="Scroll to top"
            >
              <FiArrowUp className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>

        <a
          href={`https://wa.me/${site.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="grid h-13 w-13 place-items-center rounded-full bg-[#25D366] p-3 text-white shadow-glow transition hover:scale-105"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="h-6 w-6" />
        </a>

        <button
          onClick={() => setChatOpen((v) => !v)}
          className="grid place-items-center rounded-full bg-gradient-to-r from-brand-600 to-brand-500 p-3 text-white shadow-glow transition hover:scale-105"
          aria-label="Open live chat"
        >
          {chatOpen ? <FiX className="h-6 w-6" /> : <FiMessageCircle className="h-6 w-6" />}
        </button>
      </div>
    </div>
  );
}
