export const d = {
    n: [-1, 0],
    s: [1, 0],
    e: [0, 1],
    w: [0, -1],
};
export const getAdjecent = (matrix, [r, c]) => ({
    n: matrix[r - 1]?.[c],
    s: matrix[r + 1]?.[c],
    e: matrix[r]?.[c + 1],
    w: matrix[r]?.[c - 1],
});
export function getAdjecentCoords([r, c], direction) {
    const [dX, dY] = d[direction];
    return [r + dX, c + dY];
}
