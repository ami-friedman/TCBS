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
  expenseMonths = {};
  budgetYearsLinks = [];
  expenseYearsLinks = [];
  expenseMonthsLinks;
  budgetYearsSub: Subscription;
  expenseYearsSub: Subscription;
  expenseMonthsSub: Subscription[] = [];
  userId = '1234'

  months = [
    "none",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  constructor(private budgetService: BudgetService, private expenseService: ExpenseService) { }

  ngOnInit() {
    this.budgetYearsSub = this.budgetService.getAllYears(this.userId).subscribe(years => this.budgetYears = years);
    this.expenseYearsSub = this.expenseService.getAllYears(this.userId)
    .subscribe( years => {
      this.expenseYears = years;
      for (let year of this.expenseYears) {
        this.expenseMonthsSub[year] = this.expenseService.getAllMonths(this.userId, year)
        .subscribe( months => this.expenseMonths[year] = months);
      }
    });
  }

  ngOnDestroy() {
    this.budgetYearsSub.unsubscribe();
    this.expenseYearsSub.unsubscribe();
    for (let year in this.expenseYears) {
      this.expenseMonthsSub[year].unsubscribe();
    }
  }

  toggleBudget() {
    this.shouldExpandBudget() ? this.expandBudgets(): this.collapseBudgets();
  }

  expandBudgets() {
    this.budgetYearsLinks = this.budgetYears;
  }

  collapseBudgets() {
    this.budgetYearsLinks = [];
  }

  shouldExpandBudget() {
    return this.budgetYearsLinks.length == 0
  }

  toggleExpense() {
    this.shouldExpandExpense() ? this.expandExpense(): this.collapseExpense();
  }

  expandExpense() {
    this.expenseYearsLinks = this.expenseYears;
  }

  collapseExpense() {
    this.expenseYearsLinks = [];
  }

  shouldExpandExpense() {
    return this.expenseYearsLinks.length == 0
  }

}
