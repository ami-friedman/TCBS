let middlwareObj = {};

//Middleware
middlwareObj.validateMonthInput =  function (req, res, next){
    if (isMonthInputValid(req.params.month, req.params.year)){
        next();
    }
    else {
        res.redirect("/expense");
    }
}

middlwareObj.validateExpenseInput =  function (req, res, next){
    if (isExpenseInputValid(req.body)){
        next();
    }
    else {
        res.redirect("/expense");
    }
}


//UTILS
let validMonths = [
    "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"
]

let validCategories = [
    "1", "2", "3"
]

let validYears = [
    "2018", "2019"
]


function isMonthInputValid(month, year){
    if (!validMonths.includes(month.toLowerCase()) || !validYears.includes(year)){
        return false;
    }
    return true;
}

function isExpenseInputValid(expense){
    if (!validMonths.includes(expense.month.toLowerCase()) || !validYears.includes(expense.year) || !validCategories.includes(expense.category)){
        return false;
    }
    return true;
}

module.exports = middlwareObj;




