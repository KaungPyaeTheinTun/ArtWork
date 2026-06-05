import { useState, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const titleRef = useScrollReveal(0.1);
  const socialsRef = useScrollReveal(0.1);
  const bgTextRef = useScrollReveal(0.1);
  const bottomRef = useScrollReveal(0.1);

  // Lock scrolling when the contact modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsModalOpen(false);
    }, 2000);
  };

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
            className="flex flex-wrap items-center gap-8 transition-all duration-600 opacity-0 translate-y-[20px] [&.revealed]:opacity-100 [&.revealed]:translate-y-0"
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

            {/* Premium Minimalist Contact Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#c9b99a] text-[#0d0d0d] font-semibold text-[12px] tracking-[0.18em] uppercase px-5 py-2.5 hover:bg-[#f5f0eb] transition-colors duration-300"
            >
              Get In Touch
            </button>
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

      {/* Contact Modal Overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[300] bg-[#0a0a0a]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-[#0d0d0d] border border-white/10 max-w-lg w-full p-6 sm:p-10 relative shadow-2xl transition-all duration-300"
            style={{ animation: "modalIn 350ms cubic-bezier(0.22,1,0.36,1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-[#8a8580] hover:text-[#f5f0eb] text-xl p-2 transition-colors"
            >
              ✕
            </button>

            {formSubmitted ? (
              <div className="py-12 text-center">
                <h3 className="text-[#c9b99a] font-bold text-[20px] uppercase tracking-wider mb-2">
                  Message Sent
                </h3>
                <p className="text-[#8a8580] text-[13px]">
                  Thank you. I will review your query shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <span className="text-[#c9b99a] text-[11px] tracking-[0.25em] uppercase font-medium block mb-2">
                    Inquiries & Advice
                  </span>
                  <h3 className="text-[#f5f0eb] font-black text-[24px] sm:text-[28px] tracking-tight leading-tight mb-3">
                    Start a Conversation
                  </h3>
                  <p className="text-[#8a8580] font-light text-[13px] leading-relaxed">
                    Have questions about specific collection pieces, looking for
                    curatorial advice, or wanting to discuss custom display
                    options? Leave a brief message below.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[#8a8580] text-[10px] uppercase tracking-widest font-medium mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-[#141414] border border-white/10 text-[#f5f0eb] px-4 py-3 text-[13px] focus:outline-none focus:border-[#c9b99a] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8a8580] text-[10px] uppercase tracking-widest font-medium mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full bg-[#141414] border border-white/10 text-[#f5f0eb] px-4 py-3 text-[13px] focus:outline-none focus:border-[#c9b99a] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8a8580] text-[10px] uppercase tracking-widest font-medium mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe your inquiry or request..."
                      className="w-full bg-[#141414] border border-white/10 text-[#f5f0eb] px-4 py-3 text-[13px] focus:outline-none focus:border-[#c9b99a] transition-colors resize-none placeholder:text-white/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#c9b99a] text-[#0d0d0d] font-semibold text-[11px] tracking-[0.2em] uppercase py-3.5 mt-2 hover:bg-[#f5f0eb] transition-colors duration-300"
                  >
                    Submit Inquiry
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Embedded Animations */}
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </footer>
  );
}
