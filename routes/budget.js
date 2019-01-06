/* Route configuration */
const express = require("express"),
    middlware = require("../middlware"),
    Budget = require("../models/Budget"),
    Expense = require("../models/Expense"),
    User = require("../models/User"),
    helpers = require("../helpers");
router = express.Router({ mergeParams: true });

//Baeline Budget - INDEX: GET: Show the budget for this user
router.get("/", middlware.validateLoggedIn, async (req, res) => {
    //find baseline budget for this user and return
    try {
        let foundUser = await User.findById(req.session._id).populate("baselineBudget");
        //error handling if user not found or budget is more generically handledd in index.ejs
        res.render("budget/index", { budget: foundUser.baselineBudget });
    } catch(error) {
        console.log(error);
        res.redirect("/budegt");
    }
})


//Baseline Budget - NEW: GET: Show the form for adding a new baseline budget
router.get("/new", middlware.validateLoggedIn, (req, res) => {
    res.render("budget/new");
});


// Budget - NEW: POST: Handle the form action for a new baseline
router.post("/new", middlware.validateLoggedIn, async (req, res) => {
    try {
        let foundUser = await User.findById(req.session._id);
        if (foundUser) {
            let newBudget = await Budget.create(req.body);
            if (newBudget) {
                foundUser.baselineBudget = newBudget._id;
                foundUser.save();
            }
            res.redirect("/budget");
        }
    } catch(error) {
        console.log(error);
        res.redirect("/budegt");
    }
});

//Baseline Budget - NEW: GET: Show the form for adding a new monthly budget
router.get("/new/:month/:year", middlware.validateLoggedIn, (req, res) => {
    res.render("budget/newMonthly", { month: req.params.month, year: req.params.year });
});

// Budget - NEW: POST: Handle the form action for a new monthly
router.post("/new/:month/:year", middlware.validateLoggedIn, async (req, res) => {
    try {
        let foundUser = await User.findById(req.session._id);
        if (foundUser) {
            let newBudget = await Budget.create(req.body);
            if (newBudget) {
                foundUser.monthlyBudgets.push(newBudget._id);
                foundUser.save();
            }
            res.redirect("/budget");
        }
    } catch(error) {
        console.log(error);
        res.redirect("/budegt");
    }
});

//Budget - UPDATE: PUT: Handle the update action for a budget



module.exports = router;