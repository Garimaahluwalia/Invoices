import { IClient } from "src/app/types/client/client.dto";
import { TAXES } from "src/app/types/taxes";

export interface IInvoiceResponse {
   invoices: IInvoice[];
   totalCount: number;
   totalPages: number;
}

export interface IInvoice {
   invoiceNo: IInvoiceClass;
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
   table?: IColumnTable;
}

export interface IInvoiceClass {
   invoiceNo: string;
   date: string
}

export interface IColumnTable {
   type: string,
   fieldName: string,
   hidden: boolean,
   default: boolean,
   custom: boolean,
   delete: boolean,
   tax: boolean,
   sortOrder: number,
   label: string,
   readonly: boolean
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