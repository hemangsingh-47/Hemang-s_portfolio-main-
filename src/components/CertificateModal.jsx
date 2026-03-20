import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const CertificateModal = ({ isOpen, onClose, certificate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to allow DOM to update before applying opacity
      const timer = setTimeout(() => setIsVisible(true), 10);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      // Wait for exit transition to finish before unmounting
      const timer = setTimeout(() => setShouldRender(false), 300); 
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!shouldRender || !certificate) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 transition-all duration-300 ease-out bg-slate-900/60 backdrop-blur-md ${
        isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      data-cursor="CLOSE"
    >
      {/* Modal Container */}
      <div 
        className={`relative w-full max-w-5xl max-h-[90vh] bg-bg-primary rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-out ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
        }`}
        onClick={(e) => e.stopPropagation()}
        data-cursor-none="true"
      >
        {/* Close Button Header */}
        <div className="absolute top-0 right-0 z-10 p-4">
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-accent/20 hover:bg-accent/40 text-text-primary backdrop-blur-md transition-all duration-200 hover:rotate-90"
            aria-label="Close modal"
            data-cursor="CLOSE"
            data-magnetic
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Content Wrapper */}
        <div className="w-full h-full overflow-y-auto p-2 sm:p-4 bg-bg-secondary/50 flex items-center justify-center" style={{ maxHeight: 'calc(90vh)' }}>
          <img 
            src={certificate.url} 
            alt={certificate.title} 
            className="w-full h-auto object-contain max-h-[85vh] rounded-xl"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
