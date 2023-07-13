import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInvoiceComponent } from './main-invoice.component';

describe('MainInvoiceComponent', () => {
  let component: MainInvoiceComponent;
  let fixture: ComponentFixture<MainInvoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainInvoiceComponent]
    });
    fixture = TestBed.createComponent(MainInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
