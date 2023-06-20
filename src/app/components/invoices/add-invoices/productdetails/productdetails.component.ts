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
  public selectedTaxRate: TAXES = TAXES.NONE;
  public TotalAmount: any;
  public selectedTaxRateValue: number = 0;
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
    this.addDescriptionDefault;
    this.addNewLine();
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

  onTaxRateChange() {
    this.selectedTaxRateValue = parseFloat(this.taxAmountData?.[this.selectedTaxRate] || 0); // This line assigns a value to the this.selectedTaxRateValue variable.. this.taxAmountData?.[this.selectedTaxRate] attempts to access the value from the this.taxAmountData object using this.selectedTaxRate as the key. The optional chaining operator (?.) checks if this.taxAmountData is not null or undefined. If it is, it returns undefined without attempting to access the property [this.selectedTaxRate] . If this.taxAmountData is not null or undefined, it proceeds to access the value using [this.selectedTaxRate]. parseFloat is used to parse the retrieved value as a floating-point number. If the value cannot be parsed, it returns NaN (Not-a-Number). || 0 provides a default value of 0 if the result of the previous expression is undefined or NaN.
    this.clientService.sendTaxName(this.selectedTaxRate);
  }


  Currency(event: any) {
    this.currency = event.target.value;
    console.log(this.currency, "currency data");
    this.addinvoiceService.sendCurrency(this.currency)
  }




  onProductValueChange(i: number) {
    const rows = [...this.productRows];
    if (this.selectedTaxRate !== TAXES.NONE) // This condition checks if the this.selectedTaxRate is not equal to TAXES.NONE. It verifies if a tax rate other than "none" is selected.
    {
      const selectedAmount = Number(rows?.[i]?.amount || 0); //retrieves the Amount value of the product at index i from the rows array. The optional chaining operator (?.) is used to handle cases where rows or rows[i] might be undefined or null and The value is then converted to a number using the Number function. If the conversion fails, it defaults to 0

      if (selectedAmount > 0)  // This condition checks if the selectedAmount is greater than 0. It ensures that calculations are performed only when a positive amount is present.
      {
        const selectedTaxAmount = this.selectedTaxRateValue; // This line retrieves the selected tax amount from the this.selectedTaxRateValue variable. It assumes that this.selectedTaxRateValue holds the tax amount related to the selected tax rate
        const rate = (selectedTaxAmount * 100) / selectedAmount;
        const roundedRate = rate.toFixed(2)
        // This line calculates the rate by dividing the selectedTaxAmount by selectedAmount and then multiplying the result by 100. It determines the tax rate as a percentage based on the selected tax amount and the product amount.
        rows[i].rate = roundedRate; // This line updates the rate property of the product at index i in the rows array with the calculated tax rate.

        const taxAmount = (selectedAmount * selectedTaxAmount) / 100;  // This line calculates the tax amount. It multiplies the selected amount by the selected tax rate (which is divided by 100 to convert it from a percentage to a decimal).
        const roundedTaxAmount = taxAmount.toFixed(2);
        rows[i].total = (selectedAmount + taxAmount).toFixed(2); // This line calculates the total amount after tax. It adds the selected amount to the tax amount and assigns the result to the total property of the i-th element in the rows array.
      }
    }
    this.addinvoiceService.sendProductChanges(rows);
  }

}
