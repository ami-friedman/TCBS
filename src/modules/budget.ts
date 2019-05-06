
export interface Expenses {
    [name:string]:number
}

export interface Budget {
    category1: Expenses,
    category2: Expenses,
    category3: Expenses,
}

export type Expense = Budget;



