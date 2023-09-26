import { IClient } from "src/app/types/client/client.dto";
import { Field, IField } from "src/app/types/columnType";
import { TAXES } from "src/app/types/taxes";

export interface IInvoiceResponse {
   items: IInvoice[];
   totalCount: number;
   totalPages: number;
}

export interface IInvoice {
   invoiceNo?: string;
   quotationNo?: string;
   company: ICompany;
   products: IProducts[];
   _currency: string;
   tax: TAXES;
   client: IClient;
   client_id?: string;
   InvoiceId?: string;
   Email?: string;
   date?: Date;
   Billed?: number;
   status?: string;
   bankDetails: IbankDetails;
   _id: string;
   __v: number;
   subtotalofamount: number;
   totalamountoftax: number;
   totalamount: number;
   table?: Field[];
   currencyobj?: any
}

export interface IInvoiceClass {
   invoiceNumber: string;
   date: Date
}
export interface IQuotationClass {
   quotationNumber: string;
   date: Date
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