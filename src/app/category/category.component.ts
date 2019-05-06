import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Expenses } from 'src/modules/budget';
import _  from 'lodash';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input('expenses') expenses: Expenses;
  @Input('budget') budget: Expenses;
  @Input('isBudget') isBudget = false;
  @Output('newExpenses') newExpenses = new EventEmitter();

  name: string;
  amount: number;
  _budget;

  constructor() { 
    
  }

  getNumber(val) {
    return parseInt(val);
  }

  ngOnInit() {
    this._budget = {...this.budget};
  }

  addExpense() {
    this.expenses[this.name] = this.amount;
    delete this._budget[this.name];

    this.name = null;
    this.amount = null;

    this.newExpenses.emit();
    
    console.log(this._budget);
  }

  get total() {
    return _.sum(_.values(this.expenses));
  }

  removeItem(name) {
    delete this.expenses[name];
    this.newExpenses.emit();
  }

  listChange(event) {
    this.name = event.target.value;
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
