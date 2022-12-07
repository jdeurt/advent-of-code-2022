import { readdir } from "node:fs/promises";

import { known } from "./known.js";
import { getInput } from "./util/get-input.js";
import { perfTest } from "./util/perf-test.js";

const solutionsDir = await readdir("./solutions");

const solutions = {};

for (const fileName of solutionsDir) {
    if (!fileName.endsWith(".js")) {
        continue;
    }

    const input = await getInput(fileName.split("-")[0]);

    const solution = await import(`./solutions/${fileName}`).then(
        ({ default: builder }) => builder(input)
    );

    solutions[fileName.split(".")[0]] = solution;
}

// Run performance tests
for (const [name, fn] of Object.entries(solutions)) {
    perfTest(name, fn, known[name]);
}
