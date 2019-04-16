import { Component } from '@angular/core';
import { Budget } from 'src/modules/budget';
import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent {

  userId = 'RpgoZH0kaRRJnGuquAg4Í';

  budget: Budget;

  constructor(private budgetService: BudgetService) {
    this.budgetService.get(this.userId, 2019).subscribe( budget => {
      this.budget = budget
    }); 
  }

  create() {
    this.budget = {
      category1: {

      },
      category2: {

      },
      category3: {

      },
    }
    this.budgetService.create(this.userId, 2019, this.budget);    
  }

  update() {
    this.budgetService.update(this.userId, 2019, this.budget);
  }



}
