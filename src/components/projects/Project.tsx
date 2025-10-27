// components/ProjectsSection.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Type definitions
interface Project {
   id: number;
   title: string;
   description: string;
   image: string;
   category: ProjectCategory;
   stack: string[];
   link: string;
   github: string;
}

type ProjectCategory = "frontend" | "backend" | "fullstack" | "all";

interface Filter {
   id: ProjectCategory;
   label: string;
}

interface ProjectCardProps {
   project: Project;
   getStackIcon: (tech: string) => string;
}

// Main component
const ProjectsSection: React.FC = () => {
   const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
   const [projects, setProjects] = useState<Project[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(true);

   // Mock data - replace with your actual projects
   useEffect(() => {
      // Simulate API fetch
      setTimeout(() => {
         const mockProjects: Project[] = [
            {
               id: 1,
               title: "E-Commerce Platform",
               description: "A full-stack e-commerce solution with payment processing and inventory management.",
               image: "/api/placeholder/600/400",
               category: "fullstack",
               stack: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL"],
               link: "#",
               github: "#",
            },
            {
               id: 2,
               title: "Task Management App",
               description: "A collaborative task management application with real-time updates and team features.",
               image: "/api/placeholder/600/400",
               category: "frontend",
               stack: ["React", "Firebase", "Tailwind CSS", "Context API"],
               link: "#",
               github: "#",
            },
            {
               id: 3,
               title: "REST API Service",
               description: "A scalable REST API with authentication, rate limiting, and comprehensive documentation.",
               image: "/api/placeholder/600/400",
               category: "backend",
               stack: ["Node.js", "Express", "MongoDB", "JWT", "Swagger"],
               link: "#",
               github: "#",
            },
            {
               id: 4,
               title: "Portfolio Website",
               description: "A modern, responsive portfolio website with smooth animations and dark mode.",
               image: "/api/placeholder/600/400",
               category: "frontend",
               stack: ["Next.js", "Framer Motion", "Tailwind CSS", "GSAP"],
               link: "#",
               github: "#",
            },
            {
               id: 5,
               title: "Social Media Dashboard",
               description: "Analytics dashboard for social media metrics with data visualization and reporting.",
               image: "/api/placeholder/600/400",
               category: "fullstack",
               stack: ["React", "Node.js", "Chart.js", "MySQL", "Socket.io"],
               link: "#",
               github: "#",
            },
            {
               id: 6,
               title: "Mobile Fitness App",
               description: "Cross-platform mobile application for workout tracking and progress monitoring.",
               image: "/api/placeholder/600/400",
               category: "fullstack",
               stack: ["React Native", "Firebase", "Redux", "Expo"],
               link: "#",
               github: "#",
            },
         ];
         setProjects(mockProjects);
         setIsLoading(false);
      }, 800);
   }, []);

   const filteredProjects: Project[] = activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter);

   const filters: Filter[] = [
      { id: "all", label: "All Projects" },
      { id: "frontend", label: "Frontend" },
      { id: "backend", label: "Backend" },
      { id: "fullstack", label: "Full Stack" },
   ];

   const getStackIcon = (tech: string): string => {
      const icons: Record<string, string> = {
         "Next.js": "⚡",
         React: "⚛️",
         TypeScript: "📘",
         "Node.js": "🟢",
         Express: "🚂",
         MongoDB: "🍃",
         PostgreSQL: "🐘",
         Firebase: "🔥",
         "Tailwind CSS": "🎨",
         Prisma: "🛠️",
         Stripe: "💳",
         JWT: "🔐",
         Swagger: "📖",
         "Chart.js": "📊",
         MySQL: "🐬",
         "Socket.io": "🔌",
         "React Native": "📱",
         Redux: "📦",
         Expo: "📲",
         GSAP: "🎬",
         "Framer Motion": "✨",
         "Context API": "🔄",
      };
      return icons[tech] || "💻";
   };

   if (isLoading) {
      return (
         <section id="projects" className="py-16 px-4  from-[#490b09] my-16 container mx-auto to-blue-900">
            <div className="max-w-6xl mx-auto">
               <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-800 dark:text-white font-primary-f">My Projects</h2>
               <p className="text-center text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">A collection of my recent work and personal projects</p>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                     <div key={i} className="animate-pulse">
                        <div className="bg-slate-200 dark:bg-slate-800 h-48 rounded-lg mb-4"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full mb-2"></div>
                        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-2/3"></div>
                     </div>
                  ))}
               </div>
            </div>
         </section>
      );
   }

   return (
      <section id="projects" className="py-16 px-4 mx-auto my-16 container rounded-2xl bg-gradient-to-br from-[#490b09]   to-blue-900">
         <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">My Projects</h2>
            <p className="text-center text-input  mb-12 max-w-2xl mx-auto">A collection of my recent work and personal projects</p>

            {/* Filter UI */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
               {filters.map((filter) => (
                  <button
                     key={filter.id}
                     onClick={() => setActiveFilter(filter.id)}
                     className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeFilter === filter.id ? "bg-blue-600 text-white shadow-lg" : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 shadow"
                     }`}
                  >
                     {filter.label}
                  </button>
               ))}
            </div>

            {/* Projects Grid */}
            <AnimatePresence mode="wait">
               <motion.div key={activeFilter} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                     <ProjectCard key={project.id} project={project} getStackIcon={getStackIcon} />
                  ))}
               </motion.div>
            </AnimatePresence>

            {filteredProjects.length === 0 && (
               <div className="text-center py-12">
                  <p className="text-slate-500 dark:text-slate-400 text-lg">No projects found in this category.</p>
               </div>
            )}
         </div>
      </section>
   );
};

// Project Card Component
const ProjectCard: React.FC<ProjectCardProps> = ({ project, getStackIcon }) => {
   const [isHovered, setIsHovered] = useState<boolean>(false);

   return (
      <motion.div
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.4 }}
         className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden group cursor-pointer"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         <div className="relative overflow-hidden">
            {/* Project Thumbnail */}
            <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
               <div className="w-4/5 h-32 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg font-semibold text-center px-4">{project.title}</span>
               </div>
            </div>

            {/* Hover Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
               <div className="p-4 w-full flex gap-2">
                  <a href={project.link} className="flex-1 bg-white text-slate-900 text-center py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                     View Project
                  </a>
                  <a href={project.github} className="px-3 bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-700 transition-colors">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                     </svg>
                  </a>
               </div>
            </div>

            {/* Category Badge */}
            <div
               className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${isHovered ? "opacity-0" : "opacity-100"} ${
                  project.category === "frontend"
                     ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                     : project.category === "backend"
                     ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                     : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
               }`}
            >
               {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
            </div>
         </div>

         {/* Project Info */}
         <div className="p-5">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{project.title}</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">{project.description}</p>

            {/* Stack Icons */}
            <div className="flex flex-wrap gap-2">
               {project.stack.map((tech) => (
                  <div key={tech} className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md text-sm">
                     <span>{getStackIcon(tech)}</span>
                     <span className="text-slate-700 dark:text-slate-300">{tech}</span>
                  </div>
               ))}
            </div>
         </div>
      </motion.div>
   );
};

export default ProjectsSection;
