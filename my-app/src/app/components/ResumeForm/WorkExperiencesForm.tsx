/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form,FormSection } from "./Form";
import { Input,BulletListTextarea, } from "./Form/InputGroup";
import type { CreateHandleChangeArgsWithDescriptions } from "./types";
import { useWorkExperiences,useStoreActions } from "@/app/lib/zustand/store";
import type { ResumeWorkExperience } from "@/app/lib/zustand/types";

export const WorkExperiencesForm=() => {
    const workExperiences=useWorkExperiences();
    const {changeWorkExperiences}=useStoreActions();

    const showDelete=workExperiences.length>1;

    return (
        <Form form="workExperiences" addButtonText="Add Job">
            {workExperiences.map(({company,jobTitle,date,description},idx)=>{
                const handleWorkExperienceChange=(
                    ...[
                        field,
                        value,
                    ]: CreateHandleChangeArgsWithDescriptions<ResumeWorkExperience>
                ) => {
                    changeWorkExperiences({idx,field,value} as any);
                };
                const showMoveUp=idx!==0;
                const showMoveDown=idx!==workExperiences.length-1;

                return(
                    <FormSection
                    key={idx}
                    form="workExperiences"
                    idx={idx}
                    showMoveUp={showMoveUp}
                    showMoveDown={showMoveDown}
                    showDelete={showDelete}
                    deleteButtonTooltipText="Delete job"
                    >
                        <Input
                          label="Company"
                          labelClassName="col-span-full"
                          name="company"
                          placeholder="abc academy"
                          value={company}
                          onChange={handleWorkExperienceChange}
                          />
                          <Input
                            label="Job Title"
                            labelClassName="col-span-4"
                            name="jobTitle"
                            placeholder="Software Engineer"
                            value={jobTitle}
                            onChange={handleWorkExperienceChange}
                            />
                            <Input
              label="Date"
              labelClassName="col-span-2"
              name="date"
              placeholder="Jun 2022 - Present"
              value={date}
              onChange={handleWorkExperienceChange}
            />
            <BulletListTextarea
              label="Description"
              labelClassName="col-span-full"
              name="description"
              placeholder="Bullet points"
              value={description}
              onChange={handleWorkExperienceChange}
            />
          </FormSection>
        );
      })}
    </Form>
  );
};
