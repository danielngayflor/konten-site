import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const goToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (window.location.pathname === '/') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#contact');
    }
  };

  return (
    <>
      {/* Desktop + Tablet Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-[62px] hidden sm:flex items-center justify-between px-8"
        style={{
          backgroundColor: 'rgba(10,10,10,0.80)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          boxShadow: 'rgba(255,255,255,0.02) 0px 1px 0px 0px, rgba(0,0,0,0.6) 0px 8px 24px -16px',
        }}
      >
        {/* Left: Logo */}
        <Link
          to="/"
          className="hover:opacity-75 transition-opacity flex items-center"
          aria-label="Konten LR home"
        >
          <img
            src="/konten-logo.svg"
            alt="Konten LR"
            className="h-10 w-auto"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </Link>

        {/* Right: Links + Button */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-8 font-spartan font-600 text-[13px] uppercase tracking-widest">
            <Link to="/services" className="text-white/70 hover:text-white transition-colors duration-200">
              Services
            </Link>
            <Link to="/featured-projects" className="text-white/70 hover:text-white transition-colors duration-200">
              Featured Projects
            </Link>
            <Link to="/our-story" className="text-white/70 hover:text-white transition-colors duration-200">
              Our Story
            </Link>
            <Link to="/freebies" className="text-white/70 hover:text-white transition-colors duration-200">
              Freebies
            </Link>
          </div>

          <button
            onClick={goToContact}
            className="px-6 py-[9px] bg-konten-blue text-white font-spartan font-700 text-[12px] uppercase tracking-widest rounded-full hover:bg-konten-blue transition-colors duration-200"
          >
            Tell Your Story →
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-[56px] sm:hidden flex items-center justify-between px-5"
        style={{
          backgroundColor: 'rgba(10,10,10,0.90)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <Link to="/" className="flex items-center" aria-label="Konten LR home">
          <img
            src="/konten-logo.svg"
            alt="Konten LR"
            className="h-8 w-auto"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </Link>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 pt-[56px] flex flex-col px-6 py-10"
          style={{ backgroundColor: '#0A0A0A' }}
        >
          <div className="flex flex-col gap-7 font-spartan font-700 text-[22px] uppercase tracking-wide">
            <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="text-white">
              Services
            </Link>
            <Link to="/featured-projects" onClick={() => setMobileMenuOpen(false)} className="text-white">
              Featured Projects
            </Link>
            <Link to="/our-story" onClick={() => setMobileMenuOpen(false)} className="text-white">
              Our Story
            </Link>
            <Link to="/freebies" onClick={() => setMobileMenuOpen(false)} className="text-white">
              Freebies
            </Link>
          </div>
          <button
            onClick={(e) => goToContact(e)}
            className="mt-10 w-full px-8 py-4 bg-konten-blue text-white font-spartan font-700 text-[13px] uppercase tracking-widest rounded-full"
          >
            Tell Your Story →
          </button>
        </div>
      )}

      {/* Spacer */}
      <div className="h-[56px] sm:h-[62px]" />
    </>
  );
}
