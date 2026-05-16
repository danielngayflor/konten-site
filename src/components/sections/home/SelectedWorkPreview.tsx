import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Polaroid from '../../ui/Polaroid';
import FilmMetadata from '../../ui/FilmMetadata';
import PillButton from '../../ui/PillButton';
import { workPlaceholders } from '../../../data/workPlaceholders';

const BATCH_SIZE   = 3;
const TOTAL        = workPlaceholders.length;
const TOTAL_BATCHES = Math.ceil(TOTAL / BATCH_SIZE); // 4 batches for 11 projects
const ROTATIONS    = [-2, 1, -3] as const;
const INTERVAL_MS  = 5500;

/** Returns exactly BATCH_SIZE projects, wrapping around the array if needed. */
function getBatch(batchIndex: number) {
  return Array.from({ length: BATCH_SIZE }, (_, i) =>
    workPlaceholders[(batchIndex * BATCH_SIZE + i) % TOTAL]
  );
}

export default function SelectedWorkPreview() {
  const [batch, setBatch] = useState(0);

  // Auto-advance through batches
  useEffect(() => {
    const id = setInterval(() => {
      setBatch((b) => (b + 1) % TOTAL_BATCHES);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const projects = getBatch(batch);

  return (
    <section className="bg-konten-black text-konten-cream py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-[clamp(2rem,7.5vw,6.5rem)] font-spartan font-black text-konten-cream uppercase leading-none tracking-tighter">
            STORIES WE'VE TOLD.
          </h2>
        </div>

        {/* Rotating batch of 3 polaroids */}
        <AnimatePresence mode="wait">
          <motion.div
            key={batch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10"
          >
            {projects.map((project, i) => (
              <Link
                key={project.slug}
                to={`/work/${project.slug}`}
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

        {/* Batch indicators — pill for active, dot for inactive */}
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

        {/* CTA */}
        <div className="flex justify-center">
          <Link to="/work">
            <PillButton variant="outline" tone="light">
              See all work →
            </PillButton>
          </Link>
        </div>

      </div>
    </section>
  );
}
