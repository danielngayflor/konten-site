import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { workPlaceholders } from '../../../data/workPlaceholders';
import LazyImage from '../../ui/LazyImage';

const TOTAL         = workPlaceholders.length;
const MAX_CARD_W    = 440;
const AUTO_MS       = 3500;
const TRANSITION_MS = 550;
const SIDE_SCALE    = +(1 / 1.5).toFixed(4); // 0.6667

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function getSlot(cardIdx: number, active: number): number {
  let s = mod(cardIdx - active, TOTAL);
  if (s > Math.floor(TOTAL / 2)) s -= TOTAL;
  return Math.max(-2, Math.min(2, s));
}

function slotTransform(slot: number, cardW: number): string {
  const sideOffset = cardW / 2;
  switch (slot) {
    case  0: return `translateX(0px) scale(1)`;
    case -1: return `translateX(-${sideOffset}px) scale(${SIDE_SCALE})`;
    case  1: return `translateX(${sideOffset}px) scale(${SIDE_SCALE})`;
    case -2: return `translateX(-${cardW * 2}px) scale(${SIDE_SCALE})`;
    default:  return `translateX(${cardW * 2}px) scale(${SIDE_SCALE})`;
  }
}

// Z-index is driven by `zActive` — updated at the midpoint of the transition
// (when both cards are at ~equal scale) so the swap is imperceptible.
function slotZIndex(slot: number): number {
  if (slot === 0)  return 2;
  if (slot === -1 || slot === 1) return 1;
  return 0;
}

function slotOpacity(slot: number): number {
  return Math.abs(slot) <= 1 ? 1 : 0;
}

export default function SelectedWorkPreview() {
  const [active,  setActive]  = useState(0);
  const [zActive, setZActive] = useState(0);
  const [cardW,   setCardW]   = useState(MAX_CARD_W);
  const activeRef        = useRef(0);
  const transitioningRef = useRef(false);
  const hoveredRef       = useRef(false);
  const containerRef     = useRef<HTMLDivElement>(null);

  // Resize: cap card width to container width minus padding
  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      setCardW(Math.min(MAX_CARD_W, w - 48));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const go = useCallback((dir: 1 | -1) => {
    if (transitioningRef.current) return;
    const next = mod(activeRef.current + dir, TOTAL);
    transitioningRef.current = true;
    activeRef.current = next;
    setActive(next);                                                     // transform fires now
    setTimeout(() => setZActive(next), Math.round(TRANSITION_MS * 0.5)); // z-index at midpoint
    setTimeout(() => { transitioningRef.current = false; }, TRANSITION_MS);
  }, []);

  const goTo = useCallback((idx: number) => {
    if (transitioningRef.current || idx === activeRef.current) return;
    transitioningRef.current = true;
    activeRef.current = idx;
    setActive(idx);
    setTimeout(() => setZActive(idx), Math.round(TRANSITION_MS * 0.5));
    setTimeout(() => { transitioningRef.current = false; }, TRANSITION_MS);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (!hoveredRef.current) go(1);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [go]);

  return (
    <section className="bg-charcoal text-white py-24">

      {/* Heading */}
      <div className="text-center mb-16 px-6">
        <h2 className="font-spartan font-black text-white uppercase leading-none tracking-tighter text-[clamp(2rem,7.5vw,6.5rem)]">
          STORIES WE'VE TOLD.
        </h2>
      </div>

      {/* ── Carousel ── */}
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        onMouseEnter={() => { hoveredRef.current = true;  }}
        onMouseLeave={() => { hoveredRef.current = false; }}
      >
        <div
          className="relative mx-auto"
          style={{ height: cardW, width: '100%' }}
        >
          {workPlaceholders.map((project, i) => {
            const slot  = getSlot(i, active);
            const zSlot = getSlot(i, zActive);

            return (
              <div
                key={project.slug}
                style={{
                  position:   'absolute',
                  left:       '50%',
                  top:        0,
                  width:      cardW,
                  height:     cardW,
                  marginLeft: -(cardW / 2),
                  transform:  slotTransform(slot, cardW),
                  zIndex:     slotZIndex(zSlot),
                  opacity:    slotOpacity(slot),
                  pointerEvents: slot === 0 ? 'auto' : 'none',
                  transition: `transform ${TRANSITION_MS}ms ease-in-out`,
                }}
              >
                <Link
                  to={`/featured-projects/${project.slug}`}
                  className="block w-full h-full rounded-xl overflow-hidden relative"
                  tabIndex={slot === 0 ? 0 : -1}
                  onClick={e => { if (slot !== 0) e.preventDefault(); }}
                >
                  {project.coverImage ? (
                    <LazyImage
                      src={project.coverImage}
                      alt={project.title}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-konten-blue" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent flex flex-col justify-end p-7">
                    <p className="font-inter text-[10px] uppercase tracking-[0.18em] text-white/55 mb-1.5">
                      {project.serviceName}
                    </p>
                    <h3 className="font-spartan font-black text-white uppercase text-[1.35rem] leading-tight tracking-tight">
                      {project.title}
                    </h3>
                    <p className="font-inter text-white/65 text-[13px] mt-1">
                      {project.client}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Arrows */}
        <button
          onClick={() => go(-1)}
          aria-label="Previous"
          className="absolute left-5 sm:left-10 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next"
          className="absolute right-5 sm:right-10 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center items-center gap-2 mt-8 mb-12">
        {workPlaceholders.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to story ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === active
                ? 'w-7 bg-white'
                : 'w-1.5 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center">
        <Link
          to="/featured-projects"
          className="px-8 py-3 border border-white/20 text-white/70 font-spartan font-700 text-[12px] uppercase tracking-widest rounded-full hover:border-white/40 hover:text-white transition-all duration-200"
        >
          See all work →
        </Link>
      </div>

    </section>
  );
}
