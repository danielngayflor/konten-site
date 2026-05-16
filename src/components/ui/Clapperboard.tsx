interface ClapperboardProps {
  size?: number;
  className?: string;
}

export default function Clapperboard({ size = 18, className = '' }: ClapperboardProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      className={className}
    >
      {/* Body of the slate (rectangle) */}
      <rect x="2" y="9" width="20" height="13" rx="0.5" />
      {/* Angled top stick with diagonal stripes */}
      <path d="M2 9 L4.5 4 L9.5 4 L7 9 Z" fill="currentColor" stroke="none" />
      <path d="M9.5 4 L14.5 4 L12 9 L7 9 Z" fill="none" />
      <path d="M14.5 4 L19.5 4 L17 9 L12 9 Z" fill="currentColor" stroke="none" />
      <path d="M19.5 4 L22 4 L22 9 L17 9 Z" fill="none" />
    </svg>
  );
}
