import { writeFile } from "node:fs/promises";

export const makeInput = (day: number, content: string) =>
    writeFile(`./shared/inputs/generated/${day}.txt`, content);
