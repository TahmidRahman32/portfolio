// components/resume/ResumeBuilder.tsx
"use client";

import { useState, useCallback } from "react";
import { pdf } from "@react-pdf/renderer";
// import { ResumeData, PersonalInfo, Education, WorkExperience, Skill, Project, ResumeTemplate } from "@/types/resume";
// import { TEMPLATES, DEFAULT_TEMPLATE } from "@/config/templates";
import PersonalInfoForm from "./PersonalInfoForm";
import EducationForm from "./EducationForm";
import WorkExperienceForm from "./WorkExperienceForm";
import SkillsForm from "./SkillsForm";
import ProjectsForm from "./ProjectsForm";
import ResumePreview from "./ResumePreview";
import ResumePDFDocument from "./ResumePDFDocument";
// import TemplateSelector from "./TemplateSelector";
import { ResumeData, PersonalInfo, Education, WorkExperience, Skill, Project, ResumeTemplate } from "../type/Resume";
import { DEFAULT_TEMPLATE, TEMPLATES } from "@/utils/templates";
import TemplateSelector from "./TemplateSelector";

const defaultResumeData: ResumeData = {
   personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      github: "",
      website: "",
   },
   summary: "",
   education: [],
   workExperience: [],
   skills: [],
   projects: [],
};

export default function ResumeBuilder() {
   const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
   const [activeSection, setActiveSection] = useState("personal");
   const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate>(DEFAULT_TEMPLATE);
   const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
   const [errors, setErrors] = useState<Record<string, string>>({});

   const handleDownloadPDF = async () => {
      // Add this line to log resume data when PDF button is clicked
      console.log("Resume Data:", resumeData);

      if (!validateResume()) {
         const firstErrorSection = Object.keys(errors)[0];
         setActiveSection(firstErrorSection);
         return;
      }

      setIsGeneratingPDF(true);
      try {
         const blob = await pdf(<ResumePDFDocument data={resumeData} template={selectedTemplate} />).toBlob();
         const url = URL.createObjectURL(blob);
         const link = document.createElement("a");
         link.href = url;
         link.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf` || "resume.pdf";
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
         URL.revokeObjectURL(url);
      } catch (error) {
         console.error("PDF generation failed:", error);
         setErrors({ pdf: "Failed to generate PDF. Please try again." });
      } finally {
         setIsGeneratingPDF(false);
      }
   };

   const updatePersonalInfo = useCallback(
      (info: PersonalInfo) => {
         setResumeData((prev) => ({ ...prev, personalInfo: info }));
         if (errors.personalInfo) {
            setErrors((prev) => ({ ...prev, personalInfo: "" }));
         }
      },
      [errors.personalInfo]
   );

   const updateEducation = useCallback(
      (education: Education[]) => {
         setResumeData((prev) => ({ ...prev, education }));
         if (errors.education) {
            setErrors((prev) => ({ ...prev, education: "" }));
         }
      },
      [errors.education]
   );

   const updateWorkExperience = useCallback((experience: WorkExperience[]) => {
      setResumeData((prev) => ({ ...prev, workExperience: experience }));
   }, []);

   const updateSkills = useCallback(
      (skills: Skill[]) => {
         setResumeData((prev) => ({ ...prev, skills }));
         if (errors.skills) {
            setErrors((prev) => ({ ...prev, skills: "" }));
         }
      },
      [errors.skills]
   );

   const updateProjects = useCallback((projects: Project[]) => {
      setResumeData((prev) => ({ ...prev, projects }));
   }, []);

   const updateSummary = useCallback((summary: string) => {
      setResumeData((prev) => ({ ...prev, summary }));
   }, []);

   const validateResume = (): boolean => {
      const newErrors: Record<string, string> = {};

      if (!resumeData.personalInfo.fullName.trim()) {
         newErrors.personalInfo = "Full name is required";
      }
      if (!resumeData.personalInfo.email.trim()) {
         newErrors.personalInfo = "Email is required";
      }
      if (!resumeData.personalInfo.phone.trim()) {
         newErrors.personalInfo = "Phone number is required";
      }

      if (resumeData.education.length === 0) {
         newErrors.education = "At least one education entry is required";
      }

      if (resumeData.skills.length === 0) {
         newErrors.skills = "At least one skill is required";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleStorePDF = async () => {
      if (!validateResume()) {
         const firstErrorSection = Object.keys(errors)[0];
         setActiveSection(firstErrorSection);
         return;
      }

      setIsGeneratingPDF(true);
      try {
         const blob = await pdf(<ResumePDFDocument data={resumeData} template={selectedTemplate} />).toBlob();
         const url = URL.createObjectURL(blob);
         const link = document.createElement("a");
         link.href = url;
         link.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf` || "resume.pdf";
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
         URL.revokeObjectURL(url);
         console.log(blob);
      } catch (error) {
         console.error("PDF generation failed:", error);
         setErrors({ pdf: "Failed to generate PDF. Please try again." });
      } finally {
         setIsGeneratingPDF(false);
      }
   };

   const sectionButtons = [
      { id: "template", label: "Template", icon: "🎨" },
      { id: "personal", label: "Personal Info", icon: "👤" },
      { id: "summary", label: "Summary", icon: "📝" },
      { id: "education", label: "Education", icon: "🎓" },
      { id: "experience", label: "Experience", icon: "💼" },
      { id: "skills", label: "Skills", icon: "⚡" },
      { id: "projects", label: "Projects", icon: "🚀" },
   ];

   const getCompletionStatus = () => {
      const totalSections = 7;
      let completed = 0;

      if (selectedTemplate) completed++;
      if (resumeData.personalInfo.fullName && resumeData.personalInfo.email && resumeData.personalInfo.phone) completed++;
      if (resumeData.summary) completed++;
      if (resumeData.education.length > 0) completed++;
      if (resumeData.workExperience.length > 0) completed++;
      if (resumeData.skills.length > 0) completed++;
      if (resumeData.projects.length > 0) completed++;

      return {
         completed,
         total: totalSections,
         percentage: Math.round((completed / totalSections) * 100),
      };
   };

   const completion = getCompletionStatus();

   return (
      <div className="min-h-screen bg-white/50 dark:bg-slate-700/50 py-8">
         <div className="px-4 ">
            {/* Header */}
            <div className="text-center mb-12">
               <div className="inline-flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
                     <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                     </svg>
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Professional Resume Builder</h1>
               </div>
               <p className="text-lg text-foreground max-w-2xl mx-auto">Create a professional resume in minutes. Choose a template and fill in your details.</p>
            </div>

            {/* Progress Bar */}
            <div className="bg-purple-200/20 dark:bg-purple-400/10 rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
               <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-foreground">Resume Completion</span>
                  <span className="text-md font-bold text-green-500">{completion.percentage}%</span>
               </div>
               <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-[#7e0d09] to-blue-500 h-3 rounded-full transition-all duration-500 ease-out" style={{ width: `${completion.percentage}%` }}></div>
               </div>
               <p className="text-xs text-foreground mt-2">
                  {completion.completed} of {completion.total} sections completed
               </p>
            </div>

            {errors.pdf && (
               <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                     <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                           fillRule="evenodd"
                           d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                           clipRule="evenodd"
                        />
                     </svg>
                  </div>
                  <span className="text-red-800 font-medium">{errors.pdf}</span>
               </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
               {/* Sidebar Navigation */}
               <div className="xl:col-span-1">
                  <div className="bg-purple-200/20 dark:bg-slate-400/40 rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-8">
                     <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        Sections
                     </h3>
                     <nav className="space-y-2">
                        {sectionButtons.map((section) => {
                           const isActive = activeSection === section.id;
                           const hasError = errors[section.id];

                           return (
                              <button
                                 key={section.id}
                                 onClick={() => setActiveSection(section.id)}
                                 className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center gap-3 group ${isActive ? "bg-blue-50 border border-blue-200 shadow-sm" : "hover:bg-gray-500 border border-transparent"} ${
                                    hasError ? "border-red-200 bg-red-50" : ""
                                 }`}
                              >
                                 <span className="text-lg">{section.icon}</span>
                                 <span className={`font-medium flex-1 ${isActive ? "text-blue-700" : "text-foreground"} ${hasError ? "text-red-700" : ""}`}>{section.label}</span>
                                 {hasError && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                              </button>
                           );
                        })}
                     </nav>

                     {/* Selected Template Display */}
                     <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Selected Template</h4>
                        <div className="flex items-center gap-3">
                           <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${TEMPLATES[selectedTemplate].color}`}>{TEMPLATES[selectedTemplate].preview}</div>
                           <div>
                              <p className="text-sm font-medium text-gray-800">{TEMPLATES[selectedTemplate].name}</p>
                              <p className="text-xs text-gray-600">A4 Format</p>
                           </div>
                        </div>
                     </div>

                     {/* Download Button */}
                     <div className="mt-6 pt-6 border-t border-gray-200">
                        <button
                           onClick={() => {
                              handleDownloadPDF();
                              handleStorePDF();
                           }}
                           disabled={isGeneratingPDF}
                           className="w-full bg-gradient-to-r from-[#7e0d09] to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:shadow-none disabled:cursor-not-allowed"
                        >
                           {isGeneratingPDF ? (
                              <>
                                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                 <span>Generating PDF...</span>
                              </>
                           ) : (
                              <>
                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                 </svg>
                                 <span>Download PDF Resume</span>
                              </>
                           )}
                        </button>
                     </div>
                  </div>
               </div>

               {/* Main Content Area */}
               <div className="xl:col-span-3">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     {/* Form Section */}
                     <div className="lg:col-span-2">
                        <div className="bg-purple-200/20 dark:bg-slate-400/20 rounded-2xl shadow-xl p-8 border border-gray-100">
                           {/* Section Header */}
                           <div className="flex items-center justify-between mb-8">
                              <div>
                                 <h2 className="text-2xl font-bold text-foreground">{sectionButtons.find((s) => s.id === activeSection)?.label}</h2>
                                 <p className="text-foreground mt-1">{getSectionDescription(activeSection)}</p>
                              </div>
                              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                 Step {sectionButtons.findIndex((s) => s.id === activeSection) + 1} of {sectionButtons.length}
                              </div>
                           </div>

                           {/* Error Alert */}
                           {errors[activeSection] && (
                              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                                 <div className="flex-shrink-0 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                                    <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                       <path
                                          fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                          clipRule="evenodd"
                                       />
                                    </svg>
                                 </div>
                                 <div>
                                    <span className="text-red-800 font-medium block">Required</span>
                                    <span className="text-red-700 text-sm">{errors[activeSection]}</span>
                                 </div>
                              </div>
                           )}

                           {/* Form Content */}
                           <div className="space-y-6">
                              {activeSection === "template" && <TemplateSelector selectedTemplate={selectedTemplate} onTemplateSelect={setSelectedTemplate} />}

                              {activeSection === "personal" && <PersonalInfoForm data={resumeData.personalInfo} onChange={updatePersonalInfo} errors={errors} />}

                              {activeSection === "summary" && (
                                 <div>
                                    <div className="mb-4">
                                       <label className="block text-sm font-semibold text-foreground mb-2">Professional Summary</label>
                                       <p className="text-sm text-foreground mb-3">Write a compelling summary that highlights your key achievements and career objectives.</p>
                                    </div>
                                    <textarea
                                       value={resumeData.summary}
                                       onChange={(e) => updateSummary(e.target.value)}
                                       placeholder="Example: Results-driven software engineer with 5+ years of experience in full-stack development. Specialized in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions that improve performance by 40%..."
                                       className="w-full h-40 text-foreground p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
                                    />
                                    <div className="flex justify-between text-xs text-foreground mt-2">
                                       <span>Recommended: 2-3 paragraphs</span>
                                       <span>{resumeData.summary.length}/500 characters</span>
                                    </div>
                                 </div>
                              )}

                              {activeSection === "education" && <EducationForm education={resumeData.education} onChange={updateEducation} errors={errors} />}

                              {activeSection === "experience" && <WorkExperienceForm experience={resumeData.workExperience} onChange={updateWorkExperience} />}

                              {activeSection === "skills" && <SkillsForm skills={resumeData.skills} onChange={updateSkills} errors={errors} />}

                              {activeSection === "projects" && <ProjectsForm projects={resumeData.projects} onChange={updateProjects} />}
                           </div>

                           {/* Navigation Buttons */}
                           <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                              <button
                                 onClick={() => {
                                    const currentIndex = sectionButtons.findIndex((s) => s.id === activeSection);
                                    if (currentIndex > 0) {
                                       setActiveSection(sectionButtons[currentIndex - 1].id);
                                    }
                                 }}
                                 disabled={activeSection === "template"}
                                 className="px-6 py-3 border border-gray-300 text-foreground rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
                              >
                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                 </svg>
                                 Previous
                              </button>

                              <button
                                 onClick={() => {
                                    const currentIndex = sectionButtons.findIndex((s) => s.id === activeSection);
                                    if (currentIndex < sectionButtons.length - 1) {
                                       setActiveSection(sectionButtons[currentIndex + 1].id);
                                    }
                                 }}
                                 className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                              >
                                 Next
                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                 </svg>
                              </button>
                           </div>
                        </div>
                     </div>

                     {/* Preview Section */}
                     <div className="lg:col-span-1">
                        <div className="sticky top-8">
                           <div className="bg-purple-200/20 dark:bg-purple-400/10 rounded-2xl shadow-xl p-6 mb-4 border border-gray-100">
                              <div className="flex items-center justify-between mb-4">
                                 <h3 className="text-lg font-semibold text-foreground">Live Preview</h3>
                                 <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{TEMPLATES[selectedTemplate].name} • A4</div>
                              </div>
                              <div className="border-2 border-dashed border-gray-200 rounded-lg p-2 bg-gray-50">
                                 <ResumePreview data={resumeData} template={selectedTemplate} />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

// Helper function for section descriptions
function getSectionDescription(section: string): string {
   const descriptions: Record<string, string> = {
      template: "Choose a resume template that matches your style and industry",
      personal: "Enter your basic contact information and professional links",
      summary: "Write a compelling overview of your professional background",
      education: "List your academic qualifications and achievements",
      experience: "Detail your work history and professional accomplishments",
      skills: "Showcase your technical and professional capabilities",
      projects: "Highlight key projects and your contributions",
   };
   return descriptions[section] || "Fill in your information";
}
