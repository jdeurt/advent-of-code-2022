export const deltaMap = {
    n: [-1, 0],
    s: [1, 0],
    e: [0, 1],
    w: [0, -1],
};

export const getDelta = (
    [aX, aY]: [number, number],
    [bX, bY]: [number, number]
) => [bX - aX, bY - aY] as const;
