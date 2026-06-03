import { useEffect, useState } from 'react';

import heroBg from '@/assets/images/hero-bg.png';
import heroPortrait from '@/assets/images/hero-portrait.png';
import heroTexture from '@/assets/images/hero-texture.png';
import heroPolaroid from '@/assets/images/hero-polaroid.png';

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const title = "Modern Expressionism in Paint and Form".split(" ");

  return (
    <section className="relative w-full h-[100vh] overflow-hidden bg-[#0d0d0d] flex items-center">
      {/* Background layer */}
      <div 
        className="absolute inset-0 z-0 opacity-60"
        style={{ 
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${scrollY * 0.3}px)`
        }}
      />
      
      {/* Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between mt-16">
        
        {/* Left Image (Portrait) */}
        <div 
          className={`absolute left-[5%] md:left-[10%] top-[15%] md:top-[20%] w-[180px] md:w-[280px] aspect-[2/3] z-[2] transition-all duration-800 ease-out`}
          style={{
            transform: `translateY(${scrollY * -0.15}px) translateX(${mounted ? 0 : '-60px'})`,
            opacity: mounted ? 1 : 0,
            transitionDelay: '400ms'
          }}
        >
          <img src={heroPortrait} alt="Thea Rivera Portrait" className="w-full h-full object-cover shadow-2xl" />
        </div>

        {/* Right Image (Texture) */}
        <div 
          className={`absolute right-[5%] md:right-[15%] bottom-[20%] md:bottom-[25%] w-[150px] md:w-[240px] aspect-square z-[3] transition-all duration-800 ease-out`}
          style={{
            transform: `translateY(${scrollY * -0.1}px) translateX(${mounted ? 0 : '60px'})`,
            opacity: mounted ? 1 : 0,
            transitionDelay: '600ms'
          }}
        >
          <img src={heroTexture} alt="Artwork Texture" className="w-full h-full object-cover shadow-2xl" />
        </div>

        {/* Center Content */}
        <div className="relative z-[4] w-full max-w-3xl mx-auto text-center md:text-left flex flex-col items-center md:items-start mt-32 md:mt-0">
          
          <div className="flex relative">
            <div className="flex flex-col">
              <span className="text-[#8a8580] font-normal text-[11px] tracking-[0.3em] uppercase mb-6">
                based in Lisbon, Portugal
              </span>
              
              <h1 className="font-black text-[clamp(48px,8vw,96px)] leading-[0.95] text-[#f5f0eb] flex flex-wrap justify-center md:justify-start gap-x-4 max-w-[800px]">
                {title.map((word, i) => (
                  <span key={i} className="overflow-hidden inline-block pb-2">
                    <span 
                      className={`inline-block transition-all duration-800 cubic-bezier(0.22, 1, 0.36, 1)`}
                      style={{
                        transform: mounted ? 'translateY(0)' : 'translateY(80px)',
                        opacity: mounted ? 1 : 0,
                        transitionDelay: `${i * 100}ms`
                      }}
                    >
                      {word}
                    </span>
                  </span>
                ))}
              </h1>

              <p 
                className={`mt-8 text-[#8a8580] font-light text-[16px] max-w-[380px] leading-relaxed transition-opacity duration-1000 text-center md:text-left mx-auto md:mx-0`}
                style={{ 
                  opacity: mounted ? 1 : 0,
                  transitionDelay: '800ms'
                }}
              >
                Whether it's oil on canvas or movement on stage, Thea Rivera transforms the ordinary into the extraordinary.
              </p>
            </div>

            {/* Polaroid */}
            <div 
              className={`hidden md:block absolute -right-16 -bottom-16 w-32 aspect-square p-2 bg-[#141414] border border-white/20 shadow-xl transition-all duration-800`}
              style={{
                transform: mounted ? 'rotate(-3deg) scale(1)' : 'rotate(-10deg) scale(0.8)',
                opacity: mounted ? 1 : 0,
                transitionDelay: '1000ms'
              }}
            >
              <img src={heroPolaroid} alt="Artwork details" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500`}
        style={{ opacity: scrollY > 100 ? 0 : (mounted ? 1 : 0), transitionDelay: '1200ms' }}
      >
        <span className="text-[#f5f0eb] font-normal text-[10px] tracking-widest uppercase">Scroll for more</span>
        <div className="w-[1px] h-8 bg-[#8a8580] animate-[downArrow_1.2s_infinite]" />
      </div>
    </section>
  );
}
