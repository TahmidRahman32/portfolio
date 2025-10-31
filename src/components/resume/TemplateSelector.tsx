// components/resume/TemplateSelector.tsx
// import { ResumeTemplate } from "@/types/resume";
// import { TEMPLATES } from "@/config/templates";

import { TEMPLATES } from "@/utils/templates";
import { ResumeTemplate } from "../type/Resume";

interface TemplateSelectorProps {
   selectedTemplate: ResumeTemplate;
   onTemplateSelect: (template: ResumeTemplate) => void;
}

export default function TemplateSelector({ selectedTemplate, onTemplateSelect }: TemplateSelectorProps) {
   return (
      <div>
         <h3 className="text-xl font-semibold mb-4">Choose a Template</h3>
         <p className="text-gray-600 mb-6">Select a resume template that best fits your style and industry. All templates are A4 format optimized for PDF.</p>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            {Object.values(TEMPLATES).map((template) => (
               <div
                  key={template.id}
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${selectedTemplate === template.id ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-200 bg-white hover:border-gray-300"}`}
                  onClick={() => onTemplateSelect(template.id)}
               >
                  <div className="flex items-center gap-4 mb-4">
                     <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl ${template.color}`}>{template.preview}</div>
                     <div>
                        <h4 className="font-semibold text-gray-800 text-lg">{template.name}</h4>
                        <p className="text-sm text-gray-600">{template.description}</p>
                     </div>
                  </div>

                  {/* Template Preview Mini */}
                  <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
                     <div className="space-y-3">
                        <div className="flex justify-between items-center">
                           <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                           <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                        </div>
                        <div className="h-3 bg-gray-300 rounded w-full"></div>
                        <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                        <div className="flex gap-2">
                           <div className="h-6 bg-gray-300 rounded flex-1"></div>
                           <div className="h-6 bg-gray-300 rounded flex-1"></div>
                        </div>
                     </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                     <span className="text-sm text-gray-500">A4 Format</span>
                     {selectedTemplate === template.id && (
                        <span className="text-blue-600 font-medium text-sm flex items-center gap-1">
                           <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                           </svg>
                           Selected
                        </span>
                     )}
                  </div>
               </div>
            ))}
         </div>

         {/* Template Features */}
         <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-4">All Templates Include:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
               <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                     <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                  </div>
                  <span className="text-gray-700">A4 Page Format</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                     <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                  </div>
                  <span className="text-gray-700">Professional Typography</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                     <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                  </div>
                  <span className="text-gray-700">ATS Friendly</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                     <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                  </div>
                  <span className="text-gray-700">Mobile Responsive</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                     <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                  </div>
                  <span className="text-gray-700">Clean Layout</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                     <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                  </div>
                  <span className="text-gray-700">Easy to Customize</span>
               </div>
            </div>
         </div>
      </div>
   );
}
