import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%) scale(${isHovering.current ? 0 : 1})`;
      }
    };

    const onMouseEnter = () => {
      isHovering.current = true;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%) scale(0)`;
      }
    };

    const onMouseLeave = () => {
      isHovering.current = false;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%) scale(1)`;
      }
    };

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [data-interactive="true"]').forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    
    // Initial listeners
    addHoverListeners();
    
    // Setup mutation observer for dynamically added interactive elements
    const observer = new MutationObserver((mutations) => {
      let shouldReattach = false;
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) shouldReattach = true;
      });
      if (shouldReattach) addHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    let rafId: number;
    const render = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.08;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.08;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%) scale(${isHovering.current ? 1.5 : 1})`;
      }
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.querySelectorAll('a, button, [data-interactive="true"]').forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-[#c9b99a]/40 rounded-full pointer-events-none z-[9999] transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[#c9b99a] rounded-full pointer-events-none z-[9999] transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
}
