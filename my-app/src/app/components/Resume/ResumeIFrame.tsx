/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo, useRef, useEffect, useState } from "react";
import Frame from "react-frame-component";
import {
  A4_HEIGHT_PX,
  A4_WIDTH_PX,
  A4_WIDTH_PT,
  LETTER_HEIGHT_PX,
  LETTER_WIDTH_PX,
  LETTER_WIDTH_PT,
} from "@/app/lib/constants";
import dynamic from "next/dynamic";
import { getAllFontFamiliesToLoad } from "../fonts/lib";

const getIframeInitialContent = (isA4: boolean) => {
  const width = isA4 ? A4_WIDTH_PT : LETTER_WIDTH_PT;
  const allFontFamilies = getAllFontFamiliesToLoad();

  const allFontFamiliesPreloadLinks = allFontFamilies
    .map(
      (font) => `<link rel="preload" as="font" href="/fonts/${font}-Regular.ttf" type="font/ttf" crossorigin="anonymous">
<link rel="preload" as="font" href="/fonts/${font}-Bold.ttf" type="font/ttf" crossorigin="anonymous">`
    )
    .join("");

  const allFontFamiliesFontFaces = allFontFamilies
    .map(
      (font) => `@font-face {font-family: "${font}"; src: url("/fonts/${font}-Regular.ttf");}
@font-face {font-family: "${font}"; src: url("/fonts/${font}-Bold.ttf"); font-weight: bold;}`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
  <head>
    ${allFontFamiliesPreloadLinks}
    <style>
      ${allFontFamiliesFontFaces}
      html, body { margin:0; padding:0; overflow:hidden; -webkit-text-size-adjust:none; }
    </style>
  </head>
  <body style='overflow: hidden; width: ${width}pt; margin: 0; padding: 0; -webkit-text-size-adjust:none;'>
    <div></div>
  </body>
</html>`;
};

const ResumeIframe = ({
  documentSize,
  scale,
  children,
  enablePDFViewer = false,
}: {
  documentSize: string;
  scale: number;
  children: React.ReactNode;
  enablePDFViewer?: boolean;
}) => {
  // Hooks unconditionally at top
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    ro.observe(el);
    setContainerWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const isA4 = documentSize === "A4";
  const iframeInitialContent = useMemo(
    () => getIframeInitialContent(isA4),
    [isA4]
  );

  if (enablePDFViewer) {
    return (
      <DynamicPDFViewer className="h-full w-full">{children as any}</DynamicPDFViewer>
    );
  }

  // doc size in px
  const docWidthPx = isA4 ? A4_WIDTH_PX : LETTER_WIDTH_PX;
  const docHeightPx = isA4 ? A4_HEIGHT_PX : LETTER_HEIGHT_PX;

  // Base scale to fit 90% of container width
  const baseScale = containerWidth ? (containerWidth * 0.9) / docWidthPx : 1;

  // Effective scale: multiply base scale by user scale
  const MIN_SCALE = 0.35;
  const effectiveScale = Math.max(MIN_SCALE, baseScale * scale);

   return (
     <div
       ref={containerRef}
       className="w-full flex justify-center items-start"
     >
      <div
        style={{
          width: `${docWidthPx}px`,
          height: `${docHeightPx}px`,
          transform: `scale(${effectiveScale})`,
          transformOrigin: "top left",
        }}
        className="bg-white shadow-lg rounded-lg"
      >
        <Frame
          style={{ width: "100%", height: "100%", border: "none", overflow: "hidden" }}
          initialContent={iframeInitialContent}
          key={isA4 ? "A4" : "LETTER"}
        >
          {children}
        </Frame>
      </div>
    </div>
  );
};

/**
 * Load iframe client side since iframe can't be SSR
 */
export const ResumeIframeCSR = dynamic(() => Promise.resolve(ResumeIframe), {
  ssr: false,
});

const DynamicPDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((module) => module.PDFViewer),
  { ssr: false }
);
