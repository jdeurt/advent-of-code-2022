import { chain } from "../../util/chain.js";

export const parseInputFile = (file: string) =>
    chain(file.split(".")).then(
        ([dayStr, ext]) => [Number(dayStr), ext] as const
    ).value;
