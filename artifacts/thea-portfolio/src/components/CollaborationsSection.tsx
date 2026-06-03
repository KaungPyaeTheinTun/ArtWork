import { useScrollReveal } from '@/hooks/useScrollReveal';
import collabLight from '@/assets/images/hero-texture.png';
import collabInstall from '@/assets/images/artwork-2.png';
import collabPerf from '@/assets/images/artwork-3.png';

const projects = [
  { name: 'FLUID LIGHT', img: collabLight },
  { name: 'THE MOVING WALL', img: collabInstall },
  { name: 'BODY AS CANVAS', img: collabPerf }
];

export default function CollaborationsSection() {
  const headerRef = useScrollReveal();
  const subRef = useScrollReveal();

  return (
    <section className="py-[120px] w-full overflow-hidden">
      
      <div className="px-6 md:px-12 mb-16 text-center max-w-3xl mx-auto">
        <h2 
          ref={headerRef as any}
          className="font-bold text-[clamp(28px,4vw,48px)] text-[#f5f0eb] mb-6 clip-reveal"
        >
          Art That Breathes Beyond the Frame
        </h2>
        <p 
          ref={subRef as any}
          className="text-[#8a8580] font-light text-[16px] opacity-0 transition-opacity duration-1000 [.revealed_&]:opacity-100"
        >
          From gallery installations to live performance — Rivera's work knows no boundary.
        </p>
      </div>

      <div className="flex flex-col gap-8 w-full group">
        
        {/* Row 1 - Left */}
        <div className="flex w-max animate-[marqueeLeft_25s_linear_infinite] group-hover:[animation-play-state:paused]">
          {[...projects, ...projects, ...projects, ...projects].map((p, i) => (
            <div 
              key={`row1-${i}`}
              className="flex items-center gap-4 bg-[#0d0d0d] border border-white/10 rounded-full py-4 px-8 mx-4 hover:border-[#c9b99a] hover:scale-[1.04] transition-all duration-200 cursor-pointer"
            >
              <span className="font-bold text-[24px] uppercase text-[#f5f0eb] whitespace-nowrap">{p.name}</span>
              <img src={p.img} alt={p.name} className="w-[80px] h-[80px] rounded-full object-cover" />
            </div>
          ))}
        </div>

        {/* Row 2 - Right */}
        <div className="flex w-max animate-[marqueeRight_30s_linear_infinite] group-hover:[animation-play-state:paused] self-end -mr-[50vw]">
          {[...projects, ...projects, ...projects, ...projects].reverse().map((p, i) => (
            <div 
              key={`row2-${i}`}
              className="flex items-center gap-4 bg-[#0d0d0d] border border-white/10 rounded-full py-4 px-8 mx-4 hover:border-[#c9b99a] hover:scale-[1.04] transition-all duration-200 cursor-pointer"
            >
              <img src={p.img} alt={p.name} className="w-[80px] h-[80px] rounded-full object-cover" />
              <span className="font-bold text-[24px] uppercase text-[#f5f0eb] whitespace-nowrap">{p.name}</span>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
