import { writeFile } from "node:fs/promises";
export const makeInput = (day, content) => writeFile(`./shared/inputs/generated/${day}.txt`, content);
