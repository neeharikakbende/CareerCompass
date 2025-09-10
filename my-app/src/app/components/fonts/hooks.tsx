/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import {Font} from "@react-pdf/renderer";
import { ENGLISH_FONT_FAMILIES } from "./constants";
import { getAllFontFamiliesToLoad } from "./lib";

export const useRegisterReactPDFFont=() => {
    useEffect(() => {
        const allFontFamilies=getAllFontFamiliesToLoad();
        allFontFamilies.forEach((fontFamily) => {
            Font.register({
                family:fontFamily,
                fonts:[
                    {
                        src:`/fonts/${fontFamily}-Regular.ttf`,
                    },
                    {
                        src:`/fonts/${fontFamily}-Bold.ttf`,
                        fontWeight:"bold",
                    },
                ],
            });
        });
    }, []);
};

export const useRegisterReactPDFHyphenationCallback=(fontFamily:string)=>{
    useEffect(() => {
        if (ENGLISH_FONT_FAMILIES.includes(fontFamily as any)) {
            Font.registerHyphenationCallback((word: any) => [word]);
        } else {
            Font.registerHyphenationCallback((word: string) =>
            word
               .split("")
               .map((char: any) =>[char,""])
               .flat()
        );
        }
    }, [fontFamily]);
};