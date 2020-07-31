export function promisify<T, U>(fn: (t: T) => U): (t: T) => Promise<U> {
    return async function(x: T): Promise<U> {
        return await fn(x)
    }
}