/** 
 * The Categoty Route
 * 
 * Used for interacting with the monthly category X report
 * 
 * 
 *  The routing will follow the RESTfull standard of implementing the 7 routes:
 * Index   - GET: List all items
 * New     - GET: Show the form to add the item
 * Create  - POST: Handle the form submission
 * Show    - GET: Show a single item
 * Edit    - GET: Show the form to edit a single item
 * Update  - PUT: Handle the form submission
 * Destroy - DELETE: Handle a request to delete the item
*/

/* Route configuration */
const express = require("express"),
      router  = express.Router({ mergeParams: true });


//Index - GET: list all items


//New - GET: Show the form to create a new item
router.get("/new", (req, res) => {
    res.render("./expense/new");
});

//Create  - POST: Handle the form submission
router.post("/", (req, res) => {
    console.log(req.body);
    res.redirect("/");

});

module.exports = router;
