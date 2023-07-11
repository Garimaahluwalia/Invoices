import { TAXES } from "src/app/types/taxes";

export interface IInvoiceResponse {
   InvoiceId: string;
   invoices: IInvoice[];
   totalPages: number;
}

export interface IInvoice {
   invoiceNo: IInvoiceClass;
   company: ICompany;
   products: IProducts[];
   _currency: string;
   tax: TAXES;
   Client?: string;
   client_id?: string;
   InvoiceId?: string;
   Email?: string;
   Date?: Date;
   Billed?: number;
   Status?: string;
   bankDetails: IbankDetails;
   _id?: string;
   __v: number;
   subtotalofamount : number;
   totalamountoftax : number ;
   totalamount : number
}

export interface IInvoiceClass {
   invoiceNo: string;
   date: string
}

export interface IbankDetails {
   accountHolderName: string,
   accountNumber: string,
   ifscCode: string,
   swiftCode: string,
   bank: string
}

export interface ICompany {
   Businessname: string;
   address: string;
   GSTIN: string;
   pan: string;
   emailaddress: string;
}

export interface IProducts {
   name: string;
   description: string;
   amount: number;
   rate: string;
   total: string;
   HSN_SAC: string;
   taxamount: number;
}