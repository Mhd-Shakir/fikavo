import React from 'react';
import { motion } from 'framer-motion';

const VoLoop: React.FC<{ className?: string; animate?: boolean }> = ({ 
  className = "w-32 h-32", 
  animate = false 
}) => {
  return (
    <motion.svg 
      viewBox="0 0 100 100" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      animate={animate ? { rotate: 360 } : {}}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <path
        d="M20 30 Q20 15 35 15 Q50 15 50 30 L50 70 Q50 85 35 85 Q20 85 20 70 Z"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        opacity="0.3"
      />
      <circle
        cx="75"
        cy="50"
        r="15"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        opacity="0.3"
      />
    </motion.svg>
  );
};

export default VoLoop;