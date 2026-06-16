import React, { useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Phone, MapPin, Printer, Download, Github, Linkedin, Calendar, GraduationCap, Briefcase, Award, CheckSquare } from "lucide-react";
import { PERSONAL_INFO, PROJECTS, EDUCATION, INTERNSHIP, CERTIFICATIONS, SKILL_CATEGORIES } from "../data/portfolioData";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMockPDF = () => {
    // Generate simple text data for download or trigger print
    const textContent = `
========================================
RESUME - TALADA BHAGYA LAKSHMI
========================================
Email: ${PERSONAL_INFO.email}
LinkedIn: ${PERSONAL_INFO.linkedin}
GitHub: ${PERSONAL_INFO.github}
Contact No: ${PERSONAL_INFO.phone}

OBJECTIVE:
Computer Science Engineering Student specializing in Artificial Intelligence.
${PERSONAL_INFO.about}

EDUCATION:
${EDUCATION.map(edu => `- ${edu.institution}\n  ${edu.degree}\n  Duration: ${edu.duration}\n  Score: ${edu.score}`).join("\n\n")}

SKILLS:
${SKILL_CATEGORIES.map(cat => `- ${cat.category}: ${cat.skills.join(", ")}`).join("\n")}

INTERNSHIP:
- ${INTERNSHIP.role} at ${INTERNSHIP.company}
  Location: ${INTERNSHIP.location} | Duration: ${INTERNSHIP.duration}
  Responsibilities:
  ${INTERNSHIP.responsibilities.map(resp => `  * ${resp}`).join("\n")}

PROJECTS:
${PROJECTS.map(proj => `- ${proj.title}\n  Technologies: ${proj.technologies.join(", ")}\n  Description: ${proj.description}`).join("\n\n")}

CERTIFICATIONS:
${CERTIFICATIONS.map(cert => `- ${cert.title} (${cert.issuer})`).join("\n")}
    `.trim();

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Talada_Bhagya_Lakshmi_ATS_Resume.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-xs no-print">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white text-slate-800 shadow-2xl dark:bg-[#111111] dark:border dark:border-white/20 dark:text-[#FFFFFF] dark:shadow-blue-950/20"
        >
          {/* Header Action Bar */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-300 bg-slate-100/90 p-4 backdrop-blur-md dark:border-white/20 dark:bg-[#111111]/95">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse"></span>
              <h2 className="font-display text-lg font-extrabold tracking-tight text-slate-950 dark:text-[#FFFFFF]">
                ATS-Friendly Resume Sheet
              </h2>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 rounded-lg bg-blue-100/80 border border-blue-200 px-3.5 py-1.5 font-display text-xs font-extrabold text-blue-900 transition-colors hover:bg-blue-250 dark:bg-blue-950/30 dark:text-[#60A5FA] dark:hover:bg-blue-900/60 dark:border-blue-500/20 cursor-pointer"
                title="Print Resume or Save as PDF using default browser print"
                id="btn-print-resume"
              >
                <Printer size={14} />
                <span>Save PDF/Print</span>
              </button>

              <button
                onClick={handleDownloadMockPDF}
                className="flex items-center gap-1.5 rounded-lg bg-slate-200 border border-slate-300 px-3.5 py-1.5 font-display text-xs font-extrabold text-slate-950 transition-colors hover:bg-slate-300 dark:bg-white/10 dark:border-white/20 dark:text-[#F1F5F9] dark:hover:bg-white/20 cursor-pointer"
                title="Download plain-text ATS friendly resume"
                id="btn-download-resume"
              >
                <Download size={14} />
                <span>Download TXT</span>
              </button>

              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-200 hover:text-slate-750 dark:hover:bg-white/10 dark:hover:text-[#FFFFFF] cursor-pointer"
                id="btn-close-resume"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Printable Resume Canvas */}
          <div 
            ref={resumeRef} 
            className="p-6 md:p-12 print:p-0 print:text-black print:bg-white bg-slate-50 dark:bg-[#0a0a0a]"
          >
            {/* White Sheet Mock */}
            <div className="mx-auto max-w-[210mm] border border-slate-350 bg-white p-6 shadow-sm md:p-10 dark:border-white/20 dark:bg-[#161616] print:border-none print:p-0 print:shadow-none">
              
              {/* ATS Header */}
              <div className="border-b-2 border-blue-500 pb-5 text-center md:pb-6 print:border-slate-800">
                <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-905 dark:text-[#FFFFFF] print:text-black">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="mt-1 font-extrabold text-blue-705 dark:text-[#60A5FA] print:text-slate-700 text-sm">
                  {PERSONAL_INFO.designation.toUpperCase()}
                </p>
                
                {/* Contact Columns */}
                <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-[11px] font-extrabold text-slate-750 dark:text-[#CBD5E1] print:text-slate-600">
                  <div className="flex items-center gap-1">
                    <Mail size={12} className="text-blue-600 dark:text-[#60A5FA] print:text-black" />
                    <span>{PERSONAL_INFO.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone size={12} className="text-blue-600 dark:text-[#60A5FA] print:text-black" />
                    <span>{PERSONAL_INFO.phone}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={12} className="text-blue-600 dark:text-[#60A5FA] print:text-black" />
                    <span>{PERSONAL_INFO.location}</span>
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-[11px] font-extrabold text-slate-750 dark:text-[#CBD5E1] print:text-slate-600">
                  <div className="flex items-center gap-1">
                    <Linkedin size={12} className="text-blue-600 dark:text-[#60A5FA] print:text-black" />
                    <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                      linkedin.com/in/bhagya-lakshmi-3520352b8
                    </a>
                  </div>
                  <div className="flex items-center gap-1">
                    <Github size={12} className="text-blue-600 dark:text-[#60A5FA] print:text-black" />
                    <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:underline">
                      github.com/Bhagya-engineer
                    </a>
                  </div>
                </div>
              </div>

              {/* 2-column Layout */}
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12 print:grid-cols-12 print:gap-5">
                
                {/* Left Column (8 cols in desktop/print) */}
                <div className="space-y-5 md:col-span-8 print:col-span-8">
                  
                  {/* Summary */}
                  <div>
                    <h3 className="border-b border-slate-300 font-display text-xs font-extrabold uppercase tracking-widest text-slate-950 pb-1 dark:border-white/20 dark:text-[#60A5FA] print:border-slate-400 print:text-black">
                      Professional Summary
                    </h3>
                    <p className="mt-2 text-[12px] leading-relaxed text-slate-850 dark:text-[#CBD5E1] print:text-slate-800 font-semibold whitespace-pre-line">
                      {PERSONAL_INFO.about}
                    </p>
                  </div>

                  {/* Experience / Internship */}
                  <div>
                    <h3 className="border-b border-slate-300 font-display text-xs font-extrabold uppercase tracking-widest text-slate-950 pb-1 dark:border-white/20 dark:text-[#60A5FA] print:border-slate-400 print:text-black">
                      Internship Experience
                    </h3>
                    <div className="mt-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-[13px] font-extrabold text-slate-950 dark:text-[#FFFFFF] print:text-black">
                            {INTERNSHIP.role}
                          </h4>
                          <p className="font-mono text-[11px] font-bold text-blue-600 dark:text-[#60A5FA] print:text-slate-700">
                            {INTERNSHIP.company} — {INTERNSHIP.location}
                          </p>
                        </div>
                        <span className="font-mono text-[10px] font-extrabold text-slate-700 dark:text-[#CBD5E1] print:text-slate-600">
                          {INTERNSHIP.duration}
                        </span>
                      </div>
                      <ul className="mt-2 list-disc pl-4 space-y-1 text-[11.5px] text-slate-850 dark:text-[#F1F5F9] print:text-slate-800 font-semibold">
                        {INTERNSHIP.responsibilities.map((resp, idx) => (
                          <li key={idx}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>                  {/* Core Projects */}
                  <div>
                    <h3 className="border-b border-slate-300 font-display text-xs font-extrabold uppercase tracking-widest text-slate-950 pb-1 dark:border-white/20 dark:text-[#60A5FA] print:border-slate-400 print:text-black">
                      Key Technical Projects
                    </h3>
                    <div className="mt-3 space-y-4">
                      {PROJECTS.slice(0, 3).map((proj) => (
                        <div key={proj.id} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-[13px] font-extrabold text-slate-950 dark:text-[#FFFFFF] print:text-black">
                              {proj.title}
                            </h4>
                          </div>
                          <p className="font-mono text-[10px] font-extrabold text-slate-700 dark:text-[#CBD5E1] print:text-slate-600">
                            Technologies: {proj.technologies.join(", ")}
                          </p>
                          <p className="text-[11.5px] text-slate-850 dark:text-[#F1F5F9] print:text-slate-800 leading-tight font-semibold">
                            {proj.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right Column (4 cols in desktop/print) */}
                <div className="space-y-5 md:col-span-4 print:col-span-4 print:pl-3">
                  
                  {/* Skills Grid */}
                  <div>
                    <h3 className="border-b border-slate-300 font-display text-xs font-extrabold uppercase tracking-widest text-slate-950 pb-1 dark:border-white/20 dark:text-[#60A5FA] print:border-slate-400 print:text-black">
                      Technical Skills
                    </h3>
                    <div className="mt-3 space-y-3">
                      {SKILL_CATEGORIES.map((cat, idx) => (
                        <div key={idx} className="space-y-0.5">
                          <p className="font-display text-[10.5px] font-extrabold tracking-tight text-slate-950 dark:text-[#FFFFFF] print:text-slate-900">
                            {cat.category}
                          </p>
                          <p className="font-mono text-[10.5px] text-slate-800 dark:text-[#CBD5E1] print:text-slate-800 leading-relaxed font-bold">
                            {cat.skills.join(", ")}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Science / Education */}
                  <div>
                    <h3 className="border-b border-slate-300 font-display text-xs font-extrabold uppercase tracking-widest text-slate-950 pb-1 dark:border-white/20 dark:text-[#60A5FA] print:border-slate-400 print:text-black">
                      Education
                    </h3>
                    <div className="mt-3 space-y-3">
                      {EDUCATION.map((edu) => (
                        <div key={edu.id} className="space-y-0.5">
                          <p className="font-display text-[11px] font-extrabold leading-tight text-slate-950 dark:text-[#FFFFFF] print:text-black">
                            {edu.institution}
                          </p>
                          <p className="text-[10px] font-semibold text-slate-800 dark:text-[#CBD5E1] print:text-slate-600 leading-tight">
                            {edu.degree}
                          </p>
                          <div className="flex justify-between font-mono text-[9px] text-blue-700 dark:text-[#60A5FA] print:text-slate-800 font-extrabold">
                            <span>{edu.duration}</span>
                            <span>{edu.score}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications (Brief List for Resume) */}
                  <div>
                    <h3 className="border-b border-slate-300 font-display text-xs font-extrabold uppercase tracking-widest text-slate-950 pb-1 dark:border-white/20 dark:text-[#60A5FA] print:border-slate-400 print:text-black">
                      Certifications
                    </h3>
                    <ul className="mt-2 text-[10.5px] text-slate-850 dark:text-[#F1F5F9] print:text-slate-800 space-y-1.5 list-disc pl-3 font-semibold">
                      {CERTIFICATIONS.slice(0, 5).map((cert, idx) => (
                        <li key={idx} className="leading-tight">
                          <span className="font-extrabold">{cert.title}</span> — <span className="text-[9.5px] text-slate-705 dark:text-[#CBD5E1] print:text-slate-600">{cert.issuer}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

              </div>

              {/* PDF Footer Declaration */}
              <div className="mt-8 border-t border-slate-300 pt-3 text-center font-mono text-[9px] font-extrabold text-slate-700 dark:border-white/10 dark:text-[#CBD5E1] print:border-slate-300 print:text-slate-500">
                TALADA BHAGYA LAKSHMI — ATS Certified AI Developer Portfolio CV — Generated in 2026
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
