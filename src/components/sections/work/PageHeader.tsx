// PageHeader.tsx — Featured Projects hero, konten-blue, display headline
import { motion } from 'framer-motion';

const EASE = [0.25, 0, 0, 1] as const;

export default function PageHeader() {
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
          Stories<br />We've Told.
        </motion.h1>
        <motion.p
          className="font-body text-white/60 leading-[1.65] max-w-2xl"
          style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
        >
          We understood why before we filmed anything. What follows is a mix of
          donor films that changed a funding conversation, social work that
          changed how a brand gets talked about, coverage from fieldwork across
          all 15 counties. Different outcomes, same test behind each one: did it
          move people to act.
        </motion.p>
      </div>
    </section>
  );
}
