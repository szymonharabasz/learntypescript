"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currency = void 0;
var Currency;
(function (Currency) {
    let DEFAULT = 'USD';
    function from(value, unit = DEFAULT) {
        return { unit, value };
    }
    Currency.from = from;
})(Currency = exports.Currency || (exports.Currency = {}));
//# sourceMappingURL=Currency.js.map