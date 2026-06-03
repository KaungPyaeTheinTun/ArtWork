import { useEffect } from 'react';
import Lenis from 'lenis';

import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ArtworksSection from '@/components/ArtworksSection';
import ProcessSection from '@/components/ProcessSection';
import CollaborationsSection from '@/components/CollaborationsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CommissionsSection from '@/components/CommissionsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  useEffect(() => {
    // Initial reveal animation
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.transition = 'opacity 600ms ease';
      document.body.style.opacity = '1';
    }, 100);

    // Smooth scroll setup
    const lenis = new Lenis({ 
      duration: 1.2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
    });
    
    const raf = (time: number) => { 
      lenis.raf(time); 
      requestAnimationFrame(raf); 
    };
    
    requestAnimationFrame(raf);
    
    return () => lenis.destroy();
  }, []);

  return (
    <div className="bg-[#0d0d0d] text-[#f5f0eb] min-h-screen selection:bg-[#c9b99a] selection:text-[#0d0d0d]">
      <CustomCursor />
      <Navbar />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ArtworksSection />
        <ProcessSection />
        <CollaborationsSection />
        <TestimonialsSection />
        <CommissionsSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
