// Nav.tsx Dynasty Africa-inspired: hamburger-only, fullscreen overlay
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const EASE = [0.25, 0, 0, 1] as const;

const navLinks = [
  { label: 'Home',              href: '/' },
  { label: 'Our Story',         href: '/our-story' },
  { label: 'Services',          href: '/services' },
  { label: 'Featured Projects', href: '/featured-projects' },
  { label: 'Freebies',          href: '/freebies' },
];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="w-7 h-5 flex flex-col justify-between cursor-pointer" aria-hidden="true">
      <motion.span
        animate={{ rotate: open ? 45 : 0, y: open ? 9 : 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="block h-[2px] bg-white rounded-full origin-center"
      />
      <motion.span
        animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
        transition={{ duration: 0.2, ease: EASE }}
        className="block h-[2px] bg-white rounded-full"
      />
      <motion.span
        animate={{ rotate: open ? -45 : 0, y: open ? -9 : 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="block h-[2px] bg-white rounded-full origin-center"
      />
    </div>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close overlay on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const goToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    if (window.location.pathname === '/') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#contact');
    }
  };

  return (
    <>
      {/* ── Fixed bar ──────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10"
        style={{
          height: 64,
          background: 'rgba(10, 10, 10, 0.45)',
          backdropFilter: 'blur(28px) saturate(180%) brightness(1.05)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%) brightness(1.05)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
          boxShadow: '0 1px 0 rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      >
        {/* Logo */}
        <Link to="/" aria-label="Konten LR home" className="hover:opacity-75 transition-opacity">
          <img
            src="/konten-logo.svg"
            alt="Konten LR"
            className="h-9 w-auto"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="z-[60] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-konten-cream p-2 -mr-2"
        >
          <HamburgerIcon open={open} />
        </button>
      </header>

      {/* ── Fullscreen overlay ──────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="nav-overlay"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: EASE }}
            className="fixed inset-0 z-40 bg-konten-black flex flex-col px-6 sm:px-10 pt-24 pb-10 overflow-y-auto"
          >
            {/* Nav links */}
            <nav className="flex flex-col gap-1 flex-1" aria-label="Main navigation">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: EASE }}
                  >
                    <Link
                      to={link.href}
                      className={`
                        block font-spartan font-black uppercase leading-none tracking-tight
                        py-4 border-b border-white/10 transition-colors duration-200
                        hover:text-konten-cream
                        ${isActive ? 'text-konten-cream' : 'text-white/60'}
                      `}
                      style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)' }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4, ease: EASE }}
              className="mt-10 flex flex-col sm:flex-row sm:items-end justify-between gap-8"
            >
              {/* Contact info */}
              <div className="flex flex-col gap-1 font-body text-[14px] text-white/35">
                <span>sales@konten.agency</span>
                <span>+231 776 049 390</span>
                <span>Monrovia, Liberia</span>
              </div>

              {/* CTA */}
              <button
                onClick={goToContact}
                className="px-8 py-4 bg-konten-cream text-konten-black font-spartan font-700 text-[12px] uppercase tracking-widest rounded-full hover:opacity-90 active:scale-[0.98] transition-all duration-200 self-start sm:self-auto"
              >
                Tell Your Story →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer so page content starts below fixed bar */}
      <div className="h-16" />
    </>
  );
}
