import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeleteEvents } from 'src/app/types/delete';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  public deletePage: EventEmitter<boolean> = new EventEmitter<boolean>();
  private _selectedId: string | null = null;

  constructor() { }

  set selectedId(value: string | null) {
    this._selectedId = value;
  }

  get selectedId(): string | null {
    return this._selectedId;
  }

  sendEvent(type: DeleteEvents, value: boolean): void {
    switch (type) {
      case DeleteEvents.CLIENTS:
        this.deletePage.emit(value);
        break;
    }
  }
  
  recieveDeleteEvent(type: DeleteEvents): Observable<boolean> | undefined {
    switch (type) {
      case DeleteEvents.CLIENTS:
        return this.deletePage.asObservable();
      default:
        return undefined;
    }
  }

}
