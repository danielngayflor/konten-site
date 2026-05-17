import { useState } from 'react';
import Clapperboard from '../../ui/Clapperboard';

function InstagramIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function LinkedinIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function FacebookIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}
function TikTokIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.05a8.16 8.16 0 004.77 1.52V7.12a4.85 4.85 0 01-1-.43z" />
    </svg>
  );
}
function YouTubeIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/konten_lr',         icon: <InstagramIcon /> },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/kontenlr',   icon: <LinkedinIcon /> },
  { label: 'Facebook',  href: 'https://www.facebook.com/thekontenclub',      icon: <FacebookIcon /> },
  { label: 'TikTok',    href: 'https://www.tiktok.com/@kontenlr',            icon: <TikTokIcon /> },
  { label: 'YouTube',   href: 'https://www.youtube.com/@KontenKorner',       icon: <YouTubeIcon /> },
];

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

const projectTypes = [
  { value: 'one-off', label: 'One-off project' },
  { value: 'retainer', label: 'Ongoing retainer' },
  { value: 'workshop', label: 'Workshop / Training' },
  { value: 'exploring', label: 'Just exploring' },
];

const timeOfDayOptions = [
  { value: 'any', label: 'Any time' },
  { value: 'morning', label: 'Morning' },
  { value: 'afternoon', label: 'Afternoon' },
  { value: 'evening', label: 'Evening' },
];

export default function DiscoveryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    organisation: '',
    email: '',
    phone: '',
    serviceOfInterest: '',
    projectType: '',
    preferredDate: '',
    timeOfDay: 'any',
    projectDescription: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire up to Supabase (Step 10)
    console.log('Discovery request submitted:', formData);
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
  const labelClass = 'text-eyebrow text-konten-cream/70 block mb-1';

  return (
    <section
      id="discovery"
      className="bg-konten-black text-konten-cream py-32 md:py-40 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left column */}
        <div>
          <h2 className="font-spartan font-black text-konten-cream uppercase leading-none tracking-tighter text-[clamp(2rem,7.5vw,6.5rem)] mb-10">
            BOOK
            <br />
            A DISCOVERY
            <br />
            SESSION.
          </h2>
          <p className="font-inter text-[16px] md:text-[18px] leading-body text-konten-cream max-w-[500px] mb-12">
            Tell us a bit about your project. We'll get back within 48 hours
            to set up a free 30-minute discovery call — no obligation, no
            pitch deck. Just a real conversation about what you need and how
            we can help.
          </p>

        </div>

        {/* Right column - form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8"
        >
          <div>
            <label className={labelClass}>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Your name"
              value={formData.fullName}
              onChange={handleChange}
              className={fieldClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Organisation</label>
            <input
              type="text"
              name="organisation"
              placeholder="Where you're from"
              value={formData.organisation}
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
            <label className={labelClass}>Service of Interest</label>
            <select
              name="serviceOfInterest"
              value={formData.serviceOfInterest}
              onChange={handleChange}
              className={`${fieldClass} appearance-none cursor-pointer`}
              required
            >
              {serviceOptions.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className="bg-konten-black text-konten-cream"
                >
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Project Type</label>
            <div className="flex flex-wrap gap-3 mt-2">
              {projectTypes.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() =>
                    setFormData({ ...formData, projectType: opt.value })
                  }
                  className={`px-5 py-2 border-[1.5px] rounded-full font-inter font-500 text-[12px] uppercase tracking-wide transition-all ${
                    formData.projectType === opt.value
                      ? 'bg-konten-cream text-konten-blue border-konten-cream'
                      : 'border-konten-cream text-konten-cream hover:bg-konten-cream/10'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelClass}>Preferred Discovery Date</label>
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              className={`${fieldClass} [color-scheme:dark]`}
            />
          </div>

          <div>
            <label className={labelClass}>Time of Day</label>
            <select
              name="timeOfDay"
              value={formData.timeOfDay}
              onChange={handleChange}
              className={`${fieldClass} appearance-none cursor-pointer`}
            >
              {timeOfDayOptions.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className="bg-konten-black text-konten-cream"
                >
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Tell us about your project</label>
            <textarea
              name="projectDescription"
              placeholder="What's the story?"
              value={formData.projectDescription}
              onChange={handleChange}
              rows={4}
              className={fieldClass}
              required
            />
          </div>

          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-konten-cream text-konten-blue font-inter font-500 text-[14px] uppercase tracking-wide py-4 rounded-full hover:opacity-85 transition-opacity"
            >
              Submit request →
            </button>
          </div>
        </form>
      </div>

      {/* Contact + socials — below the form */}
      <div className="max-w-7xl mx-auto mt-16 pt-12 border-t-[1.5px] border-konten-cream/20 flex flex-col gap-5">
        <span className="text-eyebrow text-konten-cream inline-flex items-center gap-2">
          PREFER TO TALK? <Clapperboard size={14} />
        </span>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-inter text-[14px] md:text-[15px] text-konten-cream">
          <span>contact@konten.agency</span>
          <span className="text-konten-cream/40">·</span>
          <span>+231 886 888 438</span>
          <span className="text-konten-cream/40">·</span>
          <span>Monrovia, Liberia</span>
        </div>

        <div className="flex gap-5 text-konten-cream">
          {socials.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="hover:opacity-75 transition-opacity"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Toast */}
      {submitted && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-konten-cream text-konten-black px-8 py-4 rounded-full font-inter font-500 text-[14px] flex items-center gap-2 shadow-lg z-50">
          <Clapperboard size={16} className="text-konten-blue" />
          Request received. We'll be in touch within 48 hours.
        </div>
      )}
    </section>
  );
}
