import { getInput } from "../util/get-input.js";
import { transpose } from "../util/transpose.js";

export default function build(input) {
    /**
     * @desc  [height, [rowIdx, colIdx]][][]
     * @type {[number, [number, number]][][]}
     */
    const forest = input
        .split("\n")
        .map((row, rowIdx) =>
            row
                .split("")
                .map((height, colIdx) => [Number(height), [rowIdx, colIdx]])
        );

    return function run() {
        const forestT = transpose(forest);

        const grid = {};
        const mark = (x, y) => {
            grid[x] ??= {};
            grid[x][y] = true;
        };
        const isMarked = (x, y) => !!grid[x]?.[y];

        const reducer = ([tallest, visible], [height, [x, y]]) => {
            if (height > tallest) {
                tallest = height;

                if (!isMarked(x, y)) {
                    mark(x, y);
                    visible++;
                }
            }

            return [tallest, visible];
        };

        const h = forest.reduce(
            (acc, row) =>
                acc +
                row.reduce(reducer, [-1, 0])[1] +
                row.reduceRight(reducer, [-1, 0])[1],
            0
        );
        const v = forestT.reduce(
            (acc, col) =>
                acc +
                col.reduce(reducer, [-1, 0])[1] +
                col.reduceRight(reducer, [-1, 0])[1],
            0
        );

        return h + v;
    };
}
