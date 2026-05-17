import { motion } from 'framer-motion';
import PillButton from '../../ui/PillButton';
import CollageElement from '../../ui/CollageElement';
import { Link } from 'react-router-dom';

const EASE = [0.25, 0, 0, 1] as const;

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-konten-blue text-konten-cream overflow-hidden">
      {/* Main hero area */}
      <div className="relative min-h-[calc(100vh-72px)] flex flex-col items-center justify-center px-6 py-24">
        {/* Two collage elements — Capture (cinema-camera) + Audio (vinyl-record).
            Anchored in the bottom corners so they never collide with the centered
            headline at any breakpoint. Hidden on mobile. */}
        <div className="absolute inset-0 pointer-events-none">
          <CollageElement
            type="cinema-camera"
            src="/stickers/tell-your-story.png"
            position={{ top: '8%', left: '2%' }}
            rotation={-8}
            parallaxStrength={0.14}
            scale={1.0}
            size={160}
            delay={0}
            anim="float-slow"
          />
          <CollageElement
            type="vinyl-record"
            src="/stickers/camera.png"
            position={{ bottom: '6%', right: '2%' }}
            rotation={10}
            parallaxStrength={0.18}
            scale={1.0}
            size={150}
            delay={0.8}
          />
        </div>

        {/* Centered headline content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-6xl">
          <motion.h1
            className="font-spartan font-black text-konten-cream uppercase leading-none tracking-tighter text-[clamp(2.5rem,8vw,9rem)]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            WE TELL STORIES
            <br />
            THAT MOVE.
          </motion.h1>

          <motion.p
            className="font-inter capitalize text-konten-cream/90 text-[clamp(0.625rem,2vw,2.25rem)] leading-[1.6] mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
          >
            Video . Content . Strategy . Branding . Digital . Creative Direction.
            <br />
            Plus All You Need To Tell Your Story.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
          >
            <PillButton variant="filled" tone="light" onClick={scrollToContact}>
              Start a project →
            </PillButton>
            <Link to="/stories-weve-told">
              <PillButton variant="outline" tone="light">
                See our work
              </PillButton>
            </Link>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
