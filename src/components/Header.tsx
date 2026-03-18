import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Logic for scrolling effect if needed
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#0e1117]/80 backdrop-blur-md border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#hero" className="flex items-center focus:outline-none rounded-lg py-1" aria-label="LeadQ.AI Home">
              <img
                src="/leadq-logo-main.png"
                alt="LeadQ.AI - Where Leads Become Revenue"
                className="h-10 w-auto"
              />
            </a>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-center space-x-8 text-sm">
            <a href="#about" className="text-white/70 hover:text-white transition-colors">About us</a>
            <a href="#features" className="text-white/70 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-white/70 hover:text-white transition-colors">Pricing</a>
            <a href="#blog" className="text-white/70 hover:text-white transition-colors">Blog</a>
          </div>

          <div className="hidden md:flex items-center">
            <button className="rounded-full bg-white/10 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20">
              Login
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white/70 hover:text-white p-2 rounded-lg"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden bg-[#0e1117] border-t border-white/10 py-4">
            <div className="flex flex-col space-y-2 px-2 text-sm">
              <a href="#about" onClick={handleLinkClick} className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">About us</a>
              <a href="#features" onClick={handleLinkClick} className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Features</a>
              <a href="#pricing" onClick={handleLinkClick} className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Pricing</a>
              <a href="#blog" onClick={handleLinkClick} className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Blog</a>
              
              <div className="pt-4 border-t border-white/10">
                <button className="w-full rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/20">
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

