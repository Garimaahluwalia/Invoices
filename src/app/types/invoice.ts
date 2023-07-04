import { TAXES } from "./taxes";
export interface IInvoiceResponse {
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
   postalCode?: string;
   emailaddress: string;
   website?: string;
   contactNo?: string;
}
export interface IProducts {
   name: string;
   description: string;
   amount: number;
   rate: string;
   total: string
   HSN_SAC: string;
   taxamount: number
}


export class Invoice implements IInvoice {
   public invoiceNo!: IInvoiceClass;
   private _company!: ICompany;
   public _products!: IProducts[];
   public _id?: string;
   public _invoiceId?: string;
   public Email?: string;
   public Client?: string;
   public Date?: Date;
   public Billed?: number;
   public _bankDetails!: IbankDetails;
   public Status?: string;
   public __v!: number;
   private _tax!: TAXES;
   public _currency!: string;
   public _client_id!: string;

   constructor() { }

   setInvoice({ invoiceNo, date }: IInvoiceClass) {
      this.invoiceNo = {
         invoiceNo: invoiceNo,
         date: date
      };
   }
   setbankDetails({ accountHolderName, accountNumber, ifscCode, swiftCode, bank }: IbankDetails) {
      this.bankDetails = {
         accountHolderName: accountHolderName,
         accountNumber: accountNumber,
         ifscCode: ifscCode,
         swiftCode: swiftCode,
         bank: bank
      }
   }
   set bankDetails(value: IbankDetails) {
      this._bankDetails = value;
   }
   get bankDetails(): IbankDetails {
      return this._bankDetails;
   }

   setCompany({ Businessname, address, contactNo, emailaddress, postalCode, GSTIN, pan }: ICompany) {
      this.company = {
         Businessname: Businessname,
         address: address,
         contactNo: contactNo,
         emailaddress: emailaddress,
         postalCode: postalCode,
         GSTIN: GSTIN,
         pan: pan,
      }
   }

   set company(value: ICompany) {
      this._company = value;
   }
   get company(): ICompany {
      return this._company;
   }

   set currency(value: any) {
      this._currency = value;
   }
   get currency(): any {
      return this._currency;
   }

   set tax(value: TAXES) {
      this._tax = value;
      console.log(value,);

   }
   get tax(): TAXES {
      return this._tax;
   }

   set client_id(value: string) {
      this._client_id = value;
      console.log(this._client_id, "Clientid")

   }
   get client_id(): string {
      return this._client_id;
   }

   set invoiceId(value: string | undefined) {
      this._invoiceId = value;

   }
   get invoiceId(): string | undefined {
      return this._invoiceId;
   }

   setProducts(products: any) {
      const product = [];
      if (products && typeof products === 'object') {
         const keys = Object.keys(products);
         for (const key of keys) {
            product.push(products[key]);
         }
      }
      this._products = product;
   }


   set products(value: IProducts[]) {
      this._products = value;
   }

   get products(): IProducts[] {
      return this._products;
   }

   setData(values: { [key: string]: string | number | { [key: string]: string | number } }) {
      this.setInvoice(values["invoice"] as unknown as IInvoiceClass);
      this.setCompany(values["company"] as unknown as ICompany);
      this.setbankDetails(values["bankDetails"] as unknown as IbankDetails);
      this.tax = values['tax'] as TAXES;
      this.currency = values['currency'] as string;
      this.client_id = values['client_id'] as string;
      this.setProducts(values["products"] as unknown as { [key: string]: any });
   }


   getPayload() {
      console.log(this);
      return {
         "invoiceNo": this.invoiceNo.invoiceNo,
         "company": this._company,
         "tax": this._tax,
         "currency": this._currency,
         "date": this.invoiceNo.date,
         "client_id": this.client_id,
         "products": this._products,
         "bankDetails": this._bankDetails
      };
   }


}