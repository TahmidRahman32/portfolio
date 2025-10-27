import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import Footer from "./Footer";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className="">
         <Navbar />
         <div className="min-h-dvh pt-16">{children}</div>
         <Footer></Footer>
      </div>
   );
};

export default PublicLayout;
