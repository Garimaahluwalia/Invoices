import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { InvoiceTypes } from 'src/app/types/invoice-types';

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
  @Input() public Id: string | null = null;
  @Input() public InvoiceType: InvoiceTypes = InvoiceTypes.Invoice;
  constructor(public invoiceService: InvoiceService) { }
  
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const value = control.value;
    if (value && String(value).trim() !== "") {
      if (this.InvoiceType === InvoiceTypes.Invoice) {
        return this.checkInvoiceNumber(value);
      } else {
        return this.checkQutoationNumber(value);
      }
    }

    return of(null);
  }


  checkInvoiceNumber(value: string) {
    return this.invoiceService.checkInvoiceNumber(value, this.Id).pipe(
      map((res: { [key: string]: boolean | string }) => {
        if (res && !res?.['data']) {
          return { isExists: true, message: `Invoice number already exists`  };
        } else {
          return null;
        }
      }),
      catchError(() => of(null))
    );
  }

  checkQutoationNumber(value: string) {
    return this.invoiceService.checkInvoiceNumber(value, this.Id).pipe(
      map((res: { [key: string]: boolean | string }) => {
        if (res && !res?.['data']) {
          return { isExists: true, message: `Quotation number already exists` };
        } else {
          return null;
        }
      }),
      catchError(() => of(null))
    );
  }

}
