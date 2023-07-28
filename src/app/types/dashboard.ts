export interface IDashboardCounts {
    clientCount:        number;
    invoiceCount:       number;
    paidInvoiceCount:   number;
    unpaidInvoiceCount: number;
}


export interface IMainInvoiceComponent {
    dashboardCount: IDashboardCounts | null;
}