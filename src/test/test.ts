import { readdir } from "node:fs/promises";
import Benchmark from "benchmark";

import { known } from "./config/known.js";
import { loadInput } from "./helpers/load-input.js";
import { softFail } from "../util/soft-fail.js";
import { loadSolution } from "./helpers/load-solution.js";
import type { SolutionRunner } from "../types/solution.js";
import { parseSolutionFile } from "./helpers/parse-solution-file.js";
import { parseInputFile } from "./helpers/parse-input-file.js";
import { CycleEventTarget } from "../types/benchmark.js";
import chalk from "chalk";
import { stringBuilder } from "../util/string-builder.js";

const INPUT_TYPE = process.argv[2]?.toLowerCase();

const inputs: Record<number, string> = {};
const solutions: Record<`${number}-${number}`, SolutionRunner> = {};

// Load inputs
for (const file of await readdir("./shared/inputs/actual")) {
    const [day] = parseInputFile(file);
    const input = await softFail(loadInput(day, INPUT_TYPE));

    if (!input) {
        continue;
    }

    inputs[day] = input;
}

// Load solutions
for (const file of await readdir("./dist/solutions")) {
    const [day, part] = parseSolutionFile(file);
    const solution = await softFail(loadSolution(day, part, inputs[day]));

    if (!solution) {
        continue;
    }

    solutions[`${day}-${part}`] = solution;
}

// Run performance tests
const suite = new Benchmark.Suite();

for (const [name, solution] of Object.entries(solutions)) {
    suite.add(name, solution);
}

console.log("Running tests...\n");
suite
    .on("cycle", ({ target }: { target: CycleEventTarget }) => {
        const { name, fn } = target;

        const expected = known[name];
        const result = String(fn());

        const periodMs = target.times.period * 1000;
        const periodUs = periodMs * 1000;

        const logStr = stringBuilder("[")
            .append(
                expected === undefined
                    ? chalk.gray("????")
                    : known[name] === result
                    ? chalk.green("PASS")
                    : chalk.red("FAIL")
            )
            .append("] ")
            .append(String(target))
            .append(
                expected === undefined || result === expected
                    ? `\n       got ${chalk.bold.green(result)} `
                    : `\n       expected ${chalk.bold.green(
                          expected
                      )} got ${chalk.bold.red(result)} `
            )
            .append(
                `in ~${periodMs.toFixed(4)} ms (${periodUs.toFixed(4)} µs)\n`
            ).value;

        console.log(logStr);
    })
    .run();

[];
