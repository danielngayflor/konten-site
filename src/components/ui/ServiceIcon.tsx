import type { ReactElement } from 'react';

interface ServiceIconProps {
  slug: string;
  size?: number;
  className?: string;
}

export default function ServiceIcon({
  slug,
  size = 32,
  className = '',
}: ServiceIconProps) {
  // strokeWidth '4' on a 100-unit viewBox produces ~2.2 px of actual stroke at
  // size 56 — the same visual weight as lucide strokeWidth={1} at size 56 px
  // (lucide uses a 24-unit viewBox: 56/24 × 1 ≈ 2.3 px).
  const s = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '4',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  const icons: Record<string, ReactElement> = {

    // ── Classic 35mm film / SLR camera ───────────────────────────────────────
    'media-coverage': (
      <svg viewBox="0 0 100 100" {...s}>
        {/* Camera body */}
        <rect x="14" y="35" width="72" height="46" rx="4" />
        {/* Pentaprism hump (SLR top) */}
        <path d="M 34 35 L 34 24 Q 34 20 38 20 L 56 20 Q 60 20 60 24 L 60 35" />
        {/* Lens — outer ring */}
        <circle cx="50" cy="58" r="16" />
        {/* Lens — inner element */}
        <circle cx="50" cy="58" r="8" />
        {/* Shutter button */}
        <circle cx="72" cy="33" r="4" />
        {/* Film advance / top trim */}
        <line x1="14" y1="35" x2="34" y2="35" />
        <line x1="60" y1="35" x2="86" y2="35" />
        {/* Strap lug — left */}
        <rect x="10" y="42" width="4" height="9" rx="1.5" />
        {/* Strap lug — right */}
        <rect x="86" y="42" width="4" height="9" rx="1.5" />
      </svg>
    ),

    // ── Smartphone with 9:16 video frame + play triangle ─────────────────────
    'social-and-story': (
      <svg viewBox="0 0 100 100" {...s}>
        {/* Phone outline */}
        <rect x="30" y="10" width="40" height="80" rx="6" />
        {/* Speaker notch */}
        <line x1="45" y1="16" x2="55" y2="16" />
        {/* 9:16 video frame */}
        <rect x="36" y="25" width="28" height="50" rx="1.5" />
        {/* Play triangle */}
        <path d="M 46 42 L 56 50 L 46 58 Z" fill="currentColor" stroke="none" />
        {/* Home indicator */}
        <line x1="42" y1="84" x2="58" y2="84" />
      </svg>
    ),

    // ── Two overlapping speech bubbles (conversation / brand voice) ───────────
    'brand-and-comms': (
      <svg viewBox="0 0 100 100" {...s}>
        {/* Back bubble — bottom-right */}
        <rect x="36" y="40" width="52" height="38" rx="5" />
        {/* Back bubble tail */}
        <path d="M 58 78 L 54 88 L 66 78" />
        {/* Front bubble — top-left (drawn on top) */}
        <rect x="12" y="16" width="52" height="38" rx="5" />
        {/* Front bubble tail */}
        <path d="M 34 54 L 30 64 L 44 54" />
        {/* Lines inside front bubble */}
        <line x1="22" y1="30" x2="54" y2="30" />
        <line x1="22" y1="40" x2="46" y2="40" />
      </svg>
    ),

    // ── Monitor with horizontal timeline bar inside ───────────────────────────
    'web-and-digital': (
      <svg viewBox="0 0 100 100" {...s}>
        {/* Monitor frame */}
        <rect x="10" y="20" width="80" height="55" rx="3" />
        {/* Stand */}
        <line x1="50" y1="75" x2="50" y2="85" />
        <line x1="35" y1="88" x2="65" y2="88" />
        {/* Timeline bar */}
        <line x1="20" y1="58" x2="80" y2="58" />
        {/* Timeline playhead */}
        <circle cx="42" cy="58" r="3" fill="currentColor" stroke="none" />
        {/* Track segments */}
        <line x1="20" y1="50" x2="35" y2="50" />
        <line x1="40" y1="50" x2="55" y2="50" />
        <line x1="60" y1="50" x2="80" y2="50" />
        {/* Header bar */}
        <line x1="15" y1="32" x2="40" y2="32" />
      </svg>
    ),

    // ── Whiteboard on easel with pointer stick ────────────────────────────────
    'training-and-capacity': (
      <svg viewBox="0 0 100 100" {...s}>
        {/* Whiteboard frame */}
        <rect x="12" y="10" width="76" height="54" rx="3" />
        {/* Header rail */}
        <line x1="12" y1="21" x2="88" y2="21" />
        {/* Easel legs */}
        <line x1="30" y1="64" x2="20" y2="90" />
        <line x1="70" y1="64" x2="80" y2="90" />
        {/* Crossbar */}
        <line x1="24" y1="80" x2="76" y2="80" />
        {/* Content lines on board */}
        <line x1="22" y1="34" x2="66" y2="34" />
        <line x1="22" y1="44" x2="56" y2="44" />
        {/* Pointer stick */}
        <line x1="70" y1="54" x2="48" y2="44" />
        <circle cx="70" cy="54" r="3" fill="currentColor" stroke="none" />
      </svg>
    ),

    // ── Studio broadcast mic on yoke with pop filter ──────────────────────────
    'creator-studio': (
      <svg viewBox="0 0 100 100" {...s}>
        {/* Yoke arm — left */}
        <path d="M 30 30 L 30 60 Q 30 70 40 70" />
        {/* Yoke arm — right */}
        <path d="M 70 30 L 70 60 Q 70 70 60 70" />
        {/* Mic body */}
        <rect x="40" y="20" width="20" height="40" rx="3" />
        {/* Mic grille lines */}
        <line x1="44" y1="28" x2="56" y2="28" />
        <line x1="44" y1="35" x2="56" y2="35" />
        <line x1="44" y1="42" x2="56" y2="42" />
        {/* Pop filter */}
        <ellipse cx="50" cy="78" rx="14" ry="6" />
        {/* Pop filter stem */}
        <line x1="50" y1="70" x2="50" y2="72" />
        {/* Stand base */}
        <line x1="40" y1="88" x2="60" y2="88" />
      </svg>
    ),
  };

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {icons[slug] ?? (
        <svg viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="40" />
        </svg>
      )}
    </div>
  );
}
