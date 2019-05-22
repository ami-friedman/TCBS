import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCategoryTableComponent } from './budget-category-table.component';

describe('BudgetCategoryTableComponent', () => {
  let component: BudgetCategoryTableComponent;
  let fixture: ComponentFixture<BudgetCategoryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetCategoryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetCategoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
