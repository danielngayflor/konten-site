import { motion } from 'framer-motion';
import CollageElement from '../../ui/CollageElement';

const EASE = [0.25, 0, 0, 1] as const;

export default function PageHeader() {
  return (
    <section className="relative bg-konten-blue text-konten-cream py-32 md:py-48 px-6 md:px-12 overflow-hidden">
      {/* Two collage elements — Production (directors-chair) + Audio (studio-mic). */}
      <div className="absolute inset-0 pointer-events-none">
        <CollageElement
          type="directors-chair"
          src="/stickers/rec.png"
          position={{ top: '8%', left: '2%' }}
          rotation={-6}
          parallaxStrength={0.14}
          scale={1.0}
          size={150}
          delay={0}
          anim="float-slow"
        />
        <CollageElement
          type="studio-mic"
          src="/stickers/studio-mic.png"
          position={{ bottom: '6%', right: '2%' }}
          rotation={9}
          parallaxStrength={0.16}
          scale={1.0}
          size={150}
          delay={0.8}
        />
      </div>

      {/* Centered headline */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">
        <motion.h1
          className="font-spartan font-black text-konten-cream uppercase leading-none tracking-tighter text-[clamp(2.5rem,8vw,9rem)]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        >
          SIX
          <br />
          SERVICES.
        </motion.h1>
        <motion.p
          className="font-inter capitalize text-[clamp(0.625rem,2vw,2.25rem)] leading-body text-konten-cream/80 mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
        >
          Real problems . Real briefs . Real budgets .
          <br />
          Six services. Every one built because a client needed it.
        </motion.p>
      </div>
    </section>
  );
}
