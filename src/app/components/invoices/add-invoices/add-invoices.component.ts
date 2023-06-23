import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AddInvoicesService } from 'src/app/services/invoices/add-invoices.service';
import { IInvoice, Invoice } from 'src/app/types/invoice';
import { NotifierService } from 'angular-notifier';
import { ClientService } from 'src/app/services/clients/client.service';
@Component({
  selector: 'app-add-invoices',
  templateUrl: './add-invoices.component.html',
  styleUrls: ['./add-invoices.component.css']
})
export class AddInvoicesComponent implements OnInit {
  @ViewChild("InvoiceForm", { static: false }) InvoiceForm!: NgForm;
  Invoices!: IInvoice;
  public taxesType: any
  private readonly notifier!: NotifierService;

  constructor(
    public addInvoiceService: AddInvoicesService,
    public route: Router,
    public notifierService: NotifierService,
    private clientService: ClientService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.clientService.recieveTaxName().subscribe((res) => {
      this.taxesType = res
    });
  }

  submit(f: NgForm) {
    const invoice = new Invoice();
    invoice.setData(f.value);
    console.log(f.value);
    const payload = invoice.getPayload();
    console.log(payload, "payload");
    this.addInvoiceService.addInvoice((payload)).subscribe((res: any) => {
      this.Invoices = res;
      console.log(this.Invoices, "Add-Invoices");
      this.notifier.notify('success', 'Invoice Save successfully');
      this.route.navigateByUrl("/invoice");
    }, (error: any) => {
      console.error(error);
    });
  }
}




