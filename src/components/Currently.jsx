import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Code, Database, BrainCircuit, TerminalSquare } from 'lucide-react';
import { AnimatedUnderline } from './TextAnimations';

const currentFocuses = [
  {
    icon: <Code size={24} />,
    title: "Building MERN Projects",
    desc: "Developing full-stack applications to strengthen my understanding of React frontend and Express backend integration."
  },
  {
    icon: <Database size={24} />,
    title: "Learning Node.js Deeply",
    desc: "Focusing on backend architecture, API design, and writing scalable server-side code."
  },
  {
    icon: <TerminalSquare size={24} />,
    title: "Practicing DSA",
    desc: "Consistently solving algorithms and data structure problems to improve problem-solving speed and logic."
  },
  {
    icon: <BrainCircuit size={24} />,
    title: "Hackathon Prep",
    desc: "Gearing up for competitive programming and building innovative solutions under time constraints."
  }
];

const Currently = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        gsap.fromTo(".current-card", 
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
        );
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="currently" ref={sectionRef} className="py-20 relative bg-bg-primary transition-colors duration-300">
      <div className="max-w-[1100px] mx-auto px-4 relative z-10">
        <div className="mb-16 md:mb-20 text-center md:text-left">
          <p className="text-accent font-bold tracking-widest uppercase text-xs mb-3 flex items-center justify-center md:justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_var(--accent)]"></span>
            What I'm Doing Now
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800">
            Current <span className="text-accent italic font-light"><AnimatedUnderline delay={0.2}>Focus</AnimatedUnderline></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentFocuses.map((item, idx) => (
            <div key={idx} className="current-card opacity-0 bg-bg-secondary/30 border border-border-color/40 backdrop-blur-sm p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-500 shadow-sm hover:shadow-xl group">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-inner">
                {item.icon}
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-800 mb-3 group-hover:text-gold transition-colors">{item.title}</h3>
              <p className="text-slate-600 font-light text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Currently;
