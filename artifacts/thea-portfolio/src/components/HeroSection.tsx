import { useEffect, useState } from 'react';

import heroBg from '@/assets/images/hero-bg.png';
import heroPortrait from '@/assets/images/hero-portrait.png';
import heroTexture from '@/assets/images/hero-texture.png';
import heroPolaroid from '@/assets/images/hero-polaroid.png';

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const words = ['Modern', 'Expressionism', 'in', 'Paint', 'and', 'Form'];

  return (
    <section className="relative w-full h-[100vh] overflow-hidden bg-[#0d0d0d]">

      {/* Layer 1: Full-bleed background painting */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${scrollY * 0.25}px)`,
          opacity: 0.65,
        }}
      />

      {/* Layer 2: Left portrait */}
      <div
        className="absolute left-0 bottom-0 z-[2] w-[280px] md:w-[340px] h-[75vh] overflow-hidden"
        style={{
          transform: `translateY(calc(${scrollY * -0.12}px + ${mounted ? '0px' : '60px'}))`,
          opacity: mounted ? 1 : 0,
          transition: 'opacity 800ms ease-out 400ms, transform 800ms ease-out 400ms',
        }}
      >
        <img
          src={heroPortrait}
          alt="Thea Rivera"
          className="w-full h-full object-cover object-top"
          style={{ maskImage: 'linear-gradient(to top, transparent 0%, black 25%)' }}
        />
      </div>

      {/* Layer 3: Right texture image */}
      <div
        className="absolute right-0 top-[10%] z-[2] w-[220px] md:w-[300px] aspect-[2/3] overflow-hidden"
        style={{
          transform: `translateY(calc(${scrollY * -0.08}px + ${mounted ? '0px' : '-60px'}))`,
          opacity: mounted ? 0.75 : 0,
          transition: 'opacity 800ms ease-out 600ms, transform 800ms ease-out 600ms',
        }}
      >
        <img
          src={heroTexture}
          alt="Artwork detail"
          className="w-full h-full object-cover"
          style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)' }}
        />
      </div>

      {/* Dark vignette on sides so text is readable */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(13,13,13,0.3) 0%, transparent 30%, transparent 65%, rgba(13,13,13,0.4) 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(13,13,13,0.2) 0%, transparent 20%, transparent 70%, rgba(13,13,13,0.8) 100%)',
        }}
      />

      {/* Layer 4: Text content — always on top */}
      <div className="absolute inset-0 z-[4] flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-16">

        {/* Eyebrow */}
        <span
          className="text-[#8a8580] font-normal text-[11px] tracking-[0.3em] uppercase mb-8 block"
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 600ms ease 200ms',
          }}
        >
          based in Lisbon, Portugal
        </span>

        {/* H1 — word-by-word reveal */}
        <h1 className="font-black leading-[0.92] text-[#f5f0eb] mb-8 max-w-[720px]"
          style={{ fontSize: 'clamp(42px, 7vw, 90px)' }}
        >
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.2em] align-bottom">
              <span
                className="inline-block"
                style={{
                  transform: mounted ? 'translateY(0)' : 'translateY(80px)',
                  opacity: mounted ? 1 : 0,
                  transition: `transform 800ms cubic-bezier(0.22,1,0.36,1) ${i * 100 + 300}ms, opacity 800ms ease ${i * 100 + 300}ms`,
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className="text-[#8a8580] font-light text-[16px] max-w-[380px] leading-relaxed"
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 800ms ease 1000ms',
          }}
        >
          Whether it's oil on canvas or movement on stage, Thea Rivera transforms the ordinary into the extraordinary.
        </p>

        {/* Polaroid corner card */}
        <div
          className="absolute top-[12%] right-[6%] md:right-[8%] w-[110px] md:w-[140px] hidden md:block"
          style={{
            transform: mounted ? 'rotate(-3deg) scale(1)' : 'rotate(-8deg) scale(0.75)',
            opacity: mounted ? 1 : 0,
            transition: 'transform 900ms cubic-bezier(0.22,1,0.36,1) 1000ms, opacity 700ms ease 1000ms',
          }}
        >
          <div className="bg-[#1a1a1a] p-2 pb-6 border border-white/15 shadow-2xl">
            <img src={heroPolaroid} alt="Studio moment" className="w-full aspect-square object-cover" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-3 pointer-events-none"
        style={{
          opacity: scrollY > 100 ? 0 : mounted ? 1 : 0,
          transition: 'opacity 300ms ease',
          transitionDelay: scrollY > 100 ? '0ms' : '1400ms',
        }}
      >
        <span className="text-[#8a8580] font-normal text-[10px] tracking-[0.35em] uppercase">Scroll for more</span>
        <div
          className="w-[1px] h-8 bg-[#8a8580]"
          style={{ animation: 'downArrow 1.2s ease-in-out infinite' }}
        />
      </div>
    </section>
  );
}
