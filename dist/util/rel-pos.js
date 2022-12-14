export const relativePosition = ([aX, aY], [bX, bY]) => [
    Math.abs(aX - bX),
    Math.abs(aY - bY),
];
