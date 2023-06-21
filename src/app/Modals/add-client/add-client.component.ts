import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/clients/client.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { IClients } from 'src/app/types/clients';
import { ModalEvents } from 'src/app/types/modal';
import axios from 'axios';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  @ViewChild('openModalButton', { static: false }) private openModalButton!: ElementRef;
  @ViewChild('closeModalButton', { static: false }) private closeModalButton!: ElementRef;
  countries: { name: string, code: string }[] = [];
  public country!: string;
  public invoiceView: any;
  public name !: string;
  public email!: string;
  public phoneNumber!: string;
  public registeredNo!: string;
  public address!: string;
  public data: any;
  public state!: string;
  public city!: string;
  public zipcode!: string;
  public street!: string;
  public emailadress!: string
  public phone!: number;
  private invoice: boolean = false;
  public destroyed: ReplaySubject<boolean> = new ReplaySubject(0);
  public disabledInput: boolean = false;



  ngAfterViewInit(): void {
    this.modalService.recieveEvent(ModalEvents.AddorUpdateClient).pipe(takeUntil(this.destroyed)).subscribe(res => {
      const { status, data, invoice, disabled } = res;
      this.data = data;
      console.log(res, "adduser");
      this.invoice = data?.invoice || false;
      this.disabledInput = data?.disabled || false;

      if (status) {
        this.openModal();
      } else {
        this.closeModal();
      }
      this.name = data?.name || '';
      this.email = data?.email || '';
      this.phoneNumber = data?.phoneNumber || '';
      this.registeredNo = data?.registeredNo || '';
      this.country = data?.country || '';
      this.state = data?.state || '';
      this.city = data?.city || '';
      this.zipcode = data?.zipcode || '';
      this.street = data?.street || '';
    });
  }


  ngOnInit(): void {
    this.fetchCountries();
  }
  constructor(public router: Router, public modalService: ModalService, public clientService: ClientService) { }
  fetchCountries() {
    axios.get('https://restcountries.com/v2/all')
      .then(response => {
        this.countries = response.data.map((country: { name: any; alpha2Code: any; }) => ({
          name: country.name,
          code: country.alpha2Code
        }));
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }

  closeModal() {
    this.destroyed.next(true);
    this.destroyed.complete();
    this.closeModalButton?.nativeElement.click();
    if (this.router.url.includes("clients")) {
      this.router.navigate(["clients"]);
    } else if (this.router.url.includes("add-invoice")) {
      this.router.navigate(["add-invoice"]).then(() => {
        this.modalService.sendEvent(ModalEvents.AddorUpdateClient, { status: false });
      });
    }
  }


  openModal() {
    this.openModalButton?.nativeElement.click();
    this.setData();
  }
  setData() {
    if (this.data?.edit) {
      this.name = this.data.name;
      this.email = this.data.email;
      this.phoneNumber = this.data.phoneNumber;
      this.registeredNo = this.data.registeredNo;
      this.address = this.data.address
    }
  }
  saveChanges() {
    let address = `${this.street}, ${this.city}, ${this.state}, ${this.country}, ${this.zipcode}`;
    console.log(address, "The Data of address");
    let newData = {
      name: this.name, email: this.email, phoneNumber: this.phoneNumber, registeredNo: this.registeredNo, address: address,
      country: this.country, state: this.state, city: this.city, zipcode: this.zipcode, street: this.street, emailadress: this.emailadress, phone: this.phone
    }
    console.log(newData, "FormData")

    if (this.data?.edit) {
      this.updateClient(newData);
    }
    else {
      this.addClient(newData);
    }
  }

  updateClient(newData: any) {
    this.clientService.updateClientReq(this.data.clientId, newData).subscribe(() => {
      if (this.invoice) {
        this.clientService.sendClientDetails(newData);
      } else {
        this.clientService.getAll();
      }
      this.closeModal();
    }, err => {
      console.error(err);
      this.closeModal();
    })
  }

  addClient(newData: any) {
    this.clientService.sendPost(newData).subscribe((res: IClients) => {
      if (this.invoice) {
        this.clientService.sendClientDetails(res);
      } else {
        this.clientService.getAll();
      }
      this.closeModal();

    }, (err: any) => {
      console.error(err);
      this.closeModal();
    })
  }
}
