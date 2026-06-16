import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, X, Cpu, Code2, Tag, BookOpen, Layers, Github, ArrowRight } from "lucide-react";
import { Project } from "../types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <>
      {/* Project Thumbnail Card */}
      <motion.div
        whileHover={{ 
          y: -8, 
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(124, 58, 237, 0.2)" 
        }}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="group relative flex flex-col overflow-hidden rounded-[20px] bg-[#050B1F] border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-300 cursor-pointer h-full"
        onClick={() => setIsOverlayOpen(true)}
      >
        {/* Large project preview image (16:9 ratio) */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-900 border-b border-white/5">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          {/* subtle linear dark gradient overlay to frame the image and avoid flat visual look */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050B1F] via-transparent to-transparent opacity-80" />
          
          {/* Quick Glass Indicator */}
          <div className="absolute top-3 right-3 rounded-full bg-slate-950/70 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono font-bold tracking-widest text-slate-300 uppercase border border-white/10 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
            <span>SaaS Showcase</span>
          </div>
        </div>

        {/* Content Sheet */}
        <div className="flex flex-1 flex-col p-5">
          {/* Tech Badges Row */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.technologies.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-slate-300 border border-white/10"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="inline-flex items-center rounded-full bg-white/5 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-400 border border-white/10">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>

          <h3 className="font-display font-bold text-lg text-white group-hover:text-purple-400 transition-colors line-clamp-1 mb-2 tracking-tight">
            {project.title}
          </h3>

          <p className="text-slate-400 text-xs font-semibold leading-relaxed line-clamp-3 mb-6 font-sans">
            {project.description}
          </p>

          {/* Thin divider line above action buttons */}
          <div className="border-t border-white/10 mt-auto pt-4 flex items-center justify-between">
            {/* VIEW DETAILS in purple gradient */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOverlayOpen(true);
              }}
              className="inline-flex items-center gap-1.5 font-display text-xs font-black tracking-widest bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent hover:brightness-110 cursor-pointer transition-all"
            >
              <span>VIEW DETAILS</span>
              <ArrowRight size={12} className="text-purple-400 stroke-[2.5]" />
            </button>

            {/* Icon Action Buttons */}
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              {/* GitHub Button (grows/glows purple on hover) */}
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(168, 85, 247, 0.65)",
                    borderColor: "rgba(168, 85, 247, 0.4)"
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 backdrop-blur-md text-slate-300 hover:text-white transition-all shadow-inner"
                  title="Explore Code on GitHub"
                >
                  <Github size={15} />
                </motion.a>
              )}

              {/* Live Link Button (scales slightly on hover) */}
              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ 
                    scale: 1.1 
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 backdrop-blur-md text-slate-300 hover:text-white transition-all shadow-inner"
                  title="View Live Web Demo"
                >
                  <ExternalLink size={15} />
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Project Detail Dialog */}
      <AnimatePresence>
        {isOverlayOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs no-print">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-6 md:p-8 shadow-2xl dark:bg-[#111111] border border-slate-300 dark:border-white/20 text-slate-950 dark:text-[#FFFFFF]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button Pin */}
              <button
                onClick={() => setIsOverlayOpen(false)}
                className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-[#1c1c1c] dark:hover:text-slate-250"
                id={`btn-close-project-${project.id}`}
              >
                <X size={20} />
              </button>

              {/* Title Section */}
              <div className="flex items-start gap-3.5 pr-8 mb-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-605 dark:bg-blue-950/40 dark:text-[#60A5FA] font-bold border border-blue-200 dark:border-blue-500/20">
                  <Cpu size={20} />
                </span>
                <div>
                  <h3 className="font-display text-2xl font-extrabold text-slate-950 dark:text-[#FFFFFF]">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono font-bold text-slate-500 dark:text-[#CBD5E1] mt-1">
                    Project Showcase Details
                  </p>
                </div>
              </div>

              {/* Showcase Photo */}
              <div className="aspect-video w-full overflow-hidden rounded-xl bg-slate-150 mb-5 border border-slate-200 dark:border-white/10">
                <img
                   src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Technology Tokens */}
              <div className="mb-5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-705 dark:text-[#CBD5E1] font-extrabold uppercase tracking-widest">
                  <Code2 size={13} className="text-blue-500" />
                  <span>Technologies Employed</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg bg-blue-50 px-3.5 py-1.5 font-mono text-xs font-extrabold text-blue-900 dark:bg-blue-950/50 dark:text-[#F1F5F9] dark:border dark:border-blue-500/30 border border-blue-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description Body */}
              <div className="mb-6 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-705 dark:text-[#CBD5E1] font-extrabold uppercase tracking-widest">
                  <Layers size={13} className="text-blue-500" />
                  <span>Project Deep-Dive</span>
                </div>
                <p className="text-base leading-relaxed text-slate-850 dark:text-[#F1F5F9] font-sans font-semibold">
                  {project.description}
                </p>
              </div>

              {/* Prompt/Credits for Civitas AI explicitly mentioned */}
              {project.id === "civitas-ai" && (
                <div className="rounded-xl bg-blue-50/70 border border-blue-200 p-4 dark:bg-blue-950/30 dark:border-blue-800/40 font-display mb-6">
                  <h4 className="font-display text-sm font-extrabold text-blue-900 dark:text-[#60A5FA] mb-1">
                    Vision Alignment
                  </h4>
                  <p className="text-xs leading-relaxed text-blue-950/90 dark:text-[#CBD5E1] font-mono font-bold">
                    Created to bridge AI document summaries directly with legal workflows, facilitating transparent public insights.
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="mt-6 flex justify-end gap-3 border-t border-slate-150 dark:border-white/10 pt-4">
                <button
                  onClick={() => setIsOverlayOpen(false)}
                  className="rounded-lg px-4.5 py-2.5 font-display text-sm font-bold text-slate-700 hover:bg-slate-100 dark:text-[#CBD5E1] dark:hover:bg-white/10 cursor-pointer transition-colors"
                >
                  Close Details
                </button>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4.5 py-2.5 font-display text-sm font-bold text-white transition-colors hover:bg-blue-500 cursor-pointer shadow-sm animate-none"
                    id={`btn-launch-project-${project.id}`}
                  >
                    <span>Launch Live App</span>
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
