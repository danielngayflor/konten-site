// Positioning.tsx Dynasty-inspired: white section, brand statement + video
import { useEffect, useRef } from 'react';

export default function Positioning() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <section className="bg-white text-konten-black overflow-hidden">

      {/* ── Brand statement ────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 pt-16 pb-12 md:pt-20 md:pb-16">
        <h2
          className="font-spartan font-black uppercase leading-none tracking-tighter text-konten-black mb-8"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
        >
          What We Believe
        </h2>
        <p
          className="font-body text-konten-black/80 leading-[1.65]"
          style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)' }}
        >
          We are driven by the idea that stories, real ones, told well have the
          power to move people to act. Every film, campaign, and piece of content
          we create has one job: move someone to act.
        </p>
      </div>

      {/* ── Video ─────────────────────────────────────────────────── */}
      <div className="px-6 sm:px-10 pb-16 md:pb-20 max-w-5xl mx-auto">
        <div
          className="w-full aspect-video rounded-2xl overflow-hidden bg-black/5"
          style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)' }}
        >
          <video
            ref={videoRef}
            src="/VIdeos/background.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    </section>
  );
}
