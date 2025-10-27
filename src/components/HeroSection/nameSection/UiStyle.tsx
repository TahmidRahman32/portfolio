import { cn } from "@/components/lib/utils";
import React from "react";

export interface AuroraTextEffectProps {
   text: string;
   className?: string;
   fontSize?: string;
   gradientColors?: string; // Tailwind gradient classes
   speed?: string; // e.g. "6s"
}

export function AuroraTextEffect({ text, className, fontSize = "clamp(3rem, 8vw, 4rem)", gradientColors = "from-pink-500 via-purple-500 to-cyan-500", speed = "6s" }: AuroraTextEffectProps) {
   const keyframes = `
    @keyframes auroraGradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;

   return (
      <div className={cn("relative flex justify-center items-center", className)}>
         <style>{keyframes}</style>
         <h2
            className={cn("font-extrabold text-transparent bg-clip-text", `bg-gradient-to-r ${gradientColors}`)}
            style={{
               fontSize,
               backgroundSize: "200% 200%",
               animation: `auroraGradient ${speed} ease infinite`,
            }}
         >
            {text}
         </h2>
      </div>
   );
}
