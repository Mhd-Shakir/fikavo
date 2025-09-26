import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search,
  Palette,
  Rocket,
  Users,
  Target,
  TrendingUp,
  Sparkles,
  CheckCircle,
  PenTool,
  Code,
  DraftingCompass,
  Layers,
} from "lucide-react";

interface StepData {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
  details: string[];
  color: string;
  gradient: string;
}

const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }

    // Check screen size for responsive adjustments
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [isInView, controls]);

  const steps: StepData[] = [
    {
      number: "01",
      icon: Search,
      title: "Discover & Strategize",
      description:
        "We dive deep into your business goals, target audience, and market landscape to create a solid foundation for success.",
      details: [
        "Comprehensive business analysis",
        "Market research & competitor study",
        "Target audience identification",
        "Strategic roadmap creation",
      ],
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      number: "02",
      icon: DraftingCompass,
      title: "Design & Prototype",
      description:
        "We craft intuitive user experiences and beautiful interfaces that align with your brand identity.",
      details: [
        "User journey mapping",
        "Wireframing & prototyping",
        "UI/UX design iterations",
        "User testing & feedback",
      ],
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      number: "03",
      icon: Code,
      title: "Develop & Test",
      description:
        "Our developers build robust solutions while maintaining quality through rigorous testing.",
      details: [
        "Agile development process",
        "Quality assurance testing",
        "Performance optimization",
        "Security audits",
      ],
      color: "teal",
      gradient: "from-teal-500 to-emerald-500",
    },
    {
      number: "04",
      icon: Rocket,
      title: "Launch & Grow",
      description:
        "We ensure a smooth deployment and provide ongoing support to help your business scale.",
      details: [
        "Strategic launch planning",
        "Performance monitoring",
        "Continuous optimization",
        "Growth strategy implementation",
      ],
      color: "green",
      gradient: "from-green-500 to-lime-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const iconVariants = {
    idle: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { type: "spring", stiffness: 300 },
    },
    active: {
      scale: 1.2,
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.5 },
    },
  };

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        delay: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      className="py-24 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/50 relative overflow-hidden"
      ref={ref}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        {/* Floating Orbs with More Variety */}
        {[...Array(12)].map((_, i) => {
          const colors = [
            "rgba(139, 92, 246, 0.1)",
            "rgba(59, 130, 246, 0.1)",
            "rgba(16, 185, 129, 0.1)",
            "rgba(245, 158, 11, 0.1)",
            "rgba(236, 72, 153, 0.1)",
          ];
          return (
            <motion.div
              key={i}
              className="absolute rounded-full blur-xl opacity-70"
              style={{
                background: `radial-gradient(circle, ${
                  colors[i % colors.length]
                }, transparent)`,
                width: Math.random() * 200 + 100,
                height: Math.random() * 200 + 100,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                scale: [1, Math.random() * 0.5 + 0.8, 1],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Subtle Animated Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background: `rgba(${Math.random() * 100 + 150}, ${
                Math.random() * 100 + 150
              }, 255, 0.2)`,
              width: Math.random() * 8 + 2,
              height: Math.random() * 8 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 40 - 20],
              x: [0, Math.random() * 40 - 20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          className="text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div
            variants={stepVariants}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Target className="w-5 h-5 text-purple-600" />
            </motion.div>
            <span className="text-sm font-semibold text-purple-700 uppercase tracking-wider">
              OUR PROCESS
            </span>
          </motion.div>

          <motion.h2
            variants={stepVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Your Journey to{" "}
            <motion.span
              className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent p-2"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
                display: "inline-block",
              }}
            >
              Digital Excellence
            </motion.span>
          </motion.h2>

          <motion.p
            variants={stepVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Our proven methodology ensures your project's success from concept
            to launch and beyond.
          </motion.p>
        </motion.div>

        {/* Enhanced Process Steps */}
        <motion.div
          className="space-y-24 lg:space-y-32"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={stepVariants}
              className="relative"
              onHoverStart={() => !isSmallScreen && setHoveredStep(index)}
              onHoverEnd={() => !isSmallScreen && setHoveredStep(null)}
              onClick={() => setActiveStep(activeStep === index ? null : index)}
            >
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                {/* Step Icon and Number */}
                <div className="flex-shrink-0 relative group cursor-pointer">
                  {/* Animated Circle Background */}
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.gradient} blur-xl opacity-20`}
                    animate={{
                      scale: hoveredStep === index ? [1, 1.2, 1] : 1,
                      opacity: hoveredStep === index ? [0.2, 0.4, 0.2] : 0.2,
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Main Icon Container */}
                  <motion.div
                    className={`relative w-32 h-32 bg-gradient-to-br ${step.gradient} rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500`}
                    variants={iconVariants}
                    animate={
                      hoveredStep === index
                        ? "hover"
                        : activeStep === index
                        ? "active"
                        : "idle"
                    }
                    whileHover={{ y: -5 }}
                  >
                    <step.icon className="w-12 h-12 text-white" />

                    {/* Inner Glow */}
                    <div className="absolute inset-3 rounded-xl bg-white/10"></div>

                    {/* Floating Particles Inside Icon */}
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/30"
                        style={{
                          width: Math.random() * 10 + 3,
                          height: Math.random() * 10 + 3,
                          left: `${Math.random() * 80 + 10}%`,
                          top: `${Math.random() * 80 + 10}%`,
                        }}
                        animate={{
                          y: [0, Math.random() * 20 - 10],
                          x: [0, Math.random() * 20 - 10],
                        }}
                        transition={{
                          duration: Math.random() * 3 + 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Step Number Badge */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-gray-100"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-lg font-bold text-gray-800">
                      {step.number}
                    </span>
                  </motion.div>

                  {/* Progress Indicators */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="flex gap-2">
                      {steps.map((_, dotIndex) => (
                        <motion.div
                          key={dotIndex}
                          className={`w-2 h-2 rounded-full ${
                            dotIndex <= index
                              ? `bg-${step.color}-600`
                              : "bg-gray-300"
                          }`}
                          animate={{
                            scale:
                              hoveredStep === index && dotIndex === index
                                ? [1, 1.5, 1]
                                : 1,
                          }}
                          transition={{
                            duration: 0.5,
                            repeat:
                              hoveredStep === index && dotIndex === index
                                ? Infinity
                                : 0,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-full left-1/2 -translate-x-1/2 mt-8">
                      <svg width="2" height="100" className="text-purple-300">
                        <motion.line
                          x1="1"
                          y1="0"
                          x2="1"
                          y2="100"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                          variants={lineVariants}
                          initial="hidden"
                          animate="visible"
                        />
                      </svg>

                      {/* Animated Dot Along the Line */}
                      <motion.div
                        className="absolute w-3 h-3 rounded-full bg-purple-500 -left-1 top-0"
                        animate={{
                          y: [0, 100],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Step Content */}
                <motion.div className="flex-1 text-center lg:text-left" layout>
                  <motion.h3
                    className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    animate={{
                      color: hoveredStep === index ? "#8B5CF6" : "#111827",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.title}
                  </motion.h3>

                  <motion.p
                    className="text-lg text-gray-600 leading-relaxed mb-6 max-w-2xl mx-auto lg:mx-0"
                    animate={{
                      scale: hoveredStep === index ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.description}
                  </motion.p>

                  {/* Expandable Details */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: activeStep === index ? "auto" : 0,
                      opacity: activeStep === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                      {step.details.map((detail, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center gap-3 p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: activeStep === index ? 1 : 0,
                            y: activeStep === index ? 0 : 20,
                          }}
                          transition={{ delay: 0.1 * idx }}
                        >
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1],
                              rotate: [0, 10, 0],
                            }}
                            transition={{ duration: 0.5, delay: 0.1 * idx }}
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          </motion.div>
                          <span className="text-gray-700">{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Expand Button */}
                  <motion.button
                    className={`mt-6 px-6 py-3 bg-gradient-to-r from-${
                      step.color
                    }-100 to-${
                      step.color === "purple"
                        ? "blue"
                        : step.color === "blue"
                        ? "cyan"
                        : step.color === "teal"
                        ? "emerald"
                        : "lime"
                    }-100 hover:from-${step.color}-200 hover:to-${
                      step.color === "purple"
                        ? "blue"
                        : step.color === "blue"
                        ? "cyan"
                        : step.color === "teal"
                        ? "emerald"
                        : "lime"
                    }-200 text-${
                      step.color
                    }-700 font-semibold rounded-xl transition-all duration-300`}
                    onClick={() =>
                      setActiveStep(activeStep === index ? null : index)
                    }
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {activeStep === index ? "Show Less" : "Learn More"}
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          variants={stepVariants}
          initial="hidden"
          animate={controls}
          className="mt-24"
        >
          <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 rounded-3xl p-12 md:p-16 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.1, 0.8, 0.1],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Floating Shapes */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute border-2 border-white/20 rounded-full"
                style={{
                  width: Math.random() * 100 + 50,
                  height: Math.random() * 100 + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  rotate: [0, 360],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

            <div className="relative z-10 text-center px-4 sm:px-6">
              {/* Tagline */}
              <motion.div
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 rounded-full mb-4 sm:mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-semibold">
                  READY TO START?
                </span>
              </motion.div>

              {/* Heading */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6">
                Ready to Start Your Digital Journey?
              </h3>

              {/* Paragraph */}
              <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl md:max-w-3xl mx-auto">
                Let's discuss how we can transform your business with our proven
                process.
              </p>

              {/* CTA Button */}
              <Link to='/contact'>
              <motion.button
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-600 font-semibold rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden text-sm sm:text-base"
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                  Take Consultation
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  ></motion.div>
                </span>

                {/* Button hover effect */}
                <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Button shine effect */}
                <motion.div
                  className="absolute top-0 left-0 w-16 sm:w-20 h-full bg-white/30"
                  animate={{
                    left: ["0%", "100%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 0.5,
                  }}
                />
              </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
