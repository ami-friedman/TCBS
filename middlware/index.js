const helpers = require("../helpers");

let middlwareObj = {};

//Middleware
middlwareObj.validateMonthInput =  (req, res, next) => {
    if (helpers.isMonthInputValid(req.params.month, req.params.year)){
        next();
    }
    else {
        res.redirect("/expense");
    }
}

middlwareObj.validateExpenseInput =  (req, res, next) => {
    if (helpers.isExpenseInputValid(req.body)){
        next();
    }
    else {
        res.redirect("/expense");
    }
}

middlwareObj.validateLoggedIn = (req, res, next) => {
    if (!req.session._id){
        res.redirect("/login");
    }
    else {
        next();
    }
}

module.exports = middlwareObj;




