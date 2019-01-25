import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        first: String,
        last: String
    },
    email: {type: String, unique: true},
    password: String,
})

module.exports = mongoose.model("User", userSchema);