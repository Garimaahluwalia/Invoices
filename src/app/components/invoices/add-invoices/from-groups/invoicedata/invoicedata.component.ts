import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { DatePipe } from '@angular/common';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ProfileService } from 'src/app/services/profile.service';
import { IInvoiceClass } from 'src/app/services/invoice-data-handler/invoice-data-handler.dto';


@Component({
  selector: 'app-invoicedata',
  templateUrl: './invoicedata.component.html',
  styleUrls: ['./invoicedata.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class InvoicedataComponent implements OnInit, OnChanges {
  @Input() duplicateInvoice: boolean = false;
  @Input() invoiceId: string | null = null;
  @Input() public invoiceNumber: string | null = null;
  public defaultDate!: string;
  private destroyed: ReplaySubject<boolean> = new ReplaySubject<boolean>(0);
  public invoiceImage!: string;

  constructor(
    public invoiceService: InvoiceService,
    private datePipe: DatePipe,
    public profileService: ProfileService,
    public __ref: ChangeDetectorRef
  ) { }

  ngOnChanges({ duplicateInvoice, invoiceNumber }: SimpleChanges): void {
    console.log(invoiceNumber);
    if (!duplicateInvoice?.firstChange) {
      this.duplicateInvoice = duplicateInvoice?.currentValue;
      if (this.duplicateInvoice) {
        this.getInvoiceNumber();
      }
    }
    /* if (!invoiceNumber?.firstChange) {
      this.invoiceNumber = invoiceNumber?.currentValue;
    } */
  }

  ngOnInit(): void {
    const currentDate = new Date();
    this.defaultDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd') as string;

    console.log(this.invoiceService.invoiceId, this.duplicateInvoice)
    if (this.invoiceService.invoiceId && this.duplicateInvoice) {
      this.getInvoiceNumber();
    }
    if (!this.invoiceService.invoiceId) {
      this.getInvoiceNumber();
    }

    this.profileService.getProfile().pipe(takeUntil(this.destroyed)).subscribe(
      (response) => {
        this.invoiceImage = response.photoUrl;
      },
      (error) => {
        console.error('Profile update failed:', error);
      }
    );

  }

  getInvoiceNumber() {
    this.invoiceService.getInvoiceNumber().pipe(takeUntil(this.destroyed)).subscribe((res: IInvoiceClass) => {
      this.invoiceNumber = res.invoiceNumber;
      this.__ref.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

}
