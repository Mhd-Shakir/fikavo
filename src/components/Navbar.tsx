import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import FikavoLogo from "../assets/fikavo logo final/fikavo_logo.png";
import Button from "./ui/Button";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Projects", path: "/projects" },
    { label: "Price", path: "/Price" }, 
    { label: "Contact", path: "/contact" },
  ];

  // Animation variants for the diagonal slide effect
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
      clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      opacity: 0,
      scale: 0.9,
      transformOrigin: "top right",
      transition: {
        duration: 0.5,
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
            <div className="ml-10 flex items-center space-x-8 ">
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

          {/* CTA Button */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/contact">
              <Button
                variant="primary"
                className="shadow-lg shadow-brand-violet/20 hover:shadow-brand-violet/30 transition-shadow"
              >
                Get a Quote
              </Button>
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <motion.div className="md:hidden" whileTap={{ scale: 0.9 }}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brand-dark hover:text-brand-violet p-2 rounded-lg bg-white/30 backdrop-blur-sm border border-white/10 relative z-50"
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
              
              <motion.div 
                className="pt-4 px-6"
                custom={navLinks.length}
                variants={menuItemVariants}
                initial="closed"
                animate="open"
              >
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant="primary"
                    className="w-full shadow-lg shadow-brand-violet/20 hover:shadow-brand-violet/40 transform hover:scale-105 transition-all duration-300"
                  >
                    Get a Quote
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;