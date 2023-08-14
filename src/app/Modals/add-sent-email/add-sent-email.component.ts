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
  public from: any;
  public clientName: any;
  public clientEmail: any;
  public cc: any
  public emailSubject: any;
  public message: any;
  constructor(public modalService: ModalService,
    public router: Router) { }

  ngAfterViewInit(): void {
    this.modalService.recieveEvent(ModalEvents.SentInvoiceEmail).pipe(takeUntil(this.destroyed)).subscribe((res => {
      const { data, status, } = res;
      this.data = data, status;
      if (status || data) {
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
    if (this.router.url.includes("save-invoice-page")) {
      this.router.navigate(["save-invoice-page"]);
    } else if (this.router.url.includes("invoice")) {
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
