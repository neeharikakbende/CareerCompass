import { Page, View, Document } from "@react-pdf/renderer";
import { styles,spacing } from "./styles";
import { ResumePDFProfile } from "./ResumePDFProfile";
import { ResumePDFWorkExperience } from "./ResumePDFWorkExperience";
import { ResumePDFEducation } from "./ResumePDFEducation";
import { ResumePDFProject } from "./ResumePDFProject";
import { ResumePDFSkills } from "./ResumePDFSkills";
import { ResumePDFCustom } from "./ResumePDFCustom";
import { DEFAULT_FONT_COLOR } from "@/app/lib/zustand/store";
import type { Settings, ShowForm, Resume } from "@/app/lib/zustand/types";
import { SuppressResumePDFErrorMessage } from "./common/SuppressResumePDFErrorMessage";
import { JSX } from "react";

export const ResumePDF=({
    resume,
    settings,
    isPDF=false,
}:{
    resume:Resume;
    settings: Settings;
    isPDF?:boolean;
})=>{
    const {profile, workExperiences,educations,projects,skills,custom}=
     resume;
    const {name}=profile;
    const{
        fontFamily,
        fontSize,
        documentSize,
        formToHeading,
        formToShow,
        formsOrder,
        showBulletPoints,
    }= settings;
    const themeColor =settings.themeColor || DEFAULT_FONT_COLOR;
    
    const showFormOrder= formsOrder.filter((form)=>formToShow[form]);

    const formTypeToComponent:{[type in ShowForm]:()=>JSX.Element}={
        workExperiences:()=> (
            <ResumePDFWorkExperience
            heading={formToHeading["workExperiences"]}
            workExperiences={workExperiences}
            themeColor={themeColor}
            />
        ),
        educations:()=>(
            <ResumePDFEducation
            heading={formToHeading["educations"]}
            educations={educations}
            themeColor={themeColor}
            showBulletPoints={showBulletPoints["educations"]}
            />
        ),
        projects:()=>(
            <ResumePDFProject
            heading={formToHeading["projects"]}
            projects={projects}
            themeColor={themeColor}
            />
        ),
        skills:()=>(
            <ResumePDFSkills
            heading={formToHeading["skills"]}
            skills={skills}
            themeColor={themeColor}
            showBulletPoints={showBulletPoints["skills"]}
            />
        ),
        custom:()=>(
            <ResumePDFCustom
            heading={formToHeading["custom"]}
            custom={custom}
            themeColor={themeColor}
            showBulletPoints={showBulletPoints["custom"]}
            />
        ),
    };
    return (
        <>
        <Document title={`${name} Resume`} author={name} producer={"CareerCompass"}>
            <Page
              size={documentSize==="A4"?"A4":"LETTER"}
              style={{
                ...styles.flexCol,
                color:DEFAULT_FONT_COLOR,
                fontFamily,
                fontSize:fontSize + "pt",
              }}
              >
                {Boolean(settings.themeColor)&&(
                    <View
                    style={{
                        width:spacing["full"],
                        height:spacing[3.5],
                        backgroundColor:themeColor,
                    }}
                    />
                )}
                <View
                style={{
                    ...styles.flexCol,
                    padding:`${spacing[0]} ${spacing[20]}`,
                }}
                >
                    <ResumePDFProfile
                    profile={profile}
                    themeColor={themeColor}
                    isPDF={isPDF}
                    />
                    {showFormOrder.map((form)=>{
                        const Component =formTypeToComponent[form];
                        return <Component key={form} />
                    })}
                </View>
              </Page>
            </Document>   
            <SuppressResumePDFErrorMessage/>  
           </>
    );
};