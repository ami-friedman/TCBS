import { Component, OnInit, Input, Output } from '@angular/core';
import { BudgetItems } from 'src/modules/budget';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  @Input('items') items: BudgetItems;
  @Output('newItems') newItems: BudgetItems;

  name: string;
  amount: number;

  constructor() { }

  addExpense(){
    this.items[this.name] = this.amount;
 
    this.name = null;
    this.amount = null;
   }

  

}
