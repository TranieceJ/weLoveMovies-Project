const moviesService = require("./movies.service");
const asyncErrorBoundary =require("../errors/asyncErrorBoundary");
const { as } = require("../db/connection");

//List all movies when is_showing=false, list currently showing movies when is_showing=true
async function list(req,res,next){
    const {is_showing} = req.query;
    if(is_showing ==="true"){
        res.status(200).json({data: await moviesService.listShowing()});
    }else{
        res.status(200).json({data: await moviesService.list()});
    }
}


//Return movie details for given ID
async function read(req,res,next){
    const {movie} = res.locals
    res.json({data: movie});
}

//Returns the theaters for specified movie_id
async function listOfTheaters(req,res,next){
    const {movieId} = req.params;
    const theaterList = await moviesService.listOfTheaters(movieId);
    res.json({data: theaterList})
}

//Movie exists validation
async function movieExists(req,res,next){
    const {movieId} = req.params;
    //console.log(movieId)
    const movie = await moviesService.readMovie(movieId);
    //console.log(movie)
    if(movie){
        res.locals.movie = movie
        return next();
    }
    return next({status: 404, message: "Movie ID not found"})
}

// Returns reviews for given movie ID
async function readReviews(req, res, next){
    const {movieId} = req.params;
    const data = await moviesService.readReviews(movieId)
    if(data){
        res.json({data})
    }
}




module.exports={
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists),asyncErrorBoundary(read)],
    listOfTheaters: [asyncErrorBoundary(movieExists),asyncErrorBoundary(listOfTheaters)],
    readReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readReviews)],
}