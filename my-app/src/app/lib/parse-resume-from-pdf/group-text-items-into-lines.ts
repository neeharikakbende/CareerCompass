import { BULLET_POINTS } from "./extract-resume-from-sections/lib/bullet-points";
import type { TextItems, Line, Lines } from "./types";

export const groupTextItemsIntoLines = (textItems : TextItems): Lines => {
    const lines:Lines=[];
    let line: Line = [];
    for (let item of textItems) {
        if (item.hasEOL) {
            if(item.text.trim() !== "") {
                line.push({ ...item });
            }
            lines.push(line);
            line = [];
        }

        else if (item.text.trim() !== "") {
          line.push({ ...item });  
        }
    }
    if (line.length > 0) {
        lines.push(line);
    }

    const typicalCharWidth = getTypicalCharWidth(lines.flat());
    for (let line of lines) {
        for (let i = line.length - 1; i > 0; i--) {
            const currentItem = line[i];
            const leftItem = line[i - 1];
            const leftItemXEnd = leftItem.x + leftItem.width;
            const distance = currentItem.x - leftItemXEnd;
            if (distance <= typicalCharWidth) {
                if (shouldAddSpaceBetweenText(leftItem.text, currentItem.text)) {
                   leftItem.text += " "; 
                }
                leftItem.text += currentItem.text;
                const currentItemXEnd = currentItem.x + currentItem.width;
                leftItem.width = currentItemXEnd - leftItem.x;
                line.splice(i, 1);
            }
        }
    }

    return lines;
};

const shouldAddSpaceBetweenText = (leftText: string, rightText: string) => {
    const leftTextEnd = leftText[leftText.length - 1];
    const righttextStart = rightText[0];
    const conditions = [
        [":", ",", "|", ".", ...BULLET_POINTS].includes(leftTextEnd) &&
          righttextStart !== " ",
        leftTextEnd !== " " && ["|", ...BULLET_POINTS].includes  
    ]
}