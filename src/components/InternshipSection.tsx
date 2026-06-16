import React from "react";
import { motion } from "motion/react";
import { Briefcase, CheckCircle, Calendar, MapPin, Building, Award } from "lucide-react";
import { INTERNSHIP } from "../data/portfolioData";

export default function InternshipSection() {
  return (
    <section className="py-20 border-b border-slate-100 dark:border-white/10" id="internship">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Section Heading */}
        <div className="mb-14 text-center">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 dark:text-[#FFFFFF] md:text-5xl">
            Professional Internships
          </h2>
          <div className="mx-auto mt-3.5 h-1.5 w-16 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
          <p className="mt-5 text-base font-semibold text-slate-800 dark:text-[#F1F5F9] max-w-lg mx-auto font-sans">
            Practical workspace learning and software engineering industry exposure.
          </p>
        </div>

        {/* Internship Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-6 md:p-10 shadow-sm border border-slate-300 dark:border-white/10 relative overflow-hidden"
        >
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-blue-400/10 dark:bg-blue-550/5 blur-xl"></div>
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1.5 font-mono text-xs font-bold text-blue-900 border border-blue-100 dark:border-blue-500/20 dark:bg-blue-950/40 dark:text-[#60A5FA]">
                <Award size={13} />
                <span>Industry Experience</span>
              </span>

              <h3 className="font-display text-2xl font-extrabold text-slate-950 dark:text-[#FFFFFF] md:text-3xl mt-2 leading-tight">
                {INTERNSHIP.role}
              </h3>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-850 dark:text-[#CBD5E1] font-semibold">
                {/* Company Name */}
                <span className="flex items-center gap-1.5 font-extrabold text-slate-950 dark:text-[#F1F5F9]">
                  <Building size={15} className="text-blue-600 dark:text-[#60A5FA]" />
                  {INTERNSHIP.company}
                </span>

                {/* Geography */}
                <span className="flex items-center gap-1.5 font-extrabold text-slate-800 dark:text-[#CBD5E1]">
                  <MapPin size={15} className="text-blue-500" />
                  {INTERNSHIP.location}
                </span>
              </div>
            </div>

            {/* Duration Tag */}
            <span className="flex items-center gap-1.5 self-start font-mono text-sm font-extrabold text-slate-800 bg-slate-100 border border-slate-300 dark:bg-white/10 dark:border-white/20 px-3.5 py-2 rounded-xl text-slate-800 dark:text-[#F1F5F9]">
              <Calendar size={14} className="text-blue-500" />
              {INTERNSHIP.duration}
            </span>
          </div>

          <div className="border-t border-slate-200/55 dark:border-white/10 pt-6">
            <h4 className="font-display text-sm font-extrabold text-slate-700 dark:text-[#CBD5E1] uppercase tracking-widest mb-4">
              Core Responsibilities & Learning Outcomes
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INTERNSHIP.responsibilities.map((resp, idx) => (
                <div key={idx} className="flex items-start gap-3.5 p-4 bg-slate-50/50 dark:bg-white/10 border border-slate-300 dark:border-white/20 rounded-xl">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-[#60A5FA] mt-0.5">
                    <CheckCircle size={13} />
                  </span>
                  <p className="text-sm leading-relaxed text-slate-850 dark:text-[#F1F5F9] font-sans font-semibold">
                    {resp}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
