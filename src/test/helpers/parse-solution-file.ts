import { chain } from "../../util/chain.js";

export const parseSolutionFile = (file: string) =>
    chain(file.split(/\-|\./))
        .then(
            ([dayStr, partStr, ext]) =>
                [Number(dayStr), Number(partStr), ext] as const
        )
        .then(([day, part, ext]) =>
            ext === "js" ? ([day, part] as const) : ([NaN, NaN] as const)
        ).value;
