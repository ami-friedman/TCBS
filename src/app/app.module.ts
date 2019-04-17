import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BudgetComponent } from './budget/budget.component';
import { InlineEditComponent } from './inline-edit/inline-edit.component';
import { CategoryComponent } from './category/category.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BudgetComponent,
    InlineEditComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    TabsModule.forRoot(),
    
  ],
  providers: [],
  bootstrap: [AppComponent],


})
export class AppModule { }
