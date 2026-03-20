import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onStartExit, onComplete }) => {
  const containerRef = useRef(null);
  const isDark = localStorage.getItem("theme") === "dark";
  
  useEffect(() => {
    // Disable scroll globally immediately
    document.body.style.overflow = 'hidden';
    // ensure window is at top
    window.scrollTo(0, 0);

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = 'auto';
        if (onComplete) onComplete();
      }
    });

    // Initial states perfectly matched to requirements
    gsap.set(".preloader-text", { y: 20, opacity: 0 });
    gsap.set(".preloader-line", { width: 0 }); 
    gsap.set(".preloader-sub", { opacity: 0 });
    gsap.set(".preloader-progress", { width: '0%' });

    // Stage 1 (delay: 200ms) - "HS." fades + slides up
    tl.to(".preloader-text", {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power1.inOut" // equivalent to general ease
    }, 0.2)
    
    // Stage 2 (delay: 800ms) - Golden horizontal line
    .to(".preloader-line", {
      width: 64, // target width
      duration: 0.5,
      ease: "power1.inOut"
    }, 0.8)
    
    // Stage 3 (delay: 1200ms) - Tagline fades in
    .to(".preloader-sub", {
      opacity: 1,
      duration: 0.5,
      ease: "power1.inOut"
    }, 1.2)
    
    // Stage 4 (delay: 1600ms) - Progress bar bottom fill
    .to(".preloader-progress", {
      width: '100%',
      duration: 0.6,
      ease: "power1.inOut"
    }, 1.6)
    
    // Stage 5 (delay: 2400ms) - Exit Preloader screen up
    .to(containerRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "cubic-bezier(0.76, 0, 0.24, 1)",
      onStart: () => {
        // Triggers the main site to fade in underneath simultaneously
        if (onStartExit) onStartExit();
      }
    }, 2.4);

  }, [onComplete, onStartExit]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-none touch-none bg-bg-primary transition-colors duration-300"
    >
      <div className="flex flex-col items-center w-full">
        {/* HS. Logo */}
        <h1 
          className="preloader-text font-serif text-[64px] tracking-tight leading-none mx-auto text-center font-medium text-text-primary" 
          style={{ fontWeight: 500 }}
        >
          HS.
        </h1>
        {/* Thin Gold Line */}
        <div 
          className="h-[1.5px] bg-[#d4a373] preloader-line mx-auto" 
          style={{ margin: '12px auto 16px' }}
        ></div>
        {/* Subtitle */}
        <p 
          className="preloader-sub font-sans text-[11px] text-[#8a8070] uppercase tracking-[0.22em] text-center px-4" 
          style={{ fontWeight: 300 }}
        >
          Full-Stack Developer & Content Creator
        </p>
      </div>

      {/* Very bottom loading progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent overflow-hidden">
        <div className="preloader-progress h-full bg-[#d4a373]"></div>
      </div>
    </div>
  );
};

export default Preloader;
