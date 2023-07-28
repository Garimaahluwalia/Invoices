import { Component, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, NgForm, NgModel } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ClientService } from 'src/app/services/clients/client.service';
import { AddInvoicesService } from 'src/app/services/invoices/add-invoices.service';
import { TAXES } from 'src/app/types/taxes';
import { DEFAULTCURRENCY, CURRENCY } from 'src/app/types/currency';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal/modal.service';
import { Field, FieldType } from 'src/app/types/columnType';
import { AddFieldsComponent } from 'src/app/modals/add-fields/add-fields.component';



@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]

})
export class ProductdetailsComponent implements OnInit {
  @ViewChild(AddFieldsComponent) public addFieldModal!: AddFieldsComponent
  public defaultDateRange!: string;
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
  public selectedCurrency: any = DEFAULTCURRENCY.code;  // Currency 
  public selectedTaxRateValue: number = 0;
  public currencies = CURRENCY; // Currency
  public inputcurrency: any;  // currency
  public taxamount!: number;
  private destroyed: ReplaySubject<boolean> = new ReplaySubject<boolean>(0);
  public readonly FieldTypes = FieldType;
  public fields: Field[] = [
    {
      "type": FieldType.TEXT,
      "fieldName": "item",
      "label": "Item",
      "hidden": false,
      "default": true,
      "sortOrder": 1,
      "custom": false,
      "delete": false,
      "tax": false,
      "readonly": false,
    },
    {
      "type": FieldType.TEXT,
      "fieldName": "HSN_SAC",
      "label": "HSN_SAC",
      "hidden": false,
      "default": true,
      "sortOrder": 3,
      "custom": false,
      "delete": false,
      "tax": false,
      "readonly": false,
    },
    {
      "type": FieldType.NUMBER,
      "fieldName": "amount",
      "label": "Amount",
      "hidden": false,
      "default": true,
      "sortOrder": 3,
      "custom": false,
      "delete": false,
      "tax": false,
      "readonly": false,
    },
  ]


  public TaxFields: Field[] = [
    {
      "type": FieldType.NUMBER,
      "fieldName": "rate",
      "label": "Taxamount",
      "hidden": false,
      "default": true,
      "sortOrder": 4,
      "custom": false,
      "delete": false,
      "tax": true,
      "readonly": true,
    },
    {
      "type": FieldType.NUMBER,
      "fieldName": "total",
      "label": "Total",
      "hidden": false,
      "default": true,
      "sortOrder": 4,
      "custom": false,
      "delete": false,
      "tax": true,
      "readonly": true,
    }
  ]

  constructor(public clientService: ClientService,
    public addinvoiceService: AddInvoicesService,
    public invoiceService: InvoiceService,
    public router: Router,
    public modalService: ModalService
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
  }


  onTaxRateChange() {
    this.selectedTaxRateValue = parseFloat(this.taxAmountData?.[this.selectedTaxRate] || 0);
    this.fields = this.fields.filter(v => !v.tax);
    if (this.selectedTaxRate !== "NONE") {
      const field: Field = new Field(FieldType.NUMBER, "taxamount" as unknown as string, 2, true, false, false, this.selectedTaxRate);
      this.fields = [...this.fields, field, ...this.TaxFields];
    }

    this.clientService.sendTaxName(this.selectedTaxRate);
    this.productRows.forEach((row, index) => {
      this.onProductValueChange(index, this.selectedTaxRateValue);
    });
  }
  
  addNewLine() {
    const obj: any = {};
    for (const field of this.fields) {
      obj[field.fieldName] = "";
    }
    this.productRows.push(obj);
    const newIndex = this.productRows.length - 1;
    this.onProductValueChange(newIndex);
  }

  addFields() {
    this.addFieldModal.openModal();
  }

  handleSaveEvent(fields: Field[]) {
    this.fields = fields;
  }
  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  currencyChange(event: any) {
    this.selectedCurrency = event.target.value;
    this.addinvoiceService.sendCurrency(this.selectedCurrency);
  }

  addDescriptionDefault() {
    this.showDescriptionBoxOpen = !this.showDescriptionBoxOpen;
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
