import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IInvoice, Invoice } from 'src/app/types/invoice';
import { Observable } from 'rxjs/internal/Observable';
import endpoints from 'src/app/endpoints';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  public Invoices: IInvoice[] = [];
  constructor(private http: HttpClient) { }


  getAllInvoice(): Observable<any[]> {
    return this.http.get<any[]>(endpoints.INVOICES_LIST.GETALL);
  }
  getInvoice(invoiceId: string): Observable<any> {
    return this.http.get<string>(endpoints.INVOICES_LIST.GET(invoiceId));
  }
  updateInvoice(invoiceId: string, invoice: IInvoice): Observable<IInvoice> {
    const url = `${endpoints.INVOICES_LIST.UPDATE}/${invoiceId}`;
    return this.http.put<Invoice>(url, invoice);
  }

}
