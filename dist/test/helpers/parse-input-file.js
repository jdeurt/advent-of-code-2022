import { chain } from "../../util/chain.js";
export const parseInputFile = (file) => chain(file.split(".")).then(([dayStr, ext]) => [Number(dayStr), ext]).value;
