/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo, useRef, useEffect, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Frame from "react-frame-component";
import {
  A4_WIDTH_PX,
  A4_WIDTH_PT,
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
      (
        font
      ) => `<link rel="preload" as="font" href="/fonts/${font}-Regular.ttf" type="font/ttf" crossorigin="anonymous">
<link rel="preload" as="font" href="/fonts/${font}-Bold.ttf" type="font/ttf" crossorigin="anonymous">`
    )
    .join("");

  const allFontFamiliesFontFaces = allFontFamilies
    .map(
      (
        font
      ) => `@font-face {font-family: "${font}"; src: url("/fonts/${font}-Regular.ttf");}
@font-face {font-family: "${font}"; src: url("/fonts/${font}-Bold.ttf"); font-weight: bold;}`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
  <head>
    ${allFontFamiliesPreloadLinks}
    <style>
      ${allFontFamiliesFontFaces}
      /* Hide scrollbars but allow scrolling */
      html, body { margin:0; padding:0; overflow:auto; overflow-x: hidden; -webkit-text-size-adjust:none; -ms-overflow-style: none; scrollbar-width: none; }
      /* WebKit browsers */
      body::-webkit-scrollbar { display: none; width: 0; height: 0; }
  /* Page wrapper: each .cc-page represents a single printed page size. */
  .cc-page { box-sizing: border-box; width: ${width}pt; margin: 12pt auto; background: white; }
  /* Ensure content inside a page breaks to next page when needed */
  .cc-page * { box-sizing: border-box; }
      /* Force wrapping for long text to avoid horizontal overflow in preview */
      body, div, p, span, a, li, td, th { word-wrap: break-word; overflow-wrap: break-word; white-space: normal; }
      /* Ensure images and svgs never overflow the page width */
      img, svg { max-width: 100%; height: auto; }
      /* Aggressive overrides to override inline styles from injected content */
      #cc-root, #cc-root * {
        white-space: normal !important;
        overflow-wrap: break-word !important;
        word-break: break-word !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }
      /* Allow page breaks for long content when printing */
      .cc-page { page-break-after: always; }
    </style>
  </head>
  <body style='overflow: auto; overflow-x: hidden; width: ${width}pt; margin: 0; padding: 0; -webkit-text-size-adjust:none; -ms-overflow-style: none; scrollbar-width: none;'>
    <div id="cc-root" style="height:100%; overflow-y:auto; overflow-x:hidden;"></div>
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
      <DynamicPDFViewer className="h-full w-full">
        {children as any}
      </DynamicPDFViewer>
    );
  }

  // doc size in px - used as the page width for CSS
  const docWidthPx = isA4 ? A4_WIDTH_PX : LETTER_WIDTH_PX;

  // Base scale to fit 90% of container width (applies to page wrapper)
  const baseScale = containerWidth ? (containerWidth * 0.93) / docWidthPx : 1;

  const MIN_SCALE = 0.35;
  const effectiveScale = Math.max(MIN_SCALE, baseScale * scale);

  return (
    <div ref={containerRef} className="w-full flex justify-center items-start" style={{ overflowX: "hidden" }}>
      <div
        style={{
          transform: `scale(${effectiveScale})`,
          transformOrigin: "top left",
          overflowX: "hidden",
        }}
        className="bg-white shadow-lg rounded-lg"
      >
        <Frame
          style={{
            width: `${docWidthPx}px`,
            // Make the iframe height match the available app viewport (subtract top nav and control bar)
            height: "calc(100vh - var(--top-nav-bar-height) - var(--resume-control-bar-height))",
            border: "none",
            overflow: "auto",
            overflowX: "hidden",
          }}
          initialContent={iframeInitialContent}
          key={isA4 ? "A4" : "LETTER"}
        >
          {/* The children passed in are react-pdf Document/Page components when PDF mode is enabled
              or HTML content. For HTML resume content, we render it inside pages by wrapping with
              .cc-page elements. If children are a React element (not string), we attempt to mount
              them inside the iframe root and let CSS paginate. */}
          <div id="cc-content-wrapper" style={{ width: "100%" }}>
            {/* Render children as-is; consumer can include page wrappers or we rely on the CSS page size. */}
            {children}
          </div>
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

const DynamicPDFViewer = dynamic(async () => PDFViewer, { ssr: false });
