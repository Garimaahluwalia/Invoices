import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IInvoice, IInvoiceResponse } from 'src/app/services/invoice-data-handler/invoice-data-handler.dto';
import { Observable } from 'rxjs/internal/Observable';
import endpoints from 'src/app/endpoints';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { STATUS } from 'src/app/types/status';
import { AddInvoicesService } from './add-invoices.service';
import { CURRENCY } from 'src/app/types/currency';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  // pagination


  public totalNumberOfInvoices: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _page: number = 1;
  private _limit: number = 10;


  // pagination
  private _invoices: any[] = [];
  private invoicesSubject: BehaviorSubject<IInvoiceResponse[]> = new BehaviorSubject<IInvoiceResponse[]>([]);


  private _productDataSubject = new BehaviorSubject<any[]>([]);   // for products Data
  public invoiceNumber: string | null = null;         // for InvoiceNumber 
  private _forupdateinvoicedata: IInvoiceResponse | null = null;   // for Invoice Data 
  public invoiceEmitter: EventEmitter<any> = new EventEmitter<any>() // To emit invoice Data
  public _updateStatus: EventEmitter<any> = new EventEmitter<any>()
  public productRows: any[] = [];
  public currency: any;
  public amount: any;
  public tax: any;
  public rate: any;
  public total: any;
  public taxamount: any;
  public subtotalofamount: any;
  public totalamount: any;
  public totalamountoftax: any;
  public currencies = CURRENCY;

  constructor(private http: HttpClient,
    public addinvoiceService: AddInvoicesService) { }

  statusUpdate(invoiceId: string, status: string) {
    const foundInvoice = this._invoices.find((invoice) => invoice._id === invoiceId);
    if (foundInvoice) {
      foundInvoice.status = status;
      this.sendInvoices();
    } else {
      console.log("Invoice not found.");
    }
  }



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
      this.productRows = rs.product;
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



  checkInvoiceNumber(InvoiceNumber: string, InvoiceId: string): Observable<any> {
    return this.http.get(endpoints.INVOICES_LIST.CHECK_INVOICENUMBER(InvoiceNumber, InvoiceId));
  }


  getAllInvoice(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get<{ invoices: IInvoiceResponse[], totalCount: number, totalPages: number }>(endpoints.INVOICES_LIST.GETALL(page, limit));
  }

  getInvoice(invoiceId: string): Observable<any> {
    return this.http.get<string>(endpoints.INVOICES_LIST.GET(invoiceId));
  }

  bulkDelete(ids: string[]) {
    return this.http.delete(endpoints.INVOICES_LIST.BULK_DELETE , { params: { ids: ids.join(',') } });
  }
  
  downloadInvoice(invoiceId: any): Observable<any> {
    return this.http.get(endpoints.INVOICES_LIST.DOWNLOAD_INVOICE(invoiceId), {
      observe: 'response',
      responseType: "blob"
    })
  }

  deleteInvoice(invoiceId: string) {
    return this.http.delete(endpoints.INVOICES_LIST.DELETE(invoiceId));
  }

  updateInvoice(invoiceId: string, data: { [key: string]: any }) {
    return this.http.put(endpoints.INVOICES_LIST.UPDATE(invoiceId), data);
  }


  updateInvoiceStatus(invoiceId: string, status: string) {
    return this.http.put(endpoints.INVOICES_LIST.UPDATE_STATUS(invoiceId), {
      status
    });
  }


  sendInvoices() {
    this.invoicesSubject.next(this._invoices);
  }

  recieveInvoices(): Observable<IInvoiceResponse[]> {
    return this.invoicesSubject.asObservable();
  }

  getAll() {
    // console.log(this.page);
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

  sendStatus(data: any) {
    this._updateStatus.emit(data);
  }

  receiveStatus(): Observable<any> {
    return this._updateStatus.asObservable();
  }

}
