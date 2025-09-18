import { Fragment } from "react";
import type { Resume } from "../lib/zustand/types";
import { initialEducation, initialWorkexperience } from "../lib/zustand/store";
import { deepClone } from "../lib/deep-clone";
import { cx } from "../lib/cx";

const TableRowHeader = ({ children }: {children: React.ReactNode}) => (
    <tr className="divide-x bg-gray-50">
        <th className="px-3 py-2 font-semibold" scope="colgroup" colSpan={2}>
            {children}
        </th>
    </tr>
);

const TableRow = ({
    label,
    value,
    className,
}: {
    label: string;
    value: string | string[];
    className?: string | false;
}) => (
    <tr className={cx("divide-x", className)}>
      <th className="px-3 py-2 font-medium" scope="row">
        {label}
        </th>
        <td className="w-full px-3 py-2">
            {typeof value === "string"
              ? value
              : value.map((x, idx) => (
                <Fragment key={idx}>
                    . {x}
                    <br />
                </Fragment>
              ))}
        </td>  
    </tr>
);

export const ResumeTable =({resume}: {resume: Resume}) => {
  const educations = 
    resume.educations.length === 0 
     ? [deepClone(initialEducation)]
     : resume.educations;
  const workExperiences =
    resume.workExperiences.length === 0
     ? [deepClone(initialWorkexperience)]
     : resume.workExperiences;
  const skills = [...resume.skills.descriptions];
  const featuredSkills = resume.skills.featuredSkills
    .filter((item) => item.skill.trim())
    .map((item) => item.skill)
    .join(", ")
    .trim();
  if (featuredSkills) {
    skills.unshift(featuredSkills);
  }  
  return (
    <table className="mt-2 w-full border text-sm text-gray-900">
       <tbody className="divide-y text-left align-top">
        <TableRowHeader>Profile</TableRowHeader>
        <TableRow label="Name" value={resume.profile.name}/>
        <TableRow label="Email" value={resume.profile.email}/>
        <TableRow label="Phone" value={resume.profile.phone}/>
        <TableRow label="Location" value={resume.profile.location}/>
        <TableRow label="Link" value={resume.profile.url}/>
        <TableRow label="Objective" value={resume.profile.objective}/>
        <TableRowHeader>Education</TableRowHeader>
        {educations.map((education, idx) => (
            <Fragment key={idx}>
            <TableRow label="College" value={education.college} />
            <TableRow label="Degree" value={education.degree} />
            <TableRow label="GPA" value={education.gpa} />
            <TableRow label="Date" value={education.date} />
            <TableRow
              label="Description"
              value={education.description}
              className={
                educations.length - 1 !== 0 &&
                idx !== educations.length - 1 &&
                "!border-b-4"
              }
            />
          </Fragment>
        ))} 
        <TableRowHeader>Work Experience</TableRowHeader>
        {workExperiences.map((workExperience, idx) => (
          <Fragment key={idx}>
            <TableRow label="Company" value={workExperience.company} />
            <TableRow label="Job Title" value={workExperience.jobTitle} />
            <TableRow label="Date" value={workExperience.date} />
            <TableRow
              label="Description"
              value={workExperience.description}
              className={
                workExperiences.length - 1 !== 0 &&
                idx !== workExperiences.length - 1 &&
                "!border-b-4"
              }
            />
          </Fragment>
        ))}
        {resume.projects.length > 0 && (
          <TableRowHeader>Projects</TableRowHeader>
        )}
        {resume.projects.map((project, idx) => (
          <Fragment key={idx}>
            <TableRow label="Project" value={project.project} />
            <TableRow label="Date" value={project.date} />
            <TableRow
              label="Description"
              value={project.description}
              className={
                resume.projects.length - 1 !== 0 &&
                idx !== resume.projects.length - 1 &&
                "!border-b-4"
              }
            />
          </Fragment>
        ))}
        <TableRowHeader>Skills</TableRowHeader>
        <TableRow label="Description" value={skills} />
      </tbody>
    </table>
  );
};
