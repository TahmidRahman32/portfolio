import ProjectsSection from '@/components/projects/Project';
import ServicesHeader from '@/components/service/servicehader';
import React from 'react';

const page = () => {
   return (
      <div>
         <ServicesHeader />
         <ProjectsSection />
      </div>
   );
};

export default page;