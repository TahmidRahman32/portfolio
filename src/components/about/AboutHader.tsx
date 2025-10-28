"use client"; // Add this at the top

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// You can replace this with your actual background image
// import aboutBg from "../../../public/about-bg.jpg";

const AboutHeader = () => {
   const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
   });

   // Animation variants
 



   const statsVariants = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
         opacity: 1,
         scale: 1,
         transition: {
            duration: 0.6,
            ease: "back.out(1.7)",
         },
      },
   };

   const floatingVariants = {
      floating: {
         y: [-10, 10, -10],
         transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
         },
      },
   };

   return (
      <motion.section ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} className="relative container mx-auto my-3 rounded-3xl flex items-center justify-center overflow-hidden">
         {/* Background Image with Overlay - Using CSS background for demo */}
         <div className="absolute inset-0 z-0">
            {/* Using CSS background instead of Next.js Image for demo */}
            <div
               className="w-full h-full"
               style={{
                  backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect fill="%231e1b4b" width="1200" height="800"/><g fill="%2336368a" opacity="0.4"><circle cx="800" cy="400" r="200"/><circle cx="400" cy="600" r="150"/></g></svg>')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
               }}
            />

            {/* Dark Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>

            {/* Animated Gradient Overlay */}
            <motion.div
               className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-pink-900/20"
               animate={{
                  background: [
                     "linear-gradient(45deg, rgba(30, 58, 138, 0.2) 0%, rgba(88, 28, 135, 0.3) 50%, rgba(190, 24, 93, 0.2) 100%)",
                     "linear-gradient(135deg, rgba(190, 24, 93, 0.2) 0%, rgba(30, 58, 138, 0.2) 50%, rgba(88, 28, 135, 0.3) 100%)",
                     "linear-gradient(225deg, rgba(88, 28, 135, 0.3) 0%, rgba(190, 24, 93, 0.2) 50%, rgba(30, 58, 138, 0.2) 100%)",
                  ],
               }}
               transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
               }}
            />
         </div>

         {/* Main Content */}
         <motion.div  className="relative z-10 container mx-auto px-4 py-16 text-center text-white">
            {/* Title Section */}
            <motion.div  className="mb-12">
               <motion.h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                  About Me
               </motion.h1>
               <motion.div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto mb-8" initial={{ width: 0 }} animate={inView ? { width: 96 } : { width: 0 }} transition={{ delay: 0.5, duration: 1 }} />
               <motion.p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-gray-200" >
                  Passionate Full Stack Developer crafting digital experiences that blend <span className="text-cyan-400 font-semibold">innovation</span> with <span className="text-purple-400 font-semibold">functionality</span>
               </motion.p>
            </motion.div>

            {/* Stats Section */}
            <motion.div  className="md:grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto md:mb-16 hidden">
               {[
                  { number: "3+", label: "Years Experience" },
                  { number: "50+", label: "Projects Completed" },
                  { number: "100%", label: "Client Satisfaction" },
                  { number: "24/7", label: "Code Enthusiast" },
               ].map((stat, index) => (
                  <motion.div
                     key={stat.label}
                     variants={statsVariants}
                     whileHover={{
                        scale: 1.1,
                        y: -5,
                        transition: { type: "spring", stiffness: 300 },
                     }}
                     className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl"
                  >
                     <motion.div variants={floatingVariants} animate="floating" className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-2">
                        {stat.number}
                     </motion.div>
                     <div className="text-gray-300 text-sm md:text-base">{stat.label}</div>
                  </motion.div>
               ))}
            </motion.div>

            {/* CTA Section */}
            <motion.div  className="flex flex-col sm:flex-row gap-4 justify-center items-center">
               <motion.button
                  whileHover={{
                     scale: 1.05,
                     boxShadow: "0 0 30px rgba(34, 211, 238, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
               >
                  Download Resume
               </motion.button>
               <motion.button
                  whileHover={{
                     scale: 1.05,
                     boxShadow: "0 0 30px rgba(147, 51, 234, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-purple-500 text-purple-300 rounded-full font-semibold backdrop-blur-sm hover:bg-purple-500/10 transition-all duration-300"
               >
                  View My Work
               </motion.button>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
               <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
                  <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-1 h-3 bg-cyan-400 rounded-full mt-2" />
               </motion.div>
            </motion.div>
         </motion.div>

         {/* Floating Elements */}
         <motion.div variants={floatingVariants} animate="floating" className="absolute top-20 left-10 w-4 h-4 bg-cyan-400 rounded-full opacity-60" />
         <motion.div variants={floatingVariants} animate="floating" transition={{ delay: 1 }} className="absolute top-40 right-20 w-6 h-6 bg-purple-500 rounded-full opacity-40" />
         <motion.div variants={floatingVariants} animate="floating" transition={{ delay: 2 }} className="absolute bottom-40 left-20 w-3 h-3 bg-blue-400 rounded-full opacity-50" />
      </motion.section>
   );
};

export default AboutHeader;
