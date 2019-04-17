import { Component, OnDestroy } from '@angular/core';
import { Budget } from 'src/modules/budget';
import { BudgetService } from '../services/budget.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnDestroy {

  private userId = 'RpgoZH0kaRRJnGuquAg4Í';
  private year = 2019;
  
  subscription: Subscription;
  budget: Budget;

  constructor(private budgetService: BudgetService) {
    this.subscription = this.budgetService.get(this.userId, this.year)
    .subscribe( budget => {
      this.budget = budget
    }); 
  }

  create() {
   this.initBudget();
   this.budgetService.create(this.userId, this.year, this.budget);    
  }

  update() {
    this.budgetService.update(this.userId, this.year, this.budget);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initBudget() {
    this.budget = {
      category1: {},
      category2: {},
      category3: {},
    }
  }



}
