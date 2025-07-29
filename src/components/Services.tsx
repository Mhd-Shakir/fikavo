import React from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Zap, 
  Globe, 
  Smartphone, 
  BarChart3, 
  Shield, 
  ArrowRight,
  CheckCircle 
} from 'lucide-react';
import Card from './ui/Card'; // Assuming a flexible Card component exists
import SectionHeader from './ui/SectionHeader';

// --- Type Definitions ---
type MainCardData = {
  id: string;
  title: string;
  target: string;
  description: string;
  benefits: string[];
};

type ServiceData = {
  id: number;
  title: string;
  description: string;
};

// --- Data ---
const mainCards: MainCardData[] = [
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
  },
];

const fikavoServices: ServiceData[] = [
  { id: 1, title: "Branding & Identity Design", description: "Crafting powerful brand identities with logos, color palettes, typography, and brand guidelines." },
  { id: 2, title: "Web Development & E-Commerce", description: "Developing responsive websites and e-commerce platforms with full functionality and admin control." },
  { id: 3, title: "AI Tools & Automation", description: "Smart automation and AI-powered tools to streamline your business processes and customer experience." },
  { id: 4, title: "Digital Marketing", description: "Boosting your online presence through strategic campaigns and content across major platforms." },
  { id: 5, title: "Creative Media & Video Editing", description: "Professional video content creation for reels, promos, YouTube, and brand storytelling." },
  { id: 6, title: "Graphic Design", description: "Creative design services for both digital and print needs, tailored to your brand style." },
];

// --- Theming & Configuration ---
const colorThemes = {
  purple: { bg: 'bg-purple-100 group-hover:bg-purple-600', text: 'text-purple-600', textHover: 'group-hover:text-white', border: 'hover:border-purple-300' },
  blue: { bg: 'bg-blue-100 group-hover:bg-blue-600', text: 'text-blue-600', textHover: 'group-hover:text-white', border: 'hover:border-blue-300' },
  yellow: { bg: 'bg-yellow-100 group-hover:bg-yellow-500', text: 'text-yellow-600', textHover: 'group-hover:text-white', border: 'hover:border-yellow-300' },
  orange: { bg: 'bg-orange-100 group-hover:bg-orange-500', text: 'text-orange-600', textHover: 'group-hover:text-white', border: 'hover:border-orange-300' },
  teal: { bg: 'bg-teal-100 group-hover:bg-teal-600', text: 'text-teal-600', textHover: 'group-hover:text-white', border: 'hover:border-teal-300' },
  pink: { bg: 'bg-pink-100 group-hover:bg-pink-600', text: 'text-pink-600', textHover: 'group-hover:text-white', border: 'hover:border-pink-300' },
};

const serviceIcons = [<Rocket />, <Globe />, <Zap />, <BarChart3 />, <Smartphone />, <Shield />];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
};

// --- Component ---
const Services: React.FC = () => {
  const themeValues = Object.values(colorThemes);
  const servicesToRender = fikavoServices.map((service, index) => ({
    ...service,
    icon: serviceIcons[index % serviceIcons.length],
    theme: themeValues[index % themeValues.length],
  }));

  return (
    <section id="services" className="py-20 lg:py-32 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#dbeafe_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)]"></div>
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] opacity-10">
          <div className="w-full h-full bg-gradient-radial from-purple-500 to-transparent blur-3xl rounded-full"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section 1: Target Audience Cards */}
        <SectionHeader
          title="Who We Help"
          subtitle="Tailored digital solutions for every stage of your business journey."
        />
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 lg:mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {mainCards.map((card) => (
            <motion.div key={card.id} variants={itemVariants} className="flex">
              <div className="w-full bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200/60 shadow-lg shadow-gray-200/30 flex flex-col">
                <h3 className="text-sm font-semibold text-purple-600 uppercase tracking-wider mb-2">{card.target}</h3>
                <h2 className="text-3xl font-bold font-poppins text-gray-800 mb-4">{card.title}</h2>
                <p className="text-gray-600 font-poppins mb-6 flex-grow">{card.description}</p>
                <ul className="space-y-3">
                  {card.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 font-poppins">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Section 2: Core Services Grid */}
        <SectionHeader
          title="Our Full Suite of Services"
          subtitle="From branding and web development to AI and digital marketing, we've got you covered."
        />
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {servicesToRender.map((service) => (
            <motion.div
              key={service.id}
              className="flex"
              variants={itemVariants}
            >
              <Card
                className={`w-full h-full flex flex-col group transition-all duration-300 bg-white/60 backdrop-blur-md border border-gray-200/50 ${service.theme.border} hover:shadow-xl hover:shadow-gray-300/20`}
              >
                <div className="p-8 flex flex-col h-full">
                  <div className="mb-6">
                    <div className={`inline-block p-3 rounded-lg transition-all duration-300 ${service.theme.bg}`}>
                      {React.cloneElement(service.icon, { 
                        className: `w-8 h-8 transition-all duration-300 group-hover:scale-110 ${service.theme.text} ${service.theme.textHover}`
                      })}
                    </div>
                  </div>
                  <div className="flex-grow" />
                  <div>
                    <h3 className="text-2xl font-bold font-poppins text-gray-800 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 font-poppins leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <a href="#contact" className={`inline-flex items-center gap-2 font-semibold font-poppins tracking-wide group-hover:gap-3 transition-all duration-300 ${service.theme.text}`}>
                      Learn More
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;