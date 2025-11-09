import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { LucideIcon, TrendingUp, Search, X, Sparkles, Zap, ArrowRight, ArrowLeft } from "lucide-react";

// NOTE: Placeholder for your custom Input component
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />;

// --- Core Data Interface ---
export interface ChainItem {
   id: string | number;
   name: string;
   icon: LucideIcon;
   details?: string;
   logo?: string;
   gradient?: string; // Optional gradient for background
}

// --- Internal Animated Type ---
type AnimatedChainItem = ChainItem & {
   distanceFromCenter: number;
   originalIndex: number;
};

// --- Component Props Interfaces ---
interface CarouselItemProps {
   chain: AnimatedChainItem;
   side: "left" | "right";
   isActive: boolean;
}

interface ChainCarouselProps {
   items: ChainItem[];
   scrollSpeedMs?: number;
   visibleItemCount?: number;
   className?: string;
   onChainSelect?: (chainId: ChainItem["id"], chainName: string) => void;
}

// --- Modern Carousel Item Component ---
const ModernCarouselItem: React.FC<CarouselItemProps> = ({ chain, side, isActive }) => {
   const { distanceFromCenter, id, name, details, logo, icon: FallbackIcon } = chain;
   const distance = Math.abs(distanceFromCenter);

   // Enhanced visual effects
   const opacity = 1 - distance / 3;
   const scale = 1 - distance * 0.15;
   const yOffset = distanceFromCenter * 60;
   const xOffset = side === "left" ? -distance * 40 : distance * 40;
   const blur = distance * 2;
   const zIndex = 100 - distance;

   return (
      <motion.div
         className={`absolute flex items-center gap-4 backdrop-blur-sm border
            ${isActive ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/40 shadow-lg shadow-blue-500/20" : "bg-white/5 border-white/10"}
            rounded-2xl px-6 py-4 transition-all duration-300
            ${side === "left" ? "flex-row-reverse" : "flex-row"}`}
         animate={{
            opacity,
            scale,
            y: yOffset,
            x: xOffset,
            filter: `blur(${blur}px)`,
         }}
         style={{ zIndex }}
         transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
         }}
         whileHover={{
            scale: scale * 1.05,
            y: yOffset - 5,
            transition: { duration: 0.2 },
         }}
      >
         {/* Icon/Logo Container */}
         <div className={`relative ${isActive ? "scale-110" : "scale-100"} transition-transform duration-300`}>
            <div className={`rounded-2xl p-3 ${isActive ? "bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30" : "bg-gray-800/60 border border-white/10"}`}>
               {logo ? <img src={logo} alt={`${name} logo`} className="size-8 rounded-lg object-cover" /> : <FallbackIcon className={`size-8 ${isActive ? "text-white" : "text-gray-300"}`} />}
            </div>

            {/* Active indicator */}
            {isActive && (
               <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute -top-1 -right-1">
                  <Sparkles className="size-4 text-yellow-400 fill-yellow-400" />
               </motion.div>
            )}
         </div>

         {/* Text Content */}
         <div className={`flex flex-col mx-2 ${side === "left" ? "text-right" : "text-left"}`}>
            <span className={`text-sm font-semibold transition-colors duration-300 ${isActive ? "text-white" : "text-gray-200"} whitespace-nowrap`}>{name}</span>
            <span className={`text-xs transition-colors duration-300 ${isActive ? "text-blue-200" : "text-gray-400"}`}>{details}</span>
         </div>

         {/* Active arrow indicator */}
         {isActive && (
            <motion.div initial={{ opacity: 0, x: side === "left" ? 10 : -10 }} animate={{ opacity: 1, x: 0 }} className={`absolute ${side === "left" ? "left-2" : "right-2"} -bottom-6`}>
               <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-blue-400" />
            </motion.div>
         )}
      </motion.div>
   );
};

// --- Main Modernized Component ---
const ModernChainCarousel: React.FC<ChainCarouselProps> = ({ items, scrollSpeedMs = 2000, visibleItemCount = 7, className = "", onChainSelect }) => {
   const [currentIndex, setCurrentIndex] = useState(0);
   const [isPaused, setIsPaused] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");
   const [showDropdown, setShowDropdown] = useState(false);
   const [direction, setDirection] = useState(0); // -1 for left, 1 for right, 0 for initial

   const rightSectionRef = useRef<HTMLDivElement>(null);
   const isInView = useInView(rightSectionRef, { margin: "-100px 0px -100px 0px" });
   const totalItems = items.length;

   // Enhanced auto-scroll with direction tracking
   useEffect(() => {
      if (isPaused || totalItems === 0) return;

      const interval = setInterval(() => {
         setDirection(1);
         setCurrentIndex((prev) => (prev + 1) % totalItems);
      }, scrollSpeedMs);

      return () => clearInterval(interval);
   }, [isPaused, totalItems, scrollSpeedMs]);

   // Scroll listener with enhanced pause duration
   useEffect(() => {
      let timeoutId: NodeJS.Timeout;
      const handleScroll = () => {
         setIsPaused(true);
         clearTimeout(timeoutId);
         timeoutId = setTimeout(() => {
            setIsPaused(false);
         }, 800);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
         window.removeEventListener("scroll", handleScroll);
         clearTimeout(timeoutId);
      };
   }, []);

   // Manual navigation
   const navigate = (dir: -1 | 1) => {
      setDirection(dir);
      setCurrentIndex((prev) => {
         if (dir === 1) return (prev + 1) % totalItems;
         return prev === 0 ? totalItems - 1 : prev - 1;
      });
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 3000);
   };

   // Memoized function for carousel items
   const getVisibleItems = useCallback((): AnimatedChainItem[] => {
      const visibleItems: AnimatedChainItem[] = [];
      if (totalItems === 0) return [];

      const itemsToShow = visibleItemCount % 2 === 0 ? visibleItemCount + 1 : visibleItemCount;
      const half = Math.floor(itemsToShow / 2);

      for (let i = -half; i <= half; i++) {
         let index = currentIndex + i;
         if (index < 0) index += totalItems;
         if (index >= totalItems) index -= totalItems;

         visibleItems.push({
            ...items[index],
            originalIndex: index,
            distanceFromCenter: i,
         });
      }
      return visibleItems;
   }, [currentIndex, items, totalItems, visibleItemCount]);

   // Filtered list for search dropdown
   const filteredItems = useMemo(() => {
      return items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
   }, [items, searchTerm]);

   // Handler for selecting an item from the dropdown
   const handleSelectChain = (id: ChainItem["id"], name: string) => {
      const index = items.findIndex((c) => c.id === id);
      if (index !== -1) {
         setDirection(index > currentIndex ? 1 : -1);
         setCurrentIndex(index);
         setIsPaused(true);
         if (onChainSelect) {
            onChainSelect(id, name);
         }
      }
      setSearchTerm(name);
      setShowDropdown(false);
   };

   const currentItem = items[currentIndex];

   return (
      <div id="explore-section" className={`relative  overflow-hidden ${className}`}>
         {/* Animated Background */}
         <div className="absolute inset-0 md:my-4 container mx-auto md:rounded-2xl bg-[#4b1614] dark:bg-[#4b1614] mt-1 md:mt-0">
            {/* Animated particles/background elements */}
            <div className="absolute inset-0">
               <motion.div
                  animate={{
                     scale: [1, 1.2, 1],
                     opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                     duration: 8,
                     repeat: Infinity,
                     ease: "easeInOut",
                  }}
                  className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
               />
               <motion.div
                  animate={{
                     scale: [1.2, 1, 1.2],
                     opacity: [0.15, 0.25, 0.15],
                  }}
                  transition={{
                     duration: 6,
                     repeat: Infinity,
                     ease: "easeInOut",
                     delay: 2,
                  }}
                  className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
               />
               <motion.div
                  animate={{
                     scale: [1, 1.1, 1],
                     opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                     duration: 7,
                     repeat: Infinity,
                     ease: "easeInOut",
                     delay: 4,
                  }}
                  className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"
               />
            </div>
         </div>

         <div className="relative z-10 py-20">
            <div className="flex flex-col xl:flex-row container mx-auto px-4 md:px-8 gap-12 justify-center items-center">
               {/* Left Carousel Section */}
               <motion.div
                  className="relative w-full max-w-md xl:max-w-2xl h-[500px] flex items-center justify-center hidden xl:flex"
                  onMouseEnter={() => !searchTerm && setIsPaused(true)}
                  onMouseLeave={() => !searchTerm && setIsPaused(false)}
                  initial={{ x: -100, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : {}}
                  transition={{
                     type: "spring",
                     stiffness: 60,
                     damping: 20,
                     duration: 0.8,
                  }}
               >
                  {/* Gradient overlays */}
                  <div className="absolute inset-0 z-10 pointer-events-none">
                     <div className="absolute top-0 h-1/3 w-full bg-gradient-to-b from-slate-900 to-transparent" />
                     <div className="absolute bottom-0 h-1/3 w-full bg-gradient-to-t from-slate-900 to-transparent" />
                  </div>

                  {getVisibleItems().map((chain) => (
                     <ModernCarouselItem key={`left-${chain.id}`} chain={chain} side="left" isActive={chain.distanceFromCenter === 0} />
                  ))}
               </motion.div>

               {/* Center Content Section */}
               <motion.div initial={{ y: 50, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ delay: 0.3, duration: 0.7 }} className="flex flex-col text-center items-center gap-8 max-w-2xl">
                  {/* Header */}
                  <div className="space-y-4">
                     <motion.h2 initial={{ scale: 0.9, opacity: 0 }} animate={isInView ? { scale: 1, opacity: 1 } : {}} transition={{ delay: 0.5, duration: 0.6 }} className="text-4xl md:text-6xl font-bold text-white">
                        Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Ecosystems</span>
                     </motion.h2>
                     <motion.p initial={{ y: 20, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ delay: 0.7, duration: 0.6 }} className="text-xl text-gray-300 max-w-lg">
                        Discover and connect with various blockchain networks and platforms
                     </motion.p>
                  </div>

                  {/* Current Item Display */}
                  <AnimatePresence mode="wait">
                     {currentItem && (
                        <motion.div
                           key={currentItem.id}
                           initial={{ scale: 0.8, opacity: 0, y: 20 }}
                           animate={{ scale: 1, opacity: 1, y: 0 }}
                           exit={{ scale: 0.8, opacity: 0, y: -20 }}
                           transition={{ duration: 0.5 }}
                           className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 max-w-md w-full"
                        >
                           <div className="flex flex-col items-center gap-4">
                              <div className="relative">
                                 <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/30">
                                    {currentItem.logo ? <img src={currentItem.logo} alt={`${currentItem.name} logo`} className="size-16 rounded-xl object-cover" /> : <currentItem.icon className="size-16 text-white" />}
                                 </div>
                                 <motion.div
                                    animate={{
                                       rotate: [0, 360],
                                    }}
                                    transition={{
                                       duration: 20,
                                       repeat: Infinity,
                                       ease: "linear",
                                    }}
                                    className="absolute -inset-2 border-2 border-blue-400/30 rounded-2xl"
                                 />
                              </div>

                              <div className="text-center space-y-2">
                                 <h3 className="text-2xl font-bold text-white">{currentItem.name}</h3>
                                 <p className="text-gray-300">{currentItem.details}</p>
                              </div>

                              {/* Navigation Controls */}
                              <div className="flex gap-4 mt-4">
                                 <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate(-1)} className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all duration-200">
                                    <ArrowLeft className="size-5 text-white" />
                                 </motion.button>

                                 <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate(1)} className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all duration-200">
                                    <ArrowRight className="size-5 text-white" />
                                 </motion.button>
                              </div>
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>

                  {/* Enhanced Search Bar */}
                  <motion.div initial={{ y: 30, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ delay: 0.9, duration: 0.6 }} className="relative max-w-lg w-full">
                     <div className="relative">
                        <Input
                           type="text"
                           value={searchTerm}
                           placeholder="Search ecosystems..."
                           onChange={(e) => {
                              const val = e.target.value;
                              setSearchTerm(val);
                              setShowDropdown(val.length > 0);
                              if (val === "") setIsPaused(false);
                           }}
                           onFocus={() => {
                              if (searchTerm.length > 0) setShowDropdown(true);
                              setIsPaused(true);
                           }}
                           onBlur={() => {
                              setTimeout(() => setShowDropdown(false), 200);
                           }}
                           className="w-full outline-none text-white bg-white/10 backdrop-blur-lg 
                              placeholder-gray-400 text-lg rounded-2xl border border-white/20 
                              pr-12 pl-12 py-4 cursor-pointer transition-all duration-300
                              hover:border-white/30 focus:border-blue-400 focus:bg-white/15"
                        />
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
                        {searchTerm && (
                           <button
                              onClick={() => {
                                 setSearchTerm("");
                                 setShowDropdown(false);
                                 setIsPaused(false);
                              }}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                           >
                              <X className="size-5" />
                           </button>
                        )}
                     </div>

                     {/* Enhanced Dropdown */}
                     <AnimatePresence>
                        {showDropdown && filteredItems.length > 0 && (
                           <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className="absolute left-0 right-0 mt-3 bg-white/10 backdrop-blur-lg 
                                 rounded-2xl border border-white/20 z-20 max-h-80 overflow-y-auto 
                                 shadow-2xl"
                           >
                              {filteredItems.slice(0, 8).map((chain, index) => (
                                 <motion.div
                                    key={chain.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onMouseDown={(e) => {
                                       e.preventDefault();
                                       handleSelectChain(chain.id, chain.name);
                                    }}
                                    className="flex items-center gap-3 px-4 py-4 cursor-pointer 
                                       hover:bg-white/10 transition-all duration-200 m-2 rounded-xl"
                                 >
                                    <div className="p-2 bg-white/10 rounded-lg">{chain.logo ? <img src={chain.logo} alt={`${chain.name} logo`} className="size-6 rounded object-cover" /> : <chain.icon size={20} className="text-blue-400" />}</div>
                                    <div className="flex-1">
                                       <span className="text-white font-medium">{chain.name}</span>
                                       <span className="block text-sm text-gray-400">{chain.details}</span>
                                    </div>
                                    <Zap className="size-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                 </motion.div>
                              ))}
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </motion.div>
               </motion.div>

               {/* Right Carousel Section */}
               <motion.div
                  ref={rightSectionRef}
                  className="relative w-full max-w-md xl:max-w-2xl h-[500px] flex items-center justify-center"
                  onMouseEnter={() => !searchTerm && setIsPaused(true)}
                  onMouseLeave={() => !searchTerm && setIsPaused(false)}
                  initial={{ x: 100, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : {}}
                  transition={{
                     type: "spring",
                     stiffness: 60,
                     damping: 20,
                     duration: 0.8,
                  }}
               >
                  {/* Gradient overlays */}
                  <div className="absolute inset-0 z-10 pointer-events-none">
                     <div className="absolute top-0 h-1/3 w-full bg-gradient-to-b from-slate-900 to-transparent" />
                     <div className="absolute bottom-0 h-1/3 w-full bg-gradient-to-t from-slate-900 to-transparent" />
                  </div>

                  {getVisibleItems().map((chain) => (
                     <ModernCarouselItem key={`right-${chain.id}`} chain={chain} side="right" isActive={chain.distanceFromCenter === 0} />
                  ))}
               </motion.div>
            </div>
         </div>
      </div>
   );
};

export default ModernChainCarousel;
