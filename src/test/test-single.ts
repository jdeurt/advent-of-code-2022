import Benchmark from "benchmark";

import { known } from "./config/known.js";
import { loadInput } from "./helpers/load-input.js";
import { softFail } from "../util/soft-fail.js";
import { loadSolution } from "./helpers/load-solution.js";
import { CycleEventTarget } from "../types/benchmark.js";
import chalk from "chalk";
import { stringBuilder } from "../util/string-builder.js";
import { chain } from "../util/chain.js";

const SOLUTION = chain(process.argv[2]?.split("-")).then(
    ([dayStr, partStr]) => [Number(dayStr), Number(partStr)] as const
).value;
const INPUT_TYPE = process.argv[3]?.toLowerCase();
const WITH_PERF = !!process.env["PERF"];

if (!SOLUTION) {
    throw new Error("No solution day/part provided.");
}

const [day, part] = SOLUTION;

const input = await softFail(loadInput(day, INPUT_TYPE));

if (input === undefined) {
    throw new Error(`No input exists for day ${day}.`);
}

const solution = await softFail(loadSolution(day, part, input));

if (solution === undefined) {
    throw new Error(`No solution exists for ${day}-${part}.`);
}

const expected = known[`${day}-${part}`];
const result = String(solution());

if (WITH_PERF) {
    new Benchmark.Suite()
        .add(`${day}-${part}`, solution)
        .on("cycle", ({ target }: { target: CycleEventTarget }) => {
            const periodMs = target.times.period * 1000;
            const periodUs = periodMs * 1000;

            const logStr = stringBuilder("[")
                .append(
                    expected === undefined
                        ? chalk.gray("????")
                        : expected === result
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
                    `in ~${periodMs.toFixed(4)} ms (${periodUs.toFixed(4)} µs)`
                ).value;

            console.log(logStr);
        })
        .run();
} else {
    const logStr = stringBuilder("[")
        .append(
            expected === undefined
                ? chalk.gray("????")
                : expected === result
                ? chalk.green("PASS")
                : chalk.red("FAIL")
        )
        .append("] ")
        .append(
            expected === undefined || result === expected
                ? `got ${chalk.bold.green(result)} `
                : `expected ${chalk.bold.green(expected)} got ${chalk.bold.red(
                      result
                  )} `
        ).value;

    console.log(logStr);
}
