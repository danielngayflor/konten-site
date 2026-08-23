import { useState, useEffect, useRef } from 'react';

/**
 * Drop-in replacement for <img> that shows a shimmer skeleton exactly where
 * the image will appear, cross-fades to the real image on load, then clears
 * all inline styles so Tailwind hover/transform animations work normally.
 *
 * Usage:
 *   <LazyImage src="…" alt="…" className="object-cover" />
 *
 * The component always fills its parent (w-full h-full), so wrap it in a
 * sized container the same way you would a plain <img>.
 *
 * Pass `style` for explicit width/height overrides (applied to the wrapper div).
 */
type Props = React.ImgHTMLAttributes<HTMLImageElement>;

type Phase = 'skeleton' | 'fading' | 'ready';

export default function LazyImage({ className = '', style, onLoad, ...props }: Props) {
  const [phase, setPhase] = useState<Phase>('skeleton');
  const imgRef   = useRef<HTMLImageElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Move through skeleton → fading → ready, giving the cross-fade 420 ms. */
  const advance = () => {
    setPhase('fading');
    timerRef.current = setTimeout(() => setPhase('ready'), 420);
  };

  // Images already in the browser cache fire complete=true before React wires onLoad.
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      advance();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    advance();
    onLoad?.(e);
  };

  // Inline style is ONLY present during the animation window so that Tailwind
  // hover transitions (e.g. group-hover:scale-105) are not clobbered afterwards.
  const imgStyle: React.CSSProperties | undefined =
    phase === 'skeleton' ? { opacity: 0, transition: 'opacity 0.42s ease' } :
    phase === 'fading'   ? { opacity: 1, transition: 'opacity 0.42s ease' } :
    undefined;

  return (
    <div className="relative w-full h-full" style={style}>
      {/* Shimmer skeleton present until the cross-fade finishes */}
      {phase !== 'ready' && (
        <div
          className="absolute inset-0 skeleton-block pointer-events-none"
          style={{
            opacity:    phase === 'skeleton' ? 1 : 0,
            transition: 'opacity 0.42s ease',
          }}
        />
      )}

      <img
        ref={imgRef}
        {...props}
        className={`${className} w-full h-full`}
        style={imgStyle}
        onLoad={handleLoad}
      />
    </div>
  );
}
