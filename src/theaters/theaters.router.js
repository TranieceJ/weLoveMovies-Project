const router = require("express").Router({mergeParams: true});
const theatersController = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//  "/theaters" route, list of theaters and their movies
router.route("/")
    .get(theatersController.list)
    .all(methodNotAllowed);

module.exports = router;