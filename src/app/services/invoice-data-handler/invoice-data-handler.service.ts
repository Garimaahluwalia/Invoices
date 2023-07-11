import { Injectable } from '@angular/core';
import { ICompany, IInvoice, IInvoiceClass, IProducts, IbankDetails } from './invoice-data-handler.dto';
import { TAXES } from 'src/app/types/taxes';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDataHandlerService implements IInvoice {

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
  public _Status?: string;
  public __v!: number;
  private _tax!: TAXES;
  public _currency!: string;
  public _client_id!: string;
  public _subtotalofamount!: number;
  public _totalamountoftax!: number;
  public _totalamount!: number;
  constructor() { }







  set subtotalofamount(value: number) {
    this._subtotalofamount = value;
  }
  get subtotalofamount(): number {
    return this._subtotalofamount;
  }


  set totalamountoftax(value: number) {
    this._totalamountoftax = value;
  }
  get totalamountoftax(): number {
    return this._totalamountoftax;
  }


  set totalamount(value: number) {
    this._totalamount = value;
  }
  get totalamount(): number {
    return this._totalamount;
  }

  set status(value: string | undefined) {
    this._Status = value;
  }
  get status(): string | undefined {
    return this._Status;
  }


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

  setCompany({ Businessname, address, emailaddress, GSTIN, pan }: ICompany) {
    this.company = {
      Businessname: Businessname,
      address: address,
      emailaddress: emailaddress,
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

    const product: IProducts[] = [];
    if (products && typeof products === 'object') {
      const keys = Object.keys(products);
      for (const key of keys) {
        const item = products[key] as IProducts;
        product.push(item);
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
    this.setProducts(values["products"] as unknown as IProducts as { [key: string]: any });
    /* this.subtotalofamount = values['subtotalofamount'] as any;
    this.totalamountoftax = values['totalamountoftax'] as any;
    this.totalamount = values['totalamount'] as any; */
    this.status = values['status'] as string;
  }


  getPayload() {
    console.log(this, "getPayload");
    return {
      "invoiceNo": this.invoiceNo.invoiceNo,
      "company": this._company,
      "tax": this._tax,
      "currency": this._currency,
      "date": this.invoiceNo.date,
      "client_id": this.client_id,
      "products": this._products,
      "bankDetails": this._bankDetails,
      "subtotalofamount": this._subtotalofamount,
      "totalamountoftax": this._totalamountoftax,
      "totalamount": this._totalamount,
      "status": this._Status,
    };
  }
}
