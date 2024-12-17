import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLatestCasesPageComponent } from './show-latest-cases-page.component';

describe('ShowLatestCasesPageComponent', () => {
  let component: ShowLatestCasesPageComponent;
  let fixture: ComponentFixture<ShowLatestCasesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowLatestCasesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowLatestCasesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
