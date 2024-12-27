import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCounterRapportComponent } from './display-counter-rapport.component';

describe('DisplayCounterReconciliationsComponent', () => {
  let component: DisplayCounterRapportComponent;
  let fixture: ComponentFixture<DisplayCounterRapportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayCounterRapportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayCounterRapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
