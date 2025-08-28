const SANS_SERIF_ENGLISH_FONT_FAMILIES=[
    "Roboto",
    "Lato",
    "Montserrat",
    "OpenSans",
    "Raleway",
] as const;

const SERIF_ENGLISH_FONT_FAMILIES =[
    "Caladea",
    "Lora",
    "RobotoSlab",
    "PlayfairDisplay",
    "Merriweather",
] as const;

export const ENGLISH_FONT_FAMILIES=[
    ...SANS_SERIF_ENGLISH_FONT_FAMILIES,
    ...SERIF_ENGLISH_FONT_FAMILIES,
];
type EnglishFontFamily=(typeof ENGLISH_FONT_FAMILIES)[number];

export const NON_ENGLISH_FONT_FAMILIES=["NotoSansSC"] as const;
type NonEnglishFontFamily=(typeof NON_ENGLISH_FONT_FAMILIES)[number];

export const NON_ENGLISH_FONT_FAMILY_TO_LANGAUGE:Record<
NonEnglishFontFamily,
string[]
> = {
    NotoSansSC:["zh","zh-CN","zh_TW"],
};

export type FontFamily = EnglishFontFamily | NonEnglishFontFamily;
export const FONT_FAMILY_TO_STANDARD_SIZE_IN_PT: Record<FontFamily,number>={
    Roboto:11,
    Lato:11,
    Montserrat:10,
    OpenSans:10,
    Raleway:10,
    Caladea:11,
    Lora:11,
    RobotoSlab:10,
    PlayfairDisplay:10,
    Merriweather:10,
    NotoSansSC:11,
};

export const FONT_FAMILY_TO_DISPLAY_NAME:Record<FontFamily, string> ={
    Roboto:"Roboto",
    Lato: "Lato",
  Montserrat: "Montserrat",
  OpenSans: "Open Sans",
  Raleway: "Raleway",
  Caladea: "Caladea",
  Lora: "Lora",
  RobotoSlab: "Roboto Slab",
  PlayfairDisplay: "Playfair Display",
  Merriweather: "Merriweather",
  NotoSansSC: "思源黑体(简体)",
};