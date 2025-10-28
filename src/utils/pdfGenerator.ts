// utils/simplePdfGenerator.ts
import { ResumeData } from "@/components/type/Resume";
import { jsPDF } from "jspdf";

export const generateSimplePDF = async (resumeData: ResumeData): Promise<void> => {
   try {
      const pdf = new jsPDF({
         orientation: "portrait",
         unit: "mm",
         format: "a4",
      });

      let yPosition = 20;

      // Add header
      pdf.setFontSize(20);
      pdf.setFont("helvetica", "bold");
      pdf.text(resumeData.personalInfo.fullName, 105, yPosition, { align: "center" });
      yPosition += 10;

      // Contact info
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      const contactInfo = [resumeData.personalInfo.email, resumeData.personalInfo.phone, resumeData.personalInfo.address].filter(Boolean).join(" | ");

      pdf.text(contactInfo, 105, yPosition, { align: "center" });
      yPosition += 15;

      // Summary
      if (resumeData.summary) {
         pdf.setFontSize(14);
         pdf.setFont("helvetica", "bold");
         pdf.text("PROFESSIONAL SUMMARY", 20, yPosition);
         yPosition += 8;

         pdf.setFontSize(10);
         pdf.setFont("helvetica", "normal");
         const splitSummary = pdf.splitTextToSize(resumeData.summary, 170);
         pdf.text(splitSummary, 20, yPosition);
         yPosition += splitSummary.length * 5 + 10;
      }

      // Education
      if (resumeData.education.length > 0) {
         pdf.setFontSize(14);
         pdf.setFont("helvetica", "bold");
         pdf.text("EDUCATION", 20, yPosition);
         yPosition += 8;

         pdf.setFontSize(10);
         pdf.setFont("helvetica", "normal");

         resumeData.education.forEach((edu) => {
            if (yPosition > 270) {
               pdf.addPage();
               yPosition = 20;
            }

            pdf.setFont("helvetica", "bold");
            pdf.text(edu.institution, 20, yPosition);

            pdf.setFont("helvetica", "normal");
            pdf.text(`${formatDate(edu.startDate)} - ${edu.endDate ? formatDate(edu.endDate) : "Present"}`, 170, yPosition, { align: "right" });
            yPosition += 5;

            pdf.text(`${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}`, 20, yPosition);
            yPosition += 5;

            if (edu.gpa) {
               pdf.text(`GPA: ${edu.gpa}`, 20, yPosition);
               yPosition += 5;
            }

            if (edu.description) {
               const splitDesc = pdf.splitTextToSize(edu.description, 170);
               pdf.text(splitDesc, 20, yPosition);
               yPosition += splitDesc.length * 5;
            }

            yPosition += 5;
         });
      }

      // Add more sections similarly...

      // Save the PDF
      pdf.save(`${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`);
   } catch (error) {
      console.error("Error generating PDF:", error);
      throw new Error("Failed to generate PDF. Please try again.");
   }
};

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
