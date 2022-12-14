import { assert } from "./assert.js";
export function repeat(cb, n) {
    const acc = [];
    let i = 0;
    if (n === undefined) {
        assert(cb);
        while (true) {
            const [result, shouldBreak] = cb(i++);
            acc.push(result);
            if (shouldBreak) {
                break;
            }
        }
    }
    else {
        assert(cb);
        for (; i < n; i++) {
            acc.push(cb(i));
        }
    }
    return acc;
}
