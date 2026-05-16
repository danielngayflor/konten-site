import { useState } from 'react';
import Clapperboard from '../../ui/Clapperboard';

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
  const [formData, setFormData] = useState({
    name: '',
    brandCompany: '',
    email: '',
    phone: '',
    serviceInterest: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire up to Supabase (Step 10)
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fieldClass =
    'w-full bg-transparent border-b-[1.5px] border-konten-cream/40 text-konten-cream placeholder-konten-cream/40 font-inter py-3 focus:outline-none focus:border-konten-cream transition-colors';
  const labelClass =
    'text-eyebrow text-konten-cream/70 block mb-1';

  return (
    <section
      id="contact"
      className="bg-konten-black text-konten-cream py-32 px-6 md:px-12"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[clamp(2rem,7.5vw,6.5rem)] font-spartan font-black text-konten-cream uppercase leading-none tracking-tighter mb-8">
            START YOUR STORY.
          </h2>
          <p className="font-inter text-konten-cream/90 text-[16px] md:text-[18px] leading-body max-w-[560px] mx-auto">
            Got a project in mind? Tell us what you're building and we'll show
            you what's possible. No decks, no fluff — just a real conversation.
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
                <option key={opt.value} value={opt.value} className="bg-konten-black text-konten-cream">
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

          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-konten-cream text-konten-black font-inter font-500 text-[14px] uppercase tracking-wide py-4 rounded-full hover:opacity-85 transition-opacity"
            >
              Send it →
            </button>
          </div>
        </form>

        {/* Toast */}
        {submitted && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-konten-cream text-konten-black px-8 py-4 rounded-full font-inter font-500 text-[14px] flex items-center gap-2 shadow-lg z-50">
            <Clapperboard size={16} className="text-konten-blue" />
            Got it. We'll be in touch.
          </div>
        )}
      </div>
    </section>
  );
}
