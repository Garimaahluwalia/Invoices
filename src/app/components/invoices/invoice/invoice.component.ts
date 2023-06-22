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
  public invoiceId:string | undefined
  public InvoiceNumber!: number;
  public InvoiceStatus : any;
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
    this.invoiceService.getAllInvoice().subscribe((invoices: IInvoice[]) => {
      this.invoices = invoices;
      console.log(this.invoices, "LoadInvoices");
      this.invoices.forEach((invoice: IInvoice) => {
        if (invoice._id) {
          const invoiceId: string = invoice._id; 
          console.log(invoiceId, "id of Invoice");
          this.invoiceService.updateInvoiceStatus(invoiceId).subscribe(
            (res) => {
              this.InvoiceStatus = res;
              console.log(res, `Invoice status updated for invoice ID: ${invoiceId}`);
            },
            (error: any) => {
              console.error(`Failed to update invoice status for invoice ID: ${invoiceId}`, error);
            }
          );
        }
      });
    });
  }
 
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

