import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { AnimatedUnderline } from './TextAnimations';

const Skills = () => {
  const sectionRef = useRef(null);
  
  const skills = [
    { name: 'HTML5', icon: 'devicon-html5-plain' },
    { name: 'CSS3', icon: 'devicon-css3-plain' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain' },
    { name: 'React', icon: 'devicon-react-original' },
    { name: 'Node.js', icon: 'devicon-nodejs-plain' },
    { name: 'MongoDB', icon: 'devicon-mongodb-plain' },
    { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain' },
    { name: 'Git', icon: 'devicon-git-plain' },
    { name: 'GitHub', icon: 'devicon-github-original' },
    { name: 'VS Code', icon: 'devicon-vscode-plain' }
  ];

  useEffect(() => {
    // Horizontal Marquee animation
    gsap.to('.marquee-content', {
      xPercent: -50,
      ease: 'none',
      duration: 20,
      repeat: -1
    });

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        gsap.to(".skill-item", {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "back.out(1.7)"
        });
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      gsap.set(".skill-item", { y: 30, opacity: 0 });
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-32 relative overflow-hidden bg-bg-secondary transition-colors duration-300">
      {/* Background Marquee Ticker */}
      <div className="absolute inset-0 flex items-center whitespace-nowrap opacity-[0.03] -z-10 pointer-events-none select-none">
        <div className="marquee-content flex gap-8 text-[12rem] md:text-[18rem] font-bold text-text-primary opacity-[0.03] font-sans tracking-tighter">
          {Array(4).fill("HTML CSS JS REACT NODE UI UX ").map((txt, i) => (
            <span key={i}>{txt}</span>
          ))}
        </div>
      </div>

      <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary mb-16 text-center">
        <span className="text-accent italic"><AnimatedUnderline delay={0.2}>Tech</AnimatedUnderline></span> Stack
      </h2>
      
      <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-4xl mx-auto relative z-10 px-4">
        {skills.map((skill, index) => (
          <div 
            key={index} 
            className="skill-item flex flex-col items-center justify-center p-6 glass-card bg-card-bg/60 rounded-2xl w-32 md:w-36 group transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl"
            data-cursor="LEARN"
          >
            <i className={`${skill.icon} text-5xl text-slate-700 group-hover:text-gold transition-colors duration-300 transform group-hover:scale-110 group-hover:rotate-[8deg] ease-out`}></i>
            <span className="mt-4 text-sm font-medium text-slate-600 font-sans tracking-wide">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
