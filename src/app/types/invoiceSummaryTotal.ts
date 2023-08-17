export interface IInvoiceSummary {
    totalInvoiceCount: number;
    totalInvoiceAmount: number;
    totalDueAmount: number;
    totalReceivedPayment: number;
    totalTaxAmount: number;
    totalTDSAmount: number;
}

export class
    InvoiceSummary implements IInvoiceSummary {
    totalInvoiceCount: number = 0;
    totalInvoiceAmount: number = 0;
    totalDueAmount: number = 0;
    totalReceivedPayment: number = 0;
    totalTaxAmount: number = 0;
    totalTDSAmount: number = 0;


    updateData({ totalInvoiceCount, totalInvoiceAmount, totalDueAmount, totalReceivedPayment, totalTaxAmount, totalTDSAmount }: IInvoiceSummary) {
        this.totalInvoiceCount = totalInvoiceCount;
        this.totalInvoiceAmount = totalInvoiceAmount;
        this.totalDueAmount = totalDueAmount;
        this.totalReceivedPayment = totalReceivedPayment;
        this.totalTaxAmount = totalTaxAmount;
        this.totalTDSAmount = totalTDSAmount;
    }
}