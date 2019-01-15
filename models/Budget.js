import mongoose from 'mongoose'


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
    year: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true
    }
})

module.exports = mongoose.model("Budget", budgetSchema);