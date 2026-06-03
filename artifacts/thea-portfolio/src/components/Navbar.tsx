import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['ABOUT', 'ARTWORKS', 'COMMISSIONS'];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full h-16 z-[100] transition-all duration-400 flex items-center justify-between px-6 md:px-12 ${
          scrolled ? 'bg-[#0d0d0d]/85 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="text-[#f5f0eb] font-medium text-[14px] tracking-[0.12em] uppercase cursor-pointer" data-interactive="true">
          thea rivera
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`}
              className="group relative text-[#8a8580] hover:text-[#f5f0eb] transition-colors duration-200 font-normal text-[12px] tracking-[0.2em] uppercase"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#f5f0eb] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-[101]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-[1px] bg-[#f5f0eb] transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[1px]' : '-translate-y-1'}`}></span>
          <span className={`w-6 h-[1px] bg-[#f5f0eb] transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`w-6 h-[1px] bg-[#f5f0eb] transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[1px]' : 'translate-y-1'}`}></span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[#0d0d0d] z-[99] flex flex-col items-center justify-center transition-all duration-500 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <a 
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#f5f0eb] font-light text-2xl tracking-[0.2em] uppercase"
              style={{
                transitionDelay: mobileMenuOpen ? `${100 + i * 100}ms` : '0ms',
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: mobileMenuOpen ? 1 : 0,
                transition: 'all 0.5s ease-out'
              }}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
