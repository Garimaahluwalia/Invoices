import { Injectable } from '@angular/core';
import { IInvoice } from '../invoice-data-handler/invoice-data-handler.dto';
import { HttpClient, HttpResponse } from '@angular/common/http';
import endpoints from 'src/app/endpoints';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QuotationsService {

  constructor(private http: HttpClient) { }





  public getQuotation(invoiceId: string): Observable<IInvoice> {
    return this.http.get<IInvoice>(endpoints.QUOTATIONS_LIST.GET(invoiceId));
  }

  public addQuotation(payload: IInvoice): Observable<any> {
    return this.http.post<any>(endpoints.QUOTATIONS_LIST.ADD, payload);
  }
}
