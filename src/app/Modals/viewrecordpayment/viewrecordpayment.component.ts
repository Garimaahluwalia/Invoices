import { Component, ElementRef, ViewChild } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { ModalEvents, ROUTER_ACTIONS } from '../../types/modal';
import { ReplaySubject, takeUntil } from 'rxjs';
import { InvoiceService } from '../../services/invoices/invoice.service';
import { CURRENCY } from '../../types/currency';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewrecordpayment',
  templateUrl: './viewrecordpayment.component.html',
  styleUrls: ['./viewrecordpayment.component.css']
})
export class ViewrecordpaymentComponent {
  @ViewChild('openRecordModal', { static: false }) private openRecordModal!: ElementRef<HTMLButtonElement>;
  @ViewChild('closeRecordModal', { static: false }) private closeRecordModal!: ElementRef<HTMLButtonElement>;
  public destroyed: ReplaySubject<boolean> = new ReplaySubject(0);
  public invoiceId!: string;
  public action: string = "";
  public data: any;
  public disabledInput: boolean = false;
  public invoicedata: any;
  public TDSWithHeld!: number;
  public TDS!: number;
  public amountReceived!: number;
  public amountReceivedForSettle!: number;
  public amountReceivedInINR!: number;
  public paymentDate = new Date();
  public additionalNotes!: number;
  public currencies = CURRENCY;
  public currencyData: any;
  public amountToSettle!: number;
  public exchangeRate = '83.333333';

constructor(public modalService : ModalService, 
  public invoiceService : InvoiceService,
  public router : Router, ){}
  ngAfterViewInit(): void {
 
    this.modalService.recieveEvent(ModalEvents.ViewPayment).pipe(takeUntil(this.destroyed)).subscribe((res => {
      const { data, status } = res;
      this.invoiceId = data.id;
      this.action = data.action;
      this.data = data, status;
      console.log(this.data, "view")
      this.disabledInput = data?.disabled || false;

      if (status) {
        this.openModal();
      } else {
        this.closeModal();
      }
    
      this.viewPayments();
    }));
  }



  
  viewPayments() {
    this.invoiceService.getInvoice(this.invoiceId).subscribe((res) => {
      this.invoicedata = res;
      console.log(this.invoicedata, "invoicedaataa")
      const currency = this.currencies.find(currency => currency.code === this.invoicedata.currency);
      this.currencyData = currency?.symbol;
      console.log(this.invoicedata, "view mark as paid payments")
      this.TDSWithHeld = this.invoicedata.TDSWithHeld;
      this.TDS = this.invoicedata.TDS;
      this.amountReceived = this.invoicedata.amountReceived;
      this.amountReceivedForSettle = this.amountReceived + this.TDSWithHeld;
      this.amountReceivedInINR = this.invoicedata.amountReceivedInINR;
      this.paymentDate = this.invoicedata.paymentDate;
      // this.amountToSettle = this.invoicedata.amountToSettle;
      this.additionalNotes = this.invoicedata.additionalNotes;
    })
  }

  openModal() {
    this.openRecordModal?.nativeElement?.click();
  }

  closeModal(){
    try {
      this.closeRecordModal.nativeElement.click();
    } catch (e) {
      console.error(e);
    } finally {
      switch (this.action) {
        case ROUTER_ACTIONS.INVOICE:
          this.router.navigate(["invoice"]);
          break;
      }
    }

  }

  

  ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}
