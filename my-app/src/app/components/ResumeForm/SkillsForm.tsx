import { Form } from "./Form";
import { BulletListTextarea,InputGroupWrapper } from "./Form/InputGroup";
import { FeaturedSkillInput } from "./Form/FeaturedSkillInput";
import { BulletListIconButton } from "./Form/IconButton";
import { useSkills,useShowBulletPoints,useThemeColor,useStoreActions } from "@/app/lib/zustand/store";

export const SkillsForm=() => {
    const skills=useSkills();
    const {changeSkills, changeShowBulletPoints} = useStoreActions();
    const {featuredSkills, descriptions}=skills;
    const form="skills";
    const showBulletPoints=useShowBulletPoints(form);
    const themeColor=useThemeColor() || "#38bdf8";

    const handleSkillsChange=(field:"descriptions", value:string[])=>{
        changeSkills({field,value});
    };
    const handleFeaturedSkillsChange=(
        idx:number,
        skill:string,
        rating:number
    )=> {
        changeSkills({field:"featuredSkills",idx,skill,rating});
    };
    const handleShowBulletPoints=(value:boolean)=>{
        changeShowBulletPoints({field:form,value});
    };

    return(
        <Form form={form}>
            <div className="col-span-full grid grid-cols-6 gap-3">
                <div className="relative col-span-full">
                    <BulletListTextarea
                       label="Skills List"
                       labelClassName="col-span-full"
                       name="descriptions"
                       placeholder="Bullet points"
                       value={descriptions}
                       onChange={handleSkillsChange}
                       showBulletPoints={showBulletPoints}
                       />
                       <div className="absolute left-[4.5rem] top-[0.07rem]">
                        <BulletListIconButton
                          showBulletPoints={showBulletPoints}
                          onClick={handleShowBulletPoints}
                          />
                    </div>
                </div>
                <div className="col-span-full mb-4 mt-6 border-t-2 border-dotted border-gray-200" />
                <InputGroupWrapper
                   label="Featured Skills (Optional)"
                   className="col-span-full"
                   >
                    <p className="mt-2 text-sm font-normal text-gray-600">
                        Featured skills is optional to highlight top skills, with more 
                        circles mean higher proficiency. 
                    </p>
                   </InputGroupWrapper>
                   {featuredSkills.map(({skill,rating}, idx)=> (
                    <FeaturedSkillInput
                       key={idx}
                       className="col-span-3"
                       skill={skill}
                       rating={rating}
                       setSkillRating={(newSkill,newRating)=>{
                        handleFeaturedSkillsChange(idx,newSkill,newRating);
                       }}
                       placeholder={`Featured Skill ${idx + 1}`}
                       circleColor={themeColor}
                       />
                   ))}
            </div>
        </Form>
    );
};