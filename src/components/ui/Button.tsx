import React from 'react';
import { motion } from 'framer-motion';
import ArrowIcon from '../../assets/ArrowIcon';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'arrow';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  className = '' 
}) => {
  const baseClasses = "font-poppins font-semibold rounded-lg transition-all duration-300 flex items-center gap-2";
  
  const variants = {
    primary: "bg-brand-violet text-white hover:bg-opacity-90 hover:shadow-lg hover:shadow-brand-violet/25",
    secondary: "bg-white text-brand-dark border-2 border-brand-dark hover:bg-brand-dark hover:text-white",
    arrow: "text-brand-violet hover:text-brand-dark group"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {children}
      {variant === 'arrow' && (
        <motion.div
          className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        >
          <ArrowIcon className="w-4 h-4" />
        </motion.div>
      )}
    </motion.button>
  );
};

export default Button;