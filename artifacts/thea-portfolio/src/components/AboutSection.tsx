import { useState, useEffect, useRef } from "react";

import aboutPortrait from "@/assets/images/about-portrait.png";
import g11 from "@/assets/images/_ (1).jpeg";
import g12 from "@/assets/images/_.jpeg";
import g13 from "@/assets/images/Seashore Paintings, Mountains Meet the Azure Sea, Heavy Texture Oil Pa.jpeg";

const STORIES = [
  {
    id: "story-1",
    tag: "THE ORIGIN",
    heading: "Painting the World Through My Eyes",
    text: "Born in Lisbon, trained in London and New York, Thea Rivera has spent two decades exploring the intersection of movement and color. Her work captures the raw emotional truth of human experience.",
    image: aboutPortrait,
    location: "Lisbon, Portugal",
    meta: "EST. 2006",
  },
  {
    id: "story-2",
    tag: "THE METHOD",
    heading: "Layers of Deliberate Emotion",
    text: "Each piece begins with a gesture — a dance, a memory, a conversation overheard on a tram. Rivera layers pigment like she layers emotion: slowly, deliberately, and without apology until sediment forms.",
    image: g11,
    location: "Studio Floor",
    meta: "MIXED MEDIA",
  },
  {
    id: "story-3",
    tag: "THE VISION",
    heading: "Capturing What Survives the Gaze",
    text: "Surrendering control to gravity and environment, the ultimate objective is an unyielding translation of environments. Restraint functions as method; forcing every structural edge into pristine dialogue.",
    image: g12,
    location: "The Horizon",
    meta: "ACRYLIC & OIL",
  },
  {
    id: "story-4",
    tag: "THE MONUMENT",
    heading: "Where Mountains Meet the Azure Sea",
    text: "Her latest work stands as an exploration of heavy-textured boundaries. Thick oil strokes document the massive weight of alpine stone confronting light, channeling a definitive mirror reflection of pristine, glassy water.",
    image: g13,
    location: "Alpine Coast",
    meta: "HEAVY OIL",
  },
];

export default function AboutSection() {
  const [activeStory, setActiveStory] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const { top, height } = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate absolute scroll progress through the total height track
      const totalScrollable = height - windowHeight;
      const currentScroll = -top;

      if (currentScroll < 0) {
        setActiveStory(0);
        return;
      }

      const progress = currentScroll / totalScrollable;
      const index = Math.min(
        STORIES.length - 1,
        Math.floor(progress * STORIES.length),
      );

      if (index >= 0 && index < STORIES.length) {
        setActiveStory(index);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    // Initial run to capture state on page mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full max-w-7xl mx-auto px-6 md:px-12 h-[320vh] md:h-[400vh] bg-[#0d0d0d]"
    >
      {/* Dynamic Background Aura Glow */}
      <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#c9b99a]/[0.015] rounded-full blur-[100px] md:blur-[140px] pointer-events-none z-0" />

      {/* Sticky Frame Wrapper: 
        Locks both layout columns inside the viewport on BOTH mobile and desktop screens.
        - Mobile: Places the sticky visual frame at the top, text crawls underneath.
        - Desktop: Standard 2-column side-by-side split grid.
      */}
      <div className="sticky top-0 left-0 w-full h-screen flex flex-col md:grid md:grid-cols-[52%_48%] gap-8 md:gap-20 items-center overflow-hidden z-10 bg-[#0d0d0d]">
        {/* Right Side Frame (Ordered first on mobile using `order-1 md:order-2`) */}
        <div className="relative w-full max-w-[340px] md:max-w-none aspect-[3/4] md:aspect-[3/4] flex justify-center items-center group cursor-pointer z-20 order-1 md:order-2 mt-20 md:mt-0">
          {/* Asymmetric Framing Accents */}
          <div className="absolute -inset-3 border border-white/[0.02] pointer-events-none z-0" />
          <div className="absolute -bottom-4 -left-4 w-12 h-12 border-l border-b border-white/5 pointer-events-none z-0 hidden sm:block" />
          <div className="absolute -top-4 -right-4 w-12 h-12 border-r border-t border-white/5 pointer-events-none z-0 hidden sm:block" />

          {/* Main Visual Frame Box Container */}
          <div className="relative w-full h-full overflow-hidden bg-[#141414] shadow-2xl z-10 rounded-sm">
            {/* Ambient Lighting Layer */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#c9b99a]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />

            {/* Fading Image Stack Layer */}
            {STORIES.map((story, idx) => (
              <img
                key={story.id}
                src={story.image}
                alt={story.heading}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-[850ms] cubic-bezier(0.25, 1, 0.5, 1)"
                style={{
                  opacity: idx === activeStory ? 1 : 0,
                  transform:
                    idx === activeStory
                      ? "scale(1.02) rotate(0deg)"
                      : "scale(1.08) rotate(0.5deg)",
                  zIndex: idx === activeStory ? 2 : 1,
                }}
              />
            ))}

            {/* Dark Vignette Mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-90 z-20 pointer-events-none" />
          </div>

          {/* Shared Floating Glassmorphism Badge */}
          <div className="absolute bottom-4 left-4 right-4 backdrop-blur-md bg-black/50 border border-white/10 p-4 z-30 transition-all duration-500 transform ease-out group-hover:bg-black/70 group-hover:border-[#c9b99a]/30 rounded-sm">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[#c9b99a] font-medium text-[8px] tracking-[0.2em] uppercase mb-0.5">
                  Context / Canvas Reference
                </p>
                <p className="text-[#f5f0eb] font-bold text-[12px] tracking-wide">
                  {STORIES[activeStory].location}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[#8a8580] font-normal text-[8px] uppercase tracking-widest mb-0.5">
                  Detail
                </p>
                <p className="text-[#f5f0eb] font-mono text-[11px]">
                  {STORIES[activeStory].meta}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Left Side: Dynamic Text Engine Layer (Ordered second on mobile using `order-2 md:order-1`) */}
        <div className="relative w-full h-[40vh] md:h-[60vh] flex flex-col justify-center order-2 md:order-1 px-2 md:px-0 mt-4 md:mt-0">
          {STORIES.map((story, idx) => {
            const isActive = idx === activeStory;
            return (
              <div
                key={story.id}
                className="absolute inset-x-0 transition-all duration-700 ease-in-out pointer-events-none data-[active=true]:pointer-events-auto"
                data-active={isActive}
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive
                    ? "translateY(0px) scale(1)"
                    : idx < activeStory
                      ? "translateY(-30px) scale(0.97)"
                      : "translateY(30px) scale(1.01)",
                }}
              >
                <span className="text-[#c9b99a] font-medium text-[10px] md:text-[11px] tracking-[0.3em] uppercase mb-2 md:mb-4 block">
                  {story.tag}
                </span>

                <h2 className="font-bold text-[clamp(22px,4vw,52px)] tracking-tight leading-[1.15] md:leading-[1.1] text-[#f5f0eb] mb-3 md:mb-6">
                  {story.heading}
                </h2>

                <p className="text-[#8a8580] font-light text-[14px] md:text-[17px] leading-[1.6] md:leading-[1.7] max-w-[500px]">
                  {story.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
