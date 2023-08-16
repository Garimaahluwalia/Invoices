export interface IInvoiceSummaryTotal {
    invoices: number;
    invoiceAmount: number;
    amountDue: number;
    paymentRecieved: number;
    taxAmount: number;
    TDSAmount: number;
}

export class InvoiceSummaryTotal implements IInvoiceSummaryTotal {
    invoices: number = 0;
    invoiceAmount: number = 0;
    amountDue: number = 0;
    paymentRecieved: number = 0;
    taxAmount: number = 0;
    TDSAmount: number = 0;


    updateData({ invoices, invoiceAmount, amountDue, paymentRecieved, taxAmount, TDSAmount }: IInvoiceSummaryTotal) {
        this.invoices = invoices;
        this.invoiceAmount = invoiceAmount;
        this.amountDue = amountDue;
        this.paymentRecieved = paymentRecieved;
        this.taxAmount = taxAmount;
        this.TDSAmount = TDSAmount;
    }
}

