import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Search, Target, Wand2, Send } from 'lucide-react';

type StepIcon = React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;

const steps: { number: string; name: string; body: string; Icon: StepIcon }[] = [
  {
    number: '01',
    name: 'DISCOVER',
    body: "We start by listening. Before we pitch a concept or frame a shot, we need to understand your world — your audience, your objectives, your constraints, and what success actually looks like for you. This is where most agencies skip ahead. We don't.",
    Icon: Search,
  },
  {
    number: '02',
    name: 'STRATEGISE',
    body: 'Every piece of content we produce is built on a clear strategic foundation. We define your narrative, identify your platforms, set measurable goals, and build a plan that connects everything together. The creative comes from the strategy — not the other way around.',
    Icon: Target,
  },
  {
    number: '03',
    name: 'CREATE',
    body: "This is where we do what we love. From concept to camera to edit suite — our in-house team handles every stage of production with craft and intention. We bring our full toolkit to bear: film, photography, motion, design, audio. And we never stop asking whether what we're making is actually good.",
    Icon: Wand2,
  },
  {
    number: '04',
    name: 'DELIVER & OPTIMISE',
    body: "We don't disappear after delivery. We track performance, share insights, and use what we learn to make the next piece better. Content is a long game. We play it with you.",
    Icon: Send,
  },
];

/* ─── variants ─────────────────────────────────────────────────────────────── */
const ruleAnim = {
  hidden:  { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.65 } },
};

const numAnim = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.12 } },
};

const nameAnim = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.28 } },
};

const bodyAnim = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.55, delay: 0.44 } },
};

const iconAnim = {
  hidden:  { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, delay: 0.32 } },
};

const connLineAnim = {
  hidden:  { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.45, delay: 0.60 } },
};

const connArrowAnim = {
  hidden:  { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.88 } },
};

export default function HowWeWork() {
  return (
    <section className="bg-konten-cream text-konten-black py-32 md:py-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Section intro */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <h2 className="font-spartan font-black text-konten-black uppercase leading-none tracking-tighter text-[clamp(2rem,7.5vw,6.5rem)] mb-6 whitespace-nowrap">
            STRATEGY FIRST. ALWAYS.
          </h2>
          <p className="font-inter text-[18px] md:text-[20px] leading-body text-konten-black">
            Great content isn't an accident. It's the result of asking the right questions before anyone picks up a camera.
          </p>
        </motion.div>

        {/* Process flow */}
        <div>
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              {/* Rule — draws left → right */}
              <motion.div
                className="h-[1.5px] bg-konten-black"
                variants={ruleAnim}
                style={{ transformOrigin: 'left' }}
              />

              {/* Step row */}
              <div className="pt-8 pb-12 flex flex-col md:flex-row md:gap-16">

                {/* Mobile: number left + icon right in same row.
                    Desktop: collapses to just the number column (icon hidden here). */}
                <div className="flex items-start justify-between md:block md:w-40 flex-shrink-0 mb-4 md:mb-0">
                  <motion.div variants={numAnim}>
                    <span className="font-spartan font-black text-konten-blue text-[clamp(3.5rem,6vw,5.5rem)] leading-none">
                      {step.number}
                    </span>
                  </motion.div>

                  {/* Icon — mobile only, top-right opposite the number */}
                  <motion.div className="md:hidden flex-shrink-0" variants={iconAnim}>
                    <step.Icon size={72} strokeWidth={1} className="text-konten-blue" />
                  </motion.div>
                </div>

                {/* Content + desktop icon */}
                <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12">

                  <div className="flex-1">
                    <motion.h3
                      className="font-spartan font-black text-konten-black uppercase text-[clamp(2rem,4vw,3.5rem)] tracking-tighter leading-none mb-5"
                      variants={nameAnim}
                    >
                      {step.name}
                    </motion.h3>
                    <motion.p
                      className="font-inter text-[16px] md:text-[18px] leading-body text-konten-black max-w-[480px]"
                      variants={bodyAnim}
                    >
                      {step.body}
                    </motion.p>
                  </div>

                  {/* Icon — desktop only, to the right of text */}
                  <motion.div
                    className="hidden md:flex flex-shrink-0 items-center justify-end"
                    variants={iconAnim}
                  >
                    <step.Icon size={110} strokeWidth={1} className="text-konten-blue" />
                  </motion.div>

                </div>
              </div>

              {/* Connector — line draws down then arrow drops */}
              {i < steps.length - 1 && (
                <div className="flex flex-col md:flex-row md:gap-16 py-2">
                  <div className="md:w-40 flex-shrink-0 flex justify-start md:justify-center">
                    <div className="flex flex-col items-center">
                      <motion.div
                        className="h-8 w-[1.5px] bg-konten-blue"
                        variants={connLineAnim}
                        style={{ transformOrigin: 'top' }}
                      />
                      <motion.div variants={connArrowAnim}>
                        <ArrowDown size={16} strokeWidth={2} className="text-konten-blue -mt-[1px]" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          ))}

          {/* Closing rule */}
          <motion.div
            className="h-[1.5px] bg-konten-black"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65 }}
            style={{ transformOrigin: 'left' }}
          />
        </div>

      </div>
    </section>
  );
}
