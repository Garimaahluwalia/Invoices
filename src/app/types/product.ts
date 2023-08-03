export interface IProductRows {
    showDescriptionBox: boolean
    description: string
    taxamount: number
    name: string
    HSN_SAC: string,
    amount: number,
    item: string,
    rate: number,
    total: number,
    tax: number,
    taxAmount: number
}

export interface IPrices {
    subtotal: number,
    rate: number,
    total: number
}