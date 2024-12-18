import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLatestReceiptsPageComponent } from './show-latest-receipts-page.component';

describe('ShowLatestReceiptsPageComponent', () => {
  let component: ShowLatestReceiptsPageComponent;
  let fixture: ComponentFixture<ShowLatestReceiptsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowLatestReceiptsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowLatestReceiptsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
