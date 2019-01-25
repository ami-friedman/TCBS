import User from '../models/User'
import express from 'express'
import middleware from '../middleware'

const router = express.Router({ mergeParams: true });

router.get("/account", middleware.validateLoggedIn, (req, res) => {
    res.render("account/index");
})

router.get("/new", (req, res) => {
    res.render("account/new");
})

router.post("/new", async (req, res) => {
    let user = new User();
    user.create(req.body.user);

    res.redirect("/budget");
});

module.exports = router;

