export interface IRecordPayment {
    amountReceived: number;
    amountReceivedInINR: number;
    TDS: number;
    TDSWithHeld: number;
    amountToSettle: number;
    paymentDate: Date;
    additionalNotes: number;
}


export class recordPayment implements IRecordPayment {
    amountReceived: number = 0;
    amountReceivedInINR: number = 0;
    TDS: number = 0;
    TDSWithHeld: number = 0;
    amountToSettle: number = 0;
    paymentDate: Date = new Date();
    additionalNotes: number = 0;
}


export enum RECORD_PAYMENT_ROUTER_ACTIONS {
    SAVE_INVOICE_PAGE = "save-invoice-page",
    INVOICE = "invoice"
}