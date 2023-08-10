import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecordPaymentComponent } from './add-record-payment.component';

describe('AddRecordPaymentComponent', () => {
  let component: AddRecordPaymentComponent;
  let fixture: ComponentFixture<AddRecordPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecordPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecordPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
