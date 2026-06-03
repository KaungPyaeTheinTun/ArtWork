import { useScrollReveal } from '@/hooks/useScrollReveal';

import bg1 from '@/assets/images/artwork-1.png';
import bg2 from '@/assets/images/artwork-2.png';
import bg3 from '@/assets/images/hero-bg.png';
import avatar1 from '@/assets/images/hero-portrait.png';
import avatar2 from '@/assets/images/about-portrait.png';
import avatar3 from '@/assets/images/process-1.png';

const testimonials = [
  {
    author: '@hannah_green',
    text: 'Her performances are visual poetry. Every color feels alive.',
    bg: bg1,
    avatar: avatar1,
    delay: 0
  },
  {
    author: '@harperr_lee',
    text: 'Watching Thea paint feels like witnessing a heartbeat take form.',
    bg: bg2,
    avatar: avatar2,
    delay: 150
  },
  {
    author: '@willy_bayers',
    text: 'She doesn\'t just create — she transforms the space around her.',
    bg: bg3,
    avatar: avatar3,
    delay: 300
  }
];

export default function TestimonialsSection() {
  const headerRef = useScrollReveal();
  const title = "they say what they feel".split(" ");

  return (
    <section className="py-[120px] px-6 md:px-12 w-full max-w-7xl mx-auto">
      <h2 
        ref={headerRef as any}
        className="font-bold text-[clamp(32px,5vw,64px)] text-[#f5f0eb] mb-16 flex flex-wrap gap-x-4"
      >
        {title.map((word, i) => (
          <span 
            key={i} 
            className="inline-block transition-all duration-800 opacity-0 translate-y-[20px] [.revealed_&]:opacity-100 [.revealed_&]:translate-y-0"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            {word}
          </span>
        ))}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((test, i) => {
          const cardRef = useScrollReveal();
          return (
            <div 
              key={i}
              ref={cardRef as any}
              className="relative bg-[#141414] border border-white/10 rounded-[8px] p-8 md:p-10 overflow-hidden flex flex-col justify-between min-h-[280px] group transition-all duration-800 cubic-bezier(0.22,1,0.36,1) opacity-0 translate-y-[60px] [.revealed_&]:opacity-100 [.revealed_&]:translate-y-0 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
              style={{ transitionDelay: `${test.delay}ms` }}
            >
              {/* Background Art */}
              <div 
                className="absolute inset-0 opacity-15 blur-[2px] z-0 transition-opacity duration-500 group-hover:opacity-30"
                style={{
                  backgroundImage: `url(${test.bg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              
              {/* Avatar */}
              <div className="absolute top-8 right-8 z-10 w-12 h-12 rounded-full overflow-hidden border border-white/20">
                <img src={test.avatar} alt={test.author} className="w-full h-full object-cover" />
              </div>

              {/* Content */}
              <div className="relative z-10 mt-16 md:mt-12">
                <p className="font-normal text-[18px] leading-[1.6] italic text-[#f5f0eb] mb-8">
                  "{test.text}"
                </p>
                <span className="font-medium text-[13px] tracking-[0.1em] text-[#8a8580]">
                  {test.author}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
