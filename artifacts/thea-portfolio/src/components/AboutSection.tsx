import { useScrollReveal } from '@/hooks/useScrollReveal';
import aboutPortrait from '@/assets/images/about-portrait.png';

export default function AboutSection() {
  const titleRef = useScrollReveal();
  const p1Ref = useScrollReveal(0.2);
  const p2Ref = useScrollReveal(0.3);
  const imgRef = useScrollReveal(0.2);

  return (
    <section id="about" className="py-[80px] md:py-[120px] px-6 md:px-12 w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-16 md:gap-24 items-center">

        {/* Left Text Column */}
        <div className="flex flex-col">
          <span className="text-[#8a8580] font-normal text-[11px] tracking-[0.3em] uppercase mb-6 block">
            ABOUT
          </span>

          <h2
            ref={titleRef as any}
            className="font-bold text-[clamp(32px,5vw,56px)] leading-[1.1] text-[#f5f0eb] mb-10 clip-reveal"
          >
            Painting the World Through My Eyes
          </h2>

          <p
            ref={p1Ref as any}
            className="text-[#f5f0eb] font-normal text-[20px] leading-[1.6] max-w-[520px] mb-8 transition-all duration-700 opacity-0 translate-y-[30px] [&.revealed]:opacity-100 [&.revealed]:translate-y-0"
            style={{ transitionDelay: '200ms' }}
          >
            Born in Lisbon, trained in London and New York, Thea Rivera has spent two decades exploring the intersection of movement and color. Her work captures the raw emotional truth of human experience.
          </p>

          <p
            ref={p2Ref as any}
            className="text-[#8a8580] font-light text-[15px] max-w-[520px] leading-relaxed transition-all duration-700 opacity-0 translate-y-[30px] [&.revealed]:opacity-100 [&.revealed]:translate-y-0"
            style={{ transitionDelay: '400ms' }}
          >
            Each piece begins with a gesture — a dance, a memory, a conversation overheard on a tram. Rivera layers pigment like she layers emotion: slowly, deliberately, and without apology.
          </p>
        </div>

        {/* Right Image Column */}
        <div
          ref={imgRef as any}
          className="relative w-full aspect-[3/4] overflow-hidden group transition-all duration-1000 opacity-0 [&.revealed]:opacity-100"
        >
          <img
            src={aboutPortrait}
            alt="Thea Rivera at work"
            className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out scale-[1.1] [.revealed_&]:scale-100 group-hover:scale-[1.02]"
          />
        </div>

      </div>
    </section>
  );
}
