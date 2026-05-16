import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    quote:
      'Konten brought our story to life with craft and care that we never expected to find this close to home.',
    name: '[Name]',
    role: '[Role]',
    org: '[Organisation]',
    initial: 'K',
  },
  {
    quote:
      'Strategy first, always. They asked questions no other team had — and the work was sharper for it.',
    name: '[Name]',
    role: '[Role]',
    org: '[Organisation]',
    initial: 'S',
  },
  {
    quote:
      'They show up prepared, stay curious, and never treat a brief as just a task to complete.',
    name: '[Name]',
    role: '[Role]',
    org: '[Organisation]',
    initial: 'T',
  },
];

const INTERVAL = 5500;

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % testimonials.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[active];

  return (
    <section className="bg-konten-cream text-konten-black py-32 px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center">

        {/* Eyebrow */}
        <p className="font-inter font-bold text-[1rem] uppercase tracking-widest text-konten-blue mb-14">WORDS FROM PEOPLE WE'VE WORKED WITH.</p>

        {/* Animated quote + attribution */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.55, ease: [0.25, 0, 0, 1] }}
          >
            {/* Quote */}
            <blockquote className="font-spartan font-black text-konten-black text-[clamp(2rem,4.2vw,4rem)] leading-tight tracking-tight mb-14">
              "{t.quote}"
            </blockquote>

            {/* Attribution */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full border-[1.5px] border-konten-blue flex items-center justify-center flex-shrink-0">
                <span className="font-spartan font-black text-konten-black text-[1.1rem] leading-none">
                  {t.initial}
                </span>
              </div>
              <div className="text-left">
                <p className="font-inter font-semibold text-konten-black text-[14px] leading-snug">
                  {t.name}
                </p>
                <p className="font-inter text-konten-black/50 text-[13px] leading-snug">
                  {t.role}, {t.org}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-[10px] mt-14">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === active
                  ? 'w-[10px] h-[10px] bg-konten-blue'
                  : 'w-[8px] h-[8px] bg-konten-black/25 hover:bg-konten-black/50'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
