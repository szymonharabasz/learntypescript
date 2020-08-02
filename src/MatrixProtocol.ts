export type Matrix = number[][]
export type MatrixProtocol = {
    determinant: {
        in: [Matrix]
        out: number
    }
    'out-product': {
        in: [Matrix, Matrix]
        out: Matrix
    }
    invert: {
        in: [Matrix]
        out: Matrix
    }
}
export type Protocol = {
    [command: string]: {
        in: unknown[]
        out: unknown
    }
}


function immutableDelete<T>(arr: T[], index: number): T[] {
    return arr.slice(0,index).concat(arr.slice(index+1))
}

function minor(m: Matrix, i: number, j: number): Matrix {
    const result = immutableDelete(m, i).map(vec => immutableDelete(vec, j))
    return result
}

let isSquare = (m: Matrix) => m.every(row => row.length == m.length)
let coElement = (m: Matrix, i: number, j: number) => Math.pow(-1,i + 1 + j + 1)*determinant(minor(m, i, j))
let range = (n: number) => Array.from(Array(n).keys())

export function determinant(m: Matrix): number {
    if (!isSquare(m)) throw new Error("Not a square matrix.")
    if (m.length === 1) return m[0][0]
    if (m.length === 2) return m[0][0]*m[1][1] - m[1][0]*m[0][1]
    return range(m.length)
        .map(i => m[0][i]*coElement(m, 0, i))
        .reduce((a, b) => a+b)
}

export function invert(m: Matrix): Matrix {
    if (!isSquare(m)) throw new Error("Not a square matrix.")
    const det = determinant(m)
    if (det === 0) throw new Error("Singular matrix.")
    const N = m.length
    return range(N).map(i => range(N).map(j => coElement(m, j, i)/det)) // j, i -> transposition
}

export function outProduct(m1: Matrix, m2: Matrix | undefined): Matrix {
    if (m2 === undefined) throw new Error("Second operand not provided")
    const M1:number = m1.length
    const M2:number = m2.length
    const N1:number = m1[0].length
    const N2:number = m2[0].length

    return range(M1 * M2).map(i => range(N1 * N2).map(j => {
        return m1[i % M1][j % N1] * m2[Math.floor(i / M2)][Math.floor(j / N2)]
    }))

}
