import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { LucideIcon, TrendingUp, Search, DeleteIcon } from "lucide-react";

// NOTE: Placeholder for your custom Input component
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />;

// --- Core Data Interface ---
export interface ChainItem {
   id: string | number;
   name: string;
   icon: LucideIcon;
   details?: string;
   logo?: string;
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
}

interface ChainCarouselProps {
   items: ChainItem[];
   scrollSpeedMs?: number;
   visibleItemCount?: number;
   className?: string;
   onChainSelect?: (chainId: ChainItem["id"], chainName: string) => void;
}

// --- Helper Components ---
const CarouselItemCard: React.FC<CarouselItemProps> = ({ chain, side }) => {
   const { distanceFromCenter, id, name, details, logo, icon: FallbackIcon } = chain;
   const distance = Math.abs(distanceFromCenter);
   const opacity = 1 - distance / 4;
   const scale = 1 - distance * 0.1;
   const yOffset = distanceFromCenter * 60; // Reduced for smaller container
   const xOffset = side === "left" ? -distance * 30 : distance * 30; // Reduced for smaller container

   const IconOrLogo = (
      <div className="rounded-full border border-yellow-400/40 p-1 bg-yellow-400/20">{logo ? <img src={logo} alt={`${chain.name} logo`} className="size-4 rounded-full object-cover" /> : <FallbackIcon className="size-4 text-yellow-400" />}</div>
   );

   return (
      <motion.div
         key={id}
         className={`absolute flex items-center gap-2 px-3 py-1 
                ${side === "left" ? "flex-row-reverse" : "flex-row"}`}
         animate={{
            opacity,
            scale,
            y: yOffset,
            x: xOffset,
         }}
         transition={{ duration: 0.4, ease: "easeInOut" }}
      >
         {IconOrLogo}

         <div className={`flex flex-col mx-2 ${side === "left" ? "text-right" : "text-left"}`}>
            <span className="text-xs font-semibold text-white whitespace-nowrap">{name}</span>
            {details && <span className="text-[10px] text-slate-400">{details}</span>}
         </div>
      </motion.div>
   );
};

// --- Main Component ---
const ChainCarousel: React.FC<ChainCarouselProps> = ({
   items,
   scrollSpeedMs = 1500,
   visibleItemCount = 3, // Reduced for smaller container
   className = "",
   onChainSelect,
}) => {
   const [currentIndex, setCurrentIndex] = useState(0);
   const [isPaused, setIsPaused] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");
   const [showDropdown, setShowDropdown] = useState(false);

   const rightSectionRef = useRef<HTMLDivElement>(null);
   const isInView = useInView(rightSectionRef, { margin: "-50px 0px -50px 0px" });
   const totalItems = items.length;
   

   // Auto-scroll effect
   useEffect(() => {
      if (isPaused || totalItems === 0) return;

      const interval = setInterval(() => {
         setCurrentIndex((prev) => (prev + 1) % totalItems);
      }, scrollSpeedMs);

      return () => clearInterval(interval);
   }, [isPaused, totalItems, scrollSpeedMs]);

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
      <div className={`${className}`}>
         <div className="flex flex-col lg:flex-row gap-4 justify-center items-center">
            {/* Left Carousel - Hidden on mobile */}
            <motion.div
               className="relative w-full max-w-xs h-[200px] flex items-center justify-center hidden lg:flex"
               onMouseEnter={() => !searchTerm && setIsPaused(true)}
               onMouseLeave={() => !searchTerm && setIsPaused(false)}
               initial={{ x: "-100%", opacity: 0 }}
               animate={isInView ? { x: 0, opacity: 1 } : {}}
               transition={{ type: "spring", stiffness: 80, damping: 20, duration: 0.8 }}
            >
               {/* Fading overlay */}
               <div className="absolute inset-0 z-10 pointer-events-none">
                  <div className="absolute top-0 h-1/4 w-full bg-gradient-to-b from-slate-800/50 to-transparent"></div>
                  <div className="absolute bottom-0 h-1/4 w-full bg-gradient-to-t from-slate-800/50 to-transparent"></div>
               </div>

               {getVisibleItems().map((chain) => (
                  <CarouselItemCard key={`left-${chain.id}-${chain.originalIndex}-${chain.distanceFromCenter}`} chain={chain} side="left" />
               ))}
            </motion.div>

            {/* Middle Section - Current Item & Search */}
            <div className="flex flex-col text-center gap-3 max-w-xs">
               {/* Currently Selected Item Display */}
               {currentItem && (
                  <div className="flex flex-col items-center justify-center gap-2">
                     <div className="p-1 bg-yellow-400/20 rounded-full border border-yellow-400/40">
                        {currentItem.logo ? <img src={currentItem.logo} alt={`${currentItem.name} logo`} className="size-6 rounded-full object-cover" /> : <currentItem.icon className="size-4 text-yellow-400" />}
                     </div>
                     <h3 className="text-sm font-bold text-white">{currentItem.name}</h3>
                     <p className="text-xs text-slate-400">{currentItem.details || "View Details"}</p>
                  </div>
               )}

               {/* Search Bar */}
               <div className="mt-2 relative w-full max-w-xs">
                  {/* <div className="flex items-center relative">
                     <Input
                        type="text"
                        value={searchTerm}
                        placeholder="Search chains..."
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
                        className="flex-grow outline-none text-white bg-slate-700/50 px-3 
                                    placeholder-slate-400 text-sm rounded-lg border border-slate-600 
                                    pr-8 pl-8 py-1 cursor-pointer w-full"
                     />
                     <Search className="absolute text-slate-400 w-4 h-4 left-3 pointer-events-none" />
                     {searchTerm && (
                        <button
                           onClick={() => {
                              setSearchTerm("");
                              setShowDropdown(false);
                              setIsPaused(false);
                           }}
                           className="absolute right-3 text-slate-400 hover:text-slate-300"
                        >
                           <DeleteIcon className="w-4 h-4" />
                        </button>
                     )}
                  </div> */}

                  {/* Dropdown for search results */}
                  {showDropdown && filteredItems.length > 0 && (
                     <div
                        className="absolute left-0 right-0 mt-1 bg-slate-700 
                                rounded-lg border border-slate-600 z-20 max-h-48 overflow-y-auto shadow-xl"
                     >
                        {filteredItems.slice(0, 8).map((chain) => (
                           <div
                              key={chain.id}
                              onMouseDown={(e) => {
                                 e.preventDefault();
                                 handleSelectChain(chain.id, chain.name);
                              }}
                              className="flex items-center gap-2 px-3 py-2 cursor-pointer 
                                            hover:bg-slate-600/50 transition-colors duration-150 rounded-lg m-1"
                           >
                              {chain.logo ? <img src={chain.logo} alt={`${chain.name} logo`} className="size-4 rounded-full object-cover" /> : <chain.icon size={16} className="text-yellow-400" />}
                              <span className="text-white text-sm font-medium">{chain.name}</span>
                              <span className="ml-auto text-xs text-slate-400">{chain.details}</span>
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            </div>

            {/* Right Carousel - Hidden on mobile */}
           
            <motion.div
               ref={rightSectionRef}   
               className="relative w-full max-w-xs h-[200px]  items-center justify-center hidden lg:flex"
               onMouseEnter={() => !searchTerm && setIsPaused(true)}
               onMouseLeave={() => !searchTerm && setIsPaused(false)}
               initial={{ x: "100%", opacity: 0 }}
               animate={isInView ? { x: 0, opacity: 1 } : {}}
               transition={{ type: "spring", stiffness: 80, damping: 20, duration: 0.8 }}
            >
               {/* Fading overlay */}
               <div className="absolute inset-0 z-10 pointer-events-none">
                  <div className="absolute top-0 h-1/4 w-full bg-gradient-to-b from-slate-800/50 to-transparent"></div>
                  <div className="absolute bottom-0 h-1/4 w-full bg-gradient-to-t from-slate-800/50 to-transparent"></div>
               </div>

               {getVisibleItems().map((chain) => (
                  <CarouselItemCard key={`right-${chain.id}-${chain.originalIndex}-${chain.distanceFromCenter}`} chain={chain} side="right" />
               ))}
            </motion.div>
         </div>
      </div>
   );
};

export default ChainCarousel;
