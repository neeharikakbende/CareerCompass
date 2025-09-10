import { View } from "@react-pdf/renderer";
import { ResumePDFSection,ResumePDFBulletList,ResumePDFText } from "./common";
import { styles,spacing } from "./styles";
import type { ResumeWorkExperience } from "@/app/lib/zustand/types";

export const ResumePDFWorkExperience = ({
  heading,
  workExperiences,
  themeColor,
}: {
  heading: string;
  workExperiences: ResumeWorkExperience[];
  themeColor: string;
}) => {
  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {workExperiences.map(({ company, jobTitle, date, description }, idx) => {
        // Hide company name if it is the same as the previous company
        const hideCompanyName =
          idx > 0 && company === workExperiences[idx - 1].company;

        return (
          <View key={idx} style={idx !== 0 ? { marginTop: spacing["2"] } : {}}>
            {!hideCompanyName && (
              <ResumePDFText bold={true}>{company}</ResumePDFText>
            )}
            <View
              style={{
                ...styles.flexRowSpaceBetween,
                marginTop: hideCompanyName
                  ? "-" + spacing["1"]
                  : spacing["1.5"],
              }}
            >
              <ResumePDFText>{jobTitle}</ResumePDFText>
              <ResumePDFText>{date}</ResumePDFText>
            </View>
            <View style={{ ...styles.flexCol, marginTop: spacing["1.5"] }}>
              <ResumePDFBulletList items={description} />
            </View>
          </View>
        );
      })}
    </ResumePDFSection>
  );
};
