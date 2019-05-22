import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseCategoryTableComponent } from './expense-category-table.component';

describe('ExpenseCategoryTableComponent', () => {
  let component: ExpenseCategoryTableComponent;
  let fixture: ComponentFixture<ExpenseCategoryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseCategoryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseCategoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
