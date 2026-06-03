import { useState } from 'react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire up email signup to Supabase
    console.log('Email signup:', emailInput);
    setEmailInput('');
  };

  const socials = [
    { label: 'Instagram', href: 'https://www.instagram.com/konten_lr', icon: <InstagramIcon size={22} /> },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/kontenlr', icon: <LinkedinIcon size={22} /> },
    { label: 'Facebook', href: 'https://www.facebook.com/thekontenclub', icon: <FacebookIcon size={22} /> },
    { label: 'TikTok', href: 'https://www.tiktok.com/@kontenlr', icon: <TikTokIcon size={22} /> },
    { label: 'YouTube', href: 'https://www.youtube.com/@KontenKorner', icon: <YouTubeIcon size={22} /> },
  ];

  return (
    <footer className="relative w-full bg-konten-blue text-konten-cream pt-[120px] pb-[80px] px-8 overflow-hidden">

      {/* Grain filter for logo sticker */}
      <svg width="0" height="0" style={{ position: 'absolute', overflow: 'hidden' }} aria-hidden="true">
        <defs>
          <filter id="footer-logo-grain" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feComponentTransfer in="grayNoise" result="dimNoise">
              <feFuncR type="linear" slope="0.18" intercept="0.41" />
              <feFuncG type="linear" slope="0.18" intercept="0.41" />
              <feFuncB type="linear" slope="0.18" intercept="0.41" />
            </feComponentTransfer>
            <feComposite in="dimNoise" in2="SourceGraphic" operator="in" result="maskedNoise" />
            <feBlend in="SourceGraphic" in2="maskedNoise" mode="soft-light" result="grained" />
            <feComposite in="grained" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      {/* Konten logo sticker — bottom-right corner */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '6%',
          right: '3%',
          width: 'clamp(100px, 10vw, 150px)',
          aspectRatio: '1',
          transform: 'rotate(8deg)',
          pointerEvents: 'none',
          filter: 'url(#footer-logo-grain) drop-shadow(1px 3px 6px rgba(0,0,0,0.22))',
        }}
      >
        <img src="/stickers/logo.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>

      <div className="max-w-7xl mx-auto">

        {/* Full-width headline */}
        <h2 className="text-[clamp(2rem,7.5vw,6.5rem)] font-spartan font-black leading-none tracking-tighter mb-16">
          TELL YOUR
          <br />
          STORY.
        </h2>

        {/* Lower section — single left-aligned column */}
        <div className="flex flex-col gap-8 max-w-2xl">

          {/* Enquire button */}
          <button className="w-fit px-8 py-[12px] border-[1.5px] border-konten-cream text-konten-cream font-inter font-500 text-[12px] uppercase rounded-full hover:bg-konten-cream hover:text-konten-blue transition-all duration-200">
            Enquire now →
          </button>

          {/* Newsletter */}
          <div>
            <p className="font-spartan font-black text-[clamp(1.4rem,2.5vw,1.9rem)] uppercase leading-tight mb-5">
              Sign up for stories worth telling
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="flex-1 bg-transparent border-b-[1.5px] border-konten-cream text-konten-cream placeholder-konten-cream/50 font-inter py-3 focus:outline-none transition-opacity"
                required
              />
              <button
                type="submit"
                className="px-8 py-[10px] bg-konten-cream text-konten-blue font-inter font-500 text-[12px] uppercase rounded-full hover:opacity-85 transition-opacity whitespace-nowrap"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Contact info — one line */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-inter text-[14px] md:text-[15px]">
            <span>sales@konten.agency</span>
            <span className="text-konten-cream/40">·</span>
            <span>+231 776 049 390</span>
            <span className="text-konten-cream/40">·</span>
            <span>+231 880 532 429</span>
            <span className="text-konten-cream/40">·</span>
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
