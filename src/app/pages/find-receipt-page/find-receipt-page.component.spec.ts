import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindReceiptPageComponent } from './find-receipt-page.component';

describe('FindReceiptPageComponent', () => {
  let component: FindReceiptPageComponent;
  let fixture: ComponentFixture<FindReceiptPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindReceiptPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindReceiptPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
