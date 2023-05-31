import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import endpoints from 'src/app/endpoints';

@Injectable({
  providedIn: 'root'
})

export class AddInvoicesService {
  public invoiceData : any ; 
  constructor( public http: HttpClient) {}

  addInvoice(payload: any): Observable<any> {
    return this.http.post<any>(endpoints.ADD_INVOICES.ADD, payload);
  }
}
