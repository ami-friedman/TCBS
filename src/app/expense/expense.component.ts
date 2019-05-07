import { Component } from '@angular/core';
import { Budget } from 'src/app/modules/budget';
import { BudgetService } from '../services/budget.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Expense } from '../modules/expenses';
import { ExpenseService } from '../services/expense.service';

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
  private month;

  budgetSub: Subscription;
  expenseSub: Subscription;

  constructor(private budgetService: BudgetService, private expenseService: ExpenseService ,route: ActivatedRoute) { 
    this.year = this.year = route.snapshot.paramMap.get('year') || new Date().getFullYear();
    this.month = route.snapshot.paramMap.get('month') || new Date().getMonth();
  }

  ngOnInit() {
    this.budgetSub = this.budgetService.get(this.userId, this.year)
    .subscribe( budget => {
      if (!budget) this.budgetExists = false;

      this.budget = budget;
    });

    this.expenseSub = this.expenseService.get(this.userId, this.month, this.year)
    .subscribe( expense => {
      if (!expense) {
        // This will re-trigger the observable - consider improving
        this.create();
      }
      this.expense = expense;
    }); 
  }

  private create() {
    this.initExpense();
    this.expenseService.create(this.userId, this.month, this.year, this.expense);    
   }

  ngOnDestroy() {
    this.budgetSub.unsubscribe();
    this.expenseSub.unsubscribe();
  }

  update() {
    console.log('called');
    this.expenseService.update(this.userId, this.month, this.year, this.expense);
  }

  private initExpense() {
    this.expense = {
      category1: {},
      category2: {},
      category3: {},
    }
  }





}
