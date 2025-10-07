import React from "react";
import { Heading } from "../components/documentation";
import type {
  Line,
  Lines,
  ResumeSectionToLines,
  TextItems,
} from "../lib/parse-resume-from-pdf/types";
import { extractProfile } from "../lib/parse-resume-from-pdf/extract-resume-from-sections/extract-profile";

export const ResumeParserAlgorithmArticle = ({
  sections,
}: {
  textItems: TextItems;
  lines: Lines;
  sections: ResumeSectionToLines;
}) => {
  const { profile } = extractProfile(sections);

  // Helper to render a resume section (education / work / projects / skills)
  const renderSection = (title: string, linesArr: Line[] | undefined) => {
    if (!linesArr || linesArr.length === 0) return null;
    return (
      <div className="mt-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <ul className="list-disc ml-5">
          {linesArr.map((line, i) => (
            <li key={i}>{line.map((item) => item.text).join(" ")}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <article className="mt-10 space-y-8">
      <Heading className="text-primary !mt-0 border-t-2 pt-8">
        Resume Parser Algorithm Deep Dive
      </Heading>

      {/* Parsed Info Dashboard */}
      <section className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Parsed Resume Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
          <div>
            <p>
              <strong>Name:</strong> {profile.name || "—"}
            </p>
            <p>
              <strong>Email:</strong> {profile.email || "—"}
            </p>
            <p>
              <strong>Phone:</strong> {profile.phone || "—"}
            </p>
          </div>
          <div>
            <p>
              <strong>Location:</strong> {profile.location || "—"}
            </p>
            <p>
              <strong>URL / LinkedIn:</strong> {profile.url || "—"}
            </p>
          </div>
        </div>

        {renderSection("Education", sections.education)}
        {renderSection(
          "Work Experience",
          sections["WORK EXPERIENCE"] || sections.work
        )}
        {renderSection("Projects", sections.PROJECT || sections.projects)}
        {renderSection("Skills", sections.SKILLS || sections.skills)}
      </section>
    </article>
  );
};
