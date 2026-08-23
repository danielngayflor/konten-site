// SelectedWorkPreview.tsx Dynasty Africa card spec:
//   • ALL frames: white at rest
//   • Hover: frame turns konten-cream, image goes grayscale → color simultaneously
//   • 10px uniform padding, top-left diagonal clip (fold), ~4:3 image ratio
//   • Section: plain black, no grid texture
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { workPlaceholders } from '../../../data/workPlaceholders';

const FOLD = 40; // px size of the top-left dog-ear cut

export default function SelectedWorkPreview() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  const projects = workPlaceholders.slice(0, 6);
  const dotCount = 2;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const progress = el.scrollLeft / (el.scrollWidth - el.clientWidth);
      setActiveDot(progress > 0.5 ? 1 : 0);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      className="text-white py-8 md:py-10"
    >

      {/* ── Heading ─────────────────────────────────────────────────── */}
      <div className="px-6 sm:px-10 mb-10 max-w-[1600px] mx-auto">
        <h2
          className="font-spartan font-black uppercase leading-none tracking-tighter text-white"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
        >
          Our Work
        </h2>
      </div>

      {/* ── Horizontal scroll ───────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-6 sm:px-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map((project) => (
          <Link
            key={project.slug}
            to={`/featured-projects/${project.slug}`}
            // group → enables group-hover on children (image grayscale-0)
            // bg-white at rest → hover:bg-konten-cream simultaneously with image colour
            className="group shrink-0 snap-start flex flex-col
                       bg-white hover:bg-konten-cream
                       transition-all duration-500 ease-out
                       hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)]"
            style={{ width: 'clamp(260px, 28vw, 400px)', padding: '10px' }}
          >
            {/* Image top-left corner clipped (dog-ear fold) */}
            <div
              className="w-full overflow-hidden"
              style={{
                aspectRatio: '4 / 3',
                clipPath: `polygon(${FOLD}px 0, 100% 0, 100% 100%, 0 100%, 0 ${FOLD}px)`,
              }}
            >
              {project.coverImage ? (
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-500
                             grayscale group-hover:grayscale-0
                             scale-100 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="w-full h-full bg-konten-blue" />
              )}
            </div>

            {/* Text transparent, inherits card bg (white → cream on hover) */}
            <div className="pt-4 pb-2 px-1">
              <p
                className="font-spartan font-semibold text-konten-black leading-tight"
                style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)' }}
              >
                {project.client}
              </p>
              <p className="font-body text-black/40 text-[13px] mt-1 leading-snug line-clamp-1">
                {project.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Scroll dots ─────────────────────────────────────────────── */}
      <div className="flex justify-center gap-2 mt-7">
        {Array.from({ length: dotCount }).map((_, i) => (
          <button
            key={i}
            aria-label={`Go to page ${i + 1}`}
            onClick={() => {
              const el = scrollRef.current;
              if (!el) return;
              el.scrollTo({
                left: i === 0 ? 0 : el.scrollWidth - el.clientWidth,
                behavior: 'smooth',
              });
            }}
            className={[
              'rounded-full transition-all duration-300',
              i === activeDot
                ? 'w-6 h-2 bg-white'
                : 'w-2 h-2 bg-white/25 hover:bg-white/50',
            ].join(' ')}
          />
        ))}
      </div>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <div className="px-6 sm:px-10 mt-10 max-w-[1600px] mx-auto">
        <Link
          to="/featured-projects"
          className="inline-block bg-konten-cream text-konten-black font-spartan font-bold
                     uppercase tracking-wide text-[13px] px-7 py-4 rounded-lg
                     hover:opacity-90 active:scale-[0.98] transition-all duration-200"
        >
          View all works
        </Link>
      </div>

    </section>
  );
}
