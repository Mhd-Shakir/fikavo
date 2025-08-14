// src/components/TechStackGuide.tsx
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  MoveRight,
  CheckCircle,
  Monitor,
  Server,
  Smartphone,
  Database as DatabaseIcon,
  Cloud,
  Shield,
  Bug,
  BarChart3,
  FileText,
} from 'lucide-react';

type Stage = 'mvp' | 'scale' | 'enterprise';

type Tool = {
  id: string;
  label: string;
  url?: string;
};

type Category = {
  key: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  tools: Tool[];
};

const stageLabels: Record<Stage, string> = {
  mvp: 'MVP',
  scale: 'Scale-up',
  enterprise: 'Enterprise',
};

const recommended: Record<Stage, string[]> = {
  mvp: [
    'nextjs',
    'react',
    'typescript',
    'tailwind',
    'tanstack-query',
    'node',
    'express',
    'prisma',
    'postgres',
    'vercel',
    'github-actions',
    'authjs',
    'clerk',
    'plausible',
    'sentry',
    'playwright',
  ],
  scale: [
    'nextjs',
    'react',
    'typescript',
    'tailwind',
    'tanstack-query',
    'nest',
    'graphql',
    'postgres',
    'redis',
    'aws',
    'docker',
    'github-actions',
    'auth0',
    'sentry',
    'grafana',
    'prometheus',
    'cypress',
  ],
  enterprise: [
    'nextjs',
    'react',
    'typescript',
    'tailwind',
    'nest',
    'go',
    'graphql',
    'postgres',
    'redis',
    'aws',
    'kubernetes',
    'docker',
    'auth0',
    'okta',
    'sentry',
    'datadog',
    'cypress',
    'contentful',
  ],
};

const categories: Category[] = [
  {
    key: 'frontend',
    title: 'Frontend',
    icon: <Monitor className="w-5 h-5 text-purple-600" />,
    description: 'Build fast, accessible UIs with a modern React stack.',
    tools: [
      { id: 'nextjs', label: 'Next.js', url: 'https://nextjs.org/docs' },
      { id: 'react', label: 'React', url: 'https://react.dev/learn' },
      { id: 'typescript', label: 'TypeScript', url: 'https://www.typescriptlang.org/docs/' },
      { id: 'tailwind', label: 'Tailwind CSS', url: 'https://tailwindcss.com/docs' },
      { id: 'framer-motion', label: 'Framer Motion', url: 'https://www.framer.com/motion/' },
      { id: 'tanstack-query', label: 'TanStack Query', url: 'https://tanstack.com/query/latest' },
      { id: 'redux-toolkit', label: 'Redux Toolkit', url: 'https://redux-toolkit.js.org/' },
    ],
  },
  {
    key: 'backend',
    title: 'Backend',
    icon: <Server className="w-5 h-5 text-purple-600" />,
    description: 'APIs and services for scale, reliability, and speed.',
    tools: [
      { id: 'node', label: 'Node.js', url: 'https://nodejs.org/en' },
      { id: 'express', label: 'Express', url: 'https://expressjs.com/' },
      { id: 'nest', label: 'NestJS', url: 'https://docs.nestjs.com/' },
      { id: 'fastapi', label: 'FastAPI (Python)', url: 'https://fastapi.tiangolo.com/' },
      { id: 'go', label: 'Go', url: 'https://go.dev/doc/' },
      { id: 'graphql', label: 'GraphQL', url: 'https://graphql.org/learn/' },
    ],
  },
  {
    key: 'mobile',
    title: 'Mobile',
    icon: <Smartphone className="w-5 h-5 text-purple-600" />,
    description: 'Cross-platform apps with native performance.',
    tools: [
      { id: 'react-native', label: 'React Native', url: 'https://reactnative.dev/docs/getting-started' },
      { id: 'flutter', label: 'Flutter', url: 'https://docs.flutter.dev/' },
    ],
  },
  {
    key: 'database',
    title: 'Database',
    icon: <DatabaseIcon className="w-5 h-5 text-purple-600" />,
    description: 'Choose the right storage for your data model and scale.',
    tools: [
      { id: 'postgres', label: 'PostgreSQL', url: 'https://www.postgresql.org/docs/' },
      { id: 'mongodb', label: 'MongoDB', url: 'https://www.mongodb.com/docs/' },
      { id: 'redis', label: 'Redis', url: 'https://redis.io/docs/latest/' },
      { id: 'prisma', label: 'Prisma ORM', url: 'https://www.prisma.io/docs' },
    ],
  },
  {
    key: 'cloud',
    title: 'Cloud & DevOps',
    icon: <Cloud className="w-5 h-5 text-purple-600" />,
    description: 'Deploy, observe, and iterate with modern DevOps.',
    tools: [
      { id: 'vercel', label: 'Vercel', url: 'https://vercel.com/docs' },
      { id: 'aws', label: 'AWS', url: 'https://docs.aws.amazon.com/' },
      { id: 'docker', label: 'Docker', url: 'https://docs.docker.com/' },
      { id: 'kubernetes', label: 'Kubernetes', url: 'https://kubernetes.io/docs/home/' },
      { id: 'github-actions', label: 'GitHub Actions', url: 'https://docs.github.com/actions' },
    ],
  },
  {
    key: 'auth',
    title: 'Auth & Security',
    icon: <Shield className="w-5 h-5 text-purple-600" />,
    description: 'Secure auth, permissions, and best practices.',
    tools: [
      { id: 'authjs', label: 'NextAuth/Auth.js', url: 'https://authjs.dev/' },
      { id: 'clerk', label: 'Clerk', url: 'https://clerk.com/docs' },
      { id: 'auth0', label: 'Auth0', url: 'https://auth0.com/docs' },
      { id: 'okta', label: 'Okta', url: 'https://developer.okta.com/docs/' },
      { id: 'jwt', label: 'JWT', url: 'https://jwt.io/introduction' },
    ],
  },
  {
    key: 'testing',
    title: 'Testing & QA',
    icon: <Bug className="w-5 h-5 text-purple-600" />,
    description: 'Confidence with unit, integration, and e2e tests.',
    tools: [
      { id: 'jest', label: 'Jest', url: 'https://jestjs.io/docs/getting-started' },
      { id: 'vitest', label: 'Vitest', url: 'https://vitest.dev/guide/' },
      { id: 'testing-library', label: 'Testing Library', url: 'https://testing-library.com/docs/' },
      { id: 'cypress', label: 'Cypress', url: 'https://docs.cypress.io/' },
      { id: 'playwright', label: 'Playwright', url: 'https://playwright.dev/docs/intro' },
    ],
  },
  {
    key: 'analytics',
    title: 'Analytics & Monitoring',
    icon: <BarChart3 className="w-5 h-5 text-purple-600" />,
    description: 'Know what’s happening and why, in real time.',
    tools: [
      { id: 'plausible', label: 'Plausible', url: 'https://plausible.io/docs' },
      { id: 'posthog', label: 'PostHog', url: 'https://posthog.com/docs' },
      { id: 'sentry', label: 'Sentry', url: 'https://docs.sentry.io/' },
      { id: 'grafana', label: 'Grafana', url: 'https://grafana.com/docs/' },
      { id: 'prometheus', label: 'Prometheus', url: 'https://prometheus.io/docs/introduction/overview/' },
      { id: 'datadog', label: 'Datadog', url: 'https://docs.datadoghq.com/' },
    ],
  },
  {
    key: 'cms',
    title: 'CMS & Content',
    icon: <FileText className="w-5 h-5 text-purple-600" />,
    description: 'Headless CMS options for marketing and content ops.',
    tools: [
      { id: 'sanity', label: 'Sanity', url: 'https://www.sanity.io/docs' },
      { id: 'contentful', label: 'Contentful', url: 'https://www.contentful.com/developers/docs/' },
      { id: 'strapi', label: 'Strapi', url: 'https://docs.strapi.io/' },
      { id: 'wordpress', label: 'WordPress (Headless)', url: 'https://developer.wordpress.org/rest-api/' },
    ],
  },
];

const TechStackGuide: React.FC = () => {
  const [stage, setStage] = useState<Stage>('mvp');

  const isRecommended = useMemo(() => {
    const set = new Set(recommended[stage]);
    return (toolId: string) => set.has(toolId);
  }, [stage]);

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/50 overflow-hidden">
      {/* Floating Gradient Shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{
            background:
              i % 2 === 0
                ? 'radial-gradient(circle, rgba(139,92,246,0.15), transparent)'
                : 'radial-gradient(circle, rgba(59,130,246,0.15), transparent)',
            width: Math.random() * 200 + 120,
            height: Math.random() * 200 + 120,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 24 - 12, 0],
            x: [0, Math.random() * 24 - 12, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 relative z-10">
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
            Tech Stack <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">Guide</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600 font-poppins">
            Curated tools and platforms we recommend for different stages—MVP, scale, and enterprise.
          </p>
        </motion.div>

        {/* Stage selector */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {(['mvp', 'scale', 'enterprise'] as Stage[]).map((opt) => {
            const active = opt === stage;
            return (
              <button
                key={opt}
                onClick={() => setStage(opt)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  active
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {stageLabels[opt]}
              </button>
            );
          })}
        </div>

        {/* Quick overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            className={`rounded-2xl border p-6 bg-white shadow-sm ${
              stage === 'mvp' ? 'border-purple-300' : 'border-gray-200'
            }`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-sm font-semibold text-purple-700 mb-2">MVP</div>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li>Next.js (React), TypeScript, Tailwind</li>
              <li>Node.js (Express) API or Next API Routes</li>
              <li>PostgreSQL + Prisma (Supabase optional)</li>
              <li>Auth.js or Clerk, deploy on Vercel</li>
              <li>Plausible, Sentry, Playwright</li>
            </ul>
          </motion.div>

          <motion.div
            className={`rounded-2xl border p-6 bg-white shadow-sm ${
              stage === 'scale' ? 'border-purple-300' : 'border-gray-200'
            }`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="text-sm font-semibold text-purple-700 mb-2">Scale-up</div>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li>Next.js, TanStack Query, design system</li>
              <li>NestJS or FastAPI, GraphQL gateway</li>
              <li>PostgreSQL + Redis, Docker, AWS</li>
              <li>Auth0, GitHub Actions CI/CD</li>
              <li>Sentry, Grafana + Prometheus, Cypress</li>
            </ul>
          </motion.div>

          <motion.div
            className={`rounded-2xl border p-6 bg-white shadow-sm ${
              stage === 'enterprise' ? 'border-purple-300' : 'border-gray-200'
            }`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-sm font-semibold text-purple-700 mb-2">Enterprise</div>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li>Next.js, monorepo, strict TypeScript</li>
              <li>NestJS + Go microservices, GraphQL</li>
              <li>PostgreSQL, Redis, Kubernetes on AWS</li>
              <li>SSO (Okta/Auth0), policies & secrets</li>
              <li>Sentry, Datadog, E2E + contract tests</li>
            </ul>
          </motion.div>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.key}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-2">
                {cat.icon}
                <h3 className="text-lg font-semibold text-gray-900 font-poppins">{cat.title}</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">{cat.description}</p>

              <div className="flex flex-wrap gap-2">
                {cat.tools.map((tool) => {
                  const recommendedHere = isRecommended(tool.id);
                  return (
                    <a
                      key={tool.id}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-all ${
                        recommendedHere
                          ? 'border-purple-300 bg-purple-50 text-purple-800 hover:bg-purple-100'
                          : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                      title={recommendedHere ? `Recommended for ${stageLabels[stage]}` : undefined}
                    >
                      {recommendedHere && <CheckCircle className="w-3.5 h-3.5 text-purple-600" />}
                      <span>{tool.label}</span>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 md:mt-16 text-center bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 p-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-700 mb-4">
            Not sure which stack fits your product? We’ll recommend a path in a 20‑min call.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-purple-600 to-blue-600 shadow hover:shadow-md transition-all"
          >
            Get free consultation <MoveRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackGuide;