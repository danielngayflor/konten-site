import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useId } from 'react';
import type { ReactElement } from 'react';

export type CollageElementType =
  // Camera & capture
  | 'vintage-camera'
  | 'cinema-camera'
  | 'polaroid'
  // Film media
  | 'film-canister'
  | 'film-strip'
  // Audio
  | 'studio-mic'
  | 'boom-mic'
  | 'headphones'
  | 'vinyl-record'
  | 'cassette-tape'
  // Production
  | 'clapperboard'
  | 'loupe'
  | 'script-page'
  | 'directors-chair'
  | 'on-air-sign'
  | 'walkie-talkie';

interface CollageElementProps {
  type: CollageElementType;
  /** When provided, renders a PNG sticker image instead of the SVG illustration. */
  src?: string;
  position?: { top?: string; right?: string; bottom?: string; left?: string };
  rotation?: number;
  parallaxStrength?: number;
  scale?: number;
  hideBelow?: 'sm' | 'md' | 'lg' | 'never';
  anim?: 'float' | 'float-slow' | 'pulse' | 'none';
  size?: number;
  delay?: number;
}

/* ─── SVG illustrations ──────────────────────────────────────────── */

const Illustrations: Record<CollageElementType, (id: string) => ReactElement> = {
  'vintage-camera': (id) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1a1a" />
          <stop offset="0.5" stopColor="#0a0a0a" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <linearGradient id={`${id}-chrome`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FDFBD4" />
          <stop offset="0.5" stopColor="#c9c7a8" />
          <stop offset="1" stopColor="#7a7860" />
        </linearGradient>
        <radialGradient id={`${id}-lens`} cx="0.5" cy="0.5">
          <stop offset="0" stopColor="#3a3a3a" />
          <stop offset="0.6" stopColor="#0a0a0a" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
      </defs>
      <rect x="12" y="32" width="76" height="46" rx="3" fill={`url(#${id}-body)`} />
      <rect x="12" y="22" width="76" height="14" rx="2" fill={`url(#${id}-chrome)`} />
      <circle cx="78" cy="29" r="4" fill="#0a0a0a" />
      <circle cx="78" cy="29" r="2.5" fill="#FDFBD4" />
      <circle cx="22" cy="27" r="3" fill="#00249C" />
      <rect x="38" y="25" width="14" height="6" rx="1" fill="#1a1a1a" stroke="#FDFBD4" strokeWidth="0.5" />
      <circle cx="50" cy="56" r="20" fill="#0a0a0a" />
      <circle cx="50" cy="56" r="18" fill="none" stroke={`url(#${id}-chrome)`} strokeWidth="1.5" />
      <circle cx="50" cy="56" r="14" fill={`url(#${id}-lens)`} />
      <ellipse cx="46" cy="51" rx="4" ry="3" fill="#FDFBD4" opacity="0.4" />
      <circle cx="50" cy="56" r="8" fill="none" stroke="#00249C" strokeWidth="0.8" opacity="0.6" />
      <rect x="58" y="42" width="14" height="3" rx="0.5" fill="#FDFBD4" />
      <rect x="8" y="28" width="4" height="4" rx="1" fill="#FDFBD4" />
      <rect x="88" y="28" width="4" height="4" rx="1" fill="#FDFBD4" />
    </svg>
  ),

  'cinema-camera': (id) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2a2a" />
          <stop offset="1" stopColor="#0a0a0a" />
        </linearGradient>
      </defs>
      <rect x="35" y="14" width="30" height="5" rx="1" fill="#0a0a0a" />
      <rect x="35" y="19" width="30" height="3" fill="#1a1a1a" />
      <rect x="20" y="28" width="55" height="42" rx="3" fill={`url(#${id}-body)`} />
      <rect x="22" y="32" width="51" height="2" fill="#00249C" />
      <rect x="26" y="38" width="14" height="10" rx="1" fill="#FDFBD4" opacity="0.85" />
      <rect x="27" y="39" width="12" height="8" fill="#00249C" opacity="0.3" />
      <circle cx="48" cy="43" r="1.5" fill="#FDFBD4" />
      <circle cx="54" cy="43" r="1.5" fill="#FDFBD4" />
      <rect x="44" y="50" width="14" height="3" rx="0.5" fill="#FDFBD4" opacity="0.6" />
      <circle cx="62" cy="55" r="11" fill="#1a1a1a" />
      <circle cx="62" cy="55" r="8" fill="#0a0a0a" stroke="#FDFBD4" strokeWidth="0.6" />
      <circle cx="62" cy="55" r="4" fill="#000" />
      <ellipse cx="59" cy="52" rx="2" ry="1.5" fill="#FDFBD4" opacity="0.3" />
      <rect x="76" y="44" width="16" height="22" rx="1" fill="#0a0a0a" stroke="#FDFBD4" strokeWidth="0.5" />
      <rect x="78" y="46" width="12" height="18" fill="#1a1a1a" />
      <rect x="42" y="70" width="12" height="4" fill="#1a1a1a" />
      <line x1="48" y1="74" x2="34" y2="92" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" />
      <line x1="48" y1="74" x2="48" y2="92" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" />
      <line x1="48" y1="74" x2="62" y2="92" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  polaroid: (id) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}-frame`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FDFBD4" />
          <stop offset="1" stopColor="#e8e6c0" />
        </linearGradient>
        <linearGradient id={`${id}-photo`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#809DFF" />
          <stop offset="0.5" stopColor="#00249C" />
          <stop offset="1" stopColor="#0a1430" />
        </linearGradient>
      </defs>
      <rect x="14" y="16" width="72" height="78" rx="1" fill="#0a0a0a" opacity="0.18" />
      <rect x="12" y="14" width="72" height="78" rx="1" fill={`url(#${id}-frame)`} />
      <rect x="18" y="20" width="60" height="58" fill={`url(#${id}-photo)`} />
      <rect x="18" y="48" width="60" height="2" fill="#FDFBD4" opacity="0.3" />
      <circle cx="58" cy="34" r="6" fill="#F2E81D" opacity="0.7" />
      <rect x="18" y="20" width="6" height="58" fill="#F2E81D" opacity="0.15" />
      <line x1="24" y1="86" x2="60" y2="86" stroke="#0a0a0a" strokeWidth="0.5" opacity="0.3" />
    </svg>
  ),

  'film-canister': (id) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`${id}-metal`} cx="0.4" cy="0.4">
          <stop offset="0" stopColor="#FDFBD4" />
          <stop offset="0.5" stopColor="#c9c7a8" />
          <stop offset="1" stopColor="#5a5848" />
        </radialGradient>
      </defs>
      <ellipse cx="52" cy="78" rx="32" ry="6" fill="#0a0a0a" opacity="0.2" />
      <circle cx="50" cy="50" r="34" fill={`url(#${id}-metal)`} />
      <circle cx="50" cy="50" r="34" fill="none" stroke="#0a0a0a" strokeWidth="1" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="#0a0a0a" strokeWidth="0.5" opacity="0.4" />
      <circle cx="50" cy="50" r="22" fill="#00249C" />
      <circle cx="50" cy="50" r="22" fill="none" stroke="#FDFBD4" strokeWidth="0.6" />
      <circle cx="50" cy="50" r="4" fill="#0a0a0a" />
      <text x="50" y="42" textAnchor="middle" fontSize="5.5" fill="#FDFBD4" fontFamily="Anton, sans-serif" letterSpacing="0.5">35mm</text>
      <text x="50" y="65" textAnchor="middle" fontSize="3.5" fill="#FDFBD4" fontFamily="Inter, sans-serif" letterSpacing="0.5">KONTEN</text>
      <ellipse cx="38" cy="38" rx="10" ry="6" fill="#FDFBD4" opacity="0.25" />
      <rect x="78" y="46" width="8" height="8" rx="1" fill="#5a5848" stroke="#0a0a0a" strokeWidth="0.5" />
    </svg>
  ),

  'film-strip': (id) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}-frame1`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#809DFF" />
          <stop offset="1" stopColor="#00249C" />
        </linearGradient>
        <linearGradient id={`${id}-frame2`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F2E81D" />
          <stop offset="1" stopColor="#c4ad00" />
        </linearGradient>
      </defs>
      <rect x="6" y="22" width="88" height="56" rx="1" fill="#0a0a0a" />
      {[14, 26, 38, 50, 62, 74, 86].map((x) => (
        <rect key={`t${x}`} x={x - 2.5} y="26" width="5" height="4" rx="0.5" fill="#FDFBD4" />
      ))}
      {[14, 26, 38, 50, 62, 74, 86].map((x) => (
        <rect key={`b${x}`} x={x - 2.5} y="70" width="5" height="4" rx="0.5" fill="#FDFBD4" />
      ))}
      <rect x="11" y="34" width="18" height="32" fill={`url(#${id}-frame1)`} />
      <rect x="32" y="34" width="18" height="32" fill={`url(#${id}-frame2)`} />
      <circle cx="41" cy="50" r="5" fill="#FDFBD4" opacity="0.6" />
      <rect x="53" y="34" width="18" height="32" fill="#FDFBD4" />
      <rect x="55" y="40" width="14" height="3" fill="#0a0a0a" opacity="0.6" />
      <rect x="55" y="46" width="10" height="3" fill="#0a0a0a" opacity="0.4" />
      <rect x="74" y="34" width="18" height="32" fill={`url(#${id}-frame1)`} opacity="0.7" />
      <line x1="6" y1="46" x2="94" y2="48" stroke="#FDFBD4" strokeWidth="0.3" opacity="0.4" />
    </svg>
  ),

  'vinyl-record': (id) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`${id}-disc`} cx="0.5" cy="0.5">
          <stop offset="0" stopColor="#1a1a1a" />
          <stop offset="0.7" stopColor="#0a0a0a" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <radialGradient id={`${id}-shine`} cx="0.3" cy="0.3">
          <stop offset="0" stopColor="#FDFBD4" stopOpacity="0.4" />
          <stop offset="0.5" stopColor="#FDFBD4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="42" fill={`url(#${id}-disc)`} />
      {[38, 34, 30, 26, 22].map((r) => (
        <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="#1a1a1a" strokeWidth="0.4" />
      ))}
      <circle cx="50" cy="50" r="42" fill={`url(#${id}-shine)`} />
      <circle cx="50" cy="50" r="16" fill="#00249C" />
      <circle cx="50" cy="50" r="16" fill="none" stroke="#FDFBD4" strokeWidth="0.5" />
      <text x="50" y="46" textAnchor="middle" fontSize="4" fill="#FDFBD4" fontFamily="Anton, sans-serif" letterSpacing="0.5">KONTEN</text>
      <text x="50" y="56" textAnchor="middle" fontSize="2.5" fill="#FDFBD4" fontFamily="Inter, sans-serif" opacity="0.85">SIDE A</text>
      <circle cx="50" cy="50" r="2.5" fill="#0a0a0a" />
    </svg>
  ),

  'cassette-tape': (id) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2a2a" />
          <stop offset="1" stopColor="#0a0a0a" />
        </linearGradient>
      </defs>
      <rect x="10" y="22" width="80" height="58" rx="3" fill="#0a0a0a" opacity="0.2" />
      <rect x="8" y="20" width="80" height="58" rx="3" fill={`url(#${id}-body)`} />
      <rect x="14" y="26" width="68" height="20" rx="1" fill="#FDFBD4" />
      <rect x="14" y="26" width="68" height="4" fill="#00249C" />
      <text x="48" y="29" textAnchor="middle" fontSize="3" fill="#FDFBD4" fontFamily="Inter, sans-serif">KONTEN MIXTAPE</text>
      <line x1="18" y1="36" x2="78" y2="36" stroke="#0a0a0a" strokeWidth="0.4" opacity="0.4" />
      <line x1="18" y1="40" x2="68" y2="40" stroke="#0a0a0a" strokeWidth="0.4" opacity="0.4" />
      <rect x="18" y="50" width="26" height="22" rx="1" fill="#0a0a0a" />
      <rect x="52" y="50" width="26" height="22" rx="1" fill="#0a0a0a" />
      <circle cx="31" cy="61" r="7" fill="#5a4a30" />
      <circle cx="31" cy="61" r="4" fill="#0a0a0a" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <rect key={`l${deg}`} x="29.5" y="55" width="3" height="3" fill="#0a0a0a" transform={`rotate(${deg} 31 61)`} />
      ))}
      <circle cx="65" cy="61" r="7" fill="#5a4a30" />
      <circle cx="65" cy="61" r="4" fill="#0a0a0a" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <rect key={`r${deg}`} x="63.5" y="55" width="3" height="3" fill="#0a0a0a" transform={`rotate(${deg} 65 61)`} />
      ))}
      <rect x="36" y="74" width="24" height="3" rx="0.5" fill="#FDFBD4" opacity="0.4" />
    </svg>
  ),

  clapperboard: (id) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}-slate`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1a1a" />
          <stop offset="1" stopColor="#0a0a0a" />
        </linearGradient>
      </defs>
      <rect x="12" y="44" width="76" height="48" rx="1" fill="#0a0a0a" opacity="0.2" />
      <rect x="10" y="20" width="80" height="14" fill="#FDFBD4" />
      {[0, 1, 2, 3].map((i) => (
        <polygon key={i} points={`${10 + i * 20},20 ${20 + i * 20},20 ${30 + i * 20},34 ${20 + i * 20},34`} fill="#0a0a0a" />
      ))}
      <circle cx="14" cy="36" r="2" fill="#5a5848" />
      <circle cx="86" cy="36" r="2" fill="#5a5848" />
      <rect x="10" y="38" width="80" height="48" rx="1" fill={`url(#${id}-slate)`} />
      <line x1="14" y1="48" x2="86" y2="48" stroke="#FDFBD4" strokeWidth="0.4" opacity="0.5" />
      <text x="14" y="52" fontSize="3.5" fill="#FDFBD4" fontFamily="Anton, sans-serif" letterSpacing="0.5">SCENE</text>
      <text x="74" y="52" fontSize="3.5" fill="#FDFBD4" fontFamily="Anton, sans-serif">TAKE</text>
      <text x="20" y="64" fontSize="9" fill="#FDFBD4" fontFamily="Anton, sans-serif">01</text>
      <text x="76" y="64" fontSize="9" fill="#FDFBD4" fontFamily="Anton, sans-serif">02</text>
      <line x1="14" y1="70" x2="86" y2="70" stroke="#FDFBD4" strokeWidth="0.4" opacity="0.5" />
      <text x="14" y="74" fontSize="3.5" fill="#FDFBD4" fontFamily="Anton, sans-serif" letterSpacing="0.5">DIR</text>
      <line x1="28" y1="76" x2="84" y2="76" stroke="#FDFBD4" strokeWidth="0.3" opacity="0.4" />
      <text x="14" y="83" fontSize="3.5" fill="#FDFBD4" fontFamily="Anton, sans-serif" letterSpacing="0.5">DATE</text>
      <line x1="32" y1="85" x2="84" y2="85" stroke="#FDFBD4" strokeWidth="0.3" opacity="0.4" />
    </svg>
  ),

  'studio-mic': (id) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a3a3a" />
          <stop offset="0.5" stopColor="#1a1a1a" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
      </defs>
      <path d="M 25 30 Q 25 60 32 65" fill="none" stroke="#5a5848" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 75 30 Q 75 60 68 65" fill="none" stroke="#5a5848" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="38" y="18" width="24" height="48" rx="3" fill={`url(#${id}-body)`} />
      <ellipse cx="50" cy="20" rx="14" ry="6" fill="#3a3a3a" />
      <ellipse cx="50" cy="20" rx="11" ry="4" fill="#1a1a1a" />
      <line x1="40" y1="28" x2="60" y2="28" stroke="#FDFBD4" strokeWidth="0.4" opacity="0.4" />
      <line x1="40" y1="34" x2="60" y2="34" stroke="#FDFBD4" strokeWidth="0.4" opacity="0.4" />
      <line x1="40" y1="40" x2="60" y2="40" stroke="#FDFBD4" strokeWidth="0.4" opacity="0.4" />
      <line x1="40" y1="46" x2="60" y2="46" stroke="#FDFBD4" strokeWidth="0.4" opacity="0.4" />
      <rect x="40" y="22" width="2" height="40" fill="#FDFBD4" opacity="0.2" />
      <rect x="44" y="56" width="12" height="3" rx="0.5" fill="#00249C" />
      <rect x="42" y="66" width="16" height="6" rx="1" fill="#5a5848" />
      <rect x="48" y="72" width="4" height="14" fill="#5a5848" />
      <ellipse cx="50" cy="88" rx="14" ry="3" fill="#5a5848" />
      <ellipse cx="50" cy="87" rx="14" ry="2" fill="#3a3a3a" />
    </svg>
  ),

  'boom-mic': (id) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}-pole`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a5848" />
          <stop offset="1" stopColor="#1a1a1a" />
        </linearGradient>
      </defs>
      <line x1="14" y1="84" x2="64" y2="34" stroke={`url(#${id}-pole)`} strokeWidth="3" strokeLinecap="round" />
      <circle cx="64" cy="34" r="3" fill="#0a0a0a" />
      <rect x="62" y="22" width="6" height="14" fill="#1a1a1a" />
      <ellipse cx="65" cy="22" rx="14" ry="9" fill="#5a4a30" />
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const x1 = 65 + Math.cos(angle) * 11;
        const y1 = 22 + Math.sin(angle) * 7;
        const x2 = 65 + Math.cos(angle) * 14;
        const y2 = 22 + Math.sin(angle) * 9;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3a2a18" strokeWidth="0.5" />;
      })}
      <ellipse cx="65" cy="22" rx="14" ry="9" fill="none" stroke="#3a2a18" strokeWidth="0.4" />
      <ellipse cx="60" cy="18" rx="6" ry="3" fill="#FDFBD4" opacity="0.15" />
      <rect x="10" y="80" width="10" height="8" rx="1" fill="#0a0a0a" />
    </svg>
  ),

  headphones: (id) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}-cup`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2a2a" />
          <stop offset="1" stopColor="#0a0a0a" />
        </linearGradient>
      </defs>
      <path d="M 22 56 Q 22 22 50 22 Q 78 22 78 56" fill="none" stroke="#0a0a0a" strokeWidth="6" strokeLinecap="round" />
      <path d="M 22 56 Q 22 22 50 22 Q 78 22 78 56" fill="none" stroke="#FDFBD4" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <path d="M 36 25 Q 50 18 64 25" fill="none" stroke="#5a4a30" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="22" cy="58" rx="14" ry="16" fill={`url(#${id}-cup)`} />
      <ellipse cx="22" cy="58" rx="11" ry="13" fill="#5a4a30" />
      <ellipse cx="22" cy="58" rx="8" ry="10" fill="#3a2a18" />
      <ellipse cx="78" cy="58" rx="14" ry="16" fill={`url(#${id}-cup)`} />
      <ellipse cx="78" cy="58" rx="11" ry="13" fill="#5a4a30" />
      <ellipse cx="78" cy="58" rx="8" ry="10" fill="#3a2a18" />
      <rect x="16" y="55" width="12" height="2" rx="0.5" fill="#00249C" />
      <rect x="72" y="55" width="12" height="2" rx="0.5" fill="#00249C" />
      <path d="M 22 74 Q 26 86 36 88" fill="none" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  loupe: (id) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`${id}-glass`} cx="0.4" cy="0.4">
          <stop offset="0" stopColor="#FDFBD4" stopOpacity="0.6" />
          <stop offset="0.6" stopColor="#809DFF" stopOpacity="0.3" />
          <stop offset="1" stopColor="#00249C" stopOpacity="0.5" />
        </radialGradient>
      </defs>
      <rect x="62" y="62" width="30" height="10" rx="2" fill="#5a4a30" transform="rotate(35 62 62)" />
      <rect x="62" y="64" width="30" height="2" fill="#FDFBD4" opacity="0.3" transform="rotate(35 62 62)" />
      <circle cx="62" cy="62" r="6" fill="#c4ad00" />
      <circle cx="62" cy="62" r="6" fill="none" stroke="#7a6800" strokeWidth="0.8" />
      <circle cx="38" cy="38" r="28" fill="none" stroke="#c4ad00" strokeWidth="5" />
      <circle cx="38" cy="38" r="28" fill="none" stroke="#7a6800" strokeWidth="0.8" />
      <circle cx="38" cy="38" r="24" fill={`url(#${id}-glass)`} />
      <ellipse cx="30" cy="30" rx="6" ry="4" fill="#FDFBD4" opacity="0.7" />
      <ellipse cx="46" cy="46" rx="3" ry="2" fill="#FDFBD4" opacity="0.4" />
    </svg>
  ),

  'script-page': (id) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}-paper`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FDFBD4" />
          <stop offset="1" stopColor="#e8e6c0" />
        </linearGradient>
      </defs>
      <rect x="20" y="22" width="60" height="72" rx="1" fill="#0a0a0a" opacity="0.15" />
      <rect x="22" y="20" width="60" height="72" rx="1" fill="#c9c7a8" />
      <rect x="18" y="16" width="60" height="72" rx="1" fill={`url(#${id}-paper)`} />
      <rect x="38" y="12" width="20" height="10" rx="1" fill="#0a0a0a" />
      <rect x="40" y="14" width="16" height="2" fill="#FDFBD4" opacity="0.4" />
      <text x="48" y="32" textAnchor="middle" fontSize="3" fill="#0a0a0a" fontFamily="Anton, sans-serif" letterSpacing="0.5">SCENE 01</text>
      <line x1="24" y1="36" x2="72" y2="36" stroke="#0a0a0a" strokeWidth="0.5" />
      {[42, 48, 54, 60, 66, 72, 78].map((y) => (
        <line key={y} x1="26" y1={y} x2={y % 12 === 0 ? 56 : 70} y2={y} stroke="#0a0a0a" strokeWidth="0.5" opacity="0.5" />
      ))}
      <path d="M 78 88 L 70 84 L 78 84 Z" fill="#c9c7a8" />
    </svg>
  ),

  'directors-chair': (id) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}-canvas`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a3a3a" />
          <stop offset="1" stopColor="#0a0a0a" />
        </linearGradient>
      </defs>
      <line x1="22" y1="14" x2="22" y2="88" stroke="#5a4a30" strokeWidth="3" strokeLinecap="round" />
      <line x1="78" y1="14" x2="78" y2="88" stroke="#5a4a30" strokeWidth="3" strokeLinecap="round" />
      <line x1="30" y1="50" x2="30" y2="92" stroke="#3a2a18" strokeWidth="3" strokeLinecap="round" />
      <line x1="70" y1="50" x2="70" y2="92" stroke="#3a2a18" strokeWidth="3" strokeLinecap="round" />
      <line x1="22" y1="74" x2="78" y2="74" stroke="#5a4a30" strokeWidth="2" />
      <rect x="22" y="20" width="56" height="14" fill={`url(#${id}-canvas)`} />
      <text x="50" y="29" textAnchor="middle" fontSize="6" fill="#FDFBD4" fontFamily="Anton, sans-serif" letterSpacing="0.5">KONTEN</text>
      <rect x="22" y="56" width="56" height="14" fill={`url(#${id}-canvas)`} />
      <line x1="22" y1="60" x2="78" y2="60" stroke="#FDFBD4" strokeWidth="0.4" opacity="0.3" />
    </svg>
  ),

  'on-air-sign': (id) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}-glow`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F2E81D" />
          <stop offset="1" stopColor="#c4ad00" />
        </linearGradient>
      </defs>
      <rect x="14" y="32" width="72" height="36" rx="3" fill="#0a0a0a" />
      <rect x="14" y="32" width="72" height="36" rx="3" fill="none" stroke="#5a5848" strokeWidth="1" />
      <rect x="20" y="38" width="60" height="24" rx="1" fill={`url(#${id}-glow)`} />
      <text x="50" y="55" textAnchor="middle" fontSize="14" fill="#0a0a0a" fontFamily="Anton, sans-serif" letterSpacing="2">ON AIR</text>
      <rect x="46" y="22" width="8" height="10" fill="#5a5848" />
      <circle cx="50" cy="22" r="2" fill="#FDFBD4" />
      <ellipse cx="50" cy="50" rx="44" ry="22" fill="#F2E81D" opacity="0.15" />
    </svg>
  ),

  'walkie-talkie': (id) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a3a3a" />
          <stop offset="1" stopColor="#0a0a0a" />
        </linearGradient>
      </defs>
      <line x1="56" y1="6" x2="56" y2="22" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="56" cy="6" r="2" fill="#1a1a1a" />
      <rect x="32" y="22" width="36" height="60" rx="3" fill={`url(#${id}-body)`} />
      <rect x="38" y="28" width="24" height="14" rx="1" fill="#1a1a1a" />
      {[30, 33, 36, 39].map((y) => (
        <line key={y} x1="40" y1={y} x2="60" y2={y} stroke="#FDFBD4" strokeWidth="0.5" opacity="0.3" />
      ))}
      <rect x="38" y="46" width="24" height="10" rx="1" fill="#F2E81D" opacity="0.6" />
      <text x="50" y="53" textAnchor="middle" fontSize="4" fill="#0a0a0a" fontFamily="Anton, sans-serif">CH 04</text>
      <circle cx="42" cy="64" r="2.5" fill="#FDFBD4" />
      <circle cx="50" cy="64" r="2.5" fill="#FDFBD4" />
      <circle cx="58" cy="64" r="2.5" fill="#FDFBD4" />
      <rect x="40" y="70" width="20" height="6" rx="1" fill="#00249C" />
      <rect x="68" y="34" width="3" height="10" rx="0.5" fill="#5a5848" />
    </svg>
  ),
};

/* ─── Sticker grain SVG filter (injected once, referenced by CSS) ── */
function GrainFilter({ id }: { id: string }) {
  return (
    <svg width="0" height="0" style={{ position: 'absolute', overflow: 'hidden' }} aria-hidden="true">
      <defs>
        <filter id={id} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" stitchTiles="stitch" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
          <feComponentTransfer in="grayNoise" result="dimNoise">
            <feFuncR type="linear" slope="0.18" intercept="0.41" />
            <feFuncG type="linear" slope="0.18" intercept="0.41" />
            <feFuncB type="linear" slope="0.18" intercept="0.41" />
          </feComponentTransfer>
          <feComposite in="dimNoise" in2="SourceGraphic" operator="in" result="maskedNoise" />
          <feBlend in="SourceGraphic" in2="maskedNoise" mode="soft-light" result="grained" />
          <feComposite in="grained" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}

/* ─── Component ──────────────────────────────────────────────────── */

const hideClass: Record<NonNullable<CollageElementProps['hideBelow']>, string> = {
  sm: 'hidden sm:block',
  md: 'hidden md:block',
  lg: 'hidden lg:block',
  never: '',
};

const animClass: Record<NonNullable<CollageElementProps['anim']>, string> = {
  float: 'konten-anim-float',
  'float-slow': 'konten-anim-float-slow',
  pulse: 'konten-anim-pulse',
  none: '',
};

const animDuration: Record<NonNullable<CollageElementProps['anim']>, string> = {
  float: '5s',
  'float-slow': '7s',
  pulse: '2.4s',
  none: '0s',
};

const animKeyframes: Record<NonNullable<CollageElementProps['anim']>, string> = {
  float: 'konten-float',
  'float-slow': 'konten-float-slow',
  pulse: 'konten-pulse',
  none: '',
};

export default function CollageElement({
  type,
  src,
  position = {},
  rotation = 0,
  parallaxStrength = 0.1,
  scale = 1,
  hideBelow,
  anim = 'float',
  size = 96,
  delay = 0,
}: CollageElementProps) {
  const isSticker = Boolean(src);
  const resolvedHideBelow = hideBelow ?? (isSticker ? 'never' : 'md');
  const ref = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, '');
  const grainId = `grain-${id}`;
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1500], [0, parallaxStrength * 150]);

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const isMobile =
    typeof window !== 'undefined' && window.innerWidth < 768;
  const resolvedSize = isSticker && isMobile ? Math.round(size * 0.55) : size;

  return (
    <>
      {isSticker && <GrainFilter id={grainId} />}
      <motion.div
        ref={ref}
        style={{
          position: 'absolute',
          ...position,
          y: prefersReduced ? 0 : y,
          width: resolvedSize,
          height: resolvedSize,
          ['--rot' as never]: `${rotation}deg`,
          ['--scl' as never]: `${scale}`,
          animationName: prefersReduced || anim === 'none' ? 'none' : animKeyframes[anim],
          animationDuration: animDuration[anim],
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
          animationDelay: `${delay}s`,
          transform:
            prefersReduced || anim === 'none'
              ? `rotate(${rotation}deg) scale(${scale})`
              : undefined,
          willChange: 'transform',
        }}
        whileHover={prefersReduced ? {} : { scale: scale * 1.08, transition: { type: 'spring', stiffness: 200, damping: 18 } }}
        whileTap={prefersReduced ? {} : { scale: scale * 0.93, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
        className={`pointer-events-auto cursor-pointer ${hideClass[resolvedHideBelow]} ${animClass[anim]}`}
        aria-hidden="true"
      >
        {isSticker ? (
          <img
            src={src}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: `url(#${grainId}) drop-shadow(1px 3px 6px rgba(0,0,0,0.22))`,
            }}
          />
        ) : (
          <div className="w-full h-full">{Illustrations[type](id)}</div>
        )}
      </motion.div>
    </>
  );
}
