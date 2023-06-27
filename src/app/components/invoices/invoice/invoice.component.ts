import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/clients/client.service';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { DeleteService } from 'src/app/services/modal/delete.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { DeleteEvents } from 'src/app/types/delete';
import { IInvoice, IInvoiceResponse, Invoice } from 'src/app/types/invoice';
import { ModalEvents } from 'src/app/types/modal';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  currentPage = 1;
  itemsPerPage = 15;
  public invoices: any[] = []
  public invoiceId: string | undefined
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
      .subscribe((res: any) => {
        this.invoices = res.invoices;
        console.log(res, "LoadInvoices");
      });
  }



  DeleteInvoice(details: any) {
    this.router.navigate(["invoice", "delete", details._id]).then(() => {
      this.modalService.sendEvent(ModalEvents.Delete, { status: true, data: { id: details._id, event: DeleteEvents.INVOICES } });
    })
  }

  updateInvoice(details:any){
    this.router.navigate(["add-invoice" , details._id]);
  }

  DeleteInvoices(_id: string) {
    this.invoiceService.deleteInvoices(_id).subscribe((res) => {
      console.log(res, "deleteresponse")
      this.deleteService.selectedId = null;
      this.invoiceService.getAllInvoice();
    }, err => {
      console.error(err);
    });
  }
}

