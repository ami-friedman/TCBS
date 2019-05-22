import { Component, OnInit, OnDestroy } from '@angular/core';
import { BudgetService } from '../services/budget.service';
import { Subscription } from 'rxjs';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  budgetYears;
  expenseYears;
  expenseMonths;
  yearsLinks = [];
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  userId = '1234'

  constructor(private budgetService: BudgetService, private expenseService: ExpenseService) { }

  ngOnInit() {
    this.sub1 = this.budgetService.getAllYears(this.userId).subscribe(years => this.budgetYears = years);
    this.sub2 = this.expenseService.getAllYears(this.userId)
    .subscribe( years => this.expenseYears = years)
    this.sub3 = this.expenseService.getAllMonths(this.userId, '2019')
    .subscribe( months => this.expenseMonths = months)
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }

  toggleBudget() {
    this.shouldExpand() ? this.expandBudgets(): this.collapseBudgets();
  }

  expandBudgets() {
    this.yearsLinks = this.budgetYears;
  }

  collapseBudgets() {
    this.yearsLinks = [];
  }

  shouldExpand() {
    return this.yearsLinks.length == 0
  }

}
