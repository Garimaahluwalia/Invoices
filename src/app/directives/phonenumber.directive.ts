import { Directive } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, of } from 'rxjs';
import { ClientService } from '../services/clients/client.service';
@Directive({
  selector: '[appPhonenumber] [ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: PhonenumberDirective,
      multi: true
    }
  ]
})
export class PhonenumberDirective {

  constructor(public clientService: ClientService) { }
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
