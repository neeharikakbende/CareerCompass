import {useState , useEffect} from "react";
import dynamic from "next/dynamic";
import { getAllFontFamiliesToLoad } from "./lib";

const FontsZhCSR=dynamic(() => import("./FontsZh"), {
   ssr:false, 
});

export const NonEnglishFontsCSSLazyLoader=() => {
    const [shouldLoadFontsZh, setShouldLoadFontsZh] = useState(false);

    useEffect(() => {
        if (getAllFontFamiliesToLoad().includes("NotoSansSC")) {
            setShouldLoadFontsZh(true);
        }
    }, []);
};