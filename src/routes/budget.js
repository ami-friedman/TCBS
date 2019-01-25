/* Route configuration */
import express from 'express'
import middleware from '../middleware'
import Budget from '../models/Budget'
import User from '../models/User'
import helpers from '../common/helpers'

const router = express.Router({ mergeParams: true });

//Baeline Budget - INDEX: GET: Show the baseline budget for this user
router.get("/", middleware.validateLoggedIn, async (req, res) => {
    let budget = new Budget();
    let budgetProps = await budget.findByUserId(req.session._id);
    if (!budgetProps.id) {
        return res.redirect('budget/new');
    }
    res.render('budget/index', { budget: budgetProps });
})

//Baeline Budget - INDEX: GET: Show the monthly budget for this user
router.get("/:month/:year", middleware.validateLoggedIn, async (req, res) => {
    try {
        //find the budget with this month and year linked to this user 
        let foundBudget = await Budget.findOne({month: req.params.month, year: req.params.year, userId: req.session._id});
        if (foundBudget){
            foundBudget.month = helpers.capitlizeMonth(foundBudget.month);
            res.render("budget/index", { budget: foundBudget });
        } else {
            res.redirect("/budegt");
        }
    } catch(error) {
        console.log(error);
        res.redirect("/budegt");
    }
})

//Baseline Budget - NEW: GET: Show the form for adding a new baseline budget
router.get("/new", middleware.validateLoggedIn, (req, res) => {
    res.render("budget/new");
});


// Budget - NEW: POST: Handle the form action for a new baseline
router.post("/new", middleware.validateLoggedIn, async (req, res) => {
    // Add the userId to the budget object
    req.body.userId = req.session._id; 
    // Create a new budget with an ID
    console.log('post: budget/new:', req.body);
    let budget = new Budget();
    budget.create(req.body);
    res.redirect('/budget');
});

//Baseline Budget - NEW: GET: Show the form for adding a new monthly budget
router.get("/new/:month/:year", middleware.validateLoggedIn, (req, res) => {
    res.render("budget/newMonthly", { month: req.params.month, year: req.params.year });
});

// Budget - NEW: POST: Handle the form action for a new monthly
router.post("/new/:month/:year", middleware.validateLoggedIn, async (req, res) => {
    try {
        let foundUser = await User.findById(req.session._id);
        if (foundUser) {
            let newBudget = await Budget.create(req.body);
            if (newBudget) {
                newBudget.month = req.params.month;
                newBudget.year = req.params.year;
                newBudget.userId = foundUser._id;
                newBudget.save();
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