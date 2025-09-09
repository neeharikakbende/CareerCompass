"use client";
import { ResumeForm } from "../components/ResumeForm";
import { Resume } from "../components/Resume";
import { TopNavBar } from "../components/TopNavBar";

export default function Create() {
  return (
    <div className="h-screen w-full bg-gray-50 overflow-hidden">
      <TopNavBar />
      <main className="relative h-[calc(100vh-var(--top-nav-bar-height))] w-full overflow-hidden">
        <div className="grid grid-cols-2 h-full">
          {/* Left side: Resume (scrollable within container) */}
          <div className="h-full overflow-hidden border-r">
            <Resume />
          </div>

          {/* Right side: ResumeForm (scrollable) */}
          <div className="h-full overflow-y-auto">
            <ResumeForm />
          </div>
        </div>
      </main>
    </div>
  );
}
