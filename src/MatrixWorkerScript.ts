import { workerData, parentPort } from 'worker_threads';
import { Protocol, MatrixProtocol, Matrix, determinant, outProduct, invert } from "./MatrixProtocol"

function eventHandler<T extends keyof MatrixProtocol, U extends MatrixProtocol[T]['in']>
(event: { command: T, args: U }) {
    const m1: Matrix = event.args[0]
    const m2: Matrix | undefined = event.args[1]
    
    switch(event.command) {
        case 'determinant': parentPort?.postMessage({data: determinant(m1)})
        case 'out-product': parentPort?.postMessage({data: outProduct(m1, m2)})
        case 'invert': parentPort?.postMessage({data: invert(m1)})
    }
    parentPort?.close()
}
parentPort?.on("message", eventHandler)
