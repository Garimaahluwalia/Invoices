import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  @ViewChild('mobileNav', { static: true }) mobileNav!: ElementRef;
  public isActiveSideBar: Boolean = false;
  public currentPage = 1;  //pagination
  public itemsPerPage = 2; //pagination
  public totalItems = 15;   //pagination


  public invoices: any[] = [];
  public invoiceId: string | undefined
  public InvoiceNumber!: number;
  public showDropdown: boolean = false;
  private destroyed: ReplaySubject<boolean> = new ReplaySubject<boolean>(0);
  public status: typeof STATUS = STATUS;
  public readonly statuses: string[] = Object.values(STATUS);


  constructor(
    private datePipe: DatePipe,
    public invoiceService: InvoiceService,
    public router: Router, public route: ActivatedRoute,
    public deleteService: DeleteService,
    public modalService: ModalService,
    public clientService: ClientService,
    public sidebarService: SidebarService) { }
  ngOnInit(): void {
    this.itemsPerPage = this.invoiceService.limit;  //pagination
    this.loadInvoices();
    this.deleteService.recieveDeleteEvent(DeleteEvents.INVOICES)?.subscribe(res => {
      if (res) {
        this.DeleteInvoices(this.deleteService.selectedId as string);
      }
    });

    // <-- pagination 
    this.invoiceService.totalNumberOfInvoices.pipe(takeUntil(this.destroyed)).subscribe((data: number) => {
      this.totalItems = data;

    });

    this.invoiceService.recieveInvoices().pipe(takeUntil(this.destroyed)).subscribe((data: any) => {
      this.invoices = data;
    });
    // pagination --> 
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  loadInvoices() {
    console.log("Load Invoices");
    this.invoiceService.getAll();
  }


  private formatDate(date: string): string {
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    return formattedDate || '';
  }



  Deleteinvoice(details: any) {
    this.router.navigate(["invoice", "delete", details._id]).then(() => {
      this.modalService.sendEvent(ModalEvents.Delete, { status: true, data: { id: details._id, event: DeleteEvents.INVOICES } });
    })
  }

  updateInvoice(details: any) {
    this.router.navigate(["/add-invoice", details._id]);
  }

  DeleteInvoices(_id: string) {
    this.invoiceService.deleteInvoices(_id).pipe(takeUntil(this.destroyed)).subscribe(
      (res) => {
        this.deleteService.selectedId = null;
        this.invoiceService.getAllInvoice().pipe(takeUntil(this.destroyed)).subscribe(
          (res: any) => {
            this.invoices = res.invoices.map((invoice: any) => {
              invoice.date = this.formatDate(invoice.date);
              return invoice;
            });
          },
          (err) => {
            console.error(err);
          }
        );
      },
      (err) => {
        console.error(err);
      }
    );
  }

  //pagination
  onPageChange(page: number) {
    console.log("Page Changes")
    this.currentPage = page;
    this.invoiceService.page = page;
    this.invoiceService.getAll();
  }

  DeleteInvoice(details: any) {
    this.router.navigate(["invoice", "delete", details._id]).then(() => {
      this.modalService.sendEvent(ModalEvents.Delete, { status: true, data: { id: details._id, event: DeleteEvents.INVOICES } });
    })
  }


  updateStatus(details: any, status: string) {
    console.log("Function called")
    // details.disabled = (status === 'CANCELLED');
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

  // addDuplicateInvoice(details:any){
  //   this.invoiceService.getDuplicateInvoice(details).subscribe((res:any) => {
  //   })

  toggleBodyClass() {
    this.sidebarService.isMobile.emit(!this.isActiveSideBar);
    this.isActiveSideBar = !this.isActiveSideBar
  }

  triggerButtonClick() {
    this.mobileNav.nativeElement.click();
  }

}

