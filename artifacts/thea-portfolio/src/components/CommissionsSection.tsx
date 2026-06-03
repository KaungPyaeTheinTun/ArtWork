import { useScrollReveal } from '@/hooks/useScrollReveal';
import heroImg from '@/assets/images/artwork-3.png'; // Reusing a wide artwork

export default function CommissionsSection() {
  const headerRef = useScrollReveal();
  const imgRef = useScrollReveal();
  const cardsRef = useScrollReveal(0.1);

  return (
    <section id="commissions" className="w-full bg-[#0d0d0d] pb-[140px]">
      
      {/* Hero Image */}
      <div 
        ref={imgRef as any}
        className="w-full h-[400px] overflow-hidden mb-20 relative opacity-0 [.revealed_&]:opacity-100 transition-opacity duration-1000"
      >
        <img 
          src={heroImg} 
          alt="Studio" 
          className="w-full h-full object-cover scale-[1.1] [.revealed_&]:scale-100 transition-transform duration-[2s] ease-out" 
        />
      </div>

      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <h2 
          ref={headerRef as any}
          className="font-bold text-[clamp(28px,4vw,48px)] text-[#f5f0eb] text-center mb-16 clip-reveal mx-auto max-w-2xl"
        >
          Commissioned Artwork, Authored With Intention
        </h2>

        <div ref={cardsRef as any} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          
          {/* Card 1 */}
          <div className="bg-[#141414] border border-white/10 p-8 flex flex-col gap-6 transition-all duration-800 opacity-0 translate-y-[50px] [.revealed_&]:opacity-100 [.revealed_&]:translate-y-0 hover:-translate-y-1 hover:shadow-2xl group cursor-pointer">
            <h3 className="font-bold text-[clamp(20px,2.5vw,28px)] text-[#f5f0eb]">60×60 cm Fine Art Print</h3>
            <div className="font-black text-[clamp(36px,5vw,56px)] text-[#f5f0eb]">$450</div>
            
            <div className="flex flex-col gap-4 text-[#8a8580] font-light text-[14px] leading-[2.0] mt-4">
              <hr className="border-white/10" />
              <span>High-quality giclée print</span>
              <hr className="border-white/10" />
              <span>Signed and numbered</span>
              <hr className="border-white/10" />
              <span>Certificate of authenticity</span>
              <hr className="border-white/10" />
              <span>Worldwide shipping</span>
              <hr className="border-white/10" />
              <span>30-day guarantee</span>
            </div>

            <button className="mt-8 border border-white/20 text-[#f5f0eb] font-semibold text-[13px] tracking-widest uppercase py-4 hover:bg-white hover:text-black transition-colors duration-300">
              Commission Now
            </button>
          </div>

          {/* Card 2 (Featured) */}
          <div className="bg-[#141414] border-2 border-[#c9b99a] p-8 flex flex-col gap-6 transition-all duration-800 delay-150 opacity-0 translate-y-[50px] scale-95 [.revealed_&]:opacity-100 [.revealed_&]:translate-y-0 [.revealed_&]:scale-100 hover:-translate-y-1 hover:shadow-2xl group cursor-pointer relative z-10">
            <div className="absolute -top-3 left-8 bg-[#c9b99a] text-[#0d0d0d] font-bold text-[10px] tracking-widest px-3 py-1 uppercase">★ Most Popular</div>
            <h3 className="font-bold text-[clamp(20px,2.5vw,28px)] text-[#f5f0eb] mt-2">100×100 cm Canvas Print</h3>
            <div className="font-black text-[clamp(36px,5vw,56px)] text-[#c9b99a]">$850</div>
            
            <div className="flex flex-col gap-4 text-[#8a8580] font-light text-[14px] leading-[2.0] mt-4">
              <hr className="border-white/10" />
              <span className="text-[#f5f0eb]">Priority production</span>
              <hr className="border-white/10" />
              <span className="text-[#f5f0eb]">Artist consultation included</span>
              <hr className="border-white/10" />
              <span>High-quality giclée print</span>
              <hr className="border-white/10" />
              <span>Signed and numbered</span>
              <hr className="border-white/10" />
              <span>Certificate of authenticity</span>
            </div>

            <button className="mt-8 bg-[#c9b99a] text-[#0d0d0d] font-semibold text-[13px] tracking-widest uppercase py-4 hover:bg-white transition-colors duration-300">
              Commission Now
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-[#141414] border border-white/10 p-8 flex flex-col gap-6 transition-all duration-800 delay-300 opacity-0 translate-y-[50px] [.revealed_&]:opacity-100 [.revealed_&]:translate-y-0 hover:-translate-y-1 hover:shadow-2xl group cursor-pointer">
            <h3 className="font-bold text-[clamp(20px,2.5vw,28px)] text-[#f5f0eb]">Custom Commission</h3>
            <div className="font-black text-[clamp(36px,5vw,56px)] text-[#f5f0eb]">Price on request</div>
            
            <div className="flex flex-col gap-4 text-[#8a8580] font-light text-[14px] leading-[2.0] mt-4">
              <hr className="border-white/10" />
              <span>Any size</span>
              <hr className="border-white/10" />
              <span>Full creative collaboration</span>
              <hr className="border-white/10" />
              <span>Dedicated studio sessions</span>
              <hr className="border-white/10" />
              <span>Installation support</span>
              <hr className="border-white/10" />
              <span>Lifetime documentation</span>
            </div>

            <button className="mt-8 border border-white/20 text-[#f5f0eb] font-semibold text-[13px] tracking-widest uppercase py-4 hover:bg-white hover:text-black transition-colors duration-300">
              Get In Touch
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
