import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  centered = false 
}) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <motion.h2
        className="text-4xl md:text-5xl font-bold font-poppins text-brand-dark mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="text-xl text-gray-600 font-poppins max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeader;