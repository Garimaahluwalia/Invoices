import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalEvents } from 'src/app/types/modal';

@Component({
  selector: 'app-invoice-actions',
  templateUrl: './invoice-actions.component.html',
  styleUrls: ['./invoice-actions.component.css']
})
export class invoiceactionsComponent implements OnInit {
  @ViewChild("closeDeleteModalButton", { static: false }) private closeDeleteModalButton!: ElementRef;
  @ViewChild("openDeleteModal", { static: false }) private openDeleteModal!: ElementRef;
  private readonly notifier!: NotifierService;

  constructor(public modalService: ModalService,
    public router: Router,
    public route: ActivatedRoute,
    public invoiceService: InvoiceService,
    public notifierService: NotifierService) {
      this.notifier = notifierService
     }
 
  public destroyed: ReplaySubject<boolean> = new ReplaySubject(0);
  public data: any;
  public invoiceId: any;
  public status: any;
  public confirmationMessage: any;


  ngAfterViewInit(): void {
    this.modalService.recieveEvent(ModalEvents.invoiceactions).pipe(takeUntil(this.destroyed)).subscribe((res => {
      const { data, status } = res;
      this.data = data, status;
      this.invoiceId = data?.id;
      this.status = data?.status;
      setTimeout(() => {
        this.confirmationMessage = (data?.status === "PAID") ? 'mark this Paid' : 'cancel it';
      }, 0);
      if (status || data) {
        this.openModal();
      } else {
        this.closeModal();
      }
    }));
  }

  ngOnInit(): void {

  }

  closeModal() {
    this.destroyed.next(true);
    this.destroyed.complete();
    this.closeDeleteModalButton.nativeElement.click();
    this.router.navigateByUrl("/invoice")
  }


  openModal() {
    this.openDeleteModal.nativeElement.click();
  }


  yes() {
    this.invoiceService.updateInvoiceStatus(this.invoiceId, this.status).subscribe((res: any) => {
      this.invoiceService.statusUpdate(this.invoiceId, this.status);
    }, (error: any) => {
      console.error(error, "Error occurred while updating invoice status")
    });
    this.closeModal();
  }

  no() {
    this.closeModal();
  }
}

