import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useEffect, useRef, useState } from 'react';

import process1 from '@/assets/images/process-1.png';
import process2 from '@/assets/images/process-2.png';
import process3 from '@/assets/images/artwork-1.png';

export default function ProcessSection() {
  const headerRef = useScrollReveal();
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress when section is in view
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const totalHeight = rect.height + windowHeight;
        const scrolled = windowHeight - rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / totalHeight));
        setScrollProgress(progress);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    { num: '01', title: 'COLOR JOURNALING', desc: 'Daily mixing of pigments, swatch testing, and writing emotional notes...' },
    { num: '02', title: 'MOVEMENT SKETCHING', desc: 'Quick gesture drawings inspired by choreography, everyday motion...' },
    { num: '03', title: 'LAYER BUILDING', desc: 'Translating journal entries and movement studies onto canvas...' },
  ];

  return (
    <section ref={sectionRef} className="py-[140px] px-6 md:px-12 w-full max-w-7xl mx-auto overflow-hidden">
      
      <h2 
        ref={headerRef as any}
        className="font-bold text-[clamp(28px,4vw,48px)] text-[#f5f0eb] mb-20 clip-reveal"
      >
        The Moments Behind the Work
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-20">
        
        {/* Left Steps */}
        <div className="relative pl-8">
          {/* Progress Line */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10">
            <div 
              className="absolute left-0 top-0 w-full bg-[#c9b99a] origin-top"
              style={{ height: '100%', transform: `scaleY(${scrollProgress})` }}
            />
          </div>

          <div className="flex flex-col gap-16">
            {steps.map((step, i) => {
              const stepRef = useScrollReveal(0.5);
              const isActive = scrollProgress > (i * 0.3); // Rough estimate for activation
              
              return (
                <div 
                  key={step.num}
                  ref={stepRef as any}
                  className="transition-all duration-700 opacity-0 -translate-x-[20px] [.revealed_&]:opacity-100 [.revealed_&]:translate-x-0"
                  style={{ transitionDelay: `${i * 200}ms` }}
                >
                  <span className="block text-[#8a8580] font-normal text-[11px] tracking-[0.3em] mb-3">
                    STEP {step.num}
                  </span>
                  <h3 className={`font-semibold text-[20px] mb-4 transition-colors duration-500 ${isActive ? 'text-[#c9b99a]' : 'text-[#f5f0eb]'}`}>
                    {step.title}
                  </h3>
                  <p className="text-[#8a8580] font-light text-[14px] leading-[1.7] max-w-[360px]">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Images */}
        <div className="relative w-full h-[600px] hidden md:block">
          <div className="absolute top-0 right-[20%] w-[45%] aspect-[3/4] z-10 transition-all duration-1000 hover:z-40">
            <img src={process1} alt="Process 1" className="w-full h-full object-cover shadow-2xl" />
          </div>
          <div className="absolute top-[15%] right-0 w-[40%] aspect-square z-20 transition-all duration-1000 hover:z-40">
            <img src={process2} alt="Process 2" className="w-full h-full object-cover shadow-2xl" />
          </div>
          <div className="absolute top-[35%] right-[30%] w-[55%] aspect-[4/3] z-30 transition-all duration-1000 hover:z-40">
            <img src={process3} alt="Process 3" className="w-full h-full object-cover shadow-2xl" />
          </div>
        </div>

      </div>
    </section>
  );
}
