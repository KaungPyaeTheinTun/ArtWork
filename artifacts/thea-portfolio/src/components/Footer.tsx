import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Footer() {
  const footerRef = useScrollReveal(0.1);

  return (
    <footer ref={footerRef as any} className="bg-[#0d0d0d] pt-24 pb-12 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <h2 className="font-bold text-[clamp(24px,3.5vw,40px)] text-[#f5f0eb] max-w-[500px] leading-[1.1] clip-reveal">
            Where Your Vision Becomes a Canvas
          </h2>
          
          <div className="flex flex-wrap gap-8 transition-all duration-600 delay-200 opacity-0 translate-y-[20px] [.revealed_&]:opacity-100 [.revealed_&]:translate-y-0">
            {['Instagram', 'Threads', 'LinkedIn'].map((social) => (
              <a 
                key={social} 
                href="#" 
                className="group relative font-normal text-[13px] tracking-[0.15em] uppercase text-[#f5f0eb] hover:text-[#c9b99a] transition-colors duration-200"
              >
                {social}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#c9b99a] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
        </div>

        <hr className="border-white/10 transition-all duration-600 delay-300 opacity-0 [.revealed_&]:opacity-100" />

        {/* Row 2 */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 transition-all duration-600 delay-400 opacity-0 translate-y-[20px] [.revealed_&]:opacity-100 [.revealed_&]:translate-y-0">
          <div className="text-[#8a8580] font-normal text-[12px]">
            © {new Date().getFullYear()} Thea Rivera. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-[#8a8580] font-normal text-[12px]">
            {['404', 'LICENSE', 'CHANGELOG', 'STYLE GUIDE'].map((link) => (
              <a key={link} href="#" className="hover:text-[#f5f0eb] transition-colors duration-200">
                {link}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
