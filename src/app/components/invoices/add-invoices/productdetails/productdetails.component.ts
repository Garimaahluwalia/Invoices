import { Component, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ClientService } from 'src/app/services/clients/client.service';
import { AddInvoicesService } from 'src/app/services/invoices/add-invoices.service';
import { TAXES } from 'src/app/types/taxes';
import { CURRENCY } from 'src/app/types/currency';

@Component({
  selector: 'app-other-component',
  template: `
    <div>
      <h1>Currency Data</h1>
      <ul>
        <li *ngFor="let currency of currencies">
          {{ currency.name }} ({{ currency.code }}) - {{ currency.symbol }}
        </li>
      </ul>
    </div>
  `
})
export class OtherComponent {
  currencies = CURRENCY;
}

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
  public HSN_SAC: any;
  public name!: "";
  public description!: "";
  public editor: any = ClassicEditor;
  public data: any = `<p> Enter description here </p>`;
  public serialNumber: number = 1;
  public showDescriptionBox: boolean = false;
  public showDescriptionBoxOpen: boolean = false;
  public productRows: any[] = [];
  public taxAmountData: any;
  public inputamountData: any;
  public eventamount!: any;
  public selectedTaxRate: TAXES = TAXES.NONE;
  public selectedCurrency: any;
  public TotalAmount: any;
  public selectedTaxRateValue: number = 0;
  public currencies = CURRENCY;
  public inputcurrency: any;


  constructor(public clientService: ClientService, public addinvoiceService: AddInvoicesService
  ) { }
  ngOnInit(): void {
    this.addDescriptionDefault;
    this.addNewLine();

    this.addinvoiceService.getTaxAmount().subscribe((res: any) => {
      this.taxAmountData = res;
      // console.log(this.taxAmountData, "taxAmountData")
      this.onProductValueChange(0);
    });


    this.addinvoiceService.receiveCurrency().subscribe((res: any) => {
      this.inputcurrency = res;
    });
    if (!this.inputcurrency || this.inputcurrency === '') {
      this.inputcurrency = '$';
    }
  }


  addDescriptionDefault() {
    this.showDescriptionBoxOpen = !this.showDescriptionBoxOpen;
  }

  addNewLine() {
    const newRow = {
      HSN_SAC: '',
      amount: '',
      tax: '',
      rate: '',
      total: '',
    };
    this.productRows.push(newRow);
  }

  addDescription(index: number) {
    console.log(index, "adddescription")
    this.productRows[index].showDescriptionBox = !this.productRows[index].showDescriptionBox;
  }
  removeRow(rowIndex: number) {
    if (this.productRows.length > 1) {
      this.productRows.splice(rowIndex, 1);
    }
  }


  onTaxRateChange() {
    this.selectedTaxRateValue = parseFloat(this.taxAmountData?.[this.selectedTaxRate] || 0);
    // console.log(this.selectedTaxRateValue, "Selected Rate Value");
    this.clientService.sendTaxName(this.selectedTaxRate);
    this.productRows.forEach((row, index) => {
      this.onProductValueChange(index);
    });
  }


  currencyChange(event: any) {
    this.selectedCurrency = event.target.value;
    const selectedCurrency = this.currencies.find(currency => currency.code === this.selectedCurrency);
    const symbol = selectedCurrency ? selectedCurrency.symbol : '$';
    this.addinvoiceService.sendCurrency(symbol);
  }



  onProductValueChange(i: number) {
    const rows = [...this.productRows];
    if (this.selectedTaxRate !== TAXES.NONE) {
      const selectedAmount = Number(rows?.[i]?.amount || 0);
      if (selectedAmount > 0) {
        const selectedTaxAmount = this.selectedTaxRateValue;
        const rate = (selectedTaxAmount * selectedAmount) / 100;
        // console.log((selectedTaxAmount / selectedAmount) * 100);
        rows[i].rate = rate;
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
