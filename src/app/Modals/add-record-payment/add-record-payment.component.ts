import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ReplaySubject, Subscription, takeUntil } from 'rxjs';
import { IInvoice } from 'src/app/services/invoice-data-handler/invoice-data-handler.dto';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { CURRENCY } from 'src/app/types/currency';
import { ModalEvents, ROUTER_ACTIONS } from 'src/app/types/modal';
import { IRecordPayment } from 'src/app/types/recordPayments';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-add-record-payment',
  templateUrl: './add-record-payment.component.html',
  styleUrls: ['./add-record-payment.component.css']
})
export class AddRecordPaymentComponent implements OnInit {
  @ViewChild('openRecordModal', { static: false }) private openRecordModal!: ElementRef<HTMLButtonElement>;
  @ViewChild('closeRecordModal', { static: false }) private closeRecordModal!: ElementRef<HTMLButtonElement>;
  @ViewChild('paymentDetailDiv') paymentDetailDiv!: ElementRef;
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
  public additionalNotes!: number;
  public selectedInvoice: any = null
  public invoices: IInvoice[] = [];
  public currencies = CURRENCY;
  public currencyData: any;
  public isEditing = false;
  public exchangeRate = '83.333333';
  private readonly notifier!: NotifierService;
  public paymentDate = new Date();
  public disabledInput: boolean = false;
  public invoicedata: any;
  constructor(public modalService: ModalService,
    public router: Router,
    public invoiceService: InvoiceService,
    public notifierService: NotifierService,
    private datePipe: DatePipe,
    private cdRef: ChangeDetectorRef) {
    this.paymentDate = this.datePipe.transform(this.paymentDate, 'yyyy-MM-dd') as any;
    this.notifier = notifierService;
  }


  ngOnInit(): void {


  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
}

@HostListener('document:click', ['$event'])
    public onDocumentClick(event: MouseEvent): void {
        const targetElement = event.target as HTMLElement;
      
        // Check if the clicked element is outside of the paymentDetailDiv
        if (this.isEditing && targetElement && !this.paymentDetailDiv.nativeElement.contains(targetElement)) {
            this.isEditing = false;
        }
    }


  // viewPayments() {
  //   this.invoiceService.getInvoice(this.invoiceId).subscribe((res) => {
  //     this.invoicedata = res;
  //     this.TDSWithHeld = this.invoicedata.TDSWithHeld;
  //     this.TDS = this.invoicedata.TDS;
  //     this.amountReceived = this.invoicedata.amountReceived;
  //     this.amountReceivedForSettle = this.invoicedata.amountReceivedForSettle;
  //     this.amountReceivedInINR = this.invoicedata.amountReceivedInINR;
  //     this.paymentDate = this.invoicedata.paymentDate;
  //     this.additionalNotes = this.invoicedata.additionalNotes;
  //   })
  // }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
    this.modalService.recieveEvent(ModalEvents.RecordPayment).pipe(takeUntil(this.destroyed)).subscribe((res => {
      console.log(res, "add-record payment");
      const { data, status } = res;
      this.invoiceId = data.id;
      this.action = data.action;
      this.data = data, status;
      this.disabledInput = data?.disabled || false;


      if (status) {
        this.openModal();
      } else {
        this.closeModal();
      }
      this.getInvoice();
      // this.viewPayments();
    }));
  }

  getInvoice() {
    this.selectedInvoice = this.invoiceService.invoices.find(invoice => invoice._id === this.invoiceId);
    console.log(this.selectedInvoice , "selectedinvoice for mark as paid")
    const currency = this.currencies.find(currency => currency.code === this.selectedInvoice.currency);
    this.currencyData = currency?.symbol;
    this.amountReceived = this.selectedInvoice.totalamount !== 0 ? this.selectedInvoice.totalamount :
      this.selectedInvoice.subtotalofamount;
      console.log(this.amountReceived, "Amount received")
      this.amountReceivedForSettle = this.selectedInvoice.totalamount !== 0 ? this.selectedInvoice.totalamount : this.selectedInvoice.subtotalofamount;
      this.computeAmountInINR();
  }

  openModal() {
    this.openRecordModal?.nativeElement?.click();
  }


  computeAmountInINR() {
    let exchangeRate = this.exchangeRate || 0;
    if (this.amountReceived) {
      this.amountReceivedInINR = parseFloat((this.amountReceived * parseFloat(exchangeRate as string)).toFixed(2));
    }
  }


  computeTDSAmount() {
    if (this.TDS && this.amountReceived) {
      this.TDSWithHeld = parseFloat(((this.TDS / 100) * this.amountReceivedForSettle).toFixed(2));
      this.amountReceived = this.amountReceivedForSettle - this.TDSWithHeld;
      this.amountToSettle = parseFloat(this.amountReceivedForSettle.toFixed(2));
    } else {
      this.TDSWithHeld = 0;
      this.amountToSettle = this.amountReceivedForSettle;
      this.amountReceived = this.amountReceivedForSettle;
    }
    this.computeAmountInINR();
  }


  closeModal() {
    try {
      this.closeRecordModal.nativeElement.click();
    } catch (e) {
      console.error(e);
    } finally {
      switch (this.action) {
        case ROUTER_ACTIONS.SAVE_INVOICE_PAGE:
          this.router.navigate(["save-invoice-page", this.invoiceId]);
          break;
        case ROUTER_ACTIONS.INVOICE:
          this.router.navigate(["invoice"]);
          break;
      }
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
