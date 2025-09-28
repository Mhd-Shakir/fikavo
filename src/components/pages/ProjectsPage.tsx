// Frontend/src/pages/ProjectsPage.tsx
import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { MoveRight, Sparkles, Search, ExternalLink, Globe, Video, Palette, Award, RefreshCw } from "lucide-react";

// --- Types ---
interface Project {
  _id: string;
  title: string;
  image: string;
  date: string;
  link?: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoryStats {
  websites: number;
  'video-editing': number;
  'graphic-design': number;
  branding: number;
}

// Category configuration with visual styling
const CATEGORIES = [
  { 
    id: 'all', 
    label: 'All Projects', 
    icon: Sparkles,
    colors: {
      primary: '#8B5CF6', // purple
      secondary: '#A78BFA',
      background: 'from-purple-500 to-purple-600',
      badge: 'bg-purple-100 text-purple-800 border-purple-200'
    }
  },
  { 
    id: 'websites', 
    label: 'Websites', 
    icon: Globe,
    colors: {
      primary: '#059669', // emerald
      secondary: '#10B981',
      background: 'from-emerald-500 to-teal-600',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-200'
    }
  },
  { 
    id: 'video-editing', 
    label: 'Video Editing', 
    icon: Video,
    colors: {
      primary: '#DC2626', // red
      secondary: '#EF4444',
      background: 'from-red-500 to-pink-600',
      badge: 'bg-red-100 text-red-800 border-red-200'
    }
  },
  { 
    id: 'graphic-design', 
    label: 'Graphic Design', 
    icon: Palette,
    colors: {
      primary: '#7C3AED', // violet
      secondary: '#8B5CF6',
      background: 'from-violet-500 to-purple-600',
      badge: 'bg-violet-100 text-violet-800 border-violet-200'
    }
  },
  { 
    id: 'branding', 
    label: 'Branding', 
    icon: Award,
    colors: {
      primary: '#EA580C', // orange
      secondary: '#F97316',
      background: 'from-orange-500 to-amber-600',
      badge: 'bg-orange-100 text-orange-800 border-orange-200'
    }
  }
];

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

// Category Filter Buttons Component
interface CategoryFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  projectCounts: Record<string, number>;
  loading: boolean;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({ 
  selectedCategory, 
  onCategoryChange, 
  projectCounts,
  loading
}) => (
  <motion.div 
    className="mb-8 flex flex-wrap gap-3 justify-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    {CATEGORIES.map((category, index) => {
      const IconComponent = category.icon;
      const count = category.id === 'all' 
        ? Object.values(projectCounts).reduce((a, b) => a + b, 0)
        : projectCounts[category.id] || 0;
      const isActive = selectedCategory === category.id;
      
      return (
        <motion.button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          disabled={loading}
          className={`
            relative px-6 py-3 font-medium text-sm transition-all duration-300
            flex items-center gap-2 group overflow-hidden border-2
            ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${isActive 
              ? `bg-gradient-to-r ${category.colors.background} text-white shadow-lg border-transparent` 
              : `bg-white text-gray-700 border-gray-300 hover:border-current`
            }
          `}
          style={{
            '--hover-color': category.colors.primary,
            color: isActive ? 'white' : category.colors.primary
          } as React.CSSProperties}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: loading ? 1 : 1.05, y: loading ? 0 : -2 }}
          whileTap={{ scale: loading ? 1 : 0.95 }}
        >
          {/* Background gradient animation */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${category.colors.background} opacity-0 group-hover:opacity-100`}
            initial={false}
            animate={{ opacity: isActive ? 1 : 0 }}
            whileHover={{ opacity: isActive ? 1 : (loading ? 0 : 0.1) }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Content */}
          <div className="relative z-10 flex items-center gap-2">
            <IconComponent size={16} />
            <span>{category.label}</span>
            {count > 0 && (
              <motion.span 
                className={`
                  px-2 py-1 text-xs font-bold min-w-[20px] h-5 flex items-center justify-center
                  ${isActive 
                    ? 'bg-white/20 text-white' 
                    : 'bg-white border text-current group-hover:bg-current group-hover:text-white'
                  }
                `}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                {count}
              </motion.span>
            )}
          </div>

          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-full scale-0"
            whileTap={{ scale: loading ? 0 : 4, opacity: [0.5, 0] }}
            transition={{ duration: 0.4 }}
          />
        </motion.button>
      );
    })}
  </motion.div>
);

// Enhanced Project Card Component
interface ProjectCardProps {
  project: Project;
  index: number;
  onProjectClick: (project: Project) => void;
  formatDate: (dateString: string) => string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onProjectClick, formatDate }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "0px 0px -100px 0px" });
  
  // Get category info for display
  const categoryInfo = CATEGORIES.find(cat => cat.id === project.category) || CATEGORIES[1]; // Default to websites
  const CategoryIcon = categoryInfo.icon;
  
  // Only 2 animation variants: left to right and right to left
  const animationVariants = [
    {
      // Slide from left
      initial: { opacity: 0, x: -60 },
      animate: { opacity: 1, x: 0 },
      whileHover: { y: -8, scale: 1.02 }
    },
    {
      // Slide from right
      initial: { opacity: 0, x: 60 },
      animate: { opacity: 1, x: 0 },
      whileHover: { y: -8, scale: 1.02 }
    }
  ];
  
  const variant = animationVariants[index % 2];
  
  return (
    <motion.div
      ref={cardRef}
      className={`group relative overflow-hidden border-2 bg-white shadow-sm transition-all duration-300 ${
        project.link ? 'cursor-pointer' : 'cursor-default'
      }`}
      style={{ 
        perspective: "1000px",
        borderColor: categoryInfo.colors.primary + '40' // 25% opacity
      }}
      initial={variant.initial}
      animate={isInView ? variant.animate : variant.initial}
      whileHover={{
        ...variant.whileHover,
        borderColor: categoryInfo.colors.primary,
        boxShadow: `0 20px 25px -5px ${categoryInfo.colors.primary}20, 0 10px 10px -5px ${categoryInfo.colors.primary}10`
      }}
      transition={{
        duration: 0.6,
        delay: (index % 6) * 0.1,
        ease: "easeOut"
      }}
      onClick={() => onProjectClick(project)}
    >
      {/* Category Color Strip */}
      <motion.div 
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${categoryInfo.colors.background} z-10`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: (index % 6) * 0.1 + 0.5, duration: 0.8 }}
      />

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
        
        {/* Category Badge with category-specific styling */}
        <motion.div 
          className={`absolute top-3 left-3 px-3 py-1.5 ${categoryInfo.colors.badge} backdrop-blur-sm text-xs font-semibold flex items-center gap-1.5 border`}
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: (index % 6) * 0.1 + 0.3, type: "spring" }}
        >
          <CategoryIcon size={14} />
          {categoryInfo.label}
        </motion.div>
        
        {/* Animated overlay with category color */}
        <motion.div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${categoryInfo.colors.primary}99 0%, transparent 60%)`
          }}
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
              className="bg-white/95 backdrop-blur-sm p-4 shadow-lg"
              style={{ borderColor: categoryInfo.colors.primary }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <ExternalLink style={{ color: categoryInfo.colors.primary }} size={24} />
            </motion.div>
          </motion.div>
        )}

        {/* Corner decoration */}
        <motion.div
          className={`absolute top-0 right-0 w-0 h-0 border-l-[30px] border-b-[30px] border-l-transparent`}
          style={{ 
            borderBottomColor: categoryInfo.colors.primary + '20'
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: (index % 6) * 0.1 + 0.7 }}
        />
      </div>

      {/* Project Content with category-themed accents */}
      <div className="p-6 relative">
        {/* Small accent line */}
        <motion.div 
          className={`absolute top-0 left-6 w-12 h-0.5 bg-gradient-to-r ${categoryInfo.colors.background}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: (index % 6) * 0.1 + 0.4 }}
        />

        <div className="flex items-start justify-between gap-3 mb-3 pt-2">
          <motion.h3 
            className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-current transition-colors"
            style={{ '--tw-text-opacity': '1' }}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            whileHover={{ color: categoryInfo.colors.primary }}
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
                <MoveRight style={{ color: categoryInfo.colors.primary }} size={18} />
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
            className="inline-flex items-center gap-1 text-sm font-medium transition-colors"
            style={{ color: categoryInfo.colors.primary }}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: (index % 6) * 0.1 + 0.4 }}
            whileHover={{ x: 5, color: categoryInfo.colors.secondary }}
          >
            <span>View Project</span>
            <ExternalLink size={14} />
          </motion.div>
        )}
      </div>

      {/* Animated border effect with category color */}
      <motion.div 
        className="absolute inset-0 border-2 pointer-events-none"
        style={{ borderColor: categoryInfo.colors.primary }}
        initial={{ opacity: 0, scale: 1.02 }}
        whileHover={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Subtle glow effect with category colors */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        whileHover={{
          background: `linear-gradient(90deg, ${categoryInfo.colors.primary}10 0%, ${categoryInfo.colors.secondary}10 50%, ${categoryInfo.colors.primary}10 100%)`
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
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categoryStats, setCategoryStats] = useState<CategoryStats>({
    websites: 0,
    'video-editing': 0,
    'graphic-design': 0,
    branding: 0
  });

  // Fetch projects from API with category filtering
  const fetchProjects = useCallback(async (category: string = 'all') => {
    try {
      setLoading(true);
      setError(null);
      
      const url = new URL(`${import.meta.env.VITE_API_BASE_URL}/api/projects`);
      if (category !== 'all') {
        url.searchParams.append('category', category);
      }
      
      const response = await fetch(url.toString());
      const data = await response.json();

      if (data.success) {
        setProjects(data.projects);
      } else {
        setError('Failed to load projects');
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch category statistics
  const fetchCategoryStats = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/projects/categories/stats`);
      const data = await response.json();

      if (data.success) {
        setCategoryStats(data.stats);
      }
    } catch (err) {
      console.error('Error fetching category stats:', err);
      // Don't show error for stats, just use empty counts
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchProjects();
    fetchCategoryStats();
  }, [fetchProjects, fetchCategoryStats]);

  // Calculate project counts for display
  const projectCounts = useMemo(() => {
    const counts: Record<string, number> = { ...categoryStats };
    
    // If we're showing all projects, use the actual project count
    if (selectedCategory === 'all') {
      counts.all = projects.length;
    }
    
    return counts;
  }, [categoryStats, projects.length, selectedCategory]);

  // Filtered projects (only for search now, category filtering is done server-side)
  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    
    if (!q) {
      return projects;
    }

    return projects.filter(p => p.title.toLowerCase().includes(q));
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

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setQuery(""); // Clear search when changing category
    fetchProjects(category); // Fetch projects for the selected category
  };

  const handleRetry = () => {
    fetchProjects(selectedCategory);
    fetchCategoryStats();
  };

  if (error) {
    return (
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <motion.button 
              onClick={handleRetry}
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white hover:bg-purple-700 transition disabled:opacity-50"
              whileHover={{ scale: loading ? 1 : 1.05 }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
            >
              <RefreshCw className={loading ? "animate-spin" : ""} size={18} />
              {loading ? "Loading..." : "Try Again"}
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

        {/* Category Filters */}
        <CategoryFilters
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          projectCounts={projectCounts}
          loading={loading}
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
              placeholder={`Search ${selectedCategory === 'all' ? 'all' : CATEGORIES.find(c => c.id === selectedCategory)?.label.toLowerCase()} projects...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white disabled:opacity-50"
            />
          </div>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div 
              className="h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{ borderRadius: "50%" }}
            />
            <p className="text-gray-600">Loading projects...</p>
          </motion.div>
        )}

        {/* Count */}
        {!loading && (
          <motion.div 
            className="mb-8 text-center text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
            {selectedCategory !== 'all' && ` in ${CATEGORIES.find(c => c.id === selectedCategory)?.label}`}
            {query && ` for "${query}"`}
          </motion.div>
        )}

        {/* No projects message */}
        {!loading && filteredProjects.length === 0 && (
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
            ) : selectedCategory !== 'all' ? (
              <>
                <p className="text-gray-600 text-lg mb-4">
                  No {CATEGORIES.find(c => c.id === selectedCategory)?.label.toLowerCase()} projects yet.
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-600 text-lg mb-4">No projects to display yet.</p>
                <p className="text-gray-500">Check back soon for our amazing work!</p>
              </>
            )}
          </motion.div>
        )}

        {/* Projects Grid */}
        {!loading && filteredProjects.length > 0 && (
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