import { readFile } from "node:fs/promises";
export const loadInput = (day, type = "actual") => readFile(`./shared/inputs/${type}/${day}.txt`, "utf8").then((str) => str.trim());
