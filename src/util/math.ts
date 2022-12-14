export const mean = (a: number, b: number) => (a + b) / 2;

export function fastAbs(n: number) {
    const mask = n >> 7;

    return (n + mask) ^ mask;
}

export const nSqrt = (x: number, p = 0.01) => {
    const isApproxRoot = (est: number) => fastAbs(est * est - x) <= p;
    const iter = (est: number): number =>
        isApproxRoot(est) ? est : iter(mean(est, x / est));

    return iter(1);
};

export const clamp = (x: number, min: number, max: number) => {
    return x < min ? min : x > max ? max : x;
};

export const remap = (
    x: number,
    xMin: number,
    xMax: number,
    yMin: number,
    yMax: number
) => {
    const mapped = ((x - xMin) * (yMax - yMin)) / (xMax - xMin) + yMin;

    return clamp(mapped, yMin, yMax);
};
