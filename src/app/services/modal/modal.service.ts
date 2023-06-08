import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import { ICommonModalEventResponse, ModalEvents } from 'src/app/types/modal';
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public defaultStatusInitWith = { status: false };
  private _addClient: BehaviorSubject<ICommonModalEventResponse> = new BehaviorSubject<ICommonModalEventResponse>(this.defaultStatusInitWith);
  private _updateClient: BehaviorSubject<ICommonModalEventResponse> = new BehaviorSubject<ICommonModalEventResponse>(this.defaultStatusInitWith);

  constructor() { }

  sendEvent(event: ModalEvents, data?: ICommonModalEventResponse) {
    const defaultStatus = { status: true };
    switch (event) {
      case ModalEvents.AddClient:
        this._addClient.next(data || defaultStatus);
        break;
      case ModalEvents.UpdateClient:
        this._updateClient.next(data || defaultStatus);
        break;
    }
  }

  recieveEvent(event: ModalEvents): Observable<any> {
    switch (event) {
      case ModalEvents.AddClient:
        return this._addClient.asObservable();
      case ModalEvents.UpdateClient:
        return this._updateClient.asObservable();
      default:
        return throwError(`Invalid event: ${event}`);
    }
  }
  
}
