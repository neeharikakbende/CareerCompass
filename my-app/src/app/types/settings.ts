export type SectionKey=
|"workExperience"
|"education"
|"projects"
|"skills"
|"contact";

export interface SectionSetting{
  id:SectionKey;
  label:string;
  visible:boolean;
}
export interface ThemeSetting{
  primaryColor: string;
  fontFamily:string;
  fontsize:number;
}
export interface LayoutSetting{
  pageSize:"A4"|"Letter";
  margin:number;
}
export interface ResumeSettings{
  sections:SectionSetting[];
  theme:ThemeSetting;
  layout:LayoutSetting;
  language:string;
}