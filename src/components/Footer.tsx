import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github, Instagram, ArrowRight, CheckCircle } from 'lucide-react';
// import FikavoLogo from '../assets/fikavo logo final/fikavo logo.png';

// --- Placeholder for assets/FikavoLogo ---
// To make this component self-contained, I'm adding a simple SVG logo here.
// You can replace this with your actual component or image.
// const FikavoLogo: React.FC<{ className?: string }> = ({ className }) => (
//   <svg className={className} viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M10 0 L0 15 V40 H15 L25 25 V0 H10Z" fill="#FBBF24" />
//     <text x="35" y="28" fontFamily="Poppins, sans-serif" fontSize="28" fontWeight="bold" fill="white">
//       Fikavo
//     </text>
//   </svg>
// );
// --- End of Placeholder ---

type NewsletterStatus = 'idle' | 'submitting' | 'success';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [newsletterStatus, setNewsletterStatus] = useState<NewsletterStatus>('idle');
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setNewsletterStatus('submitting');
    await new Promise(res => setTimeout(res, 1500)); // Simulate API call
    setNewsletterStatus('success');
  };

  const footerSections = [
    { title: 'Services', links: ['Startup Launchpad', 'Digital Transformation', 'Web Development', 'Mobile Solutions', 'Growth Analytics'] },
    { title: 'phone', links: ['About Us', 'Our Process', 'Case Studies', 'Careers', 'Blog'] },
    { title: 'Resources', links: ['Free Consultation', 'Project Planner', 'Tech Stack Guide', 'ROI Calculator'] }
  ];

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
    { icon: <Github className="w-5 h-5" />, href: '#', label: 'GitHub' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' }
  ];
  
  const contactInfo = [
    { icon: <Mail className="w-4 h-4" />, text: 'hello@fikavo.com', href: 'mailto:hello@fikavo.com' },
    { icon: <Phone className="w-4 h-4" />, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: <MapPin className="w-4 h-4" />, text: 'San Francisco, CA', href: '#' }
  ];

  return (
    <footer className="bg-brand-dark text-gray-300 relative overflow-hidden">
      {/* Background Pattern - hidden on small screens */}
      <div className="absolute inset-0 opacity-5 hidden md:block">
        <div className="absolute -top-10 -right-10 w-64 h-64 border-4 border-brand-violet rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-yellow rounded-sm rotate-12"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-16 sm:py-20">
          {/* Newsletter Section - now featured */}
          <motion.div
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {newsletterStatus === 'success' ? (
                 <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-4"
                  >
                    <CheckCircle className="w-12 h-12 text-brand-yellow mb-4" />
                    <h3 className="text-xl font-bold font-poppins text-white">Thank you for subscribing!</h3>
                    <p className="text-gray-300 mt-1">Check your inbox for a confirmation email.</p>
                  </motion.div>
              ) : (
                <motion.div
                  key="form"
                  exit={{ opacity: 0 }}
                  className="grid md:grid-cols-2 gap-8 items-center"
                >
                  <div>
                    <h3 className="text-2xl font-bold font-poppins text-white mb-2">Join Our Newsletter</h3>
                    <p className="text-gray-300 font-poppins">Get the latest insights on digital transformation and startup growth, right in your inbox.</p>
                  </div>
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-yellow transition-all duration-300 font-poppins"
                    />
                    <motion.button
                      type="submit"
                      disabled={newsletterStatus === 'submitting'}
                      className="px-6 py-3 bg-brand-violet text-white font-semibold font-poppins rounded-lg hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
                      whileHover={{ scale: newsletterStatus === 'submitting' ? 1 : 1.05 }}
                      whileTap={{ scale: newsletterStatus === 'submitting' ? 1 : 0.95 }}
                    >
                      {newsletterStatus === 'submitting' ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ) : (
                        <>Subscribe <ArrowRight className="w-4 h-4" /></>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Main Footer Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }} viewport={{ once: true }}
              >
                <div className='text-4xl text-violet-600'>Fikavo collective</div>
                <p className="text-gray-300 font-poppins leading-relaxed max-w-sm">
                  From Startup to Scale-up – We Make It Happen. Building bold digital solutions that drive innovation and growth.
                </p>
              </motion.div>
              <motion.div className="space-y-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }} viewport={{ once: true }}>
                {contactInfo.map((item, index) => (
                  <a key={index} href={item.href} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 group">
                    {item.icon}
                    <span className="font-poppins group-hover:underline">{item.text}</span>
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Links Sections Wrapper - This is key for responsive layout */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {footerSections.map((section, sectionIndex) => (
                <motion.div key={sectionIndex} className="space-y-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 * sectionIndex }} viewport={{ once: true }}>
                  <h3 className="font-bold font-poppins text-lg text-white mb-4">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link}>
                        <a href="#" className="inline-block text-gray-400 hover:text-brand-yellow font-poppins transition-all duration-300 hover:translate-x-1">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div className="py-8 border-t border-white/10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
           <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left text-gray-500 font-poppins text-sm">
                &copy; {currentYear} Fikavo Collective. All rights reserved.
              </div>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <motion.a key={social.label} href={social.href} aria-label={social.label} className="p-2.5 text-gray-400 bg-white/5 rounded-lg hover:bg-brand-violet hover:text-white transition-all duration-300" whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }}>
                    {social.icon}
                  </motion.a>
                ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;