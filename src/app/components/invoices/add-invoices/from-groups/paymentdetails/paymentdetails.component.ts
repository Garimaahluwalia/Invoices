import { Component, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { ClientService } from 'src/app/services/clients/client.service';
import { AddInvoicesService } from 'src/app/services/invoices/add-invoices.service';
import { IbankDetails } from 'src/app/services/invoice-data-handler/invoice-data-handler.dto';
import { numberToWords } from "src/app/common/numberToWords";
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { CURRENCY, DEFAULTCURRENCY } from 'src/app/types/currency';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { InvoiceDataHandlerService } from 'src/app/services/invoice-data-handler/invoice-data-handler.service';
import { ChangeDetectorRef } from '@angular/core';
import { IPrices, IProductRows } from 'src/app/types/product';


@Component({
  selector: 'app-paymentdetails',
  templateUrl: './paymentdetails.component.html',
  styleUrls: ['./paymentdetails.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]

})
export class PaymentdetailsComponent implements OnInit {
  public amount!: number;
  public tax!: number;
  public rate!: number;
  public total!: number;
  public defaultCurrency: string = DEFAULTCURRENCY.symbol;
  public currency: string = this.defaultCurrency;
  public taxAmountData!: number;
  public totalAmount!: number;
  public totalrate!: number;
  public productRows: any[] = [];
  public totalTotalAmount!: number;
  public AmountInWords!: string;
  public totalAmountInWords!: string;
  public totalOfProduct: IPrices = {
    subtotal: 0,
    rate: 0,
    total: 0
  };
  public totalOfAmountFromProduct!: number;
  public taxamount!: number;
  public currencies = CURRENCY; 
  private destroyed: ReplaySubject<boolean> = new ReplaySubject<boolean>(0);
  public totalInWords!: string;

  constructor(public clientService: ClientService,
    public addinvoiceService: AddInvoicesService,
    public invoiceService: InvoiceService,
    public invoiceDataHandlerService: InvoiceDataHandlerService,
    private __ref: ChangeDetectorRef
    ) { }
  ngOnInit(): void {

    this.addinvoiceService.recieveProductRows().subscribe((res: any[]) => {
      this.productRows = res;
      if (res.length > 0) {
        const firstElement = res[0];
        this.amount = firstElement.amount;
        this.tax = firstElement.tax;
        this.rate = firstElement.rate;
        this.taxamount = firstElement.taxamount;
        this.total = firstElement.total;
        if (this.productRows.length > 0) {
          const prices: IPrices = {
            subtotal: 0,
            rate: 0,
            total: 0
          };
          const calculatedPrices = this.totalOfProduct = this.productRows.reduce((acc: IPrices, row) => {
            acc.total += parseFloat(row.total || 0);
            acc.subtotal += parseFloat(row.amount || 0);
            acc.rate += parseFloat(row.rate || 0);
            return acc;
          }, prices);

          const { subtotal, total, rate } = calculatedPrices;
          this.totalInWords = '';
          if (calculatedPrices.total === 0) {
            this.totalInWords = numberToWords(calculatedPrices.subtotal.toString());
          } else {
            this.totalInWords = numberToWords(calculatedPrices.total.toString());
          }
          this.invoiceDataHandlerService.subtotalofamount = subtotal;
          this.invoiceDataHandlerService.totalamountoftax = rate;
          this.invoiceDataHandlerService.totalamount = total;

        } else {

          this.invoiceDataHandlerService.subtotalofamount = 0;
          this.invoiceDataHandlerService.totalamountoftax = 0;
          this.invoiceDataHandlerService.totalamount = 0;
        }
      }
    });



    this.addinvoiceService.receiveCurrency().subscribe((currency: string) => {
      const currencyDetails = this.currencies.find((v) => v.code === currency);
      if (currencyDetails) {
        this.currency = currencyDetails?.symbol;
      }
    });


  }
  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  public Bankdetails: IbankDetails = {
    "accountHolderName": "M CODE INFOSOFT",
    "accountNumber": "098878776809454",
    "ifscCode": "ICICINBBCTS",
    "swiftCode": "9898BHBZA23",
    "bank": "ICICI Bank Ltd.",
  };

}
