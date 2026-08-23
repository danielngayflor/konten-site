// src/components/quiz/QuizQuestion.tsx
import { motion, useReducedMotion } from 'framer-motion';
import type { ScoredQuestion, ToneQuestion } from '../../data/quiz';

const EASE = [0.25, 0, 0, 1] as const;

interface QuizQuestionProps {
  direction: 1 | -1;
  questionIndex: number;
  totalQuestions: number;
  question: ScoredQuestion | null;
  toneQuestion: ToneQuestion | null;
  selectedAnswer: number | null;
  onAnswer: (index: number) => void;
  onBack: () => void;
  isFirst: boolean;
}

export default function QuizQuestion({
  direction,
  questionIndex,
  totalQuestions,
  question,
  toneQuestion,
  selectedAnswer,
  onAnswer,
  onBack,
  isFirst,
}: QuizQuestionProps) {
  const reduced = useReducedMotion();

  const variants = {
    enter: (dir: number) => ({ x: reduced ? 0 : dir * 48, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (dir: number) => ({ x: reduced ? 0 : dir * -48, opacity: 0 }),
  };

  const activeQ       = question ?? toneQuestion!;
  const displayNumber = questionIndex + 1;

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: reduced ? 0 : 0.36, ease: EASE }}
      /* Full viewport height (minus nav). Scrollable on very small phones. */
      className="flex items-center justify-center min-h-[calc(100dvh-56px)] sm:min-h-[calc(100dvh-62px)] px-5 sm:px-8 py-10"
    >
      {/* ── Centered column: counter → card → back ─────────────────── */}
      <div
        className="w-full flex flex-col gap-4"
        style={{ maxWidth: 640 }}
      >
        {/* Progress row aligns flush with card edges */}
        <div
          className="flex items-center justify-between px-1"
          role="progressbar"
          aria-valuenow={displayNumber}
          aria-valuemin={1}
          aria-valuemax={totalQuestions}
        >
          <span className="font-spartan font-700 text-[11px] uppercase tracking-[0.16em] text-white/40">
            Question {displayNumber} of {totalQuestions}
          </span>

          <div className="flex items-center gap-[6px]" aria-hidden="true">
            {Array.from({ length: totalQuestions }).map((_, i) => (
              <span
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === questionIndex
                    ? 'w-5 h-[7px] bg-konten-blue'
                    : i < questionIndex
                    ? 'w-[7px] h-[7px] bg-konten-blue/45'
                    : 'w-[7px] h-[7px] bg-white/15'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── Cream card ─────────────────────────────────────────────── */}
        <div
          className="w-full bg-konten-cream rounded-[28px] px-8 py-9 sm:px-10 sm:py-10"
          style={{
            boxShadow:
              '0 40px 100px rgba(0,0,0,0.6), 0 8px 28px rgba(0,0,0,0.35)',
          }}
        >
          {/* Accent dash */}
          <div className="w-8 h-[3px] rounded-full mb-6" style={{ backgroundColor: 'rgba(0,36,156,0.35)' }} />

          {/* Question NOT uppercase inside the card */}
          <h2
            className="font-spartan font-black text-konten-black leading-[1.05] tracking-tight mb-7"
            style={{ fontSize: 'clamp(1.45rem, 4.5vw, 2.4rem)' }}
          >
            {activeQ.text}
          </h2>

          {/* Options */}
          <div className="flex flex-col gap-[10px]">
            {activeQ.options.map((option, i) => {
              const isSelected = selectedAnswer === i;
              return (
                <button
                  key={i}
                  onClick={() => onAnswer(i)}
                  aria-pressed={isSelected}
                  className={`w-full text-left px-5 py-[14px] rounded-2xl border transition-all duration-150
                              font-body text-[14px] sm:text-[15px] leading-[1.4]
                              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-konten-blue
                              ${
                                isSelected
                                  ? 'bg-konten-blue border-konten-blue text-white'
                                  : 'bg-white border-transparent text-konten-black/70 hover:text-konten-black shadow-[0_1px_4px_rgba(0,0,0,0.08)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)]'
                              }`}
                >
                  <span
                    className={`mr-3 inline-block w-[17px] h-[17px] rounded-full border-[1.5px] align-middle flex-shrink-0
                                 transition-all duration-150
                                 ${isSelected ? 'border-white bg-white' : 'border-konten-black/20'}`}
                  />
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Back below card, flush left */}
        {!isFirst && (
          <div className="px-1">
            <button
              onClick={onBack}
              className="font-spartan font-700 text-[11px] uppercase tracking-widest text-white/35
                         hover:text-white/65 transition-colors duration-200
                         focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-konten-blue"
            >
              ← Back
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
