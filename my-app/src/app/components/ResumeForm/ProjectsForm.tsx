
import { Form,FormSection } from "./Form";
import { Input,
  BulletListTextarea,
 } from "./Form/InputGroup";
import type { CreateHandleChangeArgsWithDescriptions } from "./types";
import { useProjects,useStoreActions } from "@/app/lib/zustand/store";
import type { ResumeProject } from "@/app/lib/zustand/types";

export const ProjectsForm=() => {
    const projects=useProjects();
    const {changeProjects} = useStoreActions();
    const showDelete=projects.length>1;

    return(
        <Form form="projects" addButtonText="Add Project">
            {projects.map(({project,date,description}, idx)=>{
                const handleProjectChange = (
          ...[
            field,
            value,
          ]: CreateHandleChangeArgsWithDescriptions<ResumeProject>
        ) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          changeProjects({ idx, field, value } as any);
        };
        const showMoveUp = idx !== 0;
        const showMoveDown = idx !== projects.length - 1;
         
        return(
            <FormSection
               key={idx}
               form="projects"
               idx={idx}
               showMoveUp={showMoveUp}
               showMoveDown={showMoveDown}
               showDelete={showDelete}
               deleteButtonTooltipText={"Delete project"}
               >
                <Input
                  name="project"
                  label="Project Name"
                  placeholder="Career Compass"
                  value={project}
                  onChange={handleProjectChange}
                  labelClassName="col-span-4"
                  />
                  <Input
                    name="date"
                    label="Date"
                    placeholder="2022"
                    value={date}
                    onChange={handleProjectChange}
                    labelClassName="col-span-2"
                    />
                  <BulletListTextarea
                    name="description"
                    label="Description"
                    placeholder="Bullet points"
                    value={description}
                    onChange={handleProjectChange}
                    labelClassName="col-span-full"
                    />
               </FormSection>
        );
            })}
        </Form>
    );
};
