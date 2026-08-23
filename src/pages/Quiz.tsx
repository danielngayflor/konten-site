// src/pages/Quiz.tsx
// Route: /quiz
// 7-question interactive quiz that recommends one of Konten's three NGO films.
// Q1–Q6 are scored (donor / beneficiary / mission weights).
// Q7 is unscored captures intent (diy / hire / balanced) and shapes result page layout.

import { useState, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import QuizIntro    from '../components/quiz/QuizIntro';
import QuizQuestion from '../components/quiz/QuizQuestion';
import QuizResult   from '../components/quiz/QuizResult';
import {
  questions,
  toneQuestion,
  computeFilmType,
  computeTone,
  TOTAL_QUESTIONS,
} from '../data/quiz';
import type { FilmType, ToneValue } from '../data/quiz';

// Google Analytics is loaded globally via index.html
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type Phase = 'intro' | 'quiz' | 'result';

export default function Quiz() {
  const [phase,      setPhase]    = useState<Phase>('intro');
  const [currentQ,   setCurrentQ] = useState(0);
  const [direction,  setDirection] = useState<1 | -1>(1);
  const [answers,    setAnswers]   = useState<(number | null)[]>(
    Array(TOTAL_QUESTIONS).fill(null),
  );
  const [filmType, setFilmType] = useState<FilmType>('donor');
  const [tone,     setTone]     = useState<ToneValue>('balanced');

  // Pending auto-advance timer cancelled if user presses Back before it fires
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Start ────────────────────────────────────────────────────────────────
  const handleStart = useCallback(() => {
    window.gtag?.('event', 'quiz_started', { event_category: 'quiz' });
    setDirection(1);
    setPhase('quiz');
  }, []);

  // ── Answer selected ──────────────────────────────────────────────────────
  const handleAnswer = useCallback(
    (optionIndex: number) => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);

      // Record this answer
      const newAnswers = [...answers];
      newAnswers[currentQ] = optionIndex;
      setAnswers(newAnswers);

      // Auto-advance after 400ms
      advanceTimer.current = setTimeout(() => {
        setDirection(1);
        if (currentQ < TOTAL_QUESTIONS - 1) {
          setCurrentQ(currentQ + 1);
        } else {
          // All questions answered compute result
          const ft = computeFilmType(newAnswers);
          const t  = computeTone(newAnswers);
          setFilmType(ft);
          setTone(t);
          window.gtag?.('event', 'quiz_completed', {
            event_category: 'quiz',
            film_type: ft,
          });
          setPhase('result');
        }
      }, 400);
    },
    [answers, currentQ],
  );

  // ── Back ─────────────────────────────────────────────────────────────────
  const handleBack = useCallback(() => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    setDirection(-1);
    if (currentQ === 0) {
      setPhase('intro');
    } else {
      setCurrentQ(currentQ - 1);
    }
  }, [currentQ]);

  // ── Retake ───────────────────────────────────────────────────────────────
  const handleRetake = useCallback(() => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    setAnswers(Array(TOTAL_QUESTIONS).fill(null));
    setCurrentQ(0);
    setDirection(-1);
    setPhase('intro');
  }, []);

  // ── CTA click (GA) ───────────────────────────────────────────────────────
  const handleCtaClick = useCallback((type: 'whatsapp' | 'package') => {
    window.gtag?.('event', 'quiz_cta_click', {
      event_category: 'quiz',
      cta_type: type,
    });
  }, []);

  // ── Derive current question data ─────────────────────────────────────────
  const isToneQ    = phase === 'quiz' && currentQ === questions.length;
  const scoredQ    = (!isToneQ && phase === 'quiz') ? questions[currentQ] : null;
  const toneQ      = isToneQ ? toneQuestion : null;

  return (
    <div className="min-h-[calc(100dvh-56px)] sm:min-h-[calc(100dvh-62px)] bg-konten-black overflow-x-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        {phase === 'intro' && (
          <QuizIntro
            key="intro"
            direction={direction}
            onStart={handleStart}
          />
        )}

        {phase === 'quiz' && (
          <QuizQuestion
            key={`q-${currentQ}`}
            direction={direction}
            questionIndex={currentQ}
            totalQuestions={TOTAL_QUESTIONS}
            question={scoredQ}
            toneQuestion={toneQ}
            selectedAnswer={answers[currentQ]}
            onAnswer={handleAnswer}
            onBack={handleBack}
            isFirst={currentQ === 0}
          />
        )}

        {phase === 'result' && (
          <QuizResult
            key="result"
            direction={direction}
            filmType={filmType}
            tone={tone}
            onRetake={handleRetake}
            onCtaClick={handleCtaClick}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
