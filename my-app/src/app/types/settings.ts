export type SectionKey=
|"workExperience"
|"education"
|"projects"
|"skills"
|"conatact";

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