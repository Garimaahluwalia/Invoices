import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicedataComponent } from './invoicedata.component';

describe('InvoicedataComponent', () => {
  let component: InvoicedataComponent;
  let fixture: ComponentFixture<InvoicedataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoicedataComponent]
    });
    fixture = TestBed.createComponent(InvoicedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
