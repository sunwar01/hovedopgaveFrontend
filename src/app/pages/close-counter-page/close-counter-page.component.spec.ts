import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseCounterPageComponent } from './close-counter-page.component';

describe('CloseCounterPageComponent', () => {
  let component: CloseCounterPageComponent;
  let fixture: ComponentFixture<CloseCounterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloseCounterPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseCounterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
