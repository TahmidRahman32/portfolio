// app/resume-builder/templates/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TemplatesPage() {
   const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
   const [filter, setFilter] = useState("all");

   const templates = [
      {
         id: "modern",
         name: "Modern",
         category: "professional",
         description: "Clean, contemporary design with bold accents",
         color: "from-blue-500 to-purple-600",
         emoji: "🔄",
         difficulty: "Easy",
         popular: true,
         preview: "/templates/modern-preview.jpg",
      },
      {
         id: "professional",
         name: "Professional",
         category: "professional",
         description: "Traditional layout trusted by recruiters",
         color: "from-gray-600 to-gray-800",
         emoji: "💼",
         difficulty: "Easy",
         popular: true,
         preview: "/templates/professional-preview.jpg",
      },
      {
         id: "minimal",
         name: "Minimal",
         category: "creative",
         description: "Simple, elegant, and distraction-free",
         color: "from-green-500 to-teal-600",
         emoji: "📄",
         difficulty: "Easy",
         popular: false,
         preview: "/templates/minimal-preview.jpg",
      },
      {
         id: "creative",
         name: "Creative",
         category: "creative",
         description: "Bold design for creative industries",
         color: "from-orange-500 to-red-600",
         emoji: "🎨",
         difficulty: "Medium",
         popular: true,
         preview: "/templates/creative-preview.jpg",
      },
      {
         id: "executive",
         name: "Executive",
         category: "professional",
         description: "Sophisticated layout for senior roles",
         color: "from-indigo-600 to-purple-700",
         emoji: "👔",
         difficulty: "Medium",
         popular: false,
         preview: "/templates/executive-preview.jpg",
      },
      {
         id: "technical",
         name: "Technical",
         category: "professional",
         description: "Optimized for tech and engineering roles",
         color: "from-cyan-500 to-blue-600",
         emoji: "⚙️",
         difficulty: "Easy",
         popular: true,
         preview: "/templates/technical-preview.jpg",
      },
   ];

   const categories = [
      { id: "all", name: "All Templates", count: templates.length },
      { id: "professional", name: "Professional", count: templates.filter((t) => t.category === "professional").length },
      { id: "creative", name: "Creative", count: templates.filter((t) => t.category === "creative").length },
   ];

   const filteredTemplates = filter === "all" ? templates : templates.filter((template) => template.category === filter);

   return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
         {/* Header */}
         <header className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-4 py-6">
               <div className="flex items-center justify-between">
                  <Link href="/resume" className="flex items-center gap-3 group">
                     <motion.div whileHover={{ scale: 1.05 }} className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl group-hover:shadow-lg transition-shadow">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                     </motion.div>
                     <div>
                        <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
                        <p className="text-gray-600 text-sm">Professional Resume Templates</p>
                     </div>
                  </Link>
                  <Link href="/" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                     Back to Home
                  </Link>
               </div>
            </div>
         </header>

         {/* Hero Section */}
         <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
            <div className="container mx-auto px-4 text-center">
               <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-6xl font-bold mb-6">
                  Choose Your Template
               </motion.h1>
               <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                  Select from professionally designed A4 templates that help you stand out
               </motion.p>
            </div>
         </section>

         {/* Main Content */}
         <main className="container mx-auto px-4 py-12">
            {/* Category Filters */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-wrap gap-4 mb-12 justify-center">
               {categories.map((category) => (
                  <button
                     key={category.id}
                     onClick={() => setFilter(category.id)}
                     className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                        filter === category.id ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:shadow-md"
                     }`}
                  >
                     {category.name} ({category.count})
                  </button>
               ))}
            </motion.div>

            {/* Templates Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
               {filteredTemplates.map((template, index) => (
                  <motion.div
                     key={template.id}
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: index * 0.1 }}
                     whileHover={{ y: -5, scale: 1.02 }}
                     className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all duration-300 ${selectedTemplate === template.id ? "border-blue-500 ring-4 ring-blue-200" : "border-white hover:border-blue-300"}`}
                  >
                     {/* Template Header */}
                     <div className={`bg-gradient-to-r ${template.color} p-6 relative`}>
                        {template.popular && <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">Popular</div>}
                        <div className="flex items-center justify-between mb-4">
                           <span className="text-white text-3xl">{template.emoji}</span>
                           <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">{template.difficulty}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{template.name}</h3>
                        <p className="text-blue-100">{template.description}</p>
                     </div>

                     {/* Template Preview */}
                     <div className="p-6">
                        <div className="bg-gray-100 rounded-lg aspect-[3/4] mb-4 flex items-center justify-center border-2 border-dashed border-gray-300">
                           <div className="text-center p-8">
                              <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                 </svg>
                              </div>
                              <p className="text-gray-600 text-sm">Template Preview</p>
                              <p className="text-gray-500 text-xs mt-2">A4 Format • PDF Export</p>
                           </div>
                        </div>

                        <div className="flex gap-3">
                           <button
                              onClick={() => setSelectedTemplate(template.id)}
                              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                                 selectedTemplate === template.id ? "bg-blue-100 text-blue-700 border-2 border-blue-300" : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent"
                              }`}
                           >
                              {selectedTemplate === template.id ? "Selected" : "Preview"}
                           </button>
                           <Link
                              href={`/resume-builder?template=${template.id}`}
                              className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center"
                           >
                              Use Template
                           </Link>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </motion.div>

            {/* CTA Section */}
            <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-12 text-center text-white">
               <h2 className="text-4xl font-bold mb-6">Ready to Create Your Resume?</h2>
               <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Start with your chosen template and build a professional resume that gets you noticed by employers.</p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/resume-builder" className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                     Start Building Now
                  </Link>
                  <Link href="/" className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300">
                     Learn More
                  </Link>
               </div>
            </motion.section>

            {/* Features */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
               {[
                  {
                     icon: "🎯",
                     title: "ATS Friendly",
                     description: "Optimized for applicant tracking systems",
                  },
                  {
                     icon: "📱",
                     title: "Mobile Responsive",
                     description: "Works perfectly on all devices",
                  },
                  {
                     icon: "⚡",
                     title: "Quick Export",
                     description: "Download as PDF in one click",
                  },
               ].map((feature, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.05 }} className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                     <div className="text-4xl mb-4">{feature.icon}</div>
                     <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                     <p className="text-gray-600">{feature.description}</p>
                  </motion.div>
               ))}
            </motion.div>
         </main>

         {/* Footer */}
         <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4 text-center">
               <p className="text-gray-400">&copy; 2024 Resume Builder. All rights reserved.</p>
            </div>
         </footer>
      </div>
   );
}
