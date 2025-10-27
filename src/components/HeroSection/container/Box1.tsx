import Image from "next/image";
import cvImage from "../../../../public/image/portfolio-2.png";
import { Button } from "@/components/ui/button";
import { Facebook, Github, Instagram, LucideLinkedin} from "lucide-react";
import { AuroraTextEffect } from "../nameSection/UiStyle";



interface Footer7Props {
   socialLinks?: Array<{
      icon: React.ReactElement;
      href: string;
      label: string;
   }>;
}

const defaultSocialLinks = [
   { icon: <Instagram className="size-5" />, href: "https://www.instagram.com/ausaf_tahmid/?hl=en", label: "Instagram" },
   { icon: <Facebook className="size-5" />, href: "https://www.facebook.com/ahmed.ausaf.tahmid/", label: "Facebook" },
   { icon: <Github className="size-5" />, href: "https://github.com/TahmidRahman32?tab=repositories", label: "GitHub" },
   { icon: <LucideLinkedin className="size-5" />, href: "https://www.linkedin.com/in/gaziur-rahman-a194a8331/", label: "LinkedIn" },
];

const Box1 = ({ socialLinks = defaultSocialLinks }: Footer7Props) => {
   return (
      <div className="space-y-7 text-center flex flex-col justify-center  md:h-[554]">
         {/* <Image src={cvImage} width={300} height={200} alt="cv Image" className="object-cover h-60 rounded-4xl"></Image>

         <p className="font-serif text-secondary-foreground">A CV is not just a document; it’s a story of my journey and growth.</p>
         <Button>Check My Cv</Button>
         <div className="border-t border-gray-300 my-4"></div> */}
         <div className="space-y-10">
            <h1 className="md:text-5xl font-bold text-white">
               Crafting Web & UI
               <AuroraTextEffect text="Experiences"></AuroraTextEffect>
            </h1>
            <p className="text-gray-300 mx-auto md:w-3/4 font-primary-c">
               As a Full-Stack Developer, I specialize in designing and developing scalable, modern web applications with clean architecture and seamless user experiences. I’m passionate about combining robust backend systems with intuitive,
               responsive interfaces that bring ideas to life.
            </p>
         </div>
         <div className="flex justify-center ">
            <ul className="text-accent flex items-center space-x-6">
               {socialLinks.map((social, idx) => (
                  <li key={idx} className="hover:text-accent-foreground font-medium bg-primary p-2 rounded-full">
                     <a href={social.href} aria-label={social.label}>
                        {social.icon}
                     </a>
                  </li>
               ))}
            </ul>
         </div>
         <Button className="w-36 mx-auto">Contact Me</Button>
      </div>
   );
};

export default Box1;
