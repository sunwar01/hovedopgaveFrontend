import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCasePageComponent } from './display-case-page.component';

describe('DisplayCasePageComponent', () => {
  let component: DisplayCasePageComponent;
  let fixture: ComponentFixture<DisplayCasePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayCasePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayCasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
