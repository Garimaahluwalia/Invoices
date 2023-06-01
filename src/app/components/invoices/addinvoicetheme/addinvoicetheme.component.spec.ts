import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddinvoicethemeComponent } from './addinvoicetheme.component';

describe('AddinvoicethemeComponent', () => {
  let component: AddinvoicethemeComponent;
  let fixture: ComponentFixture<AddinvoicethemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddinvoicethemeComponent]
    });
    fixture = TestBed.createComponent(AddinvoicethemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
