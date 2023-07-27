import { Component, ElementRef, ViewChildren, OnInit, ViewChild, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/clients/client.service';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { DeleteService } from 'src/app/services/modal/delete.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { DeleteEvents } from 'src/app/types/delete';
import { ModalEvents } from 'src/app/types/modal';
import { DatePipe } from '@angular/common';
import { STATUS } from 'src/app/types/status';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';
import { ORDER } from 'src/app/types/order';
import { NotifierService } from 'angular-notifier';


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
  public currentPage = 1;  //pagination
  public itemsPerPage = 10; //pagination
  public totalItems = 15;   //pagination


  public invoices: any[] = [];
  public invoiceId: string | undefined
  public InvoiceNumber!: number;
  public showDropdown: boolean = false;
  private destroyed: ReplaySubject<boolean> = new ReplaySubject<boolean>(0);
  public status: typeof STATUS = STATUS;
  public readonly statuses: string[] = Object.values(STATUS);


  public isButtonEnabled: boolean = false;
  public checkedItems: { [key: string]: boolean } = {};
  public readonly ORDER = ORDER;
  public searchQuery: string = '';
  public startDate: any;
  public endDate: any;
  public isSearchFocused: boolean = false;
  public defaultDateRange!: string;
  private readonly notifier!: NotifierService;
  constructor(
    private datePipe: DatePipe,
    public invoiceService: InvoiceService,
    public router: Router, public route: ActivatedRoute,
    public deleteService: DeleteService,
    public modalService: ModalService,
    public clientService: ClientService,
    public sidebarService: SidebarService,
    public notifierService: NotifierService,) {
    this.notifier = notifierService;
  }


  ngOnInit(): void {
    this.itemsPerPage = this.invoiceService.limit;  //pagination
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


    // <-- pagination 
    this.invoiceService.totalNumberOfInvoices.pipe(takeUntil(this.destroyed)).subscribe((data: number) => {
      this.totalItems = data;
    });

    this.invoiceService.recieveInvoices().pipe(takeUntil(this.destroyed)).subscribe((data: any) => {
      this.invoices = data;
      // console.log(this.invoices, "INVOICES")
    });
    // pagination --> 
  }


  ngAfterViewInit() {
    $('input[name="daterange"]').daterangepicker({
      opens: 'left'
    }, (start: any, end: any, label: any) => {
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
        // console.log('Bulk delete successfull!');
        this.invoices = this.invoices.filter(item => !ids.includes(item._id));
        this.checkedItems = {};
        this.isButtonEnabled = false;
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



  deleteinvoice(details: any) {
    this.router.navigate(["invoice", "delete", details._id]).then(() => {
      this.modalService.sendEvent(ModalEvents.Delete, { status: true, data: { id: details._id } });
    })
  }

  updateInvoice(details: any) {
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

  //pagination
  onPageChange(page: number) {
    this.currentPage = page;
    this.invoiceService.page = page;
    this.invoiceService.getAll();
    this.checkedItems = {};
    this.selectUnselectSingle.nativeElement.checked = false;
  }

  DeleteInvoice(details: any) {
    this.router.navigate(["invoice", "delete", details._id]).then(() => {
      this.modalService.sendEvent(ModalEvents.Delete, { status: true, data: { id: details._id } });
    })
  }


  updateStatus(details: any, status: string) {
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

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  duplicateInvoice(details: any) {
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
    const checked: boolean = event.target.checked;  // Checked will be true or false 
    this.checkedItems[itemId] = checked;

    const ObjectValues = Object.values(this.checkedItems);  // Returns Array

    const isAnyChecked = ObjectValues.some(v => v === true);  // Return true or false

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

  selectUnselectAllItems(event: any) {
    const checked = event.target.checked;
    this.isButtonEnabled = checked;
    this.elements?.forEach(element => {
      this.checkedItems[element.nativeElement.value] = checked;
      element.nativeElement.checked = checked as any;
    });
  }



  bulkPDFDownload() {
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
          const blob = new Blob([response.body], { type: 'application/zip' }); // Create a blob using response
          const url = window.URL.createObjectURL(blob); // Create URL from that blob

          let downloadLink = document.createElement('a');
          downloadLink.href = url;
          downloadLink.setAttribute('download', `invoices.zip`); // Downloaded file name
          document.body.appendChild(downloadLink);
          downloadLink.click();
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
          // handle error
          console.log(error);
        }
      });
  }


  opened(){
    alert("Hello")
  }


}

