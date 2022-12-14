import { assert } from "./assert.js";

type CancellingCallback<T> = (i: number) => [T, boolean?];
type FullRunCallback<T> = (i: number) => T;

export function repeat<T>(cb: CancellingCallback<T>): T[];
export function repeat<T>(cb: FullRunCallback<T>, n: number): T[];
export function repeat<T>(
    cb: CancellingCallback<T> | FullRunCallback<T>,
    n?: number
) {
    const acc: T[] = [];

    let i = 0;

    if (n === undefined) {
        assert<CancellingCallback<T>>(cb);

        while (true) {
            const [result, shouldBreak] = cb(i++);

            acc.push(result);

            if (shouldBreak) {
                break;
            }
        }
    } else {
        assert<FullRunCallback<T>>(cb);

        for (; i < n; i++) {
            acc.push(cb(i));
        }
    }

    return acc;
}
