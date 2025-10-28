// import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

import { Facebook, Instagram, LucideLinkedin, TwitterIcon } from "lucide-react";

interface Footer7Props {
   logo?: {
      url: string;
      src: string;
      alt: string;
      title: string;
   };
   sections?: Array<{
      title: string;
      links: Array<{ name: string; href: string }>;
   }>;
   description?: string;
   socialLinks?: Array<{
      icon: React.ReactElement;
      href: string;
      label: string;
   }>;
   copyright?: string;
   legalLinks?: Array<{
      name: string;
      href: string;
   }>;
}



const defaultSocialLinks = [
   { icon: <Instagram className="size-5" />, href: "https://www.instagram.com/ausaf_tahmid/?hl=en", label: "Instagram" },
   { icon: <Facebook className="size-5" />, href: "https://www.facebook.com/ahmed.ausaf.tahmid/", label: "Facebook" },
   { icon: <TwitterIcon className="size-5" />, href: "#", label: "Twitter" },
   { icon: <LucideLinkedin className="size-5" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
   { name: "Terms and Conditions", href: "#" },
   { name: "Privacy Policy", href: "#" },
];

const Footer7 = ({
   logo = {
      url: "https://www.shadcnblocks.com",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
      alt: "logo",
      title: "gaziur.tahmid@gmail.com",
   },
   description = "A collection of components for your startup business or side project.",
   socialLinks = defaultSocialLinks,
   copyright = "© 2025 Personal Website. All rights reserved.",
   legalLinks = defaultLegalLinks,
}: Footer7Props) => {
   return (
      <section className="py-4 bg-[#4b1614]">
         <div className="container mx-auto  px-4">
            <div className="flex w-full flex-col  justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
               <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
                  {/* Logo */}
                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                     <a href={"/"}>
                        <img src={logo.src} alt={logo.alt} title={logo.title} className="h-8" />
                     </a>
                     <h2 className="text-xl font-semibold">{logo.title}</h2>
                  </div>
                  <p className="text-muted-foreground  md:max-w-full text-sm text-center md:text-left">{description}</p>
                  <ul className="text-muted-foreground flex items-center space-x-6 justify-center">
                     {socialLinks.map((social, idx) => (
                        <li key={idx} className="hover:text-primary font-medium">
                           <a href={social.href} aria-label={social.label}>
                              {social.icon}
                           </a>
                        </li>
                     ))}
                  </ul>
               </div>
               {/* <div className=" w-full gap-6 md:grid-cols- lg:gap-20 ">
                  <h2>handle after</h2>
               </div> */}  
            </div>
            <div className="text-muted-foreground text-center mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium md:flex-row md:items-center md:text-left">
               <p className="order-2 lg:order-1">{copyright}</p>
               <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
                  {legalLinks.map((link, idx) => (
                     <li key={idx} className="hover:text-primary">
                        <a href={link.href}> {link.name}</a>
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </section>
   );
};

export { Footer7 };
