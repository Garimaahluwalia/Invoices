import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IEventResponse, ModalEvents } from 'src/app/types/modal';
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public defaultStatusInitWith = { status: false };
  private _addorUpdateClient: BehaviorSubject<IEventResponse> = new BehaviorSubject<IEventResponse>(this.defaultStatusInitWith);
  private _deleteConfirmation: BehaviorSubject<IEventResponse> = new BehaviorSubject<IEventResponse>(this.defaultStatusInitWith);
  private _invoiceactions: BehaviorSubject<IEventResponse> = new BehaviorSubject<IEventResponse>(this.defaultStatusInitWith)
  private _bulkDelete: BehaviorSubject<IEventResponse> = new BehaviorSubject<IEventResponse>(this.defaultStatusInitWith)
  private _recordPayment: BehaviorSubject<IEventResponse> = new BehaviorSubject<IEventResponse>(this.defaultStatusInitWith)
  private _sentInvoiceEmail: BehaviorSubject<IEventResponse> = new BehaviorSubject<IEventResponse>(this.defaultStatusInitWith)
  constructor() { }

  sendEvent(event: ModalEvents, data?: IEventResponse) {
    const defaultStatus = { status: true };
    switch (event) {
      case ModalEvents.Delete:
        this._deleteConfirmation.next(data || defaultStatus);
        break;
      case ModalEvents.AddorUpdateClient:
        this._addorUpdateClient.next(data || defaultStatus);
        break;
      case ModalEvents.invoiceactions:
        this._invoiceactions.next(data || defaultStatus);
        break;
      case ModalEvents.BulkDelete:
        this._bulkDelete.next(data || defaultStatus);
        break;
      case ModalEvents.SentInvoiceEmail:
        this._sentInvoiceEmail.next(data || defaultStatus);
    }
  }

  recieveEvent(event: ModalEvents): Observable<any> {
    switch (event) {
      case ModalEvents.AddorUpdateClient:
        return this._addorUpdateClient.asObservable();
      case ModalEvents.Delete:
        return this._deleteConfirmation.asObservable();
      case ModalEvents.invoiceactions:
        return this._invoiceactions.asObservable();
      case ModalEvents.BulkDelete:
        return this._bulkDelete.asObservable();
      case ModalEvents.SentInvoiceEmail:
        return this._sentInvoiceEmail.asObservable();
    }
  }

}
