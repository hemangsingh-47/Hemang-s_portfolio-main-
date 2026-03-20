import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { GraduationCap, Award } from 'lucide-react';
import { AnimatedUnderline } from './TextAnimations';
import CertificateModal from './CertificateModal';

const Experience = () => {
  const sectionRef = useRef(null);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    // Scroll animations for columns
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      }
    });

    tl.fromTo(".exp-left", 
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    ).fromTo(".exp-right",
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-24 md:py-32 relative bg-bg-primary transition-colors duration-300 overflow-hidden">
      
      {/* Divider Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 transform -translate-y-full">
        <svg className="block w-full h-[30px] md:h-[40px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C63.26,30.4,142.17,59.39,221.4,59.39C255.48,59.39,288.58,58.5,321.39,56.44Z" fill="var(--bg-primary)" opacity="0.5"></path>
        </svg>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 z-10 relative">
        {/* Section Header */}
        <div className="mb-16 md:mb-20 text-center md:text-left">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Experience & <span className="text-accent italic font-light"><AnimatedUnderline delay={0.2}>Education</AnimatedUnderline></span>
          </h2>
          <p className="text-slate-600 font-light text-lg">My academic journey and professional experience so far.</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 relative">
          
          {/* LEFT COLUMN: Journey */}
          <div className="exp-left relative">
            <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-800 mb-10 pl-2">
              Journey
            </h3>

            {/* Timeline Line */}
            <div className="absolute left-[26px] top-[70px] bottom-10 w-px bg-sage/40 rounded-full"></div>

            {/* Timeline Items Wrapper */}
            <div className="flex flex-col gap-10 relative z-10">
              
              {/* Entry 1 */}
              <div className="relative pl-16 group">
                {/* Node Icon */}
                <div className="absolute left-1.5 top-0 w-10 h-10 rounded-full bg-bg-secondary border-2 border-gold flex items-center justify-center text-gold shadow-sm group-hover:bg-gold group-hover:text-bg-primary transition-colors duration-300">
                  <GraduationCap size={18} />
                </div>
                
                <div className="bg-bg-secondary/40 backdrop-blur-sm border border-border-color/10 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-gold/30 transition-all duration-300">
                  <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-[10px] font-bold tracking-widest uppercase rounded-full mb-4 border border-gold/20">
                    2025 - 2029
                  </span>
                  <h4 className="text-xl font-bold font-serif text-slate-800 mb-1 group-hover:text-gold transition-colors">BE (CSE)</h4>
                  <p className="text-accent font-medium text-[11px] mb-4 uppercase tracking-widest">Coding Gita</p>
                  <p className="text-slate-600 font-light text-sm leading-relaxed">
                    I am currently pursuing a Bachelor of Engineering in Computer Science (BE CSE) at Coding Gita (2025–2029), focusing on computer science fundamentals, data structures, web development, and modern technologies.
                  </p>
                </div>
              </div>

              {/* Entry 2 */}
              <div className="relative pl-16 group">
                <div className="absolute left-1.5 top-0 w-10 h-10 rounded-full bg-bg-secondary border-2 border-gold flex items-center justify-center text-gold shadow-sm group-hover:bg-gold group-hover:text-bg-primary transition-colors duration-300">
                  <GraduationCap size={18} />
                </div>
                
                <div className="bg-bg-secondary/40 backdrop-blur-sm border border-border-color/10 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-gold/30 transition-all duration-300">
                  <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-[10px] font-bold tracking-widest uppercase rounded-full mb-4 border border-gold/20">
                    2025
                  </span>
                  <h4 className="text-xl font-bold font-serif text-slate-800 mb-1 group-hover:text-gold transition-colors">Class 12 (Board)</h4>
                  <p className="text-accent font-medium text-[11px] mb-4 uppercase tracking-widest">Board of Secondary Education Rajasthan</p>
                  <p className="text-slate-600 font-light text-sm leading-relaxed">
                    Achieved an overall percentage of 90.20% in the Senior Secondary Examination. Key subjects included Physics, Chemistry, and Mathematics.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Certificates */}
          <div className="exp-right">
            <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-800 mb-10 pl-2">
              Certificates & Achievements
            </h3>

            {/* Certificate Card 1 */}
            <div className="bg-bg-tertiary/40 backdrop-blur-sm border border-border-color/30 rounded-3xl p-8 relative hover:shadow-[0_20px_40px_rgba(212,163,115,0.08)] transition-all duration-500 group hover:-translate-y-1">
              
              <div className="absolute top-6 right-6 px-3 py-1 border border-gold/40 text-gold text-[10px] font-bold tracking-widest uppercase rounded-full bg-card-bg/70 shadow-sm">
                2025
              </div>

              <div className="mb-6 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform duration-500 shadow-inner">
                <Award size={22} />
              </div>

              <h4 className="text-xl font-bold font-serif text-slate-800 mb-2 leading-tight pr-14 group-hover:text-gold transition-colors">
                FinAgent Hackathon – Certificate of Participation
              </h4>
              <p className="text-accent font-medium text-[11px] mb-5 uppercase tracking-widest">
                IIT Bombay & Unstop
              </p>
              
              <p className="text-slate-600 font-light text-sm leading-relaxed mb-8">
                Participated in the FinAgent Hackathon organized by IIT Bombay, contributing to innovative fintech problem-solving and strengthening my analytical, teamwork, and full stack development skills through real-world challenges.
              </p>

              <button 
                onClick={() => setSelectedCert({
                  url: "/finagent_cer.jpg",
                  title: "FinAgent Hackathon – Certificate of Participation"
                })}
                className="inline-flex items-center gap-2 text-gold font-bold text-xs tracking-widest uppercase border-b border-gold/30 pb-1 hover:border-gold transition-colors focus:outline-none"
              >
                <Award size={16} className="-mt-0.5" /> View Certificate
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Certificate Modal Overlay */}
      <CertificateModal 
        isOpen={!!selectedCert} 
        onClose={() => setSelectedCert(null)} 
        certificate={selectedCert} 
      />
    </section>
  );
};

export default Experience;
