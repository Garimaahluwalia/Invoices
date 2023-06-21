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
  showTaxHeaders: boolean = true;
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


  
  constructor(public clientService: ClientService, public addinvoiceService: AddInvoicesService
  ) { }
  ngOnInit(): void {
    this.addDescriptionDefault;
    this.addNewLine();
    // this.loadCurrencies();
    this.addinvoiceService.receiveCurrency().subscribe((res: any) => {
      this.currencyData = res;
    });

    this.addinvoiceService.getTaxAmount().subscribe((res: any) => {
      this.taxAmountData = res;
      this.onProductValueChange(0);
      console.log(this.taxAmountData, "amountoftax");
    });



  }

  // loadCurrencies() {
  //   this.currencies = this.currency;
  // }

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
    if (this.productRows.length > 1) {
      this.productRows.splice(rowIndex, 1);
    }
  }
  

  onTaxRateChange() {
    this.selectedTaxRateValue = parseFloat(this.taxAmountData?.[this.selectedTaxRate] || 0); // This line assigns a value to the this.selectedTaxRateValue variable.. this.taxAmountData?.[this.selectedTaxRate] attempts to access the value from the this.taxAmountData object using this.selectedTaxRate as the key. The optional chaining operator (?.) checks if this.taxAmountData is not null or undefined. If it is, it returns undefined without attempting to access the property [this.selectedTaxRate] . If this.taxAmountData is not null or undefined, it proceeds to access the value using [this.selectedTaxRate]. parseFloat is used to parse the retrieved value as a floating-point number. If the value cannot be parsed, it returns NaN (Not-a-Number). || 0 provides a default value of 0 if the result of the previous expression is undefined or NaN.


    this.clientService.sendTaxName(this.selectedTaxRate);
    this.productRows.forEach((row, index) => {
      this.onProductValueChange(index);
    });
  }


  // Currency(event: any) {
  //   this.currency = event.target.value;
  //   console.log(this.currency, "currency data");
  //   this.addinvoiceService.sendCurrency(this.currency)
  // }




  onProductValueChange(i: number) {
    const rows = [...this.productRows];
    if (this.selectedTaxRate !== TAXES.NONE) {
      const selectedAmount = Number(rows?.[i]?.amount || 0); 
      if (selectedAmount > 0)  
      {
        const selectedTaxAmount = this.selectedTaxRateValue; 
        const rate = (selectedTaxAmount * selectedAmount) / 100;
        // console.log(rate, "the rate will be 0.0018")
        console.log((selectedTaxAmount / selectedAmount) * 100)
        rows[i].rate = rate ; 
        const taxAmount = (selectedAmount * selectedTaxAmount) / 100; 
        const roundedTaxAmount = taxAmount.toFixed(2);
        rows[i].total = (selectedAmount + taxAmount).toFixed(2); 
       
      }
    }
    else {
      rows[i].rate = '0';
      rows[i].total = '0';
    }


    this.addinvoiceService.sendProductChanges(rows);
  }



}
