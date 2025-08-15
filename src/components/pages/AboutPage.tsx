import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Target,
  Rocket,
  Users,
  Shield,
  Award,
  Lightbulb,
  Heart,
  TrendingUp,
  Globe,
  MapPin,
  Clock,
  Briefcase,
  Quote,
  Star,
  Github,
  Linkedin,
  Twitter,
  ChevronDown,
  PhoneCall,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import TechStack from '../ui/Techstack';

type TeamMember = {
  name: string;
  role: string;
  location: string;
  timezone: string;
  bio: string;
  skills: string[];
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
};

const AboutPage: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const controls = useAnimation();
  const [openFaq, setOpenFaq] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.98 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 16, duration: 0.6 },
    },
  };

  const stats = [
    { k: '150+', v: 'Projects Delivered' },
    { k: '100%', v: 'Client Satisfaction' },
    { k: '2x', v: 'Faster Launch' },
    { k: '24/7', v: 'Support Options' },
  ];

  const values = [
    {
      icon: <Heart className="w-5 h-5" />,
      title: 'User-first',
      desc: 'We obsess over clarity and usefulness for the people who use your product.',
      gradient: 'from-rose-500 to-pink-500',
    },
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: 'Think clearly',
      desc: 'Simple plans, visible trade-offs, and steady execution beat chaos.',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Own the outcome',
      desc: 'We ship what we promise and stand behind the work — no excuses.',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: 'Quality by default',
      desc: 'Clean design, accessible code, and real performance as the baseline.',
      gradient: 'from-purple-500 to-indigo-600',
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'No ego, just work',
      desc: 'Collaboration over posturing. We win as a team with our clients.',
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: 'Curious and improving',
      desc: 'We iterate, measure, and keep leveling up the craft.',
      gradient: 'from-lime-500 to-green-600',
    },
  ];

  const timeline = [
    {
      date: '2022',
      title: 'Founding and first launches',
      desc: 'Started as a lean studio helping early-stage founders ship fast.',
      icon: <Rocket className="w-4 h-4" />,
    },
    {
      date: '2023',
      title: 'From builds to growth',
      desc: 'Added performance marketing, analytics, and automation.',
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      date: '2024',
      title: 'AI-assisted delivery',
      desc: 'Integrated AI into workflows for speed and scale.',
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      date: 'Today',
      title: 'A to Z partner',
      desc: 'Brand, web, AI, and growth — all under one roof.',
      icon: <Award className="w-4 h-4" />,
    },
  ];

  const team: TeamMember[] = [
    {
      name: 'Aarav Mehta',
      role: 'Founder & Strategy',
      location: 'Bengaluru, IN',
      timezone: 'IST (UTC+5:30)',
      bio: 'Brings product thinking and “ship fast” mentality from startup ops.',
      skills: ['Strategy', 'Messaging', 'Growth'],
      socials: { linkedin: '#', twitter: '#' },
    },
    {
      name: 'Sara Khan',
      role: 'Design Lead',
      location: 'Mumbai, IN',
      timezone: 'IST (UTC+5:30)',
      bio: 'Brand systems and delightful, accessible UI.',
      skills: ['Brand', 'UI/UX', 'Prototyping'],
      socials: { linkedin: '#', twitter: '#' },
    },
    {
      name: 'Rohan Patel',
      role: 'Engineering Lead',
      location: 'Remote',
      timezone: 'UTC',
      bio: 'Full‑stack builds with performance and DX in mind.',
      skills: ['Next.js', 'Node', 'DevOps'],
      socials: { github: '#', linkedin: '#' },
    },
    {
      name: 'Priya Singh',
      role: 'Marketing Lead',
      location: 'Delhi, IN',
      timezone: 'IST (UTC+5:30)',
      bio: 'Performance storytelling: SEO, content, and paid.',
      skills: ['SEO', 'Paid Media', 'Analytics'],
      socials: { linkedin: '#', twitter: '#' },
    },
    {
      name: 'Jason Lee',
      role: 'Automation & AI',
      location: 'Remote',
      timezone: 'PST (UTC-8)',
      bio: 'Workflows, assistants, and data plumbing that scales.',
      skills: ['AI', 'Automation', 'Integrations'],
      socials: { github: '#', linkedin: '#' },
    },
    {
      name: 'Ananya Rao',
      role: 'Producer, Media',
      location: 'Chennai, IN',
      timezone: 'IST (UTC+5:30)',
      bio: 'From script to delivery—video that actually converts.',
      skills: ['Directing', 'Editing', 'Motion'],
      socials: { linkedin: '#' },
    },
  ];

  const techStack = [
    'Next.js', 'React', 'TypeScript', 'Node.js', 'Express', 'Postgres', 'MongoDB',
    'Vercel', 'AWS', 'Shopify', 'Stripe', 'WordPress', 'Headless CMS', 'Tailwind', 'Framer Motion',
    'OpenAI', 'LangChain', 'Zapier', 'Make', 'GA4', 'GTM',
  ];

  const testimonials = [
    {
      quote: 'Clear plan, fast delivery, and real business impact. They felt like an in‑house team.',
      name: 'Meera N.',
      role: 'Founder, D2C Beauty',
    },
    {
      quote: 'Doubled demo bookings after the site revamp and messaging cleanup.',
      name: 'Arjun S.',
      role: 'CEO, B2B SaaS',
    },
    {
      quote: 'Seamless move from offline to online—store, content, and automation sorted.',
      name: 'Kavita R.',
      role: 'Director, Retail',
    },
  ];

  const faq = [
    {
      q: 'What exactly do you do?',
      a: 'We are a full-service studio for brand, web/e‑commerce, AI & automation, and growth marketing. We can take you from idea to launch and scale.',
    },
    {
      q: 'How do projects usually run?',
      a: 'Discovery → Plan → Design → Build → Launch → Optimize. We work in weekly sprints with clear deliverables and transparent comms.',
    },
    {
      q: 'Can you work with our existing team?',
      a: 'Yes. We can collaborate with in‑house teams or other partners and slot into your workflow and tools.',
    },
    {
      q: 'Where are you located and what time zones do you support?',
      a: 'We are remote‑first with strong IST coverage and flexible overlap for EU/US time zones.',
    },
  ];

  const toggleFaq = (i: number) => {
    setOpenFaq(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const initials = (name: string) =>
    name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden"
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
            animate={{ rotate: [0, 360], scale: [1, 1.2, 1], opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: Math.random() * 20 + 15, repeat: Infinity, ease: 'linear' }}
          >
            <div
              className={`w-full h-full bg-gradient-to-br ${
                i % 2 === 0 ? 'from-purple-400 to-blue-400' : 'from-teal-400 to-green-400'
              } ${i % 3 === 0 ? 'rounded-full' : 'rounded-lg rotate-45'}`}
            />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div className="text-center mb-16 md:mb-20" variants={containerVariants} initial="hidden" animate={controls}>
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-6"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>
              <Sparkles className="w-5 h-5 text-purple-600" />
            </motion.div>
            <span className="text-sm font-semibold text-purple-700">ABOUT US</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Building brands and products that{' '}
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
              customers love
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We’re a digital studio helping founders and teams go from idea to impact with brand, web, AI, and growth — delivered with care.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 flex items-center justify-center gap-3">
            <Link to="/contact" className="inline-block">
              <motion.span
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-violet text-white font-semibold rounded-xl shadow-lg hover:shadow-xl"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <PhoneCall className="w-4 h-4" /> Talk to us
              </motion.span>
            </Link>
            <a href="#values" className="inline-block">
              <motion.span
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 text-gray-900 font-semibold rounded-xl border border-gray-200 hover:bg-white"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                Our values
              </motion.span>
            </a>
          </motion.div>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {stats.map((s, i) => (
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

        {/* Values */}
        <motion.div id="values" className="mb-16 md:mb-20" variants={containerVariants} initial="hidden" animate={controls}>
          <motion.div className="text-center mb-10" variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full mb-4">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">OUR VALUES</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What we stand for</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group p-6 rounded-2xl border border-gray-200 bg-white/80 hover:bg-white hover:shadow-lg transition"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${v.gradient} text-white flex items-center justify-center mb-4 shadow`}>
                  {v.icon}
                </div>
                <h3 className="font-semibold text-gray-900">{v.title}</h3>
                <p className="text-gray-600 mt-1">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <TechStack />

        {/* Testimonials */}
        <motion.div className="mb-16 md:mb-24" variants={containerVariants} initial="hidden" animate={controls}>
          <motion.div className="text-center mb-10" variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full mb-4">
              <Quote className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">WHAT CLIENTS SAY</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Real outcomes, real words</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={itemVariants} className="p-6 rounded-2xl border border-gray-200 bg-white/80">
                <Star className="w-5 h-5 text-amber-500" />
                <p className="text-gray-800 text-lg mt-3">“{t.quote}”</p>
                <div className="mt-4 text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">{t.name}</span> — {t.role}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        

        {/* CTA */}
        <motion.div className="mt-10 text-center" variants={itemVariants} initial="hidden" animate={controls}>
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.3),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.3),transparent_50%)]" />
            </div>

            <div className="relative z-10">
              <motion.div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6" whileHover={{ scale: 1.05 }}>
                <Users className="w-5 h-5" />
                <span className="text-sm font-semibold">READY TO CHAT?</span>
              </motion.div>

              <h3 className="text-3xl md:text-4xl font-bold mb-6">Let’s build something great together</h3>

              <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Tell us about your goals. We’ll share a clear plan with timelines and deliverables.
              </p>

              <Link to="/contact" className="inline-block">
                <motion.span
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PhoneCall className="w-5 h-5" />
                  Contact us
                </motion.span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPage;