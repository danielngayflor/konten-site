// src/components/quiz/QuizResult.tsx
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { FilmType, ToneValue, FilmResult } from '../../data/quiz';
import { results } from '../../data/quiz';
import Clapperboard from '../ui/Clapperboard';

const EASE = [0.25, 0, 0, 1] as const;

const WHATSAPP_URL = 'https://wa.me/231776049390';
const PACKAGE_URL  = '/services'; // update to dedicated package page when live

interface QuizResultProps {
  direction: 1 | -1;
  filmType: FilmType;
  tone: ToneValue;
  onRetake: () => void;
  onCtaClick: (type: 'whatsapp' | 'package') => void;
}

export default function QuizResult({
  direction,
  filmType,
  tone,
  onRetake,
  onCtaClick,
}: QuizResultProps) {
  const reduced = useReducedMotion();
  const result  = results[filmType];

  // DIY section collapsed by default when user said they want to hire
  const [diyOpen, setDiyOpen] = useState(tone !== 'hire');

  // Offer comes before DIY guide if user wants to hire
  const offerFirst = tone === 'hire';

  const bannerVariants = {
    enter: (dir: number) => ({ x: reduced ? 0 : dir * 40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
  };

  const bodyVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : 24 },
    show:   { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      custom={direction}
      variants={bannerVariants}
      initial="enter"
      animate="center"
      transition={{ duration: reduced ? 0 : 0.55, ease: EASE }}
      className="w-full"
    >
      {/* ── Hero banner ─────────────────────────────────────────────────── */}
      <div className="bg-konten-blue px-6 py-16 md:py-24 text-center">
        <motion.div
          variants={bodyVariants}
          initial="hidden"
          animate="show"
          transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.15, ease: EASE }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Clapperboard size={13} className="text-white/60" />
            <span className="text-eyebrow text-white/60">{result.eyebrow}</span>
          </div>
          <h1
            className="font-spartan font-black text-white uppercase leading-none tracking-tighter mb-4"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}
          >
            {result.title}
          </h1>
          <p
            className="font-display text-white/70 leading-[1.2] tracking-tight"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)' }}
          >
            {result.subtitle}
          </p>
        </motion.div>
      </div>

      {/* ── Content body ────────────────────────────────────────────────── */}
      <div className="bg-konten-black">
        <motion.div
          className="max-w-2xl mx-auto px-6 py-16 md:py-24 space-y-16"
          variants={bodyVariants}
          initial="hidden"
          animate="show"
          transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.3, ease: EASE }}
        >

          {/* ── What it is ──────────────────────────────────────────────── */}
          <ResultSection eyebrow="What it is">
            <p className="font-body text-body-lg text-white/65 leading-[1.7]">
              {result.definition}
            </p>
          </ResultSection>

          {/* ── Why this is your fit ────────────────────────────────────── */}
          <ResultSection eyebrow="Why this is your fit">
            <p className="font-body text-body-lg text-white/65 leading-[1.7]">
              {result.whyFit}
            </p>
          </ResultSection>

          {/* ── Offer section (first if tone === 'hire') ─────────────────── */}
          {offerFirst && (
            <OfferSection result={result} tone={tone} onCtaClick={onCtaClick} />
          )}

          {/* ── DIY guide ───────────────────────────────────────────────── */}
          <ResultSection
            eyebrow="Shoot it yourself — a real starting guide"
            action={
              tone === 'hire' ? (
                <button
                  onClick={() => setDiyOpen(o => !o)}
                  className="font-spartan font-700 text-[11px] uppercase tracking-widest text-mid-gray
                             hover:text-white transition-colors duration-200
                             focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-konten-blue"
                  aria-expanded={diyOpen}
                >
                  {diyOpen ? 'Hide ↑' : 'Show ↓'}
                </button>
              ) : null
            }
          >
            {diyOpen && (
              <ol className="space-y-5 list-none" aria-label="DIY shooting steps">
                {result.diySteps.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full bg-konten-blue flex items-center justify-center
                                 font-spartan font-700 text-[11px] text-white mt-0.5"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-body text-[15px] text-white/70 leading-[1.65]">
                        {step.main}
                      </p>
                      {step.subpoints && (
                        <ul className="mt-3 space-y-2 pl-1" aria-label="Interview questions">
                          {step.subpoints.map((pt, j) => (
                            <li
                              key={j}
                              className="flex gap-3 text-white/55 text-[14px] font-body leading-[1.6]"
                            >
                              <span
                                className="flex-shrink-0 mt-[7px] w-1 h-1 rounded-full bg-konten-blue/60"
                                aria-hidden="true"
                              />
                              {pt}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </ResultSection>

          {/* ── Where this tends to go wrong ────────────────────────────── */}
          <ResultSection eyebrow="Where this tends to go wrong on your own">
            <p className="font-body text-body-lg text-white/65 leading-[1.7]">
              {result.diyGap}
            </p>
          </ResultSection>

          {/* ── One film is a start ──────────────────────────────────────── */}
          <div className="border border-border-gray rounded-2xl p-8">
            <p className="text-eyebrow text-mid-gray mb-4">
              One film is a start. It isn't the whole picture.
            </p>
            <p className="font-body text-[15px] text-white/60 leading-[1.7]">
              {result.oneFilmNote}
            </p>
          </div>

          {/* ── Offer section (normal position for diy / balanced) ───────── */}
          {!offerFirst && (
            <OfferSection result={result} tone={tone} onCtaClick={onCtaClick} />
          )}

          {/* ── Retake ──────────────────────────────────────────────────── */}
          <div className="pt-4 border-t border-border-gray text-center">
            <button
              onClick={onRetake}
              className="font-spartan font-700 text-[12px] uppercase tracking-widest text-white/30
                         hover:text-white/60 transition-colors duration-200
                         focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-konten-blue"
            >
              ← Retake the quiz
            </button>
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ResultSection({
  eyebrow,
  action,
  children,
}: {
  eyebrow: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <p className="text-eyebrow text-mid-gray">{eyebrow}</p>
        {action}
      </div>
      {children}
    </section>
  );
}

function OfferSection({
  result,
  tone,
  onCtaClick,
}: {
  result: FilmResult;
  tone: ToneValue;
  onCtaClick: (type: 'whatsapp' | 'package') => void;
}) {
  const offerEyebrow =
    tone === 'diy' ? 'If you change your mind about hiring out' : 'The offer';

  return (
    <section className="bg-dark-gray rounded-2xl p-8 md:p-10">
      <p className="text-eyebrow text-mid-gray mb-5">{offerEyebrow}</p>
      <p className="font-body text-[15px] text-white/70 leading-[1.7] mb-8">
        {result.offer}
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onCtaClick('whatsapp')}
          className="flex-1 px-7 py-4 bg-konten-blue text-white font-spartan font-700 text-[12px] uppercase
                     tracking-widest rounded-full text-center hover:opacity-90 active:scale-[0.98]
                     transition-all duration-200
                     focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-konten-blue"
        >
          Talk to us about your shoot →
        </a>
        <a
          href={PACKAGE_URL}
          onClick={() => onCtaClick('package')}
          className="flex-1 px-7 py-4 border border-white/20 text-white/70 font-spartan font-700 text-[12px]
                     uppercase tracking-widest rounded-full text-center
                     hover:border-white/40 hover:text-white transition-all duration-200
                     focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-konten-blue"
        >
          See the full package
        </a>
      </div>
    </section>
  );
}
