import { ComponentFixture, TestBed } from '@angular/core/testing';

import { invoiceactionsComponent } from './invoice-actions.component';

describe('MarkasPaidComponent', () => {
  let component: invoiceactionsComponent;
  let fixture: ComponentFixture<invoiceactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ invoiceactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(invoiceactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
