import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Youtube, PlayCircle } from 'lucide-react';

const Content = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        gsap.to(sectionRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out"
        });
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    if (sectionRef.current) {
      gsap.set(sectionRef.current, { y: 50, opacity: 0 });
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="content" ref={sectionRef} className="py-24 md:py-32 border-t border-border-color/20 bg-bg-primary transition-colors duration-300">
      <div className="glass-card rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group">
        
        {/* Background decorative blob */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-peach/40 rounded-full filter blur-[80px] -z-10 group-hover:bg-gold/20 transition-colors duration-700"></div>
        
        <div className="w-24 h-24 md:w-32 md:h-32 bg-red-50 text-red-600 rounded-full flex items-center justify-center shrink-0 shadow-sm border border-red-100">
          <Youtube size={48} className="md:w-16 md:h-16" strokeWidth={1.5} />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-primary mb-2">
            DevWithHemang
          </h2>
          <h3 className="text-xl text-accent font-medium mb-6">
            Tutorials, Dev Vlogs & Tips
          </h3>
          <p className="text-slate-600 font-light max-w-xl mb-8 leading-relaxed mx-auto md:mx-0">
            Join me on YouTube where I document my journey, share coding tutorials, and break down complex full-stack concepts into easy-to-understand videos. 
          </p>
          
          <a 
            href="https://www.youtube.com/@DevWithHemang" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 bg-red-600 text-white font-medium hover:bg-red-700 transition-colors duration-300 shadow-sm rounded-full cursor-none"
          >
            <PlayCircle size={20} />
            Watch on YouTube
          </a>
        </div>
      </div>
    </section>
  );
};

export default Content;
