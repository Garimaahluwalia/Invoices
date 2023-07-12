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

interface IPrices {
  subtotal: number,
  rate: number,
  total: number
}
@Component({
  selector: 'app-paymentdetails',
  templateUrl: './paymentdetails.component.html',
  styleUrls: ['./paymentdetails.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]

})
export class PaymentdetailsComponent implements OnInit {
  public amount: any;
  public tax: any;
  public rate: any;
  public total: any;
  public currency: any;
  public taxAmountData: any;
  public totalAmount: any;
  public totalrate: any;
  public productRows: any[] = [];
  public totalTotalAmount: any;
  public AmountInWords: any;
  public totalAmountInWords!: string;
  public totalOfProduct: any;
  public totalOfAmountFromProduct: any;
  public taxamount: any;
  public selectedCurrency: any = DEFAULTCURRENCY.symbol;
  public currencies = CURRENCY; // Currency
  private destroyed: ReplaySubject<boolean> = new ReplaySubject<boolean>(0);

  constructor(public clientService: ClientService,
    public addinvoiceService: AddInvoicesService,
    public invoiceService: InvoiceService,
    public invoiceDataHandlerService: InvoiceDataHandlerService) { }
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
          const calculatedPrices =
            this.totalOfProduct = this.productRows.reduce((acc: IPrices, row) => {
              acc.total += parseFloat(row.total || 0);
              acc.subtotal += parseFloat(row.amount || 0);
              acc.rate += parseFloat(row.rate || 0);
              return acc;
            }, prices);
          console.log(calculatedPrices);
          const {subtotal, total, rate } = calculatedPrices;
          this.totalAmountInWords = !isNaN(parseFloat(this.totalOfProduct)) ? numberToWords(this.totalOfProduct) : (parseFloat(this.totalOfProduct) ? numberToWords(this.totalOfAmountFromProduct) : "");

          this.invoiceDataHandlerService.subtotalofamount =  subtotal;
          this.invoiceDataHandlerService.totalamountoftax = rate;
          this.invoiceDataHandlerService.totalamount = total;

        } else {

          this.invoiceDataHandlerService.subtotalofamount = 0;
          this.invoiceDataHandlerService.totalamountoftax = 0;
          this.invoiceDataHandlerService.totalamount = 0;
        }
      }
    });



    this.addinvoiceService.receiveCurrency().subscribe((res: string) => {
      this.currency = res;
      const currency = this.currencies.find(currency => currency.code === this.currency);
      this.currency = currency?.symbol;


      console.log(currency, "symbol")
      console.log(this.currency, "Currency from payment")
    });

    if (!this.currency || this.currency === '') {
      this.currency = this.selectedCurrency;
    }
    this.invoiceService.invoiceEmitter.subscribe((res: any) => {
      this.currency = res.currency;
    })
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
