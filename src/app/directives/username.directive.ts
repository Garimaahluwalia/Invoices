import { Directive } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { SignupService } from '../services/auth/signup.service';
import { Observable, catchError, map, of } from 'rxjs';

@Directive({
  selector: '[appUsername][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UsernameDirective,
      multi: true
    }
  ]
})
export class UsernameDirective {

  constructor(public signupService: SignupService) { }
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const value = control.value;
    console.log(value, "Validation value");
    if (value && value.trim() !== "") {
      return this.signupService.checkUsernameExist({ username: value }).pipe(
        map((res: { [key: string]: boolean | string }) => {
          console.log(res, "VALIDATIONS RESPONSE");
          if (res) {
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
