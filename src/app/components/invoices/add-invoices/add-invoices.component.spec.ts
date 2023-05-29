import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvoicesComponent } from './add-invoices.component';

describe('AddInvoicesComponent', () => {
  let component: AddInvoicesComponent;
  let fixture: ComponentFixture<AddInvoicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInvoicesComponent]
    });
    fixture = TestBed.createComponent(AddInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
