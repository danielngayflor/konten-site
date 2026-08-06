import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const EASE = [0.25, 0, 0, 1] as const;

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // React doesn't reliably write the muted attribute to the DOM element,
  // which blocks autoplay. Force both via ref after mount.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <section className="relative bg-konten-black text-white overflow-hidden min-h-[calc(100dvh-56px)] sm:min-h-[calc(100dvh-62px)] flex flex-col items-center justify-center px-6 py-16 gap-8">

      {/* Headline — New Spirit display */}
      <motion.h1
        className="font-display text-center leading-[1.05] tracking-tight text-[clamp(3rem,8vw,9rem)] px-4"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
      >
        Storytelling that <span className="uppercase italic">moves.</span>
      </motion.h1>

      {/* Hero video */}
      <motion.div
        className="w-full max-w-4xl px-4 sm:px-6"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
      >
        <div className="w-full aspect-video rounded-2xl overflow-hidden bg-dark-gray" style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)' }}>
          <video
            ref={videoRef}
            src="/VIdeos/Background%20.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Subtitle + CTAs */}
      <motion.div
        className="flex flex-col items-center gap-6 text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
      >
        <p className="font-body text-body-lg text-white/60 leading-[1.65] max-w-[480px]">
          Moves donors to fund. Moves customers to buy. Moves audiences to trust.
        </p>

        <Link to="/featured-projects">
          <button className="px-8 py-3 border border-white/20 text-white/80 font-spartan font-600 text-[13px] uppercase tracking-widest rounded-full hover:border-white/50 hover:text-white transition-all duration-200">
            See our work
          </button>
        </Link>
      </motion.div>

    </section>
  );
}
