export interface IRecordPayment {
    amountReceived: string;
    amountReceivedInUSD: string;
    TDS: string;
    TDSWithHeld: string;
    amountToSettle: string;
    paymentDate: string;
    additionalNotes: string;
}


export class recordPayment implements IRecordPayment {
    amountReceived: string = "";
    amountReceivedInUSD: string = "";
    TDS: string = "";
    TDSWithHeld: string = "";
    amountToSettle: string = "";
    paymentDate: string = "";
    additionalNotes: string = "";
}


export enum RECORD_PAYMENT_ROUTER_ACTIONS {
    SAVE_INVOICE_PAGE = "save-invoice-page",
    INVOICE = "invoice"
}