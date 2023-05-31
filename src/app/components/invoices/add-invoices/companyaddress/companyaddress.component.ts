import { Component, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, NgForm,} from '@angular/forms';


@Component({
  selector: 'app-companyaddress',
  templateUrl: './companyaddress.component.html',
  styleUrls: ['./companyaddress.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class CompanyaddressComponent implements OnInit {
  @ViewChild("InvoiceForm", { static: false }) InvoiceForm!: NgForm;
  ngOnInit(): void {}

}
