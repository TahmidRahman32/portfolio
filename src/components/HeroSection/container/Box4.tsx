import Image from "next/image";
import contactImage from "../../../../public/image/portfolio-3.png";
import { Button } from "@/components/ui/button";

import { Facebook, Instagram, LucideLinkedin, TwitterIcon } from "lucide-react";

interface Footer7Props {
   socialLinks?: Array<{
      icon: React.ReactElement;
      href: string;
      label: string;
   }>;
}

const defaultSocialLinks = [
   { icon: <Instagram className="size-5" />, href: "#", label: "Instagram" },
   { icon: <Facebook className="size-5" />, href: "#", label: "Facebook" },
   { icon: <TwitterIcon className="size-5" />, href: "#", label: "Twitter" },
   { icon: <LucideLinkedin className="size-5" />, href: "#", label: "LinkedIn" },
];

const Box4 = ({
   socialLinks = defaultSocialLinks,
}: Footer7Props) => {
   return (
      <div className="text-center space-y-4">
         <h2 className="text-xl font-serif italic font-semibold">
            Get in Touch <i className="fa fa-circle"></i>
         </h2>
         <p className="italic text-secondary-foreground">Got a question, idea, or just want to say hi? Drop a message — I’d love to hear from you!</p>
         <Image src={contactImage} width={300} height={200} alt="cv Image" className="object-cover h-60 rounded-4xl"></Image>

         <p className="font-serif text-secondary-foreground">I’m always open to discussing new projects, creative collaborations, or opportunities that bring fresh challenges. Feel free to reach out anytime!</p>
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

         <Button>Contact Me</Button>
      </div>
   );
};

export default Box4;