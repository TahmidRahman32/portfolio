import Dashboard from '@/components/dashboard/main';
import React from 'react';

const dashboard = async() => {

   const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`);
   const users = await res.json();
   console.log("my data",users)
   return (
      <div>
         <Dashboard />
      </div>
   );
};

export default dashboard;