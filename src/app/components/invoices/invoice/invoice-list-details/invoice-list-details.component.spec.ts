import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceListDetailsComponent } from './invoice-list-details.component';

describe('InvoiceListDetailsComponent', () => {
  let component: InvoiceListDetailsComponent;
  let fixture: ComponentFixture<InvoiceListDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceListDetailsComponent]
    });
    fixture = TestBed.createComponent(InvoiceListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
