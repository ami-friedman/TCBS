/** 
 * The Categoty Route
 * 
 * Used for interacting with the monthly category X report
 * 
 * 
 *  The routing will follow the RESTfull standard of implementing the 7 routes:
 * Index   - GET: List all expenses
 * New     - GET: Show the form to add an expense
 * Create  - POST: Handle the form submission
 * Show    - GET: Show a single month expense
 * Edit    - GET: Show the form to edit a single expense
 * Update  - PUT: Handle the form submission
 * Destroy - DELETE: Handle a request to delete an expense
*/

/* Route configuration */
const express    = require("express"),
      middlware  = require("../middlware"),  
      __         = require("underscore"),
      router     = express.Router({ mergeParams: true });

/** 
 * Global object (will be convered to DB tables)
 */
let expenses = [
    {
        id: "1",
        category: 1,
        name: "Weekly",
        amount: 800,
        userId: "1",
        month: "jan",
        year: "2018",
    },
    {
        id: "2",
        category: 1,
        name: "Gas",
        amount: 120,
        userId: "1",
        month: "apr",
        year: "2018",
    },
    {
        id: "3",
        category: 1,
        name: "Birthday",
        amount: 250,
        userId: "1",
        month: "mar",
        year: "2018",
    },
    {
        id: "4",
        category: 2,
        name: "Arnona",
        amount: 4000,
        userId: "1",
        month: "feb",
        year: "2018",
    },
    {
        id: "5",
        category: 2,
        name: "Car Loan",
        amount: 890,
        userId: "1",
        month: "jan",
        year: "2018",
    },
    {
        id: "6",
        category: 3,
        name: "Electric Bill",
        amount: 120,
        userId: "1",
        month: "apr",
        year: "2018",
    },
    {
        id: "7",
        category: 3,
        name: "School Books",
        amount: 50,
        userId: "1",
        month: "mar",
        year: "2018",
    },
    {
        id: "8",
        category: 1,
        name: "Purim",
        amount: 300,
        userId: "1",
        month: "jan",
        year: "2018",
    },
]



//Routes
//Category - INDEX: GET: Show all the expenses for this user
router.get("/", (req, res) => {
    res.render("expense/index", {expenseList: getExpensesForUser(req.userId)});
});


//Expense - SHOW: GET: Show info about expenses of category X for a given month
router.get("/:month/:year", middlware.validateMonthInput, (req, res) => {
   
    //TEMP CODE
    let filteredList = filterExpensesByMonth(req.params.month.toLowerCase(), req.params.year);
    let groupedList = groupExpensesByCategory(filteredList);
    //let expenseList = getExpensesByCategoryAndMonth(req.params.month.toLowerCase(), req.params.year);
    //END TEMP CODE

    if (groupedList === undefined){
        return res.redirect("/expense");
    }

    res.render("expense/show", { expenseList: groupedList, month: req.params.month.toLowerCase(), year: req.params.year});
})

//Expense - NEW: GET: Show the form to add create a new expense
router.get("/new", (req, res) => {
    res.render("expense/new");
});

//Expense - CREATE: POST: create the new expense and redirect to show all expenses
router.post("/", middlware.validateExpenseInput, (req, res) => {
    console.log(req.body);

    //TEMP CODE
    expenses.push(req.body);
    //END TEMP CODE

    res.redirect("/expense");
});

/** 
 * Utils
*/
function getExpensesForUser(userId){
    // Find the categories for this user
    // Group them by category and month
    let listOfExpenses = [];
    
    //TEMP CODE - replace by DB code
    //2 steps to create a list where category number, month and year are unique
    //Step 1: Create a list of lists where the "key" is the tuple of the three values
    let tempListOfExpenses = groupExpensesByMonth();

    //Step 2: Create a list of the tuples. This will be the list of expenses by month and category
    listOfExpenses = mapExpensesToMonth(tempListOfExpenses);
    //END OF TEMP CODE

    return listOfExpenses;
}

function filterExpensesByMonth(month, year){
    return expenses.filter(expense => {
        if (expense.month === month && expense.year === year){
            return expense;
        }
    });
}

function groupExpensesByCategory(groupedList){
    return (__.groupBy(groupedList, value => {
        return value.category;
    }));
}

function groupExpensesByMonth(){
    return (__.groupBy(expenses, value => {
        return value.month + '#' + value.year;
    }));
}

function mapExpensesToMonth(listOfExpenses){
    return (__.map(listOfExpenses, group => {
        return {
            month: group[0].month, 
            year: group[0].year
        }}));
}


module.exports = router;
