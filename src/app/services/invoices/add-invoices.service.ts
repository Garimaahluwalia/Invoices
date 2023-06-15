import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import endpoints from 'src/app/endpoints';
import { IInvoice } from 'src/app/types/invoice';

@Injectable({
  providedIn: 'root'
})

export class AddInvoicesService {
  public invoiceData: any;
  constructor(public http: HttpClient) { }
 public invoiceListData = []
 

  public addInvoice(payload: any): Observable<any> {
    // console.log(endpoints.ADD_INVOICES.ADD,payload,"url")
    return this.http.post<any>(endpoints.ADD_INVOICES.ADD, payload);
  }

  public getInvoice(InvoiceId: string): Observable<any> {
    return this.http.get<{ success: boolean, message: string, result: any }>(endpoints.ADD_INVOICES.GET(InvoiceId));
  }

  public sendUpdateInvoice(InvoiceId: string, data: any) {
    return this.http.put(endpoints.ADD_INVOICES.UPDATE(InvoiceId), data);
  }
}

