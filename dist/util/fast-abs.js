export function fastAbs(n) {
    const mask = n >> 7;
    return (n + mask) ^ mask;
}
