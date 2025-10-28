// components/resume/ResumePreview.tsx
// import { ResumeData, ResumeTemplate } from "@/types/resume";

import { ResumeData, ResumeTemplate } from "../type/Resume";

interface ResumePreviewProps {
   data: ResumeData;
   template: ResumeTemplate;
}

export default function ResumePreview({ data, template }: ResumePreviewProps) {
   const { personalInfo, summary, education, workExperience, skills, projects } = data;

   const formatDate = (dateString: string): string => {
      if (!dateString) return "";
      try {
         const date = new Date(dateString);
         return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
         });
      } catch {
         return dateString;
      }
   };

   // Template-specific styling
   const getTemplateStyles = () => {
      const baseStyles = {
         container: "",
         header: "",
         section: "",
         title: "",
         text: "",
         accent: "",
      };

      switch (template) {
         case "modern":
            return {
               container: "bg-white text-gray-800",
               header: "bg-gradient-to-r from-blue-500 to-purple-600 text-white",
               section: "border-l-4 border-blue-500",
               title: "text-blue-600 font-bold",
               text: "text-gray-700",
               accent: "bg-blue-100 text-blue-800",
            };
         case "professional":
            return {
               container: "bg-white text-gray-800",
               header: "bg-gray-800 text-white",
               section: "border-l-4 border-gray-600",
               title: "text-gray-800 font-bold",
               text: "text-gray-600",
               accent: "bg-gray-100 text-gray-800",
            };
         case "minimal":
            return {
               container: "bg-white text-gray-800",
               header: "bg-green-50 border-b border-green-200",
               section: "",
               title: "text-green-700 font-semibold",
               text: "text-gray-600",
               accent: "bg-green-100 text-green-800",
            };
         case "creative":
            return {
               container: "bg-white text-gray-800",
               header: "bg-gradient-to-r from-orange-400 to-pink-500 text-white",
               section: "border-l-4 border-orange-400",
               title: "text-orange-500 font-bold",
               text: "text-gray-700",
               accent: "bg-orange-100 text-orange-800",
            };
         default:
            return baseStyles;
      }
   };

   const styles = getTemplateStyles();

   return (
      <div className={`${styles.container} p-6 font-sans text-sm leading-snug min-h-[600px] shadow-inner`}>
         {/* Header */}
         <div className={`${styles.header} p-6 rounded-lg mb-6`}>
            <h1 className="text-2xl font-bold mb-2">{personalInfo.fullName || "Your Name"}</h1>
            <div className="flex flex-col sm:flex-row sm:justify-center sm:flex-wrap gap-2 text-white/90 text-sm">
               {personalInfo.email && <span>{personalInfo.email}</span>}
               {personalInfo.phone && <span className="hidden sm:inline">•</span>}
               {personalInfo.phone && <span>{personalInfo.phone}</span>}
               {personalInfo.address && <span className="hidden sm:inline">•</span>}
               {personalInfo.address && <span>{personalInfo.address}</span>}
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-2 text-white/80 text-sm">
               {personalInfo.linkedin && <span>LinkedIn</span>}
               {personalInfo.github && <span>GitHub</span>}
               {personalInfo.website && <span>Portfolio</span>}
            </div>
         </div>

         {/* Summary */}
         {summary && (
            <section className={`mb-6 ${styles.section} pl-4`}>
               <h2 className={`text-lg mb-3 ${styles.title}`}>Professional Summary</h2>
               <p className={`${styles.text} text-sm`}>{summary}</p>
            </section>
         )}

         {/* Education */}
         {education.length > 0 && (
            <section className={`mb-6 ${styles.section} pl-4`}>
               <h2 className={`text-lg mb-3 ${styles.title}`}>Education</h2>
               {education.map((edu) => (
                  <div key={edu.id} className="mb-4 last:mb-0">
                     <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-gray-900">{edu.institution}</h3>
                        <span className="text-gray-600 text-sm whitespace-nowrap">
                           {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}
                        </span>
                     </div>
                     <p className={`${styles.text}`}>
                        {edu.degree}
                        {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                     </p>
                     {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                     {edu.description && <p className={`${styles.text} text-sm mt-1`}>{edu.description}</p>}
                  </div>
               ))}
            </section>
         )}

         {/* Work Experience */}
         {workExperience.length > 0 && (
            <section className={`mb-6 ${styles.section} pl-4`}>
               <h2 className={`text-lg mb-3 ${styles.title}`}>Professional Experience</h2>
               {workExperience.map((exp) => (
                  <div key={exp.id} className="mb-4 last:mb-0">
                     <div className="flex justify-between items-start">
                        <div>
                           <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                           <p className={`${styles.text} font-medium`}>{exp.company}</p>
                        </div>
                        <span className="text-gray-600 text-sm whitespace-nowrap">
                           {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                        </span>
                     </div>
                     {exp.description && <p className={`${styles.text} text-sm mt-1`}>{exp.description}</p>}
                     {exp.achievements.length > 0 && (
                        <ul className="list-disc list-inside text-gray-600 text-sm mt-2 space-y-1">
                           {exp.achievements.map((achievement, index) => (
                              <li key={index}>{achievement}</li>
                           ))}
                        </ul>
                     )}
                  </div>
               ))}
            </section>
         )}

         {/* Skills */}
         {skills.length > 0 && (
            <section className={`mb-6 ${styles.section} pl-4`}>
               <h2 className={`text-lg mb-3 ${styles.title}`}>Skills</h2>
               <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                     <span key={skill.id} className={`${styles.accent} px-3 py-1 rounded text-sm`}>
                        {skill.name}
                     </span>
                  ))}
               </div>
            </section>
         )}

         {/* Projects */}
         {projects.length > 0 && (
            <section className={`mb-6 ${styles.section} pl-4`}>
               <h2 className={`text-lg mb-3 ${styles.title}`}>Projects</h2>
               {projects.map((project) => (
                  <div key={project.id} className="mb-4 last:mb-0">
                     <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-gray-900">{project.name}</h3>
                        {project.link && <span className="text-blue-600 text-sm">View Project</span>}
                     </div>
                     <p className={`${styles.text} text-sm mt-1`}>{project.description}</p>
                     {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                           {project.technologies.map((tech, index) => (
                              <span key={index} className={`${styles.accent} px-2 py-1 rounded text-xs`}>
                                 {tech}
                              </span>
                           ))}
                        </div>
                     )}
                  </div>
               ))}
            </section>
         )}
      </div>
   );
}
