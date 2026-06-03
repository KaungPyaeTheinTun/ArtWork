import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import artwork1 from '@/assets/images/artwork-1.png';
import artwork2 from '@/assets/images/artwork-2.png';
import artwork3 from '@/assets/images/artwork-3.png';

gsap.registerPlugin(ScrollTrigger);

const artworks = [
  {
    id: 1,
    title: 'The Last Rehearsal',
    slug: 'the-last-rehearsal',
    medium: 'Mixed Media',
    dims: '90×120cm',
    image: artwork1
  },
  {
    id: 2,
    title: 'Midnight Script',
    slug: 'midnight-script',
    medium: 'Acrylic On Canvas',
    dims: '100×100cm',
    image: artwork2
  },
  {
    id: 3,
    title: 'The Audience',
    slug: 'the-audience',
    medium: 'Movie Installation',
    dims: '200×500cm',
    image: artwork3
  }
];

export default function ArtworksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !wrapperRef.current) return;

    const panels = gsap.utils.toArray('.artwork-panel');

    const ctx = gsap.context(() => {
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + (wrapperRef.current?.offsetWidth || 0) * 0.66,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="artworks" ref={sectionRef} className="h-[100vh] w-full overflow-hidden bg-[#0d0d0d] relative">
      <div 
        ref={wrapperRef}
        className="flex h-full w-[300vw]"
      >
        {artworks.map((art, index) => (
          <div key={art.id} className="artwork-panel relative w-[100vw] h-full flex-shrink-0 flex items-center justify-center">
            
            {/* Background */}
            <div className="absolute inset-0 w-full h-full">
              <img src={art.image} alt={art.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#000000bf] opacity-90" style={{ background: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(0,0,0,0.85) 100%)' }} />
            </div>

            {/* Top Left */}
            <div className="absolute top-8 md:top-12 left-6 md:left-12 text-[#8a8580] font-normal text-[12px] tracking-[0.2em]">
              0{index + 1} / 0{artworks.length}
            </div>

            {/* Top Right */}
            <div className="absolute top-8 md:top-12 right-6 md:right-12 text-[#8a8580] font-normal text-[10px] tracking-[0.3em] uppercase">
              {art.slug}
            </div>

            {/* Center Title */}
            <div className="relative z-10 w-full px-6 text-center mt-[20vh]">
              <h3 className="text-[#f5f0eb] font-black text-[clamp(48px,10vw,140px)] uppercase leading-[0.9] tracking-tight">
                {art.title}
              </h3>
            </div>

            {/* Bottom Left */}
            <div className="absolute bottom-8 md:bottom-12 left-6 md:left-12 text-[#f5f0eb] font-normal text-[13px] tracking-[0.15em] uppercase">
              {art.medium}
            </div>

            {/* Bottom Right */}
            <div className="absolute bottom-8 md:bottom-12 right-6 md:right-12 text-[#f5f0eb] font-normal text-[13px] tracking-[0.15em]">
              {art.dims}
            </div>

          </div>
        ))}
      </div>

      {/* Ticker */}
      <div className="absolute top-[50%] -translate-y-1/2 left-0 w-full overflow-hidden pointer-events-none opacity-60 z-20 mix-blend-overlay">
        <div className="whitespace-nowrap inline-block animate-[marqueeLeft_30s_linear_infinite]">
          {[...Array(20)].map((_, i) => (
            <span key={i} className="text-[#f5f0eb] font-semibold text-[13px] tracking-[0.2em] uppercase mx-4">
              DISCOVER MORE ·
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
