import {View} from "@react-pdf/renderer";
import { ResumePDFSection,ResumePDFBulletList, } from "./common";
import { styles } from "./styles";
import type { ResumeCustom } from "@/app/lib/zustand/types";

export const ResumePDFCustom=({
    heading,
    custom,
    themeColor,
    showBulletPoints,
}:{
    heading:string;
    custom:ResumeCustom;
    themeColor:string;
    showBulletPoints:boolean;
}) => {
    const {descriptions}=custom;

    return(
        <ResumePDFSection themeColor={themeColor} heading={heading}>
            <View style={{ ...styles.flexCol}}>
                <ResumePDFBulletList
                items={descriptions}
                showBulletPoints={showBulletPoints}
                />
            </View>
        </ResumePDFSection>
    );
};