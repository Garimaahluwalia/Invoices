import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/clients/client.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { IClients } from 'src/app/types/clients';
import { ModalEvents } from 'src/app/types/modal';
import axios from 'axios';
import { ReplaySubject, takeUntil } from 'rxjs';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit, OnDestroy {
  @ViewChild('openModalButton', { static: false }) private openModalButton!: ElementRef;
  @ViewChild('closeModalButton', { static: false }) private closeModalButton!: ElementRef;
  countries: { name: string, code: string }[] = [];
  public country!: string;
  public name !: string;
  public email!: string;
  public phoneNumber!: string;
  public registeredNo!: string;
  public address!: string;
  public gstin!: string;
  public pan!: string;
  public data: any;
  public state!: string;
  public city!: string;
  public zipcode!: string;
  public street!: string;
  public emailadress!: string
  public phone!: number;
  public _id!: string;
  public user_id!: string;
  private invoice: boolean = false;
  public destroyed: ReplaySubject<boolean> = new ReplaySubject(0);
  public disabledInput: boolean = false;
  private readonly notifier!: NotifierService;




  constructor(public router: Router,
    private cdr: ChangeDetectorRef,
    public modalService: ModalService,
    public clientService: ClientService,
    public notifierService: NotifierService) {
    this.notifier = notifierService;
  }


  ngOnInit(): void {
    this.fetchCountries();

  }

  ngAfterViewInit(): void {
    this.modalService.recieveEvent(ModalEvents.AddorUpdateClient).pipe(takeUntil(this.destroyed)).subscribe(res => {
      const { status, data, invoice, disabled } = res;
      this.data = data;
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
      this.gstin = data?.gstin || '';
      this.pan = data?.pan || '';
      this._id = data?._id || '';
      this.user_id = data?.user_id || ''

    });
    this.cdr.detectChanges();
  }



  ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

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

  openModal() {
    this.openModalButton?.nativeElement.click();
    this.setData();
  }

  closeModal() {
    this.closeModalButton?.nativeElement.click();
    if (this.router.url.includes("clients")) {
      this.router.navigate(["clients"]);
    } else if (this.router.url.includes("add-invoice")) {
      this.router.navigate(["add-invoice"]).then(() => {
        this.modalService.sendEvent(ModalEvents.AddorUpdateClient, { status: false });
      });
    }
  }


  setData() {
    if (this.data?.edit) {
      this.name = this.data.name;
      this.email = this.data.email;
      this.phoneNumber = this.data.phoneNumber;
      this.registeredNo = this.data.registeredNo;
      this.address = this.data.address,
        this.gstin = this.gstin,
        this.pan = this.pan
      this._id = this._id,
        this.user_id = this.user_id
    }
  }
  saveChanges() {
    let address = `${this.street}, ${this.city}, ${this.state}, ${this.country}, ${this.zipcode}`;
    let newData = {
      _id: this._id, user_id: this.user_id, name: this.name, email: this.email, phoneNumber: this.phoneNumber, registeredNo: this.registeredNo, address: address, gstin: this.gstin, pan: this.pan,
      country: this.country, state: this.state, city: this.city, zipcode: this.zipcode, street: this.street, emailadress: this.emailadress, phone: this.phone,
    }

    if (this.data?.edit) {
      this.updateClient(newData);
      this.notifier.notify('success', 'Client updated successfully');

    }
    else {
      this.addClient(newData);
      this.notifier.notify('success', 'Client added successfully');
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
      this.clientService.sendClientDetails(res);
      this.closeModal();
    }, (err: any) => {
      console.error(err);
      this.closeModal();
    })
  }
}
