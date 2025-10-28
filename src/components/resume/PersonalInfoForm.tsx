// components/resume/PersonalInfoForm.tsx

import { PersonalInfo } from "../type/Resume";


interface PersonalInfoFormProps {
   data: PersonalInfo;
   onChange: (data: PersonalInfo) => void;
   errors?: Record<string, string>;
}

export default function PersonalInfoForm({ data, onChange, errors }: PersonalInfoFormProps) {
   const handleChange = (field: keyof PersonalInfo, value: string) => {
      onChange({ ...data, [field]: value });
   };

   const getFieldError = (field: string): string => {
      if (errors?.personalInfo) {
         if (field === "fullName" && !data.fullName) return "Full name is required";
         if (field === "email" && !data.email) return "Email is required";
         if (field === "phone" && !data.phone) return "Phone is required";
      }
      return "";
   };

   return (
      <div className="space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
               <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
               <input
                  type="text"
                  value={data.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-gray-500 ${getFieldError("fullName") ? "border-red-500 bg-red-50" : "border-gray-300"}`}
                  placeholder="John Doe"
                  required
               />
               {getFieldError("fullName") && <p className="mt-1 text-sm text-red-600">{getFieldError("fullName")}</p>}
            </div>

            <div>
               <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
               <input
                  type="email"
                  value={data.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-gray-500 ${getFieldError("email") ? "border-red-500 bg-red-50" : "border-gray-300"}`}
                  placeholder="john.doe@example.com"
                  required
               />
               {getFieldError("email") && <p className="mt-1 text-sm text-red-600">{getFieldError("email")}</p>}
            </div>

            <div>
               <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
               <input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-gray-500 ${getFieldError("phone") ? "border-red-500 bg-red-50" : "border-gray-300"}`}
                  placeholder="+1 (555) 123-4567"
                  required
               />
               {getFieldError("phone") && <p className="mt-1 text-sm text-red-600">{getFieldError("phone")}</p>}
            </div>

            <div>
               <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
               <input
                  type="text"
                  value={data.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-500 focus:border-transparent transition-colors duration-200"
                  placeholder="City, State, Country"
                  required
               />
            </div>
         </div>

         <div className="border-t pt-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Professional Links</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
                  <input
                     type="url"
                     value={data.linkedin || ""}
                     onChange={(e) => handleChange("linkedin", e.target.value)}
                     className="w-full p-3 border border-gray-300 text-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                     placeholder="https://linkedin.com/in/yourname"
                  />
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
                  <input
                     type="url"
                     value={data.github || ""}
                     onChange={(e) => handleChange("github", e.target.value)}
                     className="w-full p-3 border border-gray-300 text-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                     placeholder="https://github.com/yourname"
                  />
               </div>

               <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Website</label>
                  <input
                     type="url"
                     value={data.website || ""}
                     onChange={(e) => handleChange("website", e.target.value)}
                     className="w-full p-3 border border-gray-300 text-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                     placeholder="https://yourportfolio.com"
                  />
               </div>
            </div>
         </div>
      </div>
   );
}
