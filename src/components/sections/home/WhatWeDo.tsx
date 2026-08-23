// WhatWeDo.tsx
//   • One service card at a time (full-width snap)
//   • Three featured services with photos
//   • Card: bg-konten-blue wraps around the image as a frame; text fills the right side
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../../../data/services';
import { workPlaceholders } from '../../../data/workPlaceholders';

const FOLD = 40;

// Three featured services shown here (those with representative photos)
const FEATURED = ['media-coverage', 'social-and-story', 'creator-studio'];

const featuredServices = FEATURED
  .map(slug => services.find(s => s.slug === slug))
  .filter(Boolean) as (typeof services)[number][];

function getServiceImage(slug: string): string | undefined {
  return workPlaceholders.find(p => p.serviceSlug === slug)?.coverImage;
}

export default function WhatWeDo() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      // Each slide = viewport width (w-screen)
      const slideW = el.clientWidth;
      setActiveIndex(Math.round(el.scrollLeft / slideW));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: el.clientWidth * i, behavior: 'smooth' });
  };

  return (
    <section
      className="text-white py-8 md:py-10"
    >

      {/* ── Section heading ──────────────────────────────────────── */}
      <div className="px-6 sm:px-10 mb-10 max-w-[1600px] mx-auto">
        <h2
          className="font-spartan font-black uppercase leading-none tracking-tighter text-white mb-6"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
        >
          What We Do
        </h2>
        <p
          className="font-body text-white/50 leading-[1.7] max-w-3xl"
          style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)' }}
        >
          We have executed projects in three countries and in all 15 counties
          across Liberia sitting with beneficiaries, embassies, founders, and
          boards, understanding <em>why</em> before we ever picked up a camera.
          That's how we know what a real story looks like versus a staged one.
        </p>
      </div>

      {/* ── Snap scroll one card per viewport width ────────────── */}
      <div
        ref={scrollRef}
        className="w-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {featuredServices.map((service) => {
          const coverImage = getServiceImage(service.slug);

          return (
            // Slide: full viewport width
            <div
              key={service.slug}
              className="shrink-0 snap-start w-full flex px-6 sm:px-10"
            >
              {/* ── Card: blue bg frames the image ─────────────── */}
              {/* explicit height so h-full on image resolves correctly */}
              <div className="flex-1 bg-konten-blue flex flex-col md:flex-row p-3 gap-3 h-auto md:h-[460px]">

                {/* LEFT: image inside blue frame (p-3 on card creates the frame) */}
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
                      className="w-full h-full object-cover grayscale"
                    />
                  ) : (
                    <div className="w-full h-full bg-konten-blue/50 flex flex-col justify-end p-5 gap-1">
                      {service.taglineLines.map((line, j) => (
                        <p key={j}
                           className="font-spartan font-black uppercase text-white/40 leading-none text-sm">
                          {line}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {/* RIGHT: name + description + CTA all filling the panel */}
                <div className="flex-1 flex flex-col px-5 py-5 md:px-8 md:py-7">

                  {/* Service name dominant headline */}
                  <h3
                    className="font-spartan font-black uppercase leading-none tracking-tighter text-white mb-5"
                    style={{ fontSize: 'clamp(2rem, 5.5vw, 4rem)' }}
                  >
                    {service.name}
                  </h3>

                  {/* Description grows to fill available space */}
                  <p
                    className="font-body text-white/60 leading-[1.7] flex-1"
                    style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)' }}
                  >
                    {service.intro}
                  </p>

                  {/* CTA pushed to bottom */}
                  <Link
                    to={`/services#${service.slug}`}
                    className="mt-6 inline-flex items-center gap-2 self-start
                               text-konten-cream font-spartan font-bold
                               text-[11px] uppercase tracking-widest
                               hover:opacity-70 transition-opacity duration-200"
                  >
                    Explore service
                    <svg width="18" height="18" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                      <circle cx="14" cy="14" r="13" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
                      <path d="M10 14h8M15 10l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>

                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* ── Navigation dots (3) ──────────────────────────────────── */}
      <div className="flex justify-center gap-2 mt-7">
        {featuredServices.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to service ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={[
              'rounded-full transition-all duration-300',
              i === activeIndex
                ? 'w-6 h-2.5 bg-white'
                : 'w-2.5 h-2.5 bg-white/25 hover:bg-white/50',
            ].join(' ')}
          />
        ))}
      </div>

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
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
