import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
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
  public amountReceivedForSettle!: number;
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
  private readonly notifier!: NotifierService;


  constructor(public modalService: ModalService,
    public router: Router,
    public invoiceService: InvoiceService,
    public notifierService: NotifierService) {
    this.notifier = notifierService;
  }


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
      this.getInvoice();
    }));



  }

  getInvoice() {
    this.selectedInvoice = this.invoiceService.invoices.find(invoice => invoice._id === this.invoiceId);
    const currency = this.currencies.find(currency => currency.code === this.selectedInvoice.currency);
    this.currencyData = currency?.symbol;
    this.amountReceived = this.selectedInvoice.totalamount !== 0 ? this.selectedInvoice.totalamount :
      this.selectedInvoice.subtotalofamount;
    this.computeAmountInINR();
    this.amountReceivedForSettle = this.selectedInvoice.totalamount !== 0 ? this.selectedInvoice.totalamount : this.selectedInvoice.subtotalofamount;

  }

  openModal() {
    this.openRecordModal?.nativeElement?.click();
  }


  computeAmountInINR() {
    if (this.amountReceived && this.exchangeRate) {
      this.amountReceivedInINR = parseFloat((this.amountReceived * parseFloat(this.exchangeRate)).toFixed(2));
    }
  }


  computeTDSAmount() {
    if (this.TDS && this.amountReceived) {
      this.TDSWithHeld = parseFloat(((this.TDS / 100) * this.amountReceivedForSettle).toFixed(2));
      this.amountReceived = this.amountReceivedForSettle - this.TDSWithHeld;
      this.amountToSettle = parseFloat(this.amountReceivedForSettle.toFixed(2));
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
      this.notifier.show({
        type: 'success',
        message: 'status updated successfully',
        id: 'THAT_NOTIFICATION_ID',
      });
      setTimeout(() => {
        this.notifier.hide('THAT_NOTIFICATION_ID');
      }, 2000);
    })
  }


  ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

}
