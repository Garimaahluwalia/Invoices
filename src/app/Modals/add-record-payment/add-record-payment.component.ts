import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, Subscription, takeUntil } from 'rxjs';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalEvents } from 'src/app/types/modal';
import { IRecordPayment } from 'src/app/types/recordPayments';

@Component({
  selector: 'app-add-record-payment',
  templateUrl: './add-record-payment.component.html',
  styleUrls: ['./add-record-payment.component.css']
})
export class AddRecordPaymentComponent {
  @ViewChild('openRecordModal', { static: false }) private openRecordModal!: ElementRef<HTMLButtonElement>;
  @ViewChild('closeRecordModal', { static: false }) private closeRecordModal!: ElementRef<HTMLButtonElement>;
  public destroyed: ReplaySubject<boolean> = new ReplaySubject(0);
  public data: any;
  public invoiceId: string | null = null;
  public recordPayment!:  IRecordPayment;
  public action: string = "";

  constructor(public modalService: ModalService, 
    public router: Router ,
    public invoiceService : InvoiceService) { }

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
  }

  openModal() {
    this.openRecordModal?.nativeElement?.click();
  }

  closeModal() {
    this.closeRecordModal.nativeElement.click();
    if (this.action === "save-invoice-page") {
      this.router.navigate(["save-invoice-page"]);
    } else if (this.action === "invoice") {
      this.router.navigate(["invoice"]).then(() => {
        this.modalService.sendEvent(ModalEvents.RecordPayment, { status: false })
      });
    }
  }

  saveChanges() {
    const payload: IRecordPayment = {
      invoiceNo: '',
      billedTo: '',
      taxableAmount: '',
      invoiceTotal: '',
      amountReceived: '',
      amountReceivedInUSD: '',
      TDS: '',
      TDSWithHeld: '',
      amountToSettle: '',
      paymentDate: '',
      additionalNotes: ''
    };
  this.invoiceService.sendRecordPayment(payload).subscribe((res) => {
      this.recordPayment  = res;
      console.log(res, "Record payments")
  })
  }

  
  ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

}
