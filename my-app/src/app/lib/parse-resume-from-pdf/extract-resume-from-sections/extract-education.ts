import type { TextItem,
    FeatureSet,
    ResumeSectionToLines,
 } from "../types";
import type { ResumeEducation } from "../../zustand/types"; 
import { getSectionLinesByKeywords } from "./lib/get-section-lines";
import { divideSectionIntoSubsections } from "./lib/subsections";
import { DATE_FEATURE_SETS,
    hasComma,
    hasLetter,
    hasNumber,
} from "./lib/common-features";
import { getTextWithHighestFeatureScore } from "./lib/feature-scoring-system";
import { getBulletPointsFromLines,
    getDescriptionsLineIdx,
 } from "./lib/bullet-points";

const COLLEGES =['College','University','Institute','School','Academy','BASIS','Magnet'] 
const hasCollege = (item:TextItem) =>
    COLLEGES.some((college) => item.text.includes(college));
const DEGREES=["Associate", "Bachelor", "Master","PhD","Ph."];
const hasDegree = (item:TextItem) =>
    DEGREES.some((degree) => item.text.includes(degree)) ||
    /[ABM][A-Z\.]/.test(item.text);
const matchGPA = (item:TextItem) => item.text.match(/[0-4]\.\d{1,2}/);
const matchGrade=(item:TextItem) => {
    const grade =parseFloat(item.text);
    if (Number.isFinite(grade) && grade <= 110) {
        return [String(grade)] as RegExpMatchArray;
    }
    return null;
};

const COLLEGE_FEATURE_SETS: FeatureSet[] =[
    [hasCollege, 4],
    [hasDegree, -4],
    [hasNumber, -4],
];

const DEGREE_FEATURE_SETS: FeatureSet[] = [
    [hasCollege, 4],
    [hasDegree, -4],
    [hasNumber, -3],
];

const GPA_FEATURE_SETS : FeatureSet[] = [
    [matchGPA, 4, true],
    [matchGrade,3, true],
    [hasComma, -3],
    [hasLetter, -4],
];

export const extractEducation =(sections: ResumeSectionToLines) => {
    const educations: ResumeEducation[] = [];
    const educationsScores = [];
    const lines = getSectionLinesByKeywords(sections,["education"]);
    const subsections = divideSectionIntoSubsections(lines);
    for (const subsectionLines of subsections) {
        const textItems = subsectionLines.flat();
        const [college, collegeScores] = getTextWithHighestFeatureScore(
            textItems,
            COLLEGE_FEATURE_SETS
        );
        const [degree, degreeScores] = getTextWithHighestFeatureScore(
            textItems,
            DEGREE_FEATURE_SETS
        );
        const [gpa, gpaScores] = getTextWithHighestFeatureScore(
            textItems,
            GPA_FEATURE_SETS
        );
        const [date, dateScores] = getTextWithHighestFeatureScore(
            textItems,
            DATE_FEATURE_SETS
        );

        let description: string[] =[];
        const descriptionsLineIdx= getDescriptionsLineIdx(subsectionLines);
        if(descriptionsLineIdx !== undefined) {
            const descriptionsLines = subsectionLines.slice(descriptionsLineIdx)
            description= getBulletPointsFromLines(descriptionsLines);
        }

        educations.push({ college, degree, gpa, date, description});
        educationsScores.push({
            collegeScores,
            degreeScores,
            gpaScores,
            dateScores,
        });
    }

    if (educations.length !== 0) {
        const coursesLines = getSectionLinesByKeywords(sections, ["course"]);
        if(coursesLines.length !== 0) {
            educations[0].description.push(
                "Courses: " +
                coursesLines
                 .flat()
                 .map((item) => item.text)
                 .join(" ")
            );
        }
    }

    return {
        educations,
        educationsScores,
    };
};