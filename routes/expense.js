/* Route configuration */
const express    = require("express"),
      middlware  = require("../middlware"),  
      Expense    = require("../models/Expense"),
      User       = require("../models/User"),
      helpers    = require("../helpers");
      router     = express.Router({ mergeParams: true });


//Routes
//Expense - INDEX: GET: Show all the expenses for this user
router.get("/", middlware.validateLoggedIn, (req, res) => {
    User.findById(req.session._id).populate("expenses").exec((err, foundUser) => {
        if (err){
            console.log(err);
            res.redirect("/");
        } else {
            let tempListOfExpenses = helpers.groupExpensesByMonth(foundUser.expenses);
            let finalList = helpers.mapExpensesToMonth(tempListOfExpenses);
            return res.render("expense/index", {expenseList: finalList});
        }
    }) 
});


//Expense - SHOW: GET: Show info about expenses of category X for a given month
router.get("/:month/:year",  middlware.validateLoggedIn, middlware.validateMonthInput, (req, res) => {
    User.findById(req.session._id).populate("expenses").exec((err, foundUser) => {
        if (err){
            console.log(err);
            res.redirect("/");
        } else {
            let filteredList = helpers.filterExpensesByMonth(foundUser.expenses, req.params.month.toLowerCase(), req.params.year);
            let groupedList = helpers.groupExpensesByCategory(filteredList);

            if (groupedList === undefined){
                return res.redirect("/expense");
            }

            let total = 0;

            for (let category in groupedList){
                for (let i = 0;i< groupedList[category].length;i++){
                    total += groupedList[category][i].amount;
                }
            }           

            res.render("expense/show", { expenseList: groupedList, month: req.params.month.toLowerCase(), year: req.params.year, total: total});
        }
    }) 
})

//Expense - NEW: GET: Show the form to add create a new expense
router.get("/new", middlware.validateLoggedIn, (req, res) => {
    res.render("expense/new");
});

//Expense - CREATE: POST: create the new expense and redirect to show all expenses
router.post("/", middlware.validateLoggedIn, middlware.validateExpenseInput, (req, res) => {
    //find the relevent user
    User.findById(req.session._id, (err, foundUser) => {
        if (err){
            //TODO: Show message to the user
            return res.redirect("/login");
        } else {
            //create the new expense
            Expense.create(req.body, (err, createdExpense) => {
                if (err){
                    //TODO: Show message to the user
                    return res.redirect("/expense");
                } else {
                    //add the new expense to his expense list
                    foundUser.expenses.push(createdExpense._id);
                    foundUser.save();
                    res.redirect("/expense");
                }
            })
        }
    })
});
module.exports = router;
