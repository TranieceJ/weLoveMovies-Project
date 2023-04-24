const router = require("express").Router();
const reviewsController = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/:reviewId")
    .put(reviewsController.update)
    .delete(reviewsController.delete)
    .all(methodNotAllowed);


router.route("/")
    .get(reviewsController.list)
    .all(methodNotAllowed);

module.exports = router;


