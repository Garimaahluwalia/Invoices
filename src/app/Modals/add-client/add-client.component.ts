import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/clients/client.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalEvents } from 'src/app/types/modal';
import axios from 'axios';
import { ReplaySubject, takeUntil } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { IClient, IClientPayload } from 'src/app/types/client/client.dto';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit, OnDestroy {
  @ViewChild('openModalButton', { static: false }) private openModalButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('closeModalButton', { static: false }) private closeModalButton!: ElementRef<HTMLButtonElement>;

  public countries: { name: string, code: string }[] = [];
  public country!: string;
  public name !: string;
  public email!: string;
  public phoneNumber!: string;
  public address!: string;
  public gstin!: string;
  public pan!: string;
  public data!: { [k: string]: string };
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
  public invoiceID!: string;



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
      const { status, data } = res;
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





  fetchCountries() {
    axios.get('https://restcountries.com/v2/all')
      .then(response => {
        this.countries = response.data.map((country: { name: string; alpha2Code: string; }) => ({
          name: country.name,
          code: country.alpha2Code
        }));
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }

  openModal() {
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
        if (this.router.url.includes(this.data?.['_id'])) {
        } else {
          this.router.navigate(["add-invoice"]).then(() => {
            this.modalService.sendEvent(ModalEvents.AddorUpdateClient, { status: false });
          });
        }
      }
    }
  }


  setData() {
    if (this.data?.['edit']) {
      this.name = this.data['name'];
      this.email = this.data['email'];
      this.phoneNumber = this.data['phoneNumber'];
      this.address = this.data['address'];
      this.gstin = this.gstin;
      this.pan = this.pan;
    }
  }
  saveChanges() {
    let address = `${this.street}, ${this.city}, ${this.state}, ${this.country}, ${this.zipcode}`;
    let newData: IClientPayload = {
      name: this.name,
      email: this.email,
      phoneNumber: this.phoneNumber,
      address: address,
      gstin: this.gstin,
      pan: this.pan,
      country: this.country,
      state: this.state,
      city: this.city,
      zipcode: parseInt(this.zipcode),
      street: this.street,
    }

    if (this.data?.['edit']) {
      this.updateClient(newData);
      this.notifier.show({
        type: 'success',
        message: 'Client updated successfully',
        id: 'THAT_NOTIFICATION_ID',
      });
      setTimeout(() => {
        this.notifier.hide('THAT_NOTIFICATION_ID');
      }, 2000);

    }
    else {
      this.addClient(newData);
      this.notifier.show({
        type: 'success',
        message: 'Client added successfully',
        id: 'THAT_NOTIFICATION_ID',
      });
      setTimeout(() => {
        this.notifier.hide('THAT_NOTIFICATION_ID');
      }, 2000);
    }
  }

  updateClient(newData: IClientPayload) {
    this.clientService.updateClientReq(this.data['clientId'], newData).subscribe((res: IClient) => {
      this.clientService.updateListAndSendClientData(res);
      this.closeModal();
    }, err => {
      console.error(err);
      this.closeModal();
    })
  }

  addClient(newData: IClientPayload) {
    this.clientService.addClientToServer(newData).subscribe((res: IClient) => {
      this.clientService.getAll();
      this.clientService.sendClientDetails(res);
      this.closeModal();
    }, (err: IClient) => {
      console.error(err);
      this.closeModal();
    })
  }


  ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}
