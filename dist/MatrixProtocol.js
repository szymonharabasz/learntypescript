"use strict";
exports.__esModule = true;
exports.outProduct = exports.invert = exports.determinant = void 0;
function immutableDelete(arr, index) {
    return arr.slice(0, index).concat(arr.slice(index + 1));
}
function minor(m, i, j) {
    var result = immutableDelete(m, i).map(function (vec) { return immutableDelete(vec, j); });
    return result;
}
var isSquare = function (m) { return m.every(function (row) { return row.length == m.length; }); };
var coElement = function (m, i, j) { return Math.pow(-1, i + 1 + j + 1) * determinant(minor(m, i, j)); };
var range = function (n) { return Array.from(Array(n).keys()); };
function determinant(m) {
    if (!isSquare(m))
        throw new Error("Not a square matrix.");
    if (m.length === 1)
        return m[0][0];
    if (m.length === 2)
        return m[0][0] * m[1][1] - m[1][0] * m[0][1];
    return range(m.length)
        .map(function (i) { return m[0][i] * coElement(m, 0, i); })
        .reduce(function (a, b) { return a + b; });
}
exports.determinant = determinant;
function invert(m) {
    if (!isSquare(m))
        throw new Error("Not a square matrix.");
    var det = determinant(m);
    if (det === 0)
        throw new Error("Singular matrix.");
    var N = m.length;
    return range(N).map(function (i) { return range(N).map(function (j) { return coElement(m, j, i) / det; }); }); // j, i -> transposition
}
exports.invert = invert;
function outProduct(m1, m2) {
    if (m2 === undefined)
        throw new Error("Second operand not provided");
    var M1 = m1.length;
    var M2 = m2.length;
    var N1 = m1[0].length;
    var N2 = m2[0].length;
    return range(M1 * M2).map(function (i) { return range(N1 * N2).map(function (j) {
        return m1[i % M1][j % N1] * m2[Math.floor(i / M2)][Math.floor(j / N2)];
    }); });
}
exports.outProduct = outProduct;
