// SelectedWorkPreview.tsx
//   • 3 polaroid cards visible at once (1 stacked on mobile)
//   • Group auto-advances every 10 s with a slide transition
//   • Dots + progress bar for manual control / visual feedback
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { workPlaceholders } from '../../../data/workPlaceholders';

const FOLD     = 40;
const INTERVAL = 6_000; // ms
const PER_PAGE = 3;
const EASE     = [0.25, 0, 0, 1] as const;

export default function SelectedWorkPreview() {
  const projects   = workPlaceholders.slice(0, 6);
  const pageCount  = Math.ceil(projects.length / PER_PAGE); // 2
  const [page, setPage]         = useState(0);
  const [dir, setDir]           = useState<1 | -1>(1);
  const [progress, setProgress] = useState(0);
  const timerRef                = useRef<ReturnType<typeof setInterval>>();
  const rafRef                  = useRef<number>();
  const startRef                = useRef<number>(Date.now());

  const advance = (next: number, direction: 1 | -1) => {
    setDir(direction);
    setPage(next);
    setProgress(0);
    startRef.current = Date.now();
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      advance((page + 1) % pageCount, 1);
    }, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [page, pageCount]);

  useEffect(() => {
    const tick = () => {
      const pct = Math.min(100, ((Date.now() - startRef.current) / INTERVAL) * 100);
      setProgress(pct);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const goTo = (i: number) => {
    clearInterval(timerRef.current);
    advance(i, i > page ? 1 : -1);
    timerRef.current = setInterval(() => {
      setPage(prev => {
        const next = (prev + 1) % pageCount;
        advance(next, 1);
        return next;
      });
    }, INTERVAL);
  };

  const visible = projects.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <section className="text-white py-8 md:py-10">

      {/* Heading + dots + progress */}
      <div className="px-6 sm:px-10 mb-8 max-w-[1600px] mx-auto">
        <div className="flex items-end justify-between gap-6 mb-4">
          <h2
            className="font-spartan font-black uppercase leading-none tracking-tighter text-white"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
          >
            Our Work
          </h2>

          {/* Dots — desktop */}
          <div className="hidden sm:flex shrink-0 gap-2 pb-1">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to page ${i + 1}`}
                onClick={() => goTo(i)}
                className={[
                  'rounded-full transition-all duration-300',
                  i === page
                    ? 'w-6 h-2 bg-white'
                    : 'w-2 h-2 bg-white/25 hover:bg-white/50',
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

      {/* 3-card grid — slides as a group */}
      <div className="px-6 sm:px-10 overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={page}
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
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            {visible.map((project) => (
              <Link
                key={project.slug}
                to={`/featured-projects/${project.slug}`}
                className="group flex flex-col
                           bg-white hover:bg-konten-cream
                           transition-all duration-500 ease-out
                           hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)]"
                style={{ padding: '10px' }}
              >
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
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile dots */}
      <div className="flex sm:hidden justify-center gap-2 mt-7">
        {Array.from({ length: pageCount }).map((_, i) => (
          <button
            key={i}
            aria-label={`Go to page ${i + 1}`}
            onClick={() => goTo(i)}
            className={[
              'rounded-full transition-all duration-300',
              i === page
                ? 'w-6 h-2 bg-white'
                : 'w-2 h-2 bg-white/25 hover:bg-white/50',
            ].join(' ')}
          />
        ))}
      </div>

      {/* CTA */}
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
