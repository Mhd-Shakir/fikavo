// Frontend/src/components/Projects.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

// --- Types ---
interface Project {
  _id: string;
  title: string;
  image: string;
  date: string;
  link?: string; // Optional project link
  createdAt: string;
  updatedAt: string;
}

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
        Projects
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

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/projects`);
        const data = await response.json();

        if (data.success) {
          // Sort by updatedAt in descending order (most recent first) and take only 6
          const sortedProjects = data.projects
            .sort((a: Project, b: Project) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
            .slice(0, 6);
          setProjects(sortedProjects);
        } else {
          setError('Failed to load projects');
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/50 relative overflow-hidden">
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

        {/* No projects message */}
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No projects to display yet.</p>
            <p className="text-gray-500">Check back soon for our amazing work!</p>
          </div>
        ) : (
          <>
            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <motion.div
                  key={project._id}
                  className="group relative  overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-80 cursor-pointer"
                  whileHover={{ y: -8 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  onClick={() => {
                    if (project.link) {
                      window.open(project.link, '_blank', 'noopener,noreferrer');
                    }
                  }}
                >
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-fit"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    draggable={false}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://via.placeholder.com/1200x800?text=Project";
                    }}
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

            {/* View All Button */}
            <div className="text-center mt-12">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-700 transition-colors"
              >
                View All Projects
                <MoveRight size={20} />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Portfolio;