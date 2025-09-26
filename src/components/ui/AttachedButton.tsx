import React, { useState, useEffect, useRef } from 'react';
import { Facebook, X, Instagram, Youtube, Linkedin, } from 'lucide-react';

interface SocialMediaSidebarProps {
  socialLinks?: {
    facebook?: string;
    X?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
  };
}

const SocialMediaSidebar: React.FC<SocialMediaSidebarProps> = ({ 
  socialLinks = {
    facebook: 'https://facebook.com',
    X: 'https://x.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    linkedin: 'https://linkedin.com',
  }
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside, pressing ESC, or scrolling
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      // Mouse and keyboard events
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      
      // Scroll events - all types
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('wheel', handleWheel, { passive: true });
      document.addEventListener('touchmove', handleTouchMove, { passive: true });
      
    }

    return () => {
      // Cleanup all event listeners
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchmove', handleTouchMove);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const socialIcons = [
    { icon: Facebook, link: socialLinks.facebook, color: 'hover:bg-blue-600', name: 'Facebook' },
    { icon: X, link: socialLinks.x, color: 'hover:bg-sky-500', name: 'X' },
    { icon: Instagram, link: socialLinks.instagram, color: 'hover:bg-pink-600', name: 'Instagram' },
    { icon: Youtube, link: socialLinks.youtube, color: 'hover:bg-red-600', name: 'YouTube' },
    { icon: Linkedin, link: socialLinks.linkedin, color: 'hover:bg-blue-700', name: 'LinkedIn' },
  ];

  return (
    <>
      {/* Always Visible Attached Button */}
      <div className="social-sidebar-container" ref={containerRef}>
        <div className="relative">
          {/* Main curved button - Always attached to left */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="social-main-button group"
            aria-label="Toggle social media menu"
          >
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-r-full"></div>
            
            {/* Button icon */}
            <div className={`relative z-10 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </div>
            
            {/* Subtle pulse animation */}
            <div className="absolute inset-0 rounded-r-full bg-gradient-to-r from-purple-600 to-blue-600 animate-pulse opacity-20"></div>
          </button>

          {/* Social media icons panel */}
          <div className={`social-icons-panel ${isOpen ? 'social-icons-open' : 'social-icons-closed'}`}>
            <div className="bg-white/95 backdrop-blur-sm rounded-r-2xl shadow-2xl p-4 border border-gray-200/50">
              <div className="flex flex-col space-y-3">
                {socialIcons.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`social-icon-link ${social.color}`}
                      style={{
                        animationDelay: `${index * 80}ms`
                      }}
                      aria-label={`Visit our ${social.name} page`}
                      title={social.name}
                    >
                      <IconComponent className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors duration-300" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile backdrop */}
        {isOpen && (
          <div 
            // The `backdrop-blur-sm` class was removed from here
            className="fixed inset-0 bg-black/30 z-[9998]"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
            style={{ 
              animation: 'fadeIn 0.3s ease-out',
              cursor: 'pointer'
            }}
          />
        )}
      </div>

      {/* Critical CSS Styles */}
      <style jsx global>{`
        /* ALWAYS VISIBLE ATTACHED BUTTON STYLES */
        .social-sidebar-container {
          position: fixed !important;
          left: 0 !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          z-index: 999999 !important;
          pointer-events: auto !important;
          isolation: isolate !important;
        }
        
        .social-main-button {
          position: relative !important;
          background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%) !important;
          color: white !important;
          width: 50px !important;
          height: 60px !important;
          border-radius: 0 40px 40px 0 !important;
          border: none !important;
          box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.15) !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          overflow: hidden !important;
          margin-left: -2px !important;
        }
        
        .social-main-button:hover {
          transform: scale(1.05) !important;
          box-shadow: 4px 8px 30px rgba(0, 0, 0, 0.25) !importnant;
          background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%) !important;
        }
        
        .social-main-button:active {
          /* REMOVED: The transform: scale(0.98) was removed from here */
        }
        
        .social-icons-panel {
          position: absolute !important;
          left: 48px !important;
          top: 0 !important;
          transform-origin: left center !important;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
          pointer-events: none !important;
        }
        
        .social-icons-open {
          transform: scale(1) translateX(0) !important;
          opacity: 1 !important;
          pointer-events: auto !important;
          animation: slideInPanel 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
        }
        
        .social-icons-closed {
          transform: scale(0) translateX(-20px) !important;
          opacity: 0 !important;
          animation: slideOutPanel 0.3s ease-in !important;
        }
        
        .social-icon-link {
          width: 44px !important;
          height: 44px !important;
          border-radius: 50% !important;
          background: #f3f4f6 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          text-decoration: none !important;
          animation: slideInUp 0.5s ease-out both !important;
          border: 2px solid transparent !important;
          group: hover !important;
        }
        
        .social-icon-link:hover {
          transform: translateY(-3px) scale(1.1) !important;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
          border-color: currentColor !important;
        }
        
        .social-icon-link:focus {
          outline: none !important;
          ring: 2px !important;
          ring-color: #7c3aed !important;
          ring-offset: 2px !important;
        }
        
        /* ENHANCED ANIMATIONS */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideInPanel {
          from {
            opacity: 0;
            transform: scale(0.8) translateX(-30px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateX(0);
          }
        }
        
        @keyframes slideOutPanel {
          from {
            opacity: 1;
            transform: scale(1) translateX(0);
          }
          to {
            opacity: 0;
            transform: scale(0.8) translateX(-30px);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        /* RESPONSIVE ADJUSTMENTS */
        @media (max-width: 768px) {
          .social-sidebar-container {
            left: 0 !important;
          }
          
          .social-main-button {
            width: 50px !important;
            height: 70px !important;
            margin-left: -1px !important;
          }
          
          .social-icons-panel {
            left: 49px !important;
          }
          
          .social-icon-link {
            width: 40px !important;
            height: 40px !important;
          }
        }
        
        @media (max-width: 480px) {
          .social-main-button {
            width: 45px !important;
            height: 65px !important;
          }
          
          .social-icons-panel {
            left: 44px !important;
          }
          
          .social-icon-link {
            width: 38px !important;
            height: 38px !important;
          }
        }
        
        /* ENSURE VISIBILITY IN ALL SCENARIOS */
        @media (min-height: 100vh) {
          .social-sidebar-container {
            top: 50% !important;
          }
        }
        
        @media (max-height: 500px) {
          .social-sidebar-container {
            top: 45% !important;
          }
        }
        
        /* PREVENT CONFLICTS AND ENSURE SMOOTH SCROLLING */
        body {
          overflow-x: hidden !important;
        }
        
        * {
          box-sizing: border-box;
        }
        
        /* FORCE VISIBILITY */
        .social-sidebar-container,
        .social-sidebar-container * {
          visibility: visible !important;
          display: block !important;
        }
        
        .social-main-button {
          display: flex !important;
        }
        
        .social-icon-link {
          display: flex !important;
        }
      `}</style>
    </>
  );
};

export default SocialMediaSidebar;