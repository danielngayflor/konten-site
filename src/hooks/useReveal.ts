import { useState, useEffect } from 'react';

/**
 * Returns true after `delayMs` has passed since mount.
 * Used to show a skeleton for a brief moment before revealing real content.
 */
export function useReveal(delayMs = 350) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);
  return revealed;
}
