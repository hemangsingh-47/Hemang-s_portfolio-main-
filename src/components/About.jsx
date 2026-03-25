import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedUnderline } from './TextAnimations';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  
  const [counters, setCounters] = useState({ projects: 0, videos: 0, commits: 0 });
  const targetStats = useRef({ projects: 12, videos: 6, commits: 146 });

  useEffect(() => {

    // Reveal text
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(".about-reveal", {
              y: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.2,
              ease: "power3.out"
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      gsap.set(".about-reveal", { y: 50, opacity: 0 });
      observer.observe(sectionRef.current);
    }


    // Animated Counters with Live Targets
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      once: true,
      onEnter: () => {
        const statsObj = { projects: 0, videos: 0, commits: 0 };
        gsap.to(statsObj, {
          projects: targetStats.current.projects,
          videos: targetStats.current.videos,
          commits: targetStats.current.commits,
          duration: 2.5,
          ease: "power2.out",
          onUpdate: () => {
            setCounters({
              projects: Math.floor(statsObj.projects),
              videos: Math.floor(statsObj.videos),
              commits: Math.floor(statsObj.commits)
            });
          }
        });
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 relative bg-bg-primary transition-colors duration-300">
      {/* Wavy Divider at top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 transform -translate-y-full">
        <svg className="block w-full h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C63.26,30.4,142.17,59.39,221.4,59.39C255.48,59.39,288.58,58.5,321.39,56.44Z" fill="var(--bg-primary)"></path>
        </svg>
      </div>

      <div className="flex flex-col gap-12 px-4 max-w-6xl mx-auto">
        <div className="about-reveal">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800">
            About <span className="text-accent italic font-light"><AnimatedUnderline delay={0.5}>Me</AnimatedUnderline></span>
          </h2>
        </div>

        <div className="grid md:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Text & Stats on Left */}
          <div className="md:col-span-7 relative z-20 flex flex-col gap-8 order-2 md:order-1">
            <div>
              <p className="about-reveal text-lg text-slate-600 leading-relaxed mb-6 font-light text-balance">
                I’m a 2nd semester student who enjoys building modern web applications and learning full-stack development. I’m currently focused on improving my backend skills, building MERN stack projects, and creating clean, user-friendly digital experiences.
              </p>
              
              <div className="about-reveal mb-8">
                <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">What I focus on</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-600 font-medium tracking-wide">
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-accent/60"></span> Full Stack Web Development</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-accent/60"></span> Backend APIs and Databases</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-accent/60"></span> Clean UI & Responsive Design</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-accent/60"></span> Real-world Projects</li>
                </ul>
              </div>
            </div>
            
            {/* Animated Stats Row */}
            <div className="about-reveal flex justify-between pt-8 border-t border-sage/20 pr-4">
              <div>
                <p className="font-serif text-4xl text-gold font-bold mb-1">{counters.projects}+</p>
                <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Projects Built</p>
              </div>
              <div>
                <p className="font-serif text-4xl text-gold font-bold mb-1">{counters.videos}+</p>
                <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">YouTube Vids</p>
              </div>
              <div>
                <p className="font-serif text-4xl text-gold font-bold mb-1">{counters.commits}+</p>
                <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">GH Commits</p>
              </div>
            </div>
          </div>

          {/* Photo on Right */}
          <div className="md:col-span-5 flex justify-center md:justify-end about-reveal relative order-1 md:order-2">
            
            {/* Unified 'Perfect Shape' Frame */}
            <div className="relative p-3 border-2 border-accent/30 rounded-[2.2rem] shadow-2xl bg-bg-secondary/20 backdrop-blur-sm transition-transform duration-500 hover:scale-[1.02]">
              <div className="w-full max-w-[320px] aspect-[4/5] rounded-[1.5rem] overflow-hidden">
                <img 
                  src="https://github.com/hemangsingh-47.png" 
                  alt="Hemang Singh Solanki" 
                  className="w-full h-full object-cover object-center select-none pointer-events-none transition-transform duration-700"
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
