/**
 * SectionTransition — Apple-style scroll-driven icon.
 *
 * Place between two <section> elements. The component creates a scroll zone
 * (default 50 vh tall) with a matching background; the icon is fixed to the
 * viewport centre and scales  small → large → small  as you scroll through
 * the zone, giving the impression the icon "arrives" at each section.
 *
 * Hooks are always called (Rules of Hooks); the component renders nothing when
 * the user has requested reduced motion.
 */

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import type { ReactNode } from 'react';

interface SectionTransitionProps {
  icon: ReactNode;
  /** Tailwind bg class for the scroll zone — should match the incoming section */
  bg?: string;
  /** Tailwind text-color class applied to the icon */
  iconColor?: string;
  /** Height of the scroll zone, e.g. "50vh". Larger = slower animation. */
  zoneHeight?: string;
}

export default function SectionTransition({
  icon,
  bg = 'bg-konten-black',
  iconColor = 'text-konten-blue',
  zoneHeight = '50vh',
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track scroll progress across the full zone (enter viewport → leave viewport)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Scale:   0.25 at edges → 4.5 at centre → 0.25 at edges
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 4.5, 0.25]);

  // Opacity: fade in quickly, hold, fade out quickly
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  // Subtle vertical drift so the icon feels like it travels through the zone
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  // Respect system-level reduced-motion preference.
  // All hooks are called before this conditional return (Rules of Hooks ✓).
  if (shouldReduceMotion) return null;

  return (
    /* Scroll zone — creates the travel distance for the animation */
    <div
      ref={ref}
      className={`relative ${bg}`}
      style={{ height: zoneHeight }}
    >
      {/* Icon is fixed to the viewport centre so it stays centred while
          the user scrolls through the zone */}
      <motion.div
        className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                    z-30 pointer-events-none ${iconColor}`}
        style={{ scale, opacity, y }}
      >
        {icon}
      </motion.div>
    </div>
  );
}
