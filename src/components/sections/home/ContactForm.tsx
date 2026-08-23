// ContactForm.tsx Dynasty-inspired: white/light section, dark text
import { useState } from 'react';
import { submitForm } from '../../../lib/supabase';

const serviceOptions = [
  { value: '', label: 'Select a service' },
  { value: 'media-coverage', label: 'Media Coverage & Documentary' },
  { value: 'social-and-story', label: 'Social & Story' },
  { value: 'brand-and-comms', label: 'Brand & Comms' },
  { value: 'web-and-digital', label: 'Web & Digital' },
  { value: 'training-and-capacity', label: 'Training & Capacity' },
  { value: 'creator-studio', label: 'Creator Studio' },
  { value: 'not-sure', label: 'Not sure yet' },
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    brandCompany: '',
    email: '',
    phone: '',
    serviceInterest: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await submitForm('contact', formData);
      setSubmitted(true);
      setFormData({ name: '', brandCompany: '', email: '', phone: '', serviceInterest: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try emailing us directly at sales@konten.agency');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fieldClass =
    'w-full bg-transparent border-b-[1.5px] border-black/15 text-konten-black placeholder-black/30 font-body text-[15px] py-3 focus:outline-none focus:border-konten-blue transition-colors leading-[1.55]';
  const labelClass =
    'font-spartan font-700 text-[10px] uppercase tracking-[0.18em] text-black/40 block mb-2';

  return (
    <section
      id="contact"
      className="bg-white text-konten-black py-16 px-6 sm:px-10 md:py-20 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="font-body text-black/50 leading-[1.65] mb-6"
             style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)' }}>
            Anyone can point a camera at something now. What's rare is knowing what to point it at, when, and why.
          </p>
          <h2
            className="font-spartan font-black uppercase leading-none tracking-tighter text-konten-black mb-6"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 7rem)' }}
          >
            Tell Your
            <br />
            Story.
          </h2>
          <p className="font-body text-black/50 leading-[1.65] max-w-[460px]"
             style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)' }}>
            Got a project in mind? Tell us what you're working on and we'll
            show you what's possible.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
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
            <label className={labelClass}>Brand / Company</label>
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

          <div className="md:col-span-2">
            <label className={labelClass}>What are you looking for?</label>
            <select
              name="serviceInterest"
              value={formData.serviceInterest}
              onChange={handleChange}
              className={`${fieldClass} appearance-none cursor-pointer`}
              required
            >
              {serviceOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-white text-konten-black">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Tell us about your project</label>
            <textarea
              name="message"
              placeholder="What's the story?"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={fieldClass}
              required
            />
          </div>

          <div className="md:col-span-2 mt-4 space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-konten-blue text-white font-spartan font-700 text-[12px] uppercase
                         tracking-widest py-4 rounded-full hover:opacity-90 transition-opacity
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending…' : 'Start a conversation →'}
            </button>
            {error && (
              <p className="font-body text-[13px] text-black/40 text-center mt-2">{error}</p>
            )}
          </div>
        </form>
      </div>

      {/* Toast */}
      {submitted && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-konten-blue text-white px-8 py-4 rounded-full font-spartan font-700 text-[13px] uppercase tracking-widest flex items-center gap-2 shadow-lg z-50">
          Got it. We'll be in touch.
        </div>
      )}
    </section>
  );
}
