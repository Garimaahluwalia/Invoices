import { Component, ElementRef, ViewChildren, OnInit, ViewChild, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/clients/client.service';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { DeleteService } from 'src/app/services/modal/delete.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { DeleteEvents } from 'src/app/types/delete';
import { ModalEvents } from 'src/app/types/modal';
import { DatePipe } from '@angular/common';
import { INVOICESTATUS } from 'src/app/types/invoiceStatus';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';
import { ORDER } from 'src/app/types/order';
import { NotifierService } from 'angular-notifier';
import { IInvoice } from 'src/app/services/invoice-data-handler/invoice-data-handler.dto';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ClientRouterModalAction } from 'src/app/types/client/client.dto';
import { AddRecordPaymentComponent } from 'src/app/modals/add-record-payment/add-record-payment.component';
import { IInvoiceSummary, InvoiceSummary } from 'src/app/types/invoiceSummaryTotal';


declare var $: any;
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  @ViewChildren("selectUnselectItems") elements?: QueryList<ElementRef<HTMLInputElement>>
  @ViewChild('mobileNav', { static: true }) mobileNav!: ElementRef;
  @ViewChild('selectUnselectSingle', { static: true }) selectUnselectSingle!: ElementRef;


  public isActiveSideBar: Boolean = false;
  public currentPage = 1;
  public itemsPerPage = 10;
  public totalItems = 15;
  public invoices: IInvoice[] = [];
  public invoiceId: string | undefined
  public showDropdown: boolean = false;
  private destroyed: ReplaySubject<boolean> = new ReplaySubject<boolean>(0);
  public status: typeof INVOICESTATUS = INVOICESTATUS;
  public readonly statuses: string[] = Object.values(INVOICESTATUS);
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
  public selectedStatuses: string[] = [INVOICESTATUS.ALL];
  public isDropdownOpen: boolean = false;
  public invoiceSummary: InvoiceSummary = new InvoiceSummary();
  public value: any;


  constructor(
    private datePipe: DatePipe,
    public invoiceService: InvoiceService,
    public router: Router, public route: ActivatedRoute,
    public deleteService: DeleteService,
    public modalService: ModalService,
    public clientService: ClientService,
    public sidebarService: SidebarService,
    public notifierService: NotifierService,
    public loadService: LoaderService) {
    this.notifier = notifierService;
  }


  ngOnInit(): void {
    this.summaryTotal();
    this.itemsPerPage = this.invoiceService.limit;
    this.loadInvoices();

    this.deleteService.recieveDeleteEvent()?.subscribe(res => {
      if (res) {
        switch (res?.['type'] as string) {
          case "single": {
            this.checkedItems[res['id'] as string] = false;
            this.deleteInvoice(res['id'] as string);
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


    this.invoiceService.totalNumberOfInvoices.pipe(takeUntil(this.destroyed)).subscribe((data: number) => {
      this.totalItems = data;
    });

    this.invoiceService.recieveInvoices().pipe(takeUntil(this.destroyed)).subscribe((data: any) => {
      this.invoices = data;
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

    this.invoiceService._status = this.selectedStatuses.join(",");
    this.loadInvoices();
  }




  isSelected(status: string): boolean {
    return this.selectedStatuses.includes(status);
  }

  getSelectedItemsText(): string {
    if (this.selectedStatuses.length === 0) return 'Select Statuses';
    return this.selectedStatuses.join(', ');
  }



  ngAfterViewInit() {
    $('input[name="daterange"]').daterangepicker({
      opens: 'left'
    }, (start: any, end: any) => {
      this.dateRangePicker(start, end);
    });
  }

  dateRangePicker(start: any, end: any) {
    this.invoiceService.startDate = start._d;
    this.invoiceService.endDate = end._d;
    this.loadInvoices();
  }


  deletebulkInvoices(ids: string[]) {
    this.invoiceService.bulkDelete(ids).subscribe(
      () => {
        this.invoices = this.invoices.filter(item => !ids.includes(item._id as string));
        this.checkedItems = {};
        this.isButtonEnabled = false;
        this.loadInvoices();
      },
      (error) => {
        console.error('Bulk delete failed:', error);
      }
    );
  }


  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  loadInvoices() {
    this.checkedItems = {};
    this.invoiceService.getAll();
  }


  private formatDate(date: string): string {
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    return formattedDate || '';
  }

  updateInvoice(details: IInvoice) {
    this.router.navigate(["/add-invoice", details._id]);
  }


  deleteInvoice(_id: string) {
    this.invoiceService.deleteInvoice(_id).pipe(takeUntil(this.destroyed)).subscribe(
      (res) => {
        this.invoiceService.getAll();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.invoiceService.page = page;
    this.invoiceService.getAll();
    this.checkedItems = {};
    this.selectUnselectSingle.nativeElement.checked = false;
  }

  deleteInvoices(details: IInvoice) {
    this.router.navigate(["invoice", "delete", details._id]).then(() => {
      this.modalService.sendEvent(ModalEvents.Delete, { status: true, data: { id: details._id, action: "invoice" } });
    })
  }


  updateStatus(details: IInvoice, status: string) {
    this.router.navigate(["invoice", "invoice-actions", details._id]).then(() => {
      this.modalService.sendEvent(ModalEvents.invoiceactions, {
        status: true,
        data: {
          id: details._id,
          event: DeleteEvents.INVOICE_ACTIONS,
          status: status
        }
      });
    });
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
    this.router.navigate(["invoice", "delete", 'all']).then(() => {
      this.modalService.sendEvent(ModalEvents.Delete, { status: true, data: { bulkItems: bulkItems as unknown as string } })
    })
  }

  checkItem(event: any, itemId: string) {
    const checked: boolean = event.target.checked;
    this.checkedItems[itemId] = checked;

    const ObjectValues = Object.values(this.checkedItems);
    const isAnyChecked = ObjectValues.some(v => v === true);
    this.checkedCount = ObjectValues.filter(v => v === true).length;

    if (this.invoices.length === ObjectValues.length) {
      const isAllchecked = ObjectValues.every(v => v === true);
      this.selectUnselectSingle.nativeElement.checked = isAllchecked as any;
    }
    this.isButtonEnabled = isAnyChecked;
  }


  sortingOrder(sortField: any, sortOrder: ORDER) {
    this.invoiceService.sortField = sortField;
    this.invoiceService.sortOrder = sortOrder;
    this.loadInvoices();
  }

  handleSearch() {
    this.invoiceService.searchQuery = this.searchQuery;
    this.loadInvoices();
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
    this.invoiceService.bulkDownloadAsPDF(bulkItems)
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

  openInvoice() {
    this.router.navigate(["/add-invoice"]);
  }


  sentEmail(details: IInvoice) {
    this.router.navigate(["invoice", "invoice-email"]).then(() => {
      this.modalService.sendEvent(ModalEvents.SentInvoiceEmail, { status: true, data: { id: details._id, action: "invoice", type: 'Invoice' } });
    });
  }

  recordPayment(details: IInvoice) {
    this.router.navigate(["invoice", "record-payment"]).then(() => {
      this.modalService.sendEvent(ModalEvents.RecordPayment, { status: true, data: { id: details._id, action: "invoice" } });
    });
  }


  summaryTotal() {
    this.invoiceService.getInvoiceSummary().subscribe((res: IInvoiceSummary) => {
      this.invoiceSummary.updateData(res);
      this.loadInvoices();
    })
  }

  removePayment(details: IInvoice) {
    this.router.navigate(["invoice", "remove-payment", details._id]).then(() => {
      this.modalService.sendEvent(ModalEvents.RemovePayment, { status: true, data: { id: details._id } });
    })
  }



}

