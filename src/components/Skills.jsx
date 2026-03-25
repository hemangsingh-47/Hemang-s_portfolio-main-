import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { AnimatedUnderline } from './TextAnimations';

const Skills = () => {
  const sectionRef = useRef(null);
  
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: 'React.js', icon: 'devicon-react-original' },
        { name: 'JavaScript', icon: 'devicon-javascript-plain' },
        { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain' },
        { name: 'HTML5', icon: 'devicon-html5-plain' },
        { name: 'CSS3', icon: 'devicon-css3-plain' }
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: 'Node.js', icon: 'devicon-nodejs-plain' },
        { name: 'Express.js', icon: 'devicon-express-original' }
      ]
    },
    {
      title: "Database",
      skills: [
        { name: 'MongoDB', icon: 'devicon-mongodb-plain' }
      ]
    },
    {
      title: "Tools & Workflow",
      skills: [
        { name: 'Git', icon: 'devicon-git-plain' },
        { name: 'GitHub', icon: 'devicon-github-original' },
        { name: 'VS Code', icon: 'devicon-vscode-plain' },
        { name: 'Postman', icon: 'devicon-postman-plain' }
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        gsap.to(".category-card", {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out"
        });
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      gsap.set(".category-card", { y: 40, opacity: 0 });
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-24 md:py-32 relative bg-bg-secondary/40 transition-colors duration-300 pointer-events-auto">
      <div className="max-w-[1100px] mx-auto px-4 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800">
            Tech <span className="text-accent italic font-light"><AnimatedUnderline delay={0.2}>Stack</AnimatedUnderline></span>
          </h2>
          <p className="text-slate-600 font-light text-lg mt-4">Technologies I use to bring ideas to life.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {skillCategories.map((category, catIndex) => (
            <div 
              key={catIndex} 
              className="category-card bg-bg-primary/60 backdrop-blur-md border border-border-color/30 rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-[0_20px_40px_rgba(212,163,115,0.06)] transition-all duration-500 overflow-hidden relative group"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-accent/5 rounded-full filter blur-[40px] group-hover:bg-accent/10 transition-colors duration-500 z-0"></div>
              
              <h3 className="font-serif text-2xl font-bold text-slate-800 mb-8 relative z-10 border-b border-sage/20 pb-4 inline-block w-full">
                {category.title}
              </h3>
              
              <div className="flex flex-wrap gap-5 relative z-10">
                {category.skills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center justify-center p-4 bg-bg-secondary border border-border-color/50 rounded-2xl w-[90px] group/skill transition-all duration-300 hover:-translate-y-2 hover:border-gold/40 hover:shadow-lg"
                    data-cursor="LEARN"
                  >
                    <i className={`${skill.icon} text-3xl md:text-4xl text-slate-600 group-hover/skill:text-gold transition-colors duration-300 transform group-hover/skill:scale-110 ease-out`}></i>
                    <span className="mt-3 text-[11px] font-bold text-slate-500 tracking-wider font-sans text-center leading-tight">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
