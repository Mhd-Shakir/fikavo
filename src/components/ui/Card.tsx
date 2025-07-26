import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  colSpan?: string;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = true,
  colSpan = ''
}) => {
  return (
    <motion.div
      className={`bg-white rounded-xl shadow-lg p-6 ${colSpan} ${className}`}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;