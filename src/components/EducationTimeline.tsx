import React from "react";
import { motion } from "motion/react";
import { GraduationCap, BookOpen, School, Calendar, Award } from "lucide-react";
import { EDUCATION } from "../data/portfolioData";

export default function EducationTimeline() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "GraduationCap":
        return <GraduationCap size={18} className="text-blue-600 dark:text-blue-400" />;
      case "BookOpen":
        return <BookOpen size={18} className="text-blue-600 dark:text-blue-400" />;
      case "School":
        return <School size={18} className="text-blue-600 dark:text-blue-400" />;
      default:
        return <GraduationCap size={18} className="text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <section className="py-20 border-b border-slate-100 dark:border-white/10" id="education">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Section Heading */}
        <div className="mb-16 text-center">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 dark:text-[#FFFFFF] md:text-5xl">
            My Educational Journey
          </h2>
          <div className="mx-auto mt-3.5 h-1.5 w-16 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
          <p className="mt-5 text-base font-semibold text-slate-800 dark:text-[#F1F5F9] max-w-lg mx-auto font-sans">
            Solid foundations in technology and engineering with excellent scholastic milestones.
          </p>
        </div>

        {/* Timeline Line Grid */}
        <div className="relative border-l-2 border-slate-350 dark:border-white/10 ml-4 md:ml-10 space-y-12 pb-4">
          
          {EDUCATION.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Timeline Indicator Hub */}
              <div className="absolute -left-5 top-1 flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow-xs transition-colors group-hover:border-blue-500 dark:border-white/10 dark:bg-[#111111]">
                {getIcon(edu.icon)}
              </div>

              {/* Card Body */}
              <div className="glass rounded-2xl p-6 md:p-8 shadow-xs border border-slate-300 dark:border-white/10 transition-all duration-300 group-hover:shadow-md dark:shadow-slate-950/25">
                
                {/* Meta details */}
                <div className="flex flex-wrap items-center justify-between gap-y-3 mb-4">
                  <span className="flex items-center gap-1.5 font-mono text-sm font-extrabold text-slate-800 dark:text-[#CBD5E1] bg-slate-100 dark:bg-white/10 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-white/20">
                    <Calendar size={13} className="text-blue-500" />
                    {edu.duration}
                  </span>
                  
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 px-3 py-1.5 font-mono text-sm font-extrabold text-blue-900 dark:bg-blue-950/45 dark:text-[#60A5FA] border border-blue-100 dark:border-blue-500/20">
                    <Award size={13} className="text-blue-600" />
                    {edu.score}
                  </span>
                </div>

                <h3 className="font-display text-xl font-extrabold text-slate-950 group-hover:text-blue-600 dark:text-[#FFFFFF] dark:group-hover:text-[#60A5FA] transition-colors">
                  {edu.institution}
                </h3>
                
                <p className="mt-2 text-base font-bold text-slate-900 dark:text-[#F1F5F9]">
                  {edu.degree}
                </p>

                {/* Additional contextual description based on degree */}
                {edu.id === "edu-btech" && (
                  <p className="mt-4 text-sm leading-relaxed text-slate-800 dark:text-[#CBD5E1] border-t border-slate-200/50 dark:border-white/5 pt-3.5 font-sans font-semibold">
                    Currently pursuing deep pathways in Machine Learning, Statistical Evaluation, natural processing algorithms, and software design guidelines.
                  </p>
                )}

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
