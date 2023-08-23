import { Component, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, NgForm, } from '@angular/forms';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';


@Component({
  selector: 'app-companyaddress',
  templateUrl: './companyaddress.component.html',
  styleUrls: ['./companyaddress.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class CompanyaddressComponent implements OnInit {
  @ViewChild("InvoiceForm", { static: false }) InvoiceForm!: NgForm;
  public invoiceCategory!: string;

  constructor(public invoiceService: InvoiceService) { }
  ngOnInit(): void {

    this.invoiceService.recieveInvoiceCategory().subscribe((res: string) => {
      this.invoiceCategory = res;
    });
  }

  public company: { [k: string]: string } = {
    "Businessname": "MCODE INFOSOFT",
    "address": "#60., 1st Floor, Zirakpur, Punjab, india 140603",
    "GSTIN": "03DQCPK3553H1Z3",
    "pan": "DQCPK3553H",
    "emailaddress": "info@mcodeinfosoft.com",
  }

}
