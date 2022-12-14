import { readFile } from "node:fs/promises";

export const loadInput = (day: number, type: string) =>
    readFile(
        `./shared/inputs/${type ? type + "/" : ""}${day}.txt`,
        "utf8"
    ).then((str) => str.trim());
