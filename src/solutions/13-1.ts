import type { In } from "../types/in.js";
import type { Couple } from "../types/couple.js";
import { SolutionBuilder } from "../types/solution.js";
import { makeRemap } from "../util/make-remap.js";
import { assert } from "../util/assert.js";

interface Packet extends Array<unknown> {
    readonly [n: number]: number | Packet;
}

// Parsing
// JSON.parse is apparently pretty fast
const parseInput = (input: string): Couple<Packet>[] => {
    const lines = input.split("\n");

    const pairs: Couple<Packet>[] = [];
    let currPair: [Packet?, Packet?] = [];

    for (const line of lines) {
        if (line === "") {
            pairs.push(currPair as any);
            currPair = [];
        } else currPair.push(JSON.parse(line));
    }

    pairs.push(currPair as any);

    return pairs;
};

// Order checking
const isNullPair = (pair: Couple<unknown>): pair is Couple<null> =>
    isNumberPair(pair) && pair[0] < 0 && pair[1] < 0 && pair[0] === pair[1];

const isNumberPair = (pair: Couple<unknown>): pair is Couple<number> =>
    typeof pair[0] === "number" && typeof pair[1] === "number";

const fixMismatch = ([a, b]: Couple<In<Packet>>): Couple<number[]> => {
    const remap = makeRemap({
        number: (v: number) => [v],
    });

    assert<any>(a);
    assert<any>(b);

    return [
        remap(typeof a)?.(a < 0 ? a - 1 : a) ?? a,
        remap(typeof b)?.(b < 0 ? b - 1 : b) ?? b,
    ];
};

const checkOrder = ([l, r]: Couple<Packet>, i = 0): boolean | null => {
    const [a, b] = [l[i] ?? -1, r[i] ?? -1];

    if (isNullPair([a, b])) return null;

    if (isNumberPair([a, b])) {
        if (a === b) return checkOrder([l, r], i + 1);
        if (a < b) return true;
        if (a > b) return false;
    }

    const subOrderResult = checkOrder(fixMismatch([a, b]), 0);

    if (subOrderResult === null) {
        return checkOrder([l, r], i + 1);
    }

    return subOrderResult;
};

export const build: SolutionBuilder = (input) => () =>
    parseInput(input).reduce(
        (acc, pair, i) => acc + (checkOrder(pair) ? i + 1 : 0),
        0
    );
