import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveInvoicePageComponent } from './save-invoice-page.component';

describe('SaveInvoicePageComponent', () => {
  let component: SaveInvoicePageComponent;
  let fixture: ComponentFixture<SaveInvoicePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveInvoicePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveInvoicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
