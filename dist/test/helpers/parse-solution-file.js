import { chain } from "../../util/chain.js";
export const parseSolutionFile = (file) => chain(file.split(/\-|\./))
    .then(([dayStr, partStr, ext]) => [Number(dayStr), Number(partStr), ext])
    .then(([day, part, ext]) => ext === "js" ? [day, part] : [NaN, NaN]).value;
