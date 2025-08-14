export interface Profile {
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
  description: string[];
}
export interface Education {
  school: string;
  degree: string;
  date: string;
  Additionalinformation: string[];
}
export interface Project {
  title: string;
  date: string;
  description: string[];
}
export interface Resume {
  contact: Profile;
  workExperience: WorkExperience[];
  education: Education[];
  projects: Project[];
  skills: string[];
}
