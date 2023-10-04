import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ReplaySubject, Subscription, firstValueFrom, take, takeUntil } from 'rxjs';
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
  public isRecievedAmountEdited: boolean = false;

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
    if (this.isEditing && targetElement && !this.paymentDetailDiv.nativeElement.contains(targetElement)) {
      this.isEditing = false;
    }
  }


  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
    this.modalService.recieveEvent(ModalEvents.RecordPayment).pipe(takeUntil(this.destroyed)).subscribe((res => {
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
    }));
  }

  openModal() {
    this.openRecordModal?.nativeElement?.click();
  }


  async getInvoice() {
    this.selectedInvoice = await this.getInvoiceById();
    if (this.selectedInvoice) {
      const currency = this.currencies.find(currency => currency.code === this.selectedInvoice.currency);
      this.currencyData = currency?.symbol;

      this.amountReceived = this.selectedInvoice.totalamount !== 0 ? this.selectedInvoice.totalamount :
        this.selectedInvoice.subtotalofamount;

      this.amountReceivedForSettle = this.selectedInvoice.totalamount !== 0 ? this.selectedInvoice.totalamount : this.selectedInvoice.subtotalofamount;
      this.computeAmountInINR();
    }
  }




  computeAmountInINR() {
    let exchangeRate = this.exchangeRate || 0;
    if (this.amountReceived) {
      this.amountReceivedInINR = parseFloat((this.amountReceived * parseFloat(exchangeRate as string)).toFixed(2));
    }
  }

  onAmountRecievedChange() {
    this.isRecievedAmountEdited = true;
    this.amountReceivedForSettle = (parseInt(String(this.amountReceived), 10) || 0) + (parseInt(String(this.TDSWithHeld), 10) || 0);
}



  computeTDSAmount() {
    const amt = this.selectedInvoice.totalamount !== 0 ? this.selectedInvoice.totalamount : this.selectedInvoice.subtotalofamount
    if (this.TDS && this.amountReceived) {
      console.log("amt", amt);
      this.TDSWithHeld = parseFloat(((this.TDS / 100) * amt).toFixed(0));
      if(!this.isRecievedAmountEdited) {
      this.amountReceived = amt - this.TDSWithHeld;
      }
      this.amountToSettle = parseFloat(this.amountReceivedForSettle.toFixed(2));
      this.amountReceivedForSettle = parseFloat((this.TDSWithHeld + this.amountReceived).toFixed(0));
      } else {
      this.TDSWithHeld = 0;
      this.amountToSettle = this.amountReceived;
      this.amountReceivedForSettle = this.amountReceived;
      console.log(this.amountReceivedForSettle, "amountreceiveforsettle")
      if(!this.TDS) {
        this.amountReceived = amt;
      }
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

  async getInvoiceById() {
    try {
      const rs = await firstValueFrom(this.invoiceService.getInvoice(this.invoiceId).pipe(take(1)));
      return rs;
    } catch (e) {
      throw e;
    }
  }

}
