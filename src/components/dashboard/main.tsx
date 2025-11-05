// app/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import Image from "next/image";
import { SessionConfig } from "../sessions";
import { ArrowLeft } from "lucide-react";


export default function Dashboard() {
   const [activeTab, setActiveTab] = useState("overview");
   const [isLoading, setIsLoading] = useState(true);
   const session = SessionConfig();
   console.log(session?.data?.user)
   const imageUrl = session?.data?.user?.image || "/default-avatar.png";
   // Mock user data
   const userData = {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      plan: "Pro",
      resumeCount: 3,
      lastLogin: "2024-01-15",
   };

   // Mock resumes data
   const resumes = [
      {
         id: 1,
         name: "Software Engineer Resume",
         template: "Modern",
         lastEdited: "2 hours ago",
         preview: "/resumes/1.jpg",
         isPublic: true,
      },
      {
         id: 2,
         name: "Product Manager Resume",
         template: "Professional",
         lastEdited: "1 day ago",
         preview: "/resumes/2.jpg",
         isPublic: false,
      },
      {
         id: 3,
         name: "Frontend Developer",
         template: "Creative",
         lastEdited: "3 days ago",
         preview: "/resumes/3.jpg",
         isPublic: true,
      },
   ];

   // Mock stats data
   const stats = [
      {
         title: "Resumes Created",
         value: "3",
         change: "+2 this month",
         icon: "📄",
         color: "blue",
      },
      {
         title: "Profile Views",
         value: "147",
         change: "+12% this week",
         icon: "👁️",
         color: "green",
      },
      {
         title: "Downloaded",
         value: "8",
         change: "+3 today",
         icon: "📥",
         color: "purple",
      },
      {
         title: "Templates Used",
         value: "2",
         change: "Modern, Professional",
         icon: "🎨",
         color: "orange",
      },
   ];

   useEffect(() => {
      // Simulate loading
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
   }, []);

   if (isLoading) {
      return <DashboardSkeleton />;
   }

   return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 to-blue-500">
         {/* Header */}
         <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="container mx-auto px-4">
               <div className="flex items-center justify-between h-16">
                  <div className="flex items-center gap-3">
                     <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                     </motion.div>
                     <div>
                        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-gray-600 text-sm">ResumeBuilder</p>
                     </div>
                  </div>

                  <div className="flex items-center gap-4">
                     <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                           />
                        </svg>
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                     </button>

                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                           {session?.data?.user?.image ? (
                              <Image height={40} width={40} src={imageUrl} alt="User Avatar" className=" rounded-full" />
                           ) : (
                              userData.name
                                 .split(" ")
                                 .map((n) => n[0])
                                 .join("")
                           )}
                        </div>
                        <div className="hidden sm:block text-left">
                           <p className="text-sm font-medium text-gray-900">{session?.data?.user?.name}</p>
                           <p className="text-xs text-gray-600">Pro Plan</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </header>

         <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
               {/* Sidebar */}
               <div className="lg:col-span-1">
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-purple-200/20 dark:bg-purple-400/10  rounded-2xl shadow-sm border border-gray-200 p-6">
                     {/* User Profile Summary */}
                     <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center text-foreground font-bold text-xl">
                           {session?.data?.user?.image ? (
                              <Image height={64} width={64} src={imageUrl} alt="User Avatar" className="rounded-2xl" />
                           ) : (
                              userData.name
                                 .split(" ")
                                 .map((n) => n[0])
                                 .join("")
                           )}
                        </div>
                        <h2 className="font-bold text-foreground">{session?.data?.user?.name}</h2>
                        <p className="text-foreground text-sm mb-2">{session?.data?.user?.email}</p>
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-foreground text-xs font-semibold rounded-full">{userData.plan} Plan</span>
                     </div>

                     {/* Navigation */}
                     <nav className="space-y-2">
                        {[
                           { id: "overview", label: "Overview", icon: "📊" },
                           { id: "resumes", label: "My Resumes", icon: "📄" },
                           { id: "templates", label: "Templates", icon: "🎨" },
                           { id: "analytics", label: "Analytics", icon: "📈" },
                           { id: "settings", label: "Settings", icon: "⚙️" },
                        ].map((item) => (
                           <button
                              key={item.id}
                              onClick={() => setActiveTab(item.id)}
                              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                                 activeTab === item.id ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200" : "text-foreground hover:bg-gray-500"
                              }`}
                           >
                              <span className="text-lg">{item.icon}</span>
                              <span className="font-medium">{item.label}</span>
                           </button>
                        ))}
                     </nav>

                     {/* Quick Stats */}
                     <div className="mt-8 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white">
                        <h3 className="font-bold text-sm mb-2">Resume Storage</h3>
                        <div className="flex justify-between items-center text-xs mb-2">
                           <span>{userData.resumeCount} of 10 used</span>
                           <span>30%</span>
                        </div>
                        <div className="w-full bg-blue-400 rounded-full h-2">
                           <div className="bg-white h-2 rounded-full transition-all duration-500" style={{ width: "30%" }}></div>
                        </div>
                     </div>
                  </motion.div>
               </div>

               {/* Main Content */}
               <div className="lg:col-span-3">
                  {/* Welcome Section */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white mb-8">
                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                           <h1 className="text-3xl font-bold mb-2">Welcome back, {userData.name.split(" ")[0]}! 👋</h1>
                           <p className="text-blue-100 text-lg">Ready to create your next amazing resume?</p>
                        </div>
                        <div className="flex flex-col gap-4">
                           <Link href="/resume" className="mt-4 md:mt-0 px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                              + Create New Resume
                           </Link>
                           <Link href="/" className="mt-4 text-center md:mt-0 px-6 py-3 bg-gradient-to-r from-red-900 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                              <ArrowLeft size={18} />
                              Back to Home
                           </Link>
                        </div>
                     </div>
                  </motion.div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                     {stats.map((stat, index) => (
                        <motion.div
                           key={stat.title}
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: index * 0.1 }}
                           whileHover={{ y: -5, scale: 1.02 }}
                           className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
                        >
                           <div className="flex items-center justify-between mb-4">
                              <div className={`w-12 h-12 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 rounded-2xl flex items-center justify-center text-white text-xl`}>{stat.icon}</div>
                           </div>
                           <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                           <p className="text-gray-600 text-sm mb-2">{stat.title}</p>
                           <p className="text-green-600 text-xs font-semibold">{stat.change}</p>
                        </motion.div>
                     ))}
                  </div>

                  {/* Recent Resumes */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-purple-200/60 dark:bg-slate-400/80 rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
                     <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-foreground">Recent Resumes</h2>
                        <Link href="/resume-builder" className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-2">
                           View All
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                           </svg>
                        </Link>
                     </div>

                     <div className="space-y-4">
                        {resumes.map((resume, index) => (
                           <motion.div
                              key={resume.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                              whileHover={{ scale: 1.01 }}
                              className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-all duration-200"
                           >
                              <div className="flex items-center gap-4">
                                 <div className="w-12 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg border border-gray-300 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                 </div>
                                 <div>
                                    <h3 className="font-semibold text-gray-900">{resume.name}</h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                       <span>{resume.template} Template</span>
                                       <span>•</span>
                                       <span>Edited {resume.lastEdited}</span>
                                       {resume.isPublic && (
                                          <>
                                             <span>•</span>
                                             <span className="text-purple-00 font-semibold">Public</span>
                                          </>
                                       )}
                                    </div>
                                 </div>
                              </div>

                              <div className="flex items-center gap-3">
                                 <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                 </button>
                                 <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                 </button>
                                 <Link href={`/resume-builder?edit=${resume.id}`} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                                    Edit
                                 </Link>
                              </div>
                           </motion.div>
                        ))}
                     </div>
                  </motion.div>

                  {/* Quick Actions & Templates */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     {/* Quick Actions */}
                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                        <div className="grid grid-cols-2 gap-4">
                           {[
                              { icon: "🚀", label: "New Resume", color: "blue", href: "/resume-builder" },
                              { icon: "🎨", label: "Templates", color: "purple", href: "/resume-builder/templates" },
                              { icon: "📊", label: "Analytics", color: "green", href: "/dashboard/analytics" },
                              { icon: "⚙️", label: "Settings", color: "gray", href: "/dashboard/settings" },
                           ].map((action, index) => (
                              <Link key={action.label} href={action.href} className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 group">
                                 <div className={`w-10 h-10 bg-gradient-to-r from-${action.color}-500 to-${action.color}-600 rounded-xl flex items-center justify-center text-white text-lg mb-3 group-hover:scale-110 transition-transform`}>
                                    {action.icon}
                                 </div>
                                 <h3 className="font-semibold text-gray-900">{action.label}</h3>
                              </Link>
                           ))}
                        </div>
                     </motion.div>

                     {/* Recent Templates */}
                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Recommended Templates</h2>
                        <div className="space-y-4">
                           {[
                              { name: "Modern", used: true, emoji: "🔄" },
                              { name: "Professional", used: true, emoji: "💼" },
                              { name: "Executive", used: false, emoji: "👔" },
                              { name: "Creative", used: false, emoji: "🎨" },
                           ].map((template, index) => (
                              <div key={template.name} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:border-blue-300 transition-all duration-200">
                                 <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-lg">{template.emoji}</div>
                                    <div>
                                       <h3 className="font-semibold text-gray-900">{template.name}</h3>
                                       <p className="text-sm text-gray-600">{template.used ? "Used in your resumes" : "Try this template"}</p>
                                    </div>
                                 </div>
                                 <Link href={`/resume-builder?template=${template.name.toLowerCase()}`} className="px-3 py-1 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm">
                                    {template.used ? "Reuse" : "Try"}
                                 </Link>
                              </div>
                           ))}
                        </div>
                     </motion.div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

// Skeleton Loading Component
function DashboardSkeleton() {
   return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
         <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
               {/* Sidebar Skeleton */}
               <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-pulse">
                     <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gray-300 rounded-2xl mx-auto mb-4"></div>
                        <div className="h-4 bg-gray-300 rounded w-24 mx-auto mb-2"></div>
                        <div className="h-3 bg-gray-300 rounded w-32 mx-auto mb-2"></div>
                        <div className="h-6 bg-gray-300 rounded w-16 mx-auto"></div>
                     </div>
                     <div className="space-y-2">
                        {[...Array(5)].map((_, i) => (
                           <div key={i} className="h-12 bg-gray-300 rounded-xl"></div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Main Content Skeleton */}
               <div className="lg:col-span-3 space-y-8">
                  {/* Welcome Section Skeleton */}
                  <div className="bg-gray-300 rounded-2xl p-8 animate-pulse"></div>

                  {/* Stats Grid Skeleton */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                     {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 animate-pulse">
                           <div className="w-12 h-12 bg-gray-300 rounded-2xl mb-4"></div>
                           <div className="h-6 bg-gray-300 rounded w-16 mb-2"></div>
                           <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                           <div className="h-3 bg-gray-300 rounded w-20"></div>
                        </div>
                     ))}
                  </div>

                  {/* Recent Resumes Skeleton */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-pulse">
                     <div className="h-6 bg-gray-300 rounded w-32 mb-6"></div>
                     <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                           <div key={i} className="h-20 bg-gray-300 rounded-xl"></div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
