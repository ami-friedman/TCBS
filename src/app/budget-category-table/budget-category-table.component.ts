import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import _  from 'lodash';
import { Expenses } from '../modules/expenses';

@Component({
  selector: 'budget-category-table',
  templateUrl: './budget-category-table.component.html',
  styleUrls: ['./budget-category-table.component.css']
})
export class BudgetCategoryTableComponent {

  @Input('expenses') expenses: Expenses;
  @Output('newExpenses') updatedExpenses = new EventEmitter();

  newExpenseName: string;
  newExpenseAmount: number;


  constructor() { 
    
  }

  addExpense() {
    this.expenses[this.newExpenseName] = this.newExpenseAmount;
  
    this.newExpenseName = null;
    this.newExpenseAmount = null;

    this.updatedExpenses.emit();
  }

  get total() {
    return _.sum(_.values(this.expenses));
  }

  removeItem(name) {
    delete this.expenses[name];
    this.updatedExpenses.emit();
  }
}
