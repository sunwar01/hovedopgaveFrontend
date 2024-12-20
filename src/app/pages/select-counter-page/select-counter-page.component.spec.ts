import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCounterPageComponent } from './select-counter-page.component';

describe('SelectCounterPageComponent', () => {
  let component: SelectCounterPageComponent;
  let fixture: ComponentFixture<SelectCounterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectCounterPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCounterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
