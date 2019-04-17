import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ExpenseItems } from 'src/modules/budget';
import _  from 'lodash';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  @Input('items') items: ExpenseItems;
  @Output('newItems') newItems = new EventEmitter();

  name: string;
  amount: number;

  constructor() { }

  addExpense() {
    this.items[this.name] = this.amount;

    this.name = null;
    this.amount = null;
    this.newItems.emit();
  }

  get total() {
    return _.sum(_.values(this.items));
  }

  updateKey(oldKey, newKey) {
    this.items[newKey] = this.items[oldKey];
    delete this.items[oldKey];
    this.newItems.emit();
  }

  updateAmount(item, newAmount) {
    this.items[item] = Number(newAmount);
    this.newItems.emit();
  }
}
