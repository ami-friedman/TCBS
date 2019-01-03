/* Route configuration */
const express = require("express"),
    middlware = require("../middlware"),
    Budget = require("../models/Budget"),
    Expense = require("../models/Expense"),
    User = require("../models/User"),
    helpers = require("../helpers");
router = express.Router({ mergeParams: true });

//Baeline Budget - INDEX: GET: Show the budget for this user
router.get("/", middlware.validateLoggedIn, (req, res) => {
    //find baseline budget for this user and return
    User.findById(req.session._id).populate("baselineBudget").exec((err, foundUser) => {
        if (err) {
            console.log(err);
            res.redirect("/budget")
        } else {
            return res.render("budget/index", { budget: foundUser.baselineBudget });
        }

    })
});

//Baseline Budget - NEW: GET: Show the form for adding a new baseline budget
router.get("/new", middlware.validateLoggedIn, (req, res) => {
    res.render("budget/new");
});

//Baseline Budget - NEW: GET: Show the form for adding a new monthly budget
router.get("/new/:month/:year", middlware.validateLoggedIn, (req, res) => {
    res.render("budget/newMonthly", { month: req.params.month, year: req.params.year });
});

// Budget - NEW: POST: Handle the form action for a new baseline
router.post("/new", middlware.validateLoggedIn, (req, res) => {
    console.log(req.body);
    User.findById(req.session._id, (err, foundUser) => {
        if (err) {
            console.log(err);
            return res.redirect("/login");
        } else {
            Budget.create(req.body, (err, createdBudget) => {
                if (err) {
                    console.log(err);
                    return res.redirect("/login");
                } else {
                    foundUser.baselineBudget = createdBudget._id;

                    foundUser.save();
                }
                return res.redirect("/budget");
            })
        }
    })
});

//Budget - UPDATE: PUT: Handle the update action for a budget




//Monthly Budget - NEW: GET: Show the form for adding a new budget
router.get("/new", middlware.validateLoggedIn, (req, res) => {
    res.render("budget/new");
});


module.exports = router;