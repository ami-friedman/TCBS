import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Budget } from 'src/app/modules/budget';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BudgetService {


  constructor(private db: AngularFirestore) { 
  }

  create(userId: string, year: number, budget: Budget){
    this.createOrUpdate(userId, year, budget, false);
  }

  update(userId: string, year: number, budget: Budget) {
    this.createOrUpdate(userId, year, budget, false);
  }

  get(userId: string, year: number) {
    return this.db.doc(`budgets/${userId}`).valueChanges()
    .pipe(map( x => {
      if (x) return x[year];
      return undefined;
    }));
  }  

  getAllYears(userId: string) {
    return this.db.doc(`budgets/${userId}`).valueChanges()
    .pipe(map( x => {
      console.log(`x = ${x}`);
      if (x) return Object.keys(x);
      return x;
    }));
  }  

  private createOrUpdate(userId: string, year: number, budget: Budget, update: boolean) {
    let newBudget = {};
    newBudget[year] = budget;
    const doc = this.db.doc(`budgets/${userId}`);
    update ? doc.update(newBudget) : doc.set(newBudget);
  }
}
