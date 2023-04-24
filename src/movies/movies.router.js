const express= require("express");
const router = require("express").Router({mergeParams: true});
const moviesController = require("./movies.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")
const reviewsRouter = require("../reviews/reviews.router")
const cors = require("cors");

// Routes to a list of reviews for given movieId
router.route("/:movieId/reviews")
.get(moviesController.readReviews)
.all(methodNotAllowed)

// "/movies" route
router.route("/")
    .get(moviesController.list)
    .all(methodNotAllowed);

// Routes to a list of theaters for given movieId
router.route("/:movieId/theaters")
    .get(moviesController.listOfTheaters)
    .all(methodNotAllowed);

// Routes to one particular movie
router.route("/:movieId")
    .get(moviesController.read)
    .all(methodNotAllowed);

 
    





    module.exports= router;