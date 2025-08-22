// import React, { useMemo, useState } from "react";
// import { motion } from "framer-motion";
// import { MoveRight, Sparkles, Search, LayoutGrid, List } from "lucide-react";

// // --- SectionHeader with animation & gradient text ---
// interface SectionHeaderProps {
//   title: string;
//   subtitle: string;
// }
// const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => (
//   <motion.div
//     className="mb-16 text-center"
//     initial={{ opacity: 0, y: 30 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.6 }}
//   >
//     <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-6">
//       <Sparkles className="w-5 h-5 text-purple-600" />
//       <span className="text-sm font-semibold text-purple-700 uppercase tracking-wider">
//         Portfolio
//       </span>
//     </div>
//     <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 font-poppins mb-4">
//       {title.split(" ").slice(0, -1).join(" ")}{" "}
//       <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
//         {title.split(" ").slice(-1)}
//       </span>
//     </h2>
//     <p className="max-w-2xl mx-auto text-xl text-gray-600 font-poppins">
//       {subtitle}
//     </p>
//   </motion.div>
// );

// // --- Project Data ---
// interface Project {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
//   tags: string[];
//   link?: string; // optional live link
// }

// const projectsData: Project[] = [
//   {
//     id: "p1",
//     title: "TechStart Platform",
//     description:
//       "A comprehensive SaaS platform that helps startups manage their entire business lifecycle from ideation to scale. We implemented real-time collaboration features, AI-powered analytics, and seamless third-party integrations.",
//     image:
//       "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260",
//     tags: ["React", "Node.js", "PostgreSQL", "AWS"],
//     link: "#",
//   },
//   {
//     id: "p2",
//     title: "RetailMax Mobile",
//     description:
//       "Native mobile app for retail chain management with real-time inventory tracking and analytics. Features include barcode scanning, predictive stock management, and employee performance dashboards.",
//     image:
//       "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260",
//     tags: ["React Native", "Firebase", "Redux"],
//     link: "#",
//   },
//   {
//     id: "p3",
//     title: "FinanceFlow Dashboard",
//     description:
//       "Modern financial dashboard with advanced analytics and real-time market data visualization. Integrated with banking APIs and cryptocurrency exchanges to provide a comprehensive financial overview.",
//     image:
//       "https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=1260",
//     tags: ["Vue.js", "D3.js", "Python"],
//     link: "#",
//   },
//   {
//     id: "p4",
//     title: "EcoTrack Analytics",
//     description:
//       "An environmental impact tracking dashboard for corporations to monitor their carbon footprint. Features include supply chain analysis, emission forecasting, and sustainability scoring.",
//     image:
//       "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260",
//     tags: ["Svelte", "Go", "TimescaleDB"],
//   },
//   {
//     id: "p5",
//     title: "HealthSync Portal",
//     description:
//       "A secure portal for patients and doctors to manage appointments and health records. HIPAA-compliant with end-to-end encryption and telehealth integration.",
//     image:
//       "https://images.pexels.com/photos/3182822/pexels-photo-3182822.jpeg?auto=compress&cs=tinysrgb&w=1260",
//     tags: ["Angular", "Firebase", "TypeScript"],
//   },
//   {
//     id: "p6",
//     title: "EduPro LMS",
//     description:
//       "A learning management system for schools and universities with real-time collaboration. Features include AI-powered grading, virtual classrooms, and plagiarism detection.",
//     image:
//       "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1260",
//     tags: ["React", "Node.js", "MongoDB"],
//     link: "#",
//   },
// ];

// const Project: React.FC = () => {
//   const [view, setView] = useState<"grid" | "list">("grid");
//   const [query, setQuery] = useState("");

//   // Filtered projects (by search only)
//   const filteredProjects = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     return projectsData.filter((p) => {
//       if (!q) return true;
//       return (
//         p.title.toLowerCase().includes(q) ||
//         p.description.toLowerCase().includes(q) ||
//         p.tags.some((t) => t.toLowerCase().includes(q))
//       );
//     });
//   }, [query]);

//   return (
//     <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/50 relative overflow-hidden">
//       {/* Background patterns */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
//         {[...Array(8)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute rounded-full blur-3xl opacity-50"
//             style={{
//               background:
//                 i % 2 === 0
//                   ? "radial-gradient(circle, rgba(139,92,246,0.15), transparent)"
//                   : "radial-gradient(circle, rgba(59,130,246,0.15), transparent)",
//               width: Math.random() * 150 + 80,
//               height: Math.random() * 150 + 80,
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//             }}
//             animate={{
//               y: [0, Math.random() * 30 - 15, 0],
//               x: [0, Math.random() * 30 - 15, 0],
//             }}
//             transition={{
//               duration: Math.random() * 8 + 6,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//           />
//         ))}
//       </div>

//       <div className="max-w-7xl mx-auto px-4 relative z-10">
//         <SectionHeader
//           title="Our Creative Projects"
//           subtitle="Explore our carefully crafted projects that showcase our expertise and passion for innovation"
//         />     

//         {/* Count */}
//         <div className="mb-4 text-sm text-gray-600">
//           Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
//           {query ? ` • “${query}”` : ""}
//         </div>

//         {/* Project Grid/List */}
//         {view === "grid" ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredProjects.map((project, idx) => (
//               <motion.div
//                 key={project.id}
//                 className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-80"
//                 whileHover={{ y: -8 }}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.05, duration: 0.45 }}
//               >
//                 <motion.img
//                   src={project.image}
//                   alt={project.title}
//                   className="absolute inset-0 w-full h-full object-cover"
//                   loading="lazy"
//                   onError={(e) => {
//                     (e.currentTarget as HTMLImageElement).src =
//                       "https://via.placeholder.com/1200x800?text=Project";
//                   }}
//                   whileHover={{ scale: 1.05 }}
//                   transition={{ duration: 0.6 }}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
//                 <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
//                   <div className="flex justify-between items-center">
//                     <h3 className="text-white text-2xl font-bold font-poppins">
//                       {project.title}
//                     </h3>
                    
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {filteredProjects.map((project, idx) => (
//               <motion.div
//                 key={project.id}
//                 className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.05, duration: 0.45 }}
//               >
//                 <div className="flex flex-col sm:flex-row">
//                   <div className="sm:w-2/5 h-52 sm:h-56 relative">
//                     <img
//                       src={project.image}
//                       alt={project.title}
//                       className="absolute inset-0 w-full h-full object-cover"
//                       loading="lazy"
//                       onError={(e) => {
//                         (e.currentTarget as HTMLImageElement).src =
//                           "https://via.placeholder.com/800x600?text=Project";
//                       }}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent sm:hidden" />
//                   </div>
//                   <div className="flex-1 p-5">
//                     <div className="flex items-start justify-between gap-3">
//                       <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
//                       <div className="hidden sm:block bg-gray-100 rounded-full p-2">
//                         <MoveRight className="text-gray-700" size={18} />
//                       </div>
//                     </div>
//                     <p className="text-gray-600 mt-2 line-clamp-3">{project.description}</p>
//                     <div className="mt-4 flex flex-wrap gap-2">
//                       {project.tags.map((t) => (
//                         <span
//                           key={t}
//                           className="px-2.5 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs text-gray-700"
//                         >
//                           {t}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Project;
// Frontend/src/pages/ProjectsPage.tsx
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { MoveRight, Sparkles, Search, LayoutGrid, List } from "lucide-react";

// --- Types ---
interface Project {
  _id: string;
  title: string;
  image: string;
  date: string;
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

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [query, setQuery] = useState("");

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/projects`);
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
    };

    fetchProjects();
  }, []);

  // Filtered projects (by search only)
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

        {/* Search and View Controls */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white"
            />
          </div>
          
          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-300 p-1">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-md transition ${
                view === "grid" 
                  ? "bg-purple-100 text-purple-600" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-md transition ${
                view === "list" 
                  ? "bg-purple-100 text-purple-600" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              aria-label="List view"
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {/* Count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
          {query ? ` • "${query}"` : ""}
        </div>

        {/* No projects message */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            {query ? (
              <>
                <p className="text-gray-600 text-lg mb-4">No projects found for "{query}"</p>
                <button 
                  onClick={() => setQuery("")}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Clear search
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-600 text-lg mb-4">No projects to display yet.</p>
                <p className="text-gray-500">Check back soon for our amazing work!</p>
              </>
            )}
          </div>
        ) : (
          <>
            {/* Project Grid/List */}
            {view === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    key={project._id}
                    className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-80"
                    whileHover={{ y: -8 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.45 }}
                  >
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://via.placeholder.com/1200x800?text=Project";
                      }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                    <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-white text-2xl font-bold font-poppins mb-1">
                            {project.title}
                          </h3>
                          <p className="text-white/80 text-sm">
                            {formatDate(project.date)}
                          </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-full p-2 group-hover:bg-purple-600 transition-colors">
                          <MoveRight className="text-white" size={20} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    key={project._id}
                    className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.45 }}
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-2/5 h-52 sm:h-56 relative">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              "https://via.placeholder.com/800x600?text=Project";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent sm:hidden" />
                      </div>
                      <div className="flex-1 p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                            <p className="text-gray-500 text-sm">{formatDate(project.date)}</p>
                          </div>
                          <div className="hidden sm:block bg-gray-100 rounded-full p-2 group-hover:bg-purple-100 transition-colors">
                            <MoveRight className="text-gray-700 group-hover:text-purple-600" size={18} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectsPage;