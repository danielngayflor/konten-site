import { useState } from 'react';

type Props = React.ImgHTMLAttributes<HTMLImageElement>;

/**
 * Drop-in replacement for <img> that shows a shimmer skeleton
 * until the image has finished loading.
 */
export default function LazyImage({ className = '', style, ...props }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full" style={style}>
      {/* Shimmer sits underneath and fades out once image is ready */}
      <div
        className="absolute inset-0 skeleton-block"
        style={{
          opacity: loaded ? 0 : 1,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }}
      />
      <img
        {...props}
        className={`${className} w-full h-full`}
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
