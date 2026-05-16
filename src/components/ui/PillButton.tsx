import type { ReactNode } from 'react';

interface PillButtonProps {
  children: ReactNode;
  variant?: 'outline' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  tone?: 'dark' | 'light' | 'blue';
  onClick?: () => void;
  className?: string;
}

export default function PillButton({
  children,
  variant = 'outline',
  size = 'md',
  tone = 'dark',
  onClick,
  className = '',
}: PillButtonProps) {
  const sizeClasses = {
    sm: 'px-6 py-2 text-[11px]',
    md: 'px-8 py-[10px] text-[12px]',
    lg: 'px-10 py-3 text-[14px]',
  };

  const variantClasses = {
    outline: {
      dark: 'border-[1.5px] border-konten-black text-konten-black hover:bg-konten-black hover:text-konten-cream',
      light: 'border-[1.5px] border-konten-cream text-konten-cream hover:bg-konten-cream hover:text-konten-black',
      blue: 'border-[1.5px] border-konten-blue text-konten-blue hover:bg-konten-blue hover:text-konten-cream',
    },
    filled: {
      dark: 'bg-konten-black text-konten-cream hover:opacity-85',
      light: 'bg-konten-cream text-konten-black hover:opacity-85',
      blue: 'bg-konten-blue text-konten-cream hover:opacity-85',
    },
  };

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses[size]} ${variantClasses[variant][tone]} font-inter font-500 uppercase rounded-full transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );
}
