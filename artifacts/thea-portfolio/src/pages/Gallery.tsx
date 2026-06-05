import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import artwork1 from "@/assets/images/artwork-1.png";
import artwork2 from "@/assets/images/artwork-2.png";
import artwork3 from "@/assets/images/artwork-3.png";
import g1 from "@/assets/images/gallery-1.png";
import g2 from "@/assets/images/gallery-2.png";
import g3 from "@/assets/images/gallery-3.png";
import g4 from "@/assets/images/gallery-4.png";
import g5 from "@/assets/images/gallery-5.png";
import g6 from "@/assets/images/gallery-6.png";
import g7 from "@/assets/images/gallery-7.png";
import g8 from "@/assets/images/gallery-8.png";
import g9 from "@/assets/images/gallery-9.png";
import g10 from "@/assets/images/gallery-10.png";
import g11 from "@/assets/images/_ (1).jpeg";
import g12 from "@/assets/images/_.jpeg";
import g14 from "@/assets/images/_2.png";
import g13 from "@/assets/images/Seashore Paintings, Mountains Meet the Azure Sea, Heavy Texture Oil Pa.jpeg";

// Expand this array freely to add more artwork items safely
const ALL_ARTWORKS = [
  {
    id: 1,
    title: "The Last Rehearsal",
    medium: "Mixed Media",
    year: "2023",
    dims: "90 × 120 cm",
    image: artwork1,
    aspect: "tall",
    description:
      "A study in tension — paint applied over found stage scripts, layered until the original text becomes a ghost beneath.",
  },
  {
    id: 2,
    title: "Midnight Script",
    medium: "Acrylic",
    year: "2022",
    dims: "100 × 100 cm",
    image: artwork2,
    aspect: "square",
    description:
      "Painted in a single nocturnal session. The canvas holds the silence of a theater after everyone has gone home.",
  },
  {
    id: 3,
    title: "The Audience",
    medium: "Installation",
    year: "2023",
    dims: "200 × 500 cm",
    image: artwork3,
    aspect: "wide",
    description:
      "Multi-panel installation exploring the gaze — who watches, who is seen, and what survives the looking.",
  },
  {
    id: 4,
    title: "Crimson Interior",
    medium: "Oil",
    year: "2021",
    dims: "80 × 100 cm",
    image: g1,
    aspect: "tall",
    description:
      "Built from the inside out — layers of cadmium red worked into raw umber until a kind of warmth emerges from darkness.",
  },
  {
    id: 5,
    title: "Torn Archive",
    medium: "Mixed Media",
    year: "2022",
    dims: "120 × 90 cm",
    image: g2,
    aspect: "wide",
    description:
      "Newsprint and memory. The fragments resist legibility — deliberately — so that feeling precedes reading.",
  },
  {
    id: 6,
    title: "Body in Transit",
    medium: "Oil",
    year: "2023",
    dims: "70 × 100 cm",
    image: g3,
    aspect: "tall",
    description:
      "A figure caught between stillness and flight. The brushwork mirrors the indecision of motion not yet committed.",
  },
  {
    id: 7,
    title: "Gray Study No. 4",
    medium: "Charcoal & Gesso",
    year: "2020",
    dims: "60 × 60 cm",
    image: g4,
    aspect: "square",
    description:
      "Part of a year-long monochromatic series. Restraint as method; the single value forced every other decision.",
  },
  {
    id: 8,
    title: "Pour — Lisbon",
    medium: "Acrylic",
    year: "2022",
    dims: "90 × 120 cm",
    image: g5,
    aspect: "wide",
    description:
      "Liquid pigment directed by gravity and breath. Control surrendered; the city's tides worked into the paint.",
  },
  {
    id: 9,
    title: "Gesture Study III",
    medium: "Ink",
    year: "2021",
    dims: "50 × 70 cm",
    image: g6,
    aspect: "tall",
    description:
      "A choreography of marks — ink splattered first, then the slower work of interpreting the accident into intention.",
  },
  {
    id: 10,
    title: "Storm Coast",
    medium: "Oil",
    year: "2023",
    dims: "150 × 80 cm",
    image: g7,
    aspect: "wide",
    description:
      "Atlantic weather painted from memory, three weeks after the trip. The distance made the gray more accurate.",
  },
  {
    id: 11,
    title: "Trace — Movement IV",
    medium: "Installation",
    year: "2022",
    dims: "Variable",
    image: g8,
    aspect: "tall",
    description:
      "Long-exposure performance documentation elevated to artwork. The dancer became the brush; the studio the canvas.",
  },
  {
    id: 12,
    title: "Surface Memory",
    medium: "Mixed Media",
    year: "2020",
    dims: "40 × 40 cm",
    image: g9,
    aspect: "square",
    description:
      "A micro study. The texture holds everything — scraping, repainting, scraping again — until the paint becomes sediment.",
  },
  {
    id: 13,
    title: "Interval",
    medium: "Acrylic",
    year: "2021",
    dims: "130 × 90 cm",
    image: g10,
    aspect: "wide",
    description:
      "Two states in dialogue across a single plane. Neither resolves; the tension between them is the subject.",
  },
  {
    id: 14,
    title: "Fleeting Echoes",
    medium: "Mixed Media",
    year: "2024",
    dims: "85 × 110 cm",
    image: g11,
    aspect: "tall",
    description:
      "An exploration of transience using layered ephemeral elements. The composition traps a singular moment where texture and faint linework intersect.",
  },
  {
    id: 15,
    title: "Silent Horizon",
    medium: "Acrylic",
    year: "2024",
    dims: "110 × 110 cm",
    image: g12,
    aspect: "square",
    description:
      "A balanced minimalist investigation of negative space and deep color fields, channeling the quiet line where sea meets empty air.",
  },
  {
    id: 16,
    title: "Where Mountains Meet the Azure Sea",
    medium: "Oil",
    year: "2025",
    dims: "140 × 100 cm",
    image: g13,
    aspect: "wide",
    description:
      "A heavy-texture palette knife execution capturing coastal boundaries. Thick strokes of cerulean and raw earth document the weight of stones confronting water.",
  },
  {
    id: 17,
    title: "Where Mountains Meet the Azure Sea",
    medium: "Oil on Canvas",
    year: "2025",
    dims: "Variable",
    image: g14,
    aspect: "square",
    description:
      "A heavy-texture oil painting capturing a dramatic alpine landscape. Sharp palette knife strokes build the jagged, snow-dusted peaks, contrasting with the soft, luminous clouds above and the glassy, detailed mirror reflections in the pristine waters below.",
  },
];

const FILTERS = [
  "All",
  "Oil",
  "Acrylic",
  "Mixed Media",
  "Installation",
  "Ink",
  "Charcoal & Gesso",
];

function getSpanClass(aspect: string) {
  if (aspect === "tall") return "sm:row-span-2";
  if (aspect === "wide") return "sm:col-span-2";
  return "";
}

function ArtworkCard({
  artwork,
  index,
  isEager,
  onClick,
}: {
  artwork: (typeof ALL_ARTWORKS)[0];
  index: number;
  isEager: boolean;
  onClick: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 50);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      className={`relative overflow-hidden cursor-pointer group ${getSpanClass(artwork.aspect)}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 500ms ease ${index * 40}ms, transform 500ms cubic-bezier(0.22,1,0.36,1) ${index * 40}ms`,
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-testid={`card-artwork-${artwork.id}`}
    >
      <div className="absolute inset-0 bg-[#141414]">
        <img
          src={artwork.image}
          alt={artwork.title}
          loading={isEager ? "eager" : "lazy"}
          {...(isEager ? { fetchpriority: "high" } : {})}
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
        />
      </div>

      <div
        className="absolute inset-0 transition-all duration-400"
        style={{
          background: hovered
            ? "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.45) 55%, transparent 100%)"
            : "linear-gradient(to top, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.2) 50%, transparent 100%)",
        }}
      />

      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
        <div
          style={{
            transform: hovered ? "translateY(0)" : "translateY(4px)",
            transition: "transform 300ms ease",
          }}
        >
          <h3 className="text-[#f5f0eb] font-bold text-[15px] sm:text-[17px] leading-snug mb-1">
            {artwork.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-[#c9b99a] text-[11px] tracking-[0.12em] uppercase font-medium">
              {artwork.medium}
            </span>
            <span className="text-[#8a8580] text-[11px]">·</span>
            <span className="text-[#8a8580] text-[11px]">{artwork.year}</span>
          </div>
          <p
            className="hidden sm:block text-[#8a8580] text-[12px] leading-relaxed mt-1.5 line-clamp-2 max-w-[280px]"
            style={{
              opacity: hovered ? 1 : 0,
              transition: "opacity 250ms ease 40ms",
            }}
          >
            {artwork.description}
          </p>
        </div>
      </div>

      <div
        className="hidden sm:flex absolute top-4 right-4 w-8 h-8 border border-white/20 rounded-full items-center justify-center"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered
            ? "scale(1) rotate(0deg)"
            : "scale(0.6) rotate(-20deg)",
          transition: "all 320ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
          <path
            d="M2 7h10M7 2l5 5-5 5"
            stroke="#f5f0eb"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

function Lightbox({
  artwork,
  total,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  artwork: (typeof ALL_ARTWORKS)[0];
  total: number;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[200] bg-[#0a0a0a]/96 backdrop-blur-sm flex flex-col"
      onClick={onClose}
    >
      <div
        className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/8 flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-[#8a8580] text-[11px] tracking-[0.25em] uppercase">
          {index + 1} / {total}
        </span>
        <button
          onClick={onClose}
          data-testid="button-lightbox-close"
          className="w-9 h-9 flex items-center justify-center text-[#8a8580] hover:text-[#f5f0eb] transition-colors text-[18px]"
        >
          ✕
        </button>
      </div>

      <div
        className="flex flex-col md:flex-row flex-1 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 min-h-0">
          <img
            key={artwork.id}
            src={artwork.image}
            alt={artwork.title}
            loading="eager"
            className="max-w-full max-h-full object-contain shadow-2xl"
            style={{
              animation: "lightboxIn 350ms cubic-bezier(0.22,1,0.36,1)",
            }}
          />

          <button
            onClick={onPrev}
            data-testid="button-lightbox-prev"
            className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/20 rounded-full items-center justify-center text-[#f5f0eb] hover:border-[#c9b99a] hover:text-[#c9b99a] transition-all duration-200 bg-[#0a0a0a]/60"
          >
            ←
          </button>
          <button
            onClick={onNext}
            data-testid="button-lightbox-next"
            className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/20 rounded-full items-center justify-center text-[#f5f0eb] hover:border-[#c9b99a] hover:text-[#c9b99a] transition-all duration-200 bg-[#0a0a0a]/60"
          >
            →
          </button>
        </div>

        <div className="md:w-[300px] flex-shrink-0 border-t md:border-t-0 md:border-l border-white/8 overflow-y-auto">
          <div className="p-5 sm:p-8">
            <h2 className="text-[#f5f0eb] font-black text-[22px] sm:text-[28px] leading-tight mb-5">
              {artwork.title}
            </h2>

            <div className="flex flex-col gap-0 mb-5">
              {[
                { label: "Medium", value: artwork.medium, gold: true },
                { label: "Year", value: artwork.year, gold: false },
                { label: "Size", value: artwork.dims, gold: false },
              ].map(({ label, value, gold }) => (
                <div
                  key={label}
                  className="flex justify-between py-3 border-b border-white/8"
                >
                  <span className="text-[#8a8580] text-[11px] uppercase tracking-wider">
                    {label}
                  </span>
                  <span
                    className={`text-[11px] uppercase tracking-wider font-medium ${gold ? "text-[#c9b99a]" : "text-[#f5f0eb]"}`}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[#8a8580] font-light text-[13px] leading-[1.8]">
              {artwork.description}
            </p>
          </div>
        </div>
      </div>

      <div
        className="flex sm:hidden items-center justify-between px-6 py-4 border-t border-white/8 flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onPrev}
          data-testid="button-lightbox-prev-mobile"
          className="flex items-center gap-2 text-[#f5f0eb] text-[14px] py-2 px-4 border border-white/15 rounded-full active:bg-white/10"
        >
          ← Prev
        </button>
        <button
          onClick={onNext}
          data-testid="button-lightbox-next-mobile"
          className="flex items-center gap-2 text-[#f5f0eb] text-[14px] py-2 px-4 border border-white/15 rounded-full active:bg-white/10"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const filtered =
    activeFilter === "All"
      ? ALL_ARTWORKS
      : ALL_ARTWORKS.filter((a) => a.medium === activeFilter);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevLightbox = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? null : i === 0 ? filtered.length - 1 : i - 1,
      ),
    [filtered.length],
  );
  const nextLightbox = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? null : i === filtered.length - 1 ? 0 : i + 1,
      ),
    [filtered.length],
  );

  return (
    <div className="bg-[#0d0d0d] text-[#f5f0eb] min-h-screen selection:bg-[#c9b99a] selection:text-[#0d0d0d]">
      <Navbar />

      <div className="pt-28 sm:pt-36 pb-10 sm:pb-16 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div
          className="transition-all duration-700"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <span className="text-[#8a8580] text-[10px] sm:text-[11px] tracking-[0.3em] uppercase block mb-4">
            Complete Works
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
            <h1 className="font-black text-[clamp(36px,8vw,80px)] leading-[0.9] text-[#f5f0eb]">
              Explore the
              <br />
              <span className="text-[#c9b99a]">Collection</span>
            </h1>
            <p className="text-[#8a8580] font-light text-[14px] sm:text-[15px] max-w-[340px] leading-relaxed md:text-right">
              Sixteen works spanning two decades of painting, installation, and
              performance.
            </p>
          </div>

          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-none">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                data-testid={`filter-${filter.toLowerCase().replace(/[\s&]+/g, "-")}`}
                className="flex-shrink-0 transition-all duration-200 text-[11px] sm:text-[12px] tracking-[0.15em] sm:tracking-[0.18em] uppercase font-medium px-4 sm:px-5 py-2 sm:py-2.5 border whitespace-nowrap"
                style={{
                  borderColor:
                    activeFilter === filter
                      ? "#c9b99a"
                      : "rgba(255,255,255,0.15)",
                  color: activeFilter === filter ? "#c9b99a" : "#8a8580",
                  background:
                    activeFilter === filter
                      ? "rgba(201,185,154,0.08)"
                      : "transparent",
                }}
              >
                {filter}
                {filter === "All" && (
                  <span className="ml-1.5 text-[9px] opacity-50">
                    {ALL_ARTWORKS.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-white/8 mb-6 sm:mb-10" />

      <div className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto pb-24 sm:pb-32">
        {filtered.length === 0 ? (
          <div className="py-32 text-center text-[#8a8580]">
            <p className="text-[18px]">No works in this medium yet.</p>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
            style={{ gridAutoRows: "260px", gridAutoFlow: "dense" }}
          >
            {filtered.map((artwork, index) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                index={index}
                isEager={index < 3}
                onClick={() => openLightbox(index)}
              />
            ))}
          </div>
        )}

        <div className="mt-8 sm:mt-12 flex items-center gap-4">
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-[#8a8580] text-[11px] tracking-[0.2em] uppercase whitespace-nowrap">
            {filtered.length} work{filtered.length !== 1 ? "s" : ""}
          </span>
          <div className="flex-1 h-px bg-white/8" />
        </div>
      </div>

      <Footer />

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          artwork={filtered[lightboxIndex]}
          total={filtered.length}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      )}

      <style>{`
        @keyframes lightboxIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
