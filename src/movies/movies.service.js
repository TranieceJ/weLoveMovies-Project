const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties")

// Add critic to movies 
const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

// List ALL movies
function list() {
  return knex("movies").select("*");
}

// List ONLY movies currently showing
function listShowing(){
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .distinct()
    .select("m.movie_id", "m.title", "m.runtime_in_minutes", "m.rating", "m.description", "m.image_url")
    .where({is_showing: true})

}


// Returns one movie by given ID
function readMovie(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}


// Return a list of all movie theaters for a given movieId
function listOfTheaters(movieId) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("*")
    .where({ movie_id: movieId });
}

// Returns movie reviews with critics attached by given movieId
function readReviews(movieId) {
  return knex("movies as m")
    .join("reviews as r", "r.movie_id", "m.movie_id")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("m.movie_id", "c.*", "r.*")
    .where({ "r.movie_id": movieId })
    .then((reviews) => reviews.map(addCritic));
}


module.exports = {
  list,
  listShowing,
  readMovie,
  listOfTheaters,
  readReviews,
};
