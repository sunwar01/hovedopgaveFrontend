import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCasePageComponent } from './find-case-page.component';

describe('FindCasePageComponent', () => {
  let component: FindCasePageComponent;
  let fixture: ComponentFixture<FindCasePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindCasePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindCasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
