"use client";
import { ENGLISH_FONT_FAMILIES,NON_ENGLISH_FONT_FAMILIES,NON_ENGLISH_FONT_FAMILY_TO_LANGAUGE, } from "./constants";

const getPreferredNonEnglishFontFamilies=()=>{
    return NON_ENGLISH_FONT_FAMILIES.filter((fontFamily)=>{
        const fontLanguages=NON_ENGLISH_FONT_FAMILY_TO_LANGAUGE[fontFamily];
        const userPreferredLanguages=navigator.languages??[navigator.language];
        return userPreferredLanguages.some((preferredLanguage)=>
        fontLanguages.includes(preferredLanguage)
    );
    });
};

export const getAllFontFamiliesToLoad=()=>{
    return[...ENGLISH_FONT_FAMILIES, ...getPreferredNonEnglishFontFamilies()];
};