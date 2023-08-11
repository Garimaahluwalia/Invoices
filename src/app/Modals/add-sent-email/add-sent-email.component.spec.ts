import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSentEmailComponent } from './add-sent-email.component';

describe('AddSentEmailComponent', () => {
  let component: AddSentEmailComponent;
  let fixture: ComponentFixture<AddSentEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSentEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSentEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
