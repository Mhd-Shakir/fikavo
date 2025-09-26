// Frontend/src/components/Projects.tsx
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Sparkles, MoveRight, ExternalLink, Code, Palette } from "lucide-react";
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

// --- SectionHeader with enhanced scroll animations ---
interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="mb-16 text-center"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-6"
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
        transition={{ 
          duration: 0.6, 
          delay: 0.2,
          type: "spring",
          stiffness: 200
        }}
      >
        <motion.div
          animate={isInView ? { rotate: 360 } : { rotate: 0 }}
          transition={{ 
            duration: 2,
            delay: 0.8,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          <Sparkles className="w-5 h-5 text-purple-600" />
        </motion.div>
        <span className="text-sm font-semibold text-purple-700 uppercase tracking-wider">
          Projects
        </span>
      </motion.div>

      <motion.h2
        className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 font-poppins mb-4"
        initial={{ y: 50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.4,
          type: "spring",
          stiffness: 100
        }}
      >
        {title.split(" ").slice(0, -1).join(" ")}{" "}
        <motion.span 
          className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent"
          initial={{ backgroundPosition: "200% center" }}
          animate={isInView ? { backgroundPosition: "0% center" } : { backgroundPosition: "200% center" }}
          transition={{ duration: 1.2, delay: 0.6 }}
          style={{
            backgroundSize: "200% 100%"
          }}
        >
          {title.split(" ").slice(-1)}
        </motion.span>
      </motion.h2>

      <motion.p
        className="max-w-2xl mx-auto text-xl text-gray-600 font-poppins"
        initial={{ y: 30, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
};

// --- Enhanced Project Card Component ---
interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Different animation variants based on index
  const getAnimationVariant = (index: number) => {
    const variants = [
      // Slide from left
      {
        initial: { x: -100, opacity: 0, rotate: -5 },
        animate: { x: 0, opacity: 1, rotate: 0 }
      },
      // Slide from right  
      {
        initial: { x: 100, opacity: 0, rotate: 5 },
        animate: { x: 0, opacity: 1, rotate: 0 }
      },
      // Scale up
      {
        initial: { scale: 0.8, opacity: 0, y: 50 },
        animate: { scale: 1, opacity: 1, y: 0 }
      },
      // Flip in
      {
        initial: { rotateY: -90, opacity: 0 },
        animate: { rotateY: 0, opacity: 1 }
      },
      // Bounce from bottom
      {
        initial: { y: 100, opacity: 0, scale: 0.5 },
        animate: { y: 0, opacity: 1, scale: 1 }
      },
      // Spiral in
      {
        initial: { scale: 0, rotate: 180, opacity: 0 },
        animate: { scale: 1, rotate: 0, opacity: 1 }
      }
    ];
    return variants[index % variants.length];
  };

  const animationVariant = getAnimationVariant(index);

  // Parallax effect based on scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      style={{ y, scale }}
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-52 cursor-pointer"
      initial={animationVariant.initial}
      animate={isInView ? animationVariant.animate : animationVariant.initial}
      transition={{ 
        delay: index * 0.15, 
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: -12,
        rotateX: 2,
        rotateY: 2,
        scale: 1.02
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => {
        if (project.link) {
          window.open(project.link, '_blank', 'noopener,noreferrer');
        }
      }}
    >
      {/* Image with enhanced hover effects */}
      <motion.img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        draggable={false}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            "https://via.placeholder.com/1200x800?text=Project";
        }}
      />

      {/* Animated overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"
        animate={isHovered ? { opacity: 0.9 } : { opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating particles effect on hover */}
      <AnimatePresence>
        {isHovered && (
          <div className="absolute inset-0 z-15 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  y: [0, -30],
                  x: [0, Math.random() * 20 - 10]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Content section with staggered animations */}
      <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
        <motion.div 
          className="flex justify-between items-center"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ delay: index * 0.15 + 0.5, duration: 0.6 }}
        >
          <motion.h3 
            className="text-white text-lg md:text-xl font-bold font-poppins"
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>
          
          <motion.div
            className="flex gap-2"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: index * 0.15 + 0.7, duration: 0.4 }}
          >
            {project.link && (
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-full p-2 group-hover:bg-purple-600 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="text-white" size={16} />
              </motion.div>
            )}
            
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-full p-2 group-hover:bg-blue-600 transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: -15 }}
              whileTap={{ scale: 0.95 }}
            >
              <MoveRight className="text-white" size={16} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Animated progress bar */}
        <motion.div
          className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: index * 0.15 + 0.9, duration: 0.8 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
            initial={{ x: "-100%" }}
            animate={isHovered ? { x: "0%" } : { x: "-100%" }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>
      </div>

      {/* Corner decoration */}
      <motion.div
        className="absolute top-4 right-4 z-20"
        initial={{ scale: 0, rotate: -90 }}
        animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -90 }}
        transition={{ delay: index * 0.15 + 0.6, duration: 0.5 }}
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-full p-2">
          {index % 3 === 0 ? (
            <Code className="text-white/70" size={14} />
          ) : index % 3 === 1 ? (
            <Palette className="text-white/70" size={14} />
          ) : (
            <Sparkles className="text-white/70" size={14} />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef(null);

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
            <motion.div
              className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.p 
              className="mt-4 text-gray-600"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Loading projects...
            </motion.p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-red-600">{error}</p>
            <motion.button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={containerRef}
      className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/50 relative overflow-hidden"
    >
      {/* Enhanced background patterns with animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"
          animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Enhanced floating blurred shapes */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl opacity-30"
            style={{
              background:
                i % 3 === 0
                  ? "radial-gradient(circle, rgba(139,92,246,0.2), transparent)"
                  : i % 3 === 1
                  ? "radial-gradient(circle, rgba(59,130,246,0.2), transparent)"
                  : "radial-gradient(circle, rgba(16,185,129,0.2), transparent)",
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              top: `${Math.random() * 120 - 10}%`,
              left: `${Math.random() * 120 - 10}%`,
            }}
            animate={{
              y: [0, Math.random() * 50 - 25, 0],
              x: [0, Math.random() * 50 - 25, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
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
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-600 text-lg mb-4">No projects to display yet.</p>
            <p className="text-gray-500">Check back soon for our amazing work!</p>
          </motion.div>
        ) : (
          <>
            {/* Enhanced Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <ProjectCard 
                  key={project._id}
                  project={project}
                  index={idx}
                />
              ))}
            </div>

            {/* Enhanced View All Button */}
            <motion.div 
              className="text-center mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: projects.length * 0.15 + 0.5, duration: 0.6 }}
            >
              <Link
                to="/projects"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>View All Projects</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <MoveRight size={20} />
                </motion.div>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default Portfolio;