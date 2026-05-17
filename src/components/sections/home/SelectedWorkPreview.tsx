import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Polaroid from '../../ui/Polaroid';
import FilmMetadata from '../../ui/FilmMetadata';
import PillButton from '../../ui/PillButton';
import { workPlaceholders } from '../../../data/workPlaceholders';

const BATCH_SIZE    = 3;
const TOTAL         = workPlaceholders.length;
const TOTAL_BATCHES = Math.ceil(TOTAL / BATCH_SIZE);
const ROTATIONS     = [-2, 1, -3] as const;
const INTERVAL_MS   = 5500;

/** Returns exactly BATCH_SIZE projects, wrapping around if needed. */
function getBatch(batchIndex: number) {
  return Array.from({ length: BATCH_SIZE }, (_, i) =>
    workPlaceholders[(batchIndex * BATCH_SIZE + i) % TOTAL]
  );
}

export default function SelectedWorkPreview() {
  // Desktop: rotates batches of 3
  const [batch, setBatch] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setBatch((b) => (b + 1) % TOTAL_BATCHES);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  // Mobile: rotates one project at a time
  const [mobileIdx, setMobileIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setMobileIdx((i) => (i + 1) % TOTAL);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      setMobileIdx((i) =>
        diff > 0 ? (i + 1) % TOTAL : (i - 1 + TOTAL) % TOTAL
      );
    }
    touchStartX.current = null;
  };

  const projects = getBatch(batch);
  const mobileProject = workPlaceholders[mobileIdx];

  return (
    <section className="bg-konten-black text-konten-cream py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-[clamp(2rem,7.5vw,6.5rem)] font-spartan font-black text-konten-cream uppercase leading-none tracking-tighter">
            STORIES WE'VE TOLD.
          </h2>
        </div>

        {/* ── Mobile: one story at a time ──────────────────────────── */}
        <div
          className="md:hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{ touchAction: 'pan-y' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={mobileIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <Link
                to={`/stories-weve-told/${mobileProject.slug}`}
                className="flex flex-col group"
              >
                <FilmMetadata
                  text={mobileProject.metadataStrip}
                  className="mb-3 text-konten-cream/55"
                />
                <Polaroid
                  rotation={ROTATIONS[0]}
                  caption={`${mobileProject.title} · ${mobileProject.client}`}
                >
                  {mobileProject.coverImage ? (
                    <img
                      src={mobileProject.coverImage}
                      alt={mobileProject.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-konten-blue/40 to-konten-black/30" />
                  )}
                </Polaroid>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="flex justify-center items-center gap-2 mt-8 mb-14">
            {workPlaceholders.map((_, i) => (
              <button
                key={i}
                onClick={() => setMobileIdx(i)}
                aria-label={`Go to story ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === mobileIdx
                    ? 'w-7 bg-konten-cream'
                    : 'w-1.5 bg-konten-cream/30 hover:bg-konten-cream/55'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── Desktop: rotating batch of 3 polaroids ───────────────── */}
        <div className="hidden md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={batch}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="grid grid-cols-3 gap-12 mb-10"
            >
              {projects.map((project, i) => (
                <Link
                  key={project.slug}
                  to={`/stories-weve-told/${project.slug}`}
                  className="flex flex-col group"
                >
                  <FilmMetadata
                    text={project.metadataStrip}
                    className="mb-3 text-konten-cream/55"
                  />
                  <Polaroid
                    rotation={ROTATIONS[i]}
                    caption={`${project.title} · ${project.client}`}
                  >
                    {project.coverImage ? (
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-konten-blue/40 to-konten-black/30" />
                    )}
                  </Polaroid>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Batch indicators */}
          <div className="flex justify-center items-center gap-2 mb-14">
            {Array.from({ length: TOTAL_BATCHES }).map((_, i) => (
              <button
                key={i}
                onClick={() => setBatch(i)}
                aria-label={`Go to batch ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === batch
                    ? 'w-7 bg-konten-cream'
                    : 'w-1.5 bg-konten-cream/30 hover:bg-konten-cream/55'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link to="/stories-weve-told">
            <PillButton variant="outline" tone="light">
              See all work →
            </PillButton>
          </Link>
        </div>

      </div>
    </section>
  );
}
