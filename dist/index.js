"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const Currency_1 = require("./Currency");
const promisify_1 = require("./promisify");
const fs_1 = require("fs");
let catOrDogOrBoth = {
    name: "Bankers",
    purrs: true,
};
let catAndDog = {
    name: "Bankers",
    purrs: false,
    barks: true,
    wags: false
};
// Exercise 3.1
let a = 1042;
let b = 'apples and oranges';
const c = 'pineapples';
let d = [true, true, false];
let e = { type: 'ficus' };
let f = [1, false];
const g = [3];
let h = null;
// Exercise 4.3
class Reservation {
    constructor() {
        this.from = new Date;
        this.to = new Date;
        this.destination = '';
    }
}
let reserve = (fromOrDestination, toOrDestination, destination) => {
    let res = new Reservation;
    if (fromOrDestination instanceof Date) {
        if (toOrDestination instanceof Date && destination !== undefined) {
            res.from = fromOrDestination;
            res.to = toOrDestination;
            res.destination = destination;
        }
        else if (typeof toOrDestination === 'string') {
            res.from = fromOrDestination;
            res.destination = toOrDestination;
        }
    }
    else if (typeof fromOrDestination === 'string') {
        res.from = new Date(Date.now());
        res.to = new Date(Date.now());
        res.destination = fromOrDestination;
    }
    return res;
};
console.log(reserve('Cracow').from);
/*
// Exercise 4.4
function call<T extends unknown[], R>(
    f: (aa: any, bb: string, ...argz: T) => R,
    a: any,
    b: string,
    ...args: T
): R {
    return f(a, b, ...args);
}

function fill(length: number, value: string): string[] {
    return Array.from({length}, () => value)
}
function fill2(length: number, value: number): number[] {
    return Array.from({length}, () => value)
}

let aa = call(fill2, 10, 'a')
let bb = call(fill, 10, 20)
console.log(aa)
*/
// Exercise 4.5
function is(...args) {
    return args.slice(1).every(_ => _ === args[0]);
}
assert_1.default(is('string', 'otherstring') === false);
assert_1.default(is(true, false) === false);
assert_1.default(is(42, 42) === true);
//is (10 'foo'); // error TS2345 as it should be
assert_1.default(is([1], [1, 2], [1, 2, 3]) === false);
// Exercise 5.2
class Base {
    constructor(a) {
        this.f = () => {
            console.log('base: ', this.value);
        };
        this.value = a;
    }
}
class Derived extends Base {
    constructor(a) {
        super(a);
        this.f = () => {
            console.log('derived', this.value);
        };
    }
}
let derived = new Derived(4);
derived.f();
let base = new Derived(4);
base.f();
class BalletFlat {
    constructor() {
        this.purpose = 'dancing';
    }
}
class Boot {
    constructor() {
        this.purpose = 'woodcutting';
    }
}
class Sneaker {
    constructor() {
        this.purpose = 'walking';
    }
}
let Shoe = (what) => {
    switch (what) {
        case 'boot': return new Boot;
        case 'sneaker': return new Sneaker;
        case 'balletFlat': return new BalletFlat;
    }
};
let sneaker = Shoe('sneaker');
let boot = Shoe('boot');
let printSneaker = (s) => console.log(s.purpose);
printSneaker(Shoe('boot'));
function ff(a, b, ...rest) {
    for (let b of rest) {
        console.log(typeof b);
    }
}
ff(4, '4', 4, true);
function tripleString(a) {
    if (a == 3)
        throw new Error("3 is a magic number!");
    return (3 * a).toString();
}
let tripleStringPromise = promisify_1.promisify(tripleString);
tripleStringPromise(3)
    .then((x) => console.log("result: ", x))
    .catch((error) => console.error("An error occured: ", error));
tripleStringPromise(5)
    .then((x) => console.log("result: ", x))
    .catch((error) => console.error("An error occured: ", error));
let readFilePromise = promisify_1.promisify(fs_1.readFileSync);
readFilePromise("./src/index.ts")
    .then((result) => console.log("Successfuly read the file: ", result))
    .catch((error) => console.error("An error occured: ", error));
// Exercise 10.1
// a
let amountDue = {
    unit: 'JPY',
    value: 83733.10
};
let otherAmountDue = Currency_1.Currency.from(330, 'EUR');
console.log(amountDue);
console.log(otherAmountDue);
// b
var Day;
(function (Day) {
    Day[Day["Mon"] = 0] = "Mon";
    Day[Day["Tue"] = 1] = "Tue";
    Day[Day["Wed"] = 2] = "Wed";
    Day[Day["Thu"] = 3] = "Thu";
    Day[Day["Fri"] = 4] = "Fri";
    Day[Day["Sat"] = 5] = "Sat";
    Day[Day["Sun"] = 6] = "Sun";
})(Day || (Day = {}));
(function (Day) {
    function isWeekend(day) {
        return day == Day.Sat || day == Day.Sun;
    }
    Day.isWeekend = isWeekend;
})(Day || (Day = {}));
console.log(Day.isWeekend(Day.Mon));
console.log(Day.isWeekend(Day.Sat));
//# sourceMappingURL=index.js.map