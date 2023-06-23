import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IInvoice, IInvoiceResponse, Invoice } from 'src/app/types/invoice';
import { Observable } from 'rxjs/internal/Observable';
import endpoints from 'src/app/endpoints';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  public Invoices: IInvoiceResponse[] = [];
  constructor(private http: HttpClient) { }
  private invoicesSubject: BehaviorSubject<IInvoiceResponse[]> = new BehaviorSubject<IInvoiceResponse[]>([]);

  set invoice(value: IInvoiceResponse[]) {
    this.Invoices = value;
  }
  get invoice(): IInvoiceResponse[] {
    return this.Invoices;
  }


  addInvoice(data: IInvoiceResponse) {
    this.Invoices.push(data);
    this.sendInvoices();
  }
  updateClient(data: IInvoiceResponse, invoiceId: number) {
    const invoiceData = [...this.Invoices];
    invoiceData.splice(invoiceId, 1, data);
    this.Invoices = invoiceData;
    this.sendInvoices();
  }
  
  getInvoiceNumber(): Observable<any[]> {
    return this.http.get<any[]>(endpoints.INVOICES_LIST.GET_INVOICE_NUMBER);
  }

  getAllInvoice(): Observable<any[]> {
    return this.http.get<any[]>(endpoints.INVOICES_LIST.GETALL);
  }

  getInvoice(invoiceId: string): Observable<any> {
    return this.http.get<string>(endpoints.INVOICES_LIST.GET(invoiceId));
  }
  deleteInvoices(invoiceId: string) {
    return this.http.delete(endpoints.INVOICES_LIST.DELETE(invoiceId));
  }
  updateInvoice(invoiceId: string, invoice: IInvoice): Observable<IInvoice> {
    const url = `${endpoints.INVOICES_LIST.UPDATE}/${invoiceId}`;
    return this.http.put<Invoice>(url, invoice);
  }

  updateInvoiceStatus(invoiceId: string): Observable<any> {
    const url = `${endpoints.INVOICES_LIST.UPDATE_STATUS}/${invoiceId}`;
    console.log(url, "updateInvoiceStatus")
    return this.http.put(url, null);
  }



  sendInvoices() {
    this.invoicesSubject.next(this.Invoices);
  }

  recieveInvoices(): Observable<IInvoiceResponse[]> {
    return this.invoicesSubject.asObservable();
  }

  getAll() {
    this.getAllInvoice().subscribe(
      res => {
        this.Invoices = res;
        console.log(this.Invoices, "asdashdahsdhadhasghdshdh")
        this.sendInvoices();
      },
      err => {
        console.error('Error while fetching pages:', err)
      }
    )
  }
}
