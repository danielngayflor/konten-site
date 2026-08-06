import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { submitForm } from '../../lib/supabase';

const EASE = [0.25, 0, 0, 1] as const;

const serviceOptions = [
  { value: 'media-coverage',   label: 'Media Coverage & Documentary' },
  { value: 'social-and-story', label: 'Social & Story' },
  { value: 'creator-studio',   label: 'Creator Studio' },
];

interface BookingModalProps {
  serviceValue: string;
  serviceName: string;
  onClose: () => void;
}

export default function BookingModal({ serviceValue, serviceName, onClose }: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    brandCompany: '',
    email: '',
    phone: '',
    serviceInterest: serviceValue,
    message: '',
  });

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await submitForm('contact', formData);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Try emailing us at sales@konten.agency');
    } finally {
      setLoading(false);
    }
  };

  const fieldClass =
    'w-full bg-transparent border-b border-white/20 text-white placeholder-white/30 font-body text-[15px] py-3 focus:outline-none focus:border-white/50 transition-colors leading-[1.55]';
  const labelClass = 'text-eyebrow text-white/40 block mb-2';

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-konten-black/90"
          style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
          onClick={onClose}
        />

        {/* Panel */}
        <motion.div
          className="relative z-10 w-full max-w-xl bg-[#141414] rounded-2xl border border-white/10 overflow-y-auto max-h-[90vh]"
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 16 }}
          transition={{ duration: 0.3, ease: EASE }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between px-8 pt-8 pb-6 border-b border-white/10">
            <div>
              <p className="text-eyebrow text-mid-gray mb-2">{serviceName}</p>
              <h2 className="font-spartan font-black text-white uppercase leading-none tracking-tighter text-[clamp(1.6rem,3vw,2.4rem)]">
                Book a discovery call
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/30 hover:text-white transition-colors mt-1 ml-4 flex-shrink-0"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="px-8 py-8">
            {submitted ? (
              <div className="py-12 text-center">
                <p className="font-spartan font-black text-white uppercase leading-none tracking-tighter text-[2rem] mb-4">
                  Got it.
                </p>
                <p className="font-body text-body-lg text-white/60 leading-[1.65]">
                  We'll be in touch within 48 hours to set up the call.
                </p>
                <button
                  onClick={onClose}
                  className="mt-10 px-8 py-3 border border-white/25 text-white/70 font-spartan font-700 text-[12px] uppercase tracking-widest rounded-full hover:border-white/50 hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                <div>
                  <label className={labelClass}>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className={fieldClass}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Brand / Organisation</label>
                  <input
                    type="text"
                    name="brandCompany"
                    placeholder="Where you're from"
                    value={formData.brandCompany}
                    onChange={handleChange}
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={fieldClass}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+231 ..."
                    value={formData.phone}
                    onChange={handleChange}
                    className={fieldClass}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass}>Service</label>
                  <select
                    name="serviceInterest"
                    value={formData.serviceInterest}
                    onChange={handleChange}
                    className={`${fieldClass} appearance-none cursor-pointer`}
                    required
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-[#141414] text-white">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass}>Tell us about your project</label>
                  <textarea
                    name="message"
                    placeholder="What's the story?"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className={fieldClass}
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-konten-blue-bright text-white font-spartan font-700 text-[13px] uppercase tracking-widest py-4 rounded-full hover:bg-konten-blue-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending…' : 'Book a call →'}
                  </button>
                  {error && (
                    <p className="font-body text-[13px] text-white/40 text-center mt-3">{error}</p>
                  )}
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
