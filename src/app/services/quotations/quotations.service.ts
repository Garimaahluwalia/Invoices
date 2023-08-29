import { EventEmitter, Injectable } from '@angular/core';
import { IInvoice, IInvoiceClass, IInvoiceResponse, IProducts, IQuotationClass } from '../invoice-data-handler/invoice-data-handler.dto';
import { HttpClient, HttpResponse } from '@angular/common/http';
import endpoints from 'src/app/endpoints';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { IQuotationSummary } from 'src/app/types/quotationSummary';


@Injectable({
  providedIn: 'root'
})
export class QuotationsService {
  public quotationId: string | null = null;
  private _quotations: any;
  private _page: number = 1;
  private _limit: number = 10;
  private _sortOrder!: string;
  private _sortField!: string;
  private _searchQuery!: string;
  private _startDate!: string;
  private _endDate!: string;
  public _status!: string;
  public totalNumberOfQuotations: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private quotationSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public quotationEmitter: EventEmitter<any> = new EventEmitter<any>()
  private _forupdatequotationdata: IInvoice | null = null;
  public productRows: IProducts[] = [];

  constructor(private http: HttpClient) { }

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



  set quotation(value: any) {
    this._quotations = value;
  }

  get quotation(): any[] {
    return this._quotations;
  }


  async getQuotationforUpdateAndEmit() {
    try {
      const rs = await lastValueFrom(this.getQuotation(this.quotationId as string));
      this._forupdatequotationdata = rs;
      this.productRows = rs.products;
      this.quotationEmitter.emit(this._forupdatequotationdata);
    } catch (e) {
      console.error(e);
    }
  }

  getQuotationSummary(): Observable<IQuotationSummary> {
    return this.http.get<IQuotationSummary>(endpoints.QUOTATIONS_LIST.QUOTATION_SUMMARY)
  }


  addQuotations(data: IInvoice) {
    this._quotations.push(data);
    this.sendQuotations();
  }

  public getQuotationNumber(): Observable<IQuotationClass> {
    return this.http.get<IQuotationClass>(endpoints.QUOTATIONS_LIST.GET_QUOTATION_NUMBER);
  }

  public getQuotation(quotationId: string): Observable<IInvoice> {
    return this.http.get<IInvoice>(endpoints.QUOTATIONS_LIST.GET(quotationId));
  }

  public getAllQuotation(page: number = 1, limit: number = 10, order: string, field: string, searchQuery: string, startDate: string, endDate: string, status: string): Observable<IInvoiceResponse> {
    return this.http.get<IInvoiceResponse>(endpoints.QUOTATIONS_LIST.GETALL(page, limit, order, field, searchQuery, startDate, endDate, status));
  }

  public addQuotation(payload: IInvoice): Observable<any> {
    return this.http.post<any>(endpoints.QUOTATIONS_LIST.ADD, payload);
  }

  public deleteQuotation(quotationId: string) {
    return this.http.delete(endpoints.QUOTATIONS_LIST.DELETE(quotationId));
  }

  public updateQuotation(quotationId: string, data: { [key: string]: string }) {
    return this.http.put(endpoints.QUOTATIONS_LIST.UPDATE(quotationId), data);
  }

  public bulkDelete(ids: string[]) {
    return this.http.post(endpoints.QUOTATIONS_LIST.BULK_DELETE, { ids });
  }

  public bulkDownloadAsPDF(quotationId: string[]): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(endpoints.QUOTATIONS_LIST.BULK_DOWNLOAD_AS_PDF(quotationId), {
      observe: 'response',
      responseType: 'blob' as 'json'
    });
  }

  downloadQuotation(quotationId: string): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(endpoints.QUOTATIONS_LIST.DOWNLOAD_QUOTATION(quotationId), {
      observe: 'response',
      responseType: "blob" as 'json'
    })
  }

  getAll() {
    try {
      this.getAllQuotation(this.page, this.limit, this.sortOrder, this.sortField, this.searchQuery, this.startDate, this.endDate, this.status).subscribe(
        (res) => {
          this._quotations = res.items;
          this.totalNumberOfQuotations.next(res.totalCount);
          this.sendQuotations();
        },
        err => {
          console.error('Error while fetching pages:', err);
        }
      )
    } catch (e) {
      console.error(e);
      this._quotations = [];
      this.sendQuotations();
    }
  }

  sendQuotations() {
    this.quotationSubject.next(this._quotations);
  }

  recieveQuotations(): Observable<IInvoice[]> {
    return this.quotationSubject.asObservable();
  }

}
