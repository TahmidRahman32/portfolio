// "use client";

// import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
// import { cn } from "../lib/utils";
// import { AnimatedBubbleParticlesProps, ParticleConfig } from "../type/animatedType";

// const AnimatedBubbleParticles: React.FC<AnimatedBubbleParticlesProps> = ({
//    className,
//    backgroundColor = "#edf3f8",
//    particleColor = "#3e82f7",
//    particleSize = 30,
//    spawnInterval = 180,
//    height = "100vh",
//    width = "100vw",
//    enableGooEffect = true,
//    blurStrength = 12,
//    pauseOnBlur = true,
//    zIndex = 1,
//    friction = { min: 1, max: 2 },
//    scaleRange = { min: 0.4, max: 2.4 },
//    children,
// }) => {
//    const containerRef = useRef<HTMLDivElement>(null);
//    const particlesRef = useRef<HTMLDivElement>(null);
//    const animationRef = useRef<number | undefined>(undefined);
//    const intervalRef = useRef<number | undefined>(undefined);
//    const particlesArrayRef = useRef<ParticleConfig[]>([]);
//    const isPausedRef = useRef(false);

//    // Fix: Use ref for animate function to avoid "variable accessed before declaration"
//    const animateRef = useRef<FrameRequestCallback | null>(null);

//    // Fix: Initialize with empty string and set in useEffect
//    const gooIdRef = useRef<string>("");

//    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

//    // Fix: Set the random ID in useEffect to avoid impure render

//   if (!gooIdRef.current) {
//      gooIdRef.current = "goo-" + Math.random().toString(36).substring(2, 11);
//   }



//    const createParticleElement = useCallback(() => {
//       const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//       svg.style.cssText = "display: block;" + "width: " + particleSize + "px;" + "height: " + particleSize + "px;" + "position: absolute;" + "transform: translateZ(0px);";
//       svg.setAttribute("viewBox", "0 0 67.4 67.4");

//       const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//       circle.setAttribute("cx", "33.7");
//       circle.setAttribute("cy", "33.7");
//       circle.setAttribute("r", "33.7");
//       circle.setAttribute("fill", particleColor);

//       svg.appendChild(circle);
//       return svg;
//    }, [particleSize, particleColor]);

//    const createParticle = useCallback((): ParticleConfig => {
//       const element = createParticleElement();
//       if (particlesRef.current) {
//          particlesRef.current.appendChild(element);
//       }

//       const x = Math.random() * dimensions.width;
//       const y = dimensions.height + 100;
//       const steps = dimensions.height / 2;
//       const frictionValue = friction.min + Math.random() * (friction.max - friction.min);
//       const scale = scaleRange.min + Math.random() * (scaleRange.max - scaleRange.min);
//       const siner = (dimensions.width / 2.5) * Math.random();
//       const rotationDirection = Math.random() > 0.5 ? "+" : "-";

//       element.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";

//       return {
//          x,
//          y,
//          vx: 0,
//          vy: 0,
//          scale,
//          rotation: 0,
//          rotationDirection,
//          siner,
//          steps,
//          friction: frictionValue,
//          element,
//       };
//    }, [createParticleElement, dimensions, friction, scaleRange]);

//    const updateParticle = useCallback(
//       (particle: ParticleConfig): boolean => {
//          particle.y -= particle.friction;

//          const left = particle.x + Math.sin((particle.y * Math.PI) / particle.steps) * particle.siner;
//          const top = particle.y;
//          const rotation = particle.rotationDirection + (particle.y + particleSize);

//          if (particle.element) {
//             const element = particle.element as SVGElement;
//             element.style.transform = "translateX(" + left + "px) translateY(" + top + "px) scale(" + particle.scale + ") rotate(" + rotation + "deg)";
//          }

//          if (particle.y < -particleSize) {
//             if (particle.element && particle.element.parentNode) {
//                particle.element.parentNode.removeChild(particle.element);
//             }
//             return false;
//          }

//          return true;
//       },
//       [particleSize]
//    );

//    const spawnParticle = useCallback(() => {
//       if (!isPausedRef.current && dimensions.width > 0 && dimensions.height > 0) {
//          const particle = createParticle();
//          particlesArrayRef.current.push(particle);
//       }
//    }, [dimensions, createParticle]);

//    // Fix: Use useEffect to set up the animation with ref approach
//    useEffect(() => {
//       const animate: FrameRequestCallback = () => {
//          if (isPausedRef.current) {
//             animationRef.current = requestAnimationFrame(animateRef.current!);
//             return;
//          }

//          particlesArrayRef.current = particlesArrayRef.current.filter(updateParticle);
//          animationRef.current = requestAnimationFrame(animateRef.current!);
//       };

//       animateRef.current = animate;

//       if (dimensions.width > 0 && dimensions.height > 0) {
//          animationRef.current = requestAnimationFrame(animateRef.current!);
//          intervalRef.current = window.setInterval(spawnParticle, spawnInterval);
//       }

//       return () => {
//          if (animationRef.current) {
//             cancelAnimationFrame(animationRef.current);
//          }
//          if (intervalRef.current) {
//             clearInterval(intervalRef.current);
//          }
//       };
//    }, [dimensions, spawnInterval, updateParticle, spawnParticle]);

//    useEffect(() => {
//       const updateDimensions = () => {
//          if (containerRef.current) {
//             const rect = containerRef.current.getBoundingClientRect();
//             setDimensions({ width: rect.width, height: rect.height });
//          }
//       };

//       updateDimensions();
//       window.addEventListener("resize", updateDimensions);
//       return () => window.removeEventListener("resize", updateDimensions);
//    }, []);

//    useEffect(() => {
//       if (!pauseOnBlur) return;

//       const handleBlur = () => {
//          isPausedRef.current = true;
//       };
//       const handleFocus = () => {
//          isPausedRef.current = false;
//       };

//       window.addEventListener("blur", handleBlur);
//       window.addEventListener("focus", handleFocus);

//       return () => {
//          window.removeEventListener("blur", handleBlur);
//          window.removeEventListener("focus", handleFocus);
//       };
//    }, [pauseOnBlur]);

//    // Cleanup effect for particle elements
//    useEffect(() => {
//       return () => {
//          particlesArrayRef.current.forEach((particle) => {
//             if (particle.element && particle.element.parentNode) {
//                particle.element.parentNode.removeChild(particle.element);
//             }
//          });
//          particlesArrayRef.current = [];
//       };
//    }, []);

//    const backgroundClass = (() => {
//       if (className && className.split(" ").some((cls) => cls.startsWith("bg-"))) {
//          return "";
//       }
//       return `bg-[${backgroundColor}]`;
//    })();

//    return (
//       <div
//          ref={containerRef}
//          className={cn("relative overflow-hidden", "w-screen h-screen", backgroundClass, className)}
//          style={{
//             zIndex,
//             width: width,
//             height: height,
//          }}
//       >
//          <div
//             ref={particlesRef}
//             className="absolute inset-0 w-full h-full pointer-events-none z-0"
//             style={{
//                filter: enableGooEffect && gooIdRef.current ? "url(#" + gooIdRef.current + ")" : undefined,
//             }}
//          />

//          <div className="absolute inset-0 flex items-center justify-center z-10 w-full h-full">{children}</div>

//          {enableGooEffect && (
//             <svg className="absolute w-0 h-0 z-0">
//                <defs>
//                   <filter id={gooIdRef.current}>
//                      <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={blurStrength} />
//                      <feColorMatrix in="blur" result="colormatrix" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -9" />
//                      <feBlend in="SourceGraphic" in2="colormatrix" />
//                   </filter>
//                </defs>
//             </svg>
//          )}
//       </div>
//    );
// };

// export { AnimatedBubbleParticles };
// export default AnimatedBubbleParticles;
