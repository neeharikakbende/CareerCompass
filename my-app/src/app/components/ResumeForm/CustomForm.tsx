import { Form } from "./Form";
import { BulletListIconButton } from "./Form/IconButton";
import { BulletListTextarea } from "./Form/InputGroup";
import { useCustom,useShowBulletPoints,useStoreActions } from "@/app/lib/zustand/store";

export const CustomForm = () => {
  const custom = useCustom();
  const { changeCustom, changeShowBulletPoints } = useStoreActions();
  const { descriptions } = custom;
  const form = "custom";
  const showBulletPoints = useShowBulletPoints(form);

  const handleCustomChange = (field: "descriptions", value: string[]) => {
    changeCustom({ field, value });
  };

  const handleShowBulletPoints = (value: boolean) => {
    changeShowBulletPoints({ field: form, value });
  };

  return (
    <Form form={form}>
      <div className="col-span-full grid grid-cols-6 gap-3">
        <div className="relative col-span-full">
          <BulletListTextarea
            label="Custom Textbox"
            labelClassName="col-span-full"
            name="descriptions"
            placeholder="Bullet points"
            value={descriptions}
            onChange={handleCustomChange}
            showBulletPoints={showBulletPoints}
          />
          <div className="absolute left-[7.7rem] top-[0.07rem]">
            <BulletListIconButton
              showBulletPoints={showBulletPoints}
              onClick={handleShowBulletPoints}
            />
          </div>
        </div>
      </div>
    </Form>
  );
};
