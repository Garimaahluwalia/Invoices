import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationListDetailsComponent } from './quotation-list-details.component';

describe('QuotationListDetailsComponent', () => {
  let component: QuotationListDetailsComponent;
  let fixture: ComponentFixture<QuotationListDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationListDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotationListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
