import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ExpenseItems } from 'src/modules/budget';


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

  addExpense(){
    this.items[this.name] = this.amount;
 
    this.name = null;
    this.amount = null;
    this.newItems.emit();
   }

  

}
