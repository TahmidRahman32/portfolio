// components/resume/EducationForm.tsx
import { useState } from "react";
import { Education } from "../type/Resume";

interface EducationFormProps {
   education: Education[];
   onChange: (education: Education[]) => void;
   errors?: Record<string, string>;
}

const defaultEducation: Omit<Education, "id"> = {
   institution: "",
   degree: "",
   fieldOfStudy: "",
   startDate: "",
   endDate: "",
   gpa: "",
   description: "",
};

export default function EducationForm({ education, onChange, errors }: EducationFormProps) {
   const [currentEducation, setCurrentEducation] = useState<Omit<Education, "id">>(defaultEducation);

   const addEducation = () => {
      if (currentEducation.institution && currentEducation.degree) {
         const newEducation: Education = {
            ...currentEducation,
            id: Date.now().toString(),
         };
         onChange([...education, newEducation]);
         setCurrentEducation(defaultEducation);
      }
   };

   const removeEducation = (id: string) => {
      onChange(education.filter((edu) => edu.id !== id));
   };

   const updateEducation = (id: string, field: keyof Education, value: string) => {
      onChange(education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)));
   };

   return (
      <div>
         <h3 className="text-xl font-semibold mb-4">Education</h3>

         {/* Current Education Form */}
         <div className="space-y-4 mb-6 p-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-100">
            <h4 className="font-semibold text-gray-700">Add New Education</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Institution *</label>
                  <input
                     type="text"
                     value={currentEducation.institution}
                     onChange={(e) => setCurrentEducation((prev) => ({ ...prev, institution: e.target.value }))}
                     className="w-full p-3 border text-gray-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     placeholder="University Name"
                  />
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-100 mb-1">Degree *</label>
                  <input
                     type="text"
                     value={currentEducation.degree}
                     onChange={(e) => setCurrentEducation((prev) => ({ ...prev, degree: e.target.value }))}
                     className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     placeholder="Bachelor of Science"
                  />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                  <input
                     type="text"
                     value={currentEducation.fieldOfStudy}
                     onChange={(e) => setCurrentEducation((prev) => ({ ...prev, fieldOfStudy: e.target.value }))}
                     className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     placeholder="Computer Science"
                  />
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GPA</label>
                  <input
                     type="text"
                     value={currentEducation.gpa}
                     onChange={(e) => setCurrentEducation((prev) => ({ ...prev, gpa: e.target.value }))}
                     className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     placeholder="3.8/4.0"
                  />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                     type="month"
                     value={currentEducation.startDate}
                     onChange={(e) => setCurrentEducation((prev) => ({ ...prev, startDate: e.target.value }))}
                     className="w-full p-3 text-accent-foreground bg-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                     type="month"
                     value={currentEducation.endDate}
                     onChange={(e) => setCurrentEducation((prev) => ({ ...prev, endDate: e.target.value }))}
                     className="w-full p-3 text-accent-foreground bg-gray-400  border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
               </div>
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
               <textarea
                  value={currentEducation.description}
                  onChange={(e) => setCurrentEducation((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Relevant coursework, achievements, or honors..."
                  rows={3}
               />
            </div>

            <button
               onClick={addEducation}
               disabled={!currentEducation.institution || !currentEducation.degree}
               className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
               </svg>
               Add Education
            </button>
         </div>

         {/* Education List */}
         <div className="space-y-4">
            {education.length === 0 && (
               <div className="text-center py-8 text-accent-foreground">
                  <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  </svg>
                  <p>No education entries yet. Add your first education above.</p>
               </div>
            )}

            {education.map((edu) => (
               <div key={edu.id} className="p-4 border border-gray-200 rounded-lg bg-white">
                  <div className="flex justify-between items-start mb-3">
                     <div className="flex-1">
                        <h4 className="font-semibold text-lg text-gray-800">{edu.institution}</h4>
                        <p className="text-gray-600">
                           {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                        </p>
                        <p className="text-sm text-gray-500">
                           {formatDisplayDate(edu.startDate)} - {edu.endDate ? formatDisplayDate(edu.endDate) : "Present"}
                        </p>
                        {edu.gpa && (
                           <p className="text-sm text-gray-700 mt-1">
                              <strong>GPA:</strong> {edu.gpa}
                           </p>
                        )}
                     </div>
                     <button onClick={() => removeEducation(edu.id)} className="text-red-600 hover:text-red-800 p-1 rounded transition-colors duration-200" title="Remove education">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                     </button>
                  </div>
                  {edu.description && <p className="text-sm text-gray-700 mt-2 border-t pt-2">{edu.description}</p>}
               </div>
            ))}
         </div>

         {errors?.education && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
               <p className="text-red-700 text-sm">{errors.education}</p>
            </div>
         )}
      </div>
   );
}

// Helper function to format dates for display
function formatDisplayDate(dateString: string): string {
   if (!dateString) return "";
   const date = new Date(dateString);
   return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
}
