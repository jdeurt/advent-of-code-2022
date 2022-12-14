import { Matrix } from "../util/matrix.js";
import { Queue } from "../util/queue.js";
var Position;
(function (Position) {
    Position[Position["START"] = "S".charCodeAt(0)] = "START";
    Position[Position["END"] = "E".charCodeAt(0)] = "END";
    Position[Position["LOWEST"] = "a".charCodeAt(0)] = "LOWEST";
    Position[Position["HIGHEST"] = "z".charCodeAt(0)] = "HIGHEST";
})(Position || (Position = {}));
const getCharCode = (char) => char.charCodeAt(0);
const getAdjecent = ([row, col]) => [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
];
const isValidMove = (from, to) => {
    if (from === undefined || to === undefined) {
        return false;
    }
    const remap = {
        [Position.START]: Position.LOWEST,
        [Position.END]: Position.HIGHEST,
    };
    from = remap[from] ?? from;
    to = remap[to] ?? to;
    return to <= from + 1;
};
export const build = (input) => {
    const heightsCharMatrix = Matrix.from(input);
    return () => {
        const heights = heightsCharMatrix.map(getCharCode);
        const startingPositions = heights.findAllIndexes((height) => height === Position.LOWEST);
        const possibleDepths = [];
        for (const startingPosition of startingPositions) {
            let currPos = startingPosition;
            const visited = {};
            const queue = new Queue([[...startingPosition, 0]]); // perf-optimized queue for larger datasets
            for (const [row, col, depth] of queue) {
                currPos = [row, col];
                const currVal = heights.at(currPos); // validation done before adding to queue
                if (currVal === Position.END) {
                    possibleDepths.push(depth);
                    break;
                }
                for (const move of getAdjecent(currPos)) {
                    if (isValidMove(currVal, heights.at(move)) &&
                        visited[String(move)] !== true) {
                        visited[String(move)] = true;
                        queue.enqueue([...move, depth + 1]);
                    }
                }
            }
        }
        return Math.min(...possibleDepths);
    };
};
