import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Expenses } from 'src/modules/budget';
import _  from 'lodash';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  @Input('expenses') expenses: Expenses;
  @Output('newExpenses') newExpenses = new EventEmitter();

  name: string;
  amount: number;

  constructor() { }

  addExpense() {
    this.expenses[this.name] = this.amount;

    this.name = null;
    this.amount = null;
    this.newExpenses.emit();
  }

  get total() {
    return _.sum(_.values(this.expenses));
  }

  updateName(oldName, newName) {
    this.expenses[newName] = this.expenses[oldName];
    delete this.expenses[oldName];
    this.newExpenses.emit();
  }

  updateAmount(expense, newAmount) {
    this.expenses[expense] = Number(newAmount);
    this.newExpenses.emit();
  }
}
