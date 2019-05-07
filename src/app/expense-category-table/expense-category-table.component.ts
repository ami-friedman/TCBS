import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Expenses } from '../modules/expenses';
import * as _ from 'lodash';


@Component({
  selector: 'expense-category-table',
  templateUrl: './expense-category-table.component.html',
  styleUrls: ['./expense-category-table.component.css']
})
export class ExpenseCategoryTableComponent implements OnInit {

  @Input()  expenses: Expenses;
  @Input()  budgetExpenses: Expenses;
  @Output() updatedExpenses = new EventEmitter();

  expensesDropdown;
  newExpenseName;
  newExpenseAmount;

  constructor() { }

  ngOnInit() {
    // TODO: Handle the case of original budget changing during expense creation
    
    this.expensesDropdown = {...this.budgetExpenses};

    // We only want the un-accounter-for expenses in the dropdown
    for (let expense in this.expenses) {
      delete this.expensesDropdown[expense];
    }
  }

  addExpense() {
    this.expenses[this.newExpenseName] = this.newExpenseAmount;

    // Update the local budget copy in order for the dropdown to display only relevant expenses on the list
    delete this.expensesDropdown[this.newExpenseName];

    this.newExpenseName = null;
    this.newExpenseAmount = null;

    this.updatedExpenses.emit();
 
  }

  get total() {
    return _.sum(_.values(this.expenses));
  }

  removeItem(newExpenseName) {
    delete this.expenses[newExpenseName];
    this.updatedExpenses.emit();
  }

  listChange(event) {
    this.newExpenseName = event.target.value;
  }

  getInt(str) {
    return parseInt(str);
  }

}
