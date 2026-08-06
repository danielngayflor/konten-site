import { useState, useRef, useEffect } from 'react';
import { team } from '../../../data/team';
import Polaroid from '../../ui/Polaroid';
import Clapperboard from '../../ui/Clapperboard';

export default function TheTeam() {
  const rotations = [-2, 1, -3, 2, -1, 3];

  // Mobile carousel state
  const [mobileIdx, setMobileIdx]               = useState(0);
  const [overlayVisible, setOverlayVisible]     = useState(false);
  const touchStartX                             = useRef<number | null>(null);
  const didSwipe                                = useRef(false);

  // Hide overlay whenever the visible card changes (swipe or dot tap)
  useEffect(() => {
    setOverlayVisible(false);
  }, [mobileIdx]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    didSwipe.current = false;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      didSwipe.current = true;
      setMobileIdx((prev) =>
        diff > 0 ? (prev + 1) % team.length : (prev - 1 + team.length) % team.length
      );
    }
    touchStartX.current = null;
  };

  const handleCardTap = () => {
    if (didSwipe.current) return;
    setOverlayVisible((v) => !v);
  };

  const mobileMember = team[mobileIdx];

  return (
    <section className="bg-konten-black text-konten-cream py-32 md:py-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-eyebrow text-konten-cream inline-flex items-center gap-2 mb-6">
            THE KONTEN SQUAD <Clapperboard size={14} />
          </span>
          <h2 className="text-[clamp(2rem,7.5vw,6.5rem)] font-spartan font-black text-konten-cream uppercase leading-none tracking-tighter mb-8">
            SMALL TEAM.
            <br />
            BIG OUTPUT.
          </h2>
          <p className="font-inter text-body-lg leading-body text-konten-cream">
            We're a tiny squad of creatives, strategists, and storytellers based in Monrovia. We don't have big titles or ex-google in our bios.<br />
            We have something better. Local Context. Love What We Do. We Learn Fast.
          </p>
        </div>

        {/* ── Mobile carousel (below md) ──────────────────────────── */}
        <div
          className="md:hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{ touchAction: 'pan-y' }}
        >
          {/* Card — identical structure to desktop */}
          <div className="flex flex-col cursor-pointer" onClick={handleCardTap}>
            <div className="mb-6">
              <Polaroid rotation={rotations[mobileIdx]}>
                <div className="relative w-full h-full bg-gradient-to-br from-konten-blue/40 to-konten-black/30 flex items-center justify-center">
                  {/* Placeholder number */}
                  <span className="font-spartan font-black text-konten-cream/40 text-[3rem]">
                    0{mobileIdx + 1}
                  </span>
                  {/* Tap-to-reveal overlay — mirrors desktop hover overlay */}
                  <div
                    className={`absolute inset-0 bg-konten-black/75 transition-opacity duration-300 flex flex-col items-center justify-center p-5 text-center ${
                      overlayVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <p className="text-eyebrow text-konten-cream mb-3">
                      {mobileMember.role}
                    </p>
                    <p className="font-inter text-[14px] leading-relaxed text-konten-cream">
                      {mobileMember.bio}
                    </p>
                  </div>
                </div>
              </Polaroid>
            </div>

            {/* Name only — same as desktop */}
            <h3 className="font-spartan font-black text-konten-cream uppercase text-[1.75rem] tracking-tight leading-none">
              {mobileMember.name}
            </h3>
          </div>

          {/* Hint */}
          <p className="font-inter text-[13px] text-konten-cream/40 mt-3">
            Tap photo to reveal · Swipe to browse
          </p>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {team.map((_, i) => (
              <button
                key={i}
                onClick={() => setMobileIdx(i)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  i === mobileIdx ? 'bg-konten-cream' : 'bg-konten-cream/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── Desktop grid (md and above) — unchanged ─────────────── */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {team.map((member, i) => (
            <div key={member.role} className="flex flex-col group cursor-default">

              {/* Polaroid — scales up on hover */}
              <div className="mb-6 transition-transform duration-500 ease-in-out group-hover:scale-[1.04] origin-center">
                <Polaroid rotation={rotations[i]}>
                  <div className="relative w-full h-full bg-gradient-to-br from-konten-blue/40 to-konten-black/30 flex items-center justify-center">
                    <span className="font-spartan font-black text-konten-cream/40 text-[3rem]">
                      0{i + 1}
                    </span>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-konten-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-center p-5 text-center">
                      <p className="text-eyebrow text-konten-cream mb-3">
                        {member.role}
                      </p>
                      <p className="font-inter text-[14px] md:text-[15px] leading-relaxed text-konten-cream">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </Polaroid>
              </div>

              {/* Name only */}
              <h3 className="font-spartan font-black text-konten-cream uppercase text-[1.75rem] tracking-tight leading-none">
                {member.name}
              </h3>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
