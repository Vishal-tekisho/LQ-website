import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10 backdrop-blur-2xl ${scrolled
        ? 'bg-black/70 md:bg-white/10 shadow-lg shadow-black/10'
        : 'bg-black/50 md:bg-white/5'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center focus:outline-none focus:ring-2 focus:ring-leadq-silver focus:ring-offset-2 focus:ring-offset-leadq-bg rounded-lg px-2 py-1" aria-label="LeadQ.AI Home">
              <img
                src="/leadq-logo-main.png"
                alt="LeadQ.AI - Where Leads Become Revenue"
                className="h-20 w-auto bg-gradient-to-br from-slate-900 to-slate-950 p-2 rounded-lg shadow-[0_0_20px_rgba(96,165,250,0.3)] border border-blue-500/20"
              />
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <a
              href="#features"
              className="px-4 py-2 text-leadq-silver hover:text-leadq-silver transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-leadq-silver focus:ring-offset-2 focus:ring-offset-leadq-bg"
            >
              Features
            </a>
            <a
              href="#agents"
              className="px-4 py-2 text-leadq-silver hover:text-leadq-silver transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-leadq-silver focus:ring-offset-2 focus:ring-offset-leadq-bg"
            >
              AI Agents
            </a>
            <a
              href="#pricing"
              className="px-4 py-2 text-leadq-silver hover:text-leadq-silver transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-leadq-silver focus:ring-offset-2 focus:ring-offset-leadq-bg"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="px-4 py-2 text-leadq-silver hover:text-leadq-silver transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-leadq-silver focus:ring-offset-2 focus:ring-offset-leadq-bg"
            >
              Contact
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <Button variant="gradient-blue" size="header-sm">
              Login
            </Button>
            <Button variant="gradient-silver" size="header-sm">
              Get Started
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-leadq-silver hover:text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-leadq-silver focus:ring-offset-2 focus:ring-offset-leadq-bg"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden glass-strong border-t border-white/10 py-4 animate-slideDown"
          >
            <div className="flex flex-col space-y-2 px-2">
              <a
                href="#features"
                onClick={handleLinkClick}
                className="px-4 py-3 text-leadq-silver hover:text-leadq-silver hover:bg-white/5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-leadq-silver focus:ring-offset-2 focus:ring-offset-leadq-bg"
              >
                Features
              </a>
              <a
                href="#agents"
                onClick={handleLinkClick}
                className="px-4 py-3 text-leadq-silver hover:text-leadq-silver hover:bg-white/5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-leadq-silver focus:ring-offset-2 focus:ring-offset-leadq-bg"
              >
                AI Agents
              </a>
              <a
                href="#pricing"
                onClick={handleLinkClick}
                className="px-4 py-3 text-leadq-silver hover:text-leadq-silver hover:bg-white/5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-leadq-silver focus:ring-offset-2 focus:ring-offset-leadq-bg"
              >
                Pricing
              </a>
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="px-4 py-3 text-leadq-silver hover:text-leadq-silver hover:bg-white/5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-leadq-silver focus:ring-offset-2 focus:ring-offset-leadq-bg"
              >
                Contact
              </a>
              <div className="pt-4 space-y-2 border-t border-white/10">
                <Button variant="gradient-blue" size="header-md" className="w-full">
                  Login
                </Button>
                <Button variant="gradient-silver" size="header-md" className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

