import { Contact, Education, FeaturedSkill, Project, Skill, WorkExperience } from "../types/resume";

export const initialProfile:Contact = {
  name: "",
  objective: "",
  email: "",
  phone: "",
  location: "",
  url: "",
};

  export const work:WorkExperience=
    {
      company: "",
      jobTitle: "",
      date: "",
      description: "",
    };

   export const education: Education=
    {
       college: "",
      degree: "",
      fieldOfStudy:"",
      startDate: "",
      endDate: "",
      description: "",
    };
  
  export const projects:Project=
    {
      name: "",
      description: "",
      date: "",
    };
  export const  skills:Skill=
  {
    name:"",
    level:"",
  };
  export const featuredSkills:FeaturedSkill=
  {
    name:"",
   proficiency:0,
  };
