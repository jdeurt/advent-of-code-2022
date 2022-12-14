type MatrixMethodCallback<T, R> = (
    elem: T,
    pos: [number, number],
    matrix: Matrix<T>
) => R;

type MatrixIndex = [number, number];

export class Matrix<T> {
    private readonly data: T[][];

    constructor(data: T[][]) {
        this.data = data;
    }

    static from<T>(arr: T[][]): Matrix<T>;
    static from(str: string, colSeparator?: string): Matrix<string>;
    static from<T>(arrOrStr: T[][] | string, colSeparator = "") {
        if (typeof arrOrStr === "string") {
            return new Matrix(
                arrOrStr.split("\n").map((row) => row.split(colSeparator))
            );
        }

        return new Matrix(arrOrStr);
    }

    get size() {
        return [this.data.length, this.data[0].length];
    }

    at([r, c]: Readonly<MatrixIndex>): T | undefined {
        return this.data[r]?.[c];
    }

    map<R>(cb: MatrixMethodCallback<T, R>) {
        return Matrix.from(
            this.data.map((row, rowIndex) =>
                row.map((elem, colIndex) =>
                    cb(elem, [rowIndex, colIndex], this)
                )
            )
        );
    }

    forEach(cb: MatrixMethodCallback<T, void>) {
        return this.data.forEach((row, rowIndex) =>
            row.forEach((elem, colIndex) =>
                cb(elem, [rowIndex, colIndex], this)
            )
        );
    }

    find(cb: MatrixMethodCallback<T, boolean>) {
        const [rows, cols] = this.size;

        let result: T | undefined = undefined;

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

    findIndex(cb: MatrixMethodCallback<T, boolean>) {
        const [rows, cols] = this.size;

        let index: MatrixIndex = [-1, -1];

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

    findAllIndexes(cb: MatrixMethodCallback<T, boolean>) {
        const [rows, cols] = this.size;

        const indexes: MatrixIndex[] = [];

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (cb(this.data[i][j], [i, j], this)) {
                    indexes.push([i, j]);
                }
            }
        }

        return indexes;
    }

    getAdjecent([r, c]: MatrixIndex) {
        return {
            n: this.data[r - 1]?.[c],
            s: this.data[r + 1]?.[c],
            e: this.data[r]?.[c + 1],
            w: this.data[r]?.[c - 1],
        } as const;
    }
}
