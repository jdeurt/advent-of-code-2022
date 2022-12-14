import { writeFile } from "node:fs/promises";
export const makeInput = (day, content) => writeFile(`./inputs/generated/${day}.txt`, content);
