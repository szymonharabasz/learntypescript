import { type } from "os";
import assert from "assert";
import { basename, resolve } from "path";
import { Currency } from "./Currency";
import { promisify } from "./promisify";
import { readFile, readFileSync } from "fs"
import { Worker } from "worker_threads";
import { Protocol, MatrixProtocol, Matrix } from "./MatrixProtocol"
import { METHODS } from "http";
import { SSL_OP_NO_QUERY_MTU } from "constants";
import { send } from "process";

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

// Exercise 4.4
function call<T extends unknown[], U, R>(
    f: (aa: U, bb: string, ...argz: T) => R,
    a: any,
    b: string,
    ...args: T
): R {
    return f(a, b, ...args);
}

function fill(length: number, value: string, a2: number, a3: number): string[] {
    return Array.from({length}, () => value)
}
let aa = call(fill, 10, 'a', 30, 40)

/*
// As requested in the exercise, one can't use call with function having second argument other than string:
function fill2(length: number, value: number): number[] {
    return Array.from({length}, () => value)
}
let bb = call(fill2, 10, 20) 
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

// Exercise 5.4
class RequestBuilder {
    protected data: object | null = null
    protected url: string | null = null
    protected method: 'get' | 'post' | null = null 
    set(data: object | null, url: string | null, method: 'get' | 'post' | null) {
        this.data = data
        this.url = url
        this.method =method
    }
    
    setURL(url: string): RequestBuilderWithURL { 
        let result = new RequestBuilderWithURL
        result.set(this.data, url, this.method)
        return result
    }
    setData = (data: object): this => {
        this.data = data
        return this
    }
}
class RequestBuilderWithMethod extends RequestBuilder {
    setURL(url: string): RequestBuilderWithUrlAndMethod { 
        let result = new RequestBuilderWithUrlAndMethod
        result.set(this.data, url, this.method)
        return result
    }
}
class RequestBuilderWithURL extends RequestBuilder {
    setMethod(method: 'get' | 'post'): RequestBuilderWithUrlAndMethod {
        let result = new RequestBuilderWithUrlAndMethod
        result.set(this.data, this.url, method)
        return result
    }
}
class RequestBuilderWithUrlAndMethod extends RequestBuilderWithURL {
    send = () => { console.log("SENDING REQUEST...", this.url, this.method, this.data) }
}

console.log("COMBINED OBJECT: ", (new RequestBuilder()
    .setURL("www.example.com")
    .setMethod("post")
    .setData({a: "foo", b: "bar"})
    .send()
))

// Exercise 6.1
let la: 1 = 1
let ra: number = la
let lb: number = 4
// let rb: 1 = lb <- assignment not allowed
let lc: string = "hello"
let rc: number | string = lc
let ld: boolean = true
// let rd: number = ld <- assignment not allowed
let le = [2, 3, 4]
let re: (number | string)[] = le
let lf = [2, 3, '4']
// let rf: number[] = lf <- assignment not allowed
let lg: true = true
let rg: boolean = lg
let lh: {a: {b: [string]}} = {a: {b: ["hello"]}}
let rh: {a: {b: [number|string]}} = lh
let li: (a: number) => string = _ => _.toString() 
let ri: (b: number) => string = li
let lj: (a: number) => string = _ => _.toString() 
// let rj: (b: string) => string = lj <- assignment not allowed
let lk: (a: number | string) => string = _ => _.toString() 
let rk: (b: string) => string = lk
enum E { X = 'X'}
enum F { X = 'X'}
const ll = E.X
// const rl: F.X = ll <- assignment not allowed

// Exercise 6.2
type O = {a: {b: {c: string}}}
type keysOfO = keyof O
type Oab = O['a']['b']

// Exercise 6.3
type Exclusive<T, U> = Exclude<T, U> | Exclude<U, T>
type excl = Exclusive<1 | 2 | 3, 2 | 3 | 4>

// Exercise 6.4
function fetchUser() { return "42" }
let userId: string = fetchUser()
userId.toUpperCase()

// Exercise 7.1
type UserID = string
class API {
    getLoggedInUserId(): UserID { return "qwe123" }
    getFriendIDs(userID: UserID): UserID[] { return ["asd456", "yxc789"] }
    getUserName(userID: UserID): string { return "Szymon" }
}

// Exercise 8.1
let readFilePromise = promisify(readFileSync) // in this version of Node readFile has second parameter mandatory
                                              // and can't be used in this second order function
readFilePromise("./src/index.ts")
    .then((result) => console.log("Successfuly read the file: ", result))
    .catch((error) => console.error("An error occured: ", error))
    
// Exercise 8.2
function createProtocol<P extends Protocol>(script: string) {
    return <K extends keyof P>(command: K) =>
        (...args: P[K]['in']) =>
            new Promise<P[K]['out']>((resolve, reject) => {
                let worker = new Worker(script)
                worker.on('error', reject)
                worker.on('message', event => resolve(event.data))
                worker.postMessage({ command, args })
            })
}

let runWithMatrixProtocol = createProtocol<MatrixProtocol>('./dist/MatrixWorkerScript.js')
let parallelDeterminant = runWithMatrixProtocol('determinant')
let parallelInvert = runWithMatrixProtocol('invert')
let parallelOutProduct = runWithMatrixProtocol('out-product')

let m1: Matrix = [[1,1,1],[1,2,1],[1,1,3]]
let m2: Matrix = [[1,2],[3,4]]
let m3: Matrix = [[1,1],[2,2]]
let m4: Matrix = [[2]]

parallelDeterminant(m1)
    .then(determinant => console.log("Determinant: ", determinant))
    .catch(error => console.error("An error occured: ", error))
parallelDeterminant(m2)
    .then(determinant => console.log("Determinant: ", determinant))
    .catch(error => console.error("An error occured: ", error))
parallelInvert(m2)
    .then(invert => console.log("Invert matrix: ", invert))
    .catch(error => console.error("An error occured: ", error))

parallelOutProduct(m2, m3)
    .then(outprod => console.log("Outer product: ", outprod))
    .catch(error => console.error("An error occured: ", error))

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

// 5.4, 7.1, 8.3, 