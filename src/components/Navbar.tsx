import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { isSoundEnabled, setSoundEnabled, playClickSound } from '../utils/audio';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [soundOn, setSoundOn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    setSoundEnabled(nextState);
    if (nextState) {
      setTimeout(() => playClickSound(), 50);
    }
  };

  const scrollTo = (id: string) => {
    playClickSound();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#080808]/90 backdrop-blur-md border-b border-neutral-800/80 py-3.5 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 focus:outline-none"
            aria-label="Alex Davis Portfolio Home"
          >
            <span className="w-8 h-8 rounded-sm bg-neutral-900 border border-[#ccff00]/40 flex items-center justify-center font-display font-black text-xs text-[#ccff00] tracking-tighter group-hover:border-[#ccff00] group-hover:shadow-[0_0_12px_rgba(204,255,0,0.3)] transition-all">
              AD
            </span>
            <span className="font-display font-bold text-sm tracking-tight text-white group-hover:text-[#ccff00] transition-colors">
              ALEX DAVIS
            </span>
          </button>

          {/* Zone 2: Single-line Text Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-mono uppercase tracking-wider text-neutral-400">
            <button
              onClick={() => scrollTo('about')}
              className="hover:text-[#ccff00] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              About
            </button>
            <button
              onClick={() => scrollTo('projects')}
              className="hover:text-[#ccff00] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Work
            </button>
            <button
              onClick={() => scrollTo('posters')}
              className="hover:text-[#ccff00] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Posters
            </button>
            <button
              onClick={() => scrollTo('skills')}
              className="hover:text-[#ccff00] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Skills
            </button>
            <button
              onClick={() => scrollTo('showreel')}
              className="hover:text-[#ccff00] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Showreel
            </button>
          </nav>

          {/* Zone 3: Primary Action & Sound Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleSound}
              className={`p-2 rounded border text-xs flex items-center gap-1.5 transition-all ${
                soundOn
                  ? 'border-[#ccff00] text-[#ccff00] bg-[#ccff00]/10 shadow-[0_0_10px_rgba(204,255,0,0.2)]'
                  : 'border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 bg-neutral-900/60'
              }`}
              title={soundOn ? 'Mute tactile paper sound' : 'Enable tactile paper sound'}
              aria-label="Toggle paper sound FX"
            >
              {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden lg:inline text-[10px] font-mono uppercase">
                {soundOn ? 'Audio ON' : 'Audio OFF'}
              </span>
            </button>

            <button
              onClick={() => scrollTo('contact')}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold text-black bg-[#ccff00] hover:bg-[#b8e600] rounded transition-all shadow-[0_0_15px_rgba(204,255,0,0.25)] hover:shadow-[0_0_22px_rgba(204,255,0,0.4)] whitespace-nowrap shrink-0"
            >
              Let's Talk
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-300 hover:text-white border border-neutral-800 rounded bg-neutral-900/60"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#080808]/98 backdrop-blur-xl pt-24 px-8 pb-10 flex flex-col justify-between md:hidden animate-in fade-in duration-200">
          <nav className="flex flex-col gap-6 text-lg font-display font-medium tracking-tight">
            <button
              onClick={() => scrollTo('hero')}
              className="text-left text-neutral-300 hover:text-[#ccff00] transition-colors py-1 border-b border-neutral-900"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="text-left text-neutral-300 hover:text-[#ccff00] transition-colors py-1 border-b border-neutral-900"
            >
              About
            </button>
            <button
              onClick={() => scrollTo('projects')}
              className="text-left text-neutral-300 hover:text-[#ccff00] transition-colors py-1 border-b border-neutral-900"
            >
              Featured Work
            </button>
            <button
              onClick={() => scrollTo('posters')}
              className="text-left text-neutral-300 hover:text-[#ccff00] transition-colors py-1 border-b border-neutral-900"
            >
              Poster Stack
            </button>
            <button
              onClick={() => scrollTo('skills')}
              className="text-left text-neutral-300 hover:text-[#ccff00] transition-colors py-1 border-b border-neutral-900"
            >
              Skills & Tools
            </button>
            <button
              onClick={() => scrollTo('showreel')}
              className="text-left text-neutral-300 hover:text-[#ccff00] transition-colors py-1 border-b border-neutral-900"
            >
              Video Showreel
            </button>
          </nav>

          <div className="pt-6">
            <button
              onClick={() => scrollTo('contact')}
              className="w-full py-3 text-center text-xs font-mono uppercase tracking-wider font-semibold text-black bg-[#ccff00] rounded shadow-[0_0_15px_rgba(204,255,0,0.3)]"
            >
              Get In Touch
            </button>
          </div>
        </div>
      )}
    </>
  );
};
