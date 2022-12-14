import { getAdjecent, getAdjecentCoords } from "../util/get-adjecent.js";

function calcScenicScore(viewScores) {
    return viewScores.n * viewScores.s * viewScores.w * viewScores.e;
}

export default function build(input) {
    /**
     * @type {{ height: number; viewScores: Record<"n" | "s" | "w" | "e", number> }[][]}
     */
    const forest = input
        .split("\n")
        .map((row) =>
            row
                .split("")
                .map((height) => ({ height: Number(height), viewScores: {} }))
        );

    return function run() {
        const queue = [[0, 0]];
        const seen = {};

        function calcViewScore([r, c], direction) {
            const tree = forest[r][c];

            if (tree.viewScores[direction] !== undefined)
                return tree.viewScores[direction];

            const adj = getAdjecent(forest, [r, c])[direction];
            const adjCoords = getAdjecentCoords([r, c], direction);

            const viewScore =
                tree.height > adj?.height
                    ? calcViewScore(adjCoords, direction) + 1
                    : adj === undefined
                    ? 0
                    : 1;

            tree.viewScores[direction] = viewScore;

            return viewScore;
        }

        while (queue.length > 0) {
            const [r, c] = queue[0];

            if (!seen[r]?.[c]) {
                const { viewScores } = forest[r][c];

                viewScores.n ??= calcViewScore([r, c], "n");
                viewScores.s ??= calcViewScore([r, c], "s");
                viewScores.w ??= calcViewScore([r, c], "w");
                viewScores.e ??= calcViewScore([r, c], "e");

                if (r > 0 && !seen[r - 1]?.[c]) queue.push([r - 1, c]);

                if (r < forest.length - 1 && !seen[r + 1]?.[c])
                    queue.push([r + 1, c]);

                if (c > 0 && !seen[r]?.[c - 1]) queue.push([r, c - 1]);

                if (c < forest[0].length - 1 && !seen[r]?.[c + 1])
                    queue.push([r, c + 1]);

                seen[r] ??= {};
                seen[r][c] = true;
            }

            queue.shift();
        }

        const highestScenicScore = forest.reduce(
            (acc, row) =>
                Math.max(
                    acc,
                    row.reduce(
                        (acc, { viewScores }) =>
                            Math.max(acc, calcScenicScore(viewScores)),
                        0
                    )
                ),
            0
        );

        return highestScenicScore;
    };
}
