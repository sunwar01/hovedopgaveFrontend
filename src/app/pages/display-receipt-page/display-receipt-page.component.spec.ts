import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayReceiptPageComponent } from './display-receipt-page.component';

describe('DisplayReceiptPageComponent', () => {
  let component: DisplayReceiptPageComponent;
  let fixture: ComponentFixture<DisplayReceiptPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayReceiptPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayReceiptPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
