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
    description: "An AI-powered digital governance platform that simplifies complex government and legal documents. Features smart document simplification, intuitive side-by-side comparison overlays, and multilingual translation systems to break legal jargon into simple, actionable insights. Designed to help citizens avoid common errors, missed deadlines, or penalties and make confident, highly informed decisions.",
    image: "https://files.catbox.moe/aebq2r.jpeg",
    link: "https://lovable.dev/projects/acac20c4-9ec2-4ed0-98e0-04f2019d0e9c",
    github: "https://github.com/Bhagya-engineer/civitas-ai"
  },
  {
    id: "exam-paper-evaluator",
    title: "AI-Based Exam Paper Evaluator",
    technologies: ["Python", "NLP", "TF-IDF", "BERT", "Streamlit"],
    description: "Developed an advanced NLP-powered system that automates the assessment of subjective student answers. Utilizing TF-IDF keyword overlap, Cosine Similarity, and semantic-aware BERT embeddings, the platform evaluates accuracy with high alignment to teacher keys. Powered by a fully interactive Streamlit application featuring role-based secure access for Teachers, Students, and Administrators to review grades and analytical reports. Improves school evaluation speed and decreases human bias.",
    image: "https://files.catbox.moe/s89pjp.png",
    link: "https://lovable.dev/login?redirect=%2Fprojects%2Fb30730db-5de8-41f2-bcab-273429595f88",
    github: "https://github.com/Bhagya-engineer/ai-exam-paper-evaluator"
  },
  {
    id: "soil-depictor",
    title: "Soil Depictor – Smart Crop Recommendation System",
    technologies: ["HTML", "CSS", "Node.js"],
    description: "An interactive, multilingual crop advice application designed for absolute agricultural empowerment. Supports Telugu, Hindi, and English to help diverse demographic farmers easily identify soil-ideal crops based on regional soil chemistry and localized parameters. Includes rich graphic crop suitability analytics, detail sheets, and intuitive agricultural recommendations to maximize seasonal crop yield.",
    image: "https://files.catbox.moe/2oc5yo.png",
    link: "https://github.com/Bhagya-engineer/soil-depictor",
    github: "https://github.com/Bhagya-engineer/soil-depictor"
  },
  {
    id: "trendcart",
    title: "TrendCart",
    technologies: ["HTML", "CSS", "JavaScript"],
    description: "A fast, responsive, and aesthetically pleasing virtual e-commerce storefront with a seamless modern interface. Users can browse highly categorized items, explore specific collections, and complete interactive shopping cart flows. Standard client-side state handling implements quick checkout simulations.",
    image: "https://files.catbox.moe/bfa56r.png",
    link: "https://trend-cart-three.vercel.app/",
    github: "https://github.com/Bhagya-engineer/TrendCart"
  },
  {
    id: "the-blue-eyes",
    title: "The Blue Eyes",
    technologies: ["HTML", "CSS", "JavaScript"],
    description: "A highly stylized, elegant event decoration and comprehensive event management portal. Fully models high-end venue decorations, customized ceremony planning packages, beautiful photography backdrops, floral themes, and direct booking or inquiry triggers to maximize client inquiries and feedback.",
    image: "https://files.catbox.moe/o0yptc.jpeg",
    link: "https://the-blue-eyes.vercel.app/",
    github: "https://github.com/Bhagya-engineer/the-blue-eyes"
  },
  {
    id: "choco-rocks",
    title: "Choco Rocks",
    technologies: ["HTML", "CSS", "JavaScript"],
    description: "An immersive chocolate-themed business storefront offering chocolate showcases, custom corporate gifting baskets, responsive ingredient details, and interactive feedback fields styled with rich warm palettes and responsive hover actions.",
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
    "Learned and put into practice foundational concepts inside Artificial Intelligence, Neural Networks, and Machine Learning algorithms.",
    "Successfully developed and tested machine learning models for predictive statistics and classification datasets.",
    "Analyzed production pipelines and reviewed architectural designs to gain exposure to real-world commercial AI applications.",
    "Collaborated on practical AI-based use cases matching agricultural and education tech industry problems."
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
