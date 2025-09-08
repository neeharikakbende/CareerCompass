/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, FormSection } from "./Form";
import { BulletListTextarea,
    Input,
 } from "./Form/InputGroup";
 import { BulletListIconButton } from "./Form/IconButton";
import type { CreateHandleChangeArgsWithDescriptions } from "./types";
import { useEducations,useShowBulletPoints,useStoreActions } from "@/app/lib/zustand/store";
import type { ResumeEducation } from "@/app/lib/zustand/types";

export const EducationsForm=() => {
  const educations = useEducations();
  const { changeEducations, changeShowBulletPoints } = useStoreActions();
  const showDelete = educations.length > 1;
  const form = "educations";
  const showBulletPoints = useShowBulletPoints(form);

  return (
    <Form form={form} addButtonText="Add College">
        {educations.map(({ college, degree, gpa, date, description }, idx) => {
        const handleEducationChange = (
          ...[
            field,
            value,
          ]: CreateHandleChangeArgsWithDescriptions<ResumeEducation>
        ) => {
          changeEducations({ idx, field, value } as any);
        };

        const handleShowBulletPoints = (value: boolean) => {
          changeShowBulletPoints({ field: form, value });
        };

        const showMoveUp = idx !== 0;
        const showMoveDown = idx !== educations.length - 1;

        return (
          <FormSection
            key={idx}
            form="educations"
            idx={idx}
            showMoveUp={showMoveUp}
            showMoveDown={showMoveDown}
            showDelete={showDelete}
            deleteButtonTooltipText="Delete college"
          >
            <Input 
            label="College"
            labelClassName="col-span-4"
            name="college"
            placeholder="Bangalore University"
            value={college}
            onChange={handleEducationChange}
            />
            <Input
            label="Date"
            labelClassName="col-span-2"
            name="date"
            placeholder="May 2018"
            value={date}
            onChange={handleEducationChange}
            />
            <Input
              label="Degree & Major"
              labelClassName="col-span-4"
              name="degree"
              placeholder="Bachelor of Science in Computer Engineering"
              value={degree}
              onChange={handleEducationChange}
            />
            <Input
              label="GPA"
              labelClassName="col-span-2"
              name="gpa"
              placeholder="3.81"
              value={gpa}
              onChange={handleEducationChange}
            />
            <div className="relative col-span-full">
              <BulletListTextarea
                label="Additional Information (Optional)"
                labelClassName="col-span-full"
                name="description"
                placeholder="Free paragraph space to list out additional activities, courses, awards etc"
                value={description}
                onChange={handleEducationChange}
                showBulletPoints={showBulletPoints}
              />
              <div className="absolute left-[15.6rem] top-[0.07rem]">
                <BulletListIconButton
                  showBulletPoints={showBulletPoints}
                  onClick={handleShowBulletPoints}
                />
              </div>
            </div>
          </FormSection>
        );
      })}
    </Form>
  );
};
