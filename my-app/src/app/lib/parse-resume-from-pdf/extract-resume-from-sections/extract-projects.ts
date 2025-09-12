import type { ResumeProject } from "../../zustand/types";
import type { FeatureSet,ResumeSectionToLines } from "../types";
import { getSectionLinesByKeywords } from "./lib/get-section-lines";
import { DATE_FEATURE_SETS,getHasText,isBold } from "./lib/common-features";
import { divideSectionIntoSubsections } from "./lib/subsections";
import { getTextWithHighestFeatureScore } from "./lib/feature-scoring-system";
import { getBulletPointsFromLines, getDescriptionsLineIdx } from "./lib/bullet-points";


export const extractProject = (sections:ResumeSectionToLines) => {
    const projects : ResumeProject[] = [];
    const projectsScores = [];
    const lines = getSectionLinesByKeywords(sections,["project"]);
    const subsections = divideSectionIntoSubsections(lines);

    for (const subsectionLines of subsections) {
        const descriptionLineIdx = getDescriptionsLineIdx(subsectionLines) ?? 1;

        const subsectionInfoTextItems = subsectionLines
          .slice(0, descriptionLineIdx)
          .flat();
        const [date, dateScores] = getTextWithHighestFeatureScore(
            subsectionInfoTextItems,
            DATE_FEATURE_SETS
        );
        const PROJECT_FEATURE_SET: FeatureSet[] = [
            [isBold, 2],
            [getHasText(date), -4],
        ];
        const [project, projectScores] = getTextWithHighestFeatureScore(
            subsectionInfoTextItems,
            PROJECT_FEATURE_SET,
            false
        );
        
        const descriptionLines = subsectionLines.slice(descriptionLineIdx);
        const description = getBulletPointsFromLines(descriptionLines);

        projects.push({ project, date, description});
        projectsScores.push({
            projectScores,
            dateScores,
        });
    }
    return {projects, projectsScores};
};