export class Matrix {
    data;
    constructor(data) {
        this.data = data;
    }
    static from(arrOrStr, colSeparator = "") {
        if (typeof arrOrStr === "string") {
            return new Matrix(arrOrStr.split("\n").map((row) => row.split(colSeparator)));
        }
        return new Matrix(arrOrStr);
    }
    get size() {
        return [this.data.length, this.data[0].length];
    }
    at([r, c]) {
        return this.data[r]?.[c];
    }
    map(cb) {
        return Matrix.from(this.data.map((row, rowIndex) => row.map((elem, colIndex) => cb(elem, [rowIndex, colIndex], this))));
    }
    forEach(cb) {
        return this.data.forEach((row, rowIndex) => row.forEach((elem, colIndex) => cb(elem, [rowIndex, colIndex], this)));
    }
    find(cb) {
        const [rows, cols] = this.size;
        let result = undefined;
        for (let i = 0; i < rows; i++) {
            if (result !== undefined) {
                break;
            }
            for (let j = 0; j < cols; j++) {
                if (cb(this.data[i][j], [i, j], this)) {
                    result = this.data[i][j];
                    break;
                }
            }
        }
        return result;
    }
    findIndex(cb) {
        const [rows, cols] = this.size;
        let index = [-1, -1];
        for (let i = 0; i < rows; i++) {
            if (index[0] !== -1) {
                break;
            }
            for (let j = 0; j < cols; j++) {
                if (cb(this.data[i][j], [i, j], this)) {
                    index = [i, j];
                    break;
                }
            }
        }
        return index;
    }
    findAllIndexes(cb) {
        const [rows, cols] = this.size;
        const indexes = [];
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (cb(this.data[i][j], [i, j], this)) {
                    indexes.push([i, j]);
                }
            }
        }
        return indexes;
    }
    getAdjecent([r, c]) {
        return {
            n: this.data[r - 1]?.[c],
            s: this.data[r + 1]?.[c],
            e: this.data[r]?.[c + 1],
            w: this.data[r]?.[c - 1],
        };
    }
}
