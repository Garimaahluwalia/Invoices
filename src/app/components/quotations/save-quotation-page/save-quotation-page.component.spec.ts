import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveQuotationPageComponent } from './save-quotation-page.component';

describe('SaveQuotationPageComponent', () => {
  let component: SaveQuotationPageComponent;
  let fixture: ComponentFixture<SaveQuotationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveQuotationPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveQuotationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
