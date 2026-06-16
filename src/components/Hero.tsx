import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, Linkedin, Mail, FileText, ArrowRight, Sparkles, Cpu, Award, Navigation, Camera, Upload, Link, RotateCcw, X, AlertCircle, Trash2, ZoomIn, Check, Move } from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";

interface HeroProps {
  onOpenResume: () => void;
  onScrollToProjects: () => void;
  onScrollToContact: () => void;
}

export default function Hero({ onOpenResume, onScrollToProjects, onScrollToContact }: HeroProps) {
  const [typedText, setTypedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    "Computer Science Engineering Student",
    "Artificial Intelligence Enthusiast",
    "Machine Learning Developer",
    "NLP Solutions Explorer",
    "Aspiring Software Engineer"
  ];

  const [profileImage, setProfileImage] = useState<string>(() => {
    return localStorage.getItem("portfolio_profile_image") || PERSONAL_INFO.profileImage;
  });
  const [imgError, setImgError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Crop Interactive State
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Reset imgError if profileImage changes
    setImgError(false);
  }, [profileImage]);

  const resetCropState = () => {
    setTempImageSrc(null);
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
    setErrorMsg("");
  };

  const handleFile = (file: File) => {
    if (!file.type.match("image.*")) {
      setErrorMsg("Please select an image file (PNG, JPG, WEBP).");
      return;
    }
    
    // Check file size (limit to 10MB since crop will compress output to ~35KB)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("File size must be under 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setTempImageSrc(result);
        setScale(1);
        setRotation(0);
        setPosition({ x: 0, y: 0 });
        setErrorMsg("");
      }
    };
    reader.onerror = () => {
      setErrorMsg("Error reading file.");
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;
    
    if (!imageUrl.startsWith("http://") && !imageUrl.startsWith("https://") && !imageUrl.startsWith("data:image/")) {
      setErrorMsg("Please enter a valid absolute image URL (starting with http/https).");
      return;
    }
    
    setTempImageSrc(imageUrl.trim());
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
    setErrorMsg("");
    setImageUrl("");
  };

  const handleReset = () => {
    localStorage.removeItem("portfolio_profile_image");
    setProfileImage(PERSONAL_INFO.profileImage);
    setIsModalOpen(false);
    resetCropState();
  };

  // Drag-and-pan handler logic
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches && e.touches[0]) {
      setIsDragging(true);
      setDragStart({ 
        x: e.touches[0].clientX - position.x, 
        y: e.touches[0].clientY - position.y 
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    if (e.touches && e.touches[0]) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    }
  };

  const handleSaveCrop = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx || !tempImageSrc) return;

    const canvasSize = 400;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ctx.clearRect(0, 0, canvasSize, canvasSize);
      ctx.save();

      // Anchor to center for Zoom, Translation and Rotation
      ctx.translate(canvasSize / 2, canvasSize / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(scale, scale);

      const containerSize = 240;
      const ratio = canvasSize / containerSize;
      ctx.translate((position.x * ratio) / scale, (position.y * ratio) / scale);

      // Emulate object-cover fit centered at origin
      const imgRatio = img.width / img.height;
      let drawWidth = canvasSize;
      let drawHeight = canvasSize;

      if (imgRatio > 1) {
        drawWidth = canvasSize * imgRatio;
      } else {
        drawHeight = canvasSize / imgRatio;
      }

      ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
      ctx.restore();

      try {
        const croppedBase64 = canvas.toDataURL("image/jpeg", 0.85);
        localStorage.setItem("portfolio_profile_image", croppedBase64);
        setProfileImage(croppedBase64);
        setIsModalOpen(false);
        resetCropState();
      } catch (e) {
        console.error("Canvas export blocked by cross-origin locks. Fallback saving original source key.", e);
        if (tempImageSrc.startsWith("http")) {
          localStorage.setItem("portfolio_profile_image", tempImageSrc);
          setProfileImage(tempImageSrc);
          setIsModalOpen(false);
          resetCropState();
        } else {
          setErrorMsg("Failed to process cropped file. Please try another picture.");
        }
      }
    };
    img.onerror = () => {
      setErrorMsg("Could not load image reference for cropping. Ensure correct link or file.");
    };
    img.src = tempImageSrc;
  };

  useEffect(() => {
    const activeRole = roles[roleIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(activeRole.substring(0, typedText.length - 1));
      }, 35);
    } else {
      timer = setTimeout(() => {
        setTypedText(activeRole.substring(0, typedText.length + 1));
      }, 70);
    }

    if (!isDeleting && typedText === activeRole) {
      timer = setTimeout(() => setIsDeleting(true), 1500); // Wait before starting to delete
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex]);

  const DefaultAvatar = () => (
    <svg className="h-full w-full bg-linear-to-br from-blue-600 via-indigo-700 to-slate-900 border-none rounded-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Circuit lines for AI context */}
      <path d="M40 70 L60 70 L70 85 M160 70 L140 70 L130 85" stroke="white" strokeWidth="1.5" strokeOpacity="0.25" strokeLinecap="round" />
      <path d="M100 35 L100 50 M100 135 L100 150" stroke="white" strokeWidth="1.5" strokeOpacity="0.25" strokeLinecap="round" />
      <circle cx="70" cy="85" r="3" fill="#60a5fa" />
      <circle cx="130" cy="85" r="3" fill="#60a5fa" />
      <circle cx="100" cy="42" r="3" fill="#3b82f6" />
      
      {/* Soft circular ambient highlights */}
      <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
      
      {/* Premium developer silhouette shape */}
      {/* Head */}
      <circle cx="100" cy="74" r="30" fill="white" fillOpacity="0.95" />
      {/* Glasses */}
      <rect x="78" y="66" width="18" height="12" rx="4" stroke="#2563eb" strokeWidth="3" fill="none" />
      <rect x="104" y="66" width="18" height="12" rx="4" stroke="#2563eb" strokeWidth="3" fill="none" />
      <path d="M96 72 H104" stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M72 70 Q76 68 80 70" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M128 70 Q124 68 120 70" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Body/Shoulders */}
      <path d="M50 148C50 124.8 68.8 106 92 106H108C131.2 106 150 124.8 150 148V165H50V148Z" fill="white" />
      
      {/* Laptop / keyboard light indicator */}
      <path d="M75 142 L125 142" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
      
      {/* Floating text elements for web elements */}
      <text x="32" y="115" fill="white" fillOpacity="0.3" fontFamily="monospace" fontSize="22" fontWeight="bold">&lt;/&gt;</text>
      <text x="140" y="115" fill="white" fillOpacity="0.3" fontFamily="monospace" fontSize="22" fontWeight="bold">{`{}`}</text>
    </svg>
  );

  return (
    <section className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden py-16 lg:py-24" id="home">
      {/* Decorative Blur Spheres (Soft Dark/Light Ambient Glow) */}
      <div className="absolute top-1/4 -left-12 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-600/10"></div>
      <div className="absolute bottom-1/4 -right-12 -z-10 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-950/15"></div>

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          
          {/* Hero Bio Column - Styled with order-2 on mobile and order-1 on desktop */}
          <div className="space-y-8 lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 font-display text-xs sm:text-sm font-semibold text-blue-800 dark:bg-blue-950/40 dark:text-blue-200 self-start border border-blue-100 dark:border-blue-500/20 shadow-xs shadow-blue-500/5"
            >
              <Cpu size={15} className="animate-spin-slow text-blue-500" />
              <span>Specializing in Artificial Intelligence</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h2 className="font-display text-sm sm:text-base font-bold uppercase tracking-wider text-slate-700 dark:text-[#CBD5E1]">
                Hello, I am
              </h2>
              <h1 className="font-display text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl md:text-7xl dark:text-[#FFFFFF] leading-tight">
                {PERSONAL_INFO.name}
              </h1>
              
              {/* Dynamic Animated Subtitle */}
              <div className="h-8 md:h-10">
                <p className="font-display text-xl font-bold text-blue-605 dark:text-[#60A5FA] md:text-2xl flex items-center">
                  <span>{typedText}</span>
                  <span className="ml-1.5 inline-block h-6 w-0.5 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse"></span>
                </p>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg leading-relaxed text-slate-800 dark:text-[#F1F5F9] max-w-xl font-sans font-medium"
            >
              A passionate engineer-in-training at <span className="font-extrabold text-slate-950 dark:text-[#FFFFFF]">{PERSONAL_INFO.institution}</span>. 
              I design neural workflows, NLP evaluators, and smart crop advisors, coupling high-precision algorithms with aesthetic human interfaces.
            </motion.p>

            {/* Actions Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <button
                onClick={onScrollToProjects}
                className="group flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-display text-base font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-blue-600/35 dark:bg-blue-600 dark:hover:bg-blue-500 cursor-pointer"
                id="hero-view-projects"
              >
                <span>View Projects</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenResume}
                className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-4 font-display text-base font-bold text-slate-800 shadow-sm transition-all hover:bg-slate-50 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-100 dark:hover:bg-[#111111] dark:hover:text-blue-400 cursor-pointer"
                id="hero-view-resume-sheet"
              >
                <FileText size={18} className="text-blue-500" />
                <span>Interactive Resume</span>
              </button>

              <button
                onClick={onScrollToContact}
                className="flex items-center gap-2 rounded-xl border border-dashed border-slate-350 px-6 py-4 font-display text-base font-bold text-slate-700 transition-all hover:border-slate-500 hover:text-slate-900 dark:border-white/15 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                id="hero-contact-trigger"
              >
                <span>Get In Touch</span>
              </button>
            </motion.div>

            {/* Social Links Bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-5 pt-4 text-slate-800 dark:text-[#CBD5E1]"
            >
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-blue-600 dark:hover:text-[#60A5FA]"
                aria-label="GitHub Profile"
              >
                <Github size={22} />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-blue-600 dark:hover:text-[#60A5FA]"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={22} />
              </a>
              <div className="h-4 w-px bg-slate-300 dark:bg-white/20"></div>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-1.5 font-mono text-xs sm:text-sm font-extrabold transition-colors hover:text-blue-600 dark:hover:text-[#60A5FA] text-slate-900 dark:text-[#F1F5F9]"
              >
                <Mail size={16} className="text-blue-600 dark:text-[#60A5FA]" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
            </motion.div>
          </div>

          {/* Profile Card Layout - Styled with order-1 on mobile and order-2 on desktop */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
              className="relative p-6"
            >
              {/* Outer Decorative Neon Halo */}
              <div className="absolute inset-0 rounded-full bg-linear-to-tr from-blue-600 to-indigo-600 opacity-20 blur-2xl dark:opacity-35"></div>
              
              {/* Dual ring highly rounded border-glow container */}
              <div className="bg-white dark:bg-[#0c0c0c] border border-slate-200/50 dark:border-white/5 relative rounded-3xl p-5 shadow-2xl shadow-blue-500/10 dark:shadow-black/70 flex flex-col items-center">
                
                {/* Circular image framework with relative camera launcher */}
                <div className="relative group/avatar">
                  <div className="h-64 w-64 md:h-72 md:w-72 rounded-full border-4 border-slate-200/80 dark:border-white/10 p-1.5 bg-slate-50 dark:bg-[#111111] shadow-[0_0_20px_rgba(59,130,246,0.15)] dark:shadow-[0_0_35px_rgba(59,130,246,0.25)] flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-102">
                    {!imgError && profileImage ? (
                      <img
                        src={profileImage}
                        alt={PERSONAL_INFO.name}
                        onError={() => setImgError(true)}
                        className="h-full w-full object-cover rounded-full"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <DefaultAvatar />
                    )}
                  </div>
                  {/* Camera action layout button */}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="absolute bottom-2 right-2 flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl transition-transform hover:scale-106 hover:bg-blue-500 active:scale-95 border-2 border-white dark:border-[#0c0c0c] cursor-pointer z-10"
                    title="Change profile picture"
                    id="change-profile-pic-btn"
                  >
                    <Camera size={18} />
                  </button>
                </div>
                
                {/* Stats overlays */}
                <div className="mt-5 w-full flex items-center justify-center font-mono text-xs text-slate-900 dark:text-[#CBD5E1]">
                  <div className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/20 rounded-full font-extrabold text-slate-900 dark:text-[#F1F5F9]">
                    <Sparkles size={12} className="text-yellow-600 dark:text-yellow-400 animate-pulse" />
                    <span>8.20 B.Tech CGPA</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Profile Photo Customization Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Ambient Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsModalOpen(false);
                resetCropState();
              }}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-md cursor-pointer"
            />
            
            {/* Sheet Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-350 bg-white p-6 shadow-2xl dark:border-white/20 dark:bg-[#111111]/95 text-slate-950 dark:text-white z-10"
            >
              {/* Close Button Pin */}
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetCropState();
                }}
                className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-500 hover:bg-slate-200 hover:text-slate-755 dark:hover:bg-white/10 dark:hover:text-[#FFFFFF] cursor-pointer"
                id="btn-close-upload-modal"
              >
                <X size={18} />
              </button>

              {tempImageSrc ? (
                /* VIEW 1: ADVANCED CROPPING WORKBENCH */
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-[#FFFFFF] flex items-center gap-2">
                      <Camera className="text-blue-600 dark:text-[#60A5FA]" size={20} />
                      <span>Crop and Position Photo</span>
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-[#CBD5E1] mt-1 font-semibold">
                      Drag the image inside the circular viewport to pan, use sliders to zoom and rotate.
                    </p>
                  </div>

                  {/* Circular Interactive Panning Mask Card */}
                  <div className="relative flex justify-center py-4 bg-slate-50/40 dark:bg-[#161616]/40 rounded-xl border border-slate-200 dark:border-white/5">
                    {/* Chessboard Transparency Grid background style */}
                    <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,#ccc_25%,transparent_25%),linear-gradient(-45deg,#ccc_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#ccc_75%),linear-gradient(-45deg,transparent_75%,#ccc_75%)] bg-[size:10px_10px] bg-[position:0_0,0_5px,5px_-5px,-5px_0] pointer-events-none rounded-xl dark:bg-[linear-gradient(45deg,#444_25%,transparent_25%)]" />
                    
                    <div 
                      className="relative w-64 h-64 rounded-full overflow-hidden border-2 border-dashed border-blue-500 dark:border-blue-500/70 shadow-2xl flex items-center justify-center select-none cursor-move active:cursor-grabbing"
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUpOrLeave}
                      onMouseLeave={handleMouseUpOrLeave}
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleMouseUpOrLeave}
                    >
                      <img
                        src={tempImageSrc}
                        style={{
                          transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
                          transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                        }}
                        className="max-w-none w-64 h-64 object-cover pointer-events-none rounded-full"
                        alt="Crop target avatar"
                        crossOrigin="anonymous"
                      />
                      
                      {/* CSS absolute spotlight shadow filter overlay to outline what will be saved */}
                      <div className="absolute inset-0 rounded-full border-2 border-white pointer-events-none shadow-[0_0_0_9999px_rgba(15,23,42,0.7)]"></div>
                      
                      {/* Visual pointer HUD tip inside */}
                      <div className="absolute inset-x-0 bottom-6 flex justify-center pointer-events-none">
                        <span className="bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-white/90 flex items-center gap-1">
                          <Move size={10} className="animate-pulse" />
                          <span>DRAG TO PAN</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tuning Slider Dashboard */}
                  <div className="space-y-4">
                    {/* Zoom slider row */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-mono font-extrabold text-slate-755 dark:text-[#CBD5E1]">
                        <span className="flex items-center gap-1">
                          <ZoomIn size={12} className="text-blue-500" />
                          <span>ZOOM SCALE</span>
                        </span>
                        <span>{scale.toFixed(2)}x</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-slate-400 font-mono">1.0x</span>
                        <input
                          type="range"
                          min="1"
                          max="3"
                          step="0.05"
                          value={scale}
                          onChange={(e) => setScale(parseFloat(e.target.value))}
                          className="w-full h-1.5 bg-slate-350 dark:bg-white/15 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-hidden"
                        />
                        <span className="text-[10px] text-slate-400 font-mono">3.0x</span>
                      </div>
                    </div>

                    {/* Rotation controls row */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between items-center text-xs font-mono font-extrabold text-slate-755 dark:text-[#CBD5E1]">
                        <span className="flex items-center gap-1">
                          <RotateCcw size={12} className="text-blue-500" />
                          <span>ROTATION DEGREE</span>
                        </span>
                        <span>{rotation}°</span>
                      </div>
                      <div className="flex gap-3 items-center">
                        <input
                          type="range"
                          min="0"
                          max="360"
                          step="1"
                          value={rotation}
                          onChange={(e) => setRotation(parseInt(e.target.value))}
                          className="w-full h-1.5 bg-slate-350 dark:bg-white/15 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-hidden"
                        />
                        
                        <button
                          type="button"
                          onClick={() => setRotation((prev) => (prev + 90) % 360)}
                          className="shrink-0 px-2.5 py-1 text-[10px] font-mono font-bold bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 border border-slate-300 dark:border-white/10 rounded-md cursor-pointer text-slate-900 dark:text-white"
                          title="Rotate 90 degrees right"
                        >
                          +90°
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Feedback Error Container */}
                  {errorMsg && (
                    <div className="flex items-start gap-1.5 rounded-lg bg-orange-50 px-3 py-2.5 text-xs text-orange-950 border border-orange-200 font-bold dark:bg-orange-950/20 dark:text-orange-300 dark:border-orange-500/10">
                      <AlertCircle size={14} className="text-orange-600 shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Modal Footer Controls */}
                  <div className="flex items-center justify-between border-t border-slate-200/60 dark:border-white/10 pt-4 gap-3">
                    <button
                      type="button"
                      onClick={resetCropState}
                      className="rounded-xl px-4 py-3 font-display text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 dark:text-[#CBD5E1] dark:bg-[#161616] dark:border-white/10 dark:hover:bg-[#202020] cursor-pointer transition-colors"
                    >
                      Cancel / Back
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveCrop}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-3 font-display text-xs font-bold text-white hover:bg-blue-500 hover:scale-101 border-none shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 cursor-pointer transition-all shrink-0"
                    >
                      <Check size={14} />
                      <span>Save Photo</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* VIEW 2: PROFILE PICTURE OPTIONS & CURRENT STATUS */
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-[#FFFFFF] flex items-center gap-2">
                      <Camera className="text-blue-600 dark:text-[#60A5FA]" size={20} />
                      <span>Profile Photo Workspace</span>
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-[#CBD5E1] mt-1 font-semibold">
                      Upload a computer photo file, drag layout, or supply web URL link to crop.
                    </p>
                  </div>

                  {/* Large Layout Preview Panel of Current Image */}
                  <div className="flex flex-col items-center justify-center py-5 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5 space-y-3">
                    <div className="h-28 w-28 rounded-full border-4 border-slate-300/60 dark:border-white/10 p-1 bg-white dark:bg-[#161616] flex items-center justify-center overflow-hidden">
                      {localStorage.getItem("portfolio_profile_image") ? (
                        <img
                          src={profileImage}
                          alt="Current avatar preview"
                          className="h-full w-full object-cover rounded-full"
                          onError={() => setImgError(true)}
                        />
                      ) : (
                        <DefaultAvatar />
                      )}
                    </div>
                    <div className="text-center">
                      <span className="text-[10px] font-mono tracking-wider font-extrabold text-slate-500 dark:text-[#CBD5E1]">
                        {localStorage.getItem("portfolio_profile_image") ? "CUSTOM PHOTO ACTIVE" : "DEFAULT AI VISUAL AVATAR"}
                      </span>
                    </div>
                  </div>

                  {/* Drag n Drop Upload Box */}
                  <div 
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                      dragActive 
                        ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/20" 
                        : "border-slate-300 hover:border-blue-400 dark:border-white/20 dark:hover:border-blue-500/50"
                    }`}
                  >
                    <input 
                      type="file" 
                      id="profile-file-input" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleFileInputChange} 
                    />
                    
                    <div className="flex flex-col items-center justify-center space-y-2.5">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-[#60A5FA]">
                        <Upload size={18} />
                      </span>
                      <div>
                        <label 
                          htmlFor="profile-file-input" 
                          className="cursor-pointer text-sm font-extrabold text-blue-600 hover:text-blue-500 dark:text-[#60A5FA] underline"
                        >
                          Upload New Photo
                        </label>
                        <p className="text-xs text-slate-750 dark:text-[#CBD5E1] mt-1 font-semibold">
                          or drag and drop your image file here
                        </p>
                      </div>
                      <p className="text-[10px] text-slate-550 dark:text-gray-400 font-mono">
                        PNG, JPG, WEBP (Max 10MB)
                      </p>
                    </div>
                  </div>

                  {/* Alternative Image URL Input */}
                  <form onSubmit={handleUrlSubmit} className="space-y-3 border-t border-slate-200/60 dark:border-white/10 pt-4">
                    <div className="space-y-1.5">
                      <label htmlFor="image-url-input" className="text-xs font-mono font-extrabold text-slate-755 dark:text-[#CBD5E1] uppercase tracking-widest flex items-center gap-1">
                        <Link size={12} className="text-blue-500" />
                        <span>Or use an image URL</span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          id="image-url-input"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          placeholder="https://example.com/photo.jpg"
                          className="w-full rounded-xl border border-slate-300 bg-white/70 px-3 py-2 font-sans text-xs font-semibold text-slate-950 focus:border-blue-500 focus:bg-white focus:outline-hidden dark:border-white/20 dark:bg-[#1c1c1c] dark:text-white focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                          type="submit"
                          disabled={!imageUrl.trim()}
                          className="rounded-xl bg-blue-600 px-4 py-2 font-display text-xs font-bold text-white hover:bg-blue-500 hover:scale-101 border-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer transition-all shrink-0"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* Error Warning */}
                  {errorMsg && (
                    <div className="mt-3 flex items-start gap-1.5 rounded-lg bg-orange-50 px-3 py-2.5 text-xs text-orange-950 border border-orange-200 font-bold dark:bg-orange-950/20 dark:text-orange-300 dark:border-orange-500/10">
                      <AlertCircle size={14} className="text-orange-600 shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Action Buttons Panel */}
                  <div className="mt-5 flex items-center justify-between border-t border-slate-200/60 dark:border-white/10 pt-4 gap-2">
                    <button
                      type="button"
                      disabled={!localStorage.getItem("portfolio_profile_image")}
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-950/10 text-red-600 hover:bg-red-100 hover:text-red-750 px-3.5 py-2.5 font-display text-xs font-extrabold cursor-pointer transition-colors disabled:opacity-40 disabled:pointer-events-none"
                    >
                      <Trash2 size={12} />
                      <span>Remove Photo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        resetCropState();
                      }}
                      className="rounded-lg px-3.5 py-2.5 font-display text-xs font-extrabold text-slate-740 hover:bg-slate-100 dark:text-[#CBD5E1] dark:hover:bg-white/10 cursor-pointer transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
