import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invoice } from 'src/app/types/invoice';
import { Observable } from 'rxjs/internal/Observable';
import endpoints from 'src/app/endpoints';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  public Invoices: Invoice[] = [];
  public InvoiceSubject: BehaviorSubject<Invoice[]> = new BehaviorSubject<Invoice[]>([]);
  constructor(private http: HttpClient) { }


  createInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(endpoints.INVOICES.CREATE, invoice);
  }

  getInvoice(invoiceId: string): Observable<Invoice> {
    const url = `${endpoints.INVOICES.GET}/${invoiceId}`;
    return this.http.get<Invoice>(url);
  }

  updateInvoice(invoiceId: string, invoice: Invoice): Observable<Invoice> {
    const url = `${endpoints.INVOICES.UPDATE}/${invoiceId}`;
    return this.http.put<Invoice>(url, invoice);
  }

  deleteInvoice(invoiceId: string): Observable<void> {
    const url = `${endpoints.INVOICES.DELETE}/${invoiceId}`;
    return this.http.delete<void>(url);
  }
  sendInvoices() {
    this.InvoiceSubject.next(this.Invoices);
  }
  recieveInvoice(): Observable<Invoice[]> {
    return this.InvoiceSubject.asObservable();
  }



}
