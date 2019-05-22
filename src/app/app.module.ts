import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BudgetComponent } from './budget/budget.component';
import { InlineEditComponent } from './inline-edit/inline-edit.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RouterModule } from '@angular/router';
import { ExpenseComponent } from './expense/expense.component';
import { TestComponent } from './test/test.component';
import { ExpenseCategoryTableComponent } from './expense-category-table/expense-category-table.component';
import { BudgetCategoryTableComponent } from './budget-category-table/budget-category-table.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BudgetComponent,
    InlineEditComponent,
    ExpenseComponent,
    TestComponent,
    ExpenseCategoryTableComponent,
    BudgetCategoryTableComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
     [
       { path: 'budget', component: BudgetComponent },
       { path: 'budget/:year', component: BudgetComponent },
      
       { path: 'expense', component: ExpenseComponent },
       { path: 'expense/:month/:year', component: ExpenseComponent },
     ] 
    ),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    TabsModule.forRoot(),
    
  ],
  providers: [],
  bootstrap: [AppComponent],


})
export class AppModule { }
