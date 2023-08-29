import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalEvents } from 'src/app/types/modal';

@Component({
  selector: 'app-remove-payment',
  templateUrl: './remove-payment.component.html',
  styleUrls: ['./remove-payment.component.css']
})
export class RemovePaymentComponent {
  @ViewChild("closeDeleteModalButton", { static: false }) private closeDeleteModalButton!: ElementRef;
  @ViewChild("openDeleteModal", { static: false }) private openDeleteModal!: ElementRef;
  public destroyed: ReplaySubject<boolean> = new ReplaySubject(0);
  public data: any;
  public invoiceId: any;


  constructor(public modalService: ModalService,
    public router: Router,
    public invoiceService: InvoiceService) {

  }


  ngAfterViewInit(): void {
    this.modalService.recieveEvent(ModalEvents.RemovePayment).pipe(takeUntil(this.destroyed)).subscribe((res => {
      const { data, status } = res;
      this.data = data, status;
      this.invoiceId = data.id

      if (status) {
        this.openModal();
      } else {
        this.closeModal();
      }
    }));
  }


  closeModal() {
    this.closeDeleteModalButton.nativeElement.click();
    this.router.navigateByUrl("/invoice")
  }

  openModal() {
    this.openDeleteModal.nativeElement.click();
  }

  yes() {
    this.invoiceService.removePayment(this.invoiceId).subscribe(response => {
    }, (error: any) => {
      console.error('Error removing payment:', error);
    });
    this.closeModal();
  }

  no() {
    this.closeModal();
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}
