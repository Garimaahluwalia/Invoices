import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';
import { SignupService } from '../services/auth/signup.service';
import { Observable, catchError, map, of } from 'rxjs';

@Directive({
  selector: '[appSignup][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting : SignupDirective  ,
      multi: true
    }
  ]
})
export class SignupDirective {

  constructor(public signupService: SignupService) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const value = control.value;
    console.log(value, "Validation value");
    if (value && value.trim() !== "") {
      return this.signupService.sendPostsignup({ login: value }).pipe(
        map((res: { [key: string]: boolean | string }) => {
          console.log(res, "VALIDATIONS RESPONSE");
          if (res["isEmailExists"]) {
            return { isEmailExists: true };
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
