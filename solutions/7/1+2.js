import { getInput } from "../inputs/get-day-input.js";

const input = getInput(7);

function makeScanner(input) {
    let currentIndex = 0;

    const scanner = {
        nextToken: (dry = false) => {
            let token = "";

            let i = currentIndex;
            while (
                input[i] !== " " &&
                input[i] !== "\n" &&
                input[i] !== undefined
            ) {
                token += input[i++];
            }

            i++; // space/newline

            if (!dry) {
                currentIndex = i;
            }

            return token;
        },
        hasNext: () => currentIndex < input.length,
    };

    return scanner;
}

const dirTree = {
    _size: 0,
    _type: "dir",
};

const scanner = makeScanner(input);

let currTreePath = [dirTree];
let currCmd = "";

const p1 = performance.now();

while (scanner.hasNext()) {
    if (currCmd === "") {
        scanner.nextToken(); // Should always be start of command ($)
        currCmd = scanner.nextToken();

        continue;
    }

    if (currCmd === "cd") {
        const target = scanner.nextToken();

        if (target === "/") {
            currTreePath = [dirTree];
        } else if (target === "..") {
            currTreePath.pop();
        } else {
            currTreePath.at(-1)[target] ??= {
                _size: 0,
                _type: "dir",
            };

            currTreePath.push(currTreePath.at(-1)[target]);
        }

        currCmd = "";
    } else if (currCmd === "ls") {
        while (scanner.hasNext() && scanner.nextToken(true) !== "$") {
            const [sizeStr, target] = [
                scanner.nextToken(),
                scanner.nextToken(),
            ];

            const size = Number(sizeStr);

            if (Number.isNaN(size)) {
                currTreePath.at(-1)[target] ??= {
                    _size: 0,
                    _type: "dir",
                };

                continue;
            }

            currTreePath.at(-1)[target] ??= {
                _size: size,
                _type: "file",
            };

            for (const ref of currTreePath) {
                ref._size += size;
            }
        }

        currCmd = "";
    }
}

// 1
const sizes = [];

// 2
const spaceLeft = 70000000 - dirTree._size;
const spaceNeeded = 30000000 - spaceLeft;
let spaceFound = Infinity;

const queue = [dirTree];

while (queue.length) {
    const curr = queue.shift();

    for (const [key, val] of Object.entries(curr)) {
        if (key === "_size" || key === "_type") {
            continue;
        }

        if (val._size <= 100000 && val._type === "dir") {
            sizes.push(val._size);
        }

        if (val._size < spaceFound && val._size >= spaceNeeded) {
            spaceFound = val._size;
        }

        queue.push(val);
    }
}

const p2 = performance.now();

console.log(
    "pt1",
    sizes.reduce((a, b) => a + b)
);
console.log("pt2", spaceFound);
console.log("took", p2 - p1, "ms");
