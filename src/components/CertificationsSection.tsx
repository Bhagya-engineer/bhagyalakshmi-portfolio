import React from "react";
import { motion } from "motion/react";
import { ShieldAlert, Award, Grid, Database, Settings, Terminal, Zap, Lightbulb, CloudLightning } from "lucide-react";
import { CERTIFICATIONS } from "../data/portfolioData";

export default function CertificationsSection() {
  const getCertIcon = (id: string) => {
    switch (id) {
      case "cert-oracle-ai":
        return <CloudLightning size={20} className="text-amber-500" />;
      case "cert-nptel-dbms":
        return <Database size={20} className="text-blue-500" />;
      case "cert-nptel-se":
        return <Settings size={20} className="text-purple-500" />;
      case "cert-infosys-fs":
        return <Terminal size={20} className="text-blue-550 text-blue-500" />;
      case "cert-hackathon":
        return <Zap size={20} className="text-orange-500" />;
      case "cert-ideathons":
        return <Lightbulb size={20} className="text-yellow-500" />;
      default:
        return <Award size={20} className="text-blue-500" />;
    }
  };

  return (
    <section className="py-20 border-b border-slate-100 dark:border-white/10" id="certifications">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Section Heading */}
        <div className="mb-14 text-center">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 dark:text-[#FFFFFF] md:text-5xl">
            🏆 Certifications & Achievements
          </h2>
          <div className="mx-auto mt-3.5 h-1.5 w-16 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
          <p className="mt-5 text-base font-semibold text-slate-800 dark:text-[#F1F5F9] max-w-lg mx-auto font-sans">
            Industry alignments, hackathons, and certifications verifying professional standards of practice.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert) => (
            <motion.div
              key={cert.id}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`rounded-2xl border p-6 shadow-xs transition-all duration-300 hover:shadow-md dark:bg-[#111111]/95 ${
                cert.highlight 
                  ? "border-blue-300 dark:border-blue-500/50 dark:shadow-blue-950/15 bg-linear-to-b from-blue-50/15 via-white to-white dark:from-blue-950/20 dark:via-[#111111] dark:to-[#111111]" 
                  : "border-slate-300 dark:border-white/20 bg-white"
              }`}
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                {/* Certificate Icon Hub */}
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/10">
                  {getCertIcon(cert.id)}
                </span>

                {/* Badge Label */}
                {cert.badge && (
                  <span className={`inline-flex items-center rounded-full px-3 py-1 font-mono text-xs font-extrabold uppercase tracking-wider border ${
                    cert.highlight
                      ? "bg-blue-105/10 text-blue-900 border-blue-200 dark:bg-blue-950/60 dark:text-[#60A5FA] dark:border-blue-500/30"
                      : "bg-slate-200 text-slate-950 dark:bg-[#1c1c1c] dark:text-[#CBD5E1] border-slate-350 dark:border-white/20"
                  }`}>
                    {cert.badge}
                  </span>
                )}
              </div>

              {/* Title & Platform */}
              <h3 className="font-display text-lg font-extrabold leading-snug text-slate-950 dark:text-[#FFFFFF] mb-4 line-clamp-2">
                {cert.title}
              </h3>

              <div className="flex items-center justify-between text-sm font-mono text-slate-800 dark:text-[#CBD5E1] border-t border-slate-300 dark:border-white/10 pt-3.5">
                <span className="font-bold text-slate-700 dark:text-[#CBD5E1]">Issued by:</span>
                <span className="font-extrabold text-slate-950 dark:text-[#FFFFFF]">{cert.issuer}</span>
              </div>

              {/* Decorative accent for highlight cards */}
              {cert.highlight && (
                <div className="mt-4 pt-3 border-t border-blue-500/20 flex items-center gap-1.5 text-xs font-mono text-blue-700 dark:text-[#60A5FA] font-extrabold uppercase tracking-widest">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                  <span>Featured Achievement</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
