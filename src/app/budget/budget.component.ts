import { Component, OnDestroy, OnInit } from '@angular/core';
import { Budget } from 'src/modules/budget';
import { BudgetService } from '../services/budget.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit, OnDestroy {

  //TODO: Make this dynamic and move to global/env
  private userId = 'RpgoZH0kaRRJnGuquAg4I2';
  year = 2019;
  
  subscription: Subscription;
  budget: Budget;

  constructor(private budgetService: BudgetService) {    
  }

  ngOnInit() {
    this.subscription = this.budgetService.get(this.userId, this.year)
    .subscribe( budget => {
      if (!budget) {
        // This will re-trigger the observable - consider improving
        this.create();
      }
      this.budget = budget
    }); 
  }

  private create() {
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
