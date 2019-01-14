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
function getCapitalizeMonths() {
    let newMonths = validMonths;
    for (let i = 0;i < newMonths.length;i++){
        newMonths[i] = capitlizeMonth(newMonths[i]);
    }
    return newMonths;
}

function capitlizeMonth (month) {
    return (month[0].toUpperCase() + month.substr(1));
}

function getCategories(){
  return   validCategories
}

function getYears() {
    return validYears;
}

function filterExpensesByMonth(expenses, month, year){
    return expenses.filter(expense => {
        if (expense.month === month && expense.year === year){
            return expense;
        }
    });
}

function groupExpensesByCategory(groupedList) {
    return (__.groupBy(groupedList, value => {
        return value.category;
    }));
}

function groupExpensesByMonth(expenses) {
    return (__.groupBy(expenses, value => {
        return value.month + '#' + value.year;
    }));
}

function mapExpensesToMonth(listOfExpenses) {
    return (__.map(listOfExpenses, group => {
        return {
            month: group[0].month, 
            year: group[0].year
        }}));
}

function isMonthInputValid(month, year) {
    if (!validMonths.includes(month.toLowerCase()) || !validYears.includes(year)){
        return false;
    }
    return true;
}

function isExpenseInputValid(expense) {
    if (!validMonths.includes(expense.month.toLowerCase()) || !validYears.includes(expense.year) || !validCategories.includes(expense.category)){
        return false;
    }
    return true;
}

module.exports = {
    getCapitalizeMonths,
    capitlizeMonth,
    getCategories,
    getYears,
    filterExpensesByMonth,
    groupExpensesByCategory,
    groupExpensesByMonth,
    mapExpensesToMonth,
    isMonthInputValid,
    isExpenseInputValid
};