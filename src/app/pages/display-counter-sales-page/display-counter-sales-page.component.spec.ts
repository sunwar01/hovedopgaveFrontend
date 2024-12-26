import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCounterSalesPageComponent } from './display-counter-sales-page.component';

describe('DisplayCounterSalesPageComponent', () => {
  let component: DisplayCounterSalesPageComponent;
  let fixture: ComponentFixture<DisplayCounterSalesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayCounterSalesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayCounterSalesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
