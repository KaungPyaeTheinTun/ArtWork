import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const isGallery = location === '/explore';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'ABOUT', href: isGallery ? '/#about' : '#about', isAnchor: true },
    { label: 'ARTWORKS', href: isGallery ? '/#artworks' : '#artworks', isAnchor: true },
    { label: 'EXPLORE', href: '/explore', isAnchor: false },
    { label: 'COMMISSIONS', href: isGallery ? '/#commissions' : '#commissions', isAnchor: true },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full h-16 z-[100] transition-all duration-400 flex items-center justify-between px-6 md:px-12 ${
          scrolled || isGallery ? 'bg-[#0d0d0d]/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="text-[#f5f0eb] font-medium text-[14px] tracking-[0.12em] uppercase hover:text-[#c9b99a] transition-colors duration-200">
          thea rivera
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) =>
            link.isAnchor ? (
              <a
                key={link.label}
                href={link.href}
                className={`group relative font-normal text-[12px] tracking-[0.2em] uppercase transition-colors duration-200 ${
                  link.label === 'EXPLORE' ? 'text-[#c9b99a]' : 'text-[#8a8580] hover:text-[#f5f0eb]'
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#f5f0eb] transition-all duration-300 group-hover:w-full" />
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={`group relative font-normal text-[12px] tracking-[0.2em] uppercase transition-colors duration-200 ${
                  location === '/explore'
                    ? 'text-[#c9b99a]'
                    : 'text-[#c9b99a] hover:text-[#f5f0eb]'
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c9b99a] transition-all duration-300 group-hover:w-full" />
              </Link>
            )
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-[101] gap-[5px]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          data-testid="button-mobile-menu"
        >
          <span className={`w-6 h-[1.5px] bg-[#f5f0eb] transition-all duration-300 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`w-6 h-[1.5px] bg-[#f5f0eb] transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`w-6 h-[1.5px] bg-[#f5f0eb] transition-all duration-300 origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-[#0d0d0d] z-[99] flex flex-col items-center justify-center transition-all duration-500 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) =>
            link.isAnchor ? (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#f5f0eb] font-bold text-[32px] tracking-[0.1em] uppercase hover:text-[#c9b99a] transition-colors duration-200"
                style={{
                  transitionDelay: mobileMenuOpen ? `${100 + i * 80}ms` : '0ms',
                  transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(24px)',
                  opacity: mobileMenuOpen ? 1 : 0,
                  transition: 'all 0.45s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#c9b99a] font-bold text-[32px] tracking-[0.1em] uppercase"
                style={{
                  transitionDelay: mobileMenuOpen ? `${100 + i * 80}ms` : '0ms',
                  transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(24px)',
                  opacity: mobileMenuOpen ? 1 : 0,
                  transition: 'all 0.45s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </div>
    </>
  );
}
