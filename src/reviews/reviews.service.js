const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties")

// List all reviews
function list(){
  return knex("reviews")
    .select("*");
}

// Display single review by id
function read(reviewId){
  return knex("reviews")
    .select("*")
    .where({review_id: reviewId})
    .first()
}

const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

// Update review by matching review id
function update(updatedReview){
  return knex("reviews")
    .select("*")
    .where({review_id: updatedReview.review_id})
    .update(updatedReview, "*")
    .then(()=>{
      return knex("reviews as r")
      .join("critics as c", "c.critic_id", "r.critic_id")
      .select("*")
      .where({review_id: updatedReview.review_id})
      .first()
      .then(addCritic);
    });
}

// Delete review by matching id
function destroy(reviewId){
  return knex("reviews")
  .where({review_id: reviewId}).del();
}


module.exports = {
  list,
  read,
  update,
  delete: destroy,
}