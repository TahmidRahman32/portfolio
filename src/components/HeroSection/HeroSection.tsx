"use client";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import image1 from "../../../public/image/web-profile-Photoroom.png";

import Box1 from "./container/Box1";

// Register ScrollTrigger
if (typeof window !== "undefined") {
   gsap.registerPlugin(ScrollTrigger);
}

const HeroSection = () => {
   const sectionRef = useRef<HTMLDivElement>(null);
   const imageRef = useRef<HTMLDivElement>(null);
   const glowRef = useRef<HTMLDivElement>(null);
   const textRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const ctx = gsap.context(() => {
         // Section entrance animation
         gsap.fromTo(
            sectionRef.current,
            { opacity: 0, y: 50 },
            {
               opacity: 1,
               y: 0,
               duration: 1,
               scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top 80%",
                  end: "bottom 20%",
                  toggleActions: "play none none reverse",
               },
            }
         );

         // Image animation
         gsap.fromTo(
            imageRef.current,
            { scale: 0.8, opacity: 0.9, rotation: -10 },
            {
               scale: 1,
               opacity: 1,
               rotation: 0,
               duration: 1.2,
               ease: "back.out(1.7)",
               scrollTrigger: {
                  trigger: imageRef.current,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
               },
            }
         );

         // Glow pulse animation
         gsap.to(glowRef.current, {
            scale: 1.1,
            opacity: 0.5,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
         });

         // Image hover effect
         if (imageRef.current) {
            imageRef.current.addEventListener("mouseenter", () => {
               gsap.to(imageRef.current, {
                  scale: 1.05,
                  y: -12,
                  rotation: -3,
                  boxShadow: "0 0 40px #a3120d, 0 0 60px #a3120d40",
                  duration: 0.3,
                  ease: "power2.out",
               });
            });

            imageRef.current.addEventListener("mouseleave", () => {
               gsap.to(imageRef.current, {
                  scale: 1,
                  y: 0,
                  rotation: 0,
                  boxShadow: "0 0 25px #a3120d",
                  duration: 0.3,
                  ease: "power2.out",
               });
            });
         }
      });

      return () => ctx.revert();
   }, []);

   return (
      <div ref={sectionRef} className="container mx-auto justify-between items-center grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-2 gap-4 p-4 bg-[#4b1614] dark:bg-[#4b1614] my-6 rounded-3xl ">
         {/* Left Column - Box1 */}
         <div className="flex flex-col justify-between">
            <div className="transform transition-all duration-500 hover:scale-105">
               <Box1 />
            </div>
         </div>

         {/* Middle Column - Image and Text */}
         <div className="flex flex-col items-center">
            <div className="relative flex justify-center items-center md:h-[450px]">
               {/* Glow Shadow */}
               <div ref={glowRef} className="absolute w-[400px] lg:w-[480px] h-[300px] lg:h-[350px] rounded-full bg-[#a3120d]/30 blur-2xl scale-105" />

               {/* Main Image */}
               <div ref={imageRef} className="relative z-10 rounded-full border-2 border-[hsl(2,79%,36%)] shadow-[0_0_25px_#a3120d] w-[200px] lg:w-[350px] h-[200px] lg:h-[350px] overflow-hidden cursor-pointer">
                  <Image src={image1} height={1000} width={1000} alt="Gaziur Rahman Tahmid - Full Stack Developer" className="object-cover w-[120%] h-[120%] scale-110" priority />
               </div>
            </div>

            {/* Text Content */}
            <div ref={textRef} className="text-center mt-1 font-serif lg:w-[450px]">
               <h1 className="text-3xl font-bold text-white">Gaziur Rahman Tahmid</h1>
               <h5 className="text-3xl font-primary-f font-bold font-primaryG bg-gradient-to-r from-[#511364] via-[#A08D6D] to-green-400 text-transparent bg-clip-text bg-300% animate-gradient">Full Stack</h5>
               <p className="text-white">Developer</p>
            </div>
         </div>
      </div>
   );
};

export default HeroSection;
