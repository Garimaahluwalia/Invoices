import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IInvoice, IInvoiceClass, IInvoiceResponse, IProducts } from 'src/app/services/invoice-data-handler/invoice-data-handler.dto';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { AddInvoicesService } from './add-invoices.service';
import { CURRENCY } from 'src/app/types/currency';
import { IProductRows } from 'src/app/types/product';
import endpoints from 'src/app/endpoints';
import { LoaderService } from '../loader/loader.service';

import { IEmailInvoice } from 'src/app/types/email-invoice';
import { IRecordPayment } from 'src/app/types/recordPayments';
import { IInvoiceSummary } from 'src/app/types/invoiceSummaryTotal';

@Injectable({
  providedIn: 'root'
})

export class InvoiceService {
  public invoiceId: string | null = null;
  public totalNumberOfInvoices: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _page: number = 1;
  private _limit: number = 10;
  private _sortOrder!: string;
  private _sortField!: string;
  private _searchQuery!: string;
  private _startDate!: string;
  private _endDate!: string;
  public _status!: string;
  private _invoices: IInvoice[] = [];
  private invoicesSubject: BehaviorSubject<IInvoice[]> = new BehaviorSubject<IInvoice[]>([]);
  private _productDataSubject = new BehaviorSubject<any[]>([]);
  public invoiceNumber: string | null = null;
  private _forupdateinvoicedata: IInvoice | null = null;
  public invoiceEmitter: EventEmitter<any> = new EventEmitter<any>()
  public _updateStatus: EventEmitter<string> = new EventEmitter<string>()
  public productRows: IProducts[] = [];
  public currency!: number;
  public amount!: number;
  public tax!: number;
  public rate!: number;
  public total!: number;
  public taxamount!: number;
  public subtotalofamount!: number;
  public totalamount!: number;
  public totalamountoftax!: number;
  public currencies = CURRENCY;
  private _invoiceCategory: BehaviorSubject<string> = new BehaviorSubject<string>('invoice');
  public _Category!: string





  constructor(private http: HttpClient,
    public addinvoiceService: AddInvoicesService,
    public loaderService: LoaderService) { }



  sendInvoiceCategory() {
    this._invoiceCategory.next(this._Category);
  }

  recieveInvoiceCategory(): Observable<string> {
    return this._invoiceCategory.asObservable();
  }


  set invoiceCategory(value: string) {
    this._Category = value;
  }

  get invoiceCategory(): string {
    return this._Category;
  }

  statusUpdate(invoiceId: string, status: string) {
    const foundInvoice = this._invoices.find((invoice) => invoice._id === invoiceId);
    if (foundInvoice) {
      foundInvoice.status = status;
      this.sendInvoices();
    } else {
      console.log("Invoice not found.");
    }
  }




  set status(value: string) {
    this._status = value;
  }

  get status(): string {
    return this._status;
  }


  set startDate(value: string) {
    this._startDate = value;
  }

  get startDate(): string {
    return this._startDate;
  }


  set endDate(value: string) {
    this._endDate = value;
  }

  get endDate(): string {
    return this._endDate;
  }

  set searchQuery(value: string) {
    this._searchQuery = value;
  }
  get searchQuery(): string {
    return this._searchQuery;
  }

  set sortOrder(value: string) {
    this._sortOrder = value;
  }

  get sortOrder(): string {
    return this._sortOrder;
  }

  set sortField(value: string) {
    this._sortField = value;
  }

  get sortField(): string {
    return this._sortField;
  }
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

  set forupdateinvoicedata(value: IInvoice | null) {
    this._forupdateinvoicedata = value;
  }

  get forupdateinvoicedata(): IInvoice | null {
    return this._forupdateinvoicedata;
  }

  set productDataSubject(value: any) {
    this._productDataSubject = value;
  }

  get productDataSubject() {
    return this._productDataSubject;
  }

  set invoices(value: IInvoice[]) {
    this._invoices = value;
  }

  get invoices(): IInvoice[] {
    return this._invoices;
  }

  async getInvoiceforUpdateAndEmit() {
    try {
      const rs = await lastValueFrom(this.getInvoice(this.invoiceId as string));
      this.forupdateinvoicedata = rs;
      this.productRows = rs.products;
      this.invoiceEmitter.emit(this.forupdateinvoicedata);
    } catch (e) {
      console.error(e);
    }
  }


  addInvoice(data: IInvoice) {
    this._invoices.push(data);
    this.sendInvoices();
  }

  updateClient(data: IInvoice, invoiceId: number) {
    const invoiceData = [...this._invoices];
    invoiceData.splice(invoiceId, 1, data);
    this._invoices = invoiceData;
    this.sendInvoices();
  }

  getInvoiceNumber(): Observable<IInvoiceClass> {
    return this.http.get<IInvoiceClass>(endpoints.INVOICES_LIST.GET_INVOICE_NUMBER);
  }


  checkInvoiceNumber(invoiceNumber: string, invoiceId: string | null): Observable<{ [key: string]: boolean | string }> {
    return this.http.get<{ [key: string]: boolean | string }>(endpoints.INVOICES_LIST.CHECK_INVOICENUMBER(invoiceNumber, invoiceId));
  }

  getInvoice(invoiceId: string): Observable<IInvoice> {
    return this.http.get<IInvoice>(endpoints.INVOICES_LIST.GET(invoiceId));
  }

  bulkDelete(ids: string[]) {
    return this.http.post(endpoints.INVOICES_LIST.BULK_DELETE, { ids });
  }

  bulkDownloadAsPDF(invoiceId: string[]): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(endpoints.INVOICES_LIST.BULK_DOWNLOAD_AS_PDF(invoiceId), {
      observe: 'response',
      responseType: 'blob' as 'json'
    });
  }

  downloadInvoice(invoiceId: string): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(endpoints.INVOICES_LIST.DOWNLOAD_INVOICE(invoiceId), {
      observe: 'response',
      responseType: "blob" as 'json'
    })
  }

  deleteInvoice(invoiceId: string) {
    return this.http.delete(endpoints.INVOICES_LIST.DELETE(invoiceId));
  }

  updateInvoice(invoiceId: string, data: { [key: string]: string }) {
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

  recieveInvoices(): Observable<IInvoice[]> {
    return this.invoicesSubject.asObservable();
  }

  getAllInvoice(page: number = 1, limit: number = 10, order: string, field: string, searchQuery: string, startDate: string, endDate: string, status: string): Observable<IInvoiceResponse> {
    return this.http.get<IInvoiceResponse>(endpoints.INVOICES_LIST.GETALL(page, limit, order, field, searchQuery, startDate, endDate, status));
  }

  getAll() {
    this.loaderService.ShowLoader();
    try {
      this.getAllInvoice(this.page, this.limit, this.sortOrder, this.sortField, this.searchQuery, this.startDate, this.endDate, this.status).subscribe(
        (res) => {
          this._invoices = res.invoices;
          this.totalNumberOfInvoices.next(res.totalCount);
          this.sendInvoices();
          this.loaderService.HideLoader();
        },
        err => {
          this.loaderService.HideLoader();
          console.error('Error while fetching pages:', err);
        }
      )
    } catch (e) {
      console.error(e);
      this._invoices = [];
      this.sendInvoices();
      this.loaderService.HideLoader();

    }
  }

  sendStatus(data: string) {
    this._updateStatus.emit(data);
  }

  receiveStatus(): Observable<string> {
    return this._updateStatus.asObservable();
  }

  getInvoiceSummary(): Observable<IInvoiceSummary> {
    return this.http.get<IInvoiceSummary>(endpoints.INVOICES_LIST.INVOICE_SUMMARY)
  }

  sendInvoiceEmail(payload: IEmailInvoice): Observable<any> {
    return this.http.post<any>(endpoints.INVOICES_LIST.EMAIL_INVOICE, payload);
  }

  sendRecordPayment(payload: IRecordPayment): Observable<any> {
    return this.http.post<any>(endpoints.INVOICES_LIST.RECORD_PAYMENT, payload);
  }
}  