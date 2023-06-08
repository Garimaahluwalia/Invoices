export interface IInvoice {
   invoice: IInvoiceClass;
   company: ICompany;
   billing: IIng;
   shipping: IIng;
   productDetails: IProductDetails;
   paymentDetails: IPaymentDetails;
   _id?: string;
   invoiceNumber: string;
   InvoiceId?: string;
   Email?: string;
   Client?: string;
   Date?: Date;
   Billed?: number;
   Status?: string;
   __v: number;
}
export interface IInvoiceClass {
   InvoiceNo: string;
}

export interface ICompany {
   name: string;
   postalCode: string;
   emailaddress: string;
   website: string;
   contactNo: string;
}

export interface IIng {
   address: IAddress;
   name: string;
}

export interface IAddress {
   fullName: string;
   address: string;
   phoneNo: string;
   taxnumber: string;
   postalCode: string;
   country: string;
}


export interface IPaymentDetails {
   paymentMethod: string;
   cardHolderName: string;
   accountNumber: string;
}

export interface IProductDetails {
   productName: string;
   productDescription: string;
}


export class Invoice implements IInvoice {
   public invoice!: IInvoiceClass;
   private _company!: ICompany;
   public _billing!: IIng;
   public _shipping!: IIng;
   public _productDetails!: IProductDetails;
   public _paymentDetails!: IPaymentDetails;
   public _id?: string;
   public invoiceNumber!: string;
   public InvoiceId?: string;
   public Email?: string;
   public Client?: string;
   public Date?: Date;
   public Billed?: number;
   public Status?: string;
   public __v!: number;

   constructor() { }


   // InvoiceDetails starts 
   setInvoice({ InvoiceNo }: IInvoiceClass) {
      this.invoice = {
         InvoiceNo: InvoiceNo,
      };
   }
   // InvoiceDetails ends 

   //  BillingDetails starts 
   setBilling({ address, name }: IIng) {
      this.billing = {
         address: {
            fullName: address.fullName,
            address: address.address,
            phoneNo: address.phoneNo,
            taxnumber: address.taxnumber,
            postalCode: address.postalCode,
            country: address.country,
         },
         name: name
      }
   }
   set billing(value: IIng) {
      this._billing = value;
   }
   get billing(): IIng {
      return this._billing;
   }
   // BillingDetails ends 



   // shippingDetails starts 
   setShipping({ address, name }: IIng) {
      this.shipping = {
         address: {
            fullName: address.fullName,
            address: address.address,
            phoneNo: address.phoneNo,
            taxnumber: address.taxnumber,
            postalCode: address.postalCode,
            country: address.country,
         },
         name: name
      }
   }

   set shipping(value: IIng) {
      this._shipping = value;
   }

   get shipping(): IIng {
      return this.shipping;
   }
   // shippingDetails ends 




   //   CompanyDetails starts
   setCompany({ contactNo, emailaddress, name, postalCode, website }: ICompany) {
      this.company = {
         contactNo: contactNo,
         emailaddress: emailaddress,
         name: name,
         postalCode: postalCode,
         website: website,
      }
   }

   set company(value: ICompany) {
      this._company = value;
   }
   get company(): ICompany {
      return this._company;
   }

   // companyDetails ends 


   //  ProductDetails starts 
   setProductDetails({ productName, productDescription }: IProductDetails) {
      this.productDetails = {
         productName: productName,
         productDescription: productDescription
      }
   }
   set productDetails(value: IProductDetails) {
      this._productDetails = value;
   }

   get productDetails(): IProductDetails {
      return this._productDetails
   }
   // ProductDetails ends 



   // PaymentDetails starts 

   setPaymentDetails({ paymentMethod, cardHolderName, accountNumber }: IPaymentDetails) {
      this.paymentDetails = {
         paymentMethod: paymentMethod,
         cardHolderName: cardHolderName,
         accountNumber: accountNumber
      }
   }
   set paymentDetails(value: IPaymentDetails) {
      this._paymentDetails = value;
   }
   get paymentDetails(): IPaymentDetails {
      return this._paymentDetails;
   }

   // PaymentDetails ends 





   setData(values: { [key: string]: string | number | { [key: string]: string | number } }) {
      this.setInvoice(values["invoice"] as unknown as IInvoiceClass);
      this.setCompany(values["company"] as unknown as ICompany);
      this.setProductDetails(values["productDetails"] as unknown as IProductDetails);
      this.setPaymentDetails(values["paymentDetails"] as unknown as IPaymentDetails);
      this.setBilling(values["billing"] as unknown as IIng);
      this.setShipping(values["shipping"] as unknown as IIng);
   }

   getPayload() {
      return {
         "invoice": this.invoice,
         "company": this.company,
         "billing": this.billing,
         // "shipping": this.shipping,
         "productDetails": this.productDetails,
         "paymentDetails": this.paymentDetails
      }
   }




}