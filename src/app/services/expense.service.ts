import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Expense } from '../modules/expenses';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private db: AngularFirestore) { 
  }

  create(userId: string, month: number, year: number, expense: Expense){
    this.createOrUpdate(userId, month, year, expense, false);
  }

  update(userId: string, month: number, year: number, expense: Expense) {
    this.createOrUpdate(userId, month, year, expense, false);
  }

  get(userId: string, month: number, year: number) {
    return this.db.doc(`expenses/${userId}`).valueChanges()
    .pipe(map( x => {
      if (x && x[year]) return x[year][month];
      return undefined;
    }));
  }  

  getAllYears(userId: string) {
    return this.db.doc(`expenses/${userId}`).valueChanges()
    .pipe(map( x => {
      if (x) return Object.keys(x);
      return x;
    }));
  }

  getAllMonths(userId: string, year: string) {
    return this.db.doc(`expenses/${userId}`).valueChanges()
    .pipe(map( x => {
      if (x) return Object.keys(x[year]);
      return x;
    }));
  }  

  private createOrUpdate(userId: string, month: number, year: number, expense: Expense, update: boolean) {
    let newExpense = {};
    let temp = {}
    temp[month] = expense;
    newExpense[year] = temp;
       
    const doc = this.db.doc(`expenses/${userId}`);
    update ? doc.update(newExpense) : doc.set(newExpense);
  }
}
