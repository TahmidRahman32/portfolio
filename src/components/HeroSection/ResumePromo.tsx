// components/ResumePromo.tsx
"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

import { easeInOut, easeOut } from "framer-motion";

const variants = {
   hidden: { scaleX: 0 },
   visible: {
      scaleX: 1,
      transition: {
         duration: 1,
         ease: [easeInOut, easeOut,], // ✅ use actual easing function
      },
   },
};


// TypeScript interfaces
interface Feature {
   icon: string;
   title: string;
   description: string;
}

interface Template {
   name: string;
   color: string;
   emoji: string;
   bgGradient: string;
   borderColor: string;
}

interface Stat {
   value: string;
   label: string;
   color: string;
}

// Animation variants with TypeScript types
// Framer Motion easing helpers

const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: {
         staggerChildren: 0.2,
         duration: 0.8,
         ease: easeInOut,
      },
   },
};

const itemVariants = {
   hidden: {
      y: 30,
      opacity: 0,
      scale: 0.95,
   },
   visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
         duration: 0.6,
         ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
   },
};

const cardVariants = {
   hidden: {
      scale: 0.9,
      opacity: 0,
      y: 20,
   },
   visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
         duration: 0.5,
         ease: easeOut, // ✅ imported easing
      },
   },
   hover: {
      scale: 1.05,
      y: -8,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: {
         duration: 0.3,
         ease: easeInOut, // ✅ imported easing
      },
   },
};

const floatingVariants = {
   float: {
      y: [-15, 15, -15],
      rotate: [0, 2, -2, 0],
      transition: {
         duration: 6,
         repeat: Infinity,
         ease: easeInOut,
      },
   },
};

const pulseVariants = {
   pulse: {
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.5, 0.3],
      transition: {
         duration: 4,
         repeat: Infinity,
         ease: easeInOut,
      },
   },
};

const scrollTextVariants = {
   hidden: {
      opacity: 0,
      y: 100,
      scale: 0.8,
   },
   visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
         duration: 0.8,
         ease: easeOut,
      },
   },
};

const scrollProgressVariants = {
   hidden: {
      scaleX: 0,
   },
   visible: {
      scaleX: 1,
      transition: {
         duration: 1.5,
         ease: easeInOut,
      },
   },
};

export default function ResumePromo() {
   const [isHovered, setIsHovered] = useState<boolean>(false);
   const [currentFeature, setCurrentFeature] = useState<number>(0);
   const [isVisible, setIsVisible] = useState<boolean>(false);
   const sectionRef = useRef<HTMLElement>(null);
   const textRef = useRef<HTMLDivElement>(null);

   // Scroll progress animation
   const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start end", "end start"],
   });

   // Transform scroll progress for various elements
   const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
   const textScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
   const textY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

   const cardRotation = useTransform(scrollYProgress, [0, 1], [-5, 5]);
   const cardY = useTransform(scrollYProgress, [0, 1], [50, -50]);

   const features: Feature[] = [
      {
         icon: "🎨",
         title: "Multiple Templates",
         description: "Choose from 4 professional A4 templates",
      },
      {
         icon: "⚡",
         title: "Quick & Easy",
         description: "Create a professional resume in minutes",
      },
      {
         icon: "📄",
         title: "PDF Export",
         description: "Download your resume as a polished PDF",
      },
      {
         icon: "👁️",
         title: "Live Preview",
         description: "See changes in real-time as you build",
      },
   ];

   const templates: Template[] = [
      {
         name: "Modern",
         color: "from-blue-500 to-purple-600",
         emoji: "🔄",
         bgGradient: "bg-gradient-to-br from-blue-500/10 to-purple-600/10",
         borderColor: "border-blue-200",
      },
      {
         name: "Professional",
         color: "from-gray-700 to-gray-900",
         emoji: "💼",
         bgGradient: "bg-gradient-to-br from-gray-700/10 to-gray-900/10",
         borderColor: "border-gray-200",
      },
      {
         name: "Minimal",
         color: "from-green-500 to-teal-600",
         emoji: "📄",
         bgGradient: "bg-gradient-to-br from-green-500/10 to-teal-600/10",
         borderColor: "border-green-200",
      },
      {
         name: "Creative",
         color: "from-orange-500 to-pink-600",
         emoji: "🎨",
         bgGradient: "bg-gradient-to-br from-orange-500/10 to-pink-600/10",
         borderColor: "border-orange-200",
      },
   ];

   const stats: Stat[] = [
      { value: "4", label: "Templates", color: "text-blue-600" },
      { value: "A4", label: "Format", color: "text-green-600" },
      { value: "PDF", label: "Export", color: "text-yellow-400" },
   ];

   // Auto-rotate features
   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentFeature((prev) => (prev + 1) % features.length);
      }, 3000);
      return () => clearInterval(interval);
   }, [features.length]);

   // Intersection Observer for scroll animations
   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) {
               setIsVisible(true);
            }
         },
         { threshold: 0.1 }
      );

      const element = sectionRef.current;
      if (element) observer.observe(element);

      return () => {
         if (element) observer.unobserve(element);
      };
   }, []);

   return (
      <section id="resume-promo" ref={sectionRef} className="relative py-20 overflow-hidden bg-[#4b1614] dark:bg-[#4b1614] container mx-auto px-4 md:rounded-2xl mt-1 md:mt-0">
         {/* Animated Background Elements */}
         <div className="absolute inset-0 overflow-hidden">
            <motion.div variants={variants} className="absolute top-20 left-10 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20" animate="pulse" />
            <motion.div variants={variants} className="absolute top-40 right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20" animate="pulse" transition={{ delay: 1 }} />
            <motion.div variants={variants} className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20" animate="pulse" transition={{ delay: 2 }} />

            {/* Scroll Progress Bar */}
            <motion.div
               className="absolute top-0 left-0 right-0 h-1  origin-left z-50"
               style={{ scaleX: scrollYProgress }}
               variants={scrollProgressVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
            />

            {/* Grid Pattern */}
            <div
               className="absolute inset-0 opacity-20"
               style={{
                  backgroundImage: `
              linear-gradient(rgba(120, 119, 198, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(120, 119, 198, 0.1) 1px, transparent 1px)
            `,
                  backgroundSize: "50px 50px",
               }}
            />
         </div>

         <div className="container mx-auto px-4 relative z-10">
            {/* Header Section with Scroll Timeline Animation */}
            <motion.div
               ref={textRef}
               initial="hidden"
               animate={isVisible ? "visible" : "hidden"}
               variants={containerVariants}
               className="text-center mb-20"
               style={{
                  opacity: textOpacity,
                  scale: textScale,
                  y: textY,
               }}
            >
               <motion.div className="inline-flex flex-col items-center gap-6 mb-8">
                  <motion.div
                     variants={floatingVariants}
                     whileHover={{
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.5 },
                     }}
                     className="p-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-2xl shadow-blue-500/30"
                  >
                     <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                     </svg>
                  </motion.div>
                  <div>
                     <motion.h2
                        variants={scrollTextVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-5xl md:text-7xl font-black bg-gradient-to-r from-sky-400 via-purple-600 to-green-600 bg-clip-text text-transparent mb-6"
                     >
                        Professional Resume Builder
                     </motion.h2>
                     <motion.p variants={scrollTextVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.2 }} className="text-2xl text-gray-400 font-light">
                        Create stunning resumes that get you hired
                     </motion.p>
                  </div>
               </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               {/* Left Column - Content */}
               <motion.div initial="hidden" animate={isVisible ? "visible" : "hidden"} variants={containerVariants} className="space-y-10">
                  {/* Main Description with Scroll Animation */}
                  <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
                     <motion.h3 className="text-4xl md:text-5xl font-bold text-gray-300 leading-tight" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        Build Your Perfect Resume in <span className="text-transparent bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text">Minutes</span>
                     </motion.h3>
                     <motion.p className="text-xl text-gray-400 leading-relaxed font-light" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
                        Create a professional, A4-formatted resume that stands out to employers. No design skills needed - just fill in your details and download a polished PDF ready for job applications.
                     </motion.p>
                  </motion.div>

                  {/* Features Grid */}
                  <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                     {features.map((feature: Feature, index: number) => (
                        <motion.div
                           key={index}
                           variants={cardVariants}
                           whileHover="hover"
                           initial="hidden"
                           whileInView="visible"
                           viewport={{ once: true }}
                           transition={{ delay: index * 0.1 }}
                           className={`p-5 rounded-2xl border-2 bg-white/70 backdrop-blur-sm transition-all duration-300 ${
                              index === currentFeature ? "border-blue-300 shadow-2xl shadow-blue-500/20 scale-105" : "border-gray-200/50 hover:border-gray-300"
                           }`}
                        >
                           <div className="flex items-start gap-4">
                              <motion.span
                                 className="text-3xl"
                                 animate={{
                                    rotate: index === currentFeature ? [0, 10, -10, 0] : 0,
                                    scale: index === currentFeature ? [1, 1.2, 1] : 1,
                                 }}
                                 transition={{ duration: 0.5 }}
                              >
                                 {feature.icon}
                              </motion.span>
                              <div>
                                 <h4 className="font-bold text-gray-900 text-lg mb-2">{feature.title}</h4>
                                 <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                              </div>
                           </div>
                        </motion.div>
                     ))}
                  </motion.div>

                  {/* Stats */}
                  <motion.div variants={itemVariants} className="grid grid-cols-3 gap-8 py-8">
                     {stats.map((stat: Stat, index: number) => (
                        <motion.div
                           key={index}
                           className="text-center group cursor-pointer  p-4 hover:bg-white/20 transition-colors duration-300 rounded-2xl border-2 shadow-2xl border-gray-400"
                           whileHover={{ scale: 1.1 }}
                           whileTap={{ scale: 0.95 }}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: index * 0.1 }}
                        >
                           <div className={`text-4xl font-black ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>{stat.value}</div>
                           <div className="text-gray-300 font-medium uppercase tracking-wide text-sm">{stat.label}</div>
                        </motion.div>
                     ))}
                  </motion.div>

                  {/* CTA Buttons */}
                  <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5">
                     <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                        <Link
                           href="/resume"
                           className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-blue-600 to-[#8d120e] hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-blue-500/30 hover:shadow-3xl hover:shadow-purple-500/40 transition-all duration-300 transform"
                           onMouseEnter={() => setIsHovered(true)}
                           onMouseLeave={() => setIsHovered(false)}
                        >
                           <span>Create Your Resume Now</span>
                           <motion.svg animate={{ x: isHovered ? 8 : 0 }} className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                           </motion.svg>
                        </Link>
                     </motion.div>

                     <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                        <Link
                           href="/template"
                           className="inline-flex items-center justify-center px-10 py-5 border-2 border-gray-300 text-gray-300 font-bold text-lg rounded-2xl hover:border-gray-400 hover:bg-white/50 hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
                        >
                           View Templates
                        </Link>
                     </motion.div>
                  </motion.div>
               </motion.div>

               {/* Right Column - Visual Preview with Scroll Animations */}
               <motion.div initial="hidden" animate={isVisible ? "visible" : "hidden"} variants={containerVariants} className="relative">
                  {/* Template Preview Cards with Scroll Transform */}
                  <div className="grid grid-cols-2 gap-6 relative z-10">
                     {templates.map((template: Template, index: number) => (
                        <motion.div
                           key={template.name}
                           variants={cardVariants}
                           whileHover="hover"
                           custom={index}
                           initial="hidden"
                           whileInView="visible"
                           viewport={{ once: true }}
                           transition={{ delay: index * 0.15 }}
                           style={{
                              rotate: cardRotation,
                              y: cardY,
                           }}
                           className={`relative rounded-3xl shadow-2xl border-2 bg-white/80 backdrop-blur-sm overflow-hidden ${template.borderColor} ${
                              index === 0 ? "lg:-rotate-6" : index === 1 ? "lg:rotate-3 lg:translate-y-6" : index === 2 ? "lg:-rotate-3 lg:translate-y-12" : "lg:rotate-6 lg:translate-y-6"
                           }`}
                        >
                           {/* Template Header */}
                           <div className={`bg-gradient-to-r ${template.color} p-5`}>
                              <div className="flex items-center justify-between">
                                 <span className="text-white font-bold text-base">{template.name}</span>
                                 <motion.span className="text-white text-2xl" whileHover={{ scale: 1.3, rotate: 15 }} transition={{ type: "spring", stiffness: 300 }}>
                                    {template.emoji}
                                 </motion.span>
                              </div>
                           </div>

                           {/* Template Content Preview */}
                           <div className="p-5 space-y-4">
                              <div className="h-4 bg-gray-300/50 rounded-lg"></div>
                              <div className="h-3 bg-gray-300/50 rounded-lg w-4/5"></div>
                              <div className="h-3 bg-gray-300/50 rounded-lg w-3/5"></div>
                              <div className="flex gap-2 mt-4">
                                 <div className="h-7 bg-gray-300/50 rounded-lg flex-1"></div>
                                 <div className="h-7 bg-gray-300/50 rounded-lg flex-1"></div>
                              </div>
                           </div>
                        </motion.div>
                     ))}
                  </div>

                  {/* Floating Live Preview Badge */}
                  <motion.div
                     variants={floatingVariants}
                     animate="float"
                     className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                     initial={{ opacity: 0, scale: 0 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.5 }}
                  >
                     <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
                        <div className="text-center">
                           <motion.div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg" whileHover={{ scale: 1.1, rotate: 5 }}>
                              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                           </motion.div>
                           <h4 className="font-bold text-gray-900 text-xl mb-2">Live Preview</h4>
                           <p className="text-gray-600">See changes in real-time</p>
                        </div>
                     </div>
                  </motion.div>

                  {/* Decorative Elements */}
                  <motion.div
                     className="absolute -bottom-8 -right-8 w-32 h-32 bg-yellow-400 rounded-full opacity-20 blur-2xl"
                     animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2],
                     }}
                     transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                     }}
                  />
               </motion.div>
            </div>
         </div>
      </section>
   );
}
