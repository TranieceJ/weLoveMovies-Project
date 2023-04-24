const service = require("./reviews.service");
const asyncErrorBoundary =require("../errors/asyncErrorBoundary");
const reviewsService = require("./reviews.service");

// Returns a list of all reviews
async function list(req, res, next){
    res.json({data: await reviewsService.list()})
}

// validate if a review exists
async function reviewExists(req,res,next){
    const review = await reviewsService.read(req.params.reviewId);
    if(review){
        res.locals.review = review;
        return next();
    }
    next({status: 404, message: "Review cannot be found."})
}

// Returns reviews for a movie by given Id in params
async function readReview(req, res, next){
    const {review} = res.locals;
    res.json({data: review})

}

// Update existing review saved in res.locals
async function update(req,res,next){
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id,
    };
    const data = await reviewsService.update(updatedReview);
    res.json({data})
    console.log(data)
}

// Delete an existing review saved in res.locals
async function destroy(req, res, next){
    const {review} = res.locals;
    await reviewsService.delete(review.review_id);
    res.sendStatus(204);
}


module.exports = {
    list,
    read: [asyncErrorBoundary(reviewExists), readReview],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    
}