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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-konten-cream border-b-[1.5px] border-konten-black h-[72px] hidden sm:flex items-center justify-between px-8">
        {/* Left: Logo */}
        <Link
          to="/"
          className="hover:opacity-75 transition-opacity flex items-center"
          aria-label="Konten LR home"
        >
          <img
            src="/konten-logo.svg"
            alt="Konten LR"
            className="h-12 w-auto"
          />
        </Link>

        {/* Right: Links + Button */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-8 font-inter font-500 text-[14px] uppercase tracking-wide">
            <Link
              to="/about"
              className="text-konten-black hover:underline transition-all"
            >
              Our Story
            </Link>
            <Link
              to="/services"
              className="text-konten-black hover:underline transition-all"
            >
              For You
            </Link>
            <Link
              to="/work"
              className="text-konten-black hover:underline transition-all"
            >
              Stories We've Told
            </Link>
            <Link
              to="/freebies"
              className="text-konten-black hover:underline transition-all"
            >
              Freebies
            </Link>
          </div>

          {/* CTA Button */}
          <button
            onClick={goToContact}
            className="px-8 py-[10px] border-[1.5px] border-konten-black text-konten-black font-inter font-500 text-[12px] uppercase rounded-full hover:bg-konten-blue hover:text-konten-cream hover:border-konten-blue transition-all duration-200"
          >
            Start a project →
          </button>
        </div>
      </nav>

      {/* Mobile Nav Hamburger */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-konten-cream border-b-[1.5px] border-konten-black h-[60px] sm:hidden flex items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center"
          aria-label="Konten LR home"
        >
          <img
            src="/konten-logo.svg"
            alt="Konten LR"
            className="h-10 w-auto"
          />
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-konten-black"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-konten-cream pt-[60px] flex flex-col px-6 py-8">
          <div className="flex flex-col gap-6 font-inter font-500 text-[16px] uppercase">
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-konten-black"
            >
              Our Story
            </Link>
            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-konten-black"
            >
              For You
            </Link>
            <Link
              to="/work"
              onClick={() => setMobileMenuOpen(false)}
              className="text-konten-black"
            >
              Stories We've Told
            </Link>
            <Link
              to="/freebies"
              onClick={() => setMobileMenuOpen(false)}
              className="text-konten-black"
            >
              Freebies
            </Link>
          </div>
          <button
            onClick={(e) => goToContact(e)}
            className="mt-8 w-full px-8 py-[12px] bg-konten-black text-konten-cream font-inter font-500 text-[14px] uppercase rounded-full hover:opacity-85 transition-opacity"
          >
            Start a project →
          </button>
        </div>
      )}

      {/* Spacer for fixed nav */}
      <div className="h-[60px] sm:h-[72px]"></div>
    </>
  );
}
