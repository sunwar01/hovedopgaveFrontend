import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsolvedCasesPageComponent } from './unsolved-cases-page.component';

describe('UnsolvedCasesPageComponent', () => {
  let component: UnsolvedCasesPageComponent;
  let fixture: ComponentFixture<UnsolvedCasesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsolvedCasesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnsolvedCasesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
