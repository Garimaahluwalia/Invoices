import { Component, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ClientService } from 'src/app/services/clients/client.service';
import { AddInvoicesService } from 'src/app/services/invoices/add-invoices.service';
import { TAXES } from 'src/app/types/taxes';
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]

})
export class ProductdetailsComponent implements OnInit {

  //  public tax= TAXES;
  public taxes: string[] = Object.values(TAXES);
  public tax: TAXES = TAXES.GST;
  public quantity!: number;
  public rate!: number;
  public amount!: number;
  public name!: "";
  public description!: "";
  public selectedCurrency!: string;
  public editor: any = ClassicEditor;
  public data: any = `<p> Enter description here </p>`;
  public serialNumber: number = 1;
  public showDescriptionBox: boolean = false;
  public showDescriptionBoxOpen: boolean = false;
  public productRows: any[] = [];
  public currencies!: any[];
  public currency = [
    {
      "code": "USD",
      "name": "United States Dollar",
      "symbol": "$"
    },
    {
      "code": "EUR",
      "name": "Euro",
      "symbol": "€"
    },
    {
      "code": "JPY",
      "name": "Japanese Yen",
      "symbol": "¥"
    },
    {
      "code": "GBP",
      "name": "British Pound Sterling",
      "symbol": "£"
    },
    {
      "code": "AUD",
      "name": "Australian Dollar",
      "symbol": "A$"
    },
    {
      "code": "CAD",
      "name": "Canadian Dollar",
      "symbol": "CA$"
    },
    {
      "code": "CHF",
      "name": "Swiss Franc",
      "symbol": "CHF"
    },
    {
      "code": "CNY",
      "name": "Chinese Yuan",
      "symbol": "¥"
    },
    {
      "code": "INR",
      "name": "Indian Rupee",
      "symbol": "₹"
    },
    {
      "code": "BRL",
      "name": "Brazilian Real",
      "symbol": "R$"
    },
    {
      "code": "MXN",
      "name": "Mexican Peso",
      "symbol": "MX$"
    },
    {
      "code": "SGD",
      "name": "Singapore Dollar",
      "symbol": "S$"
    },
    {
      "code": "NZD",
      "name": "New Zealand Dollar",
      "symbol": "NZ$"
    },
    {
      "code": "SEK",
      "name": "Swedish Krona",
      "symbol": "kr"
    },
    {
      "code": "NOK",
      "name": "Norwegian Krone",
      "symbol": "kr"
    },
    {
      "code": "ZAR",
      "name": "South African Rand",
      "symbol": "R"
    }
  ]
  public selectedTax: string = this.tax;
  constructor(public clientService: ClientService
  ) { }
  ngOnInit(): void {

    this.addDescriptionDefault;
    this.loadCurrencies();
    this.calculateAmount();

  }

  calculateAmount() {
    this.amount = this.quantity * this.rate;
  }
  loadCurrencies() {
    this.currencies = this.currency;
  }

  addDescriptionDefault() {
    this.showDescriptionBoxOpen = !this.showDescriptionBoxOpen;
  }

  addNewLine() {
    const newRow = {
      productName: '',
      productPrice: ''
    };
    this.productRows.push(newRow);
  }

  addDescription(index: number) {
    console.log(index)
    this.productRows[index].showDescriptionBox = !this.productRows[index].showDescriptionBox;
  }
  removeRow(rowIndex: number) {
    this.productRows.splice(rowIndex, 1);
  }

  selectedValue(event: any) {
    this.tax = event.target.value
    console.log(this.tax)
    this.clientService.sendTaxData(this.tax);
  }

  onAmountChange(value: number) {
    this.amount = value;
    this.clientService.sendAmountData(this.amount);
  }
}
