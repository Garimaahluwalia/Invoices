import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingaddressComponent } from './billingaddress.component';

describe('BillingaddressComponent', () => {
  let component: BillingaddressComponent;
  let fixture: ComponentFixture<BillingaddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillingaddressComponent]
    });
    fixture = TestBed.createComponent(BillingaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
