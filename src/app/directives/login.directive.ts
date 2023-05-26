import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Directive({
  selector: '[appLogin][ngModel]',
  providers: [ {
    provide : NG_VALIDATORS,
    useExisting: LoginDirective,
    multi: true
  }]
})
export class LoginDirective {

  constructor() { }

  validate(control:AbstractControl): Observable<ValidationErrors | null> {
    const value = control.value;
    console.log(value, "Validation value");
    const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!control.value || !email.test(control.value)){
      return of({invalidEmail:true});
    }

    return of(null)
    
  }
 
 }

