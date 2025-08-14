// src/components/FAQ.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

type FaqItem = {
  id: string;
  question: string;
  answer: React.ReactNode;
  category: string;
};

const faqData: FaqItem[] = [
  {
    id: 'q1',
    question: 'What services does Fikavo provide?',
    answer: (
      <div className="space-y-2">
        <p>We design, build, and grow digital products end-to-end. Our core offerings include:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Startup Launchpad (MVPs, product strategy)</li>
          <li>Digital Transformation (workflows, automation)</li>
          <li>Web Development (frontend, backend, APIs)</li>
          <li>Branding (identity, design systems)</li>
          <li>Digital Marketing (SEO, content, performance)</li>
        </ul>
        <p>
          Explore details on our Services page:{' '}
          <a className="text-indigo-700 underline" href="/services">
            /services
          </a>
        </p>
      </div>
    ),
    category: 'General',
  },
  {
    id: 'q2',
    question: 'How does your process work?',
    answer: (
      <ol className="list-decimal pl-5 space-y-2">
        <li>Discovery: goals, scope, success metrics</li>
        <li>Proposal: roadmap, timeline, budget</li>
        <li>Design & Build: iterative sprints with demos</li>
        <li>QA & Launch: testing, hardening, deployment</li>
        <li>Grow: analytics, optimization, support</li>
      </ol>
    ),
    category: 'Process',
  },
  {
    id: 'q3',
    question: 'What is the typical project timeline?',
    answer: (
      <p>
        Timelines vary based on scope. As a guide: landing pages 1–2 weeks, MVPs 4–8 weeks, full
        platforms 8–16+ weeks. We share a detailed roadmap during Discovery.
      </p>
    ),
    category: 'Process',
  },
  {
    id: 'q4',
    question: 'What tech stack do you use?',
    answer: (
      <p>
        We commonly use React/Next.js, Node.js, Python/Go, PostgreSQL/MongoDB, and cloud on AWS/GCP.
        For data viz and real-time features we use tools like D3, WebSockets, and Firebase where it
        fits.
      </p>
    ),
    category: 'Technology',
  },
  {
    id: 'q5',
    question: 'How do you price projects?',
    answer: (
      <div className="space-y-2">
        <p>We offer two models:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Fixed price for well-defined scopes</li>
          <li>Sprint-based (T&amp;M) for evolving products</li>
        </ul>
        <p>
          Get a fast ballpark via a free consultation:{' '}
          <a className="text-indigo-700 underline" href="/resources/free-consultation">
            /resources/free-consultation
          </a>
        </p>
      </div>
    ),
    category: 'Pricing',
  },
  {
    id: 'q6',
    question: 'Do you sign NDAs and who owns the IP?',
    answer: (
      <p>
        Yes, we sign NDAs upon request. You retain full ownership of IP, code, and assets upon
        payment as outlined in our MSA.
      </p>
    ),
    category: 'Legal',
  },
  {
    id: 'q7',
    question: 'Do you provide post-launch support and SLAs?',
    answer: (
      <p>
        We offer support plans, monitoring, and SLAs with defined response times and escalation. Ask
        about our support tiers at{' '}
        <a className="text-indigo-700 underline" href="/support">
          /support
        </a>
        .
      </p>
    ),
    category: 'Support',
  },
  {
    id: 'q8',
    question: 'How can we get started?',
    answer: (
      <p>
        Book a free consultation or email us at{' '}
        <a className="text-indigo-700 underline" href="mailto:fikavocollective@gmail.com">
          fikavocollective@gmail.com
        </a>{' '}
        or call{' '}
        <a className="text-indigo-700 underline" href="tel:+918157000282">
          +91 81570 00282
        </a>
        .
      </p>
    ),
    category: 'General',
  },
];

const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(faqData[0]?.id ?? null);

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/50 overflow-hidden">
      {/* Floating Gradient Shapes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{
            background:
              i % 2 === 0
                ? 'radial-gradient(circle, rgba(139,92,246,0.15), transparent)'
                : 'radial-gradient(circle, rgba(59,130,246,0.15), transparent)',
            width: Math.random() * 180 + 120,
            height: Math.random() * 180 + 120,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 20 - 10, 0],
            x: [0, Math.random() * 20 - 10, 0],
          }}
          transition={{ duration: Math.random() * 8 + 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-5">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700 uppercase tracking-wider">
              Resources
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 font-poppins mb-3">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600 font-poppins">
            Everything you need to know about working with us, our process, and what to expect.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            const contentId = `faq-panel-${item.id}`;
            return (
              <motion.div
                key={item.id}
                layout
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  className="w-full flex items-center justify-between gap-4 text-left p-5 md:p-6 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-purple-600 mt-1 shrink-0" />
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 font-poppins">
                        {item.question}
                      </h3>
                      <span className="inline-block mt-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={contentId}
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-6 text-gray-700 leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <motion.div
          className="mt-12 md:mt-16 text-center bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 p-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-700">
            Still have questions? Reach us at{' '}
            <a className="text-indigo-700 underline" href="mailto:fikavocollective@gmail.com">
              fikavocollective@gmail.com
            </a>{' '}
            or{' '}
            <a className="text-indigo-700 underline" href="tel:+918157000282">
              +91 81570 00282
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;