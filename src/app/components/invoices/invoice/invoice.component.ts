import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  public invoiceData: any;
  constructor(public invoiceService: InvoiceService, public router: Router, public route: ActivatedRoute) { }
  ngOnInit(): void {
    this.invoiceData = this.invoices;
    // console.log(this.invoiceData, "invoiceData");
  }
  public invoices = [
    {
      "invoiceId": "INV001",
      "client": "ABC Company",
      "email": "abc@example.com",
      "date": "2023-05-30",
      "billed": 1000,
      "status": "Paid",
      "action": "View"
    },
    {
      "invoiceId": "INV002",
      "client": "XYZ Corporation",
      "email": "xyz@example.com",
      "date": "2023-05-29",
      "billed": 1500,
      "status": "Unpaid",
      "action": "Edit"
    },
    {
      "invoiceId": "INV003",
      "client": "PQR Ltd",
      "email": "pqr@example.com",
      "date": "2023-05-28",
      "billed": 2000,
      "status": "Unpaid",
      "action": "Download"
    },
    {
      "invoiceId": "INV004",
      "client": "PAR Ltd",
      "email": "pqr@example.com",
      "date": "2023-05-28",
      "billed": 9000,
      "status": "Unpaid",
      "action": "Download"
    },
    {
      "invoiceId": "INV005",
      "client": "DDD Ltd",
      "email": "pqr@example.com",
      "date": "2023-05-28",
      "billed": 2000,
      "status": "default",
      "action": "Download"
    },
    {
      "invoiceId": "INV006",
      "client": "PQR Ltd",
      "email": "pqr@example.com",
      "date": "2023-05-28",
      "billed": 8000,
      "status": "cancel",
      "action": "Download"
    },
    {
      "invoiceId": "INV007",
      "client": "PQR Ltd",
      "email": "pqr@example.com",
      "date": "2023-05-28",
      "billed": 8000,
      "status": "paid",
      "action": "Download"
    },
    {
      "invoiceId": "INV008",
      "client": "PQR Ltd",
      "email": "pqr@example.com",
      "date": "2023-05-28",
      "billed": 8000,
      "status": "cancel",
      "action": "Download"
    },
    {
      "invoiceId": "INV007",
      "client": "PQR Ltd",
      "email": "pqr@example.com",
      "date": "2023-05-28",
      "billed": 8000,
      "status": "paid",
      "action": "Download"
    },
    {
      "invoiceId": "INV008",
      "client": "PQR Ltd",
      "email": "pqr@example.com",
      "date": "2023-05-28",
      "billed": 8000,
      "status": "paid",
      "action": "Download"
    }
  ];

  countPaidInvoices(): number {
    return this.invoices.filter(invoice => invoice.status.toLowerCase() === "paid").length;
  }
  countUnpaidInvoices(): number {
    return this.invoices.filter(invoice => invoice.status.toLowerCase() === "unpaid").length;
  }
  countCancelInvoices(): number {
    return this.invoices.filter(invoice => invoice.status.toLowerCase() === "cancel").length
  }
  countTotalInvoices(): number {
    return this.invoices.length;
  }
}

