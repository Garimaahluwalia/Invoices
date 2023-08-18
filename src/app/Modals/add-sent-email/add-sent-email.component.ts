import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalEvents } from 'src/app/types/modal';

@Component({
  selector: 'app-add-sent-email',
  templateUrl: './add-sent-email.component.html',
  styleUrls: ['./add-sent-email.component.css']
})
export class AddSentEmailComponent {
  @ViewChild("openModalButton", { static: false }) private openModalButton!: ElementRef;
  @ViewChild("closeModalButton", { static: false }) private closeModalButton!: ElementRef;
  public destroyed: ReplaySubject<boolean> = new ReplaySubject(0);
  public data: any;
  public from!: string;
  public clientName!: string;
  public clientEmail!: string;
  public cc!: string;
  public emailSubject!: string;
  public action: string = "";
  public message: string = `Hi Namit Arora,


  Please find attached invoice #A00028. Due Date is Sep 22, 2023.
  
  Invoice No: #A00028
  Invoice Date: Aug 14, 2023
  Billed To: Namit Arora
  Due Date: Sep 1, 2023
  Due Amount: ₹1.10
  
  Thank you for your business.
  
  Regards ,
  Chetan Chauhan`;

  constructor(public modalService: ModalService,
    public router: Router) { }

  ngAfterViewInit(): void {
    this.modalService.recieveEvent(ModalEvents.SentInvoiceEmail).pipe(takeUntil(this.destroyed)).subscribe((res => {
      const { data, status, } = res;
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
    this.openModalButton?.nativeElement?.click();
  }

  closeModal() {
    this.closeModalButton.nativeElement.click();
    if (this.action === "save-invoice-page") {
      this.router.navigate(["save-invoice-page", this.data.id]);
    } else if (this.action === "invoice") {
      this.router.navigate(["invoice"]).then(() => {
        this.modalService.sendEvent(ModalEvents.SentInvoiceEmail, { status: false })
      });
    }

  }
   


  saveChanges() {

  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

}
