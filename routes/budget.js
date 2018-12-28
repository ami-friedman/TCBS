/* Route configuration */
const express    = require("express"),
      middlware  = require("../middlware"),  
      Budget     = require("../models/Budget"),
      Expense    = require("../models/Expense"),
      User       = require("../models/User"),
      helpers    = require("../helpers");
      router     = express.Router({ mergeParams: true });

//Budget - INDEX: GET: Show the budget for this user
router.get("/", middlware.validateLoggedIn,(req, res) => {
    //find baseline budget for this user and return
    User.findById(req.session._id).populate("baselineBudget").exec((err, foundUser) => {
        if (err){
            console.log(err);
            res.redirect("/expense")
        } else {        
            return res.render("budget/index", {budget: foundUser.baselineBudget});
        }

    })
});

//Budget - NEW: GET: Show the form for adding a new buget
router.get("/new", middlware.validateLoggedIn,(req, res) => {
    res.render("budget/new");
});

// Budget - NEW: POST: Handle the form action for a new buget - baseline and monthly
// Baseline identified by month and year attribure being null
router.post("/new", middlware.validateLoggedIn,(req, res) => {
    User.findById(req.session._id, (err, foundUser) => {
        if (err){
            console.log(err);
            return res.redirect("/login");
        } else {
             Budget.create(req.body, (err, createdBudget) => {
                 if (err){
                    console.log(err);
                    return res.redirect("/login");
                 } else {
                    if (!createdBudget.month){
                        foundUser.baselineBudget = createdBudget._id;
                    } else {
                        foundUser.budgets.push(createdBudget._id);
                    }
                    foundUser.save();
                 }
                 return res.redirect("/budget");
             })
        }
    })
});

//Budget - UPDATE: PUT: Handle the update action for a buget



module.exports = router;