if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound =require("./errors/notFound");
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router")

app.use(cors());
app.use(express.json());

//Routing
app.use("/movies", moviesRouter) // movies router
app.use("/reviews", reviewsRouter) // reviews router
app.use("/theaters", theatersRouter) // theaters router


//Error Handling
app.use(notFound); 
app.use(errorHandler)


module.exports = app;
