import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/clients/client.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { IClients } from 'src/app/types/clients';
import { ModalEvents } from 'src/app/types/modal';
import axios from 'axios';
import { ReplaySubject, takeUntil } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { Client } from 'src/app/types/client/client.dto';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit, OnDestroy {
  @ViewChild('openModalButton', { static: false }) private openModalButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('closeModalButton', { static: false }) private closeModalButton!: ElementRef<HTMLButtonElement>;

  countries: { name: string, code: string }[] = [];
  public country!: string;
  public name !: string;
  public email!: string;
  public phoneNumber!: string;
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
     
      this.country = data?.country || '';
      this.state = data?.state || '';
      this.city = data?.city || '';
      this.zipcode = data?.zipcode || '';
      this.street = data?.street || '';
      this.gstin = data?.gstin || '';
      this.pan = data?.pan || '';

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
    console.log("Open me")
    try {
      this.openModalButton?.nativeElement?.click();
    } catch (e) {
      console.error(e);
    } finally {
      this.setData();
    }
  }

  closeModal() {
    try {
      this.closeModalButton?.nativeElement.click();
    } catch (e) {
      console.error(e);
    } finally {
      if (this.router.url.includes("clients")) {
        this.router.navigate(["clients"]);
      } else if (this.router.url.includes("add-invoice")) {
        this.router.navigate(["add-invoice"]).then(() => {
          this.modalService.sendEvent(ModalEvents.AddorUpdateClient, { status: false });
        });
      }
    }
  }


  setData() {
    if (this.data?.edit) {
      this.name = this.data.name;
      this.email = this.data.email;
      this.phoneNumber = this.data.phoneNumber;
     
      this.address = this.data.address;
      this.gstin = this.gstin;
      this.pan = this.pan;
    }
  }
  saveChanges() {
    let address = `${this.street}, ${this.city}, ${this.state}, ${this.country}, ${this.zipcode}`;
    let newData = {
      name: this.name, email: this.email, phoneNumber: this.phoneNumber, address: address, gstin: this.gstin, pan: this.pan,
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
    this.clientService.updateClientReq(this.data.clientId, newData).subscribe((res:Client) => {
   
      if (this.invoice) {
        this.clientService.sendClientDetails(res);
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
    this.clientService.addClientToServer(newData).subscribe((res: Client) => {
      this.clientService.getAll();
      this.clientService.sendClientDetails(res);
      this.closeModal();
    }, (err: any) => {
      console.error(err);
      this.closeModal();
    })
  }
}
