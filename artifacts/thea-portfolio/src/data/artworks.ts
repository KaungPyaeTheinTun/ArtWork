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

export interface Artwork {
  id: number;
  title: string;
  medium: string;
  year: string;
  dims: string;
  image: string;
  aspect: "tall" | "square" | "wide";
  description: string;
}

export const ALL_ARTWORKS: Artwork[] = [
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

export const FILTERS = [
  "All",
  "Oil",
  "Acrylic",
  "Mixed Media",
  "Installation",
  "Ink",
  "Charcoal & Gesso",
];
