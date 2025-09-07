import { BaseForm } from "../Form";
import { InputGroupWrapper } from "../Form/InputGroup";
import { THEME_COLORS } from "./constants";
import { InlineInput } from "./InlineInput";
import { DocumentSizeSelections,FontFamilySelectionsCSR,FontSizeSelections } from "./Selection";
import { DEFAULT_THEME_COLOR,
    type GeneralSetting,
 } from "@/app/lib/zustand/store";
import { useSettings,useStoreActions } from "@/app/lib/zustand/store";
import type { FontFamily } from "@/components/fonts/constants";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export const ThemeForm = () => {
  const settings = useSettings();
  const { changeSettings } = useStoreActions();
  const { fontSize, fontFamily, documentSize } = settings;
  const themeColor = settings.themeColor || DEFAULT_THEME_COLOR;

  const handleSettingsChange = (field: GeneralSetting, value: string) => {
    changeSettings({ field, value });
  };

  return (
    <BaseForm>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Cog6ToothIcon className="h-6 w-6 text-gray-600" aria-hidden="true" />
          <h1 className="text-lg font-semibold tracking-wide text-gray-900 ">
            Resume Setting
          </h1>
        </div>
        <div>
          <InlineInput
            label="Theme Color"
            name="themeColor"
            value={settings.themeColor}
            placeholder={DEFAULT_THEME_COLOR}
            onChange={handleSettingsChange}
            inputStyle={{ color: themeColor }}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {THEME_COLORS.map((color, idx) => (
              <div
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm text-white"
                style={{ backgroundColor: color }}
                key={idx}
                onClick={() => handleSettingsChange("themeColor", color)}
                onKeyDown={(e) => {
                  if (["Enter", " "].includes(e.key))
                    handleSettingsChange("themeColor", color);
                }}
                tabIndex={0}
              >
                {settings.themeColor === color ? "✓" : ""}
              </div>
            ))}
          </div>
        </div>
        <div>
          <InputGroupWrapper label="Font Family" />
          <FontFamilySelectionsCSR
            selectedFontFamily={fontFamily}
            themeColor={themeColor}
            handleSettingsChange={handleSettingsChange}
          />
        </div>
        <div>
          <InlineInput
            label="Font Size (pt)"
            name="fontSize"
            value={fontSize}
            placeholder="11"
            onChange={handleSettingsChange}
          />
          <FontSizeSelections
            fontFamily={fontFamily as FontFamily}
            themeColor={themeColor}
            selectedFontSize={fontSize}
            handleSettingsChange={handleSettingsChange}
          />
        </div>
        <div>
          <InputGroupWrapper label="Document Size" />
          <DocumentSizeSelections
            themeColor={themeColor}
            selectedDocumentSize={documentSize}
            handleSettingsChange={handleSettingsChange}
          />
        </div>
      </div>
    </BaseForm>
  );
};
