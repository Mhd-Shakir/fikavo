import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Sparkles, Rocket, Zap } from "lucide-react";
import banner_img from "../assets/fikavo logo final/banner_img.jpg";
import Services from "./Services";
import Process from "./Process";
import Projects from "./Projects";
import Contact from "./Contact";
import Stats from "./ui/Stats";
import SurpriseBrandbookButton from "./ui/SurpriseBrandbookButton";

const useIsLg = () => {
  const [isLg, setIsLg] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsLg("matches" in e ? e.matches : (e as MediaQueryList).matches);

    setIsLg(mql.matches);
    // modern browsers
    mql.addEventListener?.("change", onChange as (e: MediaQueryListEvent) => void);
    // fallback
    // @ts-ignore
    mql.addListener?.(onChange);

    return () => {
      mql.removeEventListener?.("change", onChange as (e: MediaQueryListEvent) => void);
      // @ts-ignore
      mql.removeListener?.(onChange);
    };
  }, []);

  return isLg;
};

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isLg = useIsLg();

  // Scroll-based parallax (enabled only on lg and up)
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  // Smooth mouse parallax (optional)
  const springConfig = { stiffness: 150, damping: 15, mass: 0.5 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX / window.innerWidth - 0.5);
      mouseY.set(clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, 0, -5, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/50 relative overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-blue-400/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-400/30 to-cyan-400/30 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Hero Content */}
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20"
          style={{
            y: isLg ? y1 : 0,
            opacity: isLg ? opacity : 1,
          }}
        >
          {/* On small screens: items-start to prevent tight vertical centering */}
          <div className="grid lg:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-16 lg:gap-y-0 items-start lg:items-center min-h-[85vh] relative isolate">
            {/* Left Column */}
            <motion.div
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              {/* Badge */}
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
                <span className="text-sm font-semibold text-purple-700">
                  Digital Excellence Since 2025
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight"
                variants={itemVariants}
              >
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
                    transition={{
                      duration: 1.2,
                      delay: 1.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.div className="space-y-6" variants={itemVariants}>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                  <motion.span
                    className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    We Make It Happen.
                  </motion.span>
                  <motion.div
                    className="inline-block ml-2"
                    variants={floatingVariants}
                    animate="animate"
                  >
                    <Zap className="w-6 h-6 text-yellow-500" />
                  </motion.div>
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                  Build Bold. Go Digital. Transform your vision into
                  market-leading digital solutions that drive growth and
                  innovation with cutting-edge technology.
                </p>
              </motion.div>

              {/* Buttons */}
              <motion.div
                className="flex flex-wrap gap-4"
                variants={itemVariants}
              >
                <Link to="/contact" className="cta-button">
                  <motion.button
                    className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl overflow-hidden shadow-xl"
                    whileHover={{
                      scale: 1.05,
                      y: -3,
                      boxShadow:
                        "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
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
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            
            {/* Right Column */}
            <motion.div
              className="relative mt-2 lg:mt-0"
              style={{ y: isLg ? (y2 as unknown as number) : 0 }}
              initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="relative">
                <motion.div
                  className="relative rounded-3xl overflow-hidden shadow-2xl group"
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={banner_img}
                    alt="Modern workspace"
                    className="w-full h-[400px] md:h-[600px] object-fit transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-blue-900/20" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <SurpriseBrandbookButton />
      <Stats />
      <Services />
      <Process />
      <Projects />
      <Contact />
    </>
  );
};

export default Hero;