// components/TimelineSection.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView, Variants } from "framer-motion";

// Enhanced Type definitions
type TimelineItemType = "work" | "education" | "project" | "milestone" | "certification";

interface TimelineItem {
   id: number;
   year: string;
   title: string;
   subtitle?: string;
   description: string;
   icon: string;
   type: TimelineItemType;
   tags?: string[];
   link?: string;
   image?: string;
}

interface TimelineSectionProps {
   title?: string;
   subtitle?: string;
   items?: TimelineItem[];
   className?: string;
   showTags?: boolean;
   showImages?: boolean;
   animateOnScroll?: boolean;
}

interface TimelineItemProps {
   item: TimelineItem;
   index: number;
   activeItem: number | null;
   setActiveItem: (id: number | null) => void;
   getTypeColor: (type: TimelineItemType) => string;
   getTypeText: (type: TimelineItemType) => string;
   showTags?: boolean;
   showImages?: boolean;
   animateOnScroll?: boolean;
}

interface TypeConfig {
   color: string;
   text: string;
   bgColor: string;
   borderColor: string;
   textColor: string;
}

// Animation variants
const itemVariants: Variants = {
   hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
   },
   visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
         type: "spring",
         stiffness: 100,
         damping: 15,
         duration: 0.6,
      },
   },
};

const lineVariants: Variants = {
   hidden: { scaleY: 0 },
   visible: {
      scaleY: 1,
      transition: {
         duration: 1.5,
         ease: "easeOut",
      },
   },
};

const iconVariants: Variants = {
   hidden: { scale: 0, rotate: -180 },
   visible: {
      scale: 1,
      rotate: 0,
      transition: {
         type: "spring",
         stiffness: 200,
         damping: 15,
         duration: 0.5,
      },
   },
   hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
         type: "spring",
         stiffness: 400,
         damping: 10,
      },
   },
};

// Main component
const TimelineSection: React.FC<TimelineSectionProps> = ({
   title = "My Journey",
   subtitle = "A timeline of my professional career and milestones",
   items = defaultTimelineItems,
   className = "",
   showTags = true,
   showImages = false,
   animateOnScroll = true,
}) => {
   const [activeItem, setActiveItem] = useState<number | null>(null);
   const timelineRef = useRef<HTMLDivElement>(null);
   const isInView = useInView(timelineRef, { once: true, margin: "-50px" });

   // Default timeline data
   const defaultTimelineItems: TimelineItem[] = [
      {
         id: 1,
         year: "2023",
         title: "Senior Full Stack Developer",
         subtitle: "Tech Innovations Inc.",
         description: "Leading development of enterprise web applications using Next.js, TypeScript, and cloud technologies. Mentoring junior developers and implementing best practices.",
         icon: "💼",
         type: "work",
         tags: ["Next.js", "TypeScript", "AWS", "Team Leadership"],
         link: "#",
         image: "/api/placeholder/400/250",
      },
      {
         id: 2,
         year: "2022",
         title: "Full Stack Developer",
         subtitle: "Digital Solutions LLC",
         description: "Developed and maintained multiple client projects with React, Node.js, and MongoDB. Implemented responsive designs and optimized application performance.",
         icon: "🚀",
         type: "work",
         tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
         link: "#",
      },
      {
         id: 3,
         year: "2021",
         title: "Frontend Developer",
         subtitle: "Web Crafters Agency",
         description: "Created interactive user interfaces for various clients. Collaborated with designers to implement pixel-perfect designs and ensure cross-browser compatibility.",
         icon: "🎨",
         type: "work",
         tags: ["JavaScript", "CSS3", "UI/UX", "Responsive Design"],
      },
      {
         id: 4,
         year: "2020",
         title: "Bachelor's Degree in Computer Science",
         subtitle: "University of Technology",
         description: "Graduated with honors. Focused on software engineering, web technologies, and human-computer interaction. Completed thesis on modern frontend frameworks.",
         icon: "🎓",
         type: "education",
         tags: ["Graduation", "Honors", "Thesis", "Academic Projects"],
      },
      {
         id: 5,
         year: "2019",
         title: "AWS Certified Developer",
         subtitle: "Amazon Web Services",
         description: "Earned AWS Certified Developer Associate certification. Gained expertise in cloud infrastructure, serverless architecture, and DevOps practices.",
         icon: "☁️",
         type: "certification",
         tags: ["AWS", "Cloud", "Certification", "DevOps"],
      },
      {
         id: 6,
         year: "2018",
         title: "First Freelance Project",
         subtitle: "Independent Work",
         description: "Developed a custom website for a local business. This project sparked my passion for web development and client work.",
         icon: "🌟",
         type: "project",
         tags: ["HTML/CSS", "JavaScript", "Client Work", "Freelance"],
      },
   ];

   const getTypeConfig = (type: TimelineItemType): TypeConfig => {
      const configs: Record<TimelineItemType, TypeConfig> = {
         work: {
            color: "bg-blue-500",
            text: "Work Experience",
            bgColor: "bg-blue-50 dark:bg-blue-900/20",
            borderColor: "border-l-blue-500",
            textColor: "text-blue-700 dark:text-blue-300",
         },
         education: {
            color: "bg-green-500",
            text: "Education",
            bgColor: "bg-green-50 dark:bg-green-900/20",
            borderColor: "border-l-green-500",
            textColor: "text-green-700 dark:text-green-300",
         },
         project: {
            color: "bg-purple-500",
            text: "Project",
            bgColor: "bg-purple-50 dark:bg-purple-900/20",
            borderColor: "border-l-purple-500",
            textColor: "text-purple-700 dark:text-purple-300",
         },
         milestone: {
            color: "bg-orange-500",
            text: "Milestone",
            bgColor: "bg-orange-50 dark:bg-orange-900/20",
            borderColor: "border-l-orange-500",
            textColor: "text-orange-700 dark:text-orange-300",
         },
         certification: {
            color: "bg-red-500",
            text: "Certification",
            bgColor: "bg-red-50 dark:bg-red-900/20",
            borderColor: "border-l-red-500",
            textColor: "text-red-700 dark:text-red-300",
         },
      };
      return configs[type];
   };

   return (
      <section id="timeline" ref={timelineRef} className={`py-16 px-4 bg-slate-50 dark:bg-slate-900 ${className}`}>
         <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
               <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={animateOnScroll && isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4"
               >
                  {title}
               </motion.h2>
               <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={animateOnScroll && isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg"
               >
                  {subtitle}
               </motion.p>
            </div>

            {/* Timeline */}
            <div className="relative">
               {/* Vertical line */}
               <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full hidden md:block"
                  variants={lineVariants}
                  initial={animateOnScroll ? "hidden" : "visible"}
                  animate={animateOnScroll && isInView ? "visible" : "visible"}
               />

               {/* Mobile line */}
               <motion.div
                  className="absolute left-6 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full md:hidden"
                  variants={lineVariants}
                  initial={animateOnScroll ? "hidden" : "visible"}
                  animate={animateOnScroll && isInView ? "visible" : "visible"}
               />

               {/* Timeline items */}
               <div className="space-y-12 md:space-y-24">
                  {items.map((item, index) => (
                     <TimelineItemComponent
                        key={item.id}
                        item={item}
                        index={index}
                        activeItem={activeItem}
                        setActiveItem={setActiveItem}
                        getTypeColor={(type) => getTypeConfig(type).color}
                        getTypeText={(type) => getTypeConfig(type).text}
                        showTags={showTags}
                        showImages={showImages}
                        animateOnScroll={animateOnScroll}
                     />
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
};

// Timeline Item Component
const TimelineItemComponent: React.FC<TimelineItemProps> = ({ item, index, activeItem, setActiveItem, getTypeColor, getTypeText, showTags = true, showImages = false, animateOnScroll = true }) => {
   const ref = useRef<HTMLDivElement>(null);
   const isInView = useInView(ref, {
      once: true,
      margin: "-100px",
      amount: 0.3,
   });

   const isActive = activeItem === item.id;
   const isEven = index % 2 === 0;

   const typeConfig = {
      work: getTypeConfig("work"),
      education: getTypeConfig("education"),
      project: getTypeConfig("project"),
      milestone: getTypeConfig("milestone"),
      certification: getTypeConfig("certification"),
   }[item.type];

   return (
      <motion.div
         ref={ref}
         variants={itemVariants}
         initial={animateOnScroll ? "hidden" : "visible"}
         animate={animateOnScroll && isInView ? "visible" : "visible"}
         transition={{ delay: index * 0.1 }}
         className={`relative flex flex-col md:flex-row items-center ${isEven ? "md:flex-row-reverse" : ""}`}
         onMouseEnter={() => setActiveItem(item.id)}
         onMouseLeave={() => setActiveItem(null)}
      >
         {/* Content */}
         <div className={`md:w-1/2 ${isEven ? "md:pr-12" : "md:pl-12"} mb-8 md:mb-0`}>
            <motion.div
               className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border-l-4 ${isActive ? "scale-105 shadow-xl ring-2 ring-blue-500/20" : "scale-100"} transition-all duration-300 ${typeConfig.borderColor} hover:shadow-xl`}
               whileHover={{
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
               }}
            >
               {/* Type badge */}
               <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 ${getTypeColor(item.type)} text-white`}>{getTypeText(item.type)}</div>

               {/* Year */}
               <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">{item.year}</div>

               {/* Title */}
               <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{item.title}</h3>

               {/* Subtitle */}
               {item.subtitle && <p className="text-slate-600 dark:text-slate-300 font-medium mb-3">{item.subtitle}</p>}

               {/* Image */}
               {showImages && item.image && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                     <img src={item.image} alt={item.title} className="w-full h-32 object-cover" />
                  </div>
               )}

               {/* Description */}
               <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">{item.description}</p>

               {/* Tags */}
               {showTags && item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                     {item.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-xs font-medium">
                           {tag}
                        </span>
                     ))}
                  </div>
               )}

               {/* Link */}
               {item.link && (
                  <div className="mt-4">
                     <a href={item.link} className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm">
                        Learn more
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                     </a>
                  </div>
               )}
            </motion.div>
         </div>

         {/* Icon & Connector - Desktop */}
         <div className="absolute left-1/2 transform -translate-x-1/2 md:flex items-center justify-center hidden">
            <motion.div
               className={`w-16 h-16 rounded-full ${getTypeColor(item.type)} flex items-center justify-center text-white font-bold z-10 shadow-lg`}
               variants={iconVariants}
               initial={animateOnScroll ? "hidden" : "visible"}
               animate={animateOnScroll && isInView ? "visible" : "visible"}
               whileHover="hover"
               transition={{ delay: index * 0.1 + 0.2 }}
            >
               {item.icon}
            </motion.div>
         </div>

         {/* Mobile Icon */}
         <div className="absolute left-6 transform -translate-x-1/2 flex items-center justify-center md:hidden">
            <motion.div
               className={`w-12 h-12 rounded-full ${getTypeColor(item.type)} flex items-center justify-center text-white font-bold z-10 shadow-lg`}
               variants={iconVariants}
               initial={animateOnScroll ? "hidden" : "visible"}
               animate={animateOnScroll && isInView ? "visible" : "visible"}
               whileHover="hover"
            >
               {item.icon}
            </motion.div>
         </div>

         {/* Year Marker - Desktop */}
         <div className={`md:w-1/2 ${isEven ? "md:pl-12 text-left" : "md:pr-12 text-right"} hidden md:block`}>
            <motion.div
               className={`text-5xl font-bold ${isActive ? "text-slate-800 dark:text-white scale-110" : "text-slate-300 dark:text-slate-600 scale-100"} transition-all duration-300`}
               initial={{ opacity: 0, x: isEven ? 20 : -20 }}
               animate={animateOnScroll && isInView ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
               transition={{ delay: index * 0.1 + 0.3 }}
            >
               {item.year}
            </motion.div>
         </div>

         {/* Year Marker - Mobile */}
         <div className="ml-20 md:hidden">
            <motion.div className="text-2xl font-bold text-slate-800 dark:text-white" initial={{ opacity: 0 }} animate={animateOnScroll && isInView ? { opacity: 1 } : { opacity: 1 }} transition={{ delay: index * 0.1 + 0.2 }}>
               {item.year}
            </motion.div>
         </div>
      </motion.div>
   );
};

// Helper function to get type config (also exported for external use)
export const getTypeConfig = (type: TimelineItemType): TypeConfig => {
   const configs: Record<TimelineItemType, TypeConfig> = {
      work: {
         color: "bg-blue-500",
         text: "Work Experience",
         bgColor: "bg-blue-50 dark:bg-blue-900/20",
         borderColor: "border-l-blue-500",
         textColor: "text-blue-700 dark:text-blue-300",
      },
      education: {
         color: "bg-green-500",
         text: "Education",
         bgColor: "bg-green-50 dark:bg-green-900/20",
         borderColor: "border-l-green-500",
         textColor: "text-green-700 dark:text-green-300",
      },
      project: {
         color: "bg-purple-500",
         text: "Project",
         bgColor: "bg-purple-50 dark:bg-purple-900/20",
         borderColor: "border-l-purple-500",
         textColor: "text-purple-700 dark:text-purple-300",
      },
      milestone: {
         color: "bg-orange-500",
         text: "Milestone",
         bgColor: "bg-orange-50 dark:bg-orange-900/20",
         borderColor: "border-l-orange-500",
         textColor: "text-orange-700 dark:text-orange-300",
      },
      certification: {
         color: "bg-red-500",
         text: "Certification",
         bgColor: "bg-red-50 dark:bg-red-900/20",
         borderColor: "border-l-red-500",
         textColor: "text-red-700 dark:text-red-300",
      },
   };
   return configs[type];
};

export default TimelineSection;
