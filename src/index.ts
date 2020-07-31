import { type } from "os";
import assert from "assert";
import { basename } from "path";
import { Currency } from "./Currency";
import { promisify } from "./promisify";
import { readFile, readFileSync } from "fs"

type Cat = {name: string, purrs: boolean};
type Dog = {name: string, barks: boolean, wags: boolean};
type CatOrDogOrBoth = Cat | Dog;
type CatAndDog = Cat & Dog;

let catOrDogOrBoth: CatOrDogOrBoth = {
    name: "Bankers",
    purrs: true,
};

let catAndDog: CatAndDog = {
    name: "Bankers",
    purrs: false,
    barks: true,
    wags: false
};

// Exercise 3.1
let a = 1042;
let b = 'apples and oranges';
const c = 'pineapples';
let d = [true,true,false];
let e = {type: 'ficus'};
let f = [1,false];
const g = [3];
let h = null;

// Exercise 4.3
class Reservation {
    from: Date = new Date;
    to: Date = new Date;
    destination: string = '';
}

type Reserve = {
    (from: Date, to: Date, destination: string): Reservation,
    (from: Date, destination: string): Reservation,
    (destination: string): Reservation
}

let reserve: Reserve = (
    fromOrDestination: Date | string,
    toOrDestination?: Date | string,
    destination?: string
) => {
    let res = new Reservation;
    if (fromOrDestination instanceof Date) {
        if (toOrDestination instanceof Date && destination !== undefined) {
            res.from = fromOrDestination;
            res.to = toOrDestination;
            res.destination = destination;
        } else if (typeof toOrDestination === 'string') {
            res.from = fromOrDestination;
            res.destination = toOrDestination;
        }
    } else if (typeof fromOrDestination === 'string') {
        res.from = new Date(Date.now());
        res.to = new Date(Date.now());
        res.destination = fromOrDestination;
    }
    return res;
}

console.log(reserve('Cracow')!.from);
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
function is<T>(...args: T[]): boolean {
    return args.slice(1).every(_ => _ === args[0])
}

assert(is('string', 'otherstring') === false);
assert(is(true, false) === false);
assert(is(42, 42) === true);
//is (10 'foo'); // error TS2345 as it should be
assert(is([1], [1,2], [1,2,3]) === false)

// Exercise 5.2
class Base {
    protected constructor(a: number) {
        this.value = a
    }
    f = () => {
        console.log('base: ', this.value)
    }
    value: number
}
class Derived extends Base {
    constructor(a: number) {
        super(a)
    }
    f = () => {
        console.log('derived', this.value)
    }
}

let derived: Derived = new Derived(4)
derived.f()
let base: Base = new Derived(4)
base.f()

// Exercise 5.3
type Shoe = {
    purpose: string
}

class BalletFlat implements Shoe {
    purpose = 'dancing'
}
class Boot implements Shoe {
    purpose = 'woodcutting'
}
class Sneaker implements Shoe {
    purpose = 'walking'
}

type ShoeFactory = {
    (what: 'boot'): Boot,
    (what: 'sneaker'): Sneaker
    (what: 'balletFlat'): BalletFlat
}

let Shoe: ShoeFactory = (
    what: 'boot' | 'sneaker' | 'balletFlat'
) => {
    switch (what) {
        case 'boot': return new Boot
        case 'sneaker': return new Sneaker
        case 'balletFlat': return new BalletFlat
    }
}

let sneaker = Shoe('sneaker')
let boot: Sneaker = Shoe('boot')

let printSneaker = (s: Sneaker) => console.log(s.purpose)
printSneaker(Shoe('boot'))

function ff<T extends unknown[]>(a: number, b: string,  ...rest: T) {
    for (let b of rest) {
        console.log(typeof b)
    }
}

ff(4, '4', 4, true)

// Exercise 8.1
let readFilePromise = promisify(readFileSync) // in this version of Node readFile has second parameter mandatory
                                              // and can't be used in this second order function
readFilePromise("./src/index.ts")
    .then((result) => console.log("Successfuly read the file: ", result))
    .catch((error) => console.error("An error occured: ", error))
    

// Exercise 10.1
// a
let amountDue: Currency = {
    unit: 'JPY',
    value: 83733.10
}
let otherAmountDue = Currency.from(330, 'EUR')
console.log(amountDue)
console.log(otherAmountDue)

// b
enum Day {
    Mon, Tue, Wed, Thu, Fri, Sat, Sun
}
namespace Day {
    export function isWeekend(day: Day): boolean {
        return day == Day.Sat || day == Day.Sun
    }
}
console.log(Day.isWeekend(Day.Mon))
console.log(Day.isWeekend(Day.Sat))