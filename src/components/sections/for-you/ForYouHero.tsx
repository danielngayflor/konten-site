// ForYouHero.tsx — matches Featured Projects PageHeader style
import { motion } from 'framer-motion';

const EASE = [0.25, 0, 0, 1] as const;

export default function ForYouHero() {
  return (
    <section className="relative bg-konten-blue text-white overflow-hidden px-6 sm:px-10 pt-16 pb-14 md:pt-20 md:pb-16">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          className="font-spartan font-black uppercase leading-none tracking-tighter text-white mb-8"
          style={{ fontSize: 'clamp(3rem, 9vw, 9rem)' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        >
          What<br />We Do.
        </motion.h1>
        <motion.p
          className="font-body text-white/60 leading-[1.65] max-w-2xl"
          style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
        >
          Different work, different audience, same test: does it move people to act.
          Here's how we work with each.
        </motion.p>
      </div>
    </section>
  );
}
