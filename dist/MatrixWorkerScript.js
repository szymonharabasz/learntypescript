"use strict";
exports.__esModule = true;
var worker_threads_1 = require("worker_threads");
var MatrixProtocol_1 = require("./MatrixProtocol");
function eventHandler(event) {
    var m1 = event.args[0];
    var m2 = event.args[1];
    switch (event.command) {
        case 'determinant': worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({ data: MatrixProtocol_1.determinant(m1) });
        case 'out-product': worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({ data: MatrixProtocol_1.outProduct(m1, m2) });
        case 'invert': worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({ data: MatrixProtocol_1.invert(m1) });
    }
    worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.close();
}
worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.on("message", eventHandler);
