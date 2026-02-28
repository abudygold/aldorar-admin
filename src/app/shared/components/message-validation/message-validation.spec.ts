import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageValidation } from './message-validation';

describe('MessageValidation', () => {
  let component: MessageValidation;
  let fixture: ComponentFixture<MessageValidation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageValidation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageValidation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
