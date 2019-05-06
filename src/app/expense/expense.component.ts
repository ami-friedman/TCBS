import { Component } from '@angular/core';
import { Expense, Budget } from 'src/modules/budget';
import { BudgetService } from '../services/budget.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent {

  expense: Expense;
  budget: Budget;

  private userId = '1234';
  private year;

  subscription: Subscription;

  constructor(private budgetService: BudgetService, route: ActivatedRoute) { 
    this.initExpense();
    this.year = 2019;
  }

  ngOnInit() {
    this.subscription = this.budgetService.get(this.userId, this.year)
    .subscribe( budget => {
      this.budget = budget;
    }); 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  update() {

  }

  private initExpense() {
    this.expense = {
      category1: {},
      category2: {},
      category3: {},
    }
  }





}
