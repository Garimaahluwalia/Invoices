import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';


@Component({
  selector: 'app-invoicedata',
  templateUrl: './invoicedata.component.html',
  styleUrls: ['./invoicedata.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class InvoicedataComponent implements OnInit {
  @Input() invoice!: { [key: string]: string | number }
  public InvoiceNumber! : number ;
  constructor(public invoiceService : InvoiceService){}
  ngOnInit(): void {
   this.getInvoiceNumber();
  }

  getInvoiceNumber() {
    this.invoiceService.getInvoiceNumber().subscribe((res: any) => {
      this.InvoiceNumber = res.invoiceNumber; 
      // console.log(this.InvoiceNumber, "Number of invoice");
    });
  }
}
