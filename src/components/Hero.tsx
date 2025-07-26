import React from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import VoLoop from '../assets/VoLoop';

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden pt-20">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <motion.div 
          className="absolute top-20 right-10 w-64 h-64"
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          <VoLoop className="w-full h-full text-brand-violet" />
        </motion.div>
        <motion.div 
          className="absolute bottom-20 left-10 w-48 h-48"
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <VoLoop className="w-full h-full text-brand-dark" />
        </motion.div>
        
        {/* Added subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent via-white/10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Content */}
          <div className="space-y-8 z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-poppins text-brand-dark leading-tight">
                From <span className="text-brand-violet">Startup</span> to{' '}
                <span className="relative inline-block">
                  Scale-up
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-2 bg-brand-yellow z-0"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </span>
              </motion.h1>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.h2 
                className="text-2xl md:text-3xl font-semibold font-poppins text-brand-dark bg-gradient-to-r from-brand-violet/10 to-transparent px-4 py-2 rounded-r-full -ml-4 inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                We Make It Happen.
              </motion.h2>
              
              <p className="text-xl text-gray-600 font-poppins max-w-2xl leading-relaxed">
                Build Bold. Go Digital. Transform your vision into market-leading digital solutions 
                that drive growth and innovation.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                variant="primary" 
                size="lg"
                className="shadow-lg shadow-brand-violet/20 hover:shadow-brand-violet/40 transition-all"
              >
                Start Your Journey
              </Button>
              <Button 
                variant="arrow" 
                size="lg"
                className="group"
              >
                <span>View Our Work</span>
                <motion.span 
                  className="ml-2 inline-block group-hover:translate-x-1 transition-transform"
                  initial={{ x: 0 }}
                  animate={{ x: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  →
                </motion.span>
              </Button>
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 pt-12 border-t border-gray-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {[
                { number: '50+', label: 'Projects Delivered' },
                { number: '25+', label: 'Happy Clients' },
                { number: '98%', label: 'Success Rate' }
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-3xl font-bold font-poppins text-brand-violet">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-poppins tracking-wide mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative z-10">
              {/* Image with gradient overlay */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Modern workspace"
                  className="w-full h-[500px] md:h-[600px] object-cover transition-transform duration-500 hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              {/* Brand motif with animation */}
              <motion.div 
                className="absolute top-6 right-6"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 15, 0, -15, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <div className="w-4 h-4 bg-brand-yellow rounded-sm shadow-md"></div>
              </motion.div>
              
              {/* Enhanced Floating card */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100 backdrop-blur-sm"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-brand-yellow rounded-sm animate-pulse"></div>
                  <span className="font-poppins font-semibold text-brand-dark">
                    Digital Excellence
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2 font-poppins">
                  Delivered with precision
                </p>
                
                {/* Progress indicator */}
                <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-brand-violet h-1.5 rounded-full" 
                    style={{ width: "95%" }}
                  ></div>
                </div>
              </motion.div>
              
              {/* Second floating element */}
              <motion.div
                className="absolute -top-6 -right-6 bg-brand-violet text-white p-4 rounded-lg shadow-lg"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
              >
                <div className="font-poppins font-bold text-sm">
                  Since 2018
                </div>
                <div className="text-xs opacity-80">Trusted Partners</div>
              </motion.div>
            </div>

            {/* Animated background decoration */}
            <motion.div 
              className="absolute -top-10 -right-10 w-32 h-32 text-brand-violet opacity-20"
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <VoLoop className="w-full h-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Floating elements for depth */}
      <motion.div 
        className="absolute bottom-20 left-1/4 w-6 h-6 rounded-full bg-brand-yellow opacity-20 blur-md"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div 
        className="absolute top-1/3 right-1/4 w-8 h-8 rounded-full bg-brand-violet opacity-10 blur-lg"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
      />
    </section>
  );
};

export default Hero;