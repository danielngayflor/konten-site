// Hero.tsx Dynasty Africa-inspired: full-viewport konten-blue, massive headline
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const EASE = [0.25, 0, 0, 1] as const;

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <section className="relative bg-konten-blue text-white overflow-hidden min-h-[calc(100dvh-64px)] flex flex-col justify-between px-6 sm:px-10 pt-12 pb-10">

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center">

        {/* Headline */}
        <motion.h1
          className="font-spartan font-black uppercase leading-[0.95] tracking-tighter"
          style={{ fontSize: 'clamp(3.5rem, 11vw, 12rem)' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        >
          Story&shy;telling
          <br />
          <span className="text-white/30">that</span>
          <br />
          moves.
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
        >
          <p
            className="font-body text-white/70 leading-[1.35]"
            style={{ fontSize: 'clamp(1.25rem, 2.4vw, 2.4rem)' }}
          >
            <span className="block">Moves donors to fund. Moves customers to buy.</span>
            <span className="block">Moves audiences to trust and act.</span>
          </p>
        </motion.div>
      </div>

      {/* ── Bottom ticker line ────────────────────────────────────── */}
      <motion.div
        className="mt-12 flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
      >
        <div className="flex-1 h-[1px] bg-white/20" />
        <span className="font-spartan font-700 text-[11px] uppercase tracking-[0.18em] text-white/35">
          Based in Liberia · Working across Africa
        </span>
        <div className="flex-1 h-[1px] bg-white/20" />
      </motion.div>

    </section>
  );
}
