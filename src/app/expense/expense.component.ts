import { Component } from '@angular/core';
import { Budget } from 'src/app/modules/budget';
import { BudgetService } from '../services/budget.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Expense } from '../modules/expenses';

@Component({
  selector: 'expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent {

  expense: Expense;
  budget: Budget;
  budgetExists = true;

  private userId = '1234';
  private year;

  subscription: Subscription;

  constructor(private budgetService: BudgetService, route: ActivatedRoute) { 
    this.initExpense();
    this.year = this.year = route.snapshot.paramMap.get('year') || new Date().getFullYear();
  }

  ngOnInit() {
    this.subscription = this.budgetService.get(this.userId, this.year)
    .subscribe( budget => {
      if (!budget) this.budgetExists = false;

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
