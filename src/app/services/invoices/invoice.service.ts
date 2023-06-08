import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Invoice } from 'src/app/types/invoice';
import { Observable } from 'rxjs/internal/Observable';
import endpoints from 'src/app/endpoints';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { AUTHORIZATION_TOKEN } from 'src/app/constants';
import { AuthInterceptor } from 'src/app/interceptors/intercept';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  public Invoices: Invoice[] = [];
  constructor(private http: HttpClient) { }


  getAllInvoice(): Observable<any[]> {
    return this.http.get<any[]>(endpoints.INVOICES_LIST.GETALL);
  }
  getInvoice(invoiceId: string): Observable<any> {
    return this.http.get<string>(endpoints.INVOICES_LIST.GET(invoiceId));
  }
  updateInvoice(invoiceId: string, invoice: Invoice): Observable<Invoice> {
    const url = `${endpoints.INVOICES_LIST.UPDATE}/${invoiceId}`;
    return this.http.put<Invoice>(url, invoice);
  }
  
}
