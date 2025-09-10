import { create } from "zustand";
import type {
  Resume,
  ResumeProfile,
  ResumeWorkExperience,
  ResumeEducation,
  ResumeProject,
  ResumeSkills,
  ResumeCustom,
  FeaturedSkill,
  Settings,
  ShowForm,
  FormWithBulletPoints,
  GeneralSetting,
} from "./types";
import { createJSONStorage, persist, subscribeWithSelector } from "zustand/middleware";
import { deepMerge } from "../deep-merge";

export const initialProfile: ResumeProfile = {
  name: "",
  objective: "",
  email: "",
  phone: "",
  location: "",
  url: "",
};
export const initialWorkexperience: ResumeWorkExperience = {
  company: "",
  jobTitle: "",
  date: "",
  description: [],
};
export const initialEducation: ResumeEducation = {
  college: "",
  degree: "",
  gpa: "",
  date: "",
  description: [],
};
export const initialProject: ResumeProject = {
  project: "",
  date: "",
  description: [],
};
export const initialFeaturedSkill: FeaturedSkill = { skill: "", rating: 4 };
export const initialFeaturedSkills: FeaturedSkill[] = Array.from({ length: 6 }, () => ({
  ...initialFeaturedSkill,
}));
export const initialSkills: ResumeSkills = {
  featuredSkills: initialFeaturedSkills,
  descriptions: [],
};
export const initialCustom = {
  descriptions: [],
};

export const initialResumeState: Resume = {
  profile: initialProfile,
  workExperiences: [initialWorkexperience],
  educations: [initialEducation],
  projects: [initialProject],
  skills: initialSkills,
  custom: initialCustom,
};
export const DEFAULT_THEME_COLOR = "#38bdf8";
export const DEFAULT_FONT_FAMILY = "Roboto";
export const DEFAULT_FONT_SIZE = "11";
export const DEFAULT_FONT_COLOR = "#171717";

export const initialSettings: Settings = {
  themeColor: DEFAULT_THEME_COLOR,
  fontFamily: DEFAULT_FONT_FAMILY,
  fontSize: DEFAULT_FONT_SIZE,
  documentSize: "A4",
  formToShow: {
    workExperiences: true,
    educations: true,
    projects: true,
    skills: true,
    custom: false,
  },
  formToHeading: {
    workExperiences: "WORK EXPERIENCE",
    educations: "EDUCATION",
    projects: "PROJECT",
    skills: "SKILLS",
    custom: "CUSTOM SECTION",
  },
  formsOrder: ["workExperiences", "educations", "projects", "skills", "custom"],
  showBulletPoints: {
    educations: true,
    projects: true,
    skills: true,
    custom: true,
  },
};
export type CreateChangeActionWithDescriptions<T> = {
  idx: number;
} & (
  | {
      field: Exclude<keyof T, "descriptions">;
      value: string;
    }
  | { field: "descriptions"; value: string[] }
);

interface StoreState{
  resume:Resume;
  settings:Settings;

  changeProfile:(payload:{field:keyof ResumeProfile; value:string })=>void;
  changeWorkexperiences:(payload:CreateChangeActionWithDescriptions<ResumeWorkExperience>)=>void;
  changeEducations:(payload:CreateChangeActionWithDescriptions<ResumeEducation>)=>void;
  changeProjects:(payload:CreateChangeActionWithDescriptions<ResumeProject>)=>void;
  changeSkills:(payload:
    |{field:"descriptions";value:string[]}
    |{field:"featuredSkills";idx:number;skill:string;rating:number}
  )=>void;
  changeCustom:(payload:{field:"descriptions";value:string[]})=>void;
  addSectionInForm:(payload:{form:ShowForm})=>void;
  moveSectionInForm:(payload:{form:ShowForm;idx:number;direction:"up"|"down"})=>void;
  deleteSectionInFormByIdx:(payload:{form:ShowForm;idx:number})=>void;
  setResume:(paylaod:Resume)=>void;

  changeSettings:(payload:{field:GeneralSetting;value:string})=>void;
  changeShowForm:(paylaod:{field:ShowForm;value:boolean})=>void;
  changeFormHeading:(payload:{field:ShowForm;value:string})=>void;
  changeFormOrder:(payload:{form:ShowForm;type:"up"|"down"})=>void;
  changeShowBulletPoints:(payload:{field:FormWithBulletPoints;value:boolean})=>void;
  setSettings:(payload:Settings)=>void;

  resetToInitialState:()=>void;
}

export const useStore=create<StoreState>()(
  subscribeWithSelector(
    persist(
      (set,get)=> ({
        resume:initialResumeState,
        settings:initialSettings,

        changeProfile:(payload)=>{
          const{field,value}=payload;
          set((state)=> ({
            resume:{
              ...state.resume,
              profile:{
                ...state.resume.profile,
                [field]:value,
              },
            },
          }));
        },
        changeWorkexperiences:(payload)=>{
          const{idx,field,value}=payload;
          set((state)=>{
            const newWorkExperiences=[...state.resume.workExperiences];
            newWorkExperiences[idx]={
              ...newWorkExperiences[idx],
              [field]:value,           
            };
            return{
              resume:{
                ...state.resume,
                workExperiences:newWorkExperiences,
              },
            };
          });
        },
        changeEducations:(payload)=> {
          const{idx,field,value}=payload;
          set((state)=>{
            const newEducations=[...state.resume.educations];
            newEducations[idx]={
              ...newEducations[idx],
              [field]:value,
            };
            return{
              resume:{
                ...state.resume,
                educations:newEducations,
              },
            };
          }); 
        },

        changeProjects:(payload)=>{
          const{idx,field,value}=payload;
          set((state)=>{
            const newProjects=[...state.resume.projects];
            newProjects[idx]={
              ...newProjects[idx],
              [field]:value,
            };
            return{
              resume:{
                ...state.resume,
                projects:newProjects,
              },
            };
          });
        },
        changeSkills:(payload)=>{
          const{field}=payload;
          if(field==="descriptions"){
            const{value}=payload as {field : "descriptions";value:string[]};
            set((state)=>({
              resume:{
                ...state.resume,
                skills:{
                  ...state.resume.skills,
                  descriptions:value,
                },
              },
            }));
          }else{
            const {idx,skill,rating}=payload as {field:"featuredSkills";idx:number;skill:string;rating:number};
            set((state)=>{
              const newFeaturedSkills=[...state.resume.skills.featuredSkills];
              newFeaturedSkills[idx]={skill,rating};
              return{
                resume:{
                  ...state.resume,
                  skills:{
                    ...state.resume.skills,
                    featuredSkills:newFeaturedSkills,
                  },
                },
              };
            });
          }
        },

      changeCustom:(payload)=>{
        const{value}=payload;
        set((state)=>({
          resume:{
            ...state.resume,
            custom:{
              ...state.resume.custom,
              descriptions:value,
            },
          },
        }));
      },

      addSectionInForm:(payload)=>{
        const{form}=payload;
        set((state)=>{
          switch(form){
            case "workExperiences":{
              return{
                resume:{
                  ...state.resume,
                  workExperiences:[...state.resume.workExperiences,structuredClone(initialWorkexperience)],
                },
              };
            }
            case "educations":{
              return{
                resume:{
                  ...state.resume,
                  educations:[...state.resume.educations,structuredClone(initialEducation)],
                },
              };
            }
            case "projects":{
              return{
                resume:{
                  ...state.resume,
                  projects:[...state.resume.projects,structuredClone(initialProject)],
                },
              };
            }
            default:
              return state;
          }
        });
      },
      moveSectionInForm:(payload)=>{
        const{form,idx,direction}=payload;
        set((state)=>{
          if(form==="skills"||form==="custom"){
            return state;
          }
          const sections=state.resume[form];
          if(
            (idx===0 && direction==="up")||
            (idx=== sections.length -1 && direction==="down") 
          ) {
            return state;
          }
          const newSections=[...sections];
          const section=newSections[idx];
          if(direction==="up"){
            newSections[idx]=newSections[idx -1];
            newSections[idx -1]=section;
          } else{
            newSections[idx]=newSections[idx +1];
            newSections[idx +1]=section;
          }
          return{
            resume:{
              ...state.resume,
              [form]:newSections,
            },
          };
        });
      },
      deleteSectionInFormByIdx:(payload)=>{
        const{form,idx}=payload;
        set((state)=>{
          if(form==="skills"|| form==="custom"){
            return state;
          }
          const newSections=[...state.resume[form]];
          newSections.splice(idx,1);
          return{
            resume:{
              ...state.resume,
              [form]:newSections,
            },
          };
        });
      },

      setResume:(payload)=>{
        set({resume:payload});
      },

      changeSettings:(payload)=>{
        const{field,value}=payload;
        set((state)=>({
          settings:{
            ...state.settings,
            [field]:value,
          },
        }));
      },
      changeShowForm:(payload)=>{
        const{field,value}=payload;
        set((state)=>({
          settings:{
            ...state.settings,
            formToShow:{
              ...state.settings.formToShow,
              [field]:value,
            },
          },
        }));
      },

      changeFormHeading:(payload)=>{
        const{field,value}=payload;
        set((state)=>({
          settings:{
            ...state.settings,
            formToHeading:{
              ...state.settings.formToHeading,
              [field]:value,
            },
          },
        }));
      },

      changeFormOrder:(payload)=>{
        const{form,type}=payload;
        set((state)=>{
          const lastIdx=state.settings.formsOrder.length -1;
          const pos=state.settings.formsOrder.indexOf(form);
          const newpos=type==="up"?pos -1:pos +1;

          if(newpos >= 0 && newpos<=lastIdx){
            const newFormsOrder=[...state.settings.formsOrder];
            const temp=newFormsOrder[pos];
            newFormsOrder[pos]=newFormsOrder[newpos];
            newFormsOrder[newpos]=temp;

            return{
              settings:{
                ...state.settings,
                formsOrder:newFormsOrder,
              },
            };
          }
          return state;
        });
      },
      changeShowBulletPoints:(payload)=>{
        const {field,value}=payload;
        set((state)=>({
          settings:{
            ...state.settings,
            showBulletPoints:{
              ...state.settings.showBulletPoints,
              [field]:value,
            },
          },
        }));
      },
      setSettings:(payload)=>{
        set({settings:payload});
      },

      resetToInitialState: ()=>{
        set({
          resume:initialResumeState,
          settings:initialSettings,
        });
      },
      }),
      {
        name:"open-resume-state",
        storage:createJSONStorage(()=>localStorage),
        partialize:(state)=>({
          resume:state.resume,
          settings:state.settings,
        }),
        onRehydrateStorage:()=>(state)=>{
          if(state){
            if(state.resume){
              state.resume=deepMerge(initialResumeState,state.resume) as Resume;
            }
            if(state.settings){
              state.settings=deepMerge(initialSettings,state.settings) as Settings;
            }
          }
        },
      }
    )
  )
);

export const selectResume=(state:StoreState)=> state.resume;
export const selectProfile=(state:StoreState)=>state.resume.profile;
export const selectWorkExperiences=(state:StoreState)=>state.resume.workExperiences;
export const selectEducations=(state:StoreState)=>state.resume.educations;
export const selectProjects=(state:StoreState)=>state.resume.projects;
export const selectSkills=(state:StoreState)=>state.resume.skills;
export const selectCustom=(state:StoreState)=>state.resume.custom;

export const selectSettings=(state:StoreState)=>state.settings;
export const selectThemeColor=(state:StoreState)=>state.settings.themeColor;
export const selectFormToShow=(state:StoreState)=>state.settings.formToShow;
export const selectShowByForm=(form:ShowForm)=>(state:StoreState)=>state.settings.formToShow[form];
export const selectFormToHeading=(state:StoreState)=>state.settings.formToHeading;
export const selectHeadingByForm=(form:ShowForm)=>(state:StoreState)=>state.settings.formToHeading[form];
export const selectFormsOrder=(state:StoreState)=>state.settings.formsOrder;
export const selectIsFirstForm=(form:ShowForm)=>(state:StoreState)=>state.settings.formsOrder[0]=== form;
export const selectIsLastForm=(form:ShowForm)=>(state:StoreState)=>state.settings.formsOrder[state.settings.formsOrder.length -1]=== form;
export const selectShowBulletPoints=(form:FormWithBulletPoints)=>(state:StoreState)=>state.settings.showBulletPoints[form];

export const useStoreState=()=>useStore();

export const useStoreActions=()=>{
  const store=useStore();
  return{
    changeProfile:store.changeProfile,
    changeWorkExperiences:store.changeWorkexperiences,
    changeEducations:store.changeEducations,
    changeProjects:store.changeProjects,
    changeSkills:store.changeSkills,
    changeCustom:store.changeCustom,
    addSectionInForm:store.addSectionInForm,
    moveSectionInForm:store.moveSectionInForm,
    deleteSectionInFormByIdx:store.deleteSectionInFormByIdx,
    setResume:store.setResume,
    changeSettings:store.changeSettings,
    changeShowForm:store.changeShowForm,
    changeFormHeading:store.changeFormHeading,
    changeFormOrder:store.changeFormOrder,
    changeShowBulletPoints:store.changeShowBulletPoints,
    setSettings:store.setSettings,
    resetToInitialState:store.resetToInitialState,
  };
};

export const useResume=()=>useStore(selectResume);
export const useProfile=()=>useStore(selectProfile);
export const useWorkExperiences=()=>useStore(selectWorkExperiences);
export const useEducations=()=>useStore(selectEducations);
export const useProjects=()=>useStore(selectProjects);
export const useSkills=()=>useStore(selectSkills);
export const useCustom=()=>useStore(selectCustom);

export const useSettings=()=>useStore(selectSettings);
export const useThemeColor=()=>useStore(selectThemeColor);
export const useFormToShow=()=>useStore(selectFormToShow);
export const useShowByForm=(form:ShowForm)=>useStore((state)=>selectShowByForm(form)(state));
export const useFormToHeading=()=>useStore(selectFormToHeading);
export const useHeadingByForm=(form:ShowForm)=>useStore((state)=>selectHeadingByForm(form)(state));
export const useFormsOrder=()=>useStore(selectFormsOrder);
export const useIsFirstForm=(form:ShowForm)=>useStore((state)=>selectIsFirstForm(form)(state));
export const useIsLastForm=(form:ShowForm)=>useStore((state)=>selectIsLastForm(form)(state));
export const useShowBulletPoints=(form:FormWithBulletPoints)=>useStore((state)=>selectShowBulletPoints(form)(state));

export type{StoreState,ShowForm,FormWithBulletPoints,GeneralSetting};