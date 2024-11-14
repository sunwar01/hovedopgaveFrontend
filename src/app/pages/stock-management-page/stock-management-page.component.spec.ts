import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockManagementPageComponent } from './stock-management-page.component';

describe('StockManagementPageComponent', () => {
  let component: StockManagementPageComponent;
  let fixture: ComponentFixture<StockManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockManagementPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
