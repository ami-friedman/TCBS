import User from '../models/User'
import express from 'express'

const router = express.Router({ mergeParams: true });


router.get("/", (req, res) => {
    res.render("index");
})

router.get("/register", (req, res) => {
    res.render("register");
})

router.post("/register", async (req, res) => {
    //TODO: Verify passwords match: Move to MW!!

    //Normelize the user object to match the schema in User.js
    delete req.body.user.passwordConfirm
    //Insert into DB and redirect
    try {
        let createdUser = await User.create(req.body.user);
        if (createdUser) {
            req.session._id = createdUser._id;
            res.redirect("/budget");
        }
    } catch (error){
        console.log(error);
        return res.redirect("/register");
    }
    
});

router.get("/login", (req, res) => {
    res.render("login");
})

router.post("/login", async (req, res) => {
    try {
        let foundUser = await User.findOne({ email: req.body.user.email });
        if (foundUser && foundUser.password === req.body.user.password) {
            req.session._id = foundUser._id;
            res.redirect("/budget");
        } else if (foundUser && foundUser.password !== req.body.user.password) {
            console.log("wrong password");
            res.redirect("/login");
        } else {
            res.redirect("/login");
        }

    } catch (error) {
        console.log(error);
        res.redirect("/login");
    }

});

router.get("/logout", (req, res) => {
    delete req.session._id;
    res.redirect("/login");
})

module.exports = router;


