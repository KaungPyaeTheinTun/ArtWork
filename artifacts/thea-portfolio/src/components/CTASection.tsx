import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function CTASection() {
  const ctaRef = useScrollReveal();

  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Animated gradient bg to simulate video motion */}
      <div 
        className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#3a2f24] via-[#1a1410] to-[#0d0d0d] animate-[pulse_10s_ease-in-out_infinite_alternate]"
        style={{ backgroundSize: '200% 200%' }}
      />
      <div className="absolute inset-0 bg-black/55 z-0" />

      <div ref={ctaRef as any} className="relative z-10 text-center flex flex-col items-center px-6">
        <h2 className="font-bold text-[clamp(32px,5vw,60px)] text-white max-w-[700px] leading-[1.1] mb-12 flex flex-col overflow-hidden">
          <span className="block transition-all duration-700 cubic-bezier(0.22,1,0.36,1) opacity-0 translate-y-[40px] [.revealed_&]:opacity-100 [.revealed_&]:translate-y-0">
            Step Into my World of
          </span>
          <span className="block transition-all duration-700 delay-150 cubic-bezier(0.22,1,0.36,1) opacity-0 translate-y-[40px] [.revealed_&]:opacity-100 [.revealed_&]:translate-y-0 text-[#c9b99a]">
            Movement and Color
          </span>
        </h2>
        
        <button 
          className="group relative border-[1.5px] border-white bg-transparent hover:bg-white text-white hover:text-[#0d0d0d] transition-colors duration-300 px-10 py-4 font-semibold text-[13px] tracking-[0.2em] uppercase overflow-hidden flex items-center gap-3 transition-all duration-700 delay-300 opacity-0 translate-y-[20px] [.revealed_&]:opacity-100 [.revealed_&]:translate-y-0"
        >
          <span className="transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">→</span>
          <span className="transform -translate-x-2 group-hover:translate-x-0 transition-transform duration-300">Explore Portfolio</span>
        </button>
      </div>
    </section>
  );
}
