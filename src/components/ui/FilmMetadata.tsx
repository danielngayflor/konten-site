interface FilmMetadataProps {
  text: string;
  className?: string;
}

export default function FilmMetadata({ text, className = '' }: FilmMetadataProps) {
  return (
    <p
      className={`font-mono text-[11px] uppercase tracking-widest text-konten-black ${className}`}
    >
      {text}
    </p>
  );
}
