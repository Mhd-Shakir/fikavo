import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import FikavoLogo from "../assets/fikavo logo final/fikavo_logo.png";
import { Menu, Instagram, Facebook, X, Linkedin, MapPin, Phone, Mail, AlignRight } from "lucide-react";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVarietyPanelOpen, setIsVarietyPanelOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Close mobile menu when switching to desktop
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
      // Close variety panel on mobile
      if (window.innerWidth < 768 && isVarietyPanelOpen) {
        setIsVarietyPanelOpen(false);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      // Close mobile menu and variety panel when the user scrolls
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
      if (isVarietyPanelOpen) {
        setIsVarietyPanelOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileMenuOpen, isVarietyPanelOpen]);

  const navLinks = [
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Projects", path: "/projects" },
    { label: "Price", path: "/Price" }, 
    { label: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    { icon: Instagram, label: "Instagram", url: "https://www.instagram.com/fikavocollective/", color: "hover:text-pink-500" },
    { icon: Facebook, label: "Facebook", url: "https://facebook.com/fikavo", color: "hover:text-blue-600" },
    { icon: X, label: "X", url: "https://x.com/fikavocollectiv", color: "hover:text-blue-400" },
    { icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/fikavocollective/", color: "hover:text-blue-700" },
  ];

  // Animation variants for mobile menu diagonal slide effect
  const menuVariants = {
    closed: {
      clipPath: "polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)",
      opacity: 0,
      scale: 0.8,
      transformOrigin: "top left"
    },
    open: {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      opacity: 1,
      scale: 1,
      transformOrigin: "top left",
      transition: {
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1],
        clipPath: {
          duration: 0.8,
          ease: [0.25, 1, 0.5, 1]
        }
      }
    },
    exit: {
      clipPath: "polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)",
      opacity: 0,
      scale: 0.8,
      transformOrigin: "top left",
      transition: {
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1],
        clipPath: {
          duration: 0.8,
          ease: [0.25, 1, 0.5, 1]
        }
      }
    }
  };

  // Animation variants for variety panel (right slide)
  const varietyPanelVariants = {
    closed: {
      x: "100%",
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1],
      }
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  // Stagger animation for menu items
  const menuItemVariants = {
    closed: {
      x: -30,
      y: 20,
      opacity: 0,
      scale: 0.9
    },
    open: (index: number) => ({
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3 + index * 0.1,
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1]
      }
    }),
    exit: (index: number) => ({
      x: -30,
      y: 20,
      opacity: 0,
      scale: 0.9,
      transition: {
        delay: (navLinks.length - index) * 0.05,
        duration: 0.3,
        ease: [0.25, 1, 0.5, 1]
      }
    })
  };

  // Stagger animation for variety panel items
  const varietyItemVariants = {
    closed: {
      x: 30,
      opacity: 0,
      scale: 0.9
    },
    open: (index: number) => ({
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2 + index * 0.1,
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1]
      }
    })
  };

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-0"
          : "bg-transparent py-1 sm:py-2"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-18">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/">
              <img 
                src={FikavoLogo} 
                alt="Fikavo Logo" 
                className="w-16 sm:w-20 md:w-24 h-auto"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-4 lg:ml-10 flex items-center space-x-4 lg:space-x-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                >
                  <Link
                    to={link.path}
                    className="relative inline-flex items-center text-brand-dark px-2 lg:px-3 py-2 text-sm lg:text-base font-medium font-poppins group whitespace-nowrap"
                  >
                    {link.label}
                    <span
                      className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-0.5 w-full bg-brand-violet
                  origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100
                  transition-transform duration-300 ease-out"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Conditional Rendering for CTA / Variety Button */}
            {isScrolled ? (
              // CTA Button (displayed when scrolled)
              <motion.div className="hidden md:block" whileTap={{ scale: 0.9 }}>
                <Link to="/contact">
                  <button className="bg-brand-violet text-white px-3 lg:px-4 py-2 rounded-2xl font-poppins font-medium text-sm lg:text-base transition-transform duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap">
                    Get Started
                  </button>
                </Link>
              </motion.div>
            ) : (
              // Variety Toggle Button (displayed when not scrolled)
              <motion.div className="hidden md:block" whileTap={{ scale: 0.9 }}>
                <button
                  onClick={() => setIsVarietyPanelOpen(!isVarietyPanelOpen)}
                  className="text-brand-dark hover:text-brand-violet p-2 rounded-lg bg-white/30 backdrop-blur-sm border border-white/10 transition-colors"
                  aria-label="Toggle variety panel"
                >
                  <AnimatePresence mode="wait">
                    {isVarietyPanelOpen ? (
                      <motion.div
                        key="close-variety"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X size={20} className="text-brand-violet" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="grid"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <AlignRight size={20} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            )}

            {/* Mobile menu button */}
            <motion.div className="md:hidden" whileTap={{ scale: 0.9 }}>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-brand-dark hover:text-brand-violet p-2 rounded-lg bg-white/30 backdrop-blur-sm border border-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={20} className="text-brand-violet" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Diagonal Slide Animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 w-full bg-gradient-to-br from-white via-white to-brand-violet/5 backdrop-blur-xl border-t border-gray-100 shadow-2xl overflow-hidden max-h-screen"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="exit"
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-bl from-brand-violet/10 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-tr from-brand-violet/5 to-transparent rounded-tr-full" />
            
            <div className="relative px-3 sm:px-4 pt-4 sm:pt-6 pb-6 sm:pb-8 space-y-1 sm:space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  custom={index}
                  variants={menuItemVariants}
                  initial="closed"
                  animate="open"
                  exit="exit"
                  className="overflow-hidden"
                >
                  <Link
                    to={link.path}
                    className="block px-4 sm:px-6 py-3 sm:py-4 text-brand-dark hover:bg-brand-violet/10 hover:text-brand-violet rounded-xl transition-all duration-300 font-poppins font-medium text-base sm:text-lg group relative"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="relative z-10">{link.label}</span>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-brand-violet/5 to-brand-violet/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.02 }}
                    />
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile CTA Button */}
              <motion.div
                custom={navLinks.length}
                variants={menuItemVariants}
                initial="closed"
                animate="open"
                exit="exit"
                className="pt-2 sm:pt-4"
              >
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block mx-4 sm:mx-6"
                >
                  <button className="w-full bg-brand-violet text-white px-4 py-3 rounded-2xl font-poppins font-medium text-base transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
                    Get Started
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Variety Panel - Social Media & Location */}
      <AnimatePresence>
        {isVarietyPanelOpen && windowWidth >= 768 && (
          <motion.div
            className="fixed top-0 right-0 h-full w-72 sm:w-80 lg:w-96 bg-gradient-to-b from-white via-white to-brand-violet/5 backdrop-blur-xl shadow-2xl border-l border-gray-100 z-40"
            variants={varietyPanelVariants}
            initial="closed"
            animate="open"
            exit="exit"
          >
            <div className="h-full overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-bold text-brand-dark font-poppins">Connect With Us</h3>
                  <button
                    onClick={() => setIsVarietyPanelOpen(false)}
                    className="text-gray-400 hover:text-brand-violet transition-colors p-1"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
                {/* Social Media Section */}
                <motion.div
                  custom={0}
                  variants={varietyItemVariants}
                  initial="closed"
                  animate="open"
                >
                  <h4 className="text-base sm:text-lg font-semibold text-brand-dark mb-3 sm:mb-4 font-poppins">Follow Us</h4>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex flex-col items-center p-3 sm:p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-brand-violet/5 hover:to-brand-violet/10 transition-all duration-300 group ${social.color}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        custom={index}
                        variants={varietyItemVariants}
                      >
                        <social.icon size={24} className="mb-2 transition-colors duration-300" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-gray-900 text-center">
                          {social.label}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                {/* Location & Contact Section */}
                <motion.div
                  custom={1}
                  variants={varietyItemVariants}
                  initial="closed"
                  animate="open"
                >
                  <h4 className="text-base sm:text-lg font-semibold text-brand-dark mb-3 sm:mb-4 font-poppins">Visit Us</h4>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start space-x-3 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100">
                      <MapPin size={18} className="text-brand-violet mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">Our Office</p>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">
                          Calicut, Kerala
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100">
                      <Phone size={18} className="text-brand-violet mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">Call Us</p>
                        <div className="space-y-1">
                          <a href="tel:+919745614587" className="block text-xs sm:text-sm text-gray-600 hover:text-brand-violet transition-colors">
                            +91 97456 14587
                          </a>
                          <a href="tel:+918157000282" className="block text-xs sm:text-sm text-gray-600 hover:text-brand-violet transition-colors">
                            +91 81570 00282
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100">
                      <Mail size={18} className="text-brand-violet mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">Email Us</p>
                        <a 
                          href="mailto:fikavocollective@gmail.com" 
                          className="text-xs sm:text-sm text-gray-600 hover:text-brand-violet transition-colors break-all"
                        >
                          fikavocollective@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-16 sm:top-20 right-3 sm:right-4 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-brand-violet/10 to-transparent rounded-full opacity-50" />
            <div className="absolute bottom-16 sm:bottom-20 right-6 sm:right-8 w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-tl from-brand-violet/5 to-transparent rounded-full opacity-30" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for variety panel */}
      <AnimatePresence>
        {isVarietyPanelOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVarietyPanelOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;