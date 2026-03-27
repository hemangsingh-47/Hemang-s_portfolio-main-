import React from 'react';

const Logo = ({ className = "h-8" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        className="h-full w-auto"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Stylized 'H' - Navy */}
        <path 
          d="M20 20V80M20 50H50V80" 
          stroke="var(--gold)" 
          strokeWidth="12" 
          strokeLinecap="round"
          className="opacity-20"
        />
        <path 
          d="M20 20V80M45 50H20" 
          stroke="#1e293b" 
          strokeWidth="12" 
          strokeLinecap="round"
        />
        
        {/* Stylized 'S' - Gold Intertwined */}
        <path 
          d="M45 50C45 25 80 25 80 40C80 55 45 45 45 60C45 75 80 75 80 50" 
          stroke="#1e293b" 
          strokeWidth="12" 
          strokeLinecap="round"
        />
        <path 
          d="M50 50C50 30 75 30 75 40C75 50 50 50 50 60C50 70 75 70 75 50" 
          stroke="#d4a373" 
          strokeWidth="6" 
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default Logo;
