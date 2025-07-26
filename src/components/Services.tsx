import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Zap, Globe, Smartphone, BarChart3, Shield, ArrowRight } from 'lucide-react';
import Card from './ui/Card'; // Assuming a flexible Card component exists
import SectionHeader from './ui/SectionHeader';

// --- Color Theme System ---
// Simplified for a uniform design. Each theme has consistent properties.
const colorThemes = {
  purple: {
    bg: 'bg-purple-100 group-hover:bg-purple-600',
    text: 'text-purple-600',
    textHover: 'group-hover:text-white',
    border: 'hover:border-purple-300',
  },
  yellow: {
    bg: 'bg-yellow-100 group-hover:bg-yellow-500',
    text: 'text-yellow-600',
    textHover: 'group-hover:text-white',
    border: 'hover:border-yellow-300',
  },
  blue: {
    bg: 'bg-blue-100 group-hover:bg-blue-600',
    text: 'text-blue-600',
    textHover: 'group-hover:text-white',
    border: 'hover:border-blue-300',
  },
  teal: {
    bg: 'bg-teal-100 group-hover:bg-teal-600',
    text: 'text-teal-600',
    textHover: 'group-hover:text-white',
    border: 'hover:border-teal-300',
  },
  orange: {
    bg: 'bg-orange-100 group-hover:bg-orange-500',
    text: 'text-orange-600',
    textHover: 'group-hover:text-white',
    border: 'hover:border-orange-300',
  },
  pink: {
    bg: 'bg-pink-100 group-hover:bg-pink-600',
    text: 'text-pink-600',
    textHover: 'group-hover:text-white',
    border: 'hover:border-pink-300',
  },
};

const Services: React.FC = () => {
  // Simplified data structure for a uniform grid
  const services = [
    {
      icon: <Rocket />,
      title: 'Startup Launchpad',
      description: 'Transform your idea into a market-ready product with our comprehensive acceleration program.',
      theme: colorThemes.purple,
    },
    {
      icon: <Zap />,
      title: 'Digital Transformation',
      description: 'Modernize your business processes and systems for scalability and efficiency in the digital age.',
      theme: colorThemes.yellow,
    },
    {
      icon: <Globe />,
      title: 'Web Development',
      description: 'Custom, high-performance web applications built with cutting-edge, scalable technologies.',
      theme: colorThemes.blue,
    },
    {
      icon: <Smartphone />,
      title: 'Mobile Solutions',
      description: 'Engaging native and cross-platform mobile apps that deliver exceptional user experiences.',
      theme: colorThemes.teal,
    },
    {
      icon: <BarChart3 />,
      title: 'Growth & Analytics',
      description: 'Leverage data-driven insights to optimize performance, user acquisition, and retention.',
      theme: colorThemes.orange,
    },
    {
      icon: <Shield />,
      title: 'Security & Compliance',
      description: 'Enterprise-grade security solutions to protect your digital assets and ensure compliance.',
      theme: colorThemes.pink,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <section id="services" className="py-20 lg:py-32 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#dbeafe_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)]"></div>
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] opacity-10">
          <div className="w-full h-full bg-gradient-radial from-brand-violet to-transparent blur-3xl rounded-full"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          title="Our Full Suite of Services"
          subtitle="From initial concept to final launch, we provide the expertise to make your vision a reality."
        />

        {/* Uniform Grid Layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              className="flex" // Use flex to make child fill height
              variants={itemVariants}
            >
              <Card
                className={`w-full h-full flex flex-col group transition-all duration-300 bg-white/60 backdrop-blur-md border border-gray-200/50 ${service.theme.border} hover:shadow-xl hover:shadow-gray-300/20`}
              >
                <div className="p-8 flex flex-col h-full">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`inline-block p-3 rounded-lg transition-all duration-300 ${service.theme.bg}`}>
                      {React.cloneElement(service.icon, { 
                        className: `w-8 h-8 transition-all duration-300 group-hover:scale-110 ${service.theme.text} ${service.theme.textHover}`
                      })}
                    </div>
                  </div>

                  {/* Spacer to ensure content below it is aligned across cards */}
                  <div className="flex-grow" />

                  {/* Text Content */}
                  <div>
                    <h3 className="text-2xl font-bold font-poppins text-brand-dark mb-3">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 font-poppins leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <a href="#contact" className={`inline-flex items-center gap-2 font-semibold font-poppins tracking-wide group-hover:gap-3 transition-all duration-300 ${service.theme.text}`}>
                      Learn More
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;