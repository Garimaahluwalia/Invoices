import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, Subscription, takeUntil } from 'rxjs';
import { IInvoice } from 'src/app/services/invoice-data-handler/invoice-data-handler.dto';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { CURRENCY } from 'src/app/types/currency';
import { ModalEvents } from 'src/app/types/modal';
import { IRecordPayment } from 'src/app/types/recordPayments';

@Component({
  selector: 'app-add-record-payment',
  templateUrl: './add-record-payment.component.html',
  styleUrls: ['./add-record-payment.component.css']
})
export class AddRecordPaymentComponent implements OnInit {
  @ViewChild('openRecordModal', { static: false }) private openRecordModal!: ElementRef<HTMLButtonElement>;
  @ViewChild('closeRecordModal', { static: false }) private closeRecordModal!: ElementRef<HTMLButtonElement>;
  public destroyed: ReplaySubject<boolean> = new ReplaySubject(0);
  public data: any;
  public invoiceId!: string;
  public recordPayment!: IRecordPayment;
  public action: string = "";
  public amountReceived!: number;
  public amountReceivedInINR!: number;
  public TDS!: number;
  public TDSWithHeld!: number;
  public amountToSettle!: number;
  public paymentDate!: number;
  public additionalNotes!: number;
  public selectedInvoice: any = null
  public invoices: IInvoice[] = [];
  public currencies = CURRENCY;
  public currencyData: any;
  public isEditing = false;
  public exchangeRate = '83.333333';


  constructor(public modalService: ModalService,
    public router: Router,
    public invoiceService: InvoiceService) { }


  ngOnInit(): void {

  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  ngAfterViewInit(): void {
    this.modalService.recieveEvent(ModalEvents.RecordPayment).pipe(takeUntil(this.destroyed)).subscribe((res => {
      const { data, status } = res;
      this.invoiceId = data.id;
      this.action = data.action;
      this.data = data, status;

      if (status) {
        this.openModal();
      } else {
        this.closeModal();
      }
    }));

    this.invoiceService.recieveInvoices().pipe(takeUntil(this.destroyed)).subscribe((data: any) => {
      this.invoices = data;
      this.selectedInvoice = this.invoices.find(invoice => invoice._id === this.invoiceId);
      const currency = this.currencies.find(currency => currency.code === this.selectedInvoice.currency);
      this.currencyData = currency?.symbol;
      this.amountReceived = this.selectedInvoice.totalamount !== 0 ? this.selectedInvoice.totalamount :
        this.selectedInvoice.subtotalofamount;
      this.computeAmountInINR();
    });

  }

  openModal() {
    this.openRecordModal?.nativeElement?.click();
  }


  computeAmountInINR() {
    if (this.amountReceived && this.exchangeRate) {
      this.amountReceivedInINR = this.amountReceived * parseFloat(this.exchangeRate);
    }
  }


  computeTDSAmount() {
    if (this.TDS && this.amountReceived) {
      this.TDSWithHeld = (this.TDS / 100) * this.amountReceived;
      this.amountToSettle = this.amountReceived - this.TDSWithHeld;
      this.computeAmountInINR();
    }
  }


  closeModal() {
    this.closeRecordModal.nativeElement.click();
    if (this.action === "save-invoice-page") {
      this.router.navigate(["save-invoice-page", this.invoiceId]);
    } else if (this.action === "invoice") {
      this.router.navigate(["invoice"]).then(() => {
        this.modalService.sendEvent(ModalEvents.RecordPayment, { status: false })
      });
    }
  }

  saveChanges() {
    const payload: IRecordPayment = {
      amountReceived: this.amountReceived,
      amountReceivedInINR: this.amountReceivedInINR,
      TDS: this.TDS,
      TDSWithHeld: this.TDSWithHeld,
      amountToSettle: this.amountToSettle,
      paymentDate: this.paymentDate,
      additionalNotes: this.additionalNotes
    };
    this.invoiceService.sendRecordPayment(this.invoiceId, payload).subscribe((res) => {
      this.recordPayment = res;
      this.invoiceService.getAll();
      this.closeModal();
    })
  }

  calculateTDS() {

  }
  ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

}
