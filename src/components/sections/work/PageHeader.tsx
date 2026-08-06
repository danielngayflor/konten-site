import { motion } from 'framer-motion';

const EASE = [0.25, 0, 0, 1] as const;

export default function PageHeader() {
  return (
    <section className="relative bg-konten-black text-white py-32 md:py-40 px-6 md:px-12 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.h1
          className="font-display leading-[1.05] tracking-tight text-white mb-10"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 7rem)' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        >
          Every project started the same way.
        </motion.h1>
        <motion.p
          className="font-body text-body-lg text-white/60 leading-[1.65] max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
        >
          We understood why before we filmed anything. What follows is a mix — donor
          films that changed a funding conversation, social work that changed how
          a brand gets talked about, coverage from fieldwork across all 15
          counties. Different outcomes, same test behind each one: did it move
          people to act.
        </motion.p>
      </div>
    </section>
  );
}
