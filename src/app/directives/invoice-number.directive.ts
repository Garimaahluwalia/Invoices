import { Directive } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { ClientService } from '../services/clients/client.service';

@Directive({
  selector: '[appInvoiceNumber] [ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: InvoiceNumberDirective,
      multi: true
    }
  ]
})
export class InvoiceNumberDirective {

  constructor( public clientService : ClientService) { }


  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const value = control.value;
    if (value && value.trim() !== "") {
      return this.clientService.checkPhonenumberExist({ phonenumber: value }).pipe(
        map((res: { [key: string]: boolean | string }) => {
          if (res && !res?.['data']) {
            return { isExists: true };
          } else {
            return null;
          }
        }),
        catchError(() => of(null))
      );
    }
    return of(null);
  }

}
