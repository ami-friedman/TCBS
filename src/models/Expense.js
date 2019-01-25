import mongoose from 'mongoose'

const expenseSchema = new mongoose.Schema({
    category: Number,
    name: String,
    amount: Number,
    month: String,
    year: String
})

module.exports = mongoose.model("Expense", expenseSchema);