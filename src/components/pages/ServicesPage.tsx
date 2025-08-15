import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import {
  Rocket,
  Zap,
  Globe,
  Smartphone,
  BarChart3,
  Shield,
  CheckCircle,
  Sparkles,
  Target,
  Users,
  Award,
  ClipboardCheck,
  Clock,
  Quote,
  Layers,
  Code2,
  ChevronDown,
  PhoneCall,
} from "lucide-react";

type ServiceColor = "purple" | "blue" | "yellow" | "green" | "pink" | "teal";
type ServiceCategory =
  | "Branding"
  | "Web"
  | "AI & Automation"
  | "Marketing"
  | "Media"
  | "Consulting";

type Service = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: ServiceColor;
  category: ServiceCategory;
  features: string[];
  deliverables?: string[];
  timeline?: string;
  startingPrice?: string;
  stack: string[];
};

const ServicePage: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [openRows, setOpenRows] = useState<Set<number>>(new Set());

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const colorThemes = {
    purple: {
      bg: "from-purple-500 to-purple-600",
      light: "from-purple-50 to-purple-100",
      text: "text-purple-600",
      border: "border-purple-200",
      ring: "ring-purple-100",
    },
    blue: {
      bg: "from-blue-500 to-blue-600",
      light: "from-blue-50 to-blue-100",
      text: "text-blue-600",
      border: "border-blue-200",
      ring: "ring-blue-100",
    },
    yellow: {
      bg: "from-yellow-400 to-orange-500",
      light: "from-yellow-50 to-orange-100",
      text: "text-yellow-600",
      border: "border-yellow-200",
      ring: "ring-yellow-100",
    },
    green: {
      bg: "from-green-500 to-emerald-600",
      light: "from-green-50 to-emerald-100",
      text: "text-green-600",
      border: "border-green-200",
      ring: "ring-green-100",
    },
    pink: {
      bg: "from-pink-500 to-rose-600",
      light: "from-pink-50 to-rose-100",
      text: "text-pink-600",
      border: "border-pink-200",
      ring: "ring-pink-100",
    },
    teal: {
      bg: "from-teal-500 to-cyan-600",
      light: "from-teal-50 to-cyan-100",
      text: "text-teal-600",
      border: "border-teal-200",
      ring: "ring-cyan-100",
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 16,
        duration: 0.6,
      },
    },
  };

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

  const services: Service[] = [
    {
      id: 1,
      title: "Branding & Identity Design",
      description:
        "Memorable brands with logos, colors, typography, and clear guidelines to keep everything consistent.",
      icon: <Sparkles className="w-8 h-8" />,
      color: "purple",
      category: "Branding",
      features: [
        "Logo Design",
        "Brand Guidelines",
        "Visual Identity",
        "Brand Strategy",
      ],
      deliverables: [
        "Primary/Secondary Logos",
        "Color + Type System",
        "Brand Book (PDF)",
        "Social Starter Kit",
      ],
      timeline: "7–14 Days",
      startingPrice: "$1,499+",
      stack: [
        "Figma",
        "Adobe Illustrator",
        "Photoshop",
        "Notion",
        "Google Fonts",
      ],
    },
    {
      id: 2,
      title: "Web Development & E‑Commerce",
      description:
        "Fast, responsive websites and stores that convert — built on modern stacks and best practices.",
      icon: <Globe className="w-8 h-8" />,
      color: "blue",
      category: "Web",
      features: [
        "Responsive Design",
        "E‑commerce",
        "CMS Integration",
        "Performance Optimization",
      ],
      deliverables: [
        "Design + Build",
        "CMS Setup",
        "Shopify/Stripe",
        "Analytics + SEO Basics",
      ],
      timeline: "4–10 Days",
      startingPrice: "$2,999+",
      stack: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "Node/Express",
        "TypeScript",
        "Stripe",
        "Shopify",
        "WordPress",
      ],
    },
    {
      id: 3,
      title: "AI Tools & Automation",
      description:
        "Automate workflows, build assistants, and enhance customer experience with practical AI.",
      icon: <Zap className="w-8 h-8" />,
      color: "yellow",
      category: "AI & Automation",
      features: [
        "Process Automation",
        "AI Integration",
        "Chatbots",
        "Smart Analytics",
      ],
      deliverables: [
        "Workflow Audit",
        "Bots/Assistants",
        "Zapier/Make Flows",
        "Custom Tools",
      ],
      timeline: "1–4 weeks",
      startingPrice: "$1,999+",
      stack: [
        "OpenAI",
        "LangChain",
        "Zapier",
        "Make",
        "n8n",
        "Airtable",
        "Webhooks",
      ],
    },
    {
      id: 4,
      title: "Digital Marketing",
      description:
        "Performance‑driven SEO, paid media, and content systems that compound growth.",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "green",
      category: "Marketing",
      features: ["SEO/SEM", "Social Media", "Content Strategy", "Analytics"],
      deliverables: [
        "SEO Roadmap",
        "Content Calendar",
        "Ad Campaigns Setup",
        "Analytics Dashboard",
      ],
      timeline: "Ongoing (1–3 mo min)",
      startingPrice: "$1,200+/mo",
      stack: [
        "GA4",
        "GSC",
        "GTM",
        "Meta Ads",
        "Google Ads",
        "Klaviyo",
        "HubSpot",
      ],
    },
    {
      id: 5,
      title: "Creative Media & Video",
      description:
        "Reels, promos, and long‑form video with story, edit, and polished delivery.",
      icon: <Smartphone className="w-8 h-8" />,
      color: "pink",
      category: "Media",
      features: [
        "Video Production",
        "Animation",
        "Social Content",
        "Brand Videos",
      ],
      deliverables: [
        "Script + Storyboard",
        "Shoot/Edit/Grade",
        "Shorts Pack",
        "Title Cards + Captions",
      ],
      timeline: "3-7 Days",
      startingPrice: "$1,499+",
      stack: [
        "Premiere Pro",
        "After Effects",
        "DaVinci",
        "CapCut",
        "Audition",
        "Frame.io",
      ],
    },
    {
      id: 6,
      title: "Consulting & Strategy",
      description:
        "Clear roadmaps, stack picks, and plans that help you move faster with confidence.",
      icon: <Shield className="w-8 h-8" />,
      color: "teal",
      category: "Consulting",
      features: [
        "Strategy Planning",
        "Tech Consulting",
        "Growth Hacking",
        "Market Analysis",
      ],
      deliverables: [
        "Strategy Doc + Roadmap",
        "Stack Recommendations",
        "Prioritized Backlog",
        "KPI Framework",
      ],
      timeline: "1–2 weeks",
      startingPrice: "$149/hr or $2,500/sprint",
      stack: ["Notion", "Jira", "Miro", "Linear", "Slack"],
    },
  ];

  

  const toggleRow = (id: number) => {
    setOpenRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };


  return (
    <section
      className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
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
            />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
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

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Tailored Solutions for{" "}
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
              Every Journey
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Whether you're starting from scratch or scaling your existing
            business, we provide comprehensive digital solutions that grow with
            you.
          </motion.p>
        </motion.div>

       

        {/* Target audience cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 md:mb-24"
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
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.3),transparent_50%)]" />
                </div>

                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${card.gradient} rounded-2xl text-white mb-6 shadow-lg`}
                  animate={
                    activeCard === index
                      ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }
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

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 mt-6 text-purple-600 font-semibold hover:underline"
                  >
                    <motion.button
                      className="mt-8 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get Started
                    </motion.button>
                  </Link>
                </div>

                <motion.div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* OUR EXPERTISE */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={controls}
          className="mb-8"
        >
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full mb-4">
              <Award className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">
                OUR EXPERTISE
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Full Suite of{" "}
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Digital Services
              </span>
            </h2>
          </div>
        </motion.div>

        <div className="rounded-3xl bg-white/55 backdrop-blur-sm border border-gray-200 overflow-hidden">
          {services.map((service, idx) => {
            const theme = colorThemes[service.color];
            const isOpen = openRows.has(service.id);

            return (
              <div
                key={service.id}
                className={`relative ${
                  idx !== services.length - 1
                    ? "border-b border-gray-200/80"
                    : ""
                }`}
              >
                {/* Accent bar */}
                <div
                  className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${theme.bg}`}
                />

                {/* Summary row (responsive) */}
                <div className="relative px-5 md:px-6 py-6">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    {/* Info */}
                    <div className="md:col-span-7 flex items-start gap-4">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${theme.bg} text-white flex items-center justify-center shadow-lg flex-shrink-0`}
                      >
                        {service.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg md:text-xl font-bold text-gray-900">
                            {service.title}
                          </h3>
                          <span
                            className={`text-[11px] md:text-xs font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r ${theme.light} ${theme.text} border ${theme.border}`}
                          >
                            {service.category}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-1">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Meta (timeline + price) */}
                    <div className="md:col-span-3">
                  
                        <div className="flex justify-center items-center flex-col">
                          <div className="text-xs uppercase tracking-wide text-gray-500 mb-1 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> Timeline
                          </div>
                          <div className="text-sm font-semibold text-gray-900">
                            {service.timeline || "Varies"}
                          </div>
                        </div>
                    </div>

                    {/* Actions (Book + Details toggle) */}
                    <div className="md:col-span-2 flex items-center justify-center md:justify-end gap-2">
                      {/* Removed "Get a proposal" per request */}

                      <Link
                        to="/contact"
                        className="px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 font-semibold text-gray-800 transition flex items-center gap-2"
                        aria-label="Go to contact"
                      >
                        {" "}
                        <PhoneCall className="w-4 h-4" />{" "}
                      </Link>
                      <button
                        onClick={() => toggleRow(service.id)}
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border ${
                          isOpen
                            ? "bg-gray-900 text-white border-gray-900"
                            : "bg-white text-gray-800 border-gray-200"
                        } hover:shadow-sm transition`}
                        aria-expanded={isOpen}
                        aria-controls={`row-details-${service.id}`}
                      >
                        Details
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Details Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`row-details-${service.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 md:px-6 pb-6"
                    >
                      <div
                        className={`rounded-2xl border ${theme.border} ${theme.ring} ring-1 bg-white/70 p-5`}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Features */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">
                              Key Features
                            </h4>
                            <div className="grid grid-cols-1 gap-2">
                              {service.features.map((f, i) => (
                                <div
                                  key={i}
                                  className="flex items-center gap-2 text-sm text-gray-700"
                                >
                                  <div
                                    className={`w-2 h-2 rounded-full bg-gradient-to-r ${theme.bg}`}
                                  />
                                  {f}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Deliverables */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">
                              Deliverables
                            </h4>
                            <div className="grid grid-cols-1 gap-2">
                              {(service.deliverables || service.features).map(
                                (d, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center gap-2 text-sm text-gray-700"
                                  >
                                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                                    {d}
                                  </div>
                                )
                              )}
                            </div>
                          </div>

                          {/* Tech Stack */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">
                              Tech Stack
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {service.stack.map((t, i) => (
                                <span
                                  key={i}
                                  className="text-xs px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-700 shadow-sm"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {[
            { k: "150+", v: "Projects Delivered" },
            { k: "100%", v: "Client Satisfaction" },
            { k: "2x", v: "Faster Launch" },
            { k: "24/7", v: "Support Options" },
          ].map((s, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="p-6 rounded-2xl bg-white/80 border border-gray-200 shadow-sm text-center"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {s.k}
              </div>
              <div className="text-sm text-gray-600 mt-1">{s.v}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Our Process */}
        <motion.div
          className="mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerVariants}
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-4">
              <ClipboardCheck className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-semibold text-purple-700">
                OUR PROCESS
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              From Idea to Impact
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Target className="w-6 h-6" />,
                title: "Discover",
                desc: "Goals, audience, and constraints",
              },
              {
                icon: <Layers className="w-6 h-6" />,
                title: "Plan",
                desc: "Roadmap, scope, and milestones",
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Design",
                desc: "Brand, UX/UI, and prototypes",
              },
              {
                icon: <Code2 className="w-6 h-6" />,
                title: "Build",
                desc: "Agile development + QA",
              },
              {
                icon: <Rocket className="w-6 h-6" />,
                title: "Launch",
                desc: "Secure deploy and training",
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Optimize",
                desc: "Measure, iterate, grow",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="p-6 rounded-2xl bg-white/80 border border-gray-200 hover:shadow-lg transition"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-600 text-white flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h4 className="font-semibold text-gray-900">{`${i + 1}. ${
                  step.title
                }`}</h4>
                <p className="text-gray-600 text-sm mt-1">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-20 text-center"
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.3),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.3),transparent_50%)]" />
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
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicePage;
