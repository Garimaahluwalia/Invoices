import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/clients/client.service';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { DeleteService } from 'src/app/services/modal/delete.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { DeleteEvents } from 'src/app/types/delete';
import { IInvoice, IInvoiceResponse, Invoice } from 'src/app/types/invoice';
import { ModalEvents } from 'src/app/types/modal';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  public currentPage = 1;  //pagination
  public itemsPerPage = 2; //pagination
  public totalItems = 15;   //pagination


  public invoices: any[] = []
  public invoiceId: string | undefined
  public InvoiceNumber!: number;
  public showDropdown: boolean = false;


  constructor(private datePipe: DatePipe,
    public invoiceService: InvoiceService,
    public router: Router, public route: ActivatedRoute,
    public deleteService: DeleteService,
    public modalService: ModalService,
    public clientService: ClientService) { }


  ngOnInit(): void {
    this.itemsPerPage = this.invoiceService.limit;  //pagination
    this.loadInvoices();
    this.deleteService.recieveDeleteEvent(DeleteEvents.INVOICES)?.subscribe(res => {
      console.log(res, "invoice deleted succeessfully");
      if (res) {
        this.DeleteInvoices(this.deleteService.selectedId as string);
      }
    });



    // <-- pagination 
    this.invoiceService.totalNumberOfInvoices.subscribe((data: number) => {
      this.totalItems = data;
      
    });
    
    this.invoiceService.recieveInvoices().subscribe((data: any) => {
      this.invoices = data;
      
      console.log(this.invoices, "The Invoices ")
    });
    // pagination --> 
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  loadInvoices() {
    this.invoiceService.getAll();
  }


  private formatDate(date: string): string {
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    return formattedDate || '';
  }



  DeleteInvoice(details: any) {
    this.router.navigate(["invoice", "delete", details._id]).then(() => {
      this.modalService.sendEvent(ModalEvents.Delete, { status: true, data: { id: details._id, event: DeleteEvents.INVOICES } });
    })
  }

  updateInvoice(details: any) {
    this.router.navigate(["/add-invoice", details._id]);
  }



  DeleteInvoices(_id: string) {
    this.invoiceService.deleteInvoices(_id).subscribe(
      (res) => {
        this.deleteService.selectedId = null;
        this.invoiceService.getAllInvoice().subscribe(
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
    this.currentPage = page;
    this.invoiceService.page = page;
    this.invoiceService.getAll();
  }

}

