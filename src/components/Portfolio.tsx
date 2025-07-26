import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Placeholder for ui/SectionHeader ---
interface SectionHeaderProps {
  title: string;
  subtitle: string;
}
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => (
  <div className="mb-12 text-center">
    <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl font-poppins">
      {title}
    </h2>
    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 font-poppins">{subtitle}</p>
  </div>
);
// --- End of Placeholder ---

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

const projectsData: Project[] = [
  {
    id: 'p1',
    title: 'TechStart Platform',
    category: 'Startup Launchpad',
    description: 'A comprehensive SaaS platform that helps startups manage their entire business lifecycle from ideation to scale.',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260',
    tags: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    featured: true,
  },
  {
    id: 'p2',
    title: 'RetailMax Mobile',
    category: 'Mobile Solutions',
    description: 'Native mobile app for retail chain management with real-time inventory tracking and analytics.',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260',
    tags: ['React Native', 'Firebase', 'Redux'],
  },
  {
    id: 'p3',
    title: 'FinanceFlow Dashboard',
    category: 'Web Development',
    description: 'Modern financial dashboard with advanced analytics and real-time market data visualization.',
    image: 'https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=1260',
    tags: ['Vue.js', 'D3.js', 'Python'],
  },
  {
    id: 'p4',
    title: 'EcoTrack Analytics',
    category: 'Data Visualization',
    description: 'An environmental impact tracking dashboard for corporations to monitor their carbon footprint.',
    image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260',
    tags: ['Svelte', 'Go', 'TimescaleDB'],
  },
  {
    id: 'p5',
    title: 'HealthSync Portal',
    category: 'Healthcare',
    description: 'A secure portal for patients and doctors to manage appointments and health records.',
    image: 'https://images.pexels.com/photos/3182822/pexels-photo-3182822.jpeg?auto=compress&cs=tinysrgb&w=1260',
    tags: ['Angular', 'Firebase', 'TypeScript'],
  },
  {
    id: 'p6',
    title: 'EduPro LMS',
    category: 'EdTech',
    description: 'A learning management system for schools and universities with real-time collaboration.',
    image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1260',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
];

// Responsive cards per view
function getCardsPerView() {
  if (typeof window === 'undefined') return 1;
  if (window.innerWidth >= 1280) return 4;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

const CARD_ASPECT_RATIO = 16 / 9; // width / height

const Portfolio: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(getCardsPerView());
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleResize() {
      setCardsPerView(getCardsPerView());
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, [cardsPerView]);

  const maxIndex = Math.max(0, projectsData.length - cardsPerView);

  const next = () => setCurrent((prev) => Math.min(prev + 1, maxIndex));
  const prev = () => setCurrent((prev) => Math.max(prev - 1, 0));

  const selectedProject = projectsData.find(p => p.id === selectedId);

  // Calculate card height based on width and aspect ratio
  const cardWidth = containerWidth / cardsPerView;
  const cardHeight = cardWidth / CARD_ASPECT_RATIO;

  return (
    <section id="work" className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Crafted with Passion"
          subtitle="We don’t just build products; we build experiences. Here’s a look at some of the challenges we’ve solved."
        />

        <div className="relative w-full" ref={containerRef}>
          {/* Arrows */}
          <button
            onClick={prev}
            disabled={current === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition ${current === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Previous"
            style={{ marginLeft: '-1.5rem' }}
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={next}
            disabled={current === maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition ${current === maxIndex ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Next"
            style={{ marginRight: '-1.5rem' }}
          >
            <ChevronRight size={28} />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden w-full">
            <motion.div
              className="flex gap-6"
              style={{
                width: `${(projectsData.length / cardsPerView) * 100}%`,
                height: cardHeight ? `${cardHeight}px` : 'auto',
              }}
              animate={{
                x: `-${(current * (100 / projectsData.length))}%`,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {projectsData.map((project) => (
                <div
                  key={project.id}
                  className="flex-shrink-0"
                  style={{
                    width: `${100 / projectsData.length}%`,
                    maxWidth: `${100 / cardsPerView}%`,
                    minWidth: `${100 / cardsPerView}%`,
                    height: cardHeight ? `${cardHeight}px` : 'auto',
                  }}
                >
                  <motion.div
                    layoutId={project.id}
                    onClick={() => setSelectedId(project.id)}
                    className="relative rounded-xl overflow-hidden cursor-pointer group shadow hover:shadow-lg transition h-full"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="w-full h-full">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        style={{ aspectRatio: '16/9', height: '100%' }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-white text-2xl font-bold font-poppins">{project.title}</h3>
                      <p className="text-white/80 font-poppins">{project.category}</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full ${current === idx ? 'bg-brand-violet' : 'bg-gray-300'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Expanded Modal */}
        <AnimatePresence>
          {selectedId && selectedProject && (
            <>
              <motion.div
                onClick={() => setSelectedId(null)}
                className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div layoutId={selectedId} className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div className="relative">
                    <div className="aspect-w-16 aspect-h-9">
                      <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                    </div>
                    <motion.button
                      onClick={() => setSelectedId(null)}
                      className="absolute top-4 right-4 p-2 bg-white/80 rounded-full text-gray-700 hover:bg-white"
                      whileTap={{ scale: 0.9 }}
                    >
                      <X size={24} />
                    </motion.button>
                  </div>
                  <div className="p-8">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                      className="text-3xl font-bold font-poppins text-brand-dark mb-2"
                    >
                      {selectedProject.title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: 0.25 } }}
                      className="text-brand-violet font-semibold font-poppins mb-4"
                    >
                      {selectedProject.category}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                      className="text-gray-600 font-poppins leading-relaxed mb-6"
                    >
                      {selectedProject.description}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: 0.35 } }}
                      className="flex flex-wrap gap-2 mb-8"
                    >
                      {selectedProject.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium font-poppins rounded-full">{tag}</span>
                      ))}
                    </motion.div>
                    <motion.a
                      href="#"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-brand-violet text-white font-semibold font-poppins rounded-lg"
                    >
                      View Live Project <ArrowUpRight size={20} />
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;