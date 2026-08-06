import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Disable browser native scroll restoration so it doesn't fight React Router
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

/**
 * Scrolls the window to the top on every route change,
 * unless the URL contains a hash (those are handled by ScrollToHash).
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (!hash) {
      // Double-fire: once immediately (blocks browser restoration) and once
      // after the first paint (catches any post-render scroll side-effects).
      window.scrollTo(0, 0);
      const raf = requestAnimationFrame(() => window.scrollTo(0, 0));
      return () => cancelAnimationFrame(raf);
    }
  }, [pathname]);

  return null;
}
