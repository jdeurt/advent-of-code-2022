import { makeRemap } from "../util/make-remap.js";
import { assert } from "../util/assert.js";
// Parsing
const parseInput = (input) => {
    const lines = input.split("\n");
    const packets = [];
    for (const line of lines) {
        if (line !== "")
            packets.push(JSON.parse(line));
    }
    return packets;
};
// Order checking
const isNullPair = (pair) => isNumberPair(pair) && pair[0] < 0 && pair[1] < 0 && pair[0] === pair[1];
const isNumberPair = (pair) => typeof pair[0] === "number" && typeof pair[1] === "number";
const fixMismatch = ([a, b]) => {
    const remap = makeRemap({
        number: (v) => [v],
    });
    assert(a);
    assert(b);
    return [
        remap(typeof a)?.(a < 0 ? a - 1 : a) ?? a,
        remap(typeof b)?.(b < 0 ? b - 1 : b) ?? b,
    ];
};
const checkOrder = ([l, r], i = 0) => {
    const [a, b] = [l[i] ?? -1, r[i] ?? -1];
    if (isNullPair([a, b]))
        return null;
    if (isNumberPair([a, b])) {
        if (a === b)
            return checkOrder([l, r], i + 1);
        if (a < b)
            return true;
        if (a > b)
            return false;
    }
    const subOrderResult = checkOrder(fixMismatch([a, b]), 0);
    if (subOrderResult === null) {
        return checkOrder([l, r], i + 1);
    }
    return subOrderResult;
};
export const build = (input) => () => {
    const div = [[[2]], [[6]]];
    const sorted = [...parseInput(input), div[0], div[1]].sort((a, b) => checkOrder([a, b]) ? -1 : 1);
    return ((sorted.findIndex((v) => v === div[0]) + 1) *
        (sorted.findIndex((v) => v === div[1]) + 1));
};
