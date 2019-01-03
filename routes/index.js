const User = require("../models/User");

const express = require("express");
router = express.Router({ mergeParams: true });


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
    createdUser = await User.create(req.body.user);
    if (createdUser){
        req.session._id = createdUser._id;
        return res.redirect("/budget");
    }
});

router.get("/login", (req, res) => {
    res.render("login");
})

router.post("/login", async (req, res) => {
    let foundUser = await User.findOne({ email: req.body.user.email });
    if (foundUser && foundUser.password !== req.body.user.password){
        return res.redirect("/login");
    }
    req.session._id = foundUser._id;
    res.redirect("/budget");
});

router.get("/logout", (req, res) => {
    delete req.session._id;
    res.redirect("/login");
})

module.exports = router;


