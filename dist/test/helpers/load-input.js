import { readFile } from "node:fs/promises";
export const loadInput = (day, type) => readFile(`./shared/inputs/${type ? type + "/" : ""}${day}.txt`, "utf8").then((str) => str.trim());
