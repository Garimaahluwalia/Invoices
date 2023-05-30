import { Directive } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { SignupService } from '../services/auth/signup.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, of } from 'rxjs';

@Directive({
  selector: '[appEmail][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: EmailDirective,
      multi: true
    }
  ]
})
export class EmailDirective {

  constructor(public signupService: SignupService) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const value = control.value;
    console.log(value, "Validation value");
    if (value && value.trim() !== "") {
      return this.signupService.checkEmailExist({ email: value }).pipe(
        map((res: { [key: string]: boolean | string }) => {
          console.log(res, "VALIDATIONS RESPONSE");
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
