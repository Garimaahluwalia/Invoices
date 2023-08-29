import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef, SimpleChange } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { DatePipe } from '@angular/common';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ProfileService } from 'src/app/services/profile.service';
import { IInvoiceClass } from 'src/app/services/invoice-data-handler/invoice-data-handler.dto';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { QuotationsService } from 'src/app/services/quotations/quotations.service';
import { InvoiceTypes } from 'src/app/types/invoice-types';
import { firstValueFrom, take } from 'rxjs';


@Component({
  selector: 'app-invoicedata',
  templateUrl: './invoicedata.component.html',
  styleUrls: ['./invoicedata.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class InvoicedataComponent implements OnInit, OnChanges {
  @Input() duplicate: boolean = false;
  @Input() invoiceOrQuotationId: string | null = null;
  @Input() public invoiceOrQuotationNo: string | null = null;
  public defaultDate!: string;
  private destroyed: ReplaySubject<boolean> = new ReplaySubject<boolean>(0);
  public invoiceImage!: string;
  public invoiceType: InvoiceTypes = InvoiceTypes.Invoice;
  public readonly INVOICE_TYPES = InvoiceTypes;

  constructor(
    public invoiceService: InvoiceService,
    private datePipe: DatePipe,
    public profileService: ProfileService,
    public loadService: LoaderService,
    public __ref: ChangeDetectorRef,
    public quotationService: QuotationsService
  ) { }

  ngOnChanges({ duplicate, invoiceOrQuotationNo }: SimpleChanges): void {
 
    if (!duplicate?.firstChange && duplicate?.currentValue !== undefined) {
      this.duplicate = duplicate?.currentValue;
    }
    if (!invoiceOrQuotationNo?.firstChange && invoiceOrQuotationNo.currentValue) {
      this.invoiceOrQuotationNo = invoiceOrQuotationNo?.currentValue
    }
    this.handleNumberFetching();
  }

  ngOnInit(): void {
    const currentDate = new Date();
    this.defaultDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd') as string;
    this.loadService.ShowLoader();
    this.getProfile();
    this.subscriptions()
  }

  handleNumberFetching() {
    if (this.invoiceType === InvoiceTypes.Invoice) {
      switch (true) {
        case this.invoiceService.invoiceId && this.duplicate:
          this.getInvoiceNumber();
          break;
        case !this.invoiceService.invoiceId:
          this.getInvoiceNumber();
          break;
        default:
          break;
      }
    } else {
      switch (true) {
        case this.invoiceService.invoiceId && this.duplicate:
          this.getQuotationNumber();
          break;
        case !this.invoiceService.invoiceId:
          this.getQuotationNumber();
          break;
        default:
          break;
      }
    }
  }

  async getQuotationNumber() {
    this.loadService.ShowLoader();
    try {
      const rs = await firstValueFrom(this.quotationService.getQuotationNumber().pipe(take(1)));
      this.invoiceOrQuotationNo = rs.quotationNumber as string;
    } catch (e) {
      console.log(e);
    }
    this.loadService.HideLoader();
  }

  async getInvoiceNumber() {
    this.loadService.ShowLoader();
    try {
      const rs = await firstValueFrom(this.invoiceService.getInvoiceNumber().pipe(take(1)));
      this.invoiceOrQuotationNo = rs.invoiceNumber as string;
    } catch (e) {
      console.log(e);
    }
    this.loadService.HideLoader();
  }


  subscriptions() {
    this.invoiceService.recieveInvoiceCategory().pipe(takeUntil(this.destroyed)).subscribe((res: InvoiceTypes) => {
      this.invoiceType = res || InvoiceTypes.Invoice;
      this.handleNumberFetching();
    });
  }

  getProfile() {
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
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}
