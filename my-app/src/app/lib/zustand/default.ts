import { ResumeProfile,ResumeWorkExperience,ResumeEducation,FeaturedSkill, ResumeProject, ResumeSkills } from "@/app/lib/zustand/types";
export const initialProfile:ResumeProfile = {
  name: "",
  objective: "",
  email: "",
  phone: "",
  location: "",
  url: "",
};

  export const work:ResumeWorkExperience=
    {
      company: "",
      jobTitle: "",
      date: "",
      description: [],
    };

   export const education: ResumeEducation=
    {
       college: "",
      degree: "",
      gpa:"",
      date:"",
      description: [],
    };
  
  export const projects:ResumeProject=
    {
      project: "",
      description: [],
      date: "",
    };
  export const skills:ResumeSkills=
  {
    featuredSkills:[],
    descriptions:[],
  };
  export const featuredSkills:FeaturedSkill=
  {
    skill:"",
   rating:0,
  };
