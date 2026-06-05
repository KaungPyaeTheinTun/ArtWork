import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ALL_ARTWORKS, FILTERS } from "@/data/artworks";
import { ArtworkCard, Lightbox } from "@/components/GalleryComponent";

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  const filtered =
    activeFilter === "All"
      ? ALL_ARTWORKS
      : ALL_ARTWORKS.filter((a) => a.medium === activeFilter);

  // Use logical indexes bounded by the active dataset context
  const openLightbox = useCallback(
    (id: number) => {
      const calculatedIndex = filtered.findIndex((item) => item.id === id);
      if (calculatedIndex !== -1) setLightboxIndex(calculatedIndex);
    },
    [filtered],
  );

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
          className="transition-all duration-500 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
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
              Seventeen works spanning two decades of painting, installation,
              and performance.
            </p>
          </div>

          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-none">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setLightboxIndex(null); // Safely reset active index trace on filter switch
                }}
                data-testid={`filter-${filter.toLowerCase().replace(/[\s&]+/g, "-")}`}
                className="flex-shrink-0 transition-all duration-200 text-[11px] sm:text-[12px] tracking-[0.15em] sm:tracking-[0.18em] uppercase font-medium px-4 sm:px-5 py-2 sm:py-2.5 border whitespace-nowrap"
                style={{
                  borderColor:
                    activeFilter === filter
                      ? "#c9b99a"
                      : "rgba(255,255,255,0.12)",
                  color: activeFilter === filter ? "#c9b99a" : "#8a8580",
                  background:
                    activeFilter === filter
                      ? "rgba(201,185,154,0.06)"
                      : "transparent",
                }}
              >
                {filter}
                {filter === "All" && (
                  <span className="ml-1.5 text-[9px] opacity-40 font-mono">
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
            <p className="text-[16px] font-light">
              No works in this medium yet.
            </p>
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
                // Eagerly pre-load images layout grids above the initial fold (top 3 elements)
                isEager={index < 3}
                onClick={() => openLightbox(artwork.id)}
              />
            ))}
          </div>
        )}

        <div className="mt-8 sm:mt-12 flex items-center gap-4">
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-[#8a8580] text-[11px] tracking-[0.2em] uppercase whitespace-nowrap font-mono">
            {filtered.length} work{filtered.length !== 1 ? "s" : ""}
          </span>
          <div className="flex-1 h-px bg-white/8" />
        </div>
      </div>

      <Footer />

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
          from { opacity: 0; transform: scale(0.98) translateY(4px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 200ms ease-out forwards; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
