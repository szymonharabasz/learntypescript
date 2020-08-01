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