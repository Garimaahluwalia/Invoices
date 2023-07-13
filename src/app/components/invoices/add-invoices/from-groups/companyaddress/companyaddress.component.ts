import { Component, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, NgForm, } from '@angular/forms';


@Component({
  selector: 'app-companyaddress',
  templateUrl: './companyaddress.component.html',
  styleUrls: ['./companyaddress.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class CompanyaddressComponent implements OnInit {
  @ViewChild("InvoiceForm", { static: false }) InvoiceForm!: NgForm;
  


  ngOnInit(): void { }
  public company: { [k: string]: string } = {
    "Businessname": "M CODE INFOSOFT",
    "address": "#60., 1st Floor, Zirakpur, Punjab, india 140603",
    "GSTIN": "03DQCPK3553H1Z3",
    "pan": "DQCPK3553H",
    "emailaddress": "info@mcodeinfosoft.com",
  }
  
}
