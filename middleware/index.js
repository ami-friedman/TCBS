import helpers from '../helpers'

let middlewareObj = {};

//Middleware
middlewareObj.validateMonthInput =  (req, res, next) => {
    if (helpers.isMonthInputValid(req.params.month, req.params.year)){
        next();
    }
    else {
        res.redirect("/expense");
    }
}

middlewareObj.validateExpenseInput =  (req, res, next) => {
    if (helpers.isExpenseInputValid(req.body)){
        next();
    }
    else {
        res.redirect("/expense");
    }
}

middlewareObj.validateLoggedIn = (req, res, next) => {
    if (!req.session._id){
        res.redirect("/login");
    }
    else {
        next();
    }
}

module.exports = middlewareObj;




