import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCasePageComponent } from './create-case-page.component';

describe('CreateCasePageComponent', () => {
  let component: CreateCasePageComponent;
  let fixture: ComponentFixture<CreateCasePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCasePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
