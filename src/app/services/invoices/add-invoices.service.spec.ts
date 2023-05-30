import { TestBed } from '@angular/core/testing';

import { AddInvoicesService } from './add-invoices.service';

describe('AddInvoicesService', () => {
  let service: AddInvoicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddInvoicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
