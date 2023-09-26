import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewrecordpaymentComponent } from './viewrecordpayment.component';

describe('ViewrecordpaymentComponent', () => {
  let component: ViewrecordpaymentComponent;
  let fixture: ComponentFixture<ViewrecordpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewrecordpaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewrecordpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
