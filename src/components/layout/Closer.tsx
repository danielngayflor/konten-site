// Closer.tsx — Dynasty Africa footer layout:
//   LEFT  → stacked nav links (large, uppercase)
//   RIGHT → logo top-right, social icon boxes bottom-right
import { Link } from 'react-router-dom';

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.05a8.16 8.16 0 004.77 1.52V7.12a4.85 4.85 0 01-1-.43z" />
    </svg>
  );
}

function YouTubeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const footerLinks = [
  { label: 'Home',              href: '/' },
  { label: 'Our Story',         href: '/our-story' },
  { label: 'Services',          href: '/services' },
  { label: 'Featured Projects', href: '/featured-projects' },
  { label: 'Freebies',          href: '/freebies' },
];

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/konten_lr',       icon: <InstagramIcon size={18} /> },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/kontenlr', icon: <LinkedinIcon size={18} /> },
  { label: 'Facebook',  href: 'https://www.facebook.com/thekontenclub',    icon: <FacebookIcon size={18} /> },
  { label: 'TikTok',    href: 'https://www.tiktok.com/@kontenlr',          icon: <TikTokIcon size={18} /> },
  { label: 'YouTube',   href: 'https://www.youtube.com/@KontenKorner',     icon: <YouTubeIcon size={18} /> },
];

export default function Closer() {
  return (
    <footer className="bg-konten-blue text-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 pt-16 md:pt-20 pb-10 md:pb-12">

        {/* ── Two-column layout ──────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-stretch gap-12 md:gap-0">

          {/* LEFT: nav links */}
          <nav className="flex flex-col justify-between" aria-label="Footer navigation">
            <div>
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block font-spartan font-black uppercase leading-none tracking-tight
                             py-3 text-white/50 hover:text-white
                             transition-colors duration-200"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Contact info sits under nav on mobile, at bottom-left on desktop */}
            <div className="mt-10 flex flex-wrap gap-x-4 gap-y-1 font-body text-white/30 text-[13px]">
              <span>sales@konten.agency</span>
              <span className="text-white/15">·</span>
              <span>+231 776 049 390</span>
              <span className="text-white/15">·</span>
              <span>Monrovia, Liberia</span>
            </div>
          </nav>

          {/* RIGHT: logo top, socials bottom */}
          <div className="flex flex-col justify-between items-start md:items-end gap-12">
            {/* Logo — top right */}
            <img
              src="/konten-logo.svg"
              alt="Konten LR"
              className="h-10 w-auto"
              style={{ filter: 'brightness(0) invert(1)' }}
            />

            {/* Social icon boxes — bottom right */}
            <div className="flex flex-wrap gap-3">
              {socials.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-11 h-11 flex items-center justify-center
                             border border-white/25 rounded-lg
                             text-white/60 hover:text-white hover:border-white/60
                             transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
