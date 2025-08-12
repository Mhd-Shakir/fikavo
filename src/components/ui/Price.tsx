// PricingVertical.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

type Plan = {
  name: string;
  price: string;
  desc: string;
  features: string[];
  gradient: string;   // e.g., 'from-purple-500 to-pink-500'
  popular?: boolean;
};

const plans: Plan[] = [
  {
    name: 'Starter',
    price: '$1,499+',
    desc: 'Perfect for new ideas and MVPs',
    gradient: 'from-purple-500 to-pink-500',
    features: ['Brand essentials', '1–3 page site', 'Basic analytics', 'Email capture'],
  },
  {
    name: 'Growth',
    price: '$3,999+',
    desc: 'Scaling with conversions in mind',
    gradient: 'from-blue-500 to-teal-500',
    popular: true,
    features: ['Full website / store', 'SEO + performance', 'Automation + CRM', 'Launch support'],
  },
  {
    name: 'Scale',
    price: 'Custom',
    desc: 'Complex, enterprise-grade stacks',
    gradient: 'from-emerald-500 to-cyan-600',
    features: ['Headless / integrations', 'Security & compliance', 'SLAs & training', 'Ongoing optimization'],
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 14 } },
};

const PricingVertical: React.FC = () => {
  return (
    <section className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full mb-4">
          <Star className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-semibold text-blue-700">Pricing</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Choose the plan that fits</h2>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="space-y-4"
        role="list"
      >
        {plans.map((p, i) => (
          <motion.div
            key={i}
            variants={item}
            role="listitem"
            className={`relative rounded-2xl border ${p.popular ? 'border-gray-300 bg-white shadow-lg' : 'border-gray-200 bg-white/80'} overflow-hidden`}
          >
            {/* Accent strip */}
            <div className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${p.gradient}`} />

            {/* Badge */}
            {p.popular && (
              <div className="absolute right-4 top-4 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gray-900 text-white">
                Most Popular
              </div>
            )}

            <div className="p-6">
              <div className="flex items-start gap-4 justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{p.name}</h3>
                  <p className="text-gray-600 mt-1">{p.desc}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-extrabold text-gray-900">{p.price}</div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {p.features.map((f, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    {f}
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center w-full md:w-auto px-5 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 font-semibold text-gray-900 transition"
                  aria-label={`Choose ${p.name} plan and contact`}
                >
                  Choose plan
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default PricingVertical;