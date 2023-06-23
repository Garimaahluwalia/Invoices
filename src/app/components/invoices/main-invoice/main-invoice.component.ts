import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/clients/client.service';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { IInvoice } from 'src/app/types/invoice';

@Component({
  selector: 'app-main-invoice',
  templateUrl: './main-invoice.component.html',
  styleUrls: ['./main-invoice.component.css']
})
export class MainInvoiceComponent implements OnInit {
  constructor(public invoiceService : InvoiceService, public clientService: ClientService){}
  ngOnInit(): void {
   this.loadInvoices(); 
   this.getClients();
  }
  currentPage = 1;
  itemsPerPage = 10;
  public invoices: IInvoice[] = [];
  public InvoiceNumber!: number;
  public clients : any[] = [];
  public totalClients! : number ;


  loadInvoices() {
    this.invoiceService.getAllInvoice()
      .subscribe((invoice: IInvoice[]) => {
        this.invoices = invoice;
        // console.log(this.invoices, "invocieslistdata")
      });
  }

  getClients() {
    this.clientService.getAllClients().subscribe((res: any) => {
      this.clients = res.clients;
      this.totalClients = this.clients.length;
      console.log(this.totalClients, "total");
      console.log(this.clients, "the clients");
    });
  }
  

  countPaidInvoices(): number {
    return this.invoices.filter(invoice => invoice.Status?.toLowerCase() === "paid").length;
  }
  countUnpaidInvoices(): number {
    return this.invoices.filter(invoice => invoice.Status?.toLowerCase() === "unpaid").length;
  }
  countCancelInvoices(): number {
    return this.invoices.filter(invoice => invoice.Status?.toLowerCase() === "cancel").length;
  }
  countTotalInvoices(): number {
    return this.invoices.length;
  }
}
