/**
 * 
 */
//Required modules
const express       = require("express"),
      expenseRoute = require("./routes/expense"),
      bodyParser    = require("body-parser");

const app = express();


//app configuration 
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use("/expense", expenseRoute);


app.get("/", (req, res) => {
    console.log(": /");
    res.render("index");
})

    
app.listen(3000, () => {
    console.log("Server started....");
});