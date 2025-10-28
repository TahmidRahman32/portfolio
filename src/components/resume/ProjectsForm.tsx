// components/resume/ProjectsForm.tsx
import { useState } from "react";
import { Project } from "../type/Resume";

interface ProjectsFormProps {
   projects: Project[];
   onChange: (projects: Project[]) => void;
}

const defaultProject: Omit<Project, "id"> = {
   name: "",
   description: "",
   technologies: [""],
   link: "",
};

export default function ProjectsForm({ projects, onChange }: ProjectsFormProps) {
   const [currentProject, setCurrentProject] = useState<Omit<Project, "id">>(defaultProject);

   const addProject = () => {
      if (currentProject.name && currentProject.description) {
         const newProject: Project = {
            ...currentProject,
            id: Date.now().toString(),
            technologies: currentProject.technologies.filter((tech) => tech.trim() !== ""),
         };
         onChange([...projects, newProject]);
         setCurrentProject(defaultProject);
      }
   };

   const removeProject = (id: string) => {
      onChange(projects.filter((project) => project.id !== id));
   };

   const addTechnology = () => {
      setCurrentProject((prev) => ({
         ...prev,
         technologies: [...prev.technologies, ""],
      }));
   };

   const updateTechnology = (index: number, value: string) => {
      setCurrentProject((prev) => ({
         ...prev,
         technologies: prev.technologies.map((tech, i) => (i === index ? value : tech)),
      }));
   };

   const removeTechnology = (index: number) => {
      setCurrentProject((prev) => ({
         ...prev,
         technologies: prev.technologies.filter((_, i) => i !== index),
      }));
   };

   return (
      <div>
         <h3 className="text-xl font-semibold mb-4">Projects</h3>

         {/* Current Project Form */}
         <div className="space-y-4 mb-6 p-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
            <h4 className="font-semibold text-gray-700">Add New Project</h4>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label>
               <input
                  type="text"
                  value={currentProject.name}
                  onChange={(e) => setCurrentProject((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Project Name"
               />
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Project Link (Optional)</label>
               <input
                  type="url"
                  value={currentProject.link}
                  onChange={(e) => setCurrentProject((prev) => ({ ...prev, link: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://github.com/yourname/project"
               />
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Project Description *</label>
               <textarea
                  value={currentProject.description}
                  onChange={(e) => setCurrentProject((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Describe the project, your role, and key features..."
                  rows={4}
               />
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">Technologies Used</label>
               <div className="space-y-2">
                  {currentProject.technologies.map((technology, index) => (
                     <div key={index} className="flex gap-2">
                        <input
                           type="text"
                           value={technology}
                           onChange={(e) => updateTechnology(index, e.target.value)}
                           className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           placeholder="Technology or tool used..."
                        />
                        {currentProject.technologies.length > 1 && (
                           <button onClick={() => removeTechnology(index)} className="px-3 text-red-600 hover:text-red-800 border border-red-200 rounded-lg transition-colors duration-200">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                           </button>
                        )}
                     </div>
                  ))}
                  <button onClick={addTechnology} className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                     </svg>
                     Add Technology
                  </button>
               </div>
            </div>

            <button
               onClick={addProject}
               disabled={!currentProject.name || !currentProject.description}
               className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
               </svg>
               Add Project
            </button>
         </div>

         {/* Projects List */}
         <div className="space-y-4">
            {projects.length === 0 && (
               <div className="text-center py-8 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <p>No projects added yet. Add your first project above.</p>
               </div>
            )}

            {projects.map((project) => (
               <div key={project.id} className="p-4 border border-gray-200 rounded-lg bg-white">
                  <div className="flex justify-between items-start mb-3">
                     <div className="flex-1">
                        <h4 className="font-semibold text-lg text-gray-800">{project.name}</h4>
                        {project.link && (
                           <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              View Project
                           </a>
                        )}
                     </div>
                     <button onClick={() => removeProject(project.id)} className="text-red-600 hover:text-red-800 p-1 rounded transition-colors duration-200" title="Remove project">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                     </button>
                  </div>

                  <p className="text-sm text-gray-700 mb-3">{project.description}</p>

                  {project.technologies.length > 0 && (
                     <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                           <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                              {tech}
                           </span>
                        ))}
                     </div>
                  )}
               </div>
            ))}
         </div>
      </div>
   );
}
