const __  = require("underscore");


const validMonths = [
    "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"
]

const validCategories = [
    "1", "2", "3"
]

const validYears = [
    "2018", "2019"
]

const helpers = {};


/**
 * Given a list of strings, this method will return the same list where every first letter of every string is capital
 */
helpers.getCapitalizeMonths = () => {
    let newMonths = validMonths;
    for (let i = 0;i < newMonths.length;i++){
        newMonths[i] = newMonths[i][0].toUpperCase() + newMonths[i].substr(1)
    }
    return newMonths;
}

helpers.getCategories = () => validCategories;
helpers.getYears = () => validYears;

helpers.filterExpensesByMonth = (expenses, month, year) => {
    return expenses.filter(expense => {
        if (expense.month === month && expense.year === year){
            return expense;
        }
    });
}

helpers.groupExpensesByCategory = groupedList => {
    return (__.groupBy(groupedList, value => {
        return value.category;
    }));
}

helpers.groupExpensesByMonth = expenses => {
    return (__.groupBy(expenses, value => {
        return value.month + '#' + value.year;
    }));
}

helpers.mapExpensesToMonth = listOfExpenses => {
    return (__.map(listOfExpenses, group => {
        return {
            month: group[0].month, 
            year: group[0].year
        }}));
}

helpers.isMonthInputValid = (month, year) => {
    if (!validMonths.includes(month.toLowerCase()) || !validYears.includes(year)){
        return false;
    }
    return true;
}

helpers.isExpenseInputValid = expense => {
    if (!validMonths.includes(expense.month.toLowerCase()) || !validYears.includes(expense.year) || !validCategories.includes(expense.category)){
        return false;
    }
    return true;
}

module.exports = helpers;