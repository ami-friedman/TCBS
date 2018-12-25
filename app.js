/**
 * 
 */
//Required modules
const express       = require("express"),
      expenseRoute = require("./routes/expense"),
      bodyParser    = require("body-parser"),
      __            = require("underscore");

const app = express();


//app configuration 
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use("/expense", expenseRoute);


/** 
 * Global object (will be convered to DB tables)
 */
let expenses = [
    {
        id: "1",
        number: 1,
        name: "Weekly",
        amount: 800,
        userId: "1",
        month: "jan",
        year: "2018",
    },
    {
        id: "2",
        number: 1,
        name: "Gas",
        amount: 120,
        userId: "1",
        month: "apr",
        year: "2018",
    },
    {
        id: "3",
        number: 1,
        name: "Birthday",
        amount: 250,
        userId: "1",
        month: "mar",
        year: "2018",
    },
    {
        id: "4",
        number: 2,
        name: "Arnona",
        amount: 4000,
        userId: "1",
        month: "feb",
        year: "2018",
    },
    {
        id: "5",
        number: 2,
        name: "Car Loan",
        amount: 890,
        userId: "1",
        month: "jan",
        year: "2018",
    },
    {
        id: "6",
        number: 3,
        name: "Electric Bill",
        amount: 120,
        userId: "1",
        month: "apr",
        year: "2018",
    },
    {
        id: "7",
        number: 3,
        name: "School Books",
        amount: 50,
        userId: "1",
        month: "mar",
        year: "2018",
    },
    {
        id: "8",
        number: 1,
        name: "Purim",
        amount: 300,
        userId: "1",
        month: "jan",
        year: "2018",
    },
]

let validCategories = [
    "1", "2", "3"
]

let validMonths = [
    "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"
]

let validYears = [
    "2018", "2019"
]

function validateExpenseInput(req, res, next){
    if (isExpenseInputValid(req.params.num, req.params.month, req.params.year)){
        next();
    }
    else {
        res.redirect("/expense");
    }

}

app.get("/", (req, res) => {
    res.redirect("expense");
})

//Routes
//Category - INDEX: GET: Show all the expenses for this user
app.get("/expense", (req, res) => {
    res.render("expense/index", {expenseList: getExpensesForUser(req.userId)});
});


//Category - SHOW: GET: Show info about expenses of category X for a given month
app.get("/expense/:num/:month/:year", validateExpenseInput, (req, res) => {
   
    //TEMP CODE
    let expenseList = getExpensesByCategoryAndMonth(req.params.num, req.params.month.toLowerCase(), req.params.year);
    //END TEMP CODE

    res.render("expense/show", { expenseList: expenseList });
})


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
    let tempListOfExpenses = groupExpensesByCategoryAndMonth();

    //Step 2: Create a list of the tuples. This will be the list of expenses by month and category
    listOfExpenses = mapExpensesToTuples(tempListOfExpenses);
    //END OF TEMP CODE

    return listOfExpenses;
}

function groupExpensesByCategoryAndMonth(){
    return (__.groupBy(expenses, value => {
        return value.number + '#' + value.month + '#' + value.year;
    }));
}

function mapExpensesToTuples(listOfExpenses){
    return (__.map(listOfExpenses, group => {
        return {
            category: group[0].number, 
            month: group[0].month, 
            year: group[0].year
        }}));
}

function getExpensesByCategoryAndMonth(number, month, year){
    let listOfExpenses = groupExpensesByCategoryAndMonth();
    return listOfExpenses[number +'#' + month + '#' + year];
}

function isExpenseInputValid(category, month, year){
    if (!validCategories.includes(category) || !validMonths.includes(month.toLowerCase()) || !validYears.includes(year)){
        return false;
    }
    return true;
}

    
app.listen(3000, () => {
    console.log("Server started....");
});