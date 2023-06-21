import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/clients/client.service';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { DeleteService } from 'src/app/services/modal/delete.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { DeleteEvents } from 'src/app/types/delete';
import { IInvoice, Invoice } from 'src/app/types/invoice';
import { ModalEvents } from 'src/app/types/modal';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  currentPage = 1;
  itemsPerPage = 15;
  public invoices: IInvoice[] = [];
  public InvoiceNumber!: number;
  constructor(public invoiceService: InvoiceService, public router: Router, public route: ActivatedRoute, public deleteService: DeleteService, public modalService: ModalService, public clientService: ClientService) { }
  ngOnInit(): void {
    this.loadInvoices();
  

    this.deleteService.recieveDeleteEvent(DeleteEvents.INVOICES)?.subscribe(res => {
      console.log(res, "invoice deleted succeessfully")
      if (res) {
        this.DeleteInvoices(this.deleteService.selectedId as string);
      }
    });
  }



  loadInvoices() {
    this.invoiceService.getAllInvoice()
      .subscribe((invoice: IInvoice[]) => {
        this.invoices = invoice;
        console.log(this.invoices, "LoadInvoices");
      });
  }

  // getStatus(invoiceId: string) {
  //   this.invoiceService.setStatus(invoiceId).subscribe(
  //     () => {
  //       console.log('Status set successfully.');
  //     },
  //     (error) => {
  //       console.error('Failed to set status:', error);
  //     }
  //   );
  // }
  

  DeleteInvoice(details: any) {
    this.router.navigate(["invoice", "delete", details._id]).then(() => {
      this.modalService.sendEvent(ModalEvents.Delete, { status: true, data: { id: details._id, event: DeleteEvents.INVOICES } });
    })
  }


  DeleteInvoices(_id: string) {
    this.invoiceService.deleteInvoices(_id).subscribe((res) => {
      console.log(res, "deleteresponse")
      this.deleteService.selectedId = null;
      this.invoiceService.getAll();
    }, err => {
      console.error(err);
    });
  }
}

