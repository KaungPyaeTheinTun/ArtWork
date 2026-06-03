import { useScrollReveal } from '@/hooks/useScrollReveal';
import heroImg from '@/assets/images/artwork-3.png';

const features1 = [
  'High-quality giclée print',
  'Signed and numbered',
  'Certificate of authenticity',
  'Worldwide shipping',
  '30-day guarantee',
];

const features2 = [
  'Priority production',
  'Artist consultation included',
  'High-quality giclée print',
  'Signed and numbered',
  'Certificate of authenticity',
];

const features3 = [
  'Any size and medium',
  'Full creative collaboration',
  'Dedicated studio sessions',
  'Installation support',
  'Lifetime documentation',
];

function FeatureList({ items, highlight = false }: { items: string[]; highlight?: boolean }) {
  return (
    <div className="flex flex-col mt-4">
      {items.map((item, i) => (
        <div key={i}>
          <hr className="border-white/10" />
          <span className={`block py-3 font-light text-[14px] leading-[1.5] ${highlight && i < 2 ? 'text-[#f5f0eb]' : 'text-[#8a8580]'}`}>
            {item}
          </span>
        </div>
      ))}
      <hr className="border-white/10" />
    </div>
  );
}

export default function CommissionsSection() {
  const headerRef = useScrollReveal();
  const imgRef = useScrollReveal(0.05);
  const card1Ref = useScrollReveal(0.1);
  const card2Ref = useScrollReveal(0.1);
  const card3Ref = useScrollReveal(0.1);

  return (
    <section id="commissions" className="w-full bg-[#0d0d0d] pb-[140px]">

      {/* Hero Image */}
      <div
        ref={imgRef as any}
        className="w-full h-[400px] overflow-hidden mb-20 relative opacity-0 [&.revealed]:opacity-100 transition-opacity duration-1000"
      >
        <img
          src={heroImg}
          alt="Studio"
          className="w-full h-full object-cover scale-[1.1] [.revealed_&]:scale-100 transition-transform duration-[2000ms] ease-out"
        />
      </div>

      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <h2
          ref={headerRef as any}
          className="font-bold text-[clamp(28px,4vw,48px)] text-[#f5f0eb] text-center mb-16 clip-reveal mx-auto max-w-2xl"
        >
          Commissioned Artwork, Authored With Intention
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">

          {/* Card 1 */}
          <div
            ref={card1Ref as any}
            className="bg-[#141414] border border-white/10 p-8 flex flex-col transition-all duration-700 opacity-0 translate-y-[50px] [&.revealed]:opacity-100 [&.revealed]:translate-y-0 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] group cursor-pointer"
          >
            <h3 className="font-bold text-[clamp(20px,2.5vw,28px)] text-[#f5f0eb] mb-4">60×60 cm Fine Art Print</h3>
            <div className="font-black text-[clamp(36px,5vw,56px)] text-[#f5f0eb] mb-2">$450</div>
            <FeatureList items={features1} />
            <button
              data-testid="button-commission-basic"
              className="mt-8 border border-white/20 text-[#f5f0eb] font-semibold text-[13px] tracking-widest uppercase py-4 px-6 hover:bg-[#f5f0eb] hover:text-[#0d0d0d] transition-all duration-300 flex items-center justify-center gap-3 group/btn"
            >
              <span className="transform -translate-x-2 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 transition-all duration-300">→</span>
              Commission Now
            </button>
          </div>

          {/* Card 2 (Featured) */}
          <div
            ref={card2Ref as any}
            className="bg-[#141414] border-2 border-[#c9b99a] p-8 flex flex-col transition-all duration-700 delay-150 opacity-0 translate-y-[50px] scale-95 [&.revealed]:opacity-100 [&.revealed]:translate-y-0 [&.revealed]:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_24px_80px_rgba(201,185,154,0.15)] group cursor-pointer relative z-10"
          >
            <div className="absolute -top-3 left-8 bg-[#c9b99a] text-[#0d0d0d] font-bold text-[10px] tracking-widest px-3 py-1 uppercase">
              ★ Most Popular
            </div>
            <h3 className="font-bold text-[clamp(20px,2.5vw,28px)] text-[#f5f0eb] mb-4 mt-2">100×100 cm Canvas Print</h3>
            <div className="font-black text-[clamp(36px,5vw,56px)] text-[#c9b99a] mb-2">$850</div>
            <FeatureList items={features2} highlight />
            <button
              data-testid="button-commission-featured"
              className="mt-8 bg-[#c9b99a] text-[#0d0d0d] font-semibold text-[13px] tracking-widest uppercase py-4 px-6 hover:bg-[#f5f0eb] transition-all duration-300 flex items-center justify-center gap-3 group/btn"
            >
              <span className="transform -translate-x-2 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 transition-all duration-300">→</span>
              Commission Now
            </button>
          </div>

          {/* Card 3 */}
          <div
            ref={card3Ref as any}
            className="bg-[#141414] border border-white/10 p-8 flex flex-col transition-all duration-700 delay-300 opacity-0 translate-y-[50px] [&.revealed]:opacity-100 [&.revealed]:translate-y-0 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] group cursor-pointer"
          >
            <h3 className="font-bold text-[clamp(20px,2.5vw,28px)] text-[#f5f0eb] mb-4">Custom Commission</h3>
            <div className="font-black text-[clamp(24px,3.5vw,40px)] text-[#f5f0eb] mb-2 leading-tight">Price on request</div>
            <FeatureList items={features3} />
            <button
              data-testid="button-commission-custom"
              className="mt-8 border border-white/20 text-[#f5f0eb] font-semibold text-[13px] tracking-widest uppercase py-4 px-6 hover:bg-[#f5f0eb] hover:text-[#0d0d0d] transition-all duration-300 flex items-center justify-center gap-3 group/btn"
            >
              <span className="transform -translate-x-2 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 transition-all duration-300">→</span>
              Get In Touch
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
