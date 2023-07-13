import { Component, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, NgForm, NgModel } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ClientService } from 'src/app/services/clients/client.service';
import { AddInvoicesService } from 'src/app/services/invoices/add-invoices.service';
import { TAXES } from 'src/app/types/taxes';
import { DEFAULTCURRENCY, CURRENCY } from 'src/app/types/currency';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { takeUntil } from 'rxjs';



@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]

})
export class ProductdetailsComponent implements OnInit {


  public showTaxHeaders: boolean = true;
  public taxes: string[] = Object.values(TAXES); 
  public rate!: number;
  public amount!: number;
  public HSN_SAC: any;
  public name!: "";
  public description!: "";
  public editor: any = ClassicEditor;
  public showDescriptionBoxOpen: boolean = false;
  public productRows: any[] = [];
  public taxAmountData: any;
  public selectedTaxRate: TAXES = TAXES.NONE;  
  public selectedCurrency: any = DEFAULTCURRENCY.code;
  public selectedTaxRateValue: number = 0;
  public currencies = CURRENCY; // Currency
  public inputcurrency: any;
  public taxamount: any;
  private destroyed: ReplaySubject<boolean> = new ReplaySubject<boolean>(0);
  constructor(public clientService: ClientService,
    public addinvoiceService: AddInvoicesService,
    public invoiceService: InvoiceService
  ) { }


  ngOnInit(): void {
    this.addinvoiceService.recieveProductRows().pipe(takeUntil(this.destroyed)).subscribe((res: any) => {
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

    this.addinvoiceService.getTaxAmount().pipe(takeUntil(this.destroyed)).subscribe((res: any) => {
      this.taxAmountData = res;
      this.onProductValueChange(0);
    });

   
    // currency
    this.addinvoiceService.receiveCurrency().pipe(takeUntil(this.destroyed)).subscribe((res: string) => {
      this.inputcurrency = res;
      const currency = this.currencies.find(currency => currency.code === this.inputcurrency);
      this.inputcurrency = currency?.symbol;
    });


    if (!this.inputcurrency || this.inputcurrency === '') {
      this.inputcurrency = this.selectedCurrency;
    }

    //currency
  }


  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
  currencyChange(event: any) {  // Currency
    this.selectedCurrency = event.target.value;
    console.log(this.selectedCurrency, "SELECTEDCURRENCY");
    this.addinvoiceService.sendCurrency(this.selectedCurrency);
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
    const row = this.productRows[index];
    row.showDescriptionBox = !row.showDescriptionBox;
    if (!row.showDescriptionBox) {
      row.description = ''; 
    }
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
      this.onProductValueChange(index, this.selectedTaxRateValue);
    });
  }



  onProductValueChange(i: number, taxRateChange?: number) {
    const row = this.productRows[i];
    if (this.selectedTaxRate !== TAXES.NONE) {
      row.taxamount = taxRateChange ? taxRateChange : row.taxamount;
      const selectedAmount = Number(row.amount || 0);
      if (selectedAmount > 0) {
        const selectedTaxAmount = row.taxamount; 
        const rate = (selectedTaxAmount * selectedAmount) / 100;
        row.rate = parseFloat(rate.toFixed(2));
        const taxAmount = (selectedAmount * selectedTaxAmount) / 100;
        const roundedTaxAmount = taxAmount.toFixed(2);
        row.total = (selectedAmount + taxAmount).toFixed(2);
      } else {
        row.rate = '0';
        row.total = '0';
      }
    } else {
      row.rate = '0';
      row.total = '0';
    }

    this.addinvoiceService.sendProductChanges(this.productRows);
  }

  public onEditorChange(description: NgModel, value: string) {
    description.control.setValue(value);
  }



}
