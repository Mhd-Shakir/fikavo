import React, { useState, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Rocket,
  Zap,
  Globe,
  Smartphone,
  BarChart3,
  Shield,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Target,
  Users,
  Award,
} from "lucide-react";

const Services: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const mainCards = [
    {
      id: "startup",
      title: "For Startups",
      target: "New Startup Teams",
      description:
        "We help new startup teams build everything from scratch – name, branding, website, marketing, automation, and launch strategy.",
      benefits: [
        "Complete A to Z digital setup",
        "Logo, branding, and identity design",
        "Website and e-commerce store",
        "Social media and marketing launch",
        "Automation & AI tools integration",
      ],
      icon: <Rocket className="w-8 h-8" />,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
    },
    {
      id: "existing",
      title: "For Existing Businesses",
      target: "Offline or Semi-Digital Businesses",
      description:
        "Already running a business but not online? We guide you through full digital transformation to grow your business and reach more customers.",
      benefits: [
        "Rebranding & online identity setup",
        "Business website & digital presence",
        "E-commerce and customer systems",
        "Digital marketing strategy",
        "Content, video, and automation support",
      ],
      icon: <Target className="w-8 h-8" />,
      gradient: "from-blue-500 to-teal-500",
      bgGradient: "from-blue-50 to-teal-50",
    },
  ];

  const services = [
    {
      id: 1,
      title: "Branding & Identity Design",
      description:
        "Crafting powerful brand identities with logos, color palettes, typography, and brand guidelines that resonate with your audience.",
      icon: <Sparkles className="w-8 h-8" />,
      color: "purple",
      features: [
        "Logo Design",
        "Brand Guidelines",
        "Visual Identity",
        "Brand Strategy",
      ],
    },
    {
      id: 2,
      title: "Web Development & E-Commerce",
      description:
        "Developing responsive websites and e-commerce platforms with full functionality, modern design, and seamless user experience.",
      icon: <Globe className="w-8 h-8" />,
      color: "blue",
      features: [
        "Responsive Design",
        "E-commerce",
        "CMS Integration",
        "Performance Optimization",
      ],
    },
    {
      id: 3,
      title: "AI Tools & Automation",
      description:
        "Smart automation and AI-powered tools to streamline your business processes and enhance customer experience.",
      icon: <Zap className="w-8 h-8" />,
      color: "yellow",
      features: [
        "Process Automation",
        "AI Integration",
        "Chatbots",
        "Smart Analytics",
      ],
    },
    {
      id: 4,
      title: "Digital Marketing",
      description:
        "Boosting your online presence through strategic campaigns, content marketing, and performance optimization across platforms.",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "green",
      features: ["SEO/SEM", "Social Media", "Content Strategy", "Analytics"],
    },
    {
      id: 5,
      title: "Creative Media & Video",
      description:
        "Professional video content creation for reels, promos, YouTube, and comprehensive brand storytelling.",
      icon: <Smartphone className="w-8 h-8" />,
      color: "pink",
      features: [
        "Video Production",
        "Animation",
        "Social Content",
        "Brand Videos",
      ],
    },
    {
      id: 6,
      title: "Consulting & Strategy",
      description:
        "Strategic consulting services for digital transformation, growth planning, and technology implementation.",
      icon: <Shield className="w-8 h-8" />,
      color: "teal",
      features: [
        "Strategy Planning",
        "Tech Consulting",
        "Growth Hacking",
        "Market Analysis",
      ],
    },
  ];

  const colorThemes = {
    purple: {
      bg: "from-purple-500 to-purple-600",
      hover: "hover:from-purple-600 hover:to-purple-700",
      light: "from-purple-50 to-purple-100",
      text: "text-purple-600",
      border: "border-purple-200",
    },
    blue: {
      bg: "from-blue-500 to-blue-600",
      hover: "hover:from-blue-600 hover:to-blue-700",
      light: "from-blue-50 to-blue-100",
      text: "text-blue-600",
      border: "border-blue-200",
    },
    yellow: {
      bg: "from-yellow-400 to-orange-500",
      hover: "hover:from-yellow-500 hover:to-orange-600",
      light: "from-yellow-50 to-orange-100",
      text: "text-yellow-600",
      border: "border-yellow-200",
    },
    green: {
      bg: "from-green-500 to-emerald-600",
      hover: "hover:from-green-600 hover:to-emerald-700",
      light: "from-green-50 to-emerald-100",
      text: "text-green-600",
      border: "border-green-200",
    },
    pink: {
      bg: "from-pink-500 to-rose-600",
      hover: "hover:from-pink-600 hover:to-rose-700",
      light: "from-pink-50 to-rose-100",
      text: "text-pink-600",
      border: "border-pink-200",
    },
    teal: {
      bg: "from-teal-500 to-cyan-600",
      hover: "hover:from-teal-600 hover:to-cyan-700",
      light: "from-teal-50 to-cyan-100",
      text: "text-teal-600",
      border: "border-teal-200",
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  return (
    <section
      className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden"
      ref={ref}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        {/* Floating Geometric Shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div
              className={`w-full h-full bg-gradient-to-br ${
                i % 2 === 0
                  ? "from-purple-400 to-blue-400"
                  : "from-teal-400 to-green-400"
              } ${i % 3 === 0 ? "rounded-full" : "rounded-lg rotate-45"}`}
            ></div>
          </motion.div>
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
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-purple-600" />
            </motion.div>
            <span className="text-sm font-semibold text-purple-700">
              WHO WE HELP
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Tailored Solutions for{" "}
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
              Every Journey
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Whether you're starting from scratch or scaling your existing
            business, we provide comprehensive digital solutions that grow with
            you.
          </motion.p>
        </motion.div>

        {/* Enhanced Target Audience Cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {mainCards.map((card, index) => (
            <motion.div
              key={card.id}
              variants={itemVariants}
              className="group relative"
              onHoverStart={() => setActiveCard(index)}
              onHoverEnd={() => setActiveCard(null)}
            >
              <div
                className={`relative h-full bg-gradient-to-br ${card.bgGradient} p-8 rounded-3xl border border-white/50 shadow-xl backdrop-blur-sm overflow-hidden transition-all duration-500 group-hover:shadow-2xl`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.3),transparent_50%)]"></div>
                </div>

                {/* Floating Icon */}
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${card.gradient} rounded-2xl text-white mb-6 shadow-lg`}
                  animate={
                    activeCard === index
                      ? {
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }
                      : {}
                  }
                  transition={{ duration: 0.5 }}
                >
                  {card.icon}
                </motion.div>

                <div className="relative z-10">
                  <span className="text-sm font-semibold text-purple-600 uppercase tracking-wider">
                    {card.target}
                  </span>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                    {card.description}
                  </p>

                  <div className="space-y-4">
                    {card.benefits.map((benefit, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-start gap-3 group/item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                      >
                        <motion.div
                          className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mt-0.5"
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CheckCircle className="w-4 h-4 text-white" />
                        </motion.div>
                        <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors">
                          {benefit}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <Link to="/contact">
                    <motion.button
                      className={`mt-8 px-6 py-3 bg-gradient-to-r ${card.gradient} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get Started
                    </motion.button>
                  </Link>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Services Grid Header */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Award className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">
              OUR EXPERTISE
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Full Suite of{" "}
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Digital Services
            </span>
          </h2>
        </motion.div>

        {/* Enhanced Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {services.map((service, index) => {
            const theme =
              colorThemes[service.color as keyof typeof colorThemes];
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="group relative h-full"
                onHoverStart={() => setHoveredService(index)}
                onHoverEnd={() => setHoveredService(null)}
                whileHover={{ y: -8 }}
              >
                <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg group-hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  {/* Background Gradient on Hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${theme.light} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative z-10">
                    {/* Icon Container */}
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${theme.bg} rounded-2xl text-white mb-6 shadow-lg group-hover:shadow-xl`}
                      animate={
                        hoveredService === index
                          ? {
                              scale: [1, 1.1, 1],
                              rotate: [0, 10, -10, 0],
                            }
                          : {}
                      }
                      transition={{ duration: 0.6 }}
                    >
                      {service.icon}
                    </motion.div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-gray-600"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * idx }}
                        >
                          <div
                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${theme.bg}`}
                          ></div>
                          {feature}
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA Link */}
                    <Link to="/services">
                      <motion.div
                        className="flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-3 transition-all duration-300 cursor-pointer"
                        whileHover={{ x: 3 }}
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </motion.div>
                    </Link>
                  </div>

                  {/* Decorative Elements */}
                  <motion.div
                    className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full opacity-20"
                    animate={{
                      scale: hoveredService === index ? [1, 1.5, 1] : 1,
                      opacity: hoveredService === index ? [0.2, 0.6, 0.2] : 0.2,
                    }}
                    transition={{
                      duration: 1,
                      repeat: hoveredService === index ? Infinity : 0,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          className="mt-20 text-center"
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.3),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.3),transparent_50%)]"></div>
            </div>

            <div className="relative z-10">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Users className="w-5 h-5" />
                <span className="text-sm font-semibold">READY TO START?</span>
              </motion.div>

              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Let's Build Something Amazing Together
              </h3>

              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Ready to transform your vision into reality? Get a free
                consultation and see how we can help your business grow.
              </p>

              <Link to="/contact">
                <motion.button
                  className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{
                    scale: 1.05,
                    y: -3,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Project Today
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
