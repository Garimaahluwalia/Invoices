import { Component, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ClientService } from 'src/app/services/clients/client.service';
import { AddInvoicesService } from 'src/app/services/invoices/add-invoices.service';
import { TAXES } from 'src/app/types/taxes';
import { CURRENCY } from 'src/app/types/currency';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';


@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]

})
export class ProductdetailsComponent implements OnInit {
  showTaxHeaders: boolean = true;
  public taxes: string[] = Object.values(TAXES);
  public tax: TAXES = TAXES.GST;
  public rate!: number;
  public amount!: number;
  public HSN_SAC: any;
  public name!: "";
  public description!: "";
  public editor: any = ClassicEditor;
  public data: any = `<p> Enter description here </p>`;
  public showDescriptionBoxOpen: boolean = false;
  public productRows: any[] = [];
  public taxAmountData: any;
  public selectedTaxRate: TAXES = TAXES.NONE;
  public selectedCurrency: any;
  public selectedTaxRateValue: number = 0;
  public currencies = CURRENCY;
  public inputcurrency: any;
  public taxamount: any;

  constructor(public clientService: ClientService,
    public addinvoiceService: AddInvoicesService,
    public invoiceService: InvoiceService
  ) { }


  ngOnInit(): void {
    this.addinvoiceService.recieveProductRows().subscribe((res: any) => {
      this.productRows = res;
    });

    if (this.productRows.length > 0) {
      const firstProduct = this.productRows[0];
      this.name = firstProduct.name;
      this.HSN_SAC = firstProduct.HSN_SAC;
      this.amount = firstProduct.amount;
      this.rate = firstProduct.rate;
      this.taxamount = firstProduct.taxamount;
      this.description = firstProduct.description;
    }

    this.addDescriptionDefault;
    this.addNewLine();

    this.addinvoiceService.getTaxAmount().subscribe((res: any) => {
      this.taxAmountData = res;
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
      rate: '',
      taxamount: '',
      total: '',
      description: ''
    };
    this.productRows.push(newRow);
    const newIndex = this.productRows.length - 1;
    this.onProductValueChange(newIndex);
  }


  addDescription(index: number) {
    this.productRows[index].showDescriptionBox = !this.productRows[index].showDescriptionBox;
  }

  removeRow(rowIndex: any) {
    const rows = [...this.productRows];
    if (rows.length > 1) {
      rows.splice(rowIndex, 1);
      this.productRows = rows;
    }
    this.addinvoiceService.sendProductChanges(rows);
  }




  onTaxRateChange() {
    this.selectedTaxRateValue = parseFloat(this.taxAmountData?.[this.selectedTaxRate] || 0);
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
        rows[i].rate = parseFloat(rate.toFixed(2));
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
