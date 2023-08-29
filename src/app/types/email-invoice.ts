export interface IEmailInvoice {
    from: string
    clientName: string
    clientEmail: string
    cc: string
    emailSubject: string
    body: string
}

export class emailInvoice implements IEmailInvoice {
    from: string = "";
    clientName: string = "";
    clientEmail: string = "";
    cc: string = "";
    emailSubject: string = "";
    body: string = "";
}
 