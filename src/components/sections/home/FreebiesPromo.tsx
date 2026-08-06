import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { resources, TYPE_LABELS } from '../../../data/resources';
import Clapperboard from '../../ui/Clapperboard';
import PillButton from '../../ui/PillButton';

export default function FreebiesPromo() {
  const featured = resources.slice(0, 3);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIdx((prev) => (prev + 1) % featured.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setCarouselIdx((prev) => (prev + 1) % featured.length);
      } else {
        setCarouselIdx((prev) => (prev - 1 + featured.length) % featured.length);
      }
    }
    touchStartX.current = null;
  };

  const resource = featured[carouselIdx];

  const CardContent = ({ r }: { r: typeof featured[number] }) => (
    <Link
      to={`/freebies/${r.slug}`}
      className="group flex flex-col bg-konten-cream text-konten-black overflow-hidden hover:-translate-y-1 transition-transform duration-200"
    >
      {/* Image */}
      {r.coverImage && (
        <div className="w-full aspect-[16/9] overflow-hidden bg-konten-black/20">
          <img
            src={r.coverImage}
            alt={r.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      {/* Card content */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-5 gap-3">
        <span className="inline-flex items-center gap-1.5 w-fit px-3 py-1 bg-konten-blue text-konten-cream font-inter font-500 text-[12px] uppercase tracking-wide rounded-full">
          <Clapperboard size={10} />
          {TYPE_LABELS[r.type]}
        </span>
        <h3 className="font-spartan font-black text-konten-black uppercase leading-none tracking-tighter text-[clamp(1.2rem,2vw,1.6rem)]">
          {r.title}
        </h3>
        <p className="font-inter text-body-lg leading-body text-konten-black/60 flex-1 line-clamp-2">
          {r.summary}
        </p>
        <span className="font-inter font-500 text-[14px] text-konten-black/50 group-hover:text-konten-black transition-colors">
          {r.readTime} · Read →
        </span>
      </div>
    </Link>
  );

  return (
    <section className="bg-konten-blue text-konten-cream py-32 md:py-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Header row */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-spartan font-black text-konten-cream uppercase leading-none tracking-tighter text-[clamp(2.5rem,7.5vw,6.5rem)]">
            FREE RESOURCE
            <br />
            FOR YOU.
          </h2>
        </div>

        {/* Mobile carousel (below md) */}
        <div
          className="md:hidden mb-12"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{ touchAction: 'pan-y' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={carouselIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent r={resource} />
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => setCarouselIdx(i)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  i === carouselIdx ? 'bg-konten-cream' : 'bg-konten-cream/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop grid (md and above) */}
        <div className="hidden md:grid grid-cols-3 gap-6 mb-12">
          {featured.map((r) => (
            <CardContent key={r.slug} r={r} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link to="/freebies">
            <PillButton variant="outline" tone="light">
              Browse all freebies →
            </PillButton>
          </Link>
        </div>

      </div>
    </section>
  );
}
