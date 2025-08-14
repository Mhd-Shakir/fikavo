import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github, Instagram } from 'lucide-react';
import logo from '../assets/fikavo logo final/fikavo_logo.png';

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

type ContactItem = {
  icon: React.ReactNode;
  text: string;
  href?: string;
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections: FooterSection[] = [
    {
      title: 'Services',
      links: [
        { label: 'Startup Launchpad', href: '/services' },
        { label: 'Digital Transformation', href: '/services' },
        { label: 'Web Development', href: '/services' },
        { label: 'Branding', href: '/services' },
        { label: 'Digital Marketing', href: '/services' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Our Process', href: '/process' },
        { label: 'Our Projects', href: '/projects' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Free Consultation', href: '/contact' },
        { label: 'Project Planner', href: '/process' },
        { label: 'Tech Stack Guide', href: '/tech-stack-guide' },
        { label: 'FAQ', href: '/faq' }
      ]
    }
  ];

  const socialLinks: FooterLink[] = [
    { label: 'X', href: '#', external: true },
    { label: 'LinkedIn', href: '#', external: true },
    { label: 'GitHub', href: '#', external: true },
    { label: 'Instagram', href: '#', external: true }
  ];

  const socialIcons: Record<string, React.ReactNode> = {
    Twitter: <Twitter className="w-5 h-5" />,
    LinkedIn: <Linkedin className="w-5 h-5" />,
    GitHub: <Github className="w-5 h-5" />,
    Instagram: <Instagram className="w-5 h-5" />
  };

  const contactInfo: ContactItem[] = [
    { icon: <Mail className="w-4 h-4" />, text: 'fikavocollective@gmail.com', href: 'mailto:fikavocollective@gmail.com' },
    { icon: <Phone className="w-4 h-4" />, text: '+91 81570 00282', href: 'tel:+918157000282' },
    { icon: <Phone className="w-4 h-4" />, text: '+91 97456 14587', href: 'tel:+919745614587' },
    { icon: <MapPin className="w-4 h-4" />, text: 'Calicut, Kerala' }
  ];

  return (
    <footer className="bg-indigo-50 text-gray-300 relative overflow-hidden">
      {/* Floating Gradient Shapes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl opacity-30"
          style={{
            background:
              i % 2 === 0
                ? 'radial-gradient(circle, rgba(139,92,246,0.15), transparent)'
                : 'radial-gradient(circle, rgba(59,130,246,0.15), transparent)',
            width: Math.random() * 200 + 120,
            height: Math.random() * 200 + 120,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, Math.random() * 20 - 10, 0],
            x: [0, Math.random() * 20 - 10, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-16 sm:py-20">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <img src={logo} alt="Fikavo logo" className="w-32" />
                <p className="text-gray-400 font-poppins leading-relaxed max-w-sm">
                  From Startup to Scale-up – We Make It Happen. Building bold digital solutions that drive innovation and growth.
                </p>
              </motion.div>

              <motion.div
                className="space-y-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {contactInfo.map((item, index) =>
                  item.href ? (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center gap-3 text-gray-400 hover:text-indigo-950 transition-colors duration-300 group"
                    >
                      {item.icon}
                      <span className="font-poppins group-hover:underline">{item.text}</span>
                    </a>
                  ) : (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-gray-400"
                    >
                      {item.icon}
                      <span className="font-poppins">{item.text}</span>
                    </div>
                  )
                )}
              </motion.div>
            </div>

            {/* Footer Links */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {footerSections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * sectionIndex }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-bold font-poppins text-lg bg-indigo-950 bg-clip-text text-transparent mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={`${section.title}-${link.label}`}>
                        <a
                          href={link.href}
                          target={link.external ? '_blank' : undefined}
                          rel={link.external ? 'noopener noreferrer' : undefined}
                          className="inline-block text-gray-400 font-poppins transition-all duration-300 relative
                                     after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-brand-yellow after:transition-all after:duration-300 hover:after:w-full hover:text-indigo-950"
                        >
                          {link.label}
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
        <motion.div
          className="py-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left text-gray-500 font-poppins text-sm">
              &copy; {currentYear} Fikavo Collective. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target={social.external ? '_blank' : undefined}
                  rel={social.external ? 'noopener noreferrer' : undefined}
                  className="p-2.5 text-gray-400 bg-white/5 rounded-lg hover:bg-brand-violet hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {socialIcons[social.label]}
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