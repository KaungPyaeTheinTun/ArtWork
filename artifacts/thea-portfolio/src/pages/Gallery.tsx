import { useState, useEffect, useCallback } from 'react';
import { Link } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import artwork1 from '@/assets/images/artwork-1.png';
import artwork2 from '@/assets/images/artwork-2.png';
import artwork3 from '@/assets/images/artwork-3.png';
import g1 from '@/assets/images/gallery-1.png';
import g2 from '@/assets/images/gallery-2.png';
import g3 from '@/assets/images/gallery-3.png';
import g4 from '@/assets/images/gallery-4.png';
import g5 from '@/assets/images/gallery-5.png';
import g6 from '@/assets/images/gallery-6.png';
import g7 from '@/assets/images/gallery-7.png';
import g8 from '@/assets/images/gallery-8.png';
import g9 from '@/assets/images/gallery-9.png';
import g10 from '@/assets/images/gallery-10.png';

const ALL_ARTWORKS = [
  {
    id: 1,
    title: 'The Last Rehearsal',
    medium: 'Mixed Media',
    year: '2023',
    dims: '90 × 120 cm',
    image: artwork1,
    aspect: 'tall',
    description: 'A study in tension — paint applied over found stage scripts, layered until the original text becomes a ghost beneath.',
  },
  {
    id: 2,
    title: 'Midnight Script',
    medium: 'Acrylic',
    year: '2022',
    dims: '100 × 100 cm',
    image: artwork2,
    aspect: 'square',
    description: 'Painted in a single nocturnal session. The canvas holds the silence of a theater after everyone has gone home.',
  },
  {
    id: 3,
    title: 'The Audience',
    medium: 'Installation',
    year: '2023',
    dims: '200 × 500 cm',
    image: artwork3,
    aspect: 'wide',
    description: 'Multi-panel installation exploring the gaze — who watches, who is seen, and what survives the looking.',
  },
  {
    id: 4,
    title: 'Crimson Interior',
    medium: 'Oil',
    year: '2021',
    dims: '80 × 100 cm',
    image: g1,
    aspect: 'tall',
    description: 'Built from the inside out — layers of cadmium red worked into raw umber until a kind of warmth emerges from darkness.',
  },
  {
    id: 5,
    title: 'Torn Archive',
    medium: 'Mixed Media',
    year: '2022',
    dims: '120 × 90 cm',
    image: g2,
    aspect: 'wide',
    description: 'Newsprint and memory. The fragments resist legibility — deliberately — so that feeling precedes reading.',
  },
  {
    id: 6,
    title: 'Body in Transit',
    medium: 'Oil',
    year: '2023',
    dims: '70 × 100 cm',
    image: g3,
    aspect: 'tall',
    description: 'A figure caught between stillness and flight. The brushwork mirrors the indecision of motion not yet committed.',
  },
  {
    id: 7,
    title: 'Gray Study No. 4',
    medium: 'Charcoal & Gesso',
    year: '2020',
    dims: '60 × 60 cm',
    image: g4,
    aspect: 'square',
    description: 'Part of a year-long monochromatic series. Restraint as method; the single value forced every other decision.',
  },
  {
    id: 8,
    title: 'Pour — Lisbon',
    medium: 'Acrylic',
    year: '2022',
    dims: '90 × 120 cm',
    image: g5,
    aspect: 'wide',
    description: "Liquid pigment directed by gravity and breath. Control surrendered; the city's tides worked into the paint.",
  },
  {
    id: 9,
    title: 'Gesture Study III',
    medium: 'Ink',
    year: '2021',
    dims: '50 × 70 cm',
    image: g6,
    aspect: 'tall',
    description: 'A choreography of marks — ink splattered first, then the slower work of interpreting the accident into intention.',
  },
  {
    id: 10,
    title: 'Storm Coast',
    medium: 'Oil',
    year: '2023',
    dims: '150 × 80 cm',
    image: g7,
    aspect: 'wide',
    description: 'Atlantic weather painted from memory, three weeks after the trip. The distance made the gray more accurate.',
  },
  {
    id: 11,
    title: 'Trace — Movement IV',
    medium: 'Installation',
    year: '2022',
    dims: 'Variable',
    image: g8,
    aspect: 'tall',
    description: 'Long-exposure performance documentation elevated to artwork. The dancer became the brush; the studio the canvas.',
  },
  {
    id: 12,
    title: 'Surface Memory',
    medium: 'Mixed Media',
    year: '2020',
    dims: '40 × 40 cm',
    image: g9,
    aspect: 'square',
    description: 'A micro study. The texture holds everything — scraping, repainting, scraping again — until the paint becomes sediment.',
  },
  {
    id: 13,
    title: 'Interval',
    medium: 'Acrylic',
    year: '2021',
    dims: '130 × 90 cm',
    image: g10,
    aspect: 'wide',
    description: 'Two states in dialogue across a single plane. Neither resolves; the tension between them is the subject.',
  },
];

const FILTERS = ['All', 'Oil', 'Acrylic', 'Mixed Media', 'Installation', 'Ink', 'Charcoal & Gesso'];

function ArtworkCard({
  artwork,
  index,
  onClick,
}: {
  artwork: typeof ALL_ARTWORKS[0];
  index: number;
  onClick: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 80);
    return () => clearTimeout(timer);
  }, [index]);

  const aspectClass =
    artwork.aspect === 'tall'
      ? 'row-span-2'
      : artwork.aspect === 'wide'
        ? 'col-span-2'
        : '';

  return (
    <div
      className={`relative overflow-hidden group cursor-pointer ${aspectClass}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 700ms ease ${index * 60}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${index * 60}ms`,
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-testid={`card-artwork-${artwork.id}`}
    >
      {/* Image */}
      <div className="w-full h-full min-h-[280px] bg-[#141414] overflow-hidden">
        <img
          src={artwork.image}
          alt={artwork.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        />
      </div>

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-6 transition-all duration-400"
        style={{
          background: hovered
            ? 'linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.5) 50%, transparent 100%)'
            : 'linear-gradient(to top, rgba(13,13,13,0.6) 0%, transparent 60%)',
        }}
      >
        <div
          style={{
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
            opacity: hovered ? 1 : 0.7,
            transition: 'transform 300ms ease, opacity 300ms ease',
          }}
        >
          <h3 className="text-[#f5f0eb] font-bold text-[18px] leading-tight mb-1">{artwork.title}</h3>
          <div className="flex items-center gap-3">
            <span className="text-[#c9b99a] text-[12px] tracking-[0.15em] uppercase font-medium">{artwork.medium}</span>
            <span className="text-[#8a8580] text-[12px]">·</span>
            <span className="text-[#8a8580] text-[12px]">{artwork.year}</span>
          </div>
          <p
            className="text-[#8a8580] text-[13px] leading-relaxed mt-2 max-w-[300px] line-clamp-2"
            style={{ opacity: hovered ? 1 : 0, transition: 'opacity 300ms ease 100ms' }}
          >
            {artwork.description}
          </p>
        </div>

        {/* View icon */}
        <div
          className="absolute top-5 right-5 w-9 h-9 border border-white/25 rounded-full flex items-center justify-center"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'scale(1) rotate(0deg)' : 'scale(0.7) rotate(-20deg)',
            transition: 'all 350ms cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M7 2l5 5-5 5" stroke="#f5f0eb" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Lightbox({
  artwork,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  artwork: typeof ALL_ARTWORKS[0];
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[200] bg-[#0d0d0d]/96 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="relative max-w-6xl w-full h-full flex flex-col md:flex-row items-center gap-8 md:gap-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="flex-1 flex items-center justify-center h-[55vh] md:h-[80vh] max-w-full overflow-hidden">
          <img
            src={artwork.image}
            alt={artwork.title}
            className="max-w-full max-h-full object-contain shadow-2xl"
            style={{ animation: 'lightboxIn 400ms cubic-bezier(0.22,1,0.36,1)' }}
          />
        </div>

        {/* Info panel */}
        <div className="md:w-[280px] flex-shrink-0 text-left">
          <span className="text-[#8a8580] text-[11px] tracking-[0.3em] uppercase block mb-4">
            {ALL_ARTWORKS.findIndex((a) => a.id === artwork.id) + 1} / {total}
          </span>
          <h2 className="text-[#f5f0eb] font-black text-[28px] md:text-[36px] leading-tight mb-4">
            {artwork.title}
          </h2>
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex justify-between border-b border-white/8 pb-3">
              <span className="text-[#8a8580] text-[12px] uppercase tracking-wider">Medium</span>
              <span className="text-[#c9b99a] text-[12px] uppercase tracking-wider font-medium">{artwork.medium}</span>
            </div>
            <div className="flex justify-between border-b border-white/8 pb-3">
              <span className="text-[#8a8580] text-[12px] uppercase tracking-wider">Year</span>
              <span className="text-[#f5f0eb] text-[12px]">{artwork.year}</span>
            </div>
            <div className="flex justify-between border-b border-white/8 pb-3">
              <span className="text-[#8a8580] text-[12px] uppercase tracking-wider">Size</span>
              <span className="text-[#f5f0eb] text-[12px]">{artwork.dims}</span>
            </div>
          </div>
          <p className="text-[#8a8580] font-light text-[14px] leading-[1.75] mb-8">
            {artwork.description}
          </p>
          <a
            href="#commissions"
            onClick={onClose}
            className="inline-flex items-center gap-3 border border-[#c9b99a]/40 text-[#c9b99a] px-6 py-3 text-[12px] tracking-[0.2em] uppercase font-medium hover:bg-[#c9b99a] hover:text-[#0d0d0d] transition-all duration-300"
          >
            <span>Commission Similar</span>
            <span>→</span>
          </a>
        </div>
      </div>

      {/* Nav arrows */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:border-[#c9b99a] hover:text-[#c9b99a] transition-all duration-200 text-[#f5f0eb]"
        data-testid="button-lightbox-prev"
      >
        ←
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:border-[#c9b99a] hover:text-[#c9b99a] transition-all duration-200 text-[#f5f0eb]"
        data-testid="button-lightbox-next"
      >
        →
      </button>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-[#8a8580] hover:text-[#f5f0eb] transition-colors duration-200 text-[20px]"
        data-testid="button-lightbox-close"
      >
        ✕
      </button>
    </div>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.transition = 'opacity 500ms ease';
      document.body.style.opacity = '1';
      setMounted(true);
    }, 80);
  }, []);

  const filtered =
    activeFilter === 'All'
      ? ALL_ARTWORKS
      : ALL_ARTWORKS.filter((a) => a.medium === activeFilter);

  const openLightbox = useCallback((filteredIndex: number) => {
    setLightboxIndex(filteredIndex);
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prevLightbox = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : i === 0 ? filtered.length - 1 : i - 1));
  }, [filtered.length]);

  const nextLightbox = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : i === filtered.length - 1 ? 0 : i + 1));
  }, [filtered.length]);

  return (
    <div className="bg-[#0d0d0d] text-[#f5f0eb] min-h-screen selection:bg-[#c9b99a] selection:text-[#0d0d0d]">
      <Navbar />

      {/* Page header */}
      <div className="pt-36 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div
          className="transition-all duration-700"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <span className="text-[#8a8580] text-[11px] tracking-[0.3em] uppercase block mb-5">
            Complete Works
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <h1 className="font-black text-[clamp(40px,7vw,80px)] leading-[0.9] text-[#f5f0eb] max-w-xl">
              Explore the<br />
              <span className="text-[#c9b99a]">Collection</span>
            </h1>
            <p className="text-[#8a8580] font-light text-[15px] max-w-[360px] leading-relaxed md:text-right">
              Thirteen works spanning two decades of painting, installation, and performance. Each piece a record of something felt and refused to be forgotten.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                data-testid={`filter-${filter.toLowerCase().replace(/\s+/g, '-')}`}
                className="transition-all duration-200 text-[12px] tracking-[0.18em] uppercase font-medium px-5 py-2.5 border"
                style={{
                  borderColor: activeFilter === filter ? '#c9b99a' : 'rgba(255,255,255,0.15)',
                  color: activeFilter === filter ? '#c9b99a' : '#8a8580',
                  background: activeFilter === filter ? 'rgba(201,185,154,0.08)' : 'transparent',
                }}
              >
                {filter}
                {filter === 'All' && (
                  <span className="ml-2 text-[10px] opacity-60">{ALL_ARTWORKS.length}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-white/8 mb-10" />

      {/* Masonry grid */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto pb-32">
        {filtered.length === 0 ? (
          <div className="py-32 text-center text-[#8a8580]">
            <p className="text-[18px]">No works in this medium yet.</p>
          </div>
        ) : (
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gridAutoRows: '280px',
              gridAutoFlow: 'dense',
            }}
          >
            {filtered.map((artwork, index) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                index={index}
                onClick={() => openLightbox(index)}
              />
            ))}
          </div>
        )}

        {/* Count */}
        <div className="mt-12 flex items-center gap-4">
          <div className="flex-1 h-[1px] bg-white/8" />
          <span className="text-[#8a8580] text-[12px] tracking-[0.2em] uppercase whitespace-nowrap">
            {filtered.length} work{filtered.length !== 1 ? 's' : ''}
          </span>
          <div className="flex-1 h-[1px] bg-white/8" />
        </div>
      </div>

      {/* CTA strip */}
      <div className="border-t border-white/8 py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-bold text-[clamp(22px,3vw,36px)] text-[#f5f0eb] mb-2">
              Something caught your eye?
            </h3>
            <p className="text-[#8a8580] font-light text-[15px]">
              Commission an original piece or acquire a limited print.
            </p>
          </div>
          <Link
            href="/#commissions"
            className="flex-shrink-0 inline-flex items-center gap-3 bg-[#c9b99a] text-[#0d0d0d] px-8 py-4 font-semibold text-[13px] tracking-[0.2em] uppercase hover:bg-[#f5f0eb] transition-colors duration-300"
            data-testid="link-commissions-cta"
          >
            <span>Commission a Work</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      <Footer />

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          artwork={filtered[lightboxIndex]}
          total={filtered.length}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      )}

      <style>{`
        @keyframes lightboxIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
