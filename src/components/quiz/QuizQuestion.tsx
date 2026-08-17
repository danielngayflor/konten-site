// src/components/quiz/QuizQuestion.tsx
import { motion, useReducedMotion } from 'framer-motion';
import type { ScoredQuestion, ToneQuestion } from '../../data/quiz';

const EASE = [0.25, 0, 0, 1] as const;

interface QuizQuestionProps {
  direction: 1 | -1;
  questionIndex: number;    // 0-based overall index (0–6)
  totalQuestions: number;   // 7
  question: ScoredQuestion | null;  // null when this is the tone question
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
    enter: (dir: number) => ({
      x: reduced ? 0 : dir * 56,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: reduced ? 0 : dir * -56,
      opacity: 0,
    }),
  };

  // Resolve the active question (scored or tone)
  const activeQ = question ?? toneQuestion!;
  const isTone = question === null;
  const displayNumber = questionIndex + 1;

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: reduced ? 0 : 0.38, ease: EASE }}
      className="flex flex-col min-h-[calc(100dvh-56px)] sm:min-h-[calc(100dvh-62px)] px-6 py-12 md:py-16 max-w-2xl mx-auto w-full"
    >
      {/* Progress dots */}
      <div className="flex items-center gap-2 mb-10" role="progressbar" aria-valuenow={questionIndex + 1} aria-valuemin={1} aria-valuemax={totalQuestions}>
        {Array.from({ length: totalQuestions }).map((_, i) => {
          const isPast    = i < questionIndex;
          const isCurrent = i === questionIndex;
          return (
            <span
              key={i}
              aria-hidden="true"
              className={`rounded-full transition-all duration-300 ${
                isCurrent
                  ? 'w-6 h-2.5 bg-konten-blue'
                  : isPast
                  ? 'w-2.5 h-2.5 bg-konten-blue/50'
                  : 'w-2.5 h-2.5 bg-border-gray'
              }`}
            />
          );
        })}
        <span className="ml-auto font-spartan font-700 text-[12px] uppercase tracking-widest text-mid-gray">
          {displayNumber} / {totalQuestions}
        </span>
      </div>

      {/* Question label */}
      <p className="text-eyebrow text-mid-gray mb-4">
        {isTone ? 'One last thing' : `Question ${displayNumber}`}
      </p>

      {/* Question text */}
      <h2
        className="font-spartan font-black text-white uppercase leading-none tracking-tighter mb-10"
        style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3.2rem)' }}
      >
        {activeQ.text}
      </h2>

      {/* Options */}
      <div className="flex flex-col gap-3 flex-1">
        {activeQ.options.map((option, i) => {
          const isSelected = selectedAnswer === i;
          return (
            <button
              key={i}
              onClick={() => onAnswer(i)}
              aria-pressed={isSelected}
              className={`w-full text-left px-6 py-4 rounded-xl border transition-all duration-200
                          font-body text-[15px] leading-[1.5]
                          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-konten-blue
                          ${
                            isSelected
                              ? 'bg-konten-blue border-konten-blue text-white'
                              : 'bg-dark-gray border-border-gray text-white/70 hover:border-white/30 hover:text-white hover:bg-dark-gray/80'
                          }`}
            >
              <span className={`mr-3 inline-block w-5 h-5 rounded-full border flex-shrink-0 align-middle
                               transition-all duration-200
                               ${isSelected ? 'border-white bg-white' : 'border-white/30'}`}
              />
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Back button */}
      {!isFirst && (
        <div className="mt-10">
          <button
            onClick={onBack}
            className="font-spartan font-700 text-[12px] uppercase tracking-widest text-white/40
                       hover:text-white/70 transition-colors duration-200
                       focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-konten-blue"
          >
            ← Back
          </button>
        </div>
      )}
    </motion.div>
  );
}
