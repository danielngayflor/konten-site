import { useEffect, useRef } from 'react';

// ── Orbit constants ────────────────────────────────────────────────────────────
const CARD_SIZE = 128;
const HALF      = CARD_SIZE / 2;
const RADIUS    = 145;   // equal X and Y → circular orbit
const LOOP_MS   = 8000; // one full revolution

// ── Project images only ────────────────────────────────────────────────────────
const CARDS = [
  { id: 0, src: '/images/work/gfc/DSC00007.jpg' },
  { id: 1, src: '/images/work/scrc/Still-2026-05-13-150015_2.11.1.jpg' },
  { id: 2, src: '/images/work/jackies/DSC04968.jpg' },
  { id: 3, src: '/images/work/irish-embassy/DSC00139.jpg' },
  { id: 4, src: '/images/work/monvies/65.jpg' },
  { id: 5, src: '/images/work/gfc/DSC00986.jpg' },
  { id: 6, src: '/images/work/scrc/Still-2026-05-13-150015_2.4.1.jpg' },
  { id: 7, src: '/images/work/jackies/DSC06879.jpg' },
];

// Sine ease-in-out: integrates to exactly 2π per loop with zero velocity at both endpoints.
// θ(t) = π·(1 − cos(π·t)) → dθ/dt = π²·sin(π·t) — naturally breathes slow→fast→slow.
function sineAngle(t) {
  return Math.PI * (1 - Math.cos(Math.PI * t));
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function HeroOrbit() {
  const containerRef = useRef(null);
  const rafRef       = useRef(null);
  const startRef     = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const els = Array.from(container.querySelectorAll('[data-card]'));

    function tick(ts) {
      if (startRef.current === null) startRef.current = ts;
      const elapsed  = ts - startRef.current;
      const raw  = (elapsed % LOOP_MS) / LOOP_MS; // 0→1 linear
      const base = sineAngle(raw);               // 0→2π, sine-eased

      els.forEach((el, i) => {
        const angle  = base + (Math.PI * 2 / CARDS.length) * i;
        const x      = Math.cos(angle) * RADIUS;
        const y      = Math.sin(angle) * RADIUS;
        el.style.transform = `translate(${x - HALF}px, ${y - HALF}px)`;
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  // Container is square: diameter + card bleed on each side
  const SIZE = (RADIUS + HALF) * 2 + 8;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width:    SIZE,
        height:   SIZE,
        overflow: 'visible',
        flexShrink: 0,
      }}
    >
      {CARDS.map((card, i) => (
        <div
          key={card.id}
          data-card={i}
          style={{
            position:     'absolute',
            left:         '50%',
            top:          '50%',
            width:        CARD_SIZE,
            height:       CARD_SIZE,
            borderRadius: 14,
            overflow:     'hidden',
            boxShadow:    '0 6px 28px rgba(0,0,0,0.35)',
            willChange:   'transform',
          }}
        >
          <img
            src={card.src}
            alt=""
            aria-hidden="true"
            loading="eager"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      ))}
    </div>
  );
}
