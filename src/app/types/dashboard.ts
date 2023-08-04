export interface IDashboardCounts {
    clientCount:        number;
    invoiceCount:       number;
    paidInvoiceCount:   number;
    unpaidInvoiceCount: number;
    cancelledInvoiceCount : number;
}


export interface IdashboardComponent {
    dashboardCount: IDashboardCounts | null;
}