import { useState, useRef } from 'react';
import { values } from '../../../data/values';

export default function OurValues() {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const [mobileIdx, setMobileIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const didSwipe = useRef(false);

  const handleMouseEnter = (name: string) =>
    setFlipped((prev) => ({ ...prev, [name]: true }));

  const handleMouseLeave = (name: string) =>
    setFlipped((prev) => ({ ...prev, [name]: false }));

  const handleClick = (name: string) => {
    const isHoverDevice = window.matchMedia('(hover: hover)').matches;
    if (!isHoverDevice) {
      setFlipped((prev) => ({ ...prev, [name]: !prev[name] }));
    }
  };

  const handleMobileFlip = (name: string) => {
    if (didSwipe.current) return;
    setFlipped((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    didSwipe.current = false;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      didSwipe.current = true;
      if (diff > 0) {
        setMobileIdx((prev) => (prev + 1) % values.length);
      } else {
        setMobileIdx((prev) => (prev - 1 + values.length) % values.length);
      }
    }
    touchStartX.current = null;
  };

  const mobileValue = values[mobileIdx];

  const FlipCard = ({ value }: { value: typeof values[number] }) => (
    <div
      className={`h-[260px] cursor-pointer rounded-2xl overflow-hidden border border-border-gray transition-colors duration-700 ${flipped[value.name] ? 'border-konten-blue/50' : 'border-border-gray'}`}
      style={{ perspective: '1200px' }}
      onMouseEnter={() => handleMouseEnter(value.name)}
      onMouseLeave={() => handleMouseLeave(value.name)}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 ease-in-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped[value.name] ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front value name */}
        <div
          className="absolute inset-0 bg-dark-gray flex items-center justify-center p-8"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <h3 className="font-spartan font-black text-white uppercase leading-none tracking-tighter text-[clamp(1.4rem,2.8vw,2.4rem)] text-center break-words hyphens-auto">
            {value.name}
          </h3>
        </div>

        {/* Back description */}
        <div
          className="absolute inset-0 bg-konten-blue flex items-center justify-center p-8"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <p className="font-body text-body-lg text-white leading-[1.65] text-center">
            {value.description}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-charcoal text-white py-32 md:py-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        <div className="mb-20 border-b border-border-gray pb-8">
          <p className="text-eyebrow text-mid-gray">Our Values</p>
        </div>

        {/* Mobile carousel (below md) */}
        <div
          className="md:hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{ touchAction: 'pan-y' }}
        >
          <div onClick={() => handleMobileFlip(mobileValue.name)}>
            <FlipCard value={mobileValue} />
          </div>

          {/* Hint text */}
          <p className="text-center font-body text-[13px] text-white/40 mt-4">
            Tap to flip · Swipe to browse
          </p>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {values.map((_, i) => (
              <button
                key={i}
                onClick={() => setMobileIdx(i)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  i === mobileIdx ? 'bg-white' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop grid (md and above) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value) => (
            <div
              key={value.name}
              onClick={() => handleClick(value.name)}
            >
              <FlipCard value={value} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
