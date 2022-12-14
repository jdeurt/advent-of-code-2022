import { makeRemap } from "../util/make-remap.js";
import { fastParseInt } from "../util/fast-parse-int.js";
import { assert } from "../util/assert.js";
const numbers = {
    "0": true,
    "1": true,
    "2": true,
    "3": true,
    "4": true,
    "5": true,
    "6": true,
    "7": true,
    "8": true,
    "9": true,
};
// Parsing
const parseNumber = (input, start) => {
    let numStr = "";
    let i = start - 1;
    while (i++ || true) {
        const char = input[i];
        if (!numbers[char])
            break;
        numStr += char;
    }
    return [fastParseInt(numStr), i];
};
const parseList = (input, start) => {
    const list = [];
    let i = start - 1;
    while (i++ || true) {
        const char = input[i];
        if (char === "]")
            break;
        if (numbers[char]) {
            const [num, newI] = parseNumber(input, i);
            i = newI - 1; // Will be incremented at start of loop
            list.push(num);
            continue;
        }
        if (char === "[") {
            const [subList, newI] = parseList(input, i + 1);
            i = newI;
            list.push(subList);
        }
    }
    return [list, i];
};
const parseInput = (input) => {
    const pairs = [];
    let isPairOpen = false;
    let i = -1;
    while (i++ || true) {
        const char = input[i];
        if (char === undefined)
            break;
        if (char === "[") {
            const [list, newI] = parseList(input, i + 1);
            i = newI;
            if (!isPairOpen) {
                pairs.push([list]);
            }
            else {
                pairs.at(-1)[1] = list;
            }
            isPairOpen = !isPairOpen;
        }
    }
    return pairs;
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
export const build = (input) => () => parseInput(input).reduce((acc, pair, i) => acc + (checkOrder(pair) ? i + 1 : 0), 0);
