export interface ExpenseItems {
    [name:string]:number
}

export interface Budget {
    category1: ExpenseItems,
    category2: ExpenseItems,
    category3: ExpenseItems,
}