import { View } from "@react-pdf/renderer";
import { ResumePDFSection,ResumePDFBulletList,ResumePDFText } from "./common";
import { styles,spacing } from "./styles";
import type { ResumeProject } from "@/app/lib/zustand/types";

export const ResumePDFProject = ({
  heading,
  projects,
  themeColor,
}: {
  heading: string;
  projects: ResumeProject[];
  themeColor: string;
}) => {
  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {projects.map(({ project, date, description }, idx) => (
        <View key={idx}>
          <View
            style={{
              ...styles.flexRow,
              marginTop: spacing["0.5"],
            }}
          >
            <ResumePDFText bold={true}>{project}</ResumePDFText>
            <ResumePDFText>{date}</ResumePDFText>
          </View>
          <View style={{ ...styles.flexCol, marginTop: spacing["0.5"] }}>
            <ResumePDFBulletList items={description} />
          </View>
        </View>
      ))}
    </ResumePDFSection>
  );
};
