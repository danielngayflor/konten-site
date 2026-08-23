// WhatWeDo.tsx
//   • Heading sticks to top of viewport while the section is in view
//   • One service card at a time, auto-advances every 10 s with a slide transition
//   • Dots double as manual controls; progress bar shows time until next slide
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '../../../data/services';
import { workPlaceholders } from '../../../data/workPlaceholders';

const FOLD = 40;
const INTERVAL = 10_000; // ms
const EASE = [0.25, 0, 0, 1] as const;

const FEATURED = ['media-coverage', 'social-and-story', 'creator-studio'];

const featuredServices = FEATURED
  .map(slug => services.find(s => s.slug === slug))
  .filter(Boolean) as (typeof services)[number][];

function getServiceImage(slug: string): string | undefined {
  return workPlaceholders.find(p => p.serviceSlug === slug)?.coverImage;
}

export default function WhatWeDo() {
  const [active, setActive]     = useState(0);
  const [dir, setDir]           = useState<1 | -1>(1);
  const [progress, setProgress] = useState(0); // 0–100
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const rafRef   = useRef<number | undefined>(undefined);
  const startRef                = useRef<number>(Date.now());
  const count                   = featuredServices.length;

  // Auto-advance
  const advance = (next: number, direction: 1 | -1) => {
    setDir(direction);
    setActive(next);
    setProgress(0);
    startRef.current = Date.now();
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      advance((active + 1) % count, 1);
    }, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [active, count]);

  // Progress bar via rAF
  useEffect(() => {
    const tick = () => {
      const pct = Math.min(100, ((Date.now() - startRef.current) / INTERVAL) * 100);
      setProgress(pct);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current); };
  }, []);

  const goTo = (i: number) => {
    clearInterval(timerRef.current);
    advance(i, i > active ? 1 : -1);
    // restart interval
    timerRef.current = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % count;
        advance(next, 1);
        return next;
      });
    }, INTERVAL);
  };

  const service    = featuredServices[active];
  const coverImage = getServiceImage(service.slug);

  return (
    <section className="text-white py-8 md:py-10">

      {/* ── Sticky heading — stays at top while section is in view ── */}
      <div
        className="sticky z-10 px-6 sm:px-10 pt-6 pb-4"
        style={{
          top: 64, // nav height
          background: 'linear-gradient(to bottom, #0A0A0A 80%, transparent)',
        }}
      >
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between gap-6 mb-4">
            <h2
              className="font-spartan font-black uppercase leading-none tracking-tighter text-white"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
            >
              What We Do
            </h2>

            {/* Dots — desktop, aligned with heading baseline */}
            <div className="hidden sm:flex shrink-0 gap-2 pb-1">
              {featuredServices.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to service ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={[
                    'rounded-full transition-all duration-300',
                    i === active
                      ? 'w-6 h-2.5 bg-white'
                      : 'w-2.5 h-2.5 bg-white/25 hover:bg-white/50',
                  ].join(' ')}
                />
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/50 rounded-full transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Card — slides in/out ───────────────────────────────────── */}
      <div className="mt-6 px-6 sm:px-10 overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={active}
            custom={dir}
            variants={{
              enter: (d: number) => ({ x: d > 0 ? '105%' : '-105%', opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit:  (d: number) => ({ x: d > 0 ? '-105%' : '105%', opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: EASE }}
            className="bg-konten-blue flex flex-col md:flex-row p-3 gap-3 md:h-[460px]"
          >
            {/* Image */}
            <div
              className="w-full md:w-[44%] shrink-0 overflow-hidden h-48 md:h-full"
              style={{
                clipPath: `polygon(${FOLD}px 0, 100% 0, 100% 100%, 0 100%, 0 ${FOLD}px)`,
              }}
            >
              {coverImage ? (
                <img
                  src={coverImage}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-white/10 flex flex-col justify-end p-5 gap-1">
                  {service.taglineLines?.map((line: string, j: number) => (
                    <p key={j} className="font-spartan font-black uppercase text-white/40 leading-none text-sm">
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Text */}
            <div className="flex-1 flex flex-col px-5 py-5 md:px-8 md:py-7">
              <h3
                className="font-spartan font-black uppercase leading-none tracking-tighter text-white mb-5"
                style={{ fontSize: 'clamp(2rem, 5.5vw, 4rem)' }}
              >
                {service.name}
              </h3>
              <p
                className="font-body text-white/60 leading-[1.7] flex-1"
                style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)' }}
              >
                {service.intro}
              </p>
              <Link
                to={`/services`}
                className="mt-6 inline-flex items-center gap-2 self-start
                           text-konten-cream font-spartan font-bold
                           text-[11px] uppercase tracking-widest
                           hover:opacity-70 transition-opacity duration-200"
              >
                Explore service
                <svg width="18" height="18" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                  <circle cx="14" cy="14" r="13" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5"/>
                  <path d="M10 14h8M15 10l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile dots */}
      <div className="flex sm:hidden justify-center gap-2 mt-6">
        {featuredServices.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to service ${i + 1}`}
            onClick={() => goTo(i)}
            className={[
              'rounded-full transition-all duration-300',
              i === active
                ? 'w-6 h-2.5 bg-white'
                : 'w-2.5 h-2.5 bg-white/25 hover:bg-white/50',
            ].join(' ')}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="px-6 sm:px-10 mt-10 max-w-[1600px] mx-auto">
        <Link
          to="/services"
          className="inline-block bg-konten-cream text-konten-black font-spartan font-bold
                     uppercase tracking-wide text-[13px] px-7 py-4 rounded-lg
                     hover:opacity-90 active:scale-[0.98] transition-all duration-200"
        >
          See everything we do
        </Link>
      </div>

    </section>
  );
}
