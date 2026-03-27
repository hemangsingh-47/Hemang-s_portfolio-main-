import React, { useState, useEffect, useRef } from 'react';
import { Home, User, Briefcase, Mail } from 'lucide-react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '/about', icon: <User size={20} /> },
    { name: 'Skills', href: '/skills', icon: <Briefcase size={20} /> },
    { name: 'Projects', href: '/projects', icon: <Briefcase size={20} /> },
    { name: 'Home', href: '/', icon: <Home size={20} /> },
    { name: 'Contact', href: '/contact', icon: <Mail size={20} /> },
  ];

  // Professional stagger hover effect
  const handleMouseEnter = (e) => {
    const letters = e.currentTarget.querySelectorAll('.nav-letter');
    gsap.killTweensOf(letters);
    gsap.to(letters, {
      y: -5,
      opacity: 0.7,
      duration: 0.2,
      stagger: 0.02,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to(letters, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.01,
          ease: 'elastic.out(1, 0.5)',
        });
      }
    });
  };

  return (
    <>
      {/* Desktop Header */}
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 hidden md:block ${scrolled ? 'glass-nav py-3 shadow-sm' : 'bg-transparent py-5'}`}>
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 flex justify-between items-center">
          <button onClick={() => handleNavClick('/')} className="relative z-10 block transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none">
            <Logo />
          </button>
          
          <nav className="flex items-center gap-8 relative z-10">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => handleNavClick(link.href)}
                className="font-medium text-sm text-text-secondary hover:text-gold transition-colors relative group focus:outline-none cursor-pointer"
                onMouseEnter={handleMouseEnter}
              >
                <span className="flex overflow-hidden">
                  {link.name.split('').map((char, i) => (
                    <span key={i} className="nav-letter inline-block origin-center">{char}</span>
                  ))}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gold transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <div className="pl-4 border-l border-sage/20">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Top Bar (Logo & Theme Toggle) */}
      <div className={`md:hidden fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'glass-nav py-4' : 'bg-transparent py-6'}`}>
        <div className="px-6 flex justify-between items-center">
          <button onClick={() => handleNavClick('/')} className="relative z-10 block transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none">
            <Logo className="h-7" />
          </button>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-[100] glass-nav rounded-full px-6 py-3 shadow-lg border border-sage/20 flex justify-between items-center">
        <button onClick={() => handleNavClick('/')} className="text-slate-500 hover:text-gold transition-colors p-2 focus:outline-none"><Home size={22} /></button>
        <button onClick={() => handleNavClick('/about')} className="text-slate-500 hover:text-gold transition-colors p-2 focus:outline-none"><User size={22} /></button>
        <button onClick={() => handleNavClick('/projects')} className="text-slate-500 hover:text-gold transition-colors p-2 focus:outline-none"><Briefcase size={22} /></button>
        <button onClick={() => handleNavClick('/contact')} className="text-slate-500 hover:text-gold transition-colors p-2 focus:outline-none"><Mail size={22} /></button>
      </div>
    </>
  );
};

export default Navbar;
