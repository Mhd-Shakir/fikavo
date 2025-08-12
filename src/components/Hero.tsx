import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles, Rocket, TrendingUp, Zap, ArrowRight, Play } from 'lucide-react';
import Services from './Services';
import Process from './Process';
import Projects from './Projects'
import Contact from './Contact';

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);
  
  const springConfig = { stiffness: 150, damping: 15, mass: 0.5 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      mouseX.set(clientX / window.innerWidth - 0.5);
      mouseY.set(clientY / window.innerHeight - 0.5);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/50 relative overflow-hidden pt-20">
      {/* Enhanced Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-blue-400/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-400/30 to-cyan-400/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating Elements */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}

        {/* Interactive Mouse Follower */}
        <motion.div
          className="absolute w-64 h-64 bg-gradient-radial from-purple-200/30 to-transparent rounded-full pointer-events-none blur-xl"
          style={{
            x: useTransform(mouseX, [-0.5, 0.5], [-50, 50]),
            y: useTransform(mouseY, [-0.5, 0.5], [-50, 50]),
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
          }}
        />
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20"
        style={{ y: y1, opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
          {/* Enhanced Left Column */}
          <motion.div
            className="space-y-8 z-10"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {/* Animated Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full border border-purple-200/50 shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
              </motion.div>
              <span className="text-sm font-semibold text-purple-700">Digital Excellence Since 2018</span>
            </motion.div>

            {/* Enhanced Main Headline */}
            <motion.div variants={itemVariants}>
              <motion.h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="block text-gray-900">From</span>
                <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Startup
                </span>
                <span className="block text-gray-900">to</span>
                <span className="relative inline-block text-gray-900">
                  Scale-up
                  <motion.div
                    className="absolute -bottom-2 left-0 w-full h-3 bg-gradient-to-r from-yellow-400 to-orange-400 -skew-x-12 opacity-80"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </span>
              </motion.h1>
            </motion.div>

            {/* Enhanced Subtitle */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <motion.h2 
                className="text-2xl md:text-3xl font-semibold text-gray-800 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                <motion.span
                  className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  We Make It Happen.
                </motion.span>
                <motion.div
                  className="absolute -right-8 top-0"
                  variants={floatingVariants}
                  animate="animate"
                >
                  <Zap className="w-6 h-6 text-yellow-500" />
                </motion.div>
              </motion.h2>
              
              <motion.p 
                className="text-xl text-gray-600 max-w-2xl leading-relaxed"
                variants={itemVariants}
              >
                Build Bold. Go Digital. Transform your vision into market-leading digital solutions 
                that drive growth and innovation with cutting-edge technology.
              </motion.p>
            </motion.div>

            {/* Enhanced Action Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <motion.button
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl overflow-hidden shadow-xl"
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Journey
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Rocket className="w-5 h-5" />
                  </motion.div>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              
              <motion.button
                className="group flex items-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-2xl border border-gray-200 hover:border-purple-300 transition-all duration-300 shadow-lg"
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  backgroundColor: "rgba(255, 255, 255, 0.95)" 
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-10 h-10 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Play className="w-4 h-4 text-purple-600 group-hover:text-white ml-0.5" />
                </motion.div>
                <span>Watch Our Story</span>
              </motion.button>
            </motion.div>

            {/* Enhanced Stats Section */}
            <motion.div
              className="grid grid-cols-3 gap-6 pt-12 border-t border-gray-200"
              variants={itemVariants}
            >
              {[
                { number: '150+', label: 'Projects Delivered', icon: <TrendingUp className="w-6 h-6" /> },
                { number: '50+', label: 'Happy Clients', icon: <Sparkles className="w-6 h-6" /> },
                { number: '99%', label: 'Success Rate', icon: <Rocket className="w-6 h-6" /> }
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center p-4 rounded-2xl hover:bg-white/60 hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-gray-200"
                  whileHover={{ y: -5, scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5 + index * 0.1 }}
                >
                  <div className="flex justify-center mb-2 text-purple-600">
                    {stat.icon}
                  </div>
                  <motion.div 
                    className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-sm text-gray-600 tracking-wide mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Right Column - Visual */}
          <motion.div
            className="relative z-10"
            style={{ y: y2 }}
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="relative">
              {/* Main Image Container */}
              <motion.div 
                className="relative rounded-3xl overflow-hidden shadow-2xl group"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Modern workspace"
                  className="w-full h-[500px] md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-blue-900/20"></div>
                
                {/* Interactive Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-blue-600/0 opacity-0 group-hover:from-purple-600/10 group-hover:to-blue-600/10 group-hover:opacity-100 transition-all duration-500"
                />
              </motion.div>
              
              {/* Floating Elements */}
              <motion.div 
                className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl shadow-2xl flex items-center justify-center"
                variants={floatingVariants}
                animate="animate"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <Zap className="w-8 h-8 text-white" />
              </motion.div>
              
              {/* Enhanced Floating Cards */}
              <motion.div
                className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-gray-200/50"
                initial={{ y: 50, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.8, type: "spring" }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-xl flex items-center justify-center"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <TrendingUp className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-gray-900">Digital Growth</h3>
                    <p className="text-sm text-gray-600">+350% Conversion Rate</p>
                  </div>
                </div>
                
                {/* Animated Progress Bar */}
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 2, delay: 2 }}
                  />
                </div>
              </motion.div>
              
              {/* Additional Floating Element */}
              <motion.div
                className="absolute -top-12 -left-12 w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-20 blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Enhanced Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center cursor-pointer hover:border-purple-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
    <Services />
    <Process />
    <Projects />
    <Contact />
    </>
  );
};

export default Hero;