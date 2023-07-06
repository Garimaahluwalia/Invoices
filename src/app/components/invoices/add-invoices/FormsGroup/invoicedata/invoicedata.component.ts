import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-invoicedata',
  templateUrl: './invoicedata.component.html',
  styleUrls: ['./invoicedata.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class InvoicedataComponent implements OnInit {
  @Input() invoice!: { [key: string]: string | number }
  public defaultDate: any;
  public InvoiceNumber!: any;
  
  constructor(
    public invoiceService: InvoiceService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    const currentDate = new Date();
    this.defaultDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');

    if (!this.invoiceService.invoiceNumber) {
      this.getInvoiceNumber();
    }
  }

  getInvoiceNumber() {
    this.invoiceService.getInvoiceNumber().subscribe((res: any) => {
      this.InvoiceNumber = res.invoiceNumber;
    });
  }


}
