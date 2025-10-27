"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ServicesHeader = () => {
   const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
   });

   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            staggerChildren: 0.2,
            duration: 0.8,
         },
      },
   };

   const itemVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: {
         opacity: 1,
         y: 0,
         transition: {
            duration: 0.8,
            ease: "easeOut", // Fixed: removed array, using string
         },
      },
   };

   const cardVariants = {
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
         opacity: 1,
         scale: 1,
         transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94], // Fixed: using cubic-bezier array
         },
      },
   };

   const floatingVariants = {
      floating: {
         y: [-15, 15, -15],
         transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
         },
      },
   };

   const services = [
      {
         icon: "⚡",
         title: "Frontend Development",
         description: "Modern, responsive user interfaces built with React, Next.js and cutting-edge technologies",
         features: ["React/Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
         tech: ["React", "Next.js", "TypeScript", "Tailwind"],
      },
      {
         icon: "🔧",
         title: "Backend Development",
         description: "Robust server-side solutions and API development with scalable architecture",
         features: ["RESTful APIs", "Database Design", "Authentication", "Server Optimization"],
         tech: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
      },
      {
         icon: "🎨",
         title: "Full Stack Solutions",
         description: "Complete web applications from concept to deployment with modern tech stacks",
         features: ["End-to-End Development", "Cloud Deployment", "Performance Optimization", "Maintenance"],
         tech: ["MERN Stack", "Next.js", "Vercel", "AWS"],
      },
      {
         icon: "🚀",
         title: "Performance Optimization",
         description: "Lightning-fast websites with optimized loading speeds and superior user experience",
         features: ["Core Web Vitals", "SEO Optimization", "Code Splitting", "Caching Strategies"],
         tech: ["Lighthouse", "Web Vitals", "CDN", "PWA"],
      },
   ];

   const technologies = ["React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "PostgreSQL", "Tailwind CSS", "Framer Motion", "GraphQL", "AWS", "Vercel"];

   return (
      <motion.section
         ref={ref}
         initial="hidden"
         animate={inView ? "visible" : "hidden"}
         className="relative container mx-auto rounded-3xl my-4 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-[#490b09] to-purple-900"
      >
         {/* Animated Background Elements */}
         <div className="absolute inset-0 overflow-hidden">
            {/* Code-like Grid Pattern */}
            <div
               className="absolute inset-0 opacity-5"
               style={{
                  backgroundImage: `linear-gradient(#00ffff 1px, transparent 1px), linear-gradient(90deg, #00ffff 1px, transparent 1px)`,
                  backgroundSize: "50px 50px",
               }}
            />

            {/* Floating Code-like Elements */}
            <motion.div variants={floatingVariants} animate="floating" className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl" />
            <motion.div variants={floatingVariants} animate="floating" transition={{ delay: 2 }} className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl" />
            <motion.div variants={floatingVariants} animate="floating" transition={{ delay: 4 }} className="absolute top-1/3 right-1/3 w-20 h-20 bg-purple-500/10 rounded-full blur-xl" />

            {/* Animated Code Background */}
            <div className="absolute inset-0 opacity-10">
               <motion.div animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-20 left-10 font-mono text-cyan-400 text-sm">
                  {`<WebDeveloper />`}
               </motion.div>
               <motion.div animate={{ opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} className="absolute bottom-40 right-20 font-mono text-blue-400 text-sm">
                  {`console.log("Hello World");`}
               </motion.div>
               <motion.div animate={{ opacity: [0.4, 0.6, 0.4] }} transition={{ duration: 5, repeat: Infinity, delay: 2 }} className="absolute top-60 left-1/2 font-mono text-purple-400 text-sm">
                  {`function createMagic() { }`}
               </motion.div>
            </div>
         </div>

         {/* Main Content */}
         <div className="relative z-10 container mx-auto px-4 py-16">
            {/* Header Section */}
            <motion.div variants={containerVariants} className="text-center mb-16">
               <motion.div variants={itemVariants} className="inline-block">
                  <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase bg-cyan-400/10 px-4 py-2 rounded-full border border-cyan-400/20">Web Development Services</span>
               </motion.div>

               <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-bold mt-6 mb-8 text-white">
                  Modern Web
                  <motion.span
                     className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400"
                     animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                     }}
                     transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                     }}
                  >
                     Solutions
                  </motion.span>
               </motion.h1>

               <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Building high-performance, scalable web applications with modern technologies like
                  <span className="text-cyan-400"> React</span>,<span className="text-blue-400"> Next.js</span>, and
                  <span className="text-purple-400"> TypeScript</span>. Transforming your ideas into digital reality.
               </motion.p>

               {/* Tech Stack Marquee */}
               <motion.div variants={itemVariants} className="mt-12 overflow-hidden">
                  <div className="flex space-x-8">
                     {[...technologies, ...technologies].map((tech, index) => (
                        <motion.span
                           key={`${tech}-${index}`}
                           className="text-gray-400 font-mono text-lg whitespace-nowrap"
                           animate={{ x: [0, -1920] }}
                           transition={{
                              x: {
                                 repeat: Infinity,
                                 repeatType: "loop",
                                 duration: 30,
                                 ease: "linear",
                              },
                           }}
                        >
                           {tech}
                        </motion.span>
                     ))}
                  </div>
               </motion.div>

               <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
                  <motion.button
                     whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 40px rgba(34, 211, 238, 0.5)",
                     }}
                     whileTap={{ scale: 0.95 }}
                     className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold text-white shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 flex items-center gap-3"
                  >
                     <span>Start Your Project</span>
                     <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        →
                     </motion.span>
                  </motion.button>

                  <motion.button
                     whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(255,255,255,0.1)",
                     }}
                     whileTap={{ scale: 0.95 }}
                     className="px-8 py-4 border-2 border-white/20 text-white rounded-xl font-semibold backdrop-blur-sm hover:border-white/40 transition-all duration-300"
                  >
                     View Portfolio
                  </motion.button>
               </motion.div>
            </motion.div>

            {/* Services Cards */}
            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
               {services.map((service, index) => (
                  <motion.div
                     key={service.title}
                     variants={cardVariants}
                     whileHover={{
                        y: -8,
                        scale: 1.02,
                        transition: { type: "spring", stiffness: 300 },
                     }}
                     className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-500 overflow-hidden h-full"
                  >
                     {/* Card Background Effect */}
                     <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                     {/* Icon */}
                     <motion.div
                        className="text-3xl mb-4"
                        whileHover={{
                           scale: 1.3,
                           rotate: 5,
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                     >
                        {service.icon}
                     </motion.div>

                     {/* Content */}
                     <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">{service.title}</h3>

                     <p className="text-gray-300 text-sm mb-4 leading-relaxed">{service.description}</p>

                     {/* Features List */}
                     <ul className="space-y-2 mb-4">
                        {service.features.map((feature, featureIndex) => (
                           <motion.li
                              key={feature}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * featureIndex }}
                              className="flex items-center gap-2 text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300"
                           >
                              <motion.div className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0" whileHover={{ scale: 1.5 }} />
                              {feature}
                           </motion.li>
                        ))}
                     </ul>

                     {/* Tech Tags */}
                     <div className="flex flex-wrap gap-1 mt-4">
                        {service.tech.map((tech) => (
                           <span key={tech} className="px-2 py-1 bg-cyan-400/10 text-cyan-400 text-xs rounded-md border border-cyan-400/20">
                              {tech}
                           </span>
                        ))}
                     </div>

                     {/* Hover Border Effect */}
                     <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                        <div className="absolute inset-[2px] rounded-2xl bg-slate-900" />
                     </div>
                  </motion.div>
               ))}
            </motion.div>

            {/* Stats Section */}
            <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16">
               {[
                  { number: "50+", label: "Projects Completed" },
                  { number: "100%", label: "Client Satisfaction" },
                  { number: "3+", label: "Years Experience" },
                  { number: "24/7", label: "Code Delivery" },
               ].map((stat, index) => (
                  <motion.div key={stat.label} variants={itemVariants} whileHover={{ scale: 1.05 }} className="text-center bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                     <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{stat.number}</div>
                     <div className="text-gray-400 text-sm mt-2">{stat.label}</div>
                  </motion.div>
               ))}
            </motion.div>

            {/* Bottom CTA */}
            <motion.div variants={itemVariants} className="text-center mt-16">
               <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-md rounded-2xl p-8 border border-cyan-400/20 max-w-4xl mx-auto">
                  <h3 className="text-2xl font-bold text-white mb-4">Ready to build something amazing?</h3>
                  <p className="text-gray-300 mb-6">Let's discuss your project and bring your vision to life with modern web technologies.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-3 bg-cyan-500 text-white rounded-xl font-semibold hover:bg-cyan-600 transition-all duration-300">
                        Get Free Quote
                     </motion.button>
                     <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-3 border border-cyan-400 text-cyan-400 rounded-xl font-semibold hover:bg-cyan-400/10 transition-all duration-300">
                        Schedule Call
                     </motion.button>
                  </div>
               </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 1 }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
               <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center text-gray-400">
                  <span className="text-sm mb-2">Scroll to explore</span>
                  <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                     <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
                  </div>
               </motion.div>
            </motion.div>
         </div>
      </motion.section>
   );
};

export default ServicesHeader;
