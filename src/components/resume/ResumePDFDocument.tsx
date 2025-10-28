// components/resume/ResumePDFDocument.tsx
"use client";

import { Page, Text, View, Document, StyleSheet, Link, Font } from "@react-pdf/renderer";
import { ResumeData, ResumeTemplate } from "../type/Resume";


// Register fonts if needed (removed because Helvetica is available by default)
// If you need to register custom fonts, use the 'fonts' array, for example:
// Font.register({ family: "Custom", fonts: [{ src: "/path/to/font-regular.ttf" }, { src: "/path/to/font-bold.ttf", fontWeight: 700 }] });

// Create styles

// components/resume/ResumePDFDocument.tsx



// Register fonts
const styles = StyleSheet.create({
   page: {
      flexDirection: "column",
      backgroundColor: "#FFFFFF",
      padding: 30,
      fontFamily: "Helvetica",
   },
   section: {
      marginBottom: 15,
   },
   header: {
      fontSize: 24,
      marginBottom: 10,
      textAlign: "center",
      fontWeight: "bold",
      color: "#2c3e50",
   },
   subheader: {
      fontSize: 16,
      marginBottom: 8,
      fontWeight: "bold",
      color: "#2c3e50",
      borderBottom: "1pt solid #bdc3c7",
      paddingBottom: 3,
   },
   text: {
      fontSize: 12,
      marginBottom: 5,
      color: "#000000",
      lineHeight: 1.4,
   },
   bold: {
      fontWeight: "bold",
   },
   italic: {
      fontStyle: "italic",
   },
   row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 5,
      alignItems: "flex-start",
   },
   contactInfo: {
      fontSize: 11,
      marginBottom: 8,
      textAlign: "center",
      color: "#666666",
      lineHeight: 1.5,
   },
   link: {
      fontSize: 11,
      color: "#3498db",
      textDecoration: "none",
   },
   skillTag: {
      backgroundColor: "#ecf0f1",
      padding: "3px 8px",
      margin: "2px",
      borderRadius: 3,
      fontSize: 10,
      color: "#000000",
   },
   projectTech: {
      backgroundColor: "#d6eaf8",
      padding: "2px 6px",
      margin: "1px",
      borderRadius: 2,
      fontSize: 9,
      color: "#2c3e50",
   },
   list: {
      marginLeft: 10,
      marginTop: 5,
   },
   listItem: {
      fontSize: 11,
      marginBottom: 3,
      lineHeight: 1.4,
   },
});

Font.register({
  family: 'Helvetica-Bold',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
});

// Template-specific styles
const getTemplateStyles = (template: ResumeTemplate) => {
  const baseStyles = {
    primaryColor: '#2c3e50',
    secondaryColor: '#3498db',
    accentColor: '#ecf0f1',
    textColor: '#000000',
    lightText: '#666666',
  };

  switch (template) {
    case 'modern':
      return {
        primaryColor: '#3498db',
        secondaryColor: '#8e44ad',
        accentColor: '#d6eaf8',
        textColor: '#2c3e50',
        lightText: '#7f8c8d',
      };
    case 'professional':
      return {
        primaryColor: '#2c3e50',
        secondaryColor: '#34495e',
        accentColor: '#ecf0f1',
        textColor: '#2c3e50',
        lightText: '#7f8c8d',
      };
    case 'minimal':
      return {
        primaryColor: '#27ae60',
        secondaryColor: '#2ecc71',
        accentColor: '#d5f4e6',
        textColor: '#2c3e50',
        lightText: '#7f8c8d',
      };
    case 'creative':
      return {
        primaryColor: '#e67e22',
        secondaryColor: '#e74c3c',
        accentColor: '#fdebd0',
        textColor: '#2c3e50',
        lightText: '#7f8c8d',
      };
    default:
      return baseStyles;
  }
};

const createStyles = (template: ResumeTemplate) => {
  const colors = getTemplateStyles(template);
  
  return StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      padding: 30,
      fontFamily: 'Helvetica',
    },
    section: {
      marginBottom: 15,
    },
    header: {
      fontSize: 24,
      marginBottom: 10,
      textAlign: 'center',
      fontWeight: 'bold',
      color: colors.primaryColor,
    },
    subheader: {
      fontSize: 16,
      marginBottom: 8,
      fontWeight: 'bold',
      color: colors.primaryColor,
      borderBottom: `1pt solid ${colors.secondaryColor}`,
      paddingBottom: 3,
    },
    text: {
      fontSize: 12,
      marginBottom: 5,
      color: colors.textColor,
      lineHeight: 1.4,
    },
    bold: {
      fontWeight: 'bold',
      fontFamily: 'Helvetica-Bold',
    },
    italic: {
      fontStyle: 'italic',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
      alignItems: 'flex-start',
    },
    contactInfo: {
      fontSize: 11,
      marginBottom: 8,
      textAlign: 'center',
      color: colors.lightText,
      lineHeight: 1.5,
    },
    link: {
      fontSize: 11,
      color: colors.secondaryColor,
      textDecoration: 'none',
    },
    skillTag: {
      backgroundColor: colors.accentColor,
      padding: '3px 8px',
      margin: '2px',
      borderRadius: 3,
      fontSize: 10,
      color: colors.textColor,
    },
    projectTech: {
      backgroundColor: colors.accentColor,
      padding: '2px 6px',
      margin: '1px',
      borderRadius: 2,
      fontSize: 9,
      color: colors.textColor,
    },
    list: {
      marginLeft: 10,
      marginTop: 5,
    },
    listItem: {
      fontSize: 11,
      marginBottom: 3,
      lineHeight: 1.4,
    }
  });
};

// Helper function to format dates
const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  } catch {
    return dateString;
  }
};

// Create Document Component
const ResumePDFDocument = ({ data, template }: { data: ResumeData; template: ResumeTemplate }) => {
  const styles = createStyles(template);
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={[styles.section, { textAlign: 'center' }]}>
          <Text style={styles.header}>{data.personalInfo.fullName}</Text>
          <Text style={styles.contactInfo}>
            {data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.address}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 5 }}>
            {data.personalInfo.linkedin && (
              <Link src={data.personalInfo.linkedin} style={styles.link}>
                LinkedIn
              </Link>
            )}
            {data.personalInfo.github && (
              <Link src={data.personalInfo.github} style={styles.link}>
                GitHub
              </Link>
            )}
            {data.personalInfo.website && (
              <Link src={data.personalInfo.website} style={styles.link}>
                Portfolio
              </Link>
            )}
          </View>
        </View>

        {/* Summary */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.subheader}>PROFESSIONAL SUMMARY</Text>
            <Text style={styles.text}>{data.summary}</Text>
          </View>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subheader}>EDUCATION</Text>
            {data.education.map(edu => (
              <View key={edu.id} style={{ marginBottom: 12 }}>
                <View style={styles.row}>
                  <Text style={[styles.text, styles.bold]}>{edu.institution}</Text>
                  <Text style={styles.text}>
                    {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                  </Text>
                </View>
                <Text style={styles.text}>
                  {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                </Text>
                {edu.gpa && (
                  <Text style={styles.text}>
                    <Text style={styles.bold}>GPA:</Text> {edu.gpa}
                  </Text>
                )}
                {edu.description && (
                  <Text style={[styles.text, { marginTop: 3 }]}>{edu.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Work Experience */}
        {data.workExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subheader}>PROFESSIONAL EXPERIENCE</Text>
            {data.workExperience.map(exp => (
              <View key={exp.id} style={{ marginBottom: 12 }}>
                <View style={styles.row}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.text, styles.bold]}>{exp.position}</Text>
                    <Text style={[styles.text, styles.italic]}>{exp.company}</Text>
                  </View>
                  <Text style={[styles.text, { marginLeft: 10 }]}>
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </Text>
                </View>
                {exp.description && (
                  <Text style={[styles.text, { marginTop: 3 }]}>{exp.description}</Text>
                )}
                {exp.achievements && exp.achievements.length > 0 && (
                  <View style={styles.list}>
                    {exp.achievements.map((achievement, index) => (
                      <Text key={index} style={styles.listItem}>• {achievement}</Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subheader}>SKILLS</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
              {data.skills.map(skill => (
                <Text key={skill.id} style={styles.skillTag}>
                  {skill.name}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subheader}>PROJECTS</Text>
            {data.projects.map(project => (
              <View key={project.id} style={{ marginBottom: 10 }}>
                <View style={styles.row}>
                  <Text style={[styles.text, styles.bold]}>{project.name}</Text>
                  {project.link && (
                    <Link src={project.link} style={styles.link}>
                      View Project
                    </Link>
                  )}
                </View>
                <Text style={styles.text}>{project.description}</Text>
                {project.technologies.length > 0 && (
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5, gap: 3 }}>
                    {project.technologies.map((tech, index) => (
                      <Text key={index} style={styles.projectTech}>
                        {tech}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumePDFDocument;