import { useState, useEffect } from "react";
import { Artwork } from "@/data/artworks";

function getSpanClass(aspect: string) {
  if (aspect === "tall") return "sm:row-span-2";
  if (aspect === "wide") return "sm:col-span-2";
  return "";
}

export function ArtworkCard({
  artwork,
  index,
  isEager,
  onClick,
}: {
  artwork: Artwork;
  index: number;
  isEager: boolean;
  onClick: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // FIX: Cap animation delays for deep-indexed elements to prevent long rendering waits
    const animationDelay = Math.min(index, 5) * 45;
    const t = setTimeout(() => setVisible(true), animationDelay);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      className={`relative overflow-hidden cursor-pointer bg-[#141414] group ${getSpanClass(artwork.aspect)}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 450ms ease, transform 450ms cubic-bezier(0.22, 1, 0.36, 1)`,
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-testid={`card-artwork-${artwork.id}`}
    >
      <div className="absolute inset-0">
        <img
          src={artwork.image}
          alt={artwork.title}
          loading={isEager ? "eager" : "lazy"}
          {...(isEager ? { fetchPriority: "high" } : {})}
          className="w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform"
          style={{ transform: hovered ? "scale(1.03)" : "scale(1)" }}
        />
      </div>

      <div
        className="absolute inset-0 transition-all duration-300 pointer-events-none"
        style={{
          background: hovered
            ? "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 60%, transparent 100%)"
            : "linear-gradient(to top, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.15) 45%, transparent 100%)",
        }}
      />

      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 pointer-events-none">
        <div>
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
            className="hidden sm:block text-[#8a8580] text-[12px] leading-relaxed mt-1.5 line-clamp-2 max-w-[280px] transition-all duration-200"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(4px)",
            }}
          >
            {artwork.description}
          </p>
        </div>
      </div>

      <div
        className="hidden sm:flex absolute top-4 right-4 w-8 h-8 border border-white/20 rounded-full items-center justify-center pointer-events-none bg-black/10 backdrop-blur-sm"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scale(1)" : "scale(0.7)",
          transition: "all 250ms cubic-bezier(0.22, 1, 0.36, 1)",
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

export function Lightbox({
  artwork,
  total,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  artwork: Artwork;
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
      className="fixed inset-0 z-[200] bg-[#0a0a0a]/96 backdrop-blur-sm flex flex-col animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/8 flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-[#8a8580] text-[11px] tracking-[0.25em] uppercase font-mono">
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
        <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 min-h-0 bg-black/20">
          <img
            key={artwork.id}
            src={artwork.image}
            alt={artwork.title}
            loading="eager"
            className="max-w-full max-h-full object-contain shadow-2xl transition-all duration-300 transform scale-100"
            style={{
              animation: "lightboxIn 300ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />

          <button
            onClick={onPrev}
            data-testid="button-lightbox-prev"
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 border border-white/10 rounded-full items-center justify-center text-[#f5f0eb] hover:border-[#c9b99a] hover:text-[#c9b99a] transition-all bg-black/40 backdrop-blur-md"
          >
            ←
          </button>
          <button
            onClick={onNext}
            data-testid="button-lightbox-next"
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 border border-white/10 rounded-full items-center justify-center text-[#f5f0eb] hover:border-[#c9b99a] hover:text-[#c9b99a] transition-all bg-black/40 backdrop-blur-md"
          >
            →
          </button>
        </div>

        <div className="md:w-[320px] flex-shrink-0 border-t md:border-t-0 md:border-l border-white/8 overflow-y-auto bg-[#0d0d0d]">
          <div className="p-6 sm:p-8">
            <h2 className="text-[#f5f0eb] font-black text-[22px] sm:text-[26px] leading-tight mb-5 tracking-tight">
              {artwork.title}
            </h2>

            <div className="flex flex-col mb-6">
              {[
                { label: "Medium", value: artwork.medium, gold: true },
                { label: "Year", value: artwork.year, gold: false },
                { label: "Size", value: artwork.dims, gold: false },
              ].map(({ label, value, gold }) => (
                <div
                  key={label}
                  className="flex justify-between py-3 border-b border-white/6"
                >
                  <span className="text-[#8a8580] text-[11px] uppercase tracking-wider font-medium">
                    {label}
                  </span>
                  <span
                    className={`text-[11px] uppercase tracking-wider font-semibold ${gold ? "text-[#c9b99a]" : "text-[#f5f0eb]"}`}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[#8a8580] font-light text-[13.5px] leading-[1.75] italic">
              {artwork.description}
            </p>
          </div>
        </div>
      </div>

      <div
        className="flex sm:hidden items-center justify-between px-6 py-4 border-t border-white/8 bg-[#0d0d0d] flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onPrev}
          data-testid="button-lightbox-prev-mobile"
          className="flex items-center gap-2 text-[#f5f0eb] text-[13px] tracking-wider uppercase font-medium py-2 px-5 border border-white/15 rounded-full active:bg-white/10"
        >
          ← Prev
        </button>
        <button
          onClick={onNext}
          data-testid="button-lightbox-next-mobile"
          className="flex items-center gap-2 text-[#f5f0eb] text-[13px] tracking-wider uppercase font-medium py-2 px-5 border border-white/15 rounded-full active:bg-white/10"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
