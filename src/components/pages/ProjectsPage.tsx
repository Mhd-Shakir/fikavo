// Frontend/src/pages/ProjectsPage.tsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { MoveRight, Sparkles, Search, ExternalLink } from "lucide-react";

// --- Types ---
interface Project {
  _id: string;
  title: string;
  image: string;
  date: string;
  link?: string;
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
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 mb-6">
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

// Enhanced Project Card Component with scroll-based animations
interface ProjectCardProps {
  project: Project;
  index: number;
  onProjectClick: (project: Project) => void;
  formatDate: (dateString: string) => string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onProjectClick, formatDate }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "0px 0px -100px 0px" });
  
  // Different animation variants for variety
  const animationVariants = [
    {
      // Slide from left
      initial: { opacity: 0, x: -60, rotateY: -15 },
      animate: { opacity: 1, x: 0, rotateY: 0 },
      whileHover: { y: -8, rotateX: 5, scale: 1.02 }
    },
    {
      // Slide from right
      initial: { opacity: 0, x: 60, rotateY: 15 },
      animate: { opacity: 1, x: 0, rotateY: 0 },
      whileHover: { y: -8, rotateX: -5, scale: 1.02 }
    },
    {
      // Scale and fade
      initial: { opacity: 0, scale: 0.8, rotateZ: -5 },
      animate: { opacity: 1, scale: 1, rotateZ: 0 },
      whileHover: { y: -10, rotateZ: 2, scale: 1.03 }
    },
    {
      // Slide from bottom with tilt
      initial: { opacity: 0, y: 60, rotateX: 15 },
      animate: { opacity: 1, y: 0, rotateX: 0 },
      whileHover: { y: -6, rotateY: 8, scale: 1.02 }
    },
    {
      // Flip animation
      initial: { opacity: 0, rotateY: 90, scale: 0.8 },
      animate: { opacity: 1, rotateY: 0, scale: 1 },
      whileHover: { y: -8, rotateY: -8, scale: 1.02 }
    },
    {
      // Bounce in with rotation
      initial: { opacity: 0, y: -40, rotateZ: 10, scale: 0.9 },
      animate: { opacity: 1, y: 0, rotateZ: 0, scale: 1 },
      whileHover: { y: -8, rotateZ: -5, scale: 1.03 }
    }
  ];
  
  const variant = animationVariants[index % animationVariants.length];
  
  return (
    <motion.div
      ref={cardRef}
      className={`group relative overflow-hidden border border-gray-200 bg-white shadow-sm ${
        project.link ? 'cursor-pointer' : 'cursor-default'
      }`}
      style={{ perspective: "1000px" }}
      initial={variant.initial}
      animate={isInView ? variant.animate : variant.initial}
      whileHover={variant.whileHover}
      transition={{
        duration: 0.6,
        delay: (index % 6) * 0.1,
        ease: "easeOut"
      }}
      onClick={() => onProjectClick(project)}
    >
      {/* Project Image */}
      <div className="aspect-video relative overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          initial={{ scale: 1.1 }}
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.6 }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://via.placeholder.com/800x450?text=Project";
          }}
        />
        
        {/* Animated overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Overlay Content with staggered animation */}
        {project.link && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <motion.div 
              className="bg-white/90 backdrop-blur-sm p-3"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <ExternalLink className="text-purple-600" size={20} />
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Project Content with staggered text animation */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <motion.h3 
            className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: (index % 6) * 0.1 + 0.2 }}
          >
            {project.title}
          </motion.h3>
          
          {project.link && (
            <motion.div 
              className="flex-shrink-0"
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <MoveRight className="text-purple-600" size={18} />
              </motion.div>
            </motion.div>
          )}
        </div>
        
        <motion.p 
          className="text-gray-500 text-sm mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: (index % 6) * 0.1 + 0.3 }}
        >
          {formatDate(project.date)}
        </motion.p>

        {project.link && (
          <motion.div 
            className="inline-flex items-center gap-1 text-sm font-medium text-purple-600 group-hover:text-purple-700 transition-colors"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: (index % 6) * 0.1 + 0.4 }}
            whileHover={{ x: 5 }}
          >
            <span>View Project</span>
            <ExternalLink size={14} />
          </motion.div>
        )}
      </div>

      {/* Animated border effect */}
      <motion.div 
        className="absolute inset-0 border-2 border-purple-200 pointer-events-none"
        initial={{ opacity: 0, scale: 1.02 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Subtle glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-blue-500/0 to-purple-500/0 pointer-events-none"
        whileHover={{
          background: "linear-gradient(90deg, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.1) 50%, rgba(139,92,246,0.1) 100%)"
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/projects`);
        const data = await response.json();

        if (data.success) {
          const sortedProjects = data.projects.sort((a: Project, b: Project) => 
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
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

  // Filtered projects
  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (!q) return true;
      return p.title.toLowerCase().includes(q);
    });
  }, [projects, query]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleProjectClick = (project: Project) => {
    if (project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <motion.div 
              className="h-12 w-12 border-b-2 border-purple-600 mx-auto"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{ borderRadius: "50%" }}
            />
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
            <motion.button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>
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
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute blur-3xl opacity-50"
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

        {/* Search Controls */}
        <motion.div 
          className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white"
            />
          </div>
        </motion.div>

        {/* Count */}
        <motion.div 
          className="mb-8 text-center text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
          {query ? ` for "${query}"` : ""}
        </motion.div>

        {/* No projects message */}
        {filteredProjects.length === 0 ? (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {query ? (
              <>
                <p className="text-gray-600 text-lg mb-4">No projects found for "{query}"</p>
                <motion.button 
                  onClick={() => setQuery("")}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear search
                </motion.button>
              </>
            ) : (
              <>
                <p className="text-gray-600 text-lg mb-4">No projects to display yet.</p>
                <p className="text-gray-500">Check back soon for our amazing work!</p>
              </>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project._id}
                project={project}
                index={idx}
                onProjectClick={handleProjectClick}
                formatDate={formatDate}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsPage;