import { Component, OnDestroy, OnInit } from '@angular/core';
import { Budget } from 'src/app/modules/budget';
import { BudgetService } from '../services/budget.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit, OnDestroy {

  //TODO: Make this dynamic and move to global/env
  private userId = '1234';
  private year;
  
  subscription: Subscription;
  budget: Budget;

  constructor(private budgetService: BudgetService, route: ActivatedRoute) {    
    this.year = route.snapshot.paramMap.get('year') || new Date().getFullYear();
  }

  ngOnInit() {
    this.subscription = this.budgetService.get(this.userId, this.year)
    .subscribe( budget => {
      if (!budget) {
        // This will re-trigger the observable - consider improving
        this.create();
      }
      this.budget = budget
    }); 
  }

  private create() {
   this.initBudget();
   this.budgetService.create(this.userId, this.year, this.budget);    
  }

  update() {
    this.budgetService.update(this.userId, this.year, this.budget);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initBudget() {
    this.budget = {
      category1: {},
      category2: {},
      category3: {},
    }
  }



}
