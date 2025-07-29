import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FikavoLogo from '../assets/fikavo logo final/fikavo_logo.png';
import Button from './ui/Button';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Services', 'projects', 'Process', 'Contact'];

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-0' 
          : 'bg-transparent py-2'
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
            <img src={FikavoLogo} alt="" className='w-20' />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="relative text-brand-dark px-3 py-2 text-sm font-medium font-poppins group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: [0.25, 1, 0.5, 1]
                  }}
                >
                  {link}
                  <motion.span 
                    className="absolute left-0 bottom-0 h-0.5 bg-brand-violet origin-bottom-right transform scale-x-0 group-hover:origin-bottom-left group-hover:scale-x-100 transition-transform duration-300 ease-out"
                    layoutId={`nav-underline-${index}`}
                  />
                </motion.a>
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
            <Button 
              variant="primary" 
              className="shadow-lg shadow-brand-violet/20 hover:shadow-brand-violet/30 transition-shadow"
            >
              Get a Quote
            </Button>
          </motion.div>

          {/* Mobile menu button */}
          <motion.div 
            className="md:hidden"
            whileTap={{ scale: 0.9 }}
          >
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brand-dark hover:text-brand-violet p-2 rounded-lg bg-white/30 backdrop-blur-sm border border-white/10"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X size={24} className="text-brand-violet" />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu with AnimatePresence */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-gray-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1, 
              height: 'auto',
              transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] }
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
              transition: { duration: 0.2, ease: [0.25, 1, 0.5, 1] }
            }}
          >
            <div className="px-2 pt-2 pb-5 space-y-1">
              {navLinks.map((link) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block px-4 py-3 text-brand-dark hover:bg-brand-violet/5 rounded-lg transition-colors font-poppins"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ 
                    x: 0, 
                    opacity: 1,
                    transition: { duration: 0.3 }
                  }}
                >
                  {link}
                </motion.a>
              ))}
              <div className="px-4 py-3">
                <Button 
                  variant="primary"
                  
                  className="shadow-lg shadow-brand-violet/20"
                >
                  Get a Quote
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;