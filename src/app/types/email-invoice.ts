export interface IEmailInvoice {
    from: string
    clientName: string
    clientEmail: string
    cc: string
    emailSubject: string
    message: string
}

export class emailInvoice implements IEmailInvoice {
    from: string = "";
    clientName: string = "";
    clientEmail: string = "";
    cc: string = "";
    emailSubject: string = "";
    message: string = "";
}