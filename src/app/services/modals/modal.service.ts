import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ModalEvents } from 'src/app/types/modal';
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public defaultStatusInitWith = { status: false };
  constructor() { }
  private _addInvoiceTemplate : BehaviorSubject<any> = new BehaviorSubject<any>(this.defaultStatusInitWith);

  sendEvent(event : ModalEvents){
    const defaultStatus = {status: true};
    switch(event){
      case ModalEvents.AddInvoiceTheme: 
      this._addInvoiceTemplate.next(true);
      break;
      default: break;
    }
  }

  recieveEvent(event: ModalEvents){
    switch(event){
      case ModalEvents.AddInvoiceTheme:
        return this._addInvoiceTemplate.asObservable();
    }

  }

}
