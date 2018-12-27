const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
    "1": [
        {
            name: String,
            amount: Number,
        }
    ],
    "2": [
        {
            name: String,
            amount: Number,
        }
    ],
    "3": [
        {
            name: String,
            amount: Number,
        }
    ],
    month: String,
    year: String
})

module.exports = mongoose.model("Budget", budgetSchema);