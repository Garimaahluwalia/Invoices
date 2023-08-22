import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { IEmailInvoice } from 'src/app/types/email-invoice';
import { ModalEvents } from 'src/app/types/modal';

@Component({
  selector: 'app-add-sent-email',
  templateUrl: './add-sent-email.component.html',
  styleUrls: ['./add-sent-email.component.css']
})
export class AddSentEmailComponent implements OnInit {
  @ViewChild("openModalButton", { static: false }) private openModalButton!: ElementRef;
  @ViewChild("closeModalButton", { static: false }) private closeModalButton!: ElementRef;

  public destroyed: ReplaySubject<boolean> = new ReplaySubject(1);
  public data: any;
  public from!: string;
  public clientName!: string;
  public clientEmail!: string;
  public cc!: string;
  public emailSubject!: string;
  public action: string = "";
  public message: string = `...`
  public emailInvoice!: IEmailInvoice;

  constructor(
    public modalService: ModalService,
    public router: Router,
    public invoiceService: InvoiceService
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.modalService.recieveEvent(ModalEvents.SentInvoiceEmail)
      .pipe(takeUntil(this.destroyed))
      .subscribe(res => {
        const { data, status } = res;
        this.action = data.action;
        this.data = data;

        if (status) {
          this.openModal();
        } else {
          this.closeModal();
        }
      });
  }

  openModal(): void {
    this.openModalButton.nativeElement.click();
  }

  closeModal() {
    this.closeModalButton.nativeElement.click();
    if (this.action === "save-invoice-page") {
      this.router.navigate(["save-invoice-page", this.data.id]);
    } else if (this.action === "invoice") {
      this.router.navigate(["invoice"]).then(() => {
        this.modalService.sendEvent(ModalEvents.SentInvoiceEmail, { status: false });
      });
    }
  }

  saveChanges(): void {
    const payload: IEmailInvoice = {
      from: this.from,
      clientName: this.clientName,
      clientEmail: this.clientEmail,
      cc: this.cc,
      emailSubject: this.emailSubject,
      message: this.message,
    };

    this.invoiceService.sendInvoiceEmail(payload).subscribe((res) => {
      this.emailInvoice = res;
    });
    this.closeModal();
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}
