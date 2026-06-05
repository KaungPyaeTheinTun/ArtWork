import { useScrollReveal } from '@/hooks/useScrollReveal';
import ctaBg from '@/assets/images/cta-bg.png';
import { Link, useLocation } from "wouter";

export default function CTASection() {
  const ctaRef = useScrollReveal(0.15);
  const linkData = { label: "EXPLORE", href: "/explore", isAnchor: false };
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Real image background */}
      <div className="absolute inset-0 z-0">
        <img
          src={ctaBg}
          alt="Studio"
          className="w-full h-full object-cover scale-[1.05]"
          style={{ filter: "brightness(0.6)" }}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0d0d0d]/55 z-[1]" />

      {/* Warm vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(13,13,13,0.7) 100%)",
        }}
      />

      <div
        ref={ctaRef as any}
        className="relative z-10 text-center flex flex-col items-center px-6"
      >
        <h2 className="font-bold text-[clamp(32px,5vw,60px)] text-white max-w-[700px] leading-[1.1] mb-12 flex flex-col gap-2">
          <span
            className="block transition-all duration-700 opacity-0 translate-y-[40px] [.revealed_&]:opacity-100 [.revealed_&]:translate-y-0"
            style={{ transitionDelay: "0ms" }}
          >
            Step Into my World of
          </span>
          <span
            className="block transition-all duration-700 opacity-0 translate-y-[40px] [.revealed_&]:opacity-100 [.revealed_&]:translate-y-0 text-[#c9b99a]"
            style={{ transitionDelay: "150ms" }}
          >
            Movement and Color
          </span>
        </h2>
        <Link
          href={linkData.href}
          className="group inline-flex items-center gap-2 text-[#f5f0eb] hover:text-[#c9b99a] transition-colors duration-200"
        >
          <button
            data-testid="button-explore-portfolio"
            className="group relative border-[1.5px] border-white bg-transparent hover:bg-white text-white hover:text-[#0d0d0d] transition-all duration-300 px-10 py-4 font-semibold text-[13px] tracking-[0.2em] uppercase flex items-center gap-3 opacity-0 translate-y-[20px] [.revealed_&]:opacity-100 [.revealed_&]:translate-y-0"
            style={{ transitionDelay: "300ms" }}
          >
            <span className="transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
              →
            </span>
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">
              Explore Artworks
            </span>
          </button>
        </Link>
      </div>
    </section>
  );
}
