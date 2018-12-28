const User = require("../models/User");

const express = require("express");
router = express.Router({ mergeParams: true });


router.get("/", (req, res) => {
    res.render("index");
})

router.get("/register", (req, res) => {
    res.render("register");
})

router.post("/register", (req, res) => {
    //TODO: Verify passwords match: Move to MW!!

    //Normelize the user object to match the schema in User.js
    delete req.body.user.passwordConfirm
    //Insert into DB and redirect
    console.log(req.body.user);
    User.create(req.body.user, (err, createdUser) => {
        if (err) {
            //Generate message to the user (use flash message??) and redirect back
            console.log(err);
            //TODO: add flash message to user
            return res.redirect("/");
        }
        else {
            req.session._id = createdUser._id;
            return res.redirect("/");
        }
    })
})

router.get("/login", (req, res) => {
    res.render("login");
})

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.user.email }, (err, foundUser) => {
        if (err || !foundUser) {
            //TODD: Show message to user
            return res.redirect("/");
        } else {
            if (foundUser.password !== req.body.user.password) {
                console.log("Incorrect password")
                return res.redirect("/");
            }
        }
        req.session._id = foundUser._id;
        res.redirect("/expense");
    });
});

router.get("/logout", (req, res) => {
    delete req.session._id;
    res.redirect("/login");
})

module.exports = router;


