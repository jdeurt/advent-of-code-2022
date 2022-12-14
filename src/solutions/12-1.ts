import type { SolutionBuilder } from "../types/solution.js";
import { Matrix } from "../util/matrix.js";
import { Queue } from "../util/queue.js";

enum Position {
    START = "S".charCodeAt(0),
    END = "E".charCodeAt(0),
}

const getCharCode = (char: string) => char.charCodeAt(0);

const getAdjecent = ([row, col]: [number, number]) =>
    [
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1],
    ] as const;

const makeMarker = (m: Matrix<number>, startPos: [number, number]) => {
    let currPos = startPos;

    return {
        isValidMove: (newPos: readonly [number, number]) => {
            let curr = m.at(currPos) ?? -Infinity;
            let next = m.at(newPos) ?? Infinity;

            if (curr === Position.START) {
                curr = 97; // "a"
            }

            if (next === Position.END) {
                next = 122; // "z"
            }

            return next <= curr + 1;
        },
        moveTo: (newPos: readonly [number, number]) => {
            currPos = [...newPos];
        },
        currPos: () => currPos,
        currVal: () => m.at(currPos),
    };
};

export const build: SolutionBuilder = (input) => {
    const heightsCharMatrix = Matrix.from(input);

    return () => {
        const heights = heightsCharMatrix.map(getCharCode);

        const marker = makeMarker(
            heights,
            heights.findIndex((height) => height === Position.START)
        );

        const visited = new Set<string>([String(marker.currPos())]);
        const queue = new Queue<readonly [number, number, number]>([
            [...marker.currPos(), 0],
        ]);

        for (const [row, col, depth] of queue) {
            marker.moveTo([row, col]);

            const currVal = marker.currVal();

            if (currVal === Position.END) {
                return depth;
            }

            const moves = getAdjecent([row, col]);

            for (const move of moves) {
                if (marker.isValidMove(move) && !visited.has(String(move))) {
                    visited.add(String(move));
                    queue.enqueue([...move, depth + 1]);
                }
            }
        }

        return -1;
    };
};
