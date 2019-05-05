import { TestBed } from '@angular/core/testing';

import { BudgetService } from './budget.service';

xdescribe('BudgetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BudgetService = TestBed.get(BudgetService);
    expect(service).toBeTruthy();
  });
});
