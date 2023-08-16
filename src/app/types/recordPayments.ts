export interface IRecordPayment {
    invoiceNo: string;
    billedTo: string;
    taxableAmount: string;
    invoiceTotal: string;
    amountReceived: string;
    amountReceivedInUSD: string;
    TDS: string;
    TDSWithHeld: string;
    amountToSettle: string;
    paymentDate: string;
    additionalNotes: string;
}


export class recordPayment implements IRecordPayment {
    invoiceNo: string = "";
    billedTo: string = "";
    taxableAmount: string = "";
    invoiceTotal: string = "";
    amountReceived: string = "";
    amountReceivedInUSD: string = "";
    TDS: string = "";
    TDSWithHeld: string = "";
    amountToSettle: string = "";
    paymentDate: string = "";
    additionalNotes: string = "";
}
