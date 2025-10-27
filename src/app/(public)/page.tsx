"use client";
import ChainCarousel, { ChainItem } from "@/components/about/SkillCarousel";
import Carousel from "@/components/HeroSection/container/Carousel";
import HeroSection from "@/components/HeroSection/HeroSection";
import ProjectsSection from "@/components/projects/Project";
import { Bitcoin, Globe, Link, Zap } from "lucide-react";
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

const HomePage = () => {
  return (
     <div>
        <HeroSection></HeroSection>
        <Carousel items={chainData} visibleItemCount={7} scrollSpeedMs={2000} onChainSelect={(id, name) => console.log("Selected:", id, name)} />
        <ProjectsSection></ProjectsSection>
     </div>
  );
};
export default HomePage;