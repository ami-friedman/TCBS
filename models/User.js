const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        first: String,
        last: String
    },
    email: {type: String, unique: true},
    password: String,
    expenses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Expense"
        }
    ],
    //Identified by month and year being null!
    baselineBudget: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Budget"
    }
})

module.exports = mongoose.model("User", userSchema);