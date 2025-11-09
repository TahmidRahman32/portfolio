// components/AboutSection.jsx
"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import profilePic from "../../../public/image/portfolio-2-size.png"; 
import {  Bitcoin, Link, Zap, Globe } from "lucide-react";
import ChainCarousel, { ChainItem } from "./SkillCarousel";

const AboutSection = () => {
   const [animated, setAnimated] = useState(false);

  useEffect(() => {
     const id = requestAnimationFrame(() => setAnimated(true));
     return () => cancelAnimationFrame(id);
  }, []);

   const skills = [
      { name: "JavaScript", level: 90 },
      { name: "React/Next.js", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Node.js", level: 75 },
      { name: "Tailwind CSS", level: 95 },
      { name: "PostgresSQL", level: 70 },
   ];

   const funFacts = [
      "I've visited 15 countries and love documenting my travels through photography",
      "I'm a certified coffee enthusiast and can distinguish between 10+ coffee varieties",
      "I once participated in a 48-hour hackathon and built a complete MVP alone",
      "I'm learning to play the guitar and can play 5 songs (almost) perfectly",
   ];

 

const chainData: ChainItem[] = [
   {
      id: 1,
      name: "Ethereum",
      icon: Globe,
      details: "Mainnet • 12.5M+ transactions",
      logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png", // Working alternative
   },
   {
      id: 2,
      name: "Bitcoin",
      icon: Bitcoin,
      details: "Layer 1 • Store of value",
      logo: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png", // Working alternative
   },
   {
      id: 3,
      name: "Polygon",
      icon: Link,
      details: "EVM compatible • Low fees",
      logo: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png", // Working alternative
   },
   {
      id: 4,
      name: "Lightning Network",
      icon: Zap,
      details: "Bitcoin L2 • Instant payments",
      // No logo - will use icon
   },
 
];

 const [currentFact, setCurrentFact] = useState(0);


useEffect(() => {
   const id = requestAnimationFrame(() => setAnimated(true));
   return () => cancelAnimationFrame(id);
}, []);

useEffect(() => {
   const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % funFacts.length);
   }, 5000);
   return () => clearInterval(interval);
}, [funFacts.length]);


   return (
      <section id="about" className="py-16 px-4 rounded-2xl bg-[#4b1614] dark:bg-[#4b1614] my-16 container mx-auto  text-white">
         <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">My Skills & Journey</h2>
            <p className="text-center text-blue-200 mb-12 max-w-2xl mx-auto">Full Stack Developer passionate about creating digital experiences that make a difference</p>

            <div className="flex flex-col lg:flex-row gap-12 items-center">
               {/* Image Column */}
               <div className="w-full lg:w-2/5 flex justify-center">
                  <div className="relative">
                     <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/30 shadow-lg glow floating ">
                        <Image src={profilePic} height={1000} width={1000} alt="main Image" className="object-cover w-[120%] h-[120%] scale-110 z-60" />
                     </div>
                     <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-4 rounded-2xl shadow-lg">
                        <p className="text-sm font-bold">
                           3+ Years
                           <br />
                           Experience
                        </p>
                     </div>
                  </div>
               </div>

               {/* Text Column */}
               <div className="w-full lg:w-3/5">
                  {/* Bio */}
                  <div className="mb-10">
                     <h3 className="text-2xl font-bold mb-4 text-white border-b border-blue-400 pb-2">My Journey</h3>
                     <div className="space-y-4 text-slate-200">
                        <p>
                           I'm a passionate full-stack developer with over 5 years of experience creating digital solutions that blend elegant design with robust functionality. My journey began with a computer science degree and has evolved through
                           working with startups and established companies alike.
                        </p>
                        <p>
                           I specialize in creating responsive web applications using modern technologies like React, Next.js, Node.js, and cloud platforms. I believe in writing clean, maintainable code and following best practices to deliver
                           high-quality products that exceed client expectations.
                        </p>
                        <p>
                           When I'm not coding, you can find me contributing to open-source projects, exploring new technologies, or mentoring aspiring developers. I'm always excited to take on new challenges and collaborate on innovative projects.
                        </p>
                     </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-10">
                     <h3 className="text-2xl font-bold mb-6 text-white border-b border-blue-400 pb-2">Skills & Expertise</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {skills.map((skill, index) => (
                           <div key={skill.name} className="mb-2">
                              <div className="flex justify-between mb-1">
                                 <span className="font-medium text-slate-200">{skill.name}</span>
                                 <span className="text-sm text-blue-300">{skill.level}%</span>
                              </div>
                              <div className="w-full bg-slate-700 rounded-full h-2.5">
                                 <div
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full skill-bar"
                                    style={{
                                       width: animated ? `${skill.level}%` : "0%",
                                       transition: `width 1s ease-in-out ${index * 0.1}s`,
                                    }}
                                 ></div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Fun Fact */}
                  {/* <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                     <h3 className="text-2xl font-bold mb-4 text-white flex items-center">
                        <span className="text-yellow-400 mr-2">✨</span>
                        Fun Fact
                     </h3>
                     <div className="min-h-[60px] flex items-center">
                        <p className="text-slate-200 italic transition-opacity duration-500">{funFacts[currentFact]}</p>
                     </div>
                     <div className="flex justify-center mt-4 space-x-1">
                        {funFacts.map((_, index) => (
                           <button key={index} onClick={() => setCurrentFact(index)} className={`w-2 h-2 rounded-full transition-colors ${index === currentFact ? "bg-blue-500" : "bg-slate-600"}`} />
                        ))}
                        <ChainCarousel items={chainData} />
                     </div>
                  </div> */}

                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                     <h3 className="text-2xl font-bold mb-4 text-white flex justify-center items-center">
                        <span className="text-yellow-400 mr-2">✨</span>
                        Fun Fact
                     </h3>
                     {/* <div className="min-h-[60px] flex items-center">
                        <p className="text-slate-200 italic transition-opacity duration-500">{funFacts[currentFact]}</p>
                     </div> */}
                     {/* <div className="flex justify-center mt-4 space-x-1">
                        {funFacts.map((_, index) => (
                           <button key={index} onClick={() => setCurrentFact(index)} className={`w-2 h-2 rounded-full transition-colors ${index === currentFact ? "bg-blue-500" : "bg-slate-600"}`} />
                        ))}
                     </div> */}
                     {/* Add the ChainCarousel here */}
                     <ChainCarousel items={chainData} className="mt-4" />
                  </div>
               </div>
            </div>
         </div>

         <style jsx>{`
            .glow {
               box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
            }
            .floating {
               animation: floating 3s ease-in-out infinite;
            }
            @keyframes floating {
               0% {
                  transform: translate(0, 0px);
               }
               50% {
                  transform: translate(0, -10px);
               }
               100% {
                  transform: translate(0, 0px);
               }
            }
         `}</style>
      </section>
   );
};

export default AboutSection;
