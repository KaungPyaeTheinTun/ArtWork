import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Footer() {
  const titleRef = useScrollReveal(0.1);
  const socialsRef = useScrollReveal(0.1);
  const bgTextRef = useScrollReveal(0.1); // Added for the background text animation
  const bottomRef = useScrollReveal(0.1);

  return (
    <footer className="relative bg-[#0d0d0d] pt-24 pb-12 px-6 md:px-12 border-t border-white/5 overflow-hidden">
      {/* Huge Background Text - Left Aligned & Gradient Faded */}
      <div
        ref={bgTextRef as any}
        className="absolute left-0 bottom-8 md:bottom-12 pointer-events-none select-none z-0 translate-y-[20px] opacity-0 transition-all duration-1000 ease-out [&.revealed]:opacity-100 [&.revealed]:translate-y-0"
      >
        <span className="font-black text-[clamp(100px,25vw,320px)] tracking-tighter leading-[0.7] uppercase bg-gradient-to-r from-white/[0.04] via-[#c9b99a]/[0.02] to-transparent bg-clip-text text-transparent block transform origin-left">
          Artwork
        </span>
      </div>

      {/* Foreground Content - Relative and Z-indexed above the background text */}
      <div className="relative max-w-7xl mx-auto flex flex-col gap-16 z-10">
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <h2
            ref={titleRef as any}
            className="font-bold text-[clamp(24px,3.5vw,40px)] text-[#f5f0eb] max-w-[500px] leading-[1.1] clip-reveal"
          >
            Where Your Vision Becomes a Canvas
          </h2>

          <div
            ref={socialsRef as any}
            className="flex flex-wrap gap-8 transition-all duration-600 opacity-0 translate-y-[20px] [&.revealed]:opacity-100 [&.revealed]:translate-y-0"
            style={{ transitionDelay: "200ms" }}
          >
            {["Instagram", "Threads", "LinkedIn"].map((social) => (
              <a
                key={social}
                href="#"
                data-testid={`link-social-${social.toLowerCase()}`}
                className="group relative font-normal text-[13px] tracking-[0.15em] uppercase text-[#f5f0eb] hover:text-[#c9b99a] transition-colors duration-200"
              >
                {social}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#c9b99a] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>

        <hr className="border-white/10" />

        {/* Row 2 */}
        <div
          ref={bottomRef as any}
          className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 transition-all duration-600 opacity-0 translate-y-[20px] [&.revealed]:opacity-100 [&.revealed]:translate-y-0"
          style={{ transitionDelay: "300ms" }}
        >
          <div className="text-[#8a8580] font-normal text-[12px]">
            © {new Date().getFullYear()} Thea Rivera. All rights reserved.
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-[#8a8580] font-normal text-[12px]">
            {["404", "LICENSE", "CHANGELOG", "STYLE GUIDE"].map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-[#f5f0eb] transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
