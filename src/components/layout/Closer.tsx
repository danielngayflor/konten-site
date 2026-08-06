import { useState } from 'react';
import { submitForm } from '../../lib/supabase';

function InstagramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FacebookIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function TikTokIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.05a8.16 8.16 0 004.77 1.52V7.12a4.85 4.85 0 01-1-.43z" />
    </svg>
  );
}

function YouTubeIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function Closer() {
  const [emailInput, setEmailInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitForm('newsletter', { email: emailInput });
      setSubmitted(true);
      setEmailInput('');
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const socials = [
    { label: 'Instagram', href: 'https://www.instagram.com/konten_lr', icon: <InstagramIcon size={22} /> },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/kontenlr', icon: <LinkedinIcon size={22} /> },
    { label: 'Facebook', href: 'https://www.facebook.com/thekontenclub', icon: <FacebookIcon size={22} /> },
    { label: 'TikTok', href: 'https://www.tiktok.com/@kontenlr', icon: <TikTokIcon size={22} /> },
    { label: 'YouTube', href: 'https://www.youtube.com/@KontenKorner', icon: <YouTubeIcon size={22} /> },
  ];

  return (
    <footer className="relative w-full bg-konten-black text-white pt-[120px] pb-[80px] px-8 overflow-hidden border-t border-border-gray">

      <div className="max-w-7xl mx-auto">

        {/* Lower section — single left-aligned column */}
        <div className="flex flex-col gap-8 max-w-2xl">

          {/* Newsletter */}
          <div>
            <p className="font-spartan font-black text-[clamp(1.2rem,2.2vw,1.7rem)] uppercase leading-tight mb-5 tracking-tight text-white">
              Sign up for stories worth telling
            </p>
            {submitted ? (
              <p className="font-inter text-[15px] text-white/60">
                You're on the list. We'll be in touch.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 bg-transparent border-b-[1.5px] border-white/20 text-white placeholder-white/30 font-inter py-3 focus:outline-none focus:border-white/50 transition-colors"
                  required
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-[10px] bg-konten-blue-bright text-white font-spartan font-700 text-[12px] uppercase tracking-widest rounded-full hover:bg-konten-blue-hover transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending…' : 'Submit'}
                </button>
              </form>
            )}
          </div>

          {/* Contact info — one line */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-body text-mid-gray text-[14px] md:text-[15px]">
            <span>sales@konten.agency</span>
            <span className="text-white/20">·</span>
            <span>+231 776 049 390</span>
            <span className="text-white/20">·</span>
            <span>+231 880 532 429</span>
            <span className="text-white/20">·</span>
            <span>Monrovia, Liberia</span>
          </div>

          {/* Socials */}
          <div className="flex gap-5">
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
      </div>
    </footer>
  );
}
