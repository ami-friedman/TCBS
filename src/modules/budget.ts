export interface BudgetItems {
    [name:string]:number
}
export interface Budget {
    category1: BudgetItems,
    category2: BudgetItems,
    category3: BudgetItems,
}