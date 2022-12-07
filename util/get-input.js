import { readFile } from "node:fs/promises";

import { noop } from "./noop.js";

/**
 * @param {number} day
 * @param {{ type: "string" | "array" }} options
 * @returns {Promise<string | string[]>}
 */
export const getInput = (day, { type } = { type: "string" }) =>
    readFile(`./inputs/${day}.txt`, "utf8")
        .then((str) => str.trim())
        .then(type === "array" ? (str) => str.split("\n") : noop);
