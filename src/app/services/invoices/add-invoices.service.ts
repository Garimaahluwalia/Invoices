import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import endpoints from 'src/app/endpoints';

@Injectable({
  providedIn: 'root'
})

export class AddInvoicesService {
  public invoiceData: any;
  constructor(public http: HttpClient) { }

  public invoiceListData = [
    {
      "invoiceno": "00335",
      "invoiceNumber": "#VL8343984",
      "paymentstatus": "paid",
      "date": "23-09-2900",
      "totalamount": "9092",
      "address": {
        "state": "Delhi",
        "zipcode": "136042",
        "email": "user@gmail.com",
        "website": "www.google.com",
        "contactno": "00000000"
      },
      "billing": {
        "name": "david",
        "address": "780 shssj.k",
        "phoneNo": "889989",
        "tax": "939289"
      },
      "shipping": {
        "name": "sdfs",
        "address": "dsfsdf",
        "phoneNo": "099090",
      },
      "productdetails": {
        "productname": "sdf",
        "productdetails": "rthtrh",
        "rate": "$877",
        "quantity": "02",
        "amount": "$223",
        "subtotal": "9898",
        "estimatedTax": "$98",
        "discount": "$53",
        "shippingCharges": "89"
      },
      "paymentdetails": {
        "paymentmethod": "cash",
        "cardholder": "bnmbnm",
        "cardNumber": "788733",
      }
    }
  ];


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

