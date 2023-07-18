import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeleteEvents } from 'src/app/types/delete';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  public deletePage: EventEmitter<{ [k: string]: string[] | string | boolean | number } | null> = new EventEmitter<{ [k: string]: string[] | string | boolean | number } | null>();

  constructor() { }


  sendEvent( value: { [k: string]: string[] | string | boolean | number } | null): void {
    this.deletePage.emit(value);
  }

  recieveDeleteEvent(): Observable<{ [k: string]: string[] | string | boolean | number } | null> | undefined {
    return this.deletePage.asObservable();
  }

}
