import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCounterPageComponent } from './open-counter-page.component';

describe('OpenCounterPageComponent', () => {
  let component: OpenCounterPageComponent;
  let fixture: ComponentFixture<OpenCounterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenCounterPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenCounterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
