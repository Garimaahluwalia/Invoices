import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef, SimpleChange } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { DatePipe } from '@angular/common';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ProfileService } from 'src/app/services/profile.service';
import { IInvoiceClass } from 'src/app/services/invoice-data-handler/invoice-data-handler.dto';
import { LoaderService } from 'src/app/services/loader/loader.service';


@Component({
  selector: 'app-invoicedata',
  templateUrl: './invoicedata.component.html',
  styleUrls: ['./invoicedata.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class InvoicedataComponent implements OnInit, OnChanges {
  @Input() duplicateInvoice: boolean = false;
  @Input() invoiceId: string | null = null;
  @Input() public invoiceNo: string | null = null;
  public defaultDate!: string;
  private destroyed: ReplaySubject<boolean> = new ReplaySubject<boolean>(0);
  public invoiceImage!: string;

  constructor(
    public invoiceService: InvoiceService,
    private datePipe: DatePipe,
    public profileService: ProfileService,
    public loadService: LoaderService,
    public __ref: ChangeDetectorRef
  ) { }

  ngOnChanges({ duplicateInvoice, invoiceNo }: SimpleChanges): void {
    if (!duplicateInvoice?.firstChange && duplicateInvoice?.currentValue !== undefined) {
      this.duplicateInvoice = duplicateInvoice?.currentValue;
    }
    if (!invoiceNo?.firstChange && invoiceNo.currentValue) {
      this.invoiceNo = invoiceNo?.currentValue
    }
    this.getInvoiceNumber();
  }



  ngOnInit(): void {
    const currentDate = new Date();
    this.defaultDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd') as string;
    this.loadService.ShowLoader();
    this.profileService.getProfile().pipe(takeUntil(this.destroyed)).subscribe(
      (response) => {
        this.invoiceImage = response.photoUrl;
        this.loadService.HideLoader();
      },
      (error) => {
        this.loadService.HideLoader();
        console.error('Profile update failed:', error);
      }
    );
    this.getInvoiceNumber();
  }

  getInvoiceNumber() {
    switch (true) {
      case this.invoiceService.invoiceId && this.duplicateInvoice:
        this.getInvoiceNumberData();
        break;
      case !this.invoiceService.invoiceId:
        this.getInvoiceNumberData();
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  getInvoiceNumberData() {
    this.loadService.ShowLoader();
    this.invoiceService.getInvoiceNumber().pipe(takeUntil(this.destroyed)).subscribe((res: IInvoiceClass) => {
      this.invoiceNo = res.invoiceNumber;
      this.loadService.HideLoader();
      this.__ref.detectChanges();
    },
      (error) => {
        this.loadService.HideLoader();
        console.error('failed:', error);
      });
  }

}
