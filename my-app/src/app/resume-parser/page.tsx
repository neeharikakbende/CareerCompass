"use client";
import { useState } from "react";
import { readPdf } from "../lib/parse-resume-from-pdf/read-pdf";
import type { TextItems } from "../lib/parse-resume-from-pdf/types";
import { groupTextItemsIntoLines } from "../lib/parse-resume-from-pdf/group-text-items-into-lines";
import { groupLinesIntoSections } from "../lib/parse-resume-from-pdf/group-lines-into-sections";
import { extractResumeFromSections } from "../lib/parse-resume-from-pdf/extract-resume-from-sections";
import { ResumeDropzone } from "../components/ResumeDropzone";
import { Heading, Paragraph } from "../components/documentation";
import { ResumeTable } from "./ResumeTable";
import { FlexboxSpacer } from "../components/FlexboxSpacer";
import { ResumeParserAlgorithmArticle } from "./ResumeParserAlgorithmArticle";

export default function ResumeParser() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [textItems, setTextItems] = useState<TextItems>([]);

  const lines = groupTextItemsIntoLines(textItems || []);
  const sections = groupLinesIntoSections(lines);
  const resume = extractResumeFromSections(sections);

  const handleFileDrop = async (newFileUrl: string) => {
    setFileUrl(newFileUrl);
    const items = await readPdf(newFileUrl);
    setTextItems(items);
  };

  return (
    <main className="h-full w-full overflow-hidden">
      <div className="grid md:grid-cols-6">
        <div className="flex justify-center px-2 md:col-span-3 md:h-[calc(100vh-var(--top-nav-bar-height))] md:justify-center">
          <section className="mt-5 grow px-4 md:max-w-[600px] md:px-0 flex flex-col items-center">
            {fileUrl ? (
              <div className="w-full h-[90vh]">
                <iframe
                  src={`${fileUrl}#navpanes=0`}
                  className="h-full w-full rounded-md shadow-sm"
                />
              </div>
            ) : (
              <div className="flex h-[400px] w-full max-w-[500px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 shadow-sm">
                <p className="text-lg font-medium mb-2">
                  Drop your resume to start parsing
                </p>
                <p className="text-sm text-gray-400">Supported formats: PDF</p>
                <ResumeDropzone
                  onFileUrlChange={handleFileDrop}
                  playgroundView={true}
                />
              </div>
            )}
          </section>
          <FlexboxSpacer maxWidth={45} className="hidden md:block" />
        </div>

        <div className="flex px-6 text-gray-900 md:col-span-3 md:h-[calc(100vh-var(--top-nav-bar-height))] md:overflow-y-scroll">
          <FlexboxSpacer maxWidth={45} className="hidden md:block" />
          <section className="max-w-[600px] grow">
            <Heading className="text-primary !mt-4">
              Resume Parser Playground
            </Heading>
            <Paragraph smallMarginTop={true}>
              Drop your resume to see how well it can be parsed by Application
              Tracking Systems (ATS). The better the parser can extract info
              like your name and email, the better formatted your resume is.
            </Paragraph>

            {fileUrl && (
              <>
                <Heading level={2} className="!mt-[1.2em]">
                  Resume Parsing Results
                </Heading>
                <ResumeTable resume={resume} />
                <ResumeParserAlgorithmArticle
                  textItems={textItems}
                  lines={lines}
                  sections={sections}
                />
              </>
            )}

            <div className="pt-24" />
          </section>
        </div>
      </div>
    </main>
  );
}
