import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyaddressComponent } from './companyaddress.component';

describe('CompanyaddressComponent', () => {
  let component: CompanyaddressComponent;
  let fixture: ComponentFixture<CompanyaddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyaddressComponent]
    });
    fixture = TestBed.createComponent(CompanyaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
