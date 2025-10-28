// components/resume/WorkExperienceForm.tsx
import { useState } from "react";
import { WorkExperience } from "../type/Resume";

interface WorkExperienceFormProps {
   experience: WorkExperience[];
   onChange: (experience: WorkExperience[]) => void;
}

const defaultExperience: Omit<WorkExperience, "id"> = {
   company: "",
   position: "",
   startDate: "",
   endDate: "",
   current: false,
   description: "",
   achievements: [""],
};

export default function WorkExperienceForm({ experience, onChange }: WorkExperienceFormProps) {
   const [currentExperience, setCurrentExperience] = useState<Omit<WorkExperience, "id">>(defaultExperience);

   const addExperience = () => {
      if (currentExperience.company && currentExperience.position) {
         const newExperience: WorkExperience = {
            ...currentExperience,
            id: Date.now().toString(),
            achievements: currentExperience.achievements.filter((ach) => ach.trim() !== ""),
         };
         onChange([...experience, newExperience]);
         setCurrentExperience(defaultExperience);
      }
   };

   const removeExperience = (id: string) => {
      onChange(experience.filter((exp) => exp.id !== id));
   };

   const addAchievement = () => {
      setCurrentExperience((prev) => ({
         ...prev,
         achievements: [...prev.achievements, ""],
      }));
   };

   const updateAchievement = (index: number, value: string) => {
      setCurrentExperience((prev) => ({
         ...prev,
         achievements: prev.achievements.map((ach, i) => (i === index ? value : ach)),
      }));
   };

   const removeAchievement = (index: number) => {
      setCurrentExperience((prev) => ({
         ...prev,
         achievements: prev.achievements.filter((_, i) => i !== index),
      }));
   };

   return (
      <div>
         <h3 className="text-xl font-semibold mb-4">Work Experience</h3>

         {/* Current Experience Form */}
         <div className="space-y-4 mb-6 p-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
            <h4 className="font-semibold text-gray-700">Add New Experience</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                  <input
                     type="text"
                     value={currentExperience.company}
                     onChange={(e) => setCurrentExperience((prev) => ({ ...prev, company: e.target.value }))}
                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     placeholder="Company Name"
                  />
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position *</label>
                  <input
                     type="text"
                     value={currentExperience.position}
                     onChange={(e) => setCurrentExperience((prev) => ({ ...prev, position: e.target.value }))}
                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     placeholder="Job Title"
                  />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                     type="month"
                     value={currentExperience.startDate}
                     onChange={(e) => setCurrentExperience((prev) => ({ ...prev, startDate: e.target.value }))}
                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <div className="flex gap-2">
                     <input
                        type="month"
                        value={currentExperience.endDate}
                        onChange={(e) => setCurrentExperience((prev) => ({ ...prev, endDate: e.target.value, current: false }))}
                        disabled={currentExperience.current}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                     />
                     <label className="flex items-center gap-2 whitespace-nowrap">
                        <input
                           type="checkbox"
                           checked={currentExperience.current}
                           onChange={(e) =>
                              setCurrentExperience((prev) => ({
                                 ...prev,
                                 current: e.target.checked,
                                 endDate: e.target.checked ? "" : prev.endDate,
                              }))
                           }
                           className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Current</span>
                     </label>
                  </div>
               </div>
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
               <textarea
                  value={currentExperience.description}
                  onChange={(e) => setCurrentExperience((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Describe your role and responsibilities..."
                  rows={3}
               />
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">Key Achievements</label>
               <div className="space-y-2">
                  {currentExperience.achievements.map((achievement, index) => (
                     <div key={index} className="flex gap-2">
                        <input
                           type="text"
                           value={achievement}
                           onChange={(e) => updateAchievement(index, e.target.value)}
                           className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           placeholder="Describe an achievement or accomplishment..."
                        />
                        {currentExperience.achievements.length > 1 && (
                           <button onClick={() => removeAchievement(index)} className="px-3 text-red-600 hover:text-red-800 border border-red-200 rounded-lg transition-colors duration-200">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                           </button>
                        )}
                     </div>
                  ))}
                  <button onClick={addAchievement} className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                     </svg>
                     Add Achievement
                  </button>
               </div>
            </div>

            <button
               onClick={addExperience}
               disabled={!currentExperience.company || !currentExperience.position}
               className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
               </svg>
               Add Experience
            </button>
         </div>

         {/* Experience List */}
         <div className="space-y-4">
            {experience.length === 0 && (
               <div className="text-center py-8 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                     />
                  </svg>
                  <p>No work experience entries yet. Add your first experience above.</p>
               </div>
            )}

            {experience.map((exp) => (
               <div key={exp.id} className="p-4 border border-gray-200 rounded-lg bg-white">
                  <div className="flex justify-between items-start mb-3">
                     <div className="flex-1">
                        <h4 className="font-semibold text-lg text-gray-800">{exp.position}</h4>
                        <p className="text-gray-600">{exp.company}</p>
                        <p className="text-sm text-gray-500">
                           {formatDisplayDate(exp.startDate)} - {exp.current ? "Present" : formatDisplayDate(exp.endDate)}
                        </p>
                     </div>
                     <button onClick={() => removeExperience(exp.id)} className="text-red-600 hover:text-red-800 p-1 rounded transition-colors duration-200" title="Remove experience">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                     </button>
                  </div>

                  {exp.description && <p className="text-sm text-gray-700 mb-3">{exp.description}</p>}

                  {exp.achievements.length > 0 && exp.achievements.some((ach) => ach.trim() !== "") && (
                     <div className="mt-3">
                        <h5 className="font-medium text-gray-700 mb-2">Key Achievements:</h5>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                           {exp.achievements
                              .filter((ach) => ach.trim() !== "")
                              .map((achievement, index) => (
                                 <li key={index}>{achievement}</li>
                              ))}
                        </ul>
                     </div>
                  )}
               </div>
            ))}
         </div>
      </div>
   );
}

// Helper function to format dates for display
function formatDisplayDate(dateString: string): string {
   if (!dateString) return "";
   const date = new Date(dateString);
   return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
}
