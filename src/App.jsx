import React, { useEffect, useState } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Currently from './components/Currently';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [isPreloaderExiting, setIsPreloaderExiting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (winHeightPx > 0) {
        setScrollProgress((scrollPx / winHeightPx) * 100);
      } else {
        setScrollProgress(0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStartExit = () => {
    setIsPreloaderExiting(true);
  };

  const handlePreloaderComplete = () => {
    setIsPreloaderDone(true);
  };

  const shouldReveal = isPreloaderDone || isPreloaderExiting;

  return (
    <ThemeProvider>
      <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothTouch: false }}>
        {!isPreloaderDone && (
          <Preloader
            onStartExit={handleStartExit}
            onComplete={handlePreloaderComplete}
          />
        )}

        {/* Moved outside main-wrapper to prevent CSS transform containing block bug */}
        <CustomCursor />

        <div
          id="main-wrapper"
          className={`relative w-full min-h-screen overflow-x-hidden pt-20 bg-cream transition-opacity duration-[800ms] ease-out ${shouldReveal ? 'opacity-100' : 'opacity-0 pointer-events-none h-screen overflow-hidden'}`}
        >

          {/* Grain overlay */}
          <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png")', backgroundSize: '200px' }}></div>

          {/* Right Scroll Progress Line */}
          <div className="fixed right-0 top-0 w-1 h-screen bg-sage/20 z-50 hidden md:block">
            <div className="w-full bg-gold transition-all duration-100 origin-top" style={{ height: `${scrollProgress}%` }}></div>
          </div>

          {/* Content wrapper */}
          <div className="relative z-10 w-full flex flex-col min-h-screen">
            <Navbar />
            <main className="w-full flex-grow">
              <Routes>
                <Route path="/" element={
                  <>
                    <Hero />
                    <About />
                    <Currently />
                    <Skills />
                    <Projects />
                    <Experience />
                    <Contact />
                  </>
                } />
                <Route path="/about" element={
                  <div className="pt-20">
                    <About />
                    <Currently />
                  </div>
                } />
                <Route path="/skills" element={
                  <div className="pt-20">
                    <Skills />
                  </div>
                } />
                <Route path="/projects" element={
                  <div className="pt-20 bg-bg-primary">
                    <Projects />
                    <Experience />
                  </div>
                } />
                <Route path="/contact" element={
                  <div className="pt-20 bg-bg-primary">
                    <Contact />
                  </div>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </ReactLenis>
    </ThemeProvider>
  )
}

export default App;
