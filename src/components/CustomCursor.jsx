import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorTextRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let speed = 0.2;

    const animateCursor = () => {
      let dx = mouseX - cursorX;
      let dy = mouseY - cursorY;
      
      cursorX += dx * speed;
      cursorY += dy * speed;
      
      if (cursorRef.current) {
        gsap.set(cursorRef.current, {
          x: cursorX,
          y: cursorY,
          xPercent: -50,
          yPercent: -50
        });
      }
      requestAnimationFrame(animateCursor);
    };
    
    requestAnimationFrame(animateCursor);

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], [data-cursor]');
      
      if (target) {
        setIsHovering(true);
        const text = target.getAttribute('data-cursor') || (target.tagName === 'A' ? 'OPEN' : 'VIEW');
        if (target.getAttribute('data-cursor-none') === 'true') {
          setIsHovering(false); 
          setCursorText('');
          return;
        }
        setCursorText(text);

        // Magnetic Pull Logic
        if (target.hasAttribute('data-magnetic')) {
          const rect = target.getBoundingClientRect();
          const targetX = rect.left + rect.width / 2;
          const targetY = rect.top + rect.height / 2;
          
          const magnetTriggerDist = 100;
          const dist = Math.hypot(mouseX - targetX, mouseY - targetY);
          
          if (dist < magnetTriggerDist) {
            gsap.to(target, {
              x: (mouseX - targetX) * 0.4,
              y: (mouseY - targetY) * 0.4,
              duration: 0.5,
              ease: 'power3.out'
            });
          }
        }
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    const onMouseOut = (e) => {
      const target = e.target.closest('[data-magnetic]');
      if (target) {
        gsap.to(target, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <div
      id="custom-cursor"
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center transition-all duration-300 ease-out whitespace-nowrap overflow-hidden
      ${isHovering ? 'hovering text-text-primary text-[10px] font-bold tracking-widest' : ''}`}
    >
      <span className={`transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
        {cursorText}
      </span>
    </div>
  );
};

export default CustomCursor;
