import type { ReactNode } from 'react';

interface MarqueeProps {
  items: ReactNode[];
  speed?: number;
  direction?: 'left' | 'right';
  gap?: number;
  height?: number;
  className?: string;
}

export default function Marquee({
  items,
  speed = 30,
  direction = 'left',
  gap = 120,
  height = 80,
  className = '',
}: MarqueeProps) {
  const duplicatedItems = [...items, ...items];
  const direction_class = direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right';

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ height: `${height}px` }}
    >
      <div
        className={`flex items-center gap-[${gap}px] w-max ${direction_class}`}
        style={{
          animation: `${direction === 'left' ? 'scroll-left' : 'scroll-right'} ${speed}s linear infinite`,
          gap: `${gap}px`,
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <div key={idx} className="flex-shrink-0">
            {item}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
