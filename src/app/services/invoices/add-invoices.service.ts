import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import endpoints from 'src/app/endpoints';
import { TAXES } from 'src/app/types/taxes';
import { IProductRows } from 'src/app/types/product';
import { IInvoice } from '../invoice-data-handler/invoice-data-handler.dto';

@Injectable({
  providedIn: 'root'
})

export class AddInvoicesService {
  private _productRowsChanges: EventEmitter<IProductRows[]> = new EventEmitter<IProductRows[]>();
  private _selectedTax: TAXES = TAXES.GST;
  private _currency: EventEmitter<string> = new EventEmitter<string>();
  private _calculateTaxRate: EventEmitter<any[]> = new EventEmitter<any[]>();
  constructor(public http: HttpClient) { }


  sendProductChanges(data: IProductRows[]): void {
    this._productRowsChanges.emit(data);
  }

  recieveProductRows(): Observable<IProductRows[]> {
    return this._productRowsChanges.asObservable();
  }


  get selectedTax(): TAXES {
    return this._selectedTax;
  }

  set selectedTax(tax: TAXES) {
    this._selectedTax = tax;
  }

  public addInvoice(payload: IInvoice): Observable<any> {
    return this.http.post<any>(endpoints.ADD_INVOICES.ADD, payload);
  }

  public getInvoice(InvoiceId: string): Observable<any> {
    return this.http.get<{ success: boolean, message: string, result: any }>(endpoints.ADD_INVOICES.GET(InvoiceId));
  }

  public sendUpdateInvoice(InvoiceId: string, data: any) {
    return this.http.put(endpoints.ADD_INVOICES.UPDATE(InvoiceId), data);
  }


  public getTaxAmount(): Observable<any> {
    return this.http.get<{ success: boolean, message: string, result: any }>(endpoints.INVOICES_LIST.GET_TAX_AMOUNT);
  }


  sendCurrency(data: string) {
    this._currency.emit(data);
  }

  receiveCurrency(): Observable<string> {
    return this._currency.asObservable();
  }

  sendTaxRate(data: string[]) {
    this._calculateTaxRate.emit(data);
  }

  receiveTaxRate(): Observable<string[]> {
    return this._calculateTaxRate.asObservable();
  }


}

