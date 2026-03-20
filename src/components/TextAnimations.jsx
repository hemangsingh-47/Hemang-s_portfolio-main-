import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SplitText = ({ text, className = "", delay = 0, scroll = false }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const words = containerRef.current.querySelectorAll('.word');
    
    if (scroll) {
      gsap.fromTo(words, 
        { y: '100%' },
        { 
          y: '0%', 
          duration: 0.8, 
          stagger: 0.05, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          }
        }
      );
    } else {
      gsap.fromTo(words, 
        { y: '100%' },
        { y: '0%', duration: 1, stagger: 0.05, ease: 'power4.out', delay }
      );
    }
  }, [delay, scroll, text]);

  return (
    <span ref={containerRef} className={className} style={{ display: 'inline-block' }}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-1 -mb-1 mr-[0.25em]">
          <span className="word inline-block">{word}</span>
        </span>
      ))}
    </span>
  );
};

export const AnimatedUnderline = ({ children, delay = 0 }) => {
  const lineRef = useRef(null);
  
  useEffect(() => {
    if (!lineRef.current) return;
    
    gsap.fromTo(lineRef.current, 
      { width: 0, opacity: 0 },
      { 
        width: '100%', 
        opacity: 1, 
        duration: 1, 
        ease: 'power3.inOut',
        delay,
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 85%',
        }
      }
    );
  }, [delay]);

  return (
    <span className="relative inline-block">
      {children}
      <span 
        ref={lineRef} 
        className="absolute -bottom-1 left-0 h-[3px] bg-gold rounded-full"
      ></span>
    </span>
  );
};
