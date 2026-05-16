import { motion } from 'framer-motion';
import CollageElement from '../../ui/CollageElement';

const EASE = [0.25, 0, 0, 1] as const;

export default function PageHeader() {
  return (
    <section className="relative bg-konten-blue text-konten-cream py-32 md:py-48 px-6 md:px-12 overflow-hidden">
      {/* Two collage elements — Capture (vintage-camera) + Production (clapperboard). */}
      <div className="absolute inset-0 pointer-events-none">
        <CollageElement
          type="vintage-camera"
          src="/stickers/on-air.png"
          position={{ top: '8%', left: '2%' }}
          rotation={-5}
          parallaxStrength={0.14}
          scale={1.0}
          size={160}
          delay={0}
          anim="float-slow"
        />
        <CollageElement
          type="clapperboard"
          src="/stickers/clapperboard.png"
          position={{ bottom: '6%', right: '2%' }}
          rotation={10}
          parallaxStrength={0.16}
          scale={1.0}
          size={170}
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
          OUR
          <br />
          WORK.
        </motion.h1>
        <motion.p
          className="font-inter capitalize text-[clamp(0.625rem,2vw,2.25rem)] leading-body text-konten-cream/80 mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
        >
          Brands . Embassies . Resorts . Creators . NGOs .
            <br />
            A few of the stories we've been trusted to tell.
        </motion.p>
      </div>
    </section>
  );
}
