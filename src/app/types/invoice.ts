import { TAXES } from "./taxes";

export interface IInvoice {
   invoiceNo: IInvoiceClass;
   company: ICompany;
   productDetails: IProductDetails[];
   _id?: string;
   InvoiceId?: string;
   Email?: string;
   Client?: string;
   Date?: Date;
   Billed?: number;
   Status?: string;
   tax: TAXES;
   __v: number;
}
export interface IInvoiceClass {
   invoiceNo: string;
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
export interface IProductDetails {
   amount: number;
   name: string;
   description: string;
}


export class Invoice implements IInvoice {
   public invoiceNo!: IInvoiceClass;
   private _company!: ICompany;
   public _productDetails!: IProductDetails[];
   public _id?: string;
   public InvoiceId?: string;
   public Email?: string;
   public Client?: string;
   public Date?: Date;
   public Billed?: number;
   public Status?: string;
   public __v!: number;
   private _tax!: TAXES;
   public _currency!: string;

   constructor() { }

   setInvoice({ invoiceNo }: IInvoiceClass) {
      this.invoiceNo = {
         invoiceNo: invoiceNo,
      };
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

   set tax(value: TAXES) {
      this._tax = value;

   }
   get tax(): TAXES {
      return this._tax;
   }



   setProductDetails(productDetails: any) {
      const products = [];
      const keys = Object.keys(productDetails);
      for (const key of keys) {
         products.push(productDetails[key]);
      }
      this._productDetails = products;

   }

   set productDetails(value: IProductDetails[]) {
      this._productDetails = value;
   }

   get productDetails(): IProductDetails[] {
      return this._productDetails;
   }

   setData(values: { [key: string]: string | number | { [key: string]: string | number } }) {
      this.setInvoice(values["invoice"] as unknown as IInvoiceClass);
      this.setCompany(values["company"] as unknown as ICompany);
      this.setCompany(values["company"] as unknown as ICompany);
      this.setProductDetails(values["productDetails"] as unknown as { [key: string]: any });
   }


   getPayload() {
      return {
         "invoiceNo": this.invoiceNo.invoiceNo,
         "company": this.company,
         "tax": this.tax,
         "products": this.productDetails,
      };
   }

}