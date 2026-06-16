export interface Project {
  id: string;
  title: string;
  technologies: string[];
  description: string;
  image: string;
  link?: string;
  github?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  score: string;
  icon: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  badge?: string;
  highlight?: boolean;
}

export interface Internship {
  role: string;
  company: string;
  location: string;
  duration?: string;
  responsibilities: string[];
}


