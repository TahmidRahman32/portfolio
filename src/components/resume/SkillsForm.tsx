// components/resume/SkillsForm.tsx
import { useState } from "react";
import { Skill } from "../type/Resume";

interface SkillsFormProps {
   skills: Skill[];
   onChange: (skills: Skill[]) => void;
   errors?: Record<string, string>;
}

const skillCategories = ["Programming Languages", "Frameworks & Libraries", "Tools & Technologies", "Databases", "Cloud Platforms", "Soft Skills", "Other"];

const defaultSkill: Omit<Skill, "id"> = {
   name: "",
   level: 3,
   category: skillCategories[0],
};

export default function SkillsForm({ skills, onChange, errors }: SkillsFormProps) {
   const [currentSkill, setCurrentSkill] = useState<Omit<Skill, "id">>(defaultSkill);

   const addSkill = () => {
      if (currentSkill.name.trim()) {
         const newSkill: Skill = {
            ...currentSkill,
            id: Date.now().toString(),
         };
         onChange([...skills, newSkill]);
         setCurrentSkill(defaultSkill);
      }
   };

   const removeSkill = (id: string) => {
      onChange(skills.filter((skill) => skill.id !== id));
   };

   const getSkillsByCategory = () => {
      const categorized: Record<string, Skill[]> = {};
      skillCategories.forEach((category) => {
         categorized[category] = skills.filter((skill) => skill.category === category);
      });
      return categorized;
   };

   const categorizedSkills = getSkillsByCategory();

   return (
      <div>
         <h3 className="text-xl font-semibold mb-4">Skills</h3>

         {/* Add Skill Form */}
         <div className="space-y-4 mb-6 p-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
            <h4 className="font-semibold text-gray-700">Add New Skill</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name *</label>
                  <input
                     type="text"
                     value={currentSkill.name}
                     onChange={(e) => setCurrentSkill((prev) => ({ ...prev, name: e.target.value }))}
                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     placeholder="e.g., JavaScript, React, Project Management"
                  />
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                     value={currentSkill.category}
                     onChange={(e) => setCurrentSkill((prev) => ({ ...prev, category: e.target.value }))}
                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                     {skillCategories.map((category) => (
                        <option key={category} value={category}>
                           {category}
                        </option>
                     ))}
                  </select>
               </div>
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">Proficiency Level: {["Beginner", "Intermediate", "Advanced", "Expert", "Master"][currentSkill.level - 1]}</label>
               <div className="flex items-center gap-4">
                  <input
                     type="range"
                     min="1"
                     max="5"
                     value={currentSkill.level}
                     onChange={(e) => setCurrentSkill((prev) => ({ ...prev, level: parseInt(e.target.value) }))}
                     className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm text-gray-600 min-w-[80px]">{currentSkill.level}/5</span>
               </div>
               <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Advanced</span>
                  <span>Expert</span>
                  <span>Master</span>
               </div>
            </div>

            <button onClick={addSkill} disabled={!currentSkill.name.trim()} className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
               </svg>
               Add Skill
            </button>
         </div>

         {/* Skills List */}
         <div className="space-y-6">
            {skills.length === 0 && (
               <div className="text-center py-8 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p>No skills added yet. Add your first skill above.</p>
               </div>
            )}

            {Object.entries(categorizedSkills).map(
               ([category, categorySkills]) =>
                  categorySkills.length > 0 && (
                     <div key={category} className="border border-gray-200 rounded-lg bg-white">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                           <h4 className="font-semibold text-gray-800">{category}</h4>
                        </div>
                        <div className="p-4">
                           <div className="flex flex-wrap gap-2">
                              {categorySkills.map((skill) => (
                                 <div key={skill.id} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg flex items-center gap-2 group relative">
                                    <span>{skill.name}</span>
                                    <div className="flex">
                                       {[...Array(5)].map((_, i) => (
                                          <div key={i} className={`w-2 h-2 rounded-full mx-0.5 ${i < skill.level ? "bg-blue-600" : "bg-blue-300"}`} />
                                       ))}
                                    </div>
                                    <button onClick={() => removeSkill(skill.id)} className="text-blue-600 hover:text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200" title="Remove skill">
                                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                       </svg>
                                    </button>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  )
            )}
         </div>

         {errors?.skills && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
               <p className="text-red-700 text-sm">{errors.skills}</p>
            </div>
         )}
      </div>
   );
}
