/**
 * @template T
 * @param {T[][]} matrix
 * @returns {T[][]}
 */
export function transpose(matrix) {
    return matrix[0].map((_, i) => matrix.map((row) => row[i]));
}
