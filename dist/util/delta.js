export const deltaMap = {
    n: [-1, 0],
    s: [1, 0],
    e: [0, 1],
    w: [0, -1],
};
export const getDelta = ([aX, aY], [bX, bY]) => [bX - aX, bY - aY];
