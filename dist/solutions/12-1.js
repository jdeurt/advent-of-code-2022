import { Matrix } from "../util/matrix.js";
import { Queue } from "../util/queue.js";
var Position;
(function (Position) {
    Position[Position["START"] = "S".charCodeAt(0)] = "START";
    Position[Position["END"] = "E".charCodeAt(0)] = "END";
})(Position || (Position = {}));
const getCharCode = (char) => char.charCodeAt(0);
const getAdjecent = ([row, col]) => [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
];
const makeMarker = (m, startPos) => {
    let currPos = startPos;
    return {
        isValidMove: (newPos) => {
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
        moveTo: (newPos) => {
            currPos = [...newPos];
        },
        currPos: () => currPos,
        currVal: () => m.at(currPos),
    };
};
export const build = (input) => {
    const heightsCharMatrix = Matrix.from(input);
    return () => {
        const heights = heightsCharMatrix.map(getCharCode);
        const marker = makeMarker(heights, heights.findIndex((height) => height === Position.START));
        const visited = new Set([String(marker.currPos())]);
        const queue = new Queue([
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
