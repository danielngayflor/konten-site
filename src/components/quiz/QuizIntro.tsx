// src/components/quiz/QuizIntro.tsx
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.25, 0, 0, 1] as const;

interface QuizIntroProps {
  onStart: () => void;
  direction: 1 | -1;
}

export default function QuizIntro({ onStart, direction }: QuizIntroProps) {
  const reduced = useReducedMotion();

  const variants = {
    enter: (dir: number) => ({
      x: reduced ? 0 : dir * 48,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: reduced ? 0 : dir * -48,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
      className="flex flex-col items-center justify-center min-h-[calc(100dvh-56px)] sm:min-h-[calc(100dvh-62px)] px-6 py-16 text-center"
    >
      {/* Headline */}
      <h1
        className="font-spartan font-black text-white uppercase leading-none tracking-tighter mb-6"
        style={{ fontSize: 'clamp(2rem, 7vw, 6rem)' }}
      >
        What film does your
        <br />
        <span className="text-white/40">organization</span> actually need?
      </h1>

      {/* Subhead */}
      <p className="font-body text-body-lg text-white/55 leading-[1.65] max-w-[540px] mb-4">
        Answer 6 quick questions about your goal, your audience, and how you're planning to use it.
        We'll tell you exactly which film fits, what it actually is, and how to shoot it — whether
        that's us or you.
      </p>

      {/* Meta line */}
      <p className="font-body text-[13px] text-white/30 mb-10">6 questions · about a minute</p>

      {/* CTA */}
      <button
        onClick={onStart}
        className="px-10 py-4 bg-konten-blue text-white font-spartan font-700 text-[13px] uppercase tracking-widest rounded-full
                   hover:opacity-90 active:scale-[0.98] transition-all duration-200
                   focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-konten-blue"
      >
        Take the Quiz →
      </button>
    </motion.div>
  );
}
