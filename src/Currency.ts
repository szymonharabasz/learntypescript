export interface Currency {
    unit: Currency.currency
    value: number
}

export namespace Currency {
    export type currency = 'EUR' | 'GBP' | 'JPY' | 'USD'
    let DEFAULT:currency = 'USD'
    export function from(value: number, unit:currency = DEFAULT): Currency {
        return {unit, value}
    }
}