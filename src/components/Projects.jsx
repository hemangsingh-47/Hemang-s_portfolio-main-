import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Github, ExternalLink } from 'lucide-react';
import { AnimatedUnderline } from './TextAnimations';

const curatedProjects = [
  {
    num: "01",
    title: "FleetFlow Dashboard",
    summary: "Architected a modern, data-driven fleet management dashboard with real-time analytics and interactive visualization, optimizing operational oversight.",
    features: [
      "Real-time state management and data rendering",
      "Interactive analytics with Chart.js and Framer Motion",
      "Responsive, clean UI architecture"
    ],
    tags: ["React.js", "Tailwind CSS", "Chart.js"],
    code: "https://github.com/hemangsingh-47/oddo_01",
    live: "https://fleet-flow-coding-gita.netlify.app/",
    image: "/fleetflow.jpg"
  },
  {
    num: "02",
    title: "Eufy Security Clone",
    summary: "Engineered a fully responsive clone of the Eufy e-commerce platform, demonstrating strong proficiency in advanced CSS layouts and DOM structure.",
    features: [
      "Pixel-perfect UI replication",
      "Advanced CSS Grid & Flexbox layouts",
      "Mobile-first responsive methodology"
    ],
    tags: ["HTML5", "CSS3", "UI/UX"],
    code: "https://github.com/hemangsingh-47/clone_assignment",
    live: "https://eufyclone.netlify.app/",
    image: "/eufy.jpg"
  },
  {
    num: "03",
    title: "Moglix Platform Clone",
    summary: "Developed a structural clone of the Moglix industrial e-commerce site, focusing on complex navigation patterns and product grid architectures.",
    features: [
      "Complex nested navigation layouts",
      "Scalable product grid systems",
      "Cross-browser compatibility"
    ],
    tags: ["HTML5", "CSS3", "Layout Design"],
    code: "https://github.com/hemangsingh-47/clone_assignment",
    live: "https://moglix-by-hemang.netlify.app/",
    image: "/moglix.jpg"
  }
];

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000
    });

    gsap.to(glowRef.current, {
      x,
      y,
      opacity: 0.4,
      duration: 0.2
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !glowRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.3)'
    });
    gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-card relative rounded-3xl flex flex-col h-full transform transition-all duration-300 bg-card-bg/50 backdrop-blur-md border border-border-color/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(212,163,115,0.15)] hover:border-accent/60 overflow-hidden group"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Premium Glow overlay */}
      <div 
        ref={glowRef}
        className="absolute pointer-events-none w-96 h-96 bg-accent opacity-0 rounded-full mix-blend-soft-light filter blur-[100px] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 z-20"
      ></div>

      {/* Number Badge */}
      <div className="absolute top-4 left-4 z-10 bg-cream/90 backdrop-blur-sm text-gold font-serif font-bold text-lg px-3 py-1 rounded-lg border border-gold/20 shadow-sm" style={{ transform: 'translateZ(40px)' }}>
        {project.num}
      </div>

      {/* Card Header Image */}
      <div className="w-full aspect-video overflow-hidden rounded-t-3xl border-b border-sage/20 bg-cream/50 relative flex items-center justify-center">
        <span className="absolute z-0 text-slate-400 font-mono text-sm tracking-widest uppercase opacity-70">
          Drop {project.image.replace('/', '')} into public/
        </span>
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 z-10 relative"
          onError={(e) => {
             e.target.style.display = 'none';
          }}
        />
        {/* Abstract fallback gradient overlay just in case */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none mix-blend-overlay"></div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div style={{ transform: 'translateZ(30px)' }}>
          <h3 className="text-xl font-bold font-serif text-slate-800 mb-2 group-hover:text-gold transition-colors block leading-tight">{project.title}</h3>
          
          <p className="text-slate-600 font-medium text-[13px] mb-4 leading-relaxed">
            {project.summary}
          </p>

          {/* Key Features List */}
          <div className="mb-5 space-y-1">
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">Key Features</p>
            <ul className="text-xs text-slate-500 font-light space-y-1.5 list-none pl-0">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-accent mt-[1px] opacity-70">▹</span> {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-6 mt-auto" style={{ transform: 'translateZ(20px)' }}>
          {project.tags.map((tag, i) => (
            <span key={i} className="px-2.5 py-1 bg-transparent border border-border-color/40 text-text-secondary text-[9px] font-bold tracking-widest uppercase rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        {/* Bottom Links */}
        <div className="flex items-center gap-5 border-t border-sage/10 pt-5 mt-auto" style={{ transform: 'translateZ(10px)' }}>
          <a 
            href={project.code} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-text-secondary hover:text-gold transition-colors"
          >
            <Github size={16} /> Code
          </a>
          <a 
            href={project.live} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-text-secondary hover:text-gold transition-colors"
          >
            <ExternalLink size={16} /> Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Animate cards staggering up using ScrollTrigger
    gsap.fromTo(".project-card", 
      { y: 100, opacity: 0, rotateX: 10 },
      { 
        y: 0, opacity: 1, rotateX: 0, 
        duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 md:py-32 relative bg-bg-secondary/30 transition-colors duration-300">
       {/* Divder Top */}
       <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 transform -translate-y-full">
        <svg className="block w-full h-[30px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C63.26,30.4,142.17,59.39,221.4,59.39C255.48,59.39,288.58,58.5,321.39,56.44Z" fill="var(--bg-secondary)" opacity="0.5"></path>
        </svg>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 px-4 max-w-[1100px] mx-auto">
        <div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Selected <span className="text-accent italic font-light"><AnimatedUnderline delay={0.2}>Works</AnimatedUnderline></span>
          </h2>
        </div>
        <a 
          href="https://github.com/hemangsingh-47" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-slate-500 hover:text-gold transition-colors font-medium border-b border-sage/30 hover:border-gold pb-1"
          data-cursor="GITHUB"
        >
          View all on GitHub <ExternalLink size={16} />
        </a>
      </div>

      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4" style={{ perspective: '1000px' }}>
        {curatedProjects.map(repo => (
          <ProjectCard key={repo.num} project={repo} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
