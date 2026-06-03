import { useScrollReveal } from '@/hooks/useScrollReveal';
import collabLight from '@/assets/images/collab-light.png';
import collabWall from '@/assets/images/collab-wall.png';
import collabBody from '@/assets/images/collab-body.png';

const projects = [
  { name: 'FLUID LIGHT', img: collabLight },
  { name: 'THE MOVING WALL', img: collabWall },
  { name: 'BODY AS CANVAS', img: collabBody },
];

function Pill({ project, reversed = false }: { project: typeof projects[0]; reversed?: boolean }) {
  return (
    <div className="flex items-center gap-4 bg-[#0d0d0d] border border-white/10 rounded-full py-4 px-8 mx-4 hover:border-[#c9b99a] hover:scale-[1.04] transition-all duration-200 cursor-pointer">
      {reversed && (
        <img src={project.img} alt={project.name} className="w-[80px] h-[80px] rounded-[4px] object-cover flex-shrink-0" />
      )}
      <span className="font-bold text-[24px] uppercase text-[#f5f0eb] whitespace-nowrap">{project.name}</span>
      {!reversed && (
        <img src={project.img} alt={project.name} className="w-[80px] h-[80px] rounded-[4px] object-cover flex-shrink-0" />
      )}
    </div>
  );
}

export default function CollaborationsSection() {
  const headerRef = useScrollReveal();
  const subRef = useScrollReveal();
  const repeatedRow1 = [...projects, ...projects, ...projects, ...projects];
  const repeatedRow2 = [...projects, ...projects, ...projects, ...projects].reverse();

  return (
    <section className="py-[120px] w-full overflow-hidden">

      <div className="px-6 md:px-12 mb-16 text-center max-w-3xl mx-auto">
        <h2
          ref={headerRef as any}
          className="font-bold text-[clamp(28px,4vw,48px)] text-[#f5f0eb] mb-6 clip-reveal"
        >
          Art That Breathes Beyond the Frame
        </h2>
        <p
          ref={subRef as any}
          className="text-[#8a8580] font-light text-[16px] opacity-0 transition-opacity duration-1000 [&.revealed]:opacity-100"
        >
          From gallery installations to live performance — Rivera's work knows no boundary.
        </p>
      </div>

      <div className="flex flex-col gap-8 w-full">

        {/* Row 1 — scrolls left */}
        <div
          className="flex w-max"
          style={{ animation: 'marqueeLeft 25s linear infinite' }}
          onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
          onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
        >
          {repeatedRow1.map((p, i) => (
            <Pill key={`r1-${i}`} project={p} />
          ))}
        </div>

        {/* Row 2 — scrolls right */}
        <div
          className="flex w-max"
          style={{ animation: 'marqueeRight 30s linear infinite' }}
          onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
          onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
        >
          {repeatedRow2.map((p, i) => (
            <Pill key={`r2-${i}`} project={p} reversed />
          ))}
        </div>

      </div>
    </section>
  );
}
