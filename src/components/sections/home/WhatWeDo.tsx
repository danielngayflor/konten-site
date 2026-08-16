import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import LazyImage from '../../ui/LazyImage';

const AUTO_MS = 8000;

const services = [
  {
    id: 'media',
    tab: 'Media Coverage & Documentary',
    name: 'Media Coverage\n& Documentary',
    description:
      'From donor films to field documentation across all 15 counties — we show up before the camera does. Pre-production, shoot, edit, deliver.',
    href: '/services#media',
  },
  {
    id: 'social',
    tab: 'Storytelling for Social Media',
    name: 'Storytelling for\nSocial Media',
    description:
      'Batch-produced content that builds a brand over time — not just fills a feed. Photography, reels, graphics, and a posting strategy that holds.',
    href: '/services#social',
  },
  {
    id: 'creator',
    tab: 'Creator Studio',
    name: 'Creator\nStudio',
    description:
      'Personal brand builds for founders, analysts, and professionals. Script, shoot environment, batch production, editing — all in.',
    href: '/services#creator',
  },
];

function DocIcon() {
  return (
    <svg width="11" height="13" viewBox="0 0 11 13" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M1 1h6.5L10 3.5V12H1V1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M7 1v3h3" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

const serviceImages: Record<string, { src: string; alt: string }[]> = {
  media: [
    { src: '/images/Media%20Coverage%20and%20Documentary/212A3711.jpg',    alt: 'Documentary production' },
    { src: '/images/Media%20Coverage%20and%20Documentary/DSC00139.jpg',    alt: 'Field documentation' },
    { src: '/images/Media%20Coverage%20and%20Documentary/DSC00273.jpg',    alt: 'Media coverage' },
  ],
  social: [
    { src: '/images/Storytelling%20for%20Social%20Media/DSC06752.jpg',     alt: 'Social content production' },
    { src: '/images/Storytelling%20for%20Social%20Media/DSC06961.jpg',     alt: 'Social storytelling' },
    { src: '/images/Storytelling%20for%20Social%20Media/65.jpg',           alt: 'Content photography' },
  ],
  creator: [
    { src: '/images/Creators%20Studio/Still%202026-01-07%20151651_2.1.1.png', alt: 'Creator Studio session' },
  ],
};

function ServiceImages({ id }: { id: string }) {
  const imgs = serviceImages[id] ?? [];
  if (imgs.length === 0) return null;

  if (imgs.length === 1) {
    return (
      <div className="w-full aspect-video rounded-2xl overflow-hidden">
        <LazyImage src={imgs[0].src} alt={imgs[0].alt} className="object-cover" draggable={false} />
      </div>
    );
  }

  return (
    <div className="w-full aspect-video grid grid-cols-[2fr_1fr] gap-2">
      <div className="rounded-xl overflow-hidden">
        <LazyImage src={imgs[0].src} alt={imgs[0].alt} className="object-cover" draggable={false} />
      </div>
      <div className="flex flex-col gap-2">
        {imgs.slice(1, 3).map((img, i) => (
          <div key={i} className="flex-1 rounded-xl overflow-hidden">
            <LazyImage src={img.src} alt={img.alt} className="object-cover" draggable={false} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WhatWeDo() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const pausedRef = useRef(false);
  const startRef  = useRef<number>(Date.now());
  const rafRef    = useRef<number>(0);
  const tabRefs    = useRef<(HTMLButtonElement | null)[]>([]);
  const tabBarRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startRef.current = Date.now();

    const tick = () => {
      if (!pausedRef.current) {
        const elapsed = Date.now() - startRef.current;
        const pct = Math.min((elapsed / AUTO_MS) * 100, 100);
        setProgress(pct);
        if (elapsed >= AUTO_MS) {
          setActive(prev => (prev + 1) % services.length);
          startRef.current = Date.now();
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  // Scroll active tab into view within the tab bar only — never scroll the page
  useEffect(() => {
    const bar = tabBarRef.current;
    const btn = tabRefs.current[active];
    if (!bar || !btn) return;
    const barWidth  = bar.offsetWidth;
    const btnLeft   = btn.offsetLeft;
    const btnWidth  = btn.offsetWidth;
    const target    = btnLeft - barWidth / 2 + btnWidth / 2;
    bar.scrollTo({ left: target, behavior: 'smooth' });
  }, [active]);

  const handleTabClick = useCallback((i: number) => {
    if (i === active) return;
    setActive(i);
    setProgress(0);
    startRef.current = Date.now();
    pausedRef.current = true;
    setTimeout(() => { pausedRef.current = false; }, 600);
  }, [active]);

  const service = services[active];

  return (
    <section className="bg-konten-black text-white">

      {/* Eyebrow */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-8">
        <p className="text-eyebrow text-mid-gray">What We Do</p>
      </div>

      {/* ── Tab bar ── */}
      <div className="border-b border-border-gray">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div ref={tabBarRef} className="flex items-end gap-1 overflow-x-auto scrollbar-hide">
            {services.map((s, i) => {
              const isActive = active === i;
              return (
                <button
                  key={s.id}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  onClick={() => handleTabClick(i)}
                  className={`
                    relative flex items-center gap-2 px-4 md:px-5 py-3 rounded-t-lg
                    font-spartan text-[11px] md:text-[12px] uppercase tracking-wider whitespace-nowrap
                    transition-colors duration-200 border border-b-0
                    ${isActive
                      ? 'bg-dark-gray border-border-gray text-white'
                      : 'bg-transparent border-transparent text-mid-gray hover:text-white/60 hover:bg-white/[0.03]'
                    }
                  `}
                >
                  <DocIcon />
                  {s.tab}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 h-[2px] bg-konten-blue transition-none"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Content panel ── */}
      <div className="bg-dark-gray">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">

          {/* key={active} remounts on switch, re-triggering the CSS fade-in */}
          <div
            key={active}
            className="wd-enter grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[380px] md:min-h-[420px]"
          >
            {/* Left: Title → Description → CTA */}
            <div className="flex flex-col gap-6 justify-center">
              <h3
                className="font-spartan font-black text-white uppercase leading-none tracking-tighter"
                style={{ fontSize: 'clamp(1.8rem, 3.2vw, 3.4rem)' }}
              >
                {service.name.split('\n').map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </h3>

              <p className="font-body text-body-lg text-white/55 leading-[1.7] max-w-[440px]">
                {service.description}
              </p>

              <Link
                to={service.href}
                className="w-fit inline-flex items-center gap-2 font-spartan font-700 text-[12px] uppercase tracking-widest text-konten-blue hover:text-white border-b border-konten-blue/40 hover:border-white/40 pb-0.5 transition-colors duration-200"
              >
                Learn more →
              </Link>
            </div>

            {/* Right: Service images */}
            <div>
              <ServiceImages id={service.id} />
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-16 pt-8 border-t border-border-gray flex justify-between items-center flex-wrap gap-4">
            <p className="font-body text-white/30 text-[13px]">Three services. One standard.</p>
            <Link
              to="/services"
              className="px-8 py-3 border border-border-gray text-white/70 font-spartan font-700 text-[12px] uppercase tracking-widest rounded-full hover:border-white/40 hover:text-white transition-all duration-200"
            >
              See what we do →
            </Link>
          </div>

        </div>
      </div>

    </section>
  );
}
