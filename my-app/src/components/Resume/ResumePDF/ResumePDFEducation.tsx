import {View} from "@react-pdf/renderer";
import {
    ResumePDFBulletList,
    ResumePDFSection,
    ResumePDFText,
} from "components/Resume/ResumePDF/common";
import {styles,spacing} from "components/Resume/ResumePDF/styles";
import type { ResumeEducation } from "@/app/lib/zustand/types";

export const ResumePDFEducation=({
    heading,
    educations,
    themeColor,
    showBulletPoints,
}:{
    heading:string;
    educations:ResumeEducation[];
    themeColor:string;
    showBulletPoints:boolean;
}) => {
    return (
        <ResumePDFSection themeColor={themeColor} heading={heading}>
            {educations.map(
                ({college,degree,date,gpa,description=[]},idx)=>{
                    const hideCollegeName=
                      idx > 0 && college === educations[idx-1].college;
                    const showDescriptions=description.join() !=="";

                    return (
                        <View key={idx}>
                            {!hideCollegeName && (
                                <ResumePDFText bold={true}>{college}</ResumePDFText>
                            )}
                        </View>
                    )

                }
            )}
        </ResumePDFSection>
    )
}