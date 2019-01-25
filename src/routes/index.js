import User from '../models/User'
import express from 'express'
import error from '../common/errors'

const router = express.Router({ mergeParams: true });


router.get("/", (req, res) => {
    res.render("index");
})



router.get("/login", (req, res) => {
    if (req.session._id){
        res.redirect('/budget');
    }
    res.render("login");
})

router.post("/login", async (req, res) => {
    let user = new User();
    let result = await user.validatePassword(req.body.user.email, req.body.user.password);
    if (!result) {
        console.log(`${error.INCORRECT_PASSWORD} or ${error.USER_NOT_FOUND}`);
        return res.redirect('/login');
    } 
    req.session._id = user.getId();
    res.redirect('/budget');
});

router.get("/logout", (req, res) => {
    // delete req.session._id;
    // res.redirect("/login");
})




module.exports = router;


