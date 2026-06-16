import React, { useState } from "react";
import { motion } from "motion/react";
import { Cpu, Code, Database, Hammer, CheckCircle, BrainCircuit } from "lucide-react";
import { SKILL_CATEGORIES } from "../data/portfolioData";

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState(0);

  // Icon switcher for each index
  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <BrainCircuit className="text-blue-500" size={18} />;
      case 1:
        return <Code className="text-blue-500" size={18} />;
      case 2:
        return <Database className="text-blue-500" size={18} />;
      case 3:
        return <Hammer className="text-blue-500" size={18} />;
      default:
        return <Cpu className="text-blue-500" size={18} />;
    }
  };

  // Static proficiency map for aesthetic visual meters
  const getProficiency = (skill: string): number => {
    const s = skill.toLowerCase();
    if (s.includes("python") || s.includes("intelligence")) return 90;
    if (s.includes("machine learning") || s.includes("nlp") || s.includes("structures")) return 85;
    if (s.includes("sql") || s.includes("java") || s.includes("oop") || s.includes("visual studio")) return 80;
    return 75; // Standard high bar for certifications
  };

  return (
    <section className="py-20 border-b border-slate-100 dark:border-white/10" id="skills">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 dark:text-[#FFFFFF] md:text-5xl">
            My Skill Matrix
          </h2>
          <div className="mx-auto mt-3.5 h-1.5 w-16 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
          <p className="mt-5 text-base font-semibold text-slate-800 dark:text-[#F1F5F9] max-w-lg mx-auto font-sans">
            Structured skill categories highlighting core competencies, AI models, programming tools, and databases.
          </p>
        </div>

        {/* Tab/Column Grid Layout */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 items-start">
          
          {/* Left Category Selection Tabs */}
          <div className="space-y-2.5 md:col-span-4">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`flex w-full items-center gap-3.5 rounded-xl px-4 py-4 text-left font-display text-base font-bold transition-all ${
                  activeTab === idx
                    ? "bg-blue-50 text-blue-800 shadow-sm dark:bg-blue-950/30 dark:text-[#60A5FA] dark:border dark:border-blue-500/10"
                    : "text-slate-800 hover:bg-slate-100 hover:text-slate-950 dark:text-[#CBD5E1] dark:hover:bg-white/5 dark:hover:text-[#FFFFFF]"
                }`}
                id={`tab-skill-${idx}`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100/40 dark:bg-blue-900/30">
                  {getCategoryIcon(idx)}
                </span>
                <span className="flex-1">{cat.category}</span>
              </button>
            ))}
          </div>

          {/* Right Skills Rendering Panels */}
          <div className="glass rounded-2xl p-6 md:p-8 md:col-span-8 shadow-sm border border-slate-300 dark:border-white/10">
            <h3 className="font-display text-lg font-extrabold text-slate-950 dark:text-[#FFFFFF] mb-6">
              {SKILL_CATEGORIES[activeTab].category} Core Capabilities
            </h3>

            <div className="space-y-6">
              {SKILL_CATEGORIES[activeTab].skills.map((skill, sIdx) => {
                const percentage = getProficiency(skill);
                return (
                  <div key={sIdx} className="space-y-2.5">
                    <div className="flex items-center justify-between font-mono">
                      <span className="flex items-center gap-2 font-display text-base font-bold text-slate-900 dark:text-[#F1F5F9]">
                        <CheckCircle size={15} className="text-blue-600 dark:text-[#60A5FA]" />
                        {skill}
                      </span>
                      <span className="text-sm font-bold text-blue-600 dark:text-[#60A5FA]">
                        {percentage}%
                      </span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="h-2.5 w-full rounded-full bg-slate-200/60 dark:bg-white/10">
                      <motion.div
                        key={`${activeTab}-${sIdx}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full bg-linear-to-r from-blue-500 to-indigo-500"
                      ></motion.div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Micro badge indicator */}
            <div className="mt-8 border-t border-slate-300 dark:border-white/10 pt-4 flex items-center justify-between text-xs font-mono text-slate-700 dark:text-[#CBD5E1] font-bold">
              <span>* Proficiency self-rated based on academic & project exposure</span>
              <span className="text-blue-600 dark:text-[#60A5FA] font-extrabold">Talada Bhagya Lakshmi</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
