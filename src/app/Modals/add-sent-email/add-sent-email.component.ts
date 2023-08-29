import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, firstValueFrom, take, takeUntil } from 'rxjs';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { IEmailInvoice } from 'src/app/types/email-invoice';
import { ModalEvents, ROUTER_ACTIONS } from 'src/app/types/modal';
import { NotifierService } from "angular-notifier";
import { InvoiceTypes } from 'src/app/types/invoice-types';
import { QuotationsService } from 'src/app/services/quotations/quotations.service';
import { MessagePreviewComponent } from '../message-preview/message-preview.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-sent-email',
  templateUrl: './add-sent-email.component.html',
  styleUrls: ['./add-sent-email.component.css']
})
export class AddSentEmailComponent implements OnInit {
  @ViewChild("openModalButton", { static: false }) private openModalButton!: ElementRef;
  @ViewChild("closeModalButton", { static: false }) private closeModalButton!: ElementRef;
  @ViewChild("modalPreview", { static: false }) private modalPreview!: MessagePreviewComponent;

  public destroyed: ReplaySubject<boolean> = new ReplaySubject(1);
  public data: any;
  public from!: string;
  public clientName!: string;
  public clientEmail!: string;
  public cc!: string;
  public emailSubject!: string;
  public action: string = "";
  public body: string = `...`
  public emailInvoice!: IEmailInvoice;
  private readonly notifier!: NotifierService;
  public invoiceId!: string;
  public type: InvoiceTypes = InvoiceTypes.Invoice;
  public selectedInvoice: any;

  constructor(
    public modalService: ModalService,
    public router: Router,
    public invoiceService: InvoiceService,
    public notifierService: NotifierService,
    public quotationService: QuotationsService,
    private datePipe: DatePipe,
  ) { this.notifier = notifierService; }

  ngOnInit(): void {
    
   }

  ngAfterViewInit(): void {
    this.modalService.recieveEvent(ModalEvents.SentEmail)
      .pipe(takeUntil(this.destroyed))
      .subscribe(res => {
        const { data, status } = res;
        this.invoiceId = res.data.id;
        this.type = res.data.type;
        this.action = data.action;
        this.data = data;

        if (status) {
          this.openModal();
        } else {
          this.closeModal();
        }
        this.getInvoice();
      });

  }

  openModal(): void {
    this.openModalButton.nativeElement.click();
  }

  async getInvoice() {
    this.selectedInvoice = null;
    if (this.type === InvoiceTypes.Invoice) {
      this.selectedInvoice = await this.getInvoiceById();
    } else {
      this.selectedInvoice = await this.getQuotationById();
    }


    this.clientName = this.selectedInvoice.client.name;
    this.clientEmail = this.selectedInvoice.client.email;
    this.from = this.selectedInvoice.company.Businessname;
    const invoiceOrQuotationNumber = this.type === InvoiceTypes.Invoice ? this.selectedInvoice.invoiceNo : this.selectedInvoice.quotationNo;
    this.selectedInvoice.invoiceOrQuotationNumber = invoiceOrQuotationNumber;
    this.emailSubject = `[Important] Email ${this.type} for ${this.selectedInvoice.client.name} - ${invoiceOrQuotationNumber}`;
    this.body =
      `Hi, ${this.selectedInvoice.client.name}\n
      Please find attached ${this.type} ${invoiceOrQuotationNumber}
      ${this.type} No: ${invoiceOrQuotationNumber}
      ${this.type} Date: ${this.datePipe.transform(this.selectedInvoice.date, "YYYY-MM-dd")}
      Billed To: ${this.selectedInvoice.client.name}
      Thank you for your business.
      Regards,
      ${this.selectedInvoice.company.Businessname}`;
  }

  closeModal() {
    try {
      this.closeModalButton.nativeElement.click();
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
        case ROUTER_ACTIONS.QUOTATIONS:
          this.router.navigate(["quotations"]);
          break;
        case ROUTER_ACTIONS.SAVE_QUOTATIONS_PAGE:
          this.router.navigate(["save-quotations-page", this.invoiceId]);
      }
    }
  }


  async getInvoiceById() {
    try {
      const rs = await firstValueFrom(this.invoiceService.getInvoice(this.invoiceId).pipe(take(1)));
      return rs;
    } catch (e) {
      throw e;
    }
  }
  async getQuotationById() {
    try {
      const rs = await firstValueFrom(this.quotationService.getQuotation(this.invoiceId).pipe(take(1)));
      return rs;
    } catch (e) {
      throw e;
    }
  }


  saveChanges(): void {
    const payload: IEmailInvoice = {
      from: this.from,
      clientName: this.clientName,
      clientEmail: this.clientEmail,
      cc: this.cc,
      emailSubject: this.emailSubject,
      body: this.body,
    };

    this.invoiceService.sendInvoiceEmail(payload).subscribe((res) => {
      this.emailInvoice = res;
    });
    this.closeModal();
    this.notifier.show({
      type: "success",
      message: "mail-sent successfully",
      id: "THAT_NOTIFICATION_ID",
    });
    setTimeout(() => {
      this.notifier.hide("THAT_NOTIFICATION_ID");
    }, 2000);
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  openMessagePreview() {
    try {
      this.closeModalButton.nativeElement.click();
    } catch (e) {
      console.error(e);
    }
    this.modalPreview.updateValues({ ...this.selectedInvoice, type: this.type , body : this.body });
    this.modalPreview.openModal();
  }

  closeMessageModal() {
    this.openModalButton.nativeElement.click();
  }
}