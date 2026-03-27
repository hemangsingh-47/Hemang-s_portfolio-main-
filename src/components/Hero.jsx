import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from './TextAnimations';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered Entrance Animation across elements
      const tl = gsap.timeline({ delay: 0.1 });

      tl.from(".hero-sub", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      })
        .from(".hero-btn", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out"
        }, "-=0.4");

      // Scroll indicator bounce
      gsap.to(".scroll-indicator", {
        y: 10,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        duration: 1.5
      });
      // Scroll indicator fade out once scrolled
      gsap.to(".scroll-indicator-wrapper", {
        opacity: 0,
        y: 30,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#hero",
          start: "10% top",
          end: "30% top",
          scrub: true, // Smoothly link opacity to scroll progress instead of a sudden toggle
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={containerRef} className="min-h-screen relative flex flex-col justify-center w-full z-10 pt-20">
      {/* Scroll Indicator - Vanilla Fade Implementation */}
      <div className="scroll-indicator-wrapper absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-3">
        <div className="flex flex-col items-center opacity-80">
          {/* Animated Mouse Icon */}
          <div className="w-5 h-8 border-[1.5px] border-text-secondary/60 rounded-full relative mb-2 flex justify-center pt-2">
            <div className="w-1 h-1 bg-accent rounded-full animate-bounce"></div>
          </div>
          <span className="text-[9px] tracking-[0.4em] uppercase text-text-secondary font-bold ml-1">Scroll</span>
        </div>
        {/* Animated Vertical Line */}
        <div className="w-[1px] h-12 bg-gradient-to-b from-text-secondary/40 to-transparent relative overflow-hidden">
          <div className="scroll-indicator w-full h-1/2 bg-accent absolute top-0 left-0"></div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 md:px-12 w-full relative z-30">
        <div className="max-w-3xl">

          {/* Availability Badge */}
          <div className="hero-sub mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest backdrop-blur-sm self-start">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_var(--accent)]"></span>
            Open to internships, hackathons & collaboration
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-text-primary leading-[1.1] mb-6">
            <SplitText text="Hemang Singh" className="block" delay={0.2} />
          </h1>

          <h3 className="hero-sub text-xl md:text-2xl font-medium text-text-secondary mb-6 max-w-2xl bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
            Full Stack Web Developer | 2nd Semester Student
          </h3>

          <p className="hero-sub text-base md:text-lg text-text-muted mb-12 max-w-xl text-balance">
            I build responsive frontend interfaces and backend-powered web applications using React, Node.js, Express, and MongoDB.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <button onClick={() => handleNavClick('/projects')} className="hero-btn group relative overflow-hidden px-8 h-[56px] bg-text-primary text-bg-primary font-bold tracking-wide transition-transform duration-300 shadow-lg hover:-translate-y-1 rounded-sm inline-flex items-center justify-center" data-magnetic>
              {/* Liquid fill hover */}
              <span className="absolute inset-0 w-full h-full bg-accent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></span>
              <span className="relative z-10 block mix-blend-difference text-white">View Projects</span>
            </button>

            <button onClick={() => window.open('/Resume_Hemang.pdf', '_blank')} className="hero-btn group relative overflow-hidden px-8 h-[56px] bg-accent text-white font-bold tracking-wide transition-transform duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 rounded-sm inline-flex items-center justify-center" data-magnetic>
              <span className="absolute inset-0 w-full h-full bg-text-primary transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-in-out z-0"></span>
              <span className="relative z-10 block">Resume</span>
            </button>

            <button onClick={() => handleNavClick('/contact')} className="hero-btn px-8 h-[56px] bg-transparent text-text-primary font-medium border border-border-color/60 hover:border-accent hover:text-accent transition-all duration-300 rounded-sm glass-card hover:-translate-y-1 inline-flex items-center justify-center" data-magnetic>
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
