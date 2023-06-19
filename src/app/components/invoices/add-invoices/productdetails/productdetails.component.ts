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
  public taxRate: any;
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
  public currencyData: any;
  public taxAmountData: any;
  public inputamountData: any;
  public eventamount!: any;
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

  showTaxHeaders: boolean = true;

  constructor(public clientService: ClientService, public addinvoiceService: AddInvoicesService
  ) { }
  ngOnInit(): void {
    this.addNewLine();
    this.addDescriptionDefault;
    this.loadCurrencies();
    this.addinvoiceService.receiveCurrency().subscribe((res: any) => {
      this.currencyData = res;
    });
    
    this.addinvoiceService.getTaxAmount().subscribe((res: any) => {
      this.taxAmountData = res;
      this.onProductValueChange(0);
      console.log(this.taxAmountData, "amountoftax");
    });

  }

  loadCurrencies() {
    this.currencies = this.currency;
  }

  addDescriptionDefault() {
    this.showDescriptionBoxOpen = !this.showDescriptionBoxOpen;
  }

  addNewLine() {
    const newRow = {
      amount: '',
      tax: '',
      rate: '',
      total: '',
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
    /* this.clientService.sendTaxData(this.tax); */
    /* this.addinvoiceService.recieveProductRows().subscribe((res: any) => {
      this.inputamountData = res;
      console.log(this.inputamountData, "hiiiiiiiiiiiiiiiiii")
    }); */
  }


  Currency(event: any) {
    this.currency = event.target.value;
    console.log(this.currency, "currency data")
    this.addinvoiceService.sendCurrency(this.currency)
  }

  amountSend(event: any) {
    this.eventamount = event.target.value;
    console.log(this.eventamount, " this.eventamount")
  }

  onProductValueChange(i: number) {
    const rows = [...this.productRows];
    // console.log(this.taxAmountData);
    const selectedAmount = Number(rows?.[i]?.amount || 0);
    const selectedTaxAmount = parseFloat(this.taxAmountData[this.tax]);
    const rate = (selectedTaxAmount * 100) / selectedAmount;
    rows[i].rate  = rate;
    console.log(rows);
    //const selectedAmount = this.eventamount;
    // console.log(selectedAmount, "amountselected");
    //console.log(selectedTaxAmount, "selectedTaxAmount", this.eventamount, "eventAmountNumeric");
    this.addinvoiceService.sendProductChanges(rows);
  }

}
