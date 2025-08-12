import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, MoveRight, Sparkles } from "lucide-react";

// --- SectionHeader with animation & gradient text ---
interface SectionHeaderProps {
  title: string;
  subtitle: string;
}
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => (
  <motion.div
    className="mb-16 text-center"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-6">
      <Sparkles className="w-5 h-5 text-purple-600" />
      <span className="text-sm font-semibold text-purple-700 uppercase tracking-wider">
        Portfolio
      </span>
    </div>
    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 font-poppins mb-4">
      {title.split(" ").slice(0, -1).join(" ")}{" "}
      <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
        {title.split(" ").slice(-1)}
      </span>
    </h2>
    <p className="max-w-2xl mx-auto text-xl text-gray-600 font-poppins">
      {subtitle}
    </p>
  </motion.div>
);

// --- Project Data ---
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

const projectsData: Project[] = [
  {
    id: "p1",
    title: "TechStart Platform",
    description:
      "A comprehensive SaaS platform that helps startups manage their entire business lifecycle from ideation to scale. We implemented real-time collaboration features, AI-powered analytics, and seamless third-party integrations.",
    image:
      "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260",
    tags: ["React", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    id: "p2",
    title: "RetailMax Mobile",
    description:
      "Native mobile app for retail chain management with real-time inventory tracking and analytics. Features include barcode scanning, predictive stock management, and employee performance dashboards.",
    image:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260",
    tags: ["React Native", "Firebase", "Redux"],
  },
  {
    id: "p3",
    title: "FinanceFlow Dashboard",
    description:
      "Modern financial dashboard with advanced analytics and real-time market data visualization. Integrated with banking APIs and cryptocurrency exchanges to provide a comprehensive financial overview.",
    image:
      "https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=1260",
    tags: ["Vue.js", "D3.js", "Python"],
  },
  {
    id: "p4",
    title: "EcoTrack Analytics",
    description:
      "An environmental impact tracking dashboard for corporations to monitor their carbon footprint. Features include supply chain analysis, emission forecasting, and sustainability scoring.",
    image:
      "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260",
    tags: ["Svelte", "Go", "TimescaleDB"],
  },
  {
    id: "p5",
    title: "HealthSync Portal",
    description:
      "A secure portal for patients and doctors to manage appointments and health records. HIPAA-compliant with end-to-end encryption and telehealth integration.",
    image:
      "https://images.pexels.com/photos/3182822/pexels-photo-3182822.jpeg?auto=compress&cs=tinysrgb&w=1260",
    tags: ["Angular", "Firebase", "TypeScript"],
  },
  {
    id: "p6",
    title: "EduPro LMS",
    description:
      "A learning management system for schools and universities with real-time collaboration. Features include AI-powered grading, virtual classrooms, and plagiarism detection.",
    image:
      "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1260",
    tags: ["React", "Node.js", "MongoDB"],
  },
];

const Portfolio: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = projectsData.find((p) => p.id === selectedId);

  return (
    <section
      
      className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/50 relative overflow-hidden"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        {/* Floating blurred shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl opacity-50"
            style={{
              background:
                i % 2 === 0
                  ? "radial-gradient(circle, rgba(139,92,246,0.15), transparent)"
                  : "radial-gradient(circle, rgba(59,130,246,0.15), transparent)",
              width: Math.random() * 150 + 80,
              height: Math.random() * 150 + 80,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 30 - 15, 0],
              x: [0, Math.random() * 30 - 15, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeader
          title="Our Creative Projects"
          subtitle="Explore our carefully crafted projects that showcase our expertise and passion for innovation"
        />

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, idx) => (
            <motion.div
              key={project.id}
              layoutId={project.id}
              onClick={() => setSelectedId(project.id)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 h-80"
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <motion.img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
              <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                <div className="flex justify-between items-center">
                  <h3 className="text-white text-2xl font-bold font-poppins">
                    {project.title}
                  </h3>
                  <div className="bg-white/10 backdrop-blur-sm rounded-full p-2 group-hover:bg-purple-600 transition-colors">
                    <MoveRight className="text-white" size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedId && selectedProject && (
            <>
              <motion.div
                onClick={() => setSelectedId(null)}
                className="fixed inset-0 bg-black/70 z-40 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                  layoutId={selectedId}
                  className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <div className="md:w-1/2 relative">
                    <div className="h-64 md:h-full">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <motion.button
                      onClick={() => setSelectedId(null)}
                      className="absolute top-4 right-4 p-2 bg-white/80 rounded-full text-gray-700 hover:bg-white"
                      whileTap={{ scale: 0.9 }}
                    >
                      <X size={24} />
                    </motion.button>
                  </div>

                  <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[80vh]">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                      {selectedProject.title}
                    </h2>

                    <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                      {selectedProject.description}
                    </p>

                    <div className="mb-8">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.tags.map((tag, idx) => (
                          <motion.span
                            key={tag}
                            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl text-lg shadow-lg hover:shadow-xl transition-all"
                    >
                      View Live Project <ArrowUpRight size={24} />
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
