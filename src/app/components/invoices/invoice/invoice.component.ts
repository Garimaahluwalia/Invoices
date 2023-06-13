import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { IInvoice, Invoice } from 'src/app/types/invoice';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  currentPage = 1;
  itemsPerPage = 10;
  public invoices: IInvoice[] = [];
 public InvoiceNumber! : number ; 
  constructor(public invoiceService: InvoiceService, public router: Router, public route: ActivatedRoute) { }
  ngOnInit(): void {
    this.loadInvoices();
    this.getInvoiceNumber();
  }
  loadInvoices() {
    this.invoiceService.getAllInvoice()
      .subscribe((invoice: IInvoice[]) => {
        this.invoices = invoice;
        // console.log(this.invoices, "invoicelistdata")
      });
  }

  getInvoiceNumber() {
    this.invoiceService.getInvoiceNumber().subscribe((res: any) => {
      this.InvoiceNumber = res.invoiceNumber; 
      // console.log(this.InvoiceNumber, "Number of invoice");
    });
  }

  countPaidInvoices(): number {
    return this.invoices.filter(invoice => invoice.Status?.toLowerCase() === "paid").length;
  }
  countUnpaidInvoices(): number {
    return this.invoices.filter(invoice => invoice.Status?.toLowerCase() === "unpaid").length;
  }
  countCancelInvoices(): number {
    return this.invoices.filter(invoice => invoice.Status?.toLowerCase() === "cancel").length
  }
  countTotalInvoices(): number {
    return this.invoices.length;
  }

}

