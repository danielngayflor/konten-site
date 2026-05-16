import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to the element matching the URL hash (e.g. /services#brand-and-comms)
 * after the page has rendered. Accounts for the fixed Nav height.
 */
export default function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = hash.replace('#', '');
    // Small delay so all sections have mounted before we scroll
    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const navOffset = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [hash]);

  return null;
}
