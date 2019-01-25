import express from 'express';
import budgetRouter from './src/routes/budget'
import expenseRouter from './src/routes/expense'
import indexRouter from './src/routes/index'
import accountRouter from './src/routes/account'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import helpers from './src/common/helpers'
import expressSession from 'express-session'


const app = express();
require('dotenv').load();

console.log("Configuring the application");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.use(expressSession({ secret: "Udnkjs87KHLDedj0", resave: false, saveUninitialized: false }));

app.use((req, res, next) => {
    res.locals.months = helpers.getCapitalizeMonths();
    res.locals.categories = helpers.getCategories();
    res.locals.years = helpers.getYears();
    res.locals.userId = req.session._id;
    next();
});
    
app.use("/", indexRouter);
app.use("/budget", budgetRouter);
app.use("/expense", expenseRouter);
app.use("/account", accountRouter);

console.log("Connection to the DB");
mongoose.connect(`mongodb://${process.env.LOCAL_DB}`,{ useNewUrlParser: true });


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

console.log("Starting server");
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});