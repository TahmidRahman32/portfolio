// config/templates.ts

import { ResumeTemplate, TemplateConfig } from "@/components/type/Resume";


export const TEMPLATES: Record<ResumeTemplate, TemplateConfig> = {
   modern: {
      id: "modern",
      name: "Modern",
      description: "Clean layout with accent colors and modern typography",
      color: "bg-gradient-to-r from-blue-500 to-purple-600",
      preview: "🔄",
   },
   professional: {
      id: "professional",
      name: "Professional",
      description: "Traditional format preferred by corporate employers",
      color: "bg-gradient-to-r from-gray-700 to-gray-900",
      preview: "💼",
   },
   minimal: {
      id: "minimal",
      name: "Minimal",
      description: "Simple and clean design focusing on content",
      color: "bg-gradient-to-r from-green-500 to-teal-600",
      preview: "📄",
   },
   creative: {
      id: "creative",
      name: "Creative",
      description: "Modern design with creative elements for creative industries",
      color: "bg-gradient-to-r from-orange-500 to-pink-600",
      preview: "🎨",
   },
};

export const DEFAULT_TEMPLATE: ResumeTemplate = "modern";
