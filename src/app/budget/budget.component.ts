import { Component } from '@angular/core';
import { Budget } from 'src/modules/budget';

@Component({
  selector: 'budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent {

  userId = 'RpgoZH0kaRRJnGuquAg3';

  budget: Budget = {
    category1: {},
    category2: {},
    category3: {},
  }
  name: string;
  amount: number;
  

  constructor() { 
   
  }

 addExpense(){
   this.budget.category1[this.name] = this.amount;

   this.name = null;
   this.amount = null;

 }

}
