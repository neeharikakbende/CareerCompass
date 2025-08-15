export interface Contact {
  name: string;
  objective: string;
  email: string;
  phone: string;
  website: string;
  location: string;
}

export interface WorkExperience {
  company: string;
  jobTitle: string;
  date: string; 
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  name: string;
  description: string;
  date: string;
}

export interface Skill {
  name: string;
  level: string;
}
export interface FeaturedSkill {
  name: string;
  proficiency: number; 
}
export interface Resume {
  contact: Contact[];
  work: WorkExperience[];
  education: Education[];
  projects: Project[];
  skills: Skill[];
  featuredSkills?: FeaturedSkill[];
}