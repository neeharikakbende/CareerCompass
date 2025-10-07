"use client";
import { useMemo, useState } from "react";
import { useSetDefaultScale } from "./hooks";
import {
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { pdf } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import { useResume, useSettings } from "@/app/lib/zustand/store";
import { ResumePDF } from "./ResumePDF";

const ResumeControlBar = ({
  scale,
  setScale,
  documentSize,
  fileName,
}: {
  scale: number;
  setScale: (scale: number) => void;
  documentSize: string;
  fileName: string;
}) => {
  const { setScaleOnResize } = useSetDefaultScale({
    setScale,
    documentSize,
  });

  // Use the zustand store directly to build the document so the PDF generator
  // always receives the latest resume data when the user types.
  const resume = useResume();
  const settings = useSettings();

  // lightweight key derived from resume/settings to force regeneration when content changes
  const documentElement = useMemo(
    () => <ResumePDF resume={resume} settings={settings} isPDF={true} />,
    [resume, settings]
  );

  const [generating, setGenerating] = useState(false);

  const handleDownload = async () => {
    setGenerating(true);
    try {
      const blob = await pdf(documentElement).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      // revoke after a short delay to ensure download started
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch (err) {
      // keep error handling minimal — log for now

      console.error("Failed to generate PDF:", err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 flex h-[var(--resume-control-bar-height)] items-center justify-center px-[var(--resume-padding)] text-gray-600 lg:justify-between">
      <div className="flex items-center gap-2">
        <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
        <input
          type="range"
          min={0.5}
          max={1.5}
          step={0.01}
          value={scale}
          onChange={(e) => {
            setScaleOnResize(false);
            setScale(Number(e.target.value));
          }}
        />
        <div className="w-10">{`${Math.round(scale * 100)}%`}</div>
      </div>
      <button
        className="ml-1 flex items-center gap-1 rounded-md border border-gray-300 px-3 py-0.5 hover:bg-gray-100 lg:ml-8"
        onClick={handleDownload}
        disabled={generating}
        aria-disabled={generating}
      >
        <ArrowDownTrayIcon className="h-4 w-4" />
        <span className="whitespace-nowrap">Download Resume</span>
      </button>
    </div>
  );
};

export const ResumeControlBarCSR = dynamic(
  () => Promise.resolve(ResumeControlBar),
  {
    ssr: false,
  }
);

export const ResumeControlBarBorder = () => (
  <div className="absolute bottom-[var(--resume-control-bar-height)] w-full border-t-2 bg-gray-50" />
);
