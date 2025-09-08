"use client";
import {useState,useMemo} from "react";
import { ResumeIframeCSR } from "./ResumeIFrame";
import { ResumePDF } from "./ResumePDF";
import { ResumeControlBarCSR,ResumeControlBarBorder, } from "./ResumeControlBar";
import { FlexboxSpacer } from "../FlexboxSpacer";
import { useResume,useSettings } from "@/app/lib/zustand/store";
import { DEBUG_RESUME_PDF_FLAG } from "@/app/lib/constants";
import { useRegisterReactPDFFont,
    useRegisterReactPDFHyphenationCallback,
 } from "../fonts/hooks";
import { NonEnglishFontsCSSLazyLoader } from "../fonts/NonEnglishFontsCSSLoader";

export const Resume = () => {
  const [scale, setScale] = useState(0.8);
  const resume = useResume();
  const settings = useSettings();
  const document = useMemo(
    () => <ResumePDF resume={resume} settings={settings} isPDF={true} />,
    [resume, settings]
  );

  useRegisterReactPDFFont();
  useRegisterReactPDFHyphenationCallback(settings.fontFamily);

  return (
    <>
      {/* <NonEnglishFontsCSSLazyLoader /> */}
      <div className="relative flex justify-center md:justify-start">
        <FlexboxSpacer maxWidth={50} className="hidden md:block" />
        <div className="relative">
          <section className="h-[calc(100vh-var(--top-nav-bar-height)-var(--resume-control-bar-height))] overflow-hidden md:p-[var(--resume-padding)]">
            <ResumeIframeCSR
              documentSize={settings.documentSize}
              scale={scale}
              enablePDFViewer={DEBUG_RESUME_PDF_FLAG}
            >
              <ResumePDF
                resume={resume}
                settings={settings}
                isPDF={DEBUG_RESUME_PDF_FLAG}
              />
            </ResumeIframeCSR>
          </section>
          <ResumeControlBarCSR
            scale={scale}
            setScale={setScale}
            documentSize={settings.documentSize}
            document={document}
            fileName={resume.profile.name + " - Resume"}
          />
        </div>
        <ResumeControlBarBorder />
      </div>
    </>
  );
};
