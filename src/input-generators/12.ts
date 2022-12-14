import { makeInput } from "../util/make-input.js";

// Modified version of https://github.com/ClemDelp/heightmap-generator

type Matrix = number[][];

function generateNoise(squareSize: number, level: number): Matrix {
    const noiseArr: Matrix = [];
    const nbre = 100;

    for (let i = 0; i <= nbre; i++) {
        noiseArr[i] = [];

        for (let j = 0; j <= nbre; j++) {
            const height =
                i === 0 || j === 0 || i === nbre || j === nbre
                    ? 1
                    : Math.random();

            noiseArr[i][j] = height;
        }
    }

    return flatten(interpolate(noiseArr, squareSize), level);
}

function interpolate(points: Matrix, squareSize: number) {
    const noiseArr: Matrix = [];
    const size = squareSize * 50;

    let x = 0;
    let y = 0;

    for (let i = 0; i < size; i++) {
        if (i != 0 && i % squareSize == 0) x++;

        noiseArr[i] = [];

        for (let j = 0; j < size; j++) {
            if (j != 0 && j % squareSize == 0) y++;

            const mu_x = (i % squareSize) / squareSize;
            const mu_x2 = (1 - Math.cos(mu_x * Math.PI)) / 2;
            const int_x1 =
                points[x][y] * (1 - mu_x2) + points[x + 1][y] * mu_x2;
            const int_x2 =
                points[x][y + 1] * (1 - mu_x2) + points[x + 1][y + 1] * mu_x2;
            const mu_y = (j % squareSize) / squareSize;
            const mu_y2 = (1 - Math.cos(mu_y * Math.PI)) / 2;
            const int_y = int_x1 * (1 - mu_y2) + int_x2 * mu_y2;

            noiseArr[i][j] = int_y;
        }

        y = 0;
    }

    return noiseArr;
}

function flatten(points: Matrix, level: number) {
    const maxVal = 1;
    const step = maxVal / level;
    const noiseArr: Matrix = [];

    for (let i = 0; i < points.length; i++) {
        noiseArr[i] = [];

        for (let j = 0; j < points[i].length; j++) {
            for (let k = 0; k <= level; k++) {
                const val = step * k;

                if (val === maxVal) {
                    noiseArr[i][j] = maxVal;

                    break;
                } else if (points[i][j] < val) {
                    noiseArr[i][j] = level + 1 - k;

                    break;
                }
            }
        }
    }

    return noiseArr;
}

const noise = generateNoise(20, 26);

const letterMap = noise
    .map((row) => row.map((val) => String.fromCharCode(96 + val)).join(""))
    .join("\n");

makeInput(12, letterMap);
