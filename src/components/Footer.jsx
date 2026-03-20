import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Github, Linkedin, Youtube, Mail } from 'lucide-react';
import { AnimatedUnderline } from './TextAnimations';

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        gsap.to(".footer-item", {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out"
        });
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (footerRef.current) {
      gsap.set(".footer-item", { y: 20, opacity: 0 });
      observer.observe(footerRef.current);
    }
    return () => observer.disconnect();
  }, []);
  
  const bounceHover = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.15,
      rotation: (Math.random() - 0.5) * 30,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  };
  
  const bounceLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      rotation: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <footer id="contact" ref={footerRef} className="bg-bg-footer border-t border-border-color/10 text-text-primary pt-24 pb-20 md:pb-8 relative z-10 w-full rounded-t-[3rem] transition-colors duration-300">
      {/* Background subtle noise for footer */}
      <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none rounded-t-[3rem]"></div>
      
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-12 mb-20 w-full">
          <div>
            <h2 className="footer-item font-serif text-4xl md:text-6xl font-bold text-text-primary mb-6">
              Let's craft <br/> something <span className="text-accent italic">beautiful.</span>
            </h2>
            <p className="footer-item text-text-secondary max-w-sm mb-10 font-light">
              Always open to discussing product design work or partnership opportunities.
            </p>
            <a 
              href="mailto:hello@example.com" 
              className="footer-item inline-block border-b border-gold text-gold hover:text-text-primary hover:border-text-primary transition-colors duration-300 pb-1 text-lg mb-8 md:mb-0"
              data-cursor="GREET"
            >
              Get in touch →
            </a>
          </div>
          
          <div className="flex md:justify-end items-end w-full">
            <div className="flex gap-6">
              <a href="https://github.com/hemangsingh-47" 
                 target="_blank" rel="noopener noreferrer" 
                 className="footer-item p-4 bg-slate-800 rounded-full text-white hover:bg-gold hover:text-slate-900 transition-colors duration-300"
                 onMouseEnter={bounceHover} onMouseLeave={bounceLeave} data-cursor="OPEN">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/hemang-singh-solanki-b866b23ab/" 
                 target="_blank" rel="noopener noreferrer" 
                 className="footer-item p-4 bg-slate-800 rounded-full text-white hover:bg-gold hover:text-slate-900 transition-colors duration-300"
                 onMouseEnter={bounceHover} onMouseLeave={bounceLeave} data-cursor="OPEN">
                <Linkedin size={24} />
              </a>
              <a href="https://www.youtube.com/@DevWithHemang" 
                 target="_blank" rel="noopener noreferrer" 
                 className="footer-item p-4 bg-slate-800 rounded-full text-white hover:bg-gold hover:text-slate-900 transition-colors duration-300"
                 onMouseEnter={bounceHover} onMouseLeave={bounceLeave} data-cursor="OPEN">
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-item pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 w-full">
          <p>© {new Date().getFullYear()} Hemang Singh Solanki.</p>
          <p>Built with passion <span className="text-gold">✦</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
