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
   // taxType?: string
}


// export interface IAddress {
//    fullName: string;
//    address: string;
//    phoneNo: string;
//    taxnumber: string;
//    postalCode: string;
//    country: string;
// }

// export interface IBankDetails {
//    Bankname: string
//    cardHolderName: string;
//    accountNumber: string;
//    IFSC_Code: string;
// }

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
   public invoiceNumber!: string;
   public InvoiceId?: string;
   public Email?: string;
   public Client?: string;
   public Date?: Date;
   public Billed?: number;
   public Status?: string;
   public __v!: number;
   private _tax: TAXES = TAXES.GST;
   public _currency!: string;

   constructor() { }

   setInvoice({ invoiceNo }: IInvoiceClass) {
      this.invoiceNo = {
         invoiceNo: invoiceNo,
      };
   }

   setCompany({ Businessname, address, contactNo, emailaddress, postalCode, GSTIN, pan,  }: ICompany) {
      this.company = {
         Businessname: Businessname,
         address: address,
         GSTIN: GSTIN,
         pan: pan,
         contactNo: contactNo,
         emailaddress: emailaddress,
         postalCode: postalCode,
         // website: website,
         // taxType: taxType
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



   setProductDetails(productDetails: IProductDetails[]) {
      this._productDetails = productDetails;
      
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
      this.setProductDetails(values["productDetails"] as unknown as IProductDetails[]);
    }
    
    
    getPayload() {
      return {
        "invoiceNo": this.invoiceNo.invoiceNo,
        "company": this.company,
        "tax": this.tax,
        "productDetails": [this.productDetails],
      };
    }
    
}