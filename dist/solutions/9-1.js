import { chain } from "../util/chain.js";
import { fastAbs } from "../util/fast-abs.js";
import { relativePosition } from "../util/rel-pos.js";

export default function build(input) {
    /**
     * @type {["U" | "D" | "L" | "R", number][]}
     */
    const instructions = input
        .split("\n")
        .map((instr) => instr.split(" "))
        .map(([dir, amt]) => [dir, Number(amt)]);

    return function run() {
        const seen = {
            0: {
                0: true,
            },
        };
        const updateSeen = ([x, y]) => {
            seen[x] ??= {};
            seen[x][y] = true;
        };

        let headLocation = [0, 0];
        let tailLocation = [0, 0];

        const isTouching = () =>
            chain(relativePosition(headLocation, tailLocation)).then(
                ([relX, relY]) => relX <= 1 && relY <= 1
            ).value;

        for (const [dir, amt] of instructions) {
            for (let i = 0; i < amt; i++) {
                const [hX, hY] = headLocation;
                const [tX, tY] = tailLocation;

                if (dir === "U") headLocation = [hX, hY + 1];
                if (dir === "D") headLocation = [hX, hY - 1];
                if (dir === "L") headLocation = [hX - 1, hY];
                if (dir === "R") headLocation = [hX + 1, hY];

                const [dX, dY] = relativePosition(headLocation, tailLocation); // offset
                const [sDX, sDY] = [
                    dX / (fastAbs(dX) || 1),
                    dY / (fastAbs(dY) || 1),
                ]; // sign

                // I'm drunk this might be stupid
                for (
                    let [jX, jY] = [1, 1];
                    jX <= dX && jY <= dY;
                    jX < dX && jX++, jY < dY && jY++
                ) {
                    if (!isTouching()) {
                        tailLocation = [tX + sDX, tY + sDY];
                    }
                }

                updateSeen(tailLocation);

                debugger;
            }
        }

        return Object.keys(seen).reduce(
            (acc, curr) => acc + Object.keys(curr).length,
            0
        );
    };
}
