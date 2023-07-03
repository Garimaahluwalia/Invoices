import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IInvoice, IInvoiceResponse, Invoice } from 'src/app/types/invoice';
import { Observable } from 'rxjs/internal/Observable';
import endpoints from 'src/app/endpoints';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  // pagination
  public totalNumberOfInvoices: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _page: number = 1;
  private _limit: number = 13;
  // pagination

  private _invoices: IInvoiceResponse[] = [];
  private invoicesSubject: BehaviorSubject<IInvoiceResponse[]> = new BehaviorSubject<IInvoiceResponse[]>([]);


  private _productDataSubject = new BehaviorSubject<any[]>([]);   // for products Data
  public invoiceNumber: string | null = null;         // for InvoiceNumber 
  private _forupdateinvoicedata: IInvoiceResponse | null = null;   // for Invoice Data 
  public invoiceEmitter: EventEmitter<any> = new EventEmitter<any>() // To emit invoice Data
  constructor(private http: HttpClient) { }



  // <-- pagination
  set page(value: number) {
    this._page = value;
  }
  get page(): number {
    return this._page;
  }

  set limit(value: number) {
    this._limit = value;
  }

  get limit(): number {
    return this._limit;
  }
  // pagination -->

  set forupdateinvoicedata(value: IInvoiceResponse | null) {
    this._forupdateinvoicedata = value;
  }

  get forupdateinvoicedata(): IInvoiceResponse | null {
    return this._forupdateinvoicedata;
  }




  set productDataSubject(value: any) {
    this._productDataSubject = value;
  }

  get productDataSubject() {
    return this._productDataSubject;
  }




  async getInvoiceforUpdateAndEmit() {
    try {
      const rs = await lastValueFrom(this.getInvoice(this.invoiceNumber as string));
      this.forupdateinvoicedata = rs;
      // console.log(this.forupdateinvoicedata, "forupdatedinvoiceData");
      this.invoiceEmitter.emit(this.forupdateinvoicedata);
    } catch (e) {
      console.error(e);
    }
  }

  set invoices(value: IInvoiceResponse[]) {
    this._invoices = value;
  }

  get invoices(): IInvoiceResponse[] {
    return this._invoices;
  }

  addInvoice(data: IInvoiceResponse) {
    this._invoices.push(data);
    this.sendInvoices();
  }


  updateClient(data: IInvoiceResponse, invoiceId: number) {
    const invoiceData = [...this._invoices];
    invoiceData.splice(invoiceId, 1, data);
    this._invoices = invoiceData;
    this.sendInvoices();
  }

  getInvoiceNumber(): Observable<any[]> {
    return this.http.get<any[]>(endpoints.INVOICES_LIST.GET_INVOICE_NUMBER);
  }

  getAllInvoice(page: number = 1, limit: number = 12): Observable<any> {
    return this.http.get<{ invoices: IInvoiceResponse[], totalCount: number, totalPages: number }>(endpoints.INVOICES_LIST.GETALL(page, limit));
  }

  getInvoice(invoiceId: string): Observable<any> {
    return this.http.get<string>(endpoints.INVOICES_LIST.GET(invoiceId));
  }
  deleteInvoices(invoiceId: string) {
    return this.http.delete(endpoints.INVOICES_LIST.DELETE(invoiceId));
  }

  updateInvoice(invoiceId: string) {
    const url = endpoints.INVOICES_LIST.UPDATE(invoiceId);
    return this.http.put(url, { invoiceId });
  }
  // updateInvoice( payload: any): Observable<any> {
  //   const url = `${endpoints.INVOICES_LIST.UPDATE}`;
  //   console.log(url, "UpdateURl")
  //   return this.http.put<any>(url, payload);
  // }

  updateInvoiceStatus(invoiceId: string): Observable<any> {
    const url = `${endpoints.INVOICES_LIST.UPDATE_STATUS}/${invoiceId}`;
    return this.http.put(url, null);
  }

  sendInvoices() {
    this.invoicesSubject.next(this._invoices);
  }

  recieveInvoices(): Observable<IInvoiceResponse[]> {
    return this.invoicesSubject.asObservable();
  }

  getAll() {
    try {
      this.getAllInvoice(this.page, this.limit).subscribe(
        (res) => {
          this._invoices = res.invoices;
          this.totalNumberOfInvoices.next(res.totalCount);
          this.sendInvoices();
        },
        err => {
          console.error('Error while fetching pages:', err)
        }
      )
    } catch (e) {
      console.error(e);
      this._invoices = [];
      this.sendInvoices();
    }
  }
}
