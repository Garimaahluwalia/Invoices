import { TestBed } from '@angular/core/testing';

import { InvoiceDataHandlerService } from './invoice-data-handler.service';

describe('InvoiceDataHandlerService', () => {
  let service: InvoiceDataHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceDataHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
