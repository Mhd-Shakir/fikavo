import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  motion,
  useInView,
  useAnimation,
  useReducedMotion,
} from "framer-motion";
import {
  Search,
  DraftingCompass,
  Code,
  Rocket,
  Target,
  Sparkles,
  CheckCircle,
  Link2,
} from "lucide-react";

type ColorKey = "purple" | "blue" | "teal" | "green";

interface StepData {
  number: string;
  slug: string;
  icon: React.ElementType;
  title: string;
  description: string;
  details: string[];
  color: ColorKey;
}

const COLOR: Record<
  ColorKey,
  {
    gradient: string; // for the icon tile
    lightFrom: string; // button gradient (from)
    lightTo: string; // button gradient (to)
    hoverLightFrom: string; // button hover gradient (from)
    hoverLightTo: string; // button hover gradient (to)
    text: string; // button text color
    titleHover: string; // title hover color
    dot: string; // small progress dot color
  }
> = {
  purple: {
    gradient: "from-purple-500 to-pink-500",
    lightFrom: "from-purple-100",
    lightTo: "to-blue-100",
    hoverLightFrom: "from-purple-200",
    hoverLightTo: "to-blue-200",
    text: "text-purple-700",
    titleHover: "#8B5CF6",
    dot: "bg-purple-600",
  },
  blue: {
    gradient: "from-blue-500 to-cyan-500",
    lightFrom: "from-blue-100",
    lightTo: "to-cyan-100",
    hoverLightFrom: "from-blue-200",
    hoverLightTo: "to-cyan-200",
    text: "text-blue-700",
    titleHover: "#2563EB",
    dot: "bg-blue-600",
  },
  teal: {
    gradient: "from-teal-500 to-emerald-500",
    lightFrom: "from-teal-100",
    lightTo: "to-emerald-100",
    hoverLightFrom: "from-teal-200",
    hoverLightTo: "to-emerald-200",
    text: "text-teal-700",
    titleHover: "#0D9488",
    dot: "bg-teal-600",
  },
  green: {
    gradient: "from-green-500 to-lime-500",
    lightFrom: "from-green-100",
    lightTo: "to-lime-100",
    hoverLightFrom: "from-green-200",
    hoverLightTo: "to-lime-200",
    text: "text-green-700",
    titleHover: "#16A34A",
    dot: "bg-green-600",
  },
};

const steps: StepData[] = [
  {
    number: "01",
    slug: "discover",
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
  },
  {
    number: "02",
    slug: "design",
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
  },
  {
    number: "03",
    slug: "develop",
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
  },
  {
    number: "04",
    slug: "launch",
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
  },
];

// Simple "is client" hook for SSR safety
function useIsClient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

const ProcessPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [expandAll, setExpandAll] = useState(false);

  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const controls = useAnimation();
  const prefersReducedMotion = useReducedMotion();
  const isClient = useIsClient();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  useEffect(() => {
    const checkScreenSize = () => setIsSmallScreen(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Deep-linking: open step when URL hash matches slug (e.g., #design)
  useEffect(() => {
    const applyFromHash = () => {
      const raw = window.location.hash.replace("#", "");
      if (!raw) return;
      const idx = steps.findIndex((s) => s.slug === raw);
      if (idx >= 0) setActiveStep(idx);
    };
    applyFromHash();
    window.addEventListener("hashchange", applyFromHash);
    return () => window.removeEventListener("hashchange", applyFromHash);
  }, []);

  // Background seeds (SSR-safe: only generate on client)
  const orbSeeds = useMemo(() => {
    if (!isClient) return [];
    return Array.from({ length: 12 }).map(() => ({
      color: [
        "rgba(139, 92, 246, 0.1)",
        "rgba(59, 130, 246, 0.1)",
        "rgba(16, 185, 129, 0.1)",
        "rgba(245, 158, 11, 0.1)",
        "rgba(236, 72, 153, 0.1)",
      ][Math.floor(Math.random() * 5)],
      w: Math.random() * 200 + 100,
      h: Math.random() * 200 + 100,
      left: Math.random() * 100,
      top: Math.random() * 100,
      dx: Math.random() * 100 - 50,
      dy: Math.random() * 100 - 50,
      scale: Math.random() * 0.5 + 0.8,
      dur: Math.random() * 15 + 10,
    }));
  }, [isClient]);

  const particleSeeds = useMemo(() => {
    if (!isClient) return [];
    return Array.from({ length: 30 }).map(() => ({
      r: Math.floor(Math.random() * 100 + 150),
      g: Math.floor(Math.random() * 100 + 150),
      w: Math.random() * 8 + 2,
      h: Math.random() * 8 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      dy: Math.random() * 40 - 20,
      dx: Math.random() * 40 - 20,
      dur: Math.random() * 5 + 3,
      delay: Math.random() * 2,
    }));
  }, [isClient]);

  const ctaShapeSeeds = useMemo(() => {
    if (!isClient) return [];
    return Array.from({ length: 8 }).map(() => ({
      w: Math.random() * 100 + 50,
      h: Math.random() * 100 + 50,
      left: Math.random() * 100,
      top: Math.random() * 100,
      dur: Math.random() * 10 + 10,
    }));
  }, [isClient]);

  const stepBySlug = useCallback(
    (slug: string) => steps.findIndex((s) => s.slug === slug),
    []
  );

  const scrollToStep = useCallback(
    (slug: string) => {
      const index = stepBySlug(slug);
      if (index < 0) return;
      const el = document.getElementById(`step-${slug}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        setActiveStep(index);
        history.replaceState(null, "", `#${slug}`);
      }
    },
    [stepBySlug]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.3,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const stepVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 50,
      scale: prefersReducedMotion ? 1 : 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: prefersReducedMotion ? "tween" : "spring",
        stiffness: prefersReducedMotion ? 50 : 100,
        damping: prefersReducedMotion ? 20 : 15,
        duration: prefersReducedMotion ? 0.25 : 0.8,
      },
    },
  };

  const iconVariants = {
    idle: { scale: 1, rotate: 0 },
    hover: prefersReducedMotion
      ? { scale: 1.03 }
      : {
          scale: 1.1,
          rotate: 5,
          transition: { type: "spring", stiffness: 300 },
        },
    active: prefersReducedMotion
      ? { scale: 1.06 }
      : { scale: 1.2, rotate: [0, 10, -10, 0], transition: { duration: 0.5 } },
  };

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 1.5,
        delay: prefersReducedMotion ? 0 : 0.5,
        ease: "easeInOut",
      },
    },
  };

  const toggleAll = () => {
    const next = !expandAll;
    setExpandAll(next);
    setActiveStep(next ? 0 : null);
  };

  return (
    <main
      ref={containerRef as any}
      className="py-24 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/50 relative overflow-hidden"
    >
      {/* Background Elements (SSR-safe) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Floating Orbs */}
        {isClient &&
          orbSeeds.map((o, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full blur-xl opacity-70"
              style={{
                background: `radial-gradient(circle, ${o.color}, transparent)`,
                width: o.w,
                height: o.h,
                left: `${o.left}%`,
                top: `${o.top}%`,
              }}
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      x: [0, o.dx, 0],
                      y: [0, o.dy, 0],
                      scale: [1, o.scale, 1],
                    }
              }
              transition={{
                duration: o.dur,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

        {/* Subtle Particles */}
        {isClient &&
          particleSeeds.map((p, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                background: `rgba(${p.r}, ${p.g}, 255, 0.2)`,
                width: p.w,
                height: p.h,
                left: `${p.left}%`,
                top: `${p.top}%`,
              }}
              animate={
                prefersReducedMotion
                  ? undefined
                  : { y: [0, p.dy], x: [0, p.dx], opacity: [0.2, 0.8, 0.2] }
              }
              transition={{
                duration: p.dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
            />
          ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div
            variants={stepVariants}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-6"
          >
            <motion.div
              animate={prefersReducedMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Target className="w-5 h-5 text-purple-600" />
            </motion.div>
            <span className="text-sm font-semibold text-purple-700 uppercase tracking-wider">
              Our Process
            </span>
          </motion.div>

          <motion.h1
            variants={stepVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6"
          >
            Your Journey to{" "}
            <motion.span
              className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent p-1"
              animate={
                prefersReducedMotion
                  ? undefined
                  : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
              }
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%", display: "inline-block" }}
            >
              Digital Excellence
            </motion.span>
          </motion.h1>

          <motion.p
            variants={stepVariants}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Our proven methodology ensures your project’s success from concept
            to launch and beyond.
          </motion.p>

          {/* Mini-nav + Expand All */}
          <motion.div
            variants={stepVariants}
            className="mt-6 md:mt-8 flex flex-col items-center gap-4"
          >
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {steps.map((s, idx) => (
                <button
                  key={s.slug}
                  onClick={() => scrollToStep(s.slug)}
                  className={`px-3 py-1.5 rounded-full border border-gray-200 bg-white text-sm font-medium shadow-sm hover:shadow transition ${
                    activeStep === idx ? "ring-2 ring-purple-300" : ""
                  }`}
                  aria-label={`Jump to step ${s.number}: ${s.title}`}
                >
                  <span className="mr-1.5 inline-flex w-5 h-5 items-center justify-center rounded-full bg-gray-100 text-gray-700 text-xs">
                    {s.number}
                  </span>
                  {s.title}
                </button>
              ))}
            </div>

            <button
              onClick={toggleAll}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 shadow-sm text-sm font-semibold hover:shadow-md transition"
              aria-pressed={expandAll}
            >
              {expandAll ? "Collapse all" : "Expand all"}
            </button>
          </motion.div>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="space-y-24 lg:space-y-32"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {steps.map((step, index) => {
            const color = COLOR[step.color];
            const isActive = expandAll || activeStep === index;
            const isHover = hoveredStep === index;

            return (
              <motion.div
                id={`step-${step.slug}`}
                key={step.number}
                variants={stepVariants}
                className="relative"
                onHoverStart={() => !isSmallScreen && setHoveredStep(index)}
                onHoverEnd={() => !isSmallScreen && setHoveredStep(null)}
                onClick={() =>
                  setActiveStep(activeStep === index ? null : index)
                }
                role="group"
                aria-label={step.title}
              >
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                  {/* Icon + Number */}
                  <div className="flex-shrink-0 relative group cursor-pointer">
                    {/* Animated Circle Background */}
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${color.gradient} blur-xl opacity-20`}
                      animate={
                        prefersReducedMotion
                          ? undefined
                          : {
                              scale: isHover ? [1, 1.2, 1] : 1,
                              opacity: isHover ? [0.2, 0.4, 0.2] : 0.2,
                            }
                      }
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Icon tile */}
                    <motion.div
                      className={`relative w-32 h-32 bg-gradient-to-br ${color.gradient} rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500`}
                      variants={iconVariants}
                      animate={isHover ? "hover" : isActive ? "active" : "idle"}
                      whileHover={prefersReducedMotion ? undefined : { y: -5 }}
                    >
                      <step.icon className="w-12 h-12 text-white" />
                      <div className="absolute inset-3 rounded-xl bg-white/10" />

                      {/* Floating particles inside icon */}
                      {isClient &&
                        Array.from({ length: 5 }).map((_, i) => {
                          const w = Math.random() * 10 + 3;
                          const h = Math.random() * 10 + 3;
                          const left = Math.random() * 80 + 10;
                          const top = Math.random() * 80 + 10;
                          const dx = Math.random() * 20 - 10;
                          const dy = Math.random() * 20 - 10;
                          const dur = Math.random() * 3 + 2;
                          return (
                            <motion.div
                              key={`inner-${i}`}
                              className="absolute rounded-full bg-white/30"
                              style={{
                                width: w,
                                height: h,
                                left: `${left}%`,
                                top: `${top}%`,
                              }}
                              animate={
                                prefersReducedMotion
                                  ? undefined
                                  : { y: [0, dy], x: [0, dx] }
                              }
                              transition={{
                                duration: dur,
                                repeat: Infinity,
                                repeatType: "reverse",
                              }}
                            />
                          );
                        })}
                    </motion.div>

                    {/* Step Number Badge */}
                    <motion.div
                      className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-gray-100"
                      whileHover={
                        prefersReducedMotion
                          ? undefined
                          : { scale: 1.1, rotate: 360 }
                      }
                      transition={{
                        duration: prefersReducedMotion ? 0.2 : 0.5,
                      }}
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
                              dotIndex <= index ? color.dot : "bg-gray-300"
                            }`}
                            animate={
                              isHover &&
                              dotIndex === index &&
                              !prefersReducedMotion
                                ? { scale: [1, 1.5, 1] }
                                : { scale: 1 }
                            }
                            transition={{
                              duration: 0.5,
                              repeat:
                                isHover &&
                                dotIndex === index &&
                                !prefersReducedMotion
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
                        {!prefersReducedMotion && (
                          <motion.div
                            className="absolute w-3 h-3 rounded-full bg-purple-500 -left-1 top-0"
                            animate={{ y: [0, 100] }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Step Content */}
                  <motion.div
                    className="flex-1 text-center lg:text-left"
                    layout
                  >
                    <motion.h3
                      className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4"
                      animate={{
                        color: isHover
                          ? COLOR[step.color].titleHover
                          : "#111827",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.title}
                    </motion.h3>

                    <motion.p
                      className="text-lg text-gray-600 leading-relaxed mb-4 md:mb-6 max-w-2xl mx-auto lg:mx-0"
                      animate={{ scale: isHover ? 1.02 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.description}
                    </motion.p>

                    {/* Expandable Details */}
                    <motion.div
                      id={`details-${step.slug}`}
                      initial={false}
                      animate={{
                        height: isActive ? "auto" : 0,
                        opacity: isActive ? 1 : 0,
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
                              opacity: isActive ? 1 : 0,
                              y: isActive ? 0 : 20,
                            }}
                            transition={{ delay: isActive ? 0.05 * idx : 0 }}
                          >
                            <motion.div
                              animate={
                                prefersReducedMotion
                                  ? undefined
                                  : { scale: [1, 1.2, 1], rotate: [0, 10, 0] }
                              }
                              transition={{ duration: 0.5, delay: 0.05 * idx }}
                            >
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            </motion.div>
                            <span className="text-gray-700">{detail}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={stepVariants}
          initial="hidden"
          animate={controls}
          className="mt-24"
        >
          <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 rounded-3xl p-12 md:p-16 text-white overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              {isClient &&
                Array.from({ length: 20 }).map((_, i) => {
                  const l = Math.random() * 100;
                  const t = Math.random() * 100;
                  const dur = Math.random() * 3 + 2;
                  const delay = Math.random() * 2;
                  return (
                    <motion.div
                      key={`cta-dot-${i}`}
                      className="absolute w-2 h-2 bg-white rounded-full"
                      style={{ left: `${l}%`, top: `${t}%` }}
                      animate={
                        prefersReducedMotion
                          ? undefined
                          : { opacity: [0.1, 0.8, 0.1], scale: [1, 1.5, 1] }
                      }
                      transition={{ duration: dur, repeat: Infinity, delay }}
                    />
                  );
                })}
            </div>

            {isClient &&
              ctaShapeSeeds.map((s, i) => (
                <motion.div
                  key={`cta-shape-${i}`}
                  className="absolute border-2 border-white/20 rounded-full"
                  style={{
                    width: s.w,
                    height: s.h,
                    left: `${s.left}%`,
                    top: `${s.top}%`,
                  }}
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { rotate: [0, 360], opacity: [0.1, 0.3, 0.1] }
                  }
                  transition={{
                    duration: s.dur,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}

            <div className="relative z-10 text-center px-4 sm:px-6">
              <motion.div
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 rounded-full mb-4 sm:mb-6"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-semibold">
                  READY TO START?
                </span>
              </motion.div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6">
                Ready to Start Your Digital Journey?
              </h3>

              <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl md:max-w-3xl mx-auto">
                Let’s discuss how we can transform your business with our proven
                process.
              </p>

              <motion.button
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-600 font-semibold rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden text-sm sm:text-base"
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        scale: 1.05,
                        y: -3,
                        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                      }
                }
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                  Schedule Free Consultation
                  {!prefersReducedMotion && (
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </span>

                <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {!prefersReducedMotion && (
                  <motion.div
                    className="absolute top-0 left-0 w-16 sm:w-20 h-full bg-white/30"
                    animate={{ left: ["0%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  />
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default ProcessPage;
