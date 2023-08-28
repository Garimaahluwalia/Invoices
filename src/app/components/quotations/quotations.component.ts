import { DatePipe } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { ClientService } from 'src/app/services/clients/client.service';
import { IInvoice } from 'src/app/services/invoice-data-handler/invoice-data-handler.dto';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { DeleteService } from 'src/app/services/modal/delete.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';
import { DeleteEvents } from 'src/app/types/delete';
import { IInvoiceSummary, InvoiceSummary } from 'src/app/types/invoiceSummaryTotal';
import { ModalEvents } from 'src/app/types/modal';
import { ORDER } from 'src/app/types/order';
import { INVOICESTATUS } from 'src/app/types/invoiceStatus';
import { NotifierService } from 'angular-notifier';
import { QuotationsService } from 'src/app/services/quotations/quotations.service';
import { QUOTATIONSTATUS } from 'src/app/types/quotationStatus';

@Component({
  selector: 'app-quotations',
  templateUrl: './quotations.component.html',
  styleUrls: ['./quotations.component.css']
})
export class QuotationsComponent {
  @ViewChildren("selectUnselectItems") elements?: QueryList<ElementRef<HTMLInputElement>>
  @ViewChild('mobileNav', { static: true }) mobileNav!: ElementRef;
  @ViewChild('selectUnselectSingle', { static: true }) selectUnselectSingle!: ElementRef;


  public isActiveSideBar: Boolean = false;
  public currentPage = 1;
  public itemsPerPage = 10;
  public totalItems = 15;
  public quotation: IInvoice[] = [];
  public quotationId: string | undefined
  public showDropdown: boolean = false;
  private destroyed: ReplaySubject<boolean> = new ReplaySubject<boolean>(0);
  public status: typeof QUOTATIONSTATUS = QUOTATIONSTATUS;
  public readonly statuses: string[] = Object.values(QUOTATIONSTATUS);
  public isButtonEnabled: boolean = false;
  public checkedItems: { [key: string]: boolean } = {};
  public readonly ORDER = ORDER;
  public searchQuery: string = '';
  public startDate: any;
  public endDate: any;
  public isSearchFocused: boolean = false;
  public defaultDateRange!: string;
  public loading = false;
  private readonly notifier!: NotifierService;
  public checkedCount!: number;
  public selectedCount!: number;
  public selectedStatus: any[] = [];
  public selectedStatuses: string[] = [QUOTATIONSTATUS.CREATED];
  public isDropdownOpen: boolean = false;
  public invoiceSummary: InvoiceSummary = new InvoiceSummary();
  public value: any;


  constructor(
    private datePipe: DatePipe,
    public router: Router,
    public route: ActivatedRoute,
    public deleteService: DeleteService,
    public modalService: ModalService,
    public clientService: ClientService,
    public sidebarService: SidebarService,
    public notifierService: NotifierService,
    public loadService: LoaderService,
    public quotationService: QuotationsService) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.itemsPerPage = this.quotationService.limit;
    this.loadQuotations();

    this.deleteService.recieveDeleteEvent()?.subscribe(res => {
      if (res) {
        switch (res?.['type'] as string) {
          case "single": {
            this.checkedItems[res['id'] as string] = false;
            this.deleteQuotation(res['id'] as string);
            break;
          }
          case "multi": {
            const bulkItems: string[] = res['bulkItems'] as string[];
            this.deletebulkInvoices(bulkItems);
            break;
          }
        }
      }
    });


    this.quotationService.totalNumberOfQuotations.pipe(takeUntil(this.destroyed)).subscribe((data: number) => {
      this.totalItems = data;
    });

    this.quotationService.recieveQuotations().pipe(takeUntil(this.destroyed)).subscribe((data: any) => {
      this.quotation = data;
    });
  }

  toggleDropdowns(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleStatusSelection(status: string): void {
    if (status === INVOICESTATUS.ALL) {
      if (this.isSelected(INVOICESTATUS.ALL)) {
        this.selectedStatuses = [];
      } else {
        this.selectedStatuses = [INVOICESTATUS.ALL];
      }
    } else {
      if (this.isSelected(status)) {
        const index = this.selectedStatuses.indexOf(status);
        this.selectedStatuses.splice(index, 1);
      } else {
        this.selectedStatuses.push(status);
      }

      const allIndex = this.selectedStatuses.indexOf(INVOICESTATUS.ALL);
      if (allIndex !== -1) {
        this.selectedStatuses.splice(allIndex, 1);
      }
    }

    this.quotationService._status = this.selectedStatuses.join(",");
    this.loadQuotations();
  }




  isSelected(status: string): boolean {
    return this.selectedStatuses.includes(status);
  }

  getSelectedItemsText(): string {
    if (this.selectedStatuses.length === 0) return 'Select Statuses';
    return this.selectedStatuses.join(', ');
  }



  // ngAfterViewInit() {
  //   $('input[name="daterange"]').daterangepicker({
  //     opens: 'left'
  //   }, (start: any, end: any) => {
  //     this.dateRangePicker(start, end);
  //   });
  // }

  dateRangePicker(start: any, end: any) {
    this.quotationService.startDate = start._d;
    this.quotationService.endDate = end._d;
    // this.loadQuotations();
  }

  deletebulkInvoices(ids: string[]) {
    this.quotationService.bulkDelete(ids).subscribe(
      () => {
        this.quotation = this.quotation.filter(item => !ids.includes(item._id as string));
        this.checkedItems = {};
        this.isButtonEnabled = false;
        this.loadQuotations();
      },
      (error) => {
        console.error('Bulk delete failed:', error);
      }
    );
  }


  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  loadQuotations() {
    this.checkedItems = {};
    this.quotationService.getAll();
  }


  private formatDate(date: string): string {
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    return formattedDate || '';
  }

  updateQuotation(details: IInvoice) {
    this.router.navigate(["/add-invoice", details._id], { queryParams: { category: 'Quotations' } });
  }


  deleteQuotation(_id: string) {
    this.quotationService.deleteQuotation(_id).pipe(takeUntil(this.destroyed)).subscribe(
      (res) => {
        this.quotationService.getAll();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.quotationService.page = page;
    this.quotationService.getAll();
    this.checkedItems = {};
    this.selectUnselectSingle.nativeElement.checked = false;
  }

  deleteQuotations(details: IInvoice) {
    this.router.navigate(["quotations", "delete", details._id]).then(() => {
      this.modalService.sendEvent(ModalEvents.Delete, { status: true, data: { id: details._id, action: "quotations" } });
    })
  }


  duplicateInvoice(details: IInvoice) {
    this.router.navigate(["add-invoice", details._id], { queryParams: { duplicateInvoice: "duplicate" } })
  }

  toggleBodyClass() {
    this.sidebarService.isMobile.emit(!this.isActiveSideBar);
    this.isActiveSideBar = !this.isActiveSideBar
  }

  triggerButtonClick() {
    this.mobileNav.nativeElement.click();
  }

  bulkdelete() {
    const bulkItems: string[] = [];
    for (const key in this.checkedItems) {
      if (this.checkedItems.hasOwnProperty(key) && this.checkedItems[key]) {
        bulkItems.push(key);
      }
    }
    this.router.navigate(["quotations", "delete", 'all']).then(() => {
      this.modalService.sendEvent(ModalEvents.Delete, { status: true, data: { bulkItems: bulkItems as unknown as string } })
    })
  }

  checkItem(event: any, itemId: string) {
    const checked: boolean = event.target.checked;
    this.checkedItems[itemId] = checked;

    const ObjectValues = Object.values(this.checkedItems);
    const isAnyChecked = ObjectValues.some(v => v === true);
    this.checkedCount = ObjectValues.filter(v => v === true).length;

    if (this.quotation.length === ObjectValues.length) {
      const isAllchecked = ObjectValues.every(v => v === true);
      this.selectUnselectSingle.nativeElement.checked = isAllchecked as any;
    }
    this.isButtonEnabled = isAnyChecked;
  }


  sortingOrder(sortField: any, sortOrder: ORDER) {
    this.quotationService.sortField = sortField;
    this.quotationService.sortOrder = sortOrder;
    this.loadQuotations();
  }

  handleSearch() {
    this.quotationService.searchQuery = this.searchQuery;
    this.loadQuotations();
  }

  getSelectedItemsCount(): number {
    let count = 0;
    for (let key in this.checkedItems) {
      if (this.checkedItems[key]) {
        count++;
      }
    }
    return count;
  }

  selectUnselectAllItems(event: any) {
    const checked = event.target.checked;
    this.isButtonEnabled = checked;
    this.elements?.forEach(element => {
      this.checkedItems[element.nativeElement.value] = checked;
      element.nativeElement.checked = checked as any;
    });
    this.selectedCount = this.getSelectedItemsCount();
  }



  bulkPDFDownload() {
    this.loading = true;
    const bulkItems: string[] = [];
    for (const key in this.checkedItems) {
      if (this.checkedItems.hasOwnProperty(key) && this.checkedItems[key]) {
        bulkItems.push(key);
      }
    }
    this.quotationService.bulkDownloadAsPDF(bulkItems)
      .pipe(takeUntil(this.destroyed))
      .subscribe({
        next: (response: any) => {
          const blob = new Blob([response.body], { type: 'application/zip' });
          const url = window.URL.createObjectURL(blob);

          let downloadLink = document.createElement('a');
          downloadLink.href = url;
          downloadLink.setAttribute('download', `invoices.zip`);
          document.body.appendChild(downloadLink);
          downloadLink.click();
          this.loading = false;
          setTimeout(() => {
            downloadLink.remove();
            window.URL.revokeObjectURL(url);
          }, 1000);

          setTimeout(() => {
            this.notifier.show({
              type: 'success',
              message: 'Invoices Downloaded successfully',
              id: 'THAT_NOTIFICATION_ID',
            });
          }, 3000);

          setTimeout(() => {
            this.notifier.hide('THAT_NOTIFICATION_ID');
          }, 5000);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  sentEmail(details: IInvoice) {
    this.router.navigate(["quotations", "invoice-email"]).then(() => {
      this.modalService.sendEvent(ModalEvents.SentInvoiceEmail, { status: true, data: { id: details._id, action: "quotations", type: "Quotation" } });
    });
  }

  quotations() {
    this.router.navigate(['/add-invoice'], { queryParams: { category: 'Quotations' } });
  }
}
