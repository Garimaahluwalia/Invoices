import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { ClientService } from '../services/clients/client.service';
import { InvoiceService } from '../services/invoices/invoice.service';

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
  @Input() public invoiceId: any;
  constructor(public invoiceService : InvoiceService) { }


  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const value = control.value;
    console.log(value,"ajis")
    if (value && value.trim() !== "") {
      return this.invoiceService.checkInvoiceNumber(value, this.invoiceId ).pipe(
        map((res: any) => {
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
