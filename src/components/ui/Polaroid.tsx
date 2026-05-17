import type { ReactNode } from 'react';

interface PolaroidProps {
  children?: ReactNode;
  src?: string;
  alt?: string;
  rotation?: number;
  caption?: string;
  className?: string;
}

export default function Polaroid({
  children,
  src,
  alt = 'Polaroid image',
  rotation = Math.random() * 4 - 2,
  caption,
  className = '',
}: PolaroidProps) {
  return (
    <div
      className={`bg-white p-3 shadow-lg ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        aspectRatio: '3 / 4',
      }}
    >
      <div className="w-full h-full bg-gray-200 flex items-center justify-center overflow-hidden">
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          children
        )}
      </div>
      {caption && (
        <p className="font-inter text-[13px] text-konten-black mt-2 text-center">
          {caption}
        </p>
      )}
    </div>
  );
}
