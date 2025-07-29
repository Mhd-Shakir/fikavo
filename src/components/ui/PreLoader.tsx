import React from 'react';
import { motion } from 'framer-motion';
import FikavoLogo from '../../assets/fikavo logo final/fikavo-logo-icon.png'; // Make sure to use the correct path to your logo

const PreLoader: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* 
        This relative container holds both the spinner and the logo.
        It's slightly larger than the logo to give the spinner space.
      */}
      <div className="relative flex h-24 w-24 items-center justify-center">
        
        {/* 1. The Animated Spinner SVG */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{
            loop: Infinity,
            ease: 'linear',
            duration: 1,
          }}
        >
          {/* 
            This SVG creates a circular track and a spinning arc.
            It's responsive and scales perfectly.
          */}
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* The faint background track */}
            <circle
              className="stroke-current text-gray-200"
              cx="50"
              cy="50"
              r="40"
              strokeWidth="8"
              fill="transparent"
            />
            {/* The active, spinning purple arc */}
            <circle
              className="stroke-current text-purple-600"
              cx="50"
              cy="50"
              r="40"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray="175 251" // Creates a 3/4 circle arc
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* 2. Your Logo Image */}
        {/* It sits in the center, on top of the spinner */}
        <div className='flex items-center justify-center'>
          <img src={FikavoLogo} alt="Fikavo Logo" className=" w-14" />
        </div>

      </div>
    </motion.div>
  );
};

export default PreLoader;