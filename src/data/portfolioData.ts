import { Project, SkillCategory, Education, Certification, Internship } from "../types";
import profileImg from "../assets/images/profile_avatar_1781536462326.jpg";
import chocoRocksImg from "../assets/images/choco_rocks_1781591174033.jpg";

export const PERSONAL_INFO = {
  name: "TALADA BHAGYA LAKSHMI",
  title: "Computer Science Engineering student specializing in Artificial Intelligence",
  designation: "Computer Science Engineering (AI) Student",
  institution: "Vignan's Institute of Engineering for Women",
  location: "Visakhapatnam, Andhra Pradesh, India",
  email: "bhagyalakshmi2584@gmail.com",
  phone: "+91 94943 45678", // Clean fallback and professional placeholder
  github: "https://github.com/Bhagya-engineer",
  linkedin: "https://linkedin.com/in/bhagya-lakshmi-3520352b8",
  profileImage: profileImg,
  about: "Computer Science Engineering student specializing in Artificial Intelligence at Vignan's Institute of Engineering for Women. Passionate about building AI-powered applications, NLP solutions, and modern web systems that solve real-world challenges.\n\nExperienced in AI Modeling, NLP Systems, and Full-Stack Development, with a strong focus on creating impactful, user-centric technologies."
};

export const PROJECTS: Project[] = [
  {
    id: "civitas-ai",
    title: "CIVITAS AI – Legal Document Simplification Platform",
    technologies: ["Artificial Intelligence", "NLP", "Translation Systems", "Web Technologies"],
    description: "Developed an AI platform that simplifies complex state documents and legal jargon into clear, plain language. Features side-by-side comparative views and multilingual NLP translations to prevent compliance errors and support user accessibility.",
    image: "https://files.catbox.moe/aebq2r.jpeg",
    link: "https://lovable.dev/projects/acac20c4-9ec2-4ed0-98e0-04f2019d0e9c",
    github: "https://github.com/Bhagya-engineer/civitas-ai"
  },
  {
    id: "exam-paper-evaluator",
    title: "AI-Based Exam Paper Evaluator",
    technologies: ["Python", "NLP", "TF-IDF", "BERT", "Streamlit"],
    description: "Engineered an automated subjective answer grading system utilizing TF-IDF, Cosine Similarity, and BERT embeddings for semantic evaluation. Built a Streamlit interface featuring secure, role-based dashboards for administrators, teachers, and students.",
    image: "https://files.catbox.moe/s89pjp.png",
    link: "https://lovable.dev/login?redirect=%2Fprojects%2Fb30730db-5de8-41f2-bcab-273429595f88",
    github: "https://github.com/Bhagya-engineer/ai-exam-paper-evaluator"
  },
  {
    id: "soil-depictor",
    title: "Soil Depictor – Smart Crop Recommendation System",
    technologies: ["HTML", "CSS", "Node.js"],
    description: "Created a multilingual agricultural app in Node.js recommending optimal crops based on localized soil chemistry and features. Supports English, Hindi, and Telugu, offering data-driven suitability analytics to help regional farmers maximize crop yields.",
    image: "https://files.catbox.moe/2oc5yo.png",
    link: "https://lovable.dev/projects/d7339add-d2f8-4319-9874-e854e41e3bdb?invite=true"
  
  },
  {
    id: "trendcart",
    title: "TrendCart",
    technologies: ["HTML", "CSS", "JavaScript"],
    description: "Designed a responsive virtual e-commerce storefront featuring dynamic category browsing, interactive cart management, and seamless checkout simulations. Implemented using clean HTML, Tailwind CSS, and optimized vanilla JavaScript state management.",
    image: "https://files.catbox.moe/bfa56r.png",
    link: "https://trend-cart-three.vercel.app/",
    github: "https://github.com/Bhagya-engineer/TrendCart"
  },
  {
    id: "the-blue-eyes",
    title: "The Blue Eyes",
    technologies: ["HTML", "CSS", "JavaScript"],
    description: "Developed an interactive event planning and venue decoration portal with customized package calculators and user response pathways. Solves operational booking challenges for custom events by digitizing the client inquiry pipeline.",
    image: "https://files.catbox.moe/o0yptc.jpeg",
    link: "https://the-blue-eyes.vercel.app/",
    github: "https://github.com/Bhagya-engineer/the-blue-eyes"
  },
  {
    id: "choco-rocks",
    title: "Choco Rocks",
    technologies: ["HTML", "CSS", "JavaScript"],
    description: "Created an interactive corporate gifting and artisanal chocolate storefront featuring product catalogs and ingredient breakdown tabs. Designed with highly responsive frontend components and custom user feedback capture fields.",
    image: chocoRocksImg,
    link: "https://choco-rocks.vercel.app/",
    github: "https://github.com/Bhagya-engineer/choco-rocks"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Technologies (AI & ML)",
    skills: ["Artificial Intelligence", "Machine Learning", "Natural Language Processing (NLP)", "TF-IDF & BERT", "Streamlit Apps"]
  },
  {
    category: "Programming Languages",
    skills: ["Python", "Java", "C"]
  },
  {
    category: "Database & Core Concepts",
    skills: ["SQL / MySQL", "Data Structures", "Object-Oriented Programming (OOP)"]
  },
  {
    category: "Tools & Productivity",
    skills: ["Visual Studio Code", "Microsoft Word (Document Creation & Formatting)", "Git & GitHub"]
  }
];

export const EDUCATION: Education[] = [
  {
    id: "edu-btech",
    institution: "Vignan's Institute of Engineering for Women",
    degree: "B.Tech – Computer Science Engineering (Artificial Intelligence)",
    duration: "2023 – Present",
    score: "CGPA: 8.20/10",
    icon: "GraduationCap"
  },
  {
    id: "edu-inter",
    institution: "Chaitanya Junior College for Girls",
    degree: "Intermediate Education (MPC)",
    duration: "2021 – 2023",
    score: "Percentage: 89.7%",
    icon: "BookOpen"
  },
  {
    id: "edu-school",
    institution: "Prathibha School",
    degree: "Secondary School Certificate (SSC)",
    duration: "Completed: 2021",
    score: "Percentage: 99.6%",
    icon: "School"
  }
];

export const INTERNSHIP: Internship = {
  role: "Artificial Intelligence & Machine Learning Intern",
  company: "Datavalley India Pvt. Ltd.",
  location: "Vijayawada, India",
  duration: "Summer 2024 (Structured Internship)",
  responsibilities: [
    "Developed and evaluated predictive machine learning models for complex classification tasks.",
    "Applied deep learning neural networks and analyzed production architectures of AI solutions.",
    "Collaborated on practical AI-driven use cases to solve critical agricultural challenges."
  ]
};

export const CERTIFICATIONS: Certification[] = [
  {
    id: "cert-oracle-ai",
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle University",
    badge: "AI & Cloud Foundations",
    highlight: true
  },
  {
    id: "cert-nptel-dbms",
    title: "NPTEL – Database Management Systems",
    issuer: "Ministry of Education, Govt. of India",
    badge: "Core Database",
    highlight: false
  },
  {
    id: "cert-nptel-se",
    title: "NPTEL – Software Engineering",
    issuer: "Ministry of Education, Govt. of India",
    badge: "Core Software",
    highlight: false
  },
  {
    id: "cert-infosys-fs",
    title: "Infosys Springboard – Full Stack Development",
    issuer: "Infosys Ltd.",
    badge: "Full Stack",
    highlight: true
  },
  {
    id: "cert-hackathon",
    title: "24-Hour GEN-AI Hackathon – Participant",
    issuer: "Tech Igniters Community",
    badge: "Hackathon",
    highlight: true
  },
  {
    id: "cert-ideathons",
    title: "AI-Based Ideathons – Participant",
    issuer: "Academic Technical Forums",
    badge: "Innovation",
    highlight: false
  }
];
