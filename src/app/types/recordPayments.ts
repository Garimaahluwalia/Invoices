export interface IRecordPayment {
    invoiceNo: string;
    billedTo: string;
    taxableAmount: string;
    invoiceTotal: string;
    amountReceived: string;
    amountReceivedInUSD: string;
    transactionCharge: string;
    TDS: string;
    TDSWithHeld: string;
    amountToSettle: string;
    paymentDate: string;
    paymentMethod: string;
    additionalNotes: string;
}


export class recordPayment implements IRecordPayment {
    invoiceNo: string = "";
    billedTo: string = "";
    taxableAmount: string = "";
    invoiceTotal: string = "";
    amountReceived: string = "";
    amountReceivedInUSD: string = "";
    transactionCharge: string = "";
    TDS: string = "";
    TDSWithHeld: string = "";
    amountToSettle: string = "";
    paymentDate: string = "";
    paymentMethod: string = "";
    additionalNotes: string = "";
}
