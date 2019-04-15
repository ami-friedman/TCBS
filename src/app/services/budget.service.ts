import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Budget } from 'src/modules/budget';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BudgetService {


  constructor(private afs: AngularFirestore) { 
  }

  create(userId: string, year: number, budget: Budget){
    let newBudget = {};
    newBudget[year] = budget;
    const doc = this.afs.doc(`budgets/${userId}`);
    doc.set(newBudget);
  }


  get(userId: string, year: number) {
    return this.afs.doc(`budgets/${userId}`).valueChanges()
    .pipe(map( x => {
      if (x) return x[year];
      return x;
    }));
  }

  update(userId: string, year: number, budget: Budget) {
    let newBudget = {};
    newBudget[year] = budget;
    const doc = this.afs.doc(`budgets/${userId}`);
    doc.update(newBudget);
  }
}
