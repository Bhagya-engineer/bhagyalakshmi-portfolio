import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, X, ArrowUp, Cpu, Sparkles, BookOpen, 
  Briefcase, Award, Mail, Github, Linkedin, MessageSquareCode,
  User, CheckSquare
} from "lucide-react";

// Portfolio Modular Components
import Hero from "./components/Hero";
import SkillsSection from "./components/SkillsSection";
import EducationTimeline from "./components/EducationTimeline";
import InternshipSection from "./components/InternshipSection";
import CertificationsSection from "./components/CertificationsSection";
import ProjectCard from "./components/ProjectCard";
import ContactForm from "./components/ContactForm";
import ResumeModal from "./components/ResumeModal";

// Portfolio Data
import { PERSONAL_INFO, PROJECTS } from "./data/portfolioData";

export default function App() {
  const darkMode = true;
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Initialize and force dark mode classes on html element
  useEffect(() => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("portfolio-theme", "dark");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    setActiveSection(id);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const menuItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Education", id: "education" },
    { label: "Certifications", id: "certifications" },
    { label: "Contact", id: "contact" }
  ];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      darkMode ? "bg-[#0a0a0a] text-slate-100" : "bg-slate-50 text-slate-800"
    }`}>
      
      {/* Background decoration elements */}
      <div className="absolute top-0 right-0 -z-20 h-screen w-full overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[120px] dark:bg-blue-600/10"></div>
        <div className="absolute bottom-[10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px] dark:bg-indigo-900/10"></div>
      </div>

      {/* Global Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/40 bg-white/75 backdrop-blur-md dark:border-white/10 dark:bg-[#0a0a0a]/75 no-print">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          
          {/* Portfolio Brand Logo */}
          <div 
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-2 cursor-pointer font-display text-base font-bold tracking-tight text-slate-900 dark:text-white"
          >
            <Cpu className="text-blue-550 animate-spin-slow text-blue-500" size={20} />
            <span className="bg-linear-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
              {PERSONAL_INFO.name.split(" ")[0]} {PERSONAL_INFO.name.split(" ")[1] || ""}
            </span>
            <span className="hidden sm:inline font-mono text-[10px] bg-slate-100 dark:bg-white/5 dark:border dark:border-white/10 px-2 py-0.5 rounded-sm font-normal text-slate-400">
              AI CSE
            </span>
          </div>

          {/* Desktop Navigation Links with Highlights */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-3">
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative font-display text-xs lg:text-[13px] font-bold transition-all px-3 py-2 rounded-lg ${
                    isActive
                      ? "text-blue-500 dark:text-[#60A5FA]"
                      : "text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-white"
                  }`}
                  id={`nav-link-${item.id}`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-indicator"
                      className="absolute bottom-0 left-2 right-2 h-[2.5px] rounded-full bg-blue-500 dark:bg-[#60A5FA] shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Configuration utility buttons (Resume Trigger, Mobile menu Toggle) */}
          <div className="flex items-center gap-3">
            {/* Quick Resume view link */}
            <button
              onClick={() => setIsResumeOpen(true)}
              className="hidden lg:flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 font-display text-xs font-bold text-white shadow-xs transition-transform hover:scale-102 hover:bg-blue-500"
              id="nav-resume-btn"
            >
              <CheckSquare size={13} />
              <span>Resume Sheet</span>
            </button>

            {/* Mobile Nav Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden dark:text-slate-400 dark:hover:bg-slate-800"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Dropdown Nav Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-slate-200 bg-white dark:border-white/10 dark:bg-[#0a0a0a] md:hidden no-print"
          >
            <div className="flex flex-col gap-1 p-4">
              {menuItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`rounded-lg px-4 py-2.5 text-left font-display text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-blue-50/70 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
                        : "text-slate-650 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-[#111111]"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <hr className="my-2 border-slate-200 dark:border-white/5" />
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsResumeOpen(true);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-center font-display text-sm font-bold text-white"
              >
                <span>Interactive Resume Sheet</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container Viewport */}
      <main className="mx-auto max-w-6xl px-6 min-h-[calc(100vh-12rem)] flex flex-col justify-start relative py-12 md:py-16">
        <AnimatePresence mode="wait">
          {activeSection === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <Hero
                onOpenResume={() => setIsResumeOpen(true)}
                onScrollToProjects={() => handleNavClick("projects")}
                onScrollToContact={() => handleNavClick("contact")}
              />
            </motion.div>
          )}

          {activeSection === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* ABOUT ME SECTION */}
              <section className="py-8 font-sans" id="about">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
                  
                  {/* Visual Icon card */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="glass rounded-2xl p-8 max-w-sm text-center relative shadow-sm border border-slate-300 dark:border-white/10 w-full">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-[#60A5FA] mb-6 font-bold">
                        <User size={24} />
                      </div>
                      
                      <h3 className="font-display text-xl font-extrabold text-slate-950 dark:text-[#FFFFFF] mb-2">
                        Talada Bhagya Lakshmi
                      </h3>
                      <p className="font-display text-xs text-slate-800 dark:text-[#CBD5E1] mb-4 uppercase tracking-widest font-extrabold">
                        AI & ML Engineering Scholar
                      </p>
                      
                      <p className="text-sm text-slate-800 dark:text-[#F1F5F9] leading-relaxed font-sans font-semibold">
                        Engineering professional pathways matching automated text evaluation, crop advisors, and smart legal documentation.
                      </p>
                    </div>
                  </div>

                  {/* Paragraph Column */}
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 dark:text-[#FFFFFF] md:text-5xl">
                        About Me
                      </h2>
                      <div className="mt-3.5 h-1.5 w-16 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                    </div>

                    <div className="space-y-5 text-[15px] text-slate-700 dark:text-slate-200 leading-[1.7] font-sans font-medium">
                      {PERSONAL_INFO.about.split("\n\n").map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}
                    </div>

                    {/* Badges overview */}
                    <div className="flex flex-wrap gap-4 pt-2">
                      <div className="flex items-center gap-2 font-mono text-xs font-extrabold text-slate-900 dark:text-[#F1F5F9] bg-slate-100 border border-slate-300 dark:bg-white/10 dark:border-white/20 p-2.5 rounded-xl">
                        <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-[#60A5FA]"></span>
                        <span>AI Modeling</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-xs font-extrabold text-slate-900 dark:text-[#F1F5F9] bg-slate-100 border border-slate-300 dark:bg-white/10 dark:border-white/20 p-2.5 rounded-xl">
                        <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-[#60A5FA]"></span>
                        <span>NLP Systems</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-xs font-extrabold text-slate-900 dark:text-[#F1F5F9] bg-slate-100 border border-slate-300 dark:bg-white/10 dark:border-white/20 p-2.5 rounded-xl">
                        <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-[#60A5FA]"></span>
                        <span>Full Stack Dev</span>
                      </div>
                    </div>
                  </div>

                </div>
              </section>
            </motion.div>
          )}

          {activeSection === "experience" && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <InternshipSection />
            </motion.div>
          )}

          {activeSection === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* PROJECTS SECTION */}
              <section className="py-8" id="projects">
                
                {/* Section Heading */}
                <div className="mb-14 text-center">
                  <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 dark:text-[#FFFFFF] md:text-5xl">
                    Featured Case Projects
                  </h2>
                  <div className="mx-auto mt-3.5 h-1.5 w-16 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                  <p className="mt-5 text-base font-semibold text-slate-800 dark:text-[#F1F5F9] max-w-lg mx-auto font-sans">
                    Showcase of software engineering web tools, machine learning pipelines, and advanced NLP implementations.
                  </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {PROJECTS.map((proj) => (
                    <ProjectCard key={proj.id} project={proj} />
                  ))}
                </div>

              </section>
            </motion.div>
          )}

          {activeSection === "skills" && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <SkillsSection />
            </motion.div>
          )}

          {activeSection === "education" && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <EducationTimeline />
            </motion.div>
          )}

          {activeSection === "certifications" && (
            <motion.div
              key="certifications"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <CertificationsSection />
            </motion.div>
          )}

          {activeSection === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <ContactForm />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 dark:border-white/10 dark:bg-[#0a0a0a] no-print">
        <div className="mx-auto max-w-6xl px-6 text-center md:flex md:items-center md:justify-between">
          
          {/* Copyright description */}
          <p className="font-sans text-xs font-bold text-slate-700 dark:text-[#CBD5E1]">
            &copy; {new Date().getFullYear()} TALADA BHAGYA LAKSHMI. All rights reserved. Built with React & Tailwind.
          </p>

          {/* Social Links Row */}
          <div className="mt-4 flex justify-center gap-6 md:mt-0 font-mono text-xs font-extrabold text-slate-800 dark:text-[#F1F5F9]">
            <a 
              href={PERSONAL_INFO.linkedin} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-[#60A5FA] transition-colors"
            >
              <Linkedin size={14} className="text-blue-600 dark:text-[#60A5FA]" />
              <span>LinkedIn</span>
            </a>
            
            <a 
              href={PERSONAL_INFO.github} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-[#60A5FA] transition-colors"
            >
              <Github size={14} className="text-blue-600 dark:text-[#60A5FA]" />
              <span>GitHub</span>
            </a>
            
            <a 
              href={`mailto:${PERSONAL_INFO.email}`} 
              className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-[#60A5FA] transition-colors"
            >
              <Mail size={14} className="text-blue-600 dark:text-[#60A5FA]" />
              <span>Email</span>
            </a>
          </div>

        </div>
      </footer>

      {/* Resume Modal Sheets Overlay */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Back to top toggle */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform hover:scale-105 hover:bg-blue-500 no-print"
            aria-label="Back to top"
            id="back-to-top-btn"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
