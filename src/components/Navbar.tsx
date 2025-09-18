import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import FikavoLogo from "../assets/fikavo logo final/fikavo_logo.png";
import { Menu, Instagram, Facebook, X, Linkedin, MapPin, Phone, Mail, AlignRight } from "lucide-react";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVarietyPanelOpen, setIsVarietyPanelOpen] = useState(false);

  useEffect(() => {
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
    return () => window.removeEventListener("scroll", handleScroll);
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
      transformOrigin: "bottom left"
    },
    open: {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      opacity: 1,
      scale: 1,
      transformOrigin: "bottom left",
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
      transformOrigin: "bottom left",
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
          : "bg-transparent py-2"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/">
              <img src={FikavoLogo} alt="Fikavo Logo" className="w-24" />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
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
                    className="relative inline-flex items-center text-brand-dark px-3 py-2 text-sm font-medium font-poppins group"
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
          <div className="flex items-center space-x-3">
            {/* Conditional Rendering for CTA / Variety Button */}
            {isScrolled ? (
              // CTA Button (displayed when not scrolled)
              <motion.div className="hidden md:block" whileTap={{ scale: 0.9 }}>
                <Link to="/contact">
                  <button className="bg-brand-violet text-white px-4 py-2 rounded-2xl font-poppins font-medium transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
                    Get Started
                  </button>
                </Link>
              </motion.div>
            ) : (
              // Variety Toggle Button (displayed when scrolled)
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
                        <X size={24} className="text-brand-violet" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="grid"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <AlignRight size={24} />
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
                className="text-brand-dark hover:text-brand-violet p-2 rounded-lg bg-white/30 backdrop-blur-sm border border-white/10"
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
                      <X size={24} className="text-brand-violet" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
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
            className="md:hidden absolute top-full left-0 w-full bg-gradient-to-br from-white via-white to-brand-violet/5 backdrop-blur-xl border-t border-gray-100 shadow-2xl overflow-hidden"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="exit"
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-violet/10 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-brand-violet/5 to-transparent rounded-tr-full" />
            
            <div className="relative px-4 pt-6 pb-8 space-y-2">
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
                    className="block px-6 py-4 text-brand-dark hover:bg-brand-violet/10 hover:text-brand-violet rounded-xl transition-all duration-300 font-poppins font-medium text-lg group relative"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Variety Panel - Social Media & Location */}
      <AnimatePresence>
        {isVarietyPanelOpen && (
          <motion.div
            className="fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-white via-white to-brand-violet/5 backdrop-blur-xl shadow-2xl border-l border-gray-100 z-40"
            variants={varietyPanelVariants}
            initial="closed"
            animate="open"
            exit="exit"
          >
            <div className="h-full overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-brand-dark font-poppins">Connect With Us</h3>
                  <button
                    onClick={() => setIsVarietyPanelOpen(false)}
                    className="text-gray-400 hover:text-brand-violet transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-8">
                {/* Social Media Section */}
                <motion.div
                  custom={0}
                  variants={varietyItemVariants}
                  initial="closed"
                  animate="open"
                >
                  <h4 className="text-lg font-semibold text-brand-dark mb-4 font-poppins">Follow Us</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-brand-violet/5 hover:to-brand-violet/10 transition-all duration-300 group ${social.color}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        custom={index}
                        variants={varietyItemVariants}
                      >
                        <social.icon size={28} className="mb-2 transition-colors duration-300" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
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
                  <h4 className="text-lg font-semibold text-brand-dark mb-4 font-poppins">Visit Us</h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100">
                      <MapPin size={20} className="text-brand-violet mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Our Office</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Calicut,Kerala
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100">
                      <Phone size={20} className="text-brand-violet flex-shrink-0" />
                      <div className="flex flex-col">
                        <p className="font-medium text-gray-900">Call Us</p>
                        <a href="tel:+919745614587" className="text-sm text-gray-600">+91 97456 14587</a>
                        <a href="tel:+918157000282" className="text-sm text-gray-600">+91 81570 00282</a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100">
                      <Mail size={20} className="text-brand-violet flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Email Us</p>
                        <a href="mailto:fikavocollective@gmial.com" className="text-sm text-gray-600">fikavocollective@gmial.com</a>
                      </div>
                    </div>
                  </div>
                </motion.div>

                
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 right-4 w-16 h-16 bg-gradient-to-br from-brand-violet/10 to-transparent rounded-full opacity-50" />
            <div className="absolute bottom-20 right-8 w-12 h-12 bg-gradient-to-tl from-brand-violet/5 to-transparent rounded-full opacity-30" />
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