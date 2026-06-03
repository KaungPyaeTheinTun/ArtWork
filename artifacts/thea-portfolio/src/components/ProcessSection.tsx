import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useEffect, useRef, useState } from 'react';

import process1 from '@/assets/images/process-1.png';
import process2 from '@/assets/images/process-2.png';
import process3 from '@/assets/images/process-3.png';

const steps = [
  {
    num: '01',
    title: 'COLOR JOURNALING',
    desc: 'Daily mixing of pigments, swatch testing, and writing emotional notes in paint-stained notebooks. Color becomes language before it becomes image.'
  },
  {
    num: '02',
    title: 'MOVEMENT SKETCHING',
    desc: 'Quick gesture drawings inspired by choreography and everyday motion — the body remembered through the wrist. Each sketch is a heartbeat captured mid-beat.'
  },
  {
    num: '03',
    title: 'LAYER BUILDING',
    desc: 'Translating journal entries and movement studies onto canvas, one transparent layer at a time. Patience becomes pigment. Silence becomes structure.'
  },
];

function ProcessStep({ step, index, scrollProgress }: {
  step: typeof steps[0];
  index: number;
  scrollProgress: number;
}) {
  const stepRef = useScrollReveal(0.3);
  const isActive = scrollProgress > index * 0.28;

  return (
    <div
      ref={stepRef as any}
      className="transition-all duration-700 opacity-0 -translate-x-[20px] [&.revealed]:opacity-100 [&.revealed]:translate-x-0"
      style={{ transitionDelay: `${index * 200}ms` }}
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
}

export default function ProcessSection() {
  const headerRef = useScrollReveal();
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const totalHeight = rect.height + windowHeight;
        const scrolled = windowHeight - rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / totalHeight));
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              className="absolute left-0 top-0 w-full bg-[#c9b99a] origin-top transition-transform duration-100"
              style={{ height: '100%', transform: `scaleY(${scrollProgress * 1.5})` }}
            />
          </div>

          <div className="flex flex-col gap-16">
            {steps.map((step, i) => (
              <ProcessStep key={step.num} step={step} index={i} scrollProgress={scrollProgress} />
            ))}
          </div>
        </div>

        {/* Right Images — staggered overlapping grid */}
        <div className="relative w-full h-[560px] hidden lg:block">
          <div className="absolute top-0 left-0 w-[52%] aspect-[3/4] z-10 overflow-hidden shadow-2xl">
            <img src={process1} alt="Studio process 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="absolute top-[-40px] right-0 w-[44%] aspect-[4/5] z-20 overflow-hidden shadow-2xl">
            <img src={process2} alt="Studio process 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="absolute bottom-0 left-[20%] w-[58%] aspect-[4/3] z-30 overflow-hidden shadow-2xl">
            <img src={process3} alt="Studio process 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </div>

      </div>
    </section>
  );
}
