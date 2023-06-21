import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { IInvoice } from 'src/app/types/invoice';

@Component({
  selector: 'app-main-invoice',
  templateUrl: './main-invoice.component.html',
  styleUrls: ['./main-invoice.component.css']
})
export class MainInvoiceComponent implements OnInit {
  constructor(public invoiceService : InvoiceService){}
  ngOnInit(): void {
   this.loadInvoices(); 
  }
  currentPage = 1;
  itemsPerPage = 10;
  public invoices: IInvoice[] = [];
  public InvoiceNumber!: number;


  loadInvoices() {
    this.invoiceService.getAllInvoice()
      .subscribe((invoice: IInvoice[]) => {
        this.invoices = invoice;
     
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
