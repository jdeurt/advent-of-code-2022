export const mean = (a, b) => (a + b) / 2;
export function fastAbs(n) {
    const mask = n >> 7;
    return (n + mask) ^ mask;
}
export const nSqrt = (x, p = 0.01) => {
    const isApproxRoot = (est) => fastAbs(est * est - x) <= p;
    const iter = (est) => isApproxRoot(est) ? est : iter(mean(est, x / est));
    return iter(1);
};
export const clamp = (x, min, max) => {
    return x < min ? min : x > max ? max : x;
};
export const remap = (x, xMin, xMax, yMin, yMax) => {
    const mapped = ((x - xMin) * (yMax - yMin)) / (xMax - xMin) + yMin;
    return clamp(mapped, yMin, yMax);
};
