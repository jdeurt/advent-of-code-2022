export function fastAbs(n: number) {
    const mask = n >> 7;

    return (n + mask) ^ mask;
}
