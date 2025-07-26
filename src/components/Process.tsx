import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Search, Palette, Rocket } from 'lucide-react';
import SectionHeader from './ui/SectionHeader'; // Assuming this component exists

// Define the data structure for a step for type safety and clarity
interface StepData {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

const Process: React.FC = () => {
  // Data is kept separate from presentation for maintainability
  const steps: StepData[] = [
    {
      number: "01",
      icon: Search,
      title: "Discover & Strategize",
      description: "We dive deep into your business goals, target audience, and market landscape to create a solid foundation for success."
    },
    {
      number: "02",
      icon: Palette,
      title: "Design & Build",
      description: "Our expert team crafts beautiful, functional solutions that align with your brand and exceed user expectations."
    },
    {
      number: "03",
      icon: Rocket,
      title: "Launch & Grow",
      description: "We ensure a smooth launch and provide ongoing support to help your business scale and thrive in the digital landscape."
    }
  ];

  // Animation variants for the container and its children
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Each child will animate 0.3s after the previous one
        delayChildren: 0.2,
      }
    }
  };

  // Animation for each item in the list (steps and CTA)
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, type: "spring", stiffness: 100 }
    }
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Your Journey to Digital Excellence"
          subtitle="our process"
          centered
          className="mb-16"
        />

        {/* The container orchestrates the animation of its children */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-20 lg:space-y-24" // Vertical space between items
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 relative"
            >
              {/* Icon, Number, and the robustly positioned connecting line */}
              <div className="flex-shrink-0 relative">
                <div className="w-32 h-32 bg-gradient-to-br from-brand-violet/10 to-brand-dark/5 rounded-full flex items-center justify-center">
                  <step.icon size={40} className="text-brand-violet" />
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-brand-yellow rounded-full flex items-center justify-center shadow-md">
                  <span className="text-xs font-bold font-poppins text-brand-dark">
                    {step.number}
                  </span>
                </div>
                
                {/* IMPROVED Connecting Line: Positioned relative to the icon container, making it robust */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-full left-1/2 -translate-x-1/2 mt-4 h-16 w-0.5">
                     <motion.div
                        className="w-full h-full bg-gradient-to-b from-brand-violet/80 to-brand-violet/20 origin-top"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                     />
                  </div>
                )}
              </div>

              {/* Text Content */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-3xl md:text-4xl font-bold font-poppins text-brand-dark mb-4">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-600 font-poppins leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Final Call-to-Action block, animated as the last item in the sequence */}
          <motion.div variants={itemVariants} className="pt-8">
            <div className="bg-gradient-to-r from-brand-violet to-brand-violet/80 rounded-2xl p-8 md:p-12 text-white text-center shadow-2xl shadow-brand-violet/20">
              <h3 className="text-3xl lg:text-4xl font-poppins font-bold mb-4">
                Ready to Start Your Digital Journey?
              </h3>
              <p className="text-lg lg:text-xl mb-8 opacity-90 max-w-3xl mx-auto">
                Let's discuss how we can transform your business with our proven process.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-brand-violet px-8 py-4 rounded-xl font-poppins font-semibold transition-shadow inline-flex items-center gap-2"
              >
                Schedule Consultation
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Rocket className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Process;