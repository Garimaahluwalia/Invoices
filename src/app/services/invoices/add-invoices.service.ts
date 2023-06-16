import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import endpoints from 'src/app/endpoints';
import { IInvoice } from 'src/app/types/invoice';
import { TAXES } from 'src/app/types/taxes';

@Injectable({
  providedIn: 'root'
})

export class AddInvoicesService {
  public invoiceData: any;
  private _selectedTax: TAXES = TAXES.GST;
  constructor(public http: HttpClient) { }
  public invoiceListData = []

  get selectedTax(): TAXES {
    return this._selectedTax;
  }

  set selectedTax(tax: TAXES) {
    this._selectedTax = tax;
  }

  public addInvoice(payload: any): Observable<any> {
    return this.http.post<any>(endpoints.ADD_INVOICES.ADD, payload);
  }

  public getInvoice(InvoiceId: string): Observable<any> {
    return this.http.get<{ success: boolean, message: string, result: any }>(endpoints.ADD_INVOICES.GET(InvoiceId));
  }

  public sendUpdateInvoice(InvoiceId: string, data: any) {
    return this.http.put(endpoints.ADD_INVOICES.UPDATE(InvoiceId), data);
  }

}

