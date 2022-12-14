import { makeInput } from "../../src/util/make-input.js";

export default function generate() {
    const MATRIX_SIZE = 1000;

    const result = Array.from({ length: MATRIX_SIZE }, () =>
        Array.from({ length: MATRIX_SIZE }, () =>
            Math.floor(Math.random() * 10)
        ).join("")
    ).join("\n");

    return makeInput(8, result);
}

generate();
