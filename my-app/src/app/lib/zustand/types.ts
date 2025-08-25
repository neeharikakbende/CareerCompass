export interface ResumeProfile {
  name: string;
  objective: string;
  email: string;
  phone: string;
  url: string;
  location: string;
}

export interface ResumeWorkExperience {
  company: string;
  jobTitle: string;
  date: string; 
  description: string[];
}

export interface ResumeEducation {
  college: string;
  degree: string;
  gpa: string;
 date:string;
  description: string[];
}

export interface ResumeProject {
  project: string;
  description: string[];
  date: string;
}

export interface FeaturedSkill {
  skill: string;
  rating: number; 
}
export interface ResumeSkills{
  featuredSkills:FeaturedSkill[];
  descriptions:string[];
}
export interface Resume {
  profile: ResumeProfile;
  workExperiences: ResumeWorkExperience[];
  educations: ResumeEducation[];
  projects: ResumeProject[];
  skills: ResumeSkills;
  custom:ResumeCustom;
}

export interface ResumeCustom{
  descriptions:string[]
}
export type ResumeKey = keyof Resume;

export interface Settings {
  themeColor: string;
  fontFamily: string;
  fontSize: string;
  documentSize: string;
  formToShow: {
    workExperiences: boolean;
    educations: boolean;
    projects: boolean;
    skills: boolean;
    custom: boolean;
  };
  formToHeading: {
    workExperiences: string;
    educations: string;
    projects: string;
    skills: string;
    custom: string;
  };
  formsOrder: ShowForm[];
  showBulletPoints: {
    educations: boolean;
    projects: boolean;
    skills: boolean;
    custom: boolean;
  };
}

export type ShowForm = keyof Settings["formToShow"];
export type FormWithBulletPoints = keyof Settings["showBulletPoints"];
export type GeneralSetting = Exclude<
  keyof Settings,
  "formToShow" | "formToHeading" | "formsOrder" | "showBulletPoints"
>;